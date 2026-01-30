function renderHeader() {
  const headerEl = document.getElementById("app-header");
  if (!headerEl) return;
  const session = getAuthSession();
  const settings = getSettings();
  const displayName =
    (settings && settings.displayName) ||
    (session && session.name) ||
    t("header_guest");
  const roleLabel = session
    ? `${t("header_user_label")}: ${session.role || "doctor"}`
    : "";

  const languages = getSupportedLanguages();

  headerEl.innerHTML = `
    <div class="header-inner">
      <div class="brand">
      <div class="brand">
        <img src="assets/logo.svg" alt="Conexta" style="height:32px; filter: drop-shadow(0 0 5px rgba(0,242,255,0.4));" />
      </div>
      </div>
      <div class="header-right">
        <div class="user-chip">
          <span class="badge-dot badge-online"></span>
          <span>${displayName}</span>
        </div>
        ${roleLabel
      ? `<span class="text-soft" style="font-size:0.7rem;">${roleLabel}</span>`
      : ""
    }
        <select id="language-select" class="select-input language-select">
          ${languages
      .map(
        (lang) =>
          `<option value="${lang.code}" ${lang.code === currentLanguage ? "selected" : ""
          }>${lang.label}</option>`
      )
      .join("")}
        </select>
        <button id="settings-toggle" class="icon-button" title="${t(
        "settings"
      )}">
          ⚙
        </button>
        <button id="try-conexta-btn" class="btn btn-secondary">
          ${t("try_conexta")}
        </button>
      </div>
    </div>
  `;

  const langSelect = document.getElementById("language-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  const brandLabel = headerEl.querySelector(".brand");
  if (brandLabel) {
    brandLabel.style.cursor = "pointer";
    brandLabel.addEventListener("click", () => navigate("/"));
  }

  const settingsToggle = document.getElementById("settings-toggle");
  if (settingsToggle) {
    settingsToggle.addEventListener("click", () => {
      toggleSettingsPanel();
    });
  }

  const tryBtn = document.getElementById("try-conexta-btn");
  if (tryBtn) {
    tryBtn.addEventListener("click", () => navigate("/login"));
  }
}

window.addEventListener("conexta:languageChanged", renderHeader);

