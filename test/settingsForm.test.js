import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { initSettingsForm } from "../src/settingsForm.js";

function createFormDom() {
  const dom = new JSDOM(`
    <form id="settings-form" novalidate>
      <label for="name">Name</label>
      <input id="name" name="name" type="text" aria-describedby="name-error" />
      <p id="name-error" class="error" role="alert"></p>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" aria-describedby="email-error" />
      <p id="email-error" class="error" role="alert"></p>
      <button type="submit">Save</button>
      <p id="form-success" class="success" role="status" aria-live="polite" hidden></p>
    </form>
  `);

  const form = dom.window.document.querySelector("#settings-form");
  initSettingsForm(form);

  return {
    form,
    nameInput: form.querySelector("#name"),
    emailInput: form.querySelector("#email"),
    nameError: form.querySelector("#name-error"),
    emailError: form.querySelector("#email-error"),
    successMessage: form.querySelector("#form-success"),
    document: dom.window.document,
  };
}

function submitForm(form, document) {
  form.dispatchEvent(
    new document.defaultView.Event("submit", { bubbles: true, cancelable: true })
  );
}

function typeValue(input, value, document) {
  input.value = value;
  input.dispatchEvent(new document.defaultView.Event("input", { bubbles: true }));
}

describe("settings form", () => {
  let page;

  beforeEach(() => {
    page = createFormDom();
  });

  it("shows an error when name is empty", () => {
    typeValue(page.emailInput, "ada@example.com", page.document);
    submitForm(page.form, page.document);

    assert.equal(page.nameError.textContent, "Name is required");
    assert.equal(page.nameInput.getAttribute("aria-invalid"), "true");
    assert.equal(page.successMessage.hidden, true);
  });

  it("shows an error when email is empty", () => {
    typeValue(page.nameInput, "Ada Lovelace", page.document);
    submitForm(page.form, page.document);

    assert.equal(page.emailError.textContent, "Email is required");
    assert.equal(page.emailInput.getAttribute("aria-invalid"), "true");
  });

  it("shows an error when email is invalid", () => {
    typeValue(page.nameInput, "Ada Lovelace", page.document);
    typeValue(page.emailInput, "not-an-email", page.document);
    submitForm(page.form, page.document);

    assert.equal(page.emailError.textContent, "Please enter a valid email");
    assert.equal(page.emailInput.getAttribute("aria-invalid"), "true");
  });

  it("shows a success message and keeps values after a valid submission", () => {
    typeValue(page.nameInput, "Ada Lovelace", page.document);
    typeValue(page.emailInput, "ada@example.com", page.document);
    submitForm(page.form, page.document);

    assert.equal(page.nameError.textContent, "");
    assert.equal(page.emailError.textContent, "");
    assert.equal(page.successMessage.hidden, false);
    assert.equal(page.successMessage.textContent, "Settings saved successfully.");
    assert.equal(page.nameInput.value, "Ada Lovelace");
    assert.equal(page.emailInput.value, "ada@example.com");
  });
});
