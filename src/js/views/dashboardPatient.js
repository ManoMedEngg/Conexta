import { buildShell } from "../main.js";
import { requireRole } from "../main.js";
import { api } from "../services/api.js";
import { t } from "../services/i18n.js";

export function renderPatientDashboard() {
  if (!requireRole("patient")) return;
  const wrap = document.createElement("div");
  wrap.className = "cx-dashboard-shell";

  const sidebar = document.createElement("aside");
  sidebar.className = "cx-sidebar";
  sidebar.innerHTML = `
    <div class="cx-sidebar-title">${t("roles.patient")}</div>
    <div class="cx-sidebar-link cx-sidebar-link--active">${t("patient.menu.overview")}</div>
  `;

  const main = document.createElement("div");
  main.className = "cx-main-body";

  const card = document.createElement("div");
  card.className = "cx-card cx-card-hover";
  card.innerHTML = `
    <div class="cx-card-header">
      <div>
        <div class="cx-card-title">${t("patient.heading")}</div>
        <div class="cx-card-subtitle">${t("patient.subheading")}</div>
      </div>
    </div>
    <div class="cx-kpi-row" id="cx-pat-vitals"></div>
  `;

  main.appendChild(card);
  wrap.appendChild(sidebar);
  wrap.appendChild(main);
  buildShell(wrap);

  api.getPatientSelf().then((p) => {
    const row = document.getElementById("cx-pat-vitals");
    if (!row) return;
    row.innerHTML = `
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("patient.hr")}</div>
        <div class="cx-kpi-value">${p.vitals.hr} bpm</div>
      </div>
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("patient.bp")}</div>
        <div class="cx-kpi-value">${p.vitals.bp}</div>
      </div>
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("patient.spo2")}</div>
        <div class="cx-kpi-value">${p.vitals.spo2}%</div>
      </div>
    `;
  });
}

