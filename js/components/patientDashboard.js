function renderPatientDashboard(root) {
  if (!root) return;
  document.title = `Patient view · Conexta`;

  const vitals = generateFakeVitals();
  const healthScore = vitals.spo2 > 94 && vitals.heartRate < 110 ? "good" : "watch";
  const now = new Date();
  const hour = now.getHours();
  let slot = "morning";
  if (hour >= 12 && hour < 18) slot = "afternoon";
  else if (hour >= 18 || hour < 5) slot = "night";

  root.innerHTML = `
    <div class="layout-col animate-slide-up">
      <section class="layout-row" style="gap:18px; align-items:flex-start;">
        <div class="glass-card layout-grow" style="padding:14px 16px;">
          <div class="section-title">${t("health_status_title")}</div>
          <div class="layout-row" style="gap:16px; align-items:center;">
            <div class="status-ring ${healthScore === "good" ? "" : "status-ring-critical"
    }">
              <span style="font-size:0.7rem;">
                ${healthScore === "good" ? t("stable") : t("observe")}
              </span>
            </div>
            <div class="layout-col" style="gap:4px;">
              <div class="text-soft" style="font-size:0.8rem;">
                ${t("health_status_live_desc")}
              </div>
              <div style="font-size:0.8rem;">
                HR <strong>${vitals.heartRate}</strong> bpm • SpO₂ <strong>${vitals.spo2
    }</strong>% • BP <strong>${vitals.bp}</strong> • Temp <strong>${vitals.temp
    }</strong> °C
              </div>
            </div>
          </div>
          
          <div style="margin-top:12px; height:80px; position:relative; overflow:hidden; border-radius:6px; background:rgba(0,0,0,0.15);">
             <canvas id="ecg-canvas" style="width:100%; height:100%; display:block;"></canvas>
          </div>

        </div>
        <div class="glass-card" style="padding:12px 14px; min-width:230px;">
          <div class="section-title">${t("last_tests_title")}</div>
          <ul class="text-soft" style="font-size:0.8rem; padding-left:20px; margin:4px 0 0;">
            <li>CT Brain – Normal (yesterday)</li>
            <li>ECG – Sinus rhythm (today)</li>
            <li>Blood panel – In range (last week)</li>
          </ul>
        </div>
      </section>

      <section class="layout-row" style="gap:18px; align-items:flex-start;">
        <div class="glass-card layout-grow" style="padding:12px 14px;">
          <div class="section-title">${t("prescriptions_title")}</div>
          <div class="grid grid-3" style="gap:10px;">
            <div class="glass-card" style="padding:8px 10px;">
              <div class="metric-label">Tab. Atorvastatin</div>
              <div class="metric-value" style="font-size:1rem;">10 mg</div>
              <div class="text-soft" style="font-size:0.75rem;">${t(
      "night"
    )} • 30 days • Dr. Ashok</div>
            </div>
            <div class="glass-card" style="padding:8px 10px;">
              <div class="metric-label">Tab. Metformin</div>
              <div class="metric-value" style="font-size:1rem;">500 mg</div>
              <div class="text-soft" style="font-size:0.75rem;">${t(
      "morning"
    )} & ${t("night")} • 60 days • Dr. Suganya</div>
            </div>
            <div class="glass-card" style="padding:8px 10px;">
              <div class="metric-label">Cap. Pantoprazole</div>
              <div class="metric-value" style="font-size:1rem;">40 mg</div>
              <div class="text-soft" style="font-size:0.75rem;">${t(
      "morning"
    )} • 14 days • Dr. Meena</div>
            </div>
          </div>
        </div>

        <div class="glass-card" style="padding:12px 14px; min-width:260px;">
          <div class="section-title">${t("health_tips_title")}</div>
          <ul class="text-soft" style="font-size:0.8rem; padding-left:20px; margin:4px 0 0;">
            <li>${t("health_tip_1")}</li>
            <li>${t("health_tip_2")}</li>
            <li>${t("health_tip_3")}</li>
          </ul>
        </div>
      </section>

      <section class="glass-card" style="padding:12px 14px;">
        <div class="section-title">${t("tablet_time_title")}</div>
        <div class="timeline">
          <div class="timeline-slot ${slot === "morning" ? "timeline-slot-active" : ""
    }">
            <div class="metric-label">${t("morning")}</div>
            <div style="font-size:0.8rem;">Metformin • Pantoprazole</div>
          </div>
          <div class="timeline-slot ${slot === "afternoon" ? "timeline-slot-active" : ""
    }">
            <div class="metric-label">${t("afternoon")}</div>
            <div style="font-size:0.8rem;">—</div>
          </div>
          <div class="timeline-slot ${slot === "night" ? "timeline-slot-active" : ""
    }">
            <div class="metric-label">${t("night")}</div>
            <div style="font-size:0.8rem;">Atorvastatin • Metformin</div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Start ECG Animation using requestAnimationFrame logic
  setTimeout(() => {
    const canvas = document.getElementById("ecg-canvas");
    if (canvas) {
      initECGAnimation(canvas);
    }
  }, 100);
}

function initECGAnimation(canvas) {
  const ctx = canvas.getContext("2d");
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  // Handle resize
  window.addEventListener("resize", () => {
    if (!canvas.isConnected) return;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  });

  const dataPoints = new Array(Math.ceil(width / 2)).fill(height / 2);
  let x = 0;
  let phase = 0; // For generating the wave

  function draw() {
    if (!document.body.contains(canvas)) return; // Stop if removed

    // Fade out effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "var(--success)"; // Use success color (usually green) or fallback to #0f0
    if (!getComputedStyle(document.documentElement).getPropertyValue('--success')) {
      ctx.strokeStyle = "#00ff88";
    }

    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();

    // Generate next point
    // Simple simulated ECG: P-QRS-T complex simulation
    // We'll use a mix of sines and noises

    // Move slightly faster
    phase += 0.15;

    // Baseline
    let y = height / 2;

    // Periodic heartbeat every ~20 units of phase
    const cycle = phase % 20;

    // Detect where we happen to be in the "beat"
    if (cycle > 2 && cycle < 3) {
      // P wave (small bump)
      y -= (height * 0.1) * Math.sin((cycle - 2) * Math.PI);
    } else if (cycle > 4 && cycle < 4.5) {
      // Q dip
      y += (height * 0.1);
    } else if (cycle >= 4.5 && cycle < 5.5) {
      // R spike (big up) - the main beat
      y -= (height * 0.45) * Math.sin((cycle - 4.5) * Math.PI);
    } else if (cycle >= 5.5 && cycle < 6) {
      // S dip
      y += (height * 0.15);
    } else if (cycle > 8 && cycle < 10) {
      // T wave (medium bump)
      y -= (height * 0.15) * Math.sin((cycle - 8) * Math.PI / 2);
    }

    // Add randomness only slightly
    y += (Math.random() - 0.5) * 2;

    // Shift data
    dataPoints.push(y);
    if (dataPoints.length > width / 2) {
      dataPoints.shift();
    }

    // Draw
    for (let i = 0; i < dataPoints.length; i++) {
      // We draw 2px per point to stretch it out appropriately
      const px = i * 2;
      const py = dataPoints[i];
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

window.addEventListener("conexta:languageChanged", () => {
  const path = getCurrentPath();
  if (path === "/dashboard/patient") {
    const main = document.getElementById("app-main");
    if (!main) return;
    const container = main.querySelector(".app-main-inner");
    if (container) renderPatientDashboard(container);
  }
});

