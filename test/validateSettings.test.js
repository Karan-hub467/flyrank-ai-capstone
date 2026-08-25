import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateSettings } from "../src/validateSettings.js";

describe("validateSettings", () => {
  it("requires a name", () => {
    const errors = validateSettings({ name: "", email: "ada@example.com" });
    assert.equal(errors.name, "Name is required");
  });

  it("requires an email", () => {
    const errors = validateSettings({ name: "Ada Lovelace", email: "" });
    assert.equal(errors.email, "Email is required");
  });

  it("rejects an invalid email", () => {
    const errors = validateSettings({ name: "Ada Lovelace", email: "not-an-email" });
    assert.equal(errors.email, "Please enter a valid email");
  });

  it("accepts a valid name and email", () => {
    const errors = validateSettings({
      name: "Ada Lovelace",
      email: "ada@example.com",
    });
    assert.deepEqual(errors, {});
  });
});
