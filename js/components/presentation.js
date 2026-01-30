
function renderPresentation(root) {
  if (!root) return;
  document.title = "Conexta - Presentation";

  // Inject styles for the presentation if not already present
  if (!document.getElementById("presentation-styles")) {
    const style = document.createElement("style");
    style.id = "presentation-styles";
    style.textContent = `
      .presentation-container {
        height: 100vh;
        width: 100vw;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
        background: #0f172a;
        color: white;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000; /* Above everything */
      }
      .slide {
        height: 100vh;
        width: 100vw;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }
      .slide-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
        opacity: 0.2;
      }
      .slide-content {
        max-width: 1200px;
        width: 100%;
        z-index: 1;
        text-align: center; /* Default center */
      }
      .slide-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #00f2ff 0%, #00a8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
      }
      .slide-subtitle {
        font-size: 1.8rem;
        color: #e2e8f0;
        margin-bottom: 2rem;
        font-weight: 300;
      }
      .slide-text {
        font-size: 1.2rem;
        line-height: 1.6;
        color: #cbd5e1;
        margin-bottom: 1.5rem;
      }
      .slide-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: center;
        text-align: left;
      }
      .close-presentation {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2001;
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        padding: 10px 20px;
        border-radius: 30px;
        cursor: pointer;
        font-family: inherit;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }
      .close-presentation:hover {
        background: rgba(255,255,255,0.1);
        transform: translateY(-2px);
      }
      .slide-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 30px;
        border-radius: 16px;
      }
      
      /* Animation classes */
      .slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(30px); }
      @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
    `;
    document.head.appendChild(style);
  }

  root.innerHTML = `
    <button class="close-presentation" id="close-pres-btn">✕ Close Presentation</button>
    <div class="presentation-container">
      
      <!-- Slide 1: Title -->
      <section class="slide">
        <div class="slide-content">
          <div class="slide-title slide-up">CONEXTA</div>
          <div class="slide-subtitle slide-up delay-1">IoMT SMART SYSTEM for LEGACY MEDICAL DEVICES</div>
          <div class="slide-text slide-up delay-2" style="max-width: 800px; margin: 0 auto; color: #94a3b8;">
            Bridging Legacy Medical Devices to Smart Healthcare using IoMT
          </div>
        </div>
      </section>

      <!-- Slide 2: Overview -->
      <section class="slide">
        <div class="slide-content slide-grid">
          <div class="slide-up">
            <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #fff;">The Overview</h2>
            <div class="slide-card">
              <p class="slide-text">
                <strong style="color: #00f2ff;">IoMT Smart System</strong> is a plug-and-play solution designed to convert 
                any legacy medical device into a smart IoMT-enabled device.
              </p>
              <p class="slide-text">
                It uses a <strong>universal adapter</strong> and <strong>universal probe interface</strong> connected to existing 
                medical devices, enabling real-time monitoring, EHR integration, AMC tracking, and AI-based alerts at low cost.
              </p>
            </div>
          </div>
          <div class="slide-up delay-1">
             <div class="slide-card" style="background: rgba(0, 242, 255, 0.05);">
                <h3 style="color: #00f2ff; margin-top:0;">Problem & Solution</h3>
                <p class="slide-text" style="font-size: 1rem;">
                  Our solution avoids replacing costly smart medical devices by using low-cost universal adapters for existing legacy equipment.
                </p>
                <p class="slide-text" style="font-size: 1rem;">
                  Multiple adapters connected to different devices communicate wirelessly with a single Master Controller.
                </p>
             </div>
          </div>
        </div>
      </section>

      <!-- Slide 3: How it Works (Conceptual) -->
      <section class="slide">
        <div class="slide-content">
          <h2 class="slide-title slide-up" style="font-size: 2.5rem;">How It Works</h2>
          <div class="slide-grid" style="grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px;">
            
            <div class="slide-card slide-up delay-1">
              <div style="font-size: 3rem; margin-bottom: 10px;">🏥</div>
              <h3 style="color: #fff;">Legacy Device</h3>
              <p style="color: #94a3b8; font-size: 0.9rem;">Analog output from existing hospital equipment (ECG, Vitals).</p>
            </div>

            <div class="slide-card slide-up delay-2">
              <div style="font-size: 3rem; margin-bottom: 10px;">📡</div>
              <h3 style="color: #00f2ff;">Conexta Probe</h3>
              <p style="color: #94a3b8; font-size: 0.9rem;">Captures signals, encrypts data, and transmits via Wi-Fi/LoRa.</p>
            </div>

            <div class="slide-card slide-up delay-3">
              <div style="font-size: 3rem; margin-bottom: 10px;">☁️</div>
              <h3 style="color: #fff;">Cloud Dashboard</h3>
              <p style="color: #94a3b8; font-size: 0.9rem;">Real-time visualization for Doctors, Patients, and Engineers.</p>
            </div>

          </div>
        </div>
      </section>

      <!-- Slide 4: Team -->
      <section class="slide">
        <div class="slide-content">
          <h2 class="slide-title slide-up" style="font-size: 2.5rem;">The Team</h2>
          <p class="slide-subtitle slide-up delay-1">Biomedical Engineering Students</p>
          <div class="slide-card slide-up delay-2" style="max-width: 600px; margin: 0 auto;">
            <p class="slide-text">
              We are a team developing a universal, low-cost IoMT solution that upgrades legacy medical devices without replacing them, 
              improving patient safety, hospital efficiency, and digital healthcare adoption.
            </p>
          </div>
        </div>
      </section>

      <!-- Slide 5: Thank You -->
      <section class="slide">
        <div class="slide-content">
          <div class="slide-title slide-up">Thank You</div>
          <button class="btn btn-primary slide-up delay-1" id="end-pres-btn" style="margin-top: 20px;">Return to App</button>
        </div>
      </section>

    </div>
  `;

  const closeBtn = document.getElementById("close-pres-btn");
  const endBtn = document.getElementById("end-pres-btn");

  const exit = () => {
    // Navigate back to home or previous page
    window.location.hash = "/";
    // Clean up style if we wanted to, but keeping it is fine
  };

  closeBtn.addEventListener("click", exit);
  if (endBtn) endBtn.addEventListener("click", exit);
}
