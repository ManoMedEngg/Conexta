// Conexta main bootstrapping

function ensureInitialTheme() {
  const settings = getSettings();
  if (settings && typeof settings.hue === "number") {
    document.documentElement.style.setProperty(
      "--primary-hue",
      String(settings.hue)
    );
  }
}

function protectRoute(path, container, renderFn) {
  const session = getAuthSession();
  if (!session) {
    navigate("/login");
    return;
  }
  renderFn(container, session);
}

window.addEventListener("load", () => {
  ensureInitialTheme();

  registerRoute("/", (container) => renderLanding(container));
  registerRoute("/login", (container) => renderAuth(container));
  registerRoute("/signup", (container) => renderAuth(container));

  registerRoute("/dashboard/doctor", (container) =>
    protectRoute("/dashboard/doctor", container, (c) =>
      renderDoctorDashboard(c)
    )
  );
  registerRoute("/dashboard/patient", (container) =>
    protectRoute("/dashboard/patient", container, (c) =>
      renderPatientDashboard(c)
    )
  );
  registerRoute("/dashboard/engineer", (container) =>
    protectRoute("/dashboard/engineer", container, (c) =>
      renderEngineerDashboard(c)
    )
  );
  registerRoute("/dashboard/vendor", (container) =>
    protectRoute("/dashboard/vendor", container, (c) =>
      renderVendorDashboard(c)
    )
  );

  renderHeader();
  renderFooter();
  renderSettingsPanel();

  handleRoute();
});

