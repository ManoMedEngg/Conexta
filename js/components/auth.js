function buildCaptcha() {
  const a = 3 + Math.floor(Math.random() * 6);
  const b = 2 + Math.floor(Math.random() * 5);
  return {
    question: `${a} + ${b}`,
    answer: a + b,
  };
}

let currentCaptcha = buildCaptcha();

function renderAuth(root) {
  if (!root) return;
  document.title = t("auth_title");

  const session = getAuthSession();
  if (session) {
    // Already logged in; send to their dashboard
    const dashboardPath = `/dashboard/${session.role || "doctor"}`;
    navigate(dashboardPath);
    return;
  }

  const captchaText = currentCaptcha.question;

  root.innerHTML = `
    <div class="layout-col animate-slide-up">
      <section class="glass-card" style="padding:18px 18px 16px;">
        <div class="layout-row" style="gap:18px; align-items:flex-start;">
          <div class="layout-grow">
            <div class="hero-kicker">${t("landing_kicker")}</div>
            <h2 style="margin:4px 0 6px; font-size:1.35rem;">${t(
    "auth_title"
  )}</h2>
            <p class="text-soft" style="font-size:0.85rem; max-width:26rem;">
              ${t("auth_subtitle")}
            </p>
            <div class="chip-row" style="margin-top:10px;">
              <span class="chip chip-active" data-role-select="doctor" style="cursor:pointer;">${t(
    "role_doctor"
  )}</span>
              <span class="chip" data-role-select="patient" style="cursor:pointer;">${t(
    "role_patient"
  )}</span>
              <span class="chip" data-role-select="engineer" style="cursor:pointer;">${t(
    "role_engineer"
  )}</span>
              <span class="chip" data-role-select="vendor" style="cursor:pointer;">${t(
    "role_vendor"
  )}</span>
            </div>
          </div>
          <div class="glass-card" style="padding:10px 12px; min-width:220px;">
            <div class="layout-row" style="align-items:center; justify-content:space-between;">
              <span class="pill pill-success">IoT beds online</span>
              <span class="metric-value">12</span>
            </div>
            <div class="mini-graph" style="margin-top:6px;">
              <div class="mini-graph-line"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="glass-card" style="padding:14px 16px;">
        <div class="chip-row" style="margin-bottom:12px;">
          <button id="auth-tab-login" class="chip chip-active">${t(
    "auth_tab_login"
  )}</button>
          <button id="auth-tab-signup" class="chip">${t("auth_tab_signup")}</button>
        </div>

        <div id="auth-login-view">
          <div class="layout-col" style="gap:10px;">
            <div class="settings-field">
              <label class="field-label" for="login-user-id">${t("user_id")}</label>
              <input id="login-user-id" class="text-input" autocomplete="username" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="login-password">${t("password")}</label>
              <input id="login-password" type="password" class="text-input" autocomplete="current-password" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="login-captcha">${t(
    "captcha_label"
  )} – ${captchaText}</label>
              <input id="login-captcha" class="text-input" placeholder="${t(
    "captcha_placeholder"
  )}" />
            </div>
            <div class="layout-row" style="justify-content:space-between; font-size:0.75rem;">
              <button id="forgot-user" class="btn-ghost" style="border:none;padding:0;color:var(--accent);">
                ${t("forgot_user")}
              </button>
              <button id="forgot-password" class="btn-ghost" style="border:none;padding:0;color:var(--accent);">
                ${t("forgot_password")}
              </button>
            </div>
            <div class="layout-row" style="margin-top:10px; gap:10px; align-items:center;">
              <button id="login-submit" class="btn">${t("sign_in")}</button>
              <button id="trial-login" class="btn btn-secondary" style="font-size:0.78rem;padding-inline:0.9rem;">
                ${t("trial_login")}
              </button>
            </div>
          </div>
        </div>

        <div id="auth-signup-view" style="display:none;">
          <div class="layout-col" style="gap:10px;">
            <div class="settings-field">
              <label class="field-label" for="signup-name">${t("name")}</label>
              <input id="signup-name" class="text-input" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-dob">${t("dob")}</label>
              <input id="signup-dob" class="text-input" type="date" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-email">${t("email")}</label>
              <input id="signup-email" class="text-input" type="email" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-phone">${t("phone")}</label>
              <input id="signup-phone" class="text-input" type="tel" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-password">${t("password")}</label>
              <input id="signup-password" class="text-input" type="password" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-role">Role</label>
              <select id="signup-role" class="select-input">
                <option value="doctor">${t("role_doctor")}</option>
                <option value="patient">${t("role_patient")}</option>
                <option value="engineer">${t("role_engineer")}</option>
                <option value="vendor">${t("role_vendor")}</option>
              </select>
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-captcha">${t(
    "captcha_label"
  )} – ${captchaText}</label>
              <input id="signup-captcha" class="text-input" placeholder="${t(
    "captcha_placeholder"
  )}" />
            </div>
            <div class="layout-row" style="margin-top:10px;">
              <button id="signup-submit" class="btn">${t("create_account")}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  const loginTab = document.getElementById("auth-tab-login");
  const signupTab = document.getElementById("auth-tab-signup");
  const loginView = document.getElementById("auth-login-view");
  const signupView = document.getElementById("auth-signup-view");

  if (loginTab && signupTab && loginView && signupView) {
    loginTab.addEventListener("click", () => {
      loginView.style.display = "block";
      signupView.style.display = "none";
      loginTab.classList.add("chip-active");
      signupTab.classList.remove("chip-active");
    });
    signupTab.addEventListener("click", () => {
      loginView.style.display = "none";
      signupView.style.display = "block";
      signupTab.classList.add("chip-active");
      loginTab.classList.remove("chip-active");
    });
  }

  const loginSubmit = document.getElementById("login-submit");
  if (loginSubmit) {
    loginSubmit.addEventListener("click", () => {
      const userId = document.getElementById("login-user-id").value.trim();
      const password = document.getElementById("login-password").value;
      const captchaVal = document.getElementById("login-captcha").value.trim();
      if (String(captchaVal) !== String(currentCaptcha.answer)) {
        alert("Captcha mismatch. Please try again.");
        currentCaptcha = buildCaptcha();
        renderAuth(root);
        return;
      }
      const session = authenticate(userId, password);
      if (!session) {
        alert("Invalid credentials in demo mode.");
        return;
      }
      navigate(`/dashboard/${session.role || "doctor"}`);
      renderHeader();
    });
  }

  const signupSubmit = document.getElementById("signup-submit");
  if (signupSubmit) {
    signupSubmit.addEventListener("click", () => {
      const name = document.getElementById("signup-name").value.trim();
      const dob = document.getElementById("signup-dob").value;
      const email = document.getElementById("signup-email").value.trim();
      const phone = document.getElementById("signup-phone").value.trim();
      const password = document.getElementById("signup-password").value;
      const role = document.getElementById("signup-role").value;
      const captchaVal = document.getElementById("signup-captcha").value.trim();

      if (!name || !email || !password) {
        alert("Please fill name, email and password for demo signup.");
        return;
      }
      if (String(captchaVal) !== String(currentCaptcha.answer)) {
        alert("Captcha mismatch. Please try again.");
        currentCaptcha = buildCaptcha();
        renderAuth(root);
        return;
      }

      const userId = email.toLowerCase();
      registerUser({
        id: userId,
        password,
        role,
        name,
        dob,
        email,
        phone,
      });
      alert("Demo account created. You can now login using email and password.");
    });
  }

  const trialLoginBtn = document.getElementById("trial-login");
  if (trialLoginBtn) {
    trialLoginBtn.addEventListener("click", () => {
      openTrialLoginModal();
    });
  }

  const forgotUserBtn = document.getElementById("forgot-user");
  const forgotPassBtn = document.getElementById("forgot-password");
  if (forgotUserBtn) {
    forgotUserBtn.addEventListener("click", () => {
      openInfoModal(
        t("forgot_user"),
        "In this demo, trial accounts are pre-configured. Use the Trial login button to preview Conexta."
      );
    });
  }
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener("click", () => {
      openInfoModal(
        t("forgot_password"),
        "Password reset flows are simulated. For now, simply use trial login or re-signup with a new email."
      );
    });
  }

  // Handle role chips interaction
  const roleChips = root.querySelectorAll('[data-role-select]');
  roleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // 1. Update visual state
      roleChips.forEach(c => c.classList.remove('chip-active'));
      chip.classList.add('chip-active');

      // 2. Sync with signup select if available
      const selectedRole = chip.getAttribute('data-role-select');
      const signupRoleSelect = document.getElementById('signup-role');
      if (signupRoleSelect) {
        signupRoleSelect.value = selectedRole;
      }
    });
  });
}

function openInfoModal(title, body) {
  const root = document.getElementById("modal-root");
  if (!root) return;
  root.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal animate-slide-up">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button id="modal-close" class="icon-button">✕</button>
      </div>
      <div class="modal-body">
        <p>${body}</p>
      </div>
    </div>
  `;
  const close = () => {
    root.innerHTML = "";
  };
  root.querySelector(".modal-backdrop").addEventListener("click", close);
  document.getElementById("modal-close").addEventListener("click", close);
}

function openTrialLoginModal() {
  const root = document.getElementById("modal-root");
  if (!root) return;
  root.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal animate-slide-up">
      <div class="modal-header">
        <div class="modal-title">${t("trial_login")}</div>
        <button id="trial-modal-close" class="icon-button">✕</button>
      </div>
      <div class="modal-body">
        <p class="text-soft" style="font-size:0.8rem;">
          Pick a role to auto-login with demo data. These sessions are local to your browser.
        </p>
        <div class="chip-row">
          <button class="chip chip-active" data-role="doctor">${t(
    "role_doctor"
  )}</button>
          <button class="chip" data-role="patient">${t("role_patient")}</button>
          <button class="chip" data-role="engineer">${t(
    "role_engineer"
  )}</button>
          <button class="chip" data-role="vendor">${t("role_vendor")}</button>
        </div>
        <div class="layout-row" style="margin-top:12px;justify-content:flex-end;">
          <button id="trial-go" class="btn btn-secondary">${t("trial_login")}</button>
        </div>
      </div>
    </div>
  `;

  let selectedRole = "doctor";
  root.querySelectorAll(".chip[data-role]").forEach((chip) => {
    chip.addEventListener("click", () => {
      selectedRole = chip.getAttribute("data-role");
      root.querySelectorAll(".chip[data-role]").forEach((c) =>
        c.classList.toggle("chip-active", c === chip)
      );
    });
  });

  const close = () => {
    root.innerHTML = "";
  };
  root.querySelector(".modal-backdrop").addEventListener("click", close);
  document.getElementById("trial-modal-close").addEventListener("click", close);

  document.getElementById("trial-go").addEventListener("click", () => {
    const demoUsers = getDemoUsers();
    const found =
      demoUsers.find((u) => u.role === selectedRole) || demoUsers[0];
    const session = {
      id: found.id,
      name: found.name,
      role: found.role,
    };
    setAuthSession(session);
    renderHeader();
    navigate(`/dashboard/${session.role || "doctor"}`);
    close();
  });
}

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/login" || path === "/signup") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderAuth(container);
  }
});

