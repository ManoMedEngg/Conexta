function renderHeader() {
  const headerEl = document.getElementById("app-header");
  if (!headerEl) return;

  // Logic: Only show header on Landing Page ("/")
  const currentPath = getCurrentPath();
  if (currentPath !== "/") {
    headerEl.style.display = "none";
    return;
  }
  headerEl.style.display = "block"; // Ensure it shows on landing

  const session = getAuthSession();
  const settings = getSettings();
  const displayName =
    (settings && settings.displayName) ||
    (session && session.name) ||
    t("header_guest");
  const roleLabel = session
    ? `${t("header_user_label")}: ${session.role || "doctor"}`
    : "";

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

