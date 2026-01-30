function renderFooter() {
  const footerEl = document.getElementById("app-footer");
  if (!footerEl) return;
  footerEl.innerHTML = `
      <footer class="footer-section animate-slide-up delay-3" style="margin-top: auto;">
        <div class="container" style="text-align:center; opacity:0.8;">
                <div style="margin-bottom:12px;">
                    <h3 style="display:inline-block; font-size:1rem; margin-right:12px; color:var(--accent);">Contact</h3>
                    <span style="font-size:0.9rem;">
                      <a href="mailto:210823121045@kingsedu.ac.in" style="color:var(--text-soft); text-decoration:none; margin-right:8px;">conexta@info</a>
                      <span style="color:var(--border-subtle);">|</span>
                      <a href="tel:+917358878062" style="color:var(--text-soft); text-decoration:none; margin-left:8px;">+91 73588 78062</a>
                    </span>
                </div>
            <p style="font-size:0.8rem; margin-bottom:6px;"> Developed by <strong style="color:var(--text-main);">Manoj</strong>, a Biomedical Engineering Student</p>
            <div class="copyright" style="font-size:0.7rem; color:var(--text-soft);">© 2025 Conexta, Kings Engineering College. All rights reserved.</div>
        </div>
    </footer>
  `;
}

