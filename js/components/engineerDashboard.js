function renderEngineerDashboard(root) {
  if (!root) return;
  document.title = `Biomedical engineer · Conexta`;

  const devices = getDevices();

  root.innerHTML = `
    <div class="layout-col animate-slide-up">
      <section class="layout-row" style="gap:18px; align-items:flex-start;">
        <div class="glass-card layout-grow" style="padding:14px 16px;">
          <div class="section-title">${t("machine_count_title")}</div>
          <table class="table-like">
            <thead>
              <tr>
                <th>ID</th>
                <th>${t("machine")}</th>
                <th>${t("type")}</th>
                <th>${t("location")}</th>
                <th>${t("status")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${devices
      .map(
        (d) => `
                <tr data-device-id="${d.id}">
                  <td>${d.id}</td>
                  <td>${d.name}</td>
                  <td>${d.type}</td>
                  <td>${d.location}</td>
                  <td>
                    <span class="pill ${d.status === "online"
            ? "pill-success"
            : d.status === "offline"
              ? "pill-critical"
              : ""
          }">
                      <span class="badge-dot ${d.status === "online"
            ? "badge-online"
            : d.status === "offline"
              ? "badge-offline"
              : "badge-critical"
          }"></span>
                      ${d.status}
                    </span>
                  </td>
                  <td>
                    <div class="table-actions">
                      <button class="btn btn-secondary" style="font-size:0.7rem;padding-inline:0.6rem;" data-device-edit="${d.id}">${t(
            "edit"
          )}</button>
                      <button class="btn btn-ghost" style="font-size:0.7rem;padding-inline:0.6rem;" data-device-delete="${d.id}">${t(
            "delete"
          )}</button>
                    </div>
                  </td>
                </tr>
              `
      )
      .join("")}
            </tbody>
          </table>
          <div class="layout-row" style="margin-top:10px;justify-content:flex-end;">
            <button id="device-create-btn" class="btn btn-secondary" style="font-size:0.78rem;">
              + ${t("create_device")}
            </button>
          </div>
        </div>

        <div class="glass-card" style="padding:12px 14px; min-width:260px;">
          <div class="section-title">${t("alerts_title")}</div>
          <div class="layout-col" style="gap:8px;">
            <div class="alert-card animate-pulse-glow">
              <div class="alert-row">
                <span class="pill pill-critical">
                  <span class="badge-dot badge-critical"></span>${t("amc_expiring")}
                </span>
                <span class="alert-meta">CT Scanner • 7 ${t("days") || "days"}</span>
              </div>
              <div class="alert-meta">
                Radiology block CT AMC due for renewal. Coordinate with vendor.
              </div>
            </div>
            <div class="alert-card">
              <div class="alert-row">
                <span class="pill pill-success">
                  <span class="badge-dot badge-online"></span>${t("calibration_due")}
                </span>
                <span class="alert-meta">Infusion Pump • 3 days</span>
              </div>
              <div class="alert-meta">
                Ward-5 infusion pumps scheduled for routine calibration.
              </div>
            </div>
            <div class="alert-card critical-alert-shake">
              <div class="alert-row">
                <span class="pill pill-critical">
                  <span class="badge-dot badge-critical"></span>${t("critical")}
                </span>
                <span class="alert-meta">${t("critical_alert_ecg")}</span>
              </div>
              <div class="alert-meta">
                ${t("critical_alert_desc")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  const createBtn = document.getElementById("device-create-btn");
  if (createBtn) {
    createBtn.addEventListener("click", () => openDeviceFormModal());
  }

  root.querySelectorAll("[data-device-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-device-edit");
      const device = devices.find((d) => d.id === id);
      if (device) openDeviceFormModal(device);
    });
  });

  root.querySelectorAll("[data-device-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-device-delete");
      if (!confirm("Delete this device from demo inventory?")) return;
      deleteDevice(id);
      renderEngineerDashboard(root);
    });
  });
}

function openDeviceFormModal(device) {
  const root = document.getElementById("modal-root");
  if (!root) return;
  const isEdit = !!device;
  const title = isEdit ? t("edit") + " device" : t("create") + " device";

  root.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal animate-slide-up">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button id="device-modal-close" class="icon-button">✕</button>
      </div>
      <div class="modal-body">
        <div class="settings-field">
          <label class="field-label" for="device-id">ID</label>
          <input id="device-id" class="text-input" value="${(device && device.id) || ""
    }" ${isEdit ? "readonly" : ""} />
        </div>
        <div class="settings-field">
          <label class="field-label" for="device-name">${t("name")}</label>
          <input id="device-name" class="text-input" value="${(device && device.name) || ""
    }" />
        </div>
        <div class="settings-field">
          <label class="field-label" for="device-type">${t("type")}</label>
          <input id="device-type" class="text-input" value="${(device && device.type) || ""
    }" />
        </div>
        <div class="settings-field">
          <label class="field-label" for="device-location">${t("location")}</label>
          <input id="device-location" class="text-input" value="${(device && device.location) || ""
    }" />
        </div>
        <div class="settings-field">
          <label class="field-label" for="device-status">${t("status")}</label>
          <select id="device-status" class="select-input">
            <option value="online" ${!device || device.status === "online" ? "selected" : ""
    }>${t("online")}</option>
            <option value="offline" ${device && device.status === "offline" ? "selected" : ""
    }>${t("offline")}</option>
            <option value="attention" ${device && device.status === "attention" ? "selected" : ""
    }>${t("needs_attention")}</option>
          </select>
        </div>
        <div class="layout-row" style="margin-top:10px;justify-content:flex-end;gap:8px;">
          <button id="device-cancel" class="btn btn-secondary">${t(
      "cancel"
    )}</button>
          <button id="device-save" class="btn">${t("save")}</button>
        </div>
      </div>
    </div>
  `;

  const close = () => {
    root.innerHTML = "";
  };
  root.querySelector(".modal-backdrop").addEventListener("click", close);
  document
    .getElementById("device-modal-close")
    .addEventListener("click", close);
  document.getElementById("device-cancel").addEventListener("click", close);

  document.getElementById("device-save").addEventListener("click", () => {
    const id = document.getElementById("device-id").value.trim();
    const name = document.getElementById("device-name").value.trim();
    const type = document.getElementById("device-type").value.trim();
    const location = document
      .getElementById("device-location")
      .value.trim();
    const status = document.getElementById("device-status").value;

    if (!id || !name || !type || !location) {
      alert("Please fill all fields for demo device.");
      return;
    }

    if (isEdit) {
      updateDevice(id, { name, type, location, status });
    } else {
      createDevice({ id, name, type, location, status });
    }

    close();
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderEngineerDashboard(container);
  });
}

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/dashboard/engineer") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderEngineerDashboard(container);
  }
});

