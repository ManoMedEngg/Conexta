import { buildShell } from "../main.js";
import { requireRole } from "../main.js";
import { api } from "../services/api.js";
import { t } from "../services/i18n.js";

export function renderVendorDashboard() {
  if (!requireRole("vendor")) return;
  const wrap = document.createElement("div");
  wrap.className = "cx-dashboard-shell";

  const sidebar = document.createElement("aside");
  sidebar.className = "cx-sidebar";
  sidebar.innerHTML = `
    <div class="cx-sidebar-title">${t("roles.vendor")}</div>
    <div class="cx-sidebar-link cx-sidebar-link--active">${t("vendor.menu.overview")}</div>
  `;

  const main = document.createElement("div");
  main.className = "cx-main-body";

  const card = document.createElement("div");
  card.className = "cx-card cx-card-hover";
  card.innerHTML = `
    <div class="cx-card-header">
      <div>
        <div class="cx-card-title">${t("vendor.heading")}</div>
        <div class="cx-card-subtitle">${t("vendor.subheading")}</div>
      </div>
    </div>
    <table class="cx-table" id="cx-vend-amc">
      <thead>
        <tr>
          <th>${t("common.name")}</th>
          <th>${t("vendor.status")}</th>
          <th>${t("vendor.expires")}</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  main.appendChild(card);
  wrap.appendChild(sidebar);
  wrap.appendChild(main);
  buildShell(wrap);

  api.getAmcContracts().then((list) => {
    const tbody = document.querySelector("#cx-vend-amc tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    list.forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.machineName}</td>
        <td>${c.status}</td>
        <td>${c.expires}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}

