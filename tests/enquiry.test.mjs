import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry, configuredEndpoint } from "../src/lib/enquiry.ts";

const valid = {
  name: "Alex",
  email: "alex@example.com",
  website: "https://example.com",
  message: "I would like to discuss a website.",
};

test("accepts an enquiry with an optional website and trims input", () => {
  assert.deepEqual(validateEnquiry({ ...valid, name: " Alex " }), valid);
  assert.equal(validateEnquiry({ ...valid, website: undefined }).website, "");
});

test("rejects malformed, oversized and unsafe enquiry fields", () => {
  for (const body of [
    null,
    [],
    {},
    { ...valid, name: [] },
    { ...valid, name: " " },
    { ...valid, email: "invalid" },
    { ...valid, message: "short" },
    { ...valid, message: "a".repeat(5001) },
    { ...valid, website: "javascript:alert(1)" },
    { ...valid, website: 42 },
    { ...valid, website: "not a url" },
  ]) {
    assert.equal(validateEnquiry(body), null);
  }
});

test("only enables a configured HTTPS receiver", () => {
  const previous = process.env.CONTACT_FORM_ENDPOINT;
  try {
    for (const endpoint of [
      "",
      "not-a-url",
      "http://example.com",
      "file:///tmp/test",
    ]) {
      process.env.CONTACT_FORM_ENDPOINT = endpoint;
      assert.equal(configuredEndpoint(), null);
    }
    process.env.CONTACT_FORM_ENDPOINT = "https://example.com/enquiry";
    assert.equal(configuredEndpoint(), "https://example.com/enquiry");
  } finally {
    if (previous === undefined) delete process.env.CONTACT_FORM_ENDPOINT;
    else process.env.CONTACT_FORM_ENDPOINT = previous;
  }
});
