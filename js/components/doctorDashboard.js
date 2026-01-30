
// State to track current navigation level
let doctorNavState = {
  view: "departments", // departments | equipment
  selectedDepartment: null,
  selectedEquipment: null
};

function renderDoctorDashboard(root) {
  if (!root) return;
  document.title = `${t("doctor_dashboard_title")} · Conexta`;

  // Main Container
  root.innerHTML = `<div id="doctor-dash-container" class="layout-col animate-slide-up" style="gap:20px;"></div>`;
  const container = document.getElementById("doctor-dash-container");

  renderContent(container);
}

function renderContent(container) {
  container.innerHTML = "";

  // Breadcrumb / Back Navigation
  if (doctorNavState.view !== "departments") {
    const backBar = document.createElement("div");
    backBar.className = "layout-row";
    backBar.style.alignItems = "center";
    backBar.style.gap = "10px";
    backBar.style.marginBottom = "10px";

    backBar.innerHTML = `
      <button id="doc-back-btn" class="btn btn-ghost" style="padding:4px 8px;">
        ← Back
      </button>
      <div class="text-soft" style="font-size:0.9rem;">
        ${doctorNavState.view === 'equipment' ?
        `Departments / <strong style="color:var(--text);">${doctorNavState.selectedDepartment.name}</strong>` :
        'Departments'}
      </div>
    `;
    container.appendChild(backBar);

    container.querySelector("#doc-back-btn").addEventListener("click", () => {
      // Logic for going back
      if (doctorNavState.view === "equipment") {
        doctorNavState.view = "departments";
        doctorNavState.selectedDepartment = null;
        doctorNavState.selectedEquipment = null;
      }
      renderContent(container);
    });
  } else {
    // Top Level Title
    const title = document.createElement("div");
    title.className = "section-title";
    title.innerHTML = t("doctor_dashboard_title"); // "Doctor Cockpit"
    container.appendChild(title);
  }

  // Render specific view
  if (doctorNavState.view === "departments") {
    renderDepartmentsGrid(container);
  } else if (doctorNavState.view === "equipment") {
    renderDepartmentDetail(container);
  }
}

function renderDepartmentsGrid(container) {
  // We use the HOSPITAL_STRUCTURE global from fakeData.js

  if (typeof HOSPITAL_STRUCTURE === 'undefined') {
    container.innerHTML += `<div class="glass-card" style="padding:20px;">Error: Hospital data not loaded.</div>`;
    return;
  }

  HOSPITAL_STRUCTURE.forEach(cat => {
    // Category Title
    const catTitle = document.createElement("div");
    catTitle.className = "text-soft";
    catTitle.style.fontSize = "0.85rem";
    catTitle.style.marginTop = "10px";
    catTitle.style.marginBottom = "6px";
    catTitle.style.textTransform = "uppercase";
    catTitle.style.letterSpacing = "0.5px";
    catTitle.innerText = cat.category;
    container.appendChild(catTitle);

    // Grid of Departments
    const grid = document.createElement("div");
    grid.className = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
    grid.style.gap = "12px";

    cat.departments.forEach(dept => {
      const card = document.createElement("div");
      card.className = "glass-card hover-lift";
      card.style.cursor = "pointer";
      card.style.padding = "16px";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.gap = "8px";

      // Placeholder Icon/Visual
      const iconLetter = dept.name.charAt(0);

      card.innerHTML = `
        <div style="width:32px; height:32px; background:var(--primary-soft); color:var(--primary);
                    border-radius:6px; display:flex; align-items:center; justify-content:center;
                    font-weight:bold; font-size:1.1rem;">
          ${iconLetter}
        </div>
        <div style="font-weight:500; font-size:0.95rem;">${dept.name}</div>
        <div class="text-soft" style="font-size:0.75rem;">
          ${dept.equipment.length} Equipment Types
        </div>
      `;

      card.addEventListener("click", () => {
        doctorNavState.view = "equipment";
        doctorNavState.selectedDepartment = dept;
        doctorNavState.selectedEquipment = dept.equipment[0]; // Default select first
        renderContent(container);
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  });
}

function renderDepartmentDetail(container) {
  const dept = doctorNavState.selectedDepartment;
  if (!dept) return;

  // Split View: List of Equipment (Left) | Usage Details (Right/Main)
  const wrapper = document.createElement("div");
  wrapper.className = "layout-row";
  wrapper.style.gap = "20px";
  wrapper.style.alignItems = "flex-start";
  wrapper.style.minHeight = "60vh";

  // Sidebar: Equipment List
  const sidebar = document.createElement("div");
  sidebar.className = "glass-card";
  sidebar.style.width = "260px";
  sidebar.style.padding = "0";
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.overflow = "hidden";
  sidebar.style.flexShrink = "0";

  const sbHeader = document.createElement("div");
  sbHeader.style.padding = "12px 16px";
  sbHeader.style.borderBottom = "1px solid var(--glass-border)";
  sbHeader.style.fontWeight = "600";
  sbHeader.innerHTML = "Equipment";
  sidebar.appendChild(sbHeader);

  const sbList = document.createElement("div");
  sbList.style.display = "flex";
  sbList.style.flexDirection = "column";
  sbList.style.maxHeight = "500px";
  sbList.style.overflowY = "auto";

  dept.equipment.forEach(eq => {
    const item = document.createElement("button");
    const isSelected = doctorNavState.selectedEquipment === eq;
    item.className = `btn-ghost ${isSelected ? 'active-equipment' : ''}`;
    item.style.textAlign = "left";
    item.style.justifyContent = "flex-start";
    item.style.borderRadius = "0";
    item.style.padding = "10px 16px";
    item.style.fontSize = "0.85rem";
    if (isSelected) {
      item.style.background = "#FFD700"; // Gold
      item.style.color = "#000000"; // Black text
      item.style.borderLeft = "3px solid #FFD700";
      item.style.fontWeight = "600";
    } else {
      item.style.color = "#ffffff"; // White text by default
      item.style.borderLeft = "3px solid transparent";
    }

    item.innerText = eq;
    item.addEventListener("click", () => {
      doctorNavState.selectedEquipment = eq;
      renderContent(document.getElementById("doctor-dash-container"));
    });
    sbList.appendChild(item);
  });

  sidebar.appendChild(sbList);
  wrapper.appendChild(sidebar);

  // Main Content: Patient Lists for Selected Equipment
  const main = document.createElement("div");
  main.className = "layout-grow layout-col";
  main.style.gap = "16px";

  if (doctorNavState.selectedEquipment) {
    // Generate Usage Data on the fly
    const usageData = generateEquipmentUsageData(doctorNavState.selectedEquipment);

    // Header
    main.innerHTML = `
      <div class="section-title" style="font-size:1.2rem;">${doctorNavState.selectedEquipment}</div>
    `;

    // 1. Currently Active Table
    const activeSection = createPatientTableCard("Currently Active", usageData.active, "status-ring-critical");
    main.appendChild(activeSection);

    // 2. Pending Appointments Table
    const pendingSection = createPatientTableCard("Pending Appointments", usageData.pending, "status-ring-busy");
    main.appendChild(pendingSection);

    // 3. Treated Today Table
    const treatedSection = createPatientTableCard("Treated Today", usageData.treated, "status-ring-success");
    main.appendChild(treatedSection);

  } else {
    main.innerHTML = `<div class="glass-card" style="padding:20px;">Select an equipment from the list to view usage details.</div>`;
  }

  wrapper.appendChild(main);
  container.appendChild(wrapper);
}

function createPatientTableCard(title, patients, indicatorClass) {
  const card = document.createElement("div");
  card.className = "glass-card";
  card.style.padding = "12px 14px";

  const headerHtml = `
    <div class="layout-row" style="align-items:center; gap:8px; margin-bottom:10px;">
      <div class="status-ring ${indicatorClass || ''}" style="width:8px; height:8px;"></div>
      <div class="section-title" style="margin:0;">${title} (${patients.length})</div>
    </div>
  `;

  const tableHtml = `
    <table class="table-like" style="font-size:0.85rem;">
      <thead>
        <tr>
          <th style="width:15%;">ID</th>
          <th style="width:25%;">Patient</th>
          <th style="width:10%;">Age</th>
          <th style="width:30%;">Condition/Note</th>
          <th style="width:20%;">Time</th>
        </tr>
      </thead>
      <tbody>
        ${patients.length === 0 ? `<tr><td colspan="5" style="text-align:center; color:var(--text-soft);">No records found.</td></tr>` :
      patients.map(p => `
            <tr>
              <td><span style="font-family:monospace; color:var(--text-soft);">${p.id}</span></td>
              <td><strong>${p.name}</strong></td>
              <td>${p.age}</td>
              <td>${p.condition}</td>
              <td>${p.time}</td>
            </tr>
          `).join("")
    }
      </tbody>
    </table>
  `;

  card.innerHTML = headerHtml + tableHtml;
  return card;
}

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/dashboard/doctor") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) {
      // Re-render essentially refreshes with new translations if we were using t() inside
      // Currently our department names are English hardcoded in structure, 
      // but UI labels like "Back" can be translated if we add them. 
      // For now, preservation of view state is handled by doctorNavState
      renderContent(document.getElementById("doctor-dash-container"));
    }
  }
});
