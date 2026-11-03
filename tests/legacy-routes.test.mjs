import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL;

test(
  "the previous portfolio URL redirects to selected work",
  { skip: !base },
  async () => {
    const response = await fetch(`${base}/projects`, { redirect: "manual" });
    assert.equal(response.status, 308);
    assert.equal(
      new URL(response.headers.get("location"), base).href,
      `${base}/#work`,
    );
  },
);
