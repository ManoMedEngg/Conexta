function toggleSettingsPanel(show) {
  const panel = document.getElementById("settings-panel");
  if (!panel) return;
  const shouldShow =
    typeof show === "boolean"
      ? show
      : panel.classList.contains("settings-hidden");
  panel.classList.toggle("settings-hidden", !shouldShow);
  panel.setAttribute("aria-hidden", shouldShow ? "false" : "true");
}

function renderSettingsPanel() {
  const panel = document.getElementById("settings-panel");
  if (!panel) return;
  const settings = getSettings();
  const session = getAuthSession();
  const displayName =
    (settings && settings.displayName) ||
    (session && session.name) ||
    t("header_guest");

  panel.innerHTML = `
    <div class="layout-col" style="height:100%;">
      <div>
        <div class="settings-section-title">${t("settings_title")}</div>
        <h2 style="margin:0 0 14px;font-size:1rem;">${t("app_title")}</h2>
      </div>

      <div class="settings-field">
        <label class="field-label" for="settings-display-name">${
          t("settings_name_label") || "Display name"
        }</label>
        <input id="settings-display-name" class="text-input" value="${displayName}" />
      </div>

      <div class="settings-field">
        <label class="field-label" for="settings-hue">${
          t("settings_theme_label") || "Accent hue"
        }</label>
        <input id="settings-hue" class="range-input" type="range" min="180" max="320" value="${
          (settings && settings.hue) || 200
        }" />
      </div>

      <div class="layout-row" style="margin-top:auto;justify-content:space-between;">
        <button id="settings-close" class="btn btn-secondary">${t("cancel")}</button>
        <button id="settings-logout" class="btn btn-ghost">${t("logout")}</button>
      </div>
    </div>
  `;

  const nameInput = document.getElementById("settings-display-name");
  const hueInput = document.getElementById("settings-hue");
  const closeBtn = document.getElementById("settings-close");
  const logoutBtn = document.getElementById("settings-logout");

  if (hueInput) {
    const applyHue = (value) => {
      document.documentElement.style.setProperty(
        "--primary-hue",
        String(value)
      );
      const merged = { ...(settings || {}), hue: Number(value), displayName };
      saveSettings(merged);
    };
    applyHue(hueInput.value);
    hueInput.addEventListener("input", (e) => applyHue(e.target.value));
  }

  if (nameInput) {
    nameInput.addEventListener("blur", () => {
      const value = nameInput.value.trim();
      const merged = {
        ...(settings || {}),
        displayName: value || displayName,
        hue: (settings && settings.hue) || 200,
      };
      saveSettings(merged);
      renderHeader();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleSettingsPanel(false));
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearAuthSession();
      const merged = { ...(settings || {}), displayName: null };
      saveSettings(merged);
      renderHeader();
      toggleSettingsPanel(false);
      navigate("/");
    });
  }
}

window.addEventListener("load", renderSettingsPanel);
window.addEventListener("conexta:languageChanged", renderSettingsPanel);

