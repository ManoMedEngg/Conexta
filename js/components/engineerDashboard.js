// State to track current navigation level
let engineerNavState = {
  view: "departments", // departments | equipment
  selectedDepartment: null,
  selectedEquipment: null
};

function renderEngineerDashboard(root) {
  if (!root) return;
  document.title = `Engineer Dashboard · Conexta`;

  // Main Container
  root.innerHTML = `
    <div style="margin-bottom:10px;">
      <button id="eng-dash-home-btn" class="btn btn-ghost" style="padding-left:0; color:var(--text-soft); font-size:0.9rem;">
        ← ${t("back_to_home") || "Home"}
      </button>
    </div>
    <div id="engineer-dash-container" class="layout-col animate-slide-up" style="gap:20px;"></div>
  `;

  root.querySelector("#eng-dash-home-btn").addEventListener("click", () => navigate("/"));

  const container = document.getElementById("engineer-dash-container");

  renderEngineerContent(container);
}

function renderEngineerContent(container) {
  container.innerHTML = "";

  // Breadcrumb / Back Navigation
  if (engineerNavState.view !== "departments") {
    const backBar = document.createElement("div");
    backBar.className = "layout-row";
    backBar.style.alignItems = "center";
    backBar.style.gap = "10px";
    backBar.style.marginBottom = "10px";

    backBar.innerHTML = `
      <button id="eng-back-btn" class="btn btn-ghost" style="padding:4px 8px;">
        ← Back
      </button>
      <div class="text-soft" style="font-size:0.9rem;">
        ${engineerNavState.view === 'equipment' ?
        `Departments / <strong style="color:var(--text);">${engineerNavState.selectedDepartment.name}</strong>` :
        'Departments'}
      </div>
    `;
    container.appendChild(backBar);

    container.querySelector("#eng-back-btn").addEventListener("click", () => {
      if (engineerNavState.view === "equipment") {
        engineerNavState.view = "departments";
        engineerNavState.selectedDepartment = null;
        engineerNavState.selectedEquipment = null;
      }
      renderEngineerContent(container);
    });
  } else {
    // Top Level Title
    const title = document.createElement("div");
    title.className = "section-title";
    title.innerHTML = "Asset Management Dashboard";
    container.appendChild(title);
  }

  // Render specific view
  if (engineerNavState.view === "departments") {
    renderEngineerDepartmentsGrid(container);
  } else if (engineerNavState.view === "equipment") {
    renderEngineerEquipmentDetail(container);
  }
}

function renderEngineerDepartmentsGrid(container) {
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

      const iconLetter = dept.name.charAt(0);

      card.innerHTML = `
        <div style="width:32px; height:32px; background:rgba(0, 242, 255, 0.1); color:var(--accent);
                    border:1px solid rgba(0, 242, 255, 0.3);
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
        engineerNavState.view = "equipment";
        engineerNavState.selectedDepartment = dept;
        engineerNavState.selectedEquipment = dept.equipment[0]; // Default select first
        renderEngineerContent(container);
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
  });
}

function renderEngineerEquipmentDetail(container) {
  const dept = engineerNavState.selectedDepartment;
  if (!dept) return;

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
  sbHeader.innerHTML = "Equipment Types";
  sidebar.appendChild(sbHeader);

  const sbList = document.createElement("div");
  sbList.style.display = "flex";
  sbList.style.flexDirection = "column";
  sbList.style.maxHeight = "500px";
  sbList.style.overflowY = "auto";

  dept.equipment.forEach(eq => {
    const item = document.createElement("button");
    const isSelected = engineerNavState.selectedEquipment === eq;
    item.className = `btn-ghost ${isSelected ? 'active-equipment' : ''}`;
    item.style.textAlign = "left";
    item.style.justifyContent = "flex-start";
    item.style.borderRadius = "0";
    item.style.padding = "10px 16px";
    item.style.fontSize = "0.85rem";
    if (isSelected) {
      item.style.background = "rgba(0, 242, 255, 0.15)";
      item.style.color = "var(--accent)";
      item.style.borderLeft = "3px solid var(--accent)";
      item.style.fontWeight = "600";
    } else {
      item.style.color = "var(--text-soft)";
      item.style.borderLeft = "3px solid transparent";
    }

    item.innerText = eq;
    item.addEventListener("click", () => {
      engineerNavState.selectedEquipment = eq;
      renderEngineerContent(document.getElementById("engineer-dash-container"));
    });
    sbList.appendChild(item);
  });

  sidebar.appendChild(sbList);
  wrapper.appendChild(sidebar);

  // Main Content: Asset Details
  const main = document.createElement("div");
  main.className = "layout-grow layout-col";
  main.style.gap = "16px";

  if (engineerNavState.selectedEquipment) {
    const eqName = engineerNavState.selectedEquipment;
    // Mock Data Generation for this Specific Equipment
    const mockData = generateAssetData(eqName);

    // Header showing Make/Model/Count
    const headerCard = document.createElement("div");
    headerCard.className = "glass-card";
    headerCard.style.padding = "16px";
    headerCard.innerHTML = `
      <div class="layout-row" style="align-items:center; justify-content:space-between;">
        <div>
          <div class="section-title" style="font-size:1.1rem; margin-bottom:4px; color:var(--text);">${eqName}</div>
          <div style="font-size:0.85rem; color:var(--text-soft);">
            Make: <strong style="color:var(--text-main);">${mockData.make}</strong> 
            <span style="margin:0 8px; opacity:0.3;">|</span>
             Model: <strong style="color:var(--text-main);">${mockData.model}</strong>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:2rem; font-weight:700; line-height:1; color:var(--accent);">${mockData.totalCount}</div>
          <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; color:var(--text-soft);">Total Units</div>
        </div>
      </div>
    `;
    main.appendChild(headerCard);

    // Asset List Table
    const tableCard = document.createElement("div");
    tableCard.className = "glass-card";
    tableCard.style.padding = "0";
    tableCard.innerHTML = `
      <div style="padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.08);">
        <div class="section-title" style="margin:0;">Asset Inventory Status</div>
      </div>
      <div style="overflow-x:auto;">
      <table class="table-like" style="width:100%;">
        <thead>
          <tr>
            <th style="padding-left:16px;">Asset ID</th>
            <th>Serial No.</th>
            <th>Location</th>
            <th>Install Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${mockData.assets.map(asset => `
            <tr>
              <td style="padding-left:16px;">
                <span style="font-family:monospace; background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px;">${asset.id}</span>
              </td>
              <td style="font-size:0.85rem; color:var(--text-soft);">${asset.serial}</td>
              <td>${asset.location}</td>
              <td style="font-size:0.85rem; color:var(--text-soft);">${asset.installDate}</td>
              <td>
                <span class="pill ${asset.status === 'Online' ? 'pill-success' :
        asset.status === 'Maintenance' ? 'pill-critical' :
          'pill'
      }" style="font-size:0.65rem;">
                  <span class="badge-dot ${asset.status === 'Online' ? 'badge-online' :
        asset.status === 'Maintenance' ? 'badge-critical' :
          'badge-offline'
      }"></span>
                  ${asset.status}
                </span>
              </td>
              <td>
                <button class="btn btn-ghost" style="padding:4px 8px; font-size:0.75rem;">View</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
    `;
    main.appendChild(tableCard);

  }

  wrapper.appendChild(main);
  container.appendChild(wrapper);
}

// Helper to generate consistent-looking mock data for the demo
function generateAssetData(equipName) {
  // Deterministic-ish hash for mock consistency
  const seed = equipName.length;
  const count = (seed % 8) + 3; // 3 to 10 items

  const makes = ["Siemens", "GE Healthcare", "Philips", "Medtronic", "Dräger", "Mindray"];
  const models = ["Pro", "X-Series", "Advantage", "7000", "Elite", "Scan"];

  const make = makes[seed % makes.length];
  const model = `${equipName.split(" ")[0]}-${models[seed % models.length]}`;

  const assets = [];
  const locations = ["Ward A", "ICU-1", "OT-2", "Radiology", "ER", "Storage"];
  const statuses = ["Online", "Online", "Online", "Maintenance", "Calib. Due", "Offline"];

  for (let i = 1; i <= count; i++) {
    assets.push({
      id: `AST-${seed}${i.toString().padStart(3, '0')}`,
      serial: `SN-${202300 + i}`,
      location: locations[(seed + i) % locations.length],
      installDate: `202${(i % 4) + 1}-0${(i % 9) + 1}-15`,
      status: statuses[(i + seed) % statuses.length]
    });
  }

  return {
    make,
    model,
    totalCount: count,
    assets
  };
}

window.addEventListener("conexta:languageChanged", () => {
  const main = document.getElementById("engineer-dash-container");
  if (main) renderEngineerContent(main);
});

