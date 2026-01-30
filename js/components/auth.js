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
              <label class="field-label" for="login-user-id">${t("name")}</label>
              <input id="login-user-id" class="text-input" autocomplete="name" placeholder="Enter your name" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="login-password">${t("password")}</label>
              <input id="login-password" type="password" class="text-input" autocomplete="current-password" placeholder="Enter your password" />
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
            </div>
          </div>
        </div>

        <div id="auth-signup-view" style="display:none;">
          <div class="layout-col" style="gap:10px;">
            <div class="settings-field">
              <label class="field-label" for="signup-name">${t("name")}</label>
              <input id="signup-name" class="text-input" placeholder="Enter your Name" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-email">${t("email")}</label>
              <input id="signup-email" class="text-input" type="email" placeholder="Enter your E-mail" />
            </div>
            <div class="settings-field">
              <label class="field-label" for="signup-password">${t("password")}</label>
              <input id="signup-password" class="text-input" type="password" placeholder="Enter your Password" />
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

  // Helper to get selected role from chips
  const getSelectedRole = () => {
    const activeChip = root.querySelector('[data-role-select].chip-active');
    return activeChip ? activeChip.getAttribute('data-role-select') : 'doctor';
  };

  const loginSubmit = document.getElementById("login-submit");
  if (loginSubmit) {
    loginSubmit.addEventListener("click", () => {
      const name = document.getElementById("login-user-id").value.trim();
      const captchaVal = document.getElementById("login-captcha").value.trim();

      if (!name) {
        alert("Please enter a Name.");
        return;
      }

      if (String(captchaVal) !== String(currentCaptcha.answer)) {
        alert("Captcha mismatch. Please try again.");
        currentCaptcha = buildCaptcha();
        renderAuth(root);
        return;
      }

      // DUMMY LOGIN: Create session with Name and Selected Role
      const role = getSelectedRole();
      const session = {
        id: name.toLowerCase().replace(/\s/g, ''),
        name: name,
        role: role,
        isGuest: true
      };

      setAuthSession(session);
      navigate(`/dashboard/${role}`);
      renderHeader();
    });
  }

  const signupSubmit = document.getElementById("signup-submit");
  if (signupSubmit) {
    signupSubmit.addEventListener("click", () => {
      const name = document.getElementById("signup-name").value.trim();
      const role = document.getElementById("signup-role").value;
      const captchaVal = document.getElementById("signup-captcha").value.trim();

      if (!name) {
        alert("Please enter a Name.");
        return;
      }

      if (String(captchaVal) !== String(currentCaptcha.answer)) {
        alert("Captcha mismatch. Please try again.");
        currentCaptcha = buildCaptcha();
        renderAuth(root);
        return;
      }

      // DUMMY SIGNUP: Direct login
      const session = {
        id: name.toLowerCase().replace(/\s/g, ''),
        name: name,
        role: role,
        isGuest: true
      };

      setAuthSession(session);
      navigate(`/dashboard/${role}`);
      renderHeader();
    });
  }

  const forgotUserBtn = document.getElementById("forgot-user");
  const forgotPassBtn = document.getElementById("forgot-password");
  if (forgotUserBtn) {
    forgotUserBtn.addEventListener("click", () => {
      openInfoModal(
        t("forgot_user"),
        "Just enter any Name to login."
      );
    });
  }
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener("click", () => {
      openInfoModal(
        t("forgot_password"),
        "Password is ignored in this demo. Just enter a Name."
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

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/login" || path === "/signup") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderAuth(container);
  }
});

