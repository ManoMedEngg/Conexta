import { initRouter, registerRoute, navigate } from "./router.js";
import { loadLocale, getLang, t } from "./services/i18n.js";
import { renderLoginView } from "./views/login.js";
import { renderDoctorDashboard } from "./views/dashboardDoctor.js";
import { renderPatientDashboard } from "./views/dashboardPatient.js";
import { renderEngineerDashboard } from "./views/dashboardEngineer.js";
import { renderVendorDashboard } from "./views/dashboardVendor.js";

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem("cx_session") || "null");
  } catch {
    return null;
  }
}

export function setSession(session) {
  sessionStorage.setItem("cx_session", JSON.stringify(session));
}

export function clearSession() {
  sessionStorage.removeItem("cx_session");
}

export function getSessionRole() {
  return getSession()?.role || null;
}

export function requireRole(role, fallback = "#/login") {
  const s = getSession();
  if (!s || s.role !== role) {
    navigate(fallback);
    return false;
  }
  return true;
}

export function buildShell(content) {
  const root = document.getElementById("app");
  if (!root) return;
  root.innerHTML = "";

  const shell = document.createElement("div");
  shell.className = "cx-shell";

  const nav = document.createElement("header");
  nav.className = "cx-navbar";
  nav.innerHTML = `
    <div class="cx-navbar-left">
      <div class="cx-logo"></div>
      <div>
        <div class="cx-title">Conexta V2</div>
        <div class="cx-subtitle">${t("app.subtitle")}</div>
      </div>
    </div>
    <div class="cx-navbar-right">
      <span class="cx-badge">
        <span style="width:7px;height:7px;border-radius:999px;background:#22c55e;"></span>
        ${t("app.status")}
      </span>
      <select class="cx-lang-switcher" id="cx-lang">
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
      </select>
      <button class="cx-btn cx-btn-secondary" id="cx-logout">${t("auth.logout")}</button>
    </div>
  `;

  const main = document.createElement("main");
  main.className = "cx-main";
  const body = document.createElement("div");
  body.className = "cx-main-body";
  body.appendChild(content);
  main.appendChild(body);

  const footer = document.createElement("footer");
  footer.className = "cx-footer";
  footer.textContent = "Conexta V2 · Medical IoT Demo · All data is simulated.";

  shell.appendChild(nav);
  shell.appendChild(main);
  shell.appendChild(footer);
  root.appendChild(shell);

  const langSel = nav.querySelector("#cx-lang");
  if (langSel) {
    langSel.value = getLang();
    langSel.addEventListener("change", async (e) => {
      await loadLocale(e.target.value);
      // Re-render current route with new locale
      navigate(window.location.hash || "#/login");
    });
  }

  const logoutBtn = nav.querySelector("#cx-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearSession();
      navigate("#/login");
    });
  }
}

async function bootstrap() {
  const storedLang = localStorage.getItem("cx_lang") || "en";
  await loadLocale(storedLang);

  registerRoute("#/login", renderLoginView);
  registerRoute("#/doctor", renderDoctorDashboard);
  registerRoute("#/patient", renderPatientDashboard);
  registerRoute("#/engineer", renderEngineerDashboard);
  registerRoute("#/vendor", renderVendorDashboard);

  initRouter();
}

bootstrap();

