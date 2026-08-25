import { validateSettings } from "./validateSettings.js";

function setFieldError(input, errorElement, message) {
  const hasError = Boolean(message);
  errorElement.textContent = message;
  input.setAttribute("aria-invalid", hasError ? "true" : "false");
}

export function initSettingsForm(form) {
  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const nameError = form.querySelector("#name-error");
  const emailError = form.querySelector("#email-error");
  const successMessage = form.querySelector("#form-success");

  const state = {
    name: nameInput.value,
    email: emailInput.value,
  };

  function syncInputsFromState() {
    if (nameInput.value !== state.name) {
      nameInput.value = state.name;
    }
    if (emailInput.value !== state.email) {
      emailInput.value = state.email;
    }
  }

  function renderErrors(errors) {
    setFieldError(nameInput, nameError, errors.name || "");
    setFieldError(emailInput, emailError, errors.email || "");
  }

  nameInput.addEventListener("input", (event) => {
    state.name = event.target.value;
    syncInputsFromState();
  });

  emailInput.addEventListener("input", (event) => {
    state.email = event.target.value;
    syncInputsFromState();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    syncInputsFromState();

    const errors = validateSettings(state);
    const hasErrors = Object.keys(errors).length > 0;

    renderErrors(errors);

    if (hasErrors) {
      successMessage.hidden = true;
      successMessage.textContent = "";
      return;
    }

    successMessage.hidden = false;
    successMessage.textContent = "Settings saved successfully.";
    syncInputsFromState();
  });

  syncInputsFromState();
  renderErrors({});
  successMessage.hidden = true;
  successMessage.textContent = "";

  return {
    getState() {
      return { ...state };
    },
  };
}
