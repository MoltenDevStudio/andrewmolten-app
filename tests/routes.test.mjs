import test from "node:test";
import assert from "node:assert/strict";

// Run against a local production server: TEST_BASE_URL=http://localhost:3000 npm test
const base = process.env.TEST_BASE_URL;
const options = { skip: !base };

test(
  "homepage is indexable and has the correct identity and email fallback",
  options,
  async () => {
    const response = await fetch(base);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /andrewmolten\.com/);
    assert.match(html, /mailto:andrewmolten23@gmail\.com/);
    assert.match(html, /name="robots" content="index, follow"/);
    assert.doesNotMatch(html, /href="\/previews\//);
  },
);

test("sitemap includes only the public homepage", options, async () => {
  const response = await fetch(`${base}/sitemap.xml`);
  const xml = await response.text();
  assert.equal(response.status, 200);
  assert.match(xml, /https:\/\/andrewmolten.com/);
  assert.doesNotMatch(xml, /previews/);
  assert.equal((xml.match(/<url>/g) ?? []).length, 1);
});

test(
  "future previews are unavailable and carry noindex headers and metadata",
  options,
  async () => {
    const response = await fetch(`${base}/previews/not-a-client`);
    assert.equal(response.status, 404);
    assert.equal(
      response.headers.get("x-robots-tag"),
      "noindex, nofollow, noarchive",
    );
    assert.match(await response.text(), /name="robots" content="noindex/);
  },
);

test("crawlers can see preview noindex directives", options, async () => {
  const response = await fetch(`${base}/robots.txt`);
  const txt = await response.text();
  assert.equal(response.status, 200);
  assert.match(txt, /Sitemap: https:\/\/andrewmolten.com\/sitemap.xml/);
  assert.doesNotMatch(txt, /Disallow: \/previews/);
});

test("social image is a real PNG", options, async () => {
  const response = await fetch(`${base}/opengraph-image`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test(
  "contact refuses cross-origin requests and never fakes delivery when unconfigured",
  options,
  async () => {
    const rejected = await fetch(`${base}/api/enquiry`, {
      method: "POST",
      headers: { origin: "https://other.example" },
    });
    assert.equal(rejected.status, 403);
    if (!process.env.CONTACT_FORM_ENDPOINT) {
      const unavailable = await fetch(`${base}/api/enquiry`, {
        method: "POST",
        headers: { origin: base },
      });
      assert.equal(unavailable.status, 503);
      assert.doesNotMatch(await unavailable.text(), /"ok":true/);
    }
  },
);
