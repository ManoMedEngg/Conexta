import { buildShell, setSession } from "../main.js";
import { navigate } from "../router.js";
import { t } from "../services/i18n.js";
import { api } from "../services/api.js";

export function renderLoginView() {
  const container = document.createElement("div");
  container.className = "cx-layout-auth";

  const hero = document.createElement("section");
  hero.className = "cx-auth-hero cx-card-hover cx-soft-float";
  hero.innerHTML = `
    <div class="cx-pill">${t("landing.tagline")}</div>
    <h1 style="margin-top:0.7rem;font-size:1.4rem;font-weight:600;">
      ${t("landing.title")}
    </h1>
    <p style="margin-top:0.5rem;font-size:0.85rem;color:#d1d5db;max-width:360px;">
      ${t("landing.body")}
    </p>
    <div style="margin-top:1.4rem;display:flex;gap:0.6rem;font-size:0.75rem;">
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("landing.kpiDevices")}</div>
        <div class="cx-kpi-value">128</div>
      </div>
      <div class="cx-kpi">
        <div class="cx-kpi-label">${t("landing.kpiZeroDowntime")}</div>
        <div class="cx-kpi-value">99.9%</div>
      </div>
    </div>
  `;

  const panel = document.createElement("section");
  panel.className = "cx-auth-panel cx-card-hover";

  let mode = "login";

  function renderForm() {
    panel.innerHTML = "";
    const header = document.createElement("div");
    const tabs = document.createElement("div");
    tabs.className = "cx-tabs";
    const tLogin = document.createElement("button");
    tLogin.className = "cx-tab" + (mode === "login" ? " cx-tab--active" : "");
    tLogin.textContent = t("auth.login");
    tLogin.onclick = () => {
      mode = "login";
      renderForm();
    };
    const tSignup = document.createElement("button");
    tSignup.className = "cx-tab" + (mode === "signup" ? " cx-tab--active" : "");
    tSignup.textContent = t("auth.signup");
    tSignup.onclick = () => {
      mode = "signup";
      renderForm();
    };
    tabs.appendChild(tLogin);
    tabs.appendChild(tSignup);

    const title = document.createElement("div");
    title.className = "cx-auth-title";
    title.textContent = mode === "login" ? t("auth.loginTitle") : t("auth.signupTitle");
    const subtitle = document.createElement("div");
    subtitle.className = "cx-auth-subtitle";
    subtitle.textContent = t("auth.subtitle");

    header.appendChild(tabs);
    header.appendChild(title);
    header.appendChild(subtitle);

    const form = document.createElement("form");
    let errEl = document.createElement("div");
    errEl.className = "cx-error";

    const nameGroup = document.createElement("div");
    nameGroup.className = "cx-field-group";
    if (mode === "signup") {
      nameGroup.innerHTML = `
        <div class="cx-label">${t("auth.name")}</div>
        <input class="cx-input" name="name" autocomplete="name" />
      `;
    }

    const row = document.createElement("div");
    row.className = "cx-row";
    row.innerHTML = `
      <div class="cx-field-group">
        <div class="cx-label">${t("auth.email")}</div>
        <input class="cx-input" name="email" type="email" autocomplete="email" />
      </div>
      <div class="cx-field-group">
        <div class="cx-label">${t("auth.password")}</div>
        <input class="cx-input" name="password" type="password" autocomplete="current-password" />
      </div>
    `;

    const roleGroup = document.createElement("div");
    roleGroup.className = "cx-field-group";
    roleGroup.innerHTML = `
      <div class="cx-label">${t("auth.role")}</div>
      <select class="cx-select" name="role">
        <option value="doctor">${t("roles.doctor")}</option>
        <option value="patient">${t("roles.patient")}</option>
        <option value="engineer">${t("roles.engineer")}</option>
        <option value="vendor">${t("roles.vendor")}</option>
      </select>
    `;

    const submitRow = document.createElement("div");
    submitRow.style.marginTop = "0.8rem";
    submitRow.innerHTML = `
      <button type="submit" class="cx-btn" style="width:100%;">
        ${mode === "login" ? t("auth.login") : t("auth.signup")}
      </button>
    `;

    form.appendChild(nameGroup);
    form.appendChild(row);
    form.appendChild(roleGroup);
    form.appendChild(submitRow);
    form.appendChild(errEl);

    form.onsubmit = async (e) => {
      e.preventDefault();
      errEl.textContent = "";
      const fd = new FormData(form);
      const payload = {
        name: fd.get("name")?.toString().trim() || "",
        email: fd.get("email")?.toString().trim() || "",
        password: fd.get("password")?.toString() || "",
        role: fd.get("role")?.toString() || "doctor"
      };
      if (!payload.email || !payload.password) {
        errEl.textContent = t("auth.errorRequired");
        errEl.classList.add("cx-wiggle");
        setTimeout(() => errEl.classList.remove("cx-wiggle"), 250);
        return;
      }
      try {
        let user;
        if (mode === "signup") {
          user = await api.signup(payload);
        } else {
          user = await api.login(payload);
        }
        setSession({ id: user.id, role: user.role, email: user.email, name: user.name });
        if (user.role === "doctor") navigate("#/doctor");
        else if (user.role === "patient") navigate("#/patient");
        else if (user.role === "engineer") navigate("#/engineer");
        else navigate("#/vendor");
      } catch (err) {
        errEl.textContent = err.message || String(err);
        errEl.classList.add("cx-wiggle");
        setTimeout(() => errEl.classList.remove("cx-wiggle"), 250);
      }
    };

    const trials = document.createElement("div");
    trials.className = "cx-trial-buttons";
    const configs = [
      { role: "doctor", label: t("auth.trialDoctor") },
      { role: "patient", label: t("auth.trialPatient") },
      { role: "engineer", label: t("auth.trialEngineer") },
      { role: "vendor", label: t("auth.trialVendor") }
    ];
    configs.forEach((cfg) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cx-btn cx-btn-secondary";
      btn.textContent = cfg.label;
      btn.onclick = async () => {
        const user = await api.trialLogin(cfg.role);
        setSession({ id: user.id, role: user.role, email: user.email, name: user.name });
        if (user.role === "doctor") navigate("#/doctor");
        else if (user.role === "patient") navigate("#/patient");
        else if (user.role === "engineer") navigate("#/engineer");
        else navigate("#/vendor");
      };
      trials.appendChild(btn);
    });

    panel.appendChild(header);
    panel.appendChild(form);
    panel.appendChild(trials);
  }

  renderForm();
  container.appendChild(hero);
  container.appendChild(panel);
  buildShell(container);
}

