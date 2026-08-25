const STORAGE_KEY = "flyrank.settings";

const DEFAULT_SETTINGS = {
  displayName: "",
  email: "",
  jobTitle: "",
  timezone: "UTC",
  theme: "system",
  language: "en",
  emailAlerts: true,
  weeklyDigest: true,
  productUpdates: false,
};

const form = document.querySelector("#settings-form");
const statusEl = document.querySelector("#status");
const resetButton = document.querySelector("#reset-button");
const navLinks = document.querySelectorAll(".nav-link");

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.dataset.theme = resolved;
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function populateForm(settings) {
  form.displayName.value = settings.displayName;
  form.email.value = settings.email;
  form.jobTitle.value = settings.jobTitle;
  form.timezone.value = settings.timezone;
  form.theme.value = settings.theme;
  form.language.value = settings.language;
  form.emailAlerts.checked = settings.emailAlerts;
  form.weeklyDigest.checked = settings.weeklyDigest;
  form.productUpdates.checked = settings.productUpdates;
}

function readForm() {
  return {
    displayName: form.displayName.value.trim(),
    email: form.email.value.trim(),
    jobTitle: form.jobTitle.value.trim(),
    timezone: form.timezone.value,
    theme: form.theme.value,
    language: form.language.value,
    emailAlerts: form.emailAlerts.checked,
    weeklyDigest: form.weeklyDigest.checked,
    productUpdates: form.productUpdates.checked,
  };
}

function setFieldError(name, message) {
  const input = form.elements[name];
  const errorEl = document.querySelector(`[data-error-for="${name}"]`);
  const field = input.closest(".field");

  if (!errorEl || !field) {
    return;
  }

  if (message) {
    field.classList.add("has-error");
    errorEl.hidden = false;
    errorEl.textContent = message;
    input.setAttribute("aria-invalid", "true");
  } else {
    field.classList.remove("has-error");
    errorEl.hidden = true;
    errorEl.textContent = "";
    input.removeAttribute("aria-invalid");
  }
}

function clearErrors() {
  setFieldError("displayName", "");
  setFieldError("email", "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(settings) {
  const errors = {};

  if (!settings.displayName) {
    errors.displayName = "Enter a display name.";
  }

  if (!settings.email) {
    errors.email = "Enter an email address.";
  } else if (!isValidEmail(settings.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

function showStatus(type, message) {
  statusEl.hidden = false;
  statusEl.className = `status ${type}`;
  statusEl.textContent = message;
}

function hideStatus() {
  statusEl.hidden = true;
  statusEl.textContent = "";
}

function setActiveNav() {
  const hash = window.location.hash || "#profile";
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === hash);
  });
}

const initialSettings = loadSettings();
populateForm(initialSettings);
applyTheme(initialSettings.theme);
setActiveNav();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const settings = readForm();
  const errors = validate(settings);
  const errorNames = Object.keys(errors);

  if (errorNames.length > 0) {
    errorNames.forEach((name) => setFieldError(name, errors[name]));
    showStatus("error", "Please fix the highlighted fields before saving.");
    form.elements[errorNames[0]].focus();
    return;
  }

  saveSettings(settings);
  applyTheme(settings.theme);
  showStatus("success", "Settings saved.");
});

resetButton.addEventListener("click", () => {
  clearErrors();
  populateForm(DEFAULT_SETTINGS);
  applyTheme(DEFAULT_SETTINGS.theme);
  saveSettings(DEFAULT_SETTINGS);
  showStatus("success", "Settings restored to defaults.");
});

form.theme.addEventListener("change", () => {
  applyTheme(form.theme.value);
});

window.addEventListener("hashchange", setActiveNav);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (form.theme.value === "system") {
      applyTheme("system");
    }
  });

["displayName", "email"].forEach((name) => {
  form.elements[name].addEventListener("input", () => {
    setFieldError(name, "");
    hideStatus();
  });
});
