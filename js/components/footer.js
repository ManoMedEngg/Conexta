function renderFooter() {
  const footerEl = document.getElementById("app-footer");
  if (!footerEl) return;
  footerEl.innerHTML = `
    <div class="footer-inner">
      <div>
        <span>Contact: </span>
        <a class="footer-link" href="mailto:hello@conexta.demo">hello@conexta.demo</a>
      </div>
      <div>Developed by Mano.MedEngg</div>
    </div>
  `;
}

