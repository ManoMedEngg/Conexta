import { buildShell } from "../main.js";
import { requireRole } from "../main.js";
import { api } from "../services/api.js";
import { t } from "../services/i18n.js";

export function renderEngineerDashboard() {
  if (!requireRole("engineer")) return;
  const wrap = document.createElement("div");
  wrap.className = "cx-dashboard-shell";

  const sidebar = document.createElement("aside");
  sidebar.className = "cx-sidebar";
  sidebar.innerHTML = `
    <div class="cx-sidebar-title">${t("roles.engineer")}</div>
    <div class="cx-sidebar-link cx-sidebar-link--active">${t("engineer.menu.overview")}</div>
  `;

  const main = document.createElement("div");
  main.className = "cx-main-body";

  const header = document.createElement("div");
  header.className = "cx-card cx-card-hover";
  header.innerHTML = `
    <div class="cx-card-header">
      <div>
        <div class="cx-card-title">${t("engineer.heading")}</div>
        <div class="cx-card-subtitle">${t("engineer.subheading")}</div>
      </div>
    </div>
    <div class="cx-kpi-row" id="cx-eng-kpis"></div>
  `;

  const devicesCard = document.createElement("div");
  devicesCard.className = "cx-card cx-card-hover";
  devicesCard.innerHTML = `
    <div class="cx-card-header">
      <div class="cx-card-title">${t("engineer.devices")}</div>
      <div class="cx-card-subtitle">${t("engineer.devicesSubtitle")}</div>
    </div>
    <table class="cx-table" id="cx-eng-devices">
      <thead>
        <tr>
          <th>${t("common.name")}</th>
          <th>${t("engineer.type")}</th>
          <th>${t("engineer.status")}</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  main.appendChild(header);
  main.appendChild(devicesCard);
  wrap.appendChild(sidebar);
  wrap.appendChild(main);
  buildShell(wrap);

  api.getDevices().then((list) => {
    const tbody = document.querySelector("#cx-eng-devices tbody");
    const kpis = document.getElementById("cx-eng-kpis");
    if (!tbody || !kpis) return;
    let online = 0,
      offline = 0,
      maint = 0;
    tbody.innerHTML = "";
    list.forEach((d) => {
      if (d.status === "online") online++;
      else if (d.status === "offline") offline++;
      else maint++;
      const tr = document.createElement("tr");
      const color =
        d.status === "online" ? "cx-status-ok" : d.status === "maintenance" ? "cx-status-warn" : "cx-status-bad";
      tr.innerHTML = `
        <td>${d.name}</td>
        <td>${d.type}</td>
        <td>
          <span class="cx-tag">
            <span class="cx-tag-dot ${color}"></span>
            ${d.status}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });
    kpis.innerHTML = `
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("engineer.online")}</div>
        <div class="cx-kpi-value">${online}</div>
      </div>
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("engineer.offline")}</div>
        <div class="cx-kpi-value">${offline}</div>
      </div>
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("engineer.maintenance")}</div>
        <div class="cx-kpi-value">${maint}</div>
      </div>
    `;
  });
}

