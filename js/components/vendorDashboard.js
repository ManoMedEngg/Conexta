function renderVendorDashboard(root) {
  if (!root) return;
  document.title = `Vendor · Conexta`;

  const services = [
    {
      id: "AMC-CT-01",
      machine: "CT Scanner",
      expiry: "2026-03-15",
      nextService: "2026-02-20",
      lastService: "2025-12-01",
      status: "active",
    },
    {
      id: "AMC-INF-02",
      machine: "Infusion Pumps Ward-5",
      expiry: "2026-01-20",
      nextService: "2026-01-05",
      lastService: "2025-11-28",
      status: "expiring",
    },
  ];

  root.innerHTML = `
    <div class="layout-col animate-slide-up">
      <section class="layout-row" style="gap:18px; align-items:flex-start;">
        <div class="glass-card layout-grow" style="padding:14px 16px;">
          <div class="section-title">AMC & service information</div>
          <table class="table-like">
            <thead>
              <tr>
                <th>ID</th>
                <th>Machine</th>
                <th>Expiry</th>
                <th>Next service</th>
                <th>Last service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${services
                .map(
                  (s) => `
                <tr>
                  <td>${s.id}</td>
                  <td>${s.machine}</td>
                  <td>${s.expiry}</td>
                  <td>${s.nextService}</td>
                  <td>${s.lastService}</td>
                  <td>
                    <span class="pill ${
                      s.status === "expiring" ? "pill-critical" : "pill-success"
                    }">
                      ${s.status}
                    </span>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="glass-card" style="padding:12px 14px; min-width:260px;">
          <div class="section-title">Service alerts</div>
          <div class="layout-col" style="gap:8px;">
            <div class="alert-card">
              <div class="alert-row">
                <span class="pill pill-critical">
                  <span class="badge-dot badge-critical"></span>New request
                </span>
                <span class="alert-meta">Infusion Pump • Ward-5</span>
              </div>
              <div class="alert-meta">
                Biomedical engineer raised a service request for flow error.
              </div>
            </div>
            <div class="alert-card critical-alert-shake">
              <div class="alert-row">
                <span class="pill pill-critical">
                  <span class="badge-dot badge-critical"></span>Overdue
                </span>
                <span class="alert-meta">ECG Monitor • ICU-2</span>
              </div>
              <div class="alert-meta">
                Preventive maintenance overdue by 5 days. Escalate to regional lead.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/dashboard/vendor") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderVendorDashboard(container);
  }
});

