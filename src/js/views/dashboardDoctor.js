import { buildShell } from "../main.js";
import { requireRole } from "../main.js";
import { api } from "../services/api.js";
import { t } from "../services/i18n.js";

export function renderDoctorDashboard() {
  if (!requireRole("doctor")) return;
  const container = document.createElement("div");
  container.className = "cx-dashboard-shell";

  const sidebar = document.createElement("aside");
  sidebar.className = "cx-sidebar";
  sidebar.innerHTML = `
    <div class="cx-sidebar-title">${t("roles.doctor")}</div>
    <div class="cx-sidebar-link cx-sidebar-link--active">${t("doctor.menu.overview")}</div>
  `;

  const main = document.createElement("div");
  main.className = "cx-main-body";

  const headerCard = document.createElement("div");
  headerCard.className = "cx-card cx-card-hover";
  headerCard.innerHTML = `
    <div class="cx-card-header">
      <div>
        <div class="cx-card-title">${t("doctor.heading")}</div>
        <div class="cx-card-subtitle">${t("doctor.subheading")}</div>
      </div>
      <span class="cx-tag">
        <span class="cx-tag-dot cx-status-ok"></span>
        ${t("doctor.tagLive")}
      </span>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "cx-grid cx-grid-2";

  const patientsCard = document.createElement("div");
  patientsCard.className = "cx-card cx-card-hover";
  patientsCard.innerHTML = `
    <div class="cx-card-header">
      <div class="cx-card-title">${t("doctor.patients")}</div>
      <div class="cx-card-subtitle">${t("doctor.patientsSubtitle")}</div>
    </div>
    <table class="cx-table" id="cx-doc-patients">
      <thead>
        <tr>
          <th>${t("common.name")}</th>
          <th>${t("doctor.vitals")}</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const alertsCard = document.createElement("div");
  alertsCard.className = "cx-card cx-card-hover";
  alertsCard.innerHTML = `
    <div class="cx-card-header">
      <div class="cx-card-title">${t("doctor.alerts")}</div>
      <div class="cx-card-subtitle">${t("doctor.alertsSubtitle")}</div>
    </div>
    <ul id="cx-doc-alerts" style="list-style:none;padding:0;margin:0;font-size:0.75rem;"></ul>
  `;

  grid.appendChild(patientsCard);
  grid.appendChild(alertsCard);

  main.appendChild(headerCard);
  main.appendChild(grid);

  container.appendChild(sidebar);
  container.appendChild(main);

  buildShell(container);

  api.getPatients().then((list) => {
    const tbody = document.querySelector("#cx-doc-patients tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    list.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.latestVitals || "--"}</td>
      `;
      tbody.appendChild(tr);
    });
  });

  api.getAlerts({ type: "critical" }).then((list) => {
    const ul = document.getElementById("cx-doc-alerts");
    if (!ul) return;
    ul.innerHTML = "";
    list.forEach((a) => {
      const li = document.createElement("li");
      li.className = "cx-alert cx-pulse-alert";
      li.innerHTML = `
        <div class="cx-alert-title">${a.title}</div>
        <div>${a.message}</div>
      `;
      ul.appendChild(li);
    });
  });
}

