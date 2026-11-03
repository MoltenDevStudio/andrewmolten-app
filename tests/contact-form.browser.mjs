import test from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const base = process.env.TEST_BASE_URL;

test("contact form checks runtime availability and keeps an honest fallback", { skip: !base }, async (t) => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
    headless: true,
  });
  t.after(() => browser.close());

  const fallback = async (page) => {
    assert.equal(await page.getByRole("button", { name: "Send enquiry" }).isDisabled(), true);
    assert.equal(await page.locator("#form-note a").getAttribute("href"), "mailto:andrewmolten23@gmail.com");
  };

  await t.test("unknown configuration stays disabled until the runtime response arrives", async () => {
    const page = await browser.newPage();
    let release;
    const gate = new Promise((resolve) => { release = resolve; });
    const requested = page.waitForRequest("**/api/enquiry/config");
    await page.route("**/api/enquiry/config", async (route) => {
      await gate;
      await route.fulfill({ json: { enabled: true } });
    });
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await requested;
    await fallback(page);
    release();
    await page.waitForFunction(() => !document.querySelector('button[type="submit"]').disabled);
    assert.equal(await page.locator("#form-note").count(), 0);
    await page.close();
  });

  for (const [name, response] of [
    ["unconfigured", { json: { enabled: false } }],
    ["server error", { status: 503, json: { error: "Unavailable" } }],
    ["invalid JSON", { body: "unavailable" }],
    ["non-boolean configuration", { json: { enabled: "true" } }],
    ["network failure", null],
  ]) {
    await t.test(`${name} retains the email fallback`, async () => {
      const page = await browser.newPage();
      await page.route("**/api/enquiry/config", (route) => response ? route.fulfill(response) : route.abort());
      const checked = response
        ? page.waitForResponse("**/api/enquiry/config").then((response) => response.finished())
        : page.waitForEvent("requestfailed", (request) => request.url().endsWith("/api/enquiry/config"));
      await page.goto(base);
      await checked;
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await fallback(page);
      await page.close();
    });
  }

  await t.test("a stalled configuration check times out with the fallback", async () => {
    const page = await browser.newPage();
    await page.clock.install();
    await page.route("**/api/enquiry/config", () => {});
    const requested = page.waitForRequest("**/api/enquiry/config");
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await requested;
    const aborted = page.waitForEvent("requestfailed", (request) => request.url().endsWith("/api/enquiry/config"));
    await page.clock.fastForward(6000);
    await aborted;
    await fallback(page);
    await page.close();
  });

  await t.test("the deployed runtime determines availability", async () => {
    const page = await browser.newPage();
    const checked = page.waitForResponse("**/api/enquiry/config");
    await page.goto(base);
    assert.deepEqual(await (await checked).json(), {
      enabled: process.env.TEST_ENQUIRY_ENABLED === "true",
    });
    if (process.env.TEST_ENQUIRY_ENABLED === "true") {
      await page.waitForFunction(() => !document.querySelector('button[type="submit"]').disabled);
    } else {
      await fallback(page);
    }
    await page.close();
  });
});
