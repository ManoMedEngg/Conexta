const routes = {};

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

export function navigate(path) {
  if (window.location.hash !== path) {
    window.location.hash = path;
  } else {
    renderCurrent();
  }
}

export function renderCurrent() {
  const hash = window.location.hash || "#/login";
  const path = hash.split("?")[0];
  const renderFn = routes[path] || routes["#/login"];
  const root = document.getElementById("app");
  if (!root || !renderFn) return;
  root.innerHTML = "";
  renderFn(root);
}

export function initRouter() {
  window.addEventListener("hashchange", renderCurrent);
  renderCurrent();
}

