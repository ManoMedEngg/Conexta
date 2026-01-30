function renderLanding(root) {
  if (!root) return;
  document.title = t("app_title");

  root.innerHTML = `
    <div class="layout-col animate-slide-up">
      <section class="hero-layout">
        <div>
          <div class="hero-kicker">${t("landing_kicker")}</div>
          <h1 class="hero-title">${t("landing_heading")}</h1>
          <p class="hero-description">${t("landing_subtitle")}</p>
          <div class="hero-actions">
            <button id="hero-try-btn" class="btn">${t("try_conexta")}</button>
            <button id="hero-ppt-btn" class="btn btn-secondary">${t("landing_ppt") || "View Conexta.ppt"
    }</button>
          </div>
        </div>
        <div class="glass-card animate-float-soft">
          <div class="diagram">
            <div class="diagram-node diagram-node-legacy fade-in-on-scroll">
              <div class="diagram-node-title">${t("landing_about_legacy")}</div>
              <div class="diagram-node-sub">CT • ECG • X-ray • Infusion</div>
            </div>
            <div class="diagram-node diagram-node-converter fade-in-on-scroll">
              <div class="diagram-node-title">${t(
      "landing_about_converter"
    )}</div>
              <div class="diagram-node-sub">Analog → IoT packets</div>
            </div>
            <div class="diagram-node diagram-node-cloud fade-in-on-scroll">
              <div class="diagram-node-title">${t("landing_about_cloud")}</div>
              <div class="diagram-node-sub">FHIR-ish streams • Alerts • Reports</div>
            </div>
            <div class="diagram-node diagram-node-role diagram-node-doctor fade-in-on-scroll">
              <div class="diagram-node-title">${t("role_doctor")}</div>
              <div class="diagram-node-sub">${t("landing_about_doctor")}</div>
            </div>
            <div class="diagram-node diagram-node-role diagram-node-patient fade-in-on-scroll">
              <div class="diagram-node-title">${t("role_patient")}</div>
              <div class="diagram-node-sub">${t("landing_about_patient")}</div>
            </div>
            <div class="diagram-node diagram-node-role diagram-node-engineer fade-in-on-scroll">
              <div class="diagram-node-title">${t("role_engineer")}</div>
              <div class="diagram-node-sub">${t("landing_about_engineer")}</div>
            </div>
            <div class="diagram-node diagram-node-role diagram-node-vendor fade-in-on-scroll">
              <div class="diagram-node-title">${t("role_vendor")}</div>
              <div class="diagram-node-sub">${t("landing_about_vendor")}</div>
            </div>
            <div class="diagram-connection">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="rgba(0,255,255,0.1)" />
                    <stop offset="1" stop-color="rgba(0,255,255,0.8)" />
                  </linearGradient>
                </defs>
                <path d="M 10 25 Q 28 32 38 40" stroke="url(#beam)" stroke-width="0.6" fill="none" />
                <path d="M 38 40 Q 52 35 70 28" stroke="url(#beam)" stroke-width="0.7" fill="none" />
                <path d="M 70 30 Q 88 20 92 15" stroke="url(#beam)" stroke-width="0.5" fill="none" />
                <path d="M 72 30 Q 88 40 92 18" stroke="rgba(0,255,255,0.4)" stroke-width="0.4" fill="none" />
                <path d="M 72 30 Q 90 50 92 40" stroke="rgba(0,255,255,0.3)" stroke-width="0.4" fill="none" />
                <path d="M 72 30 Q 90 70 92 62" stroke="rgba(0,255,255,0.25)" stroke-width="0.4" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section class="section fade-in-on-scroll">
        <div class="section-title">${t("landing_about_title")}</div>
        <div class="two-column">
          <div class="glass-card" style="padding:14px 16px;">
            <p class="text-soft" style="font-size:0.85rem; margin-top:0;">
              Conexta wraps legacy CT, ECG, X-ray and pumps with a tiny IoT probe at the signal
              output. That probe samples, encrypts and beams your patient's physiology into a
              shared cloud canvas.
            </p>
            <p class="text-soft" style="font-size:0.85rem;">
              Doctors see real-time vitals and alarms, patients see their journey and prescriptions,
              biomedical engineers see fleet uptime and AMC, and vendors see service load —
              all stitched into the same hologram.
            </p>
          </div>
          <div class="glass-card" style="padding:14px 16px;">
            <div class="layout-row" style="justify-content:space-between; align-items:center;">
              <div>
                <div class="section-title" style="margin-bottom:4px;">${t("roles_at_a_glance")}</div>
                <p class="text-soft" style="font-size:0.8rem;">
                  ${t("roles_glance_desc")}
                </p>
              </div>
              <div class="status-ring status-ring-critical animate-pulse-glow">
                <span style="font-size:0.7rem;">IoT</span>
              </div>
            </div>
            <div class="chip-row">
              <button class="chip chip-active landing-role-chip">${t(
      "role_doctor"
    )}</button>
              <button class="chip landing-role-chip">${t(
      "role_patient"
    )}</button>
              <button class="chip landing-role-chip">${t(
      "role_engineer"
    )}</button>
              <button class="chip landing-role-chip">${t("role_vendor")}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  const tryBtn = document.getElementById("hero-try-btn");
  if (tryBtn) {
    tryBtn.addEventListener("click", () => navigate("/login"));
  }
  const pptBtn = document.getElementById("hero-ppt-btn");
  if (pptBtn) {
    pptBtn.addEventListener("click", () => {
      navigate("/presentation");
    });
  }

  root.querySelectorAll(".landing-role-chip").forEach((chip) => {
    chip.addEventListener("click", () => navigate("/login"));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  root.querySelectorAll(".fade-in-on-scroll").forEach((el) => observer.observe(el));
}

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderLanding(container);
  }
});

