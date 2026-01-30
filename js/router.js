// Simple hash-based router for Conexta

const routes = {};

function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

function getCurrentPath() {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, "");
  return path || "/";
}

function navigate(path) {
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  if (getCurrentPath() === path) {
    handleRoute();
  } else {
    window.location.hash = path;
  }
}

function handleRoute() {
  const path = getCurrentPath();
  const main = document.getElementById("app-main");
  if (!main) return;
  main.innerHTML = '<div class="app-main-inner"></div>';
  const container = main.querySelector(".app-main-inner");

  let matched = routes[path];
  if (!matched && path.startsWith("/dashboard")) {
    // Fallback for unknown dashboards
    matched = routes["/dashboard/doctor"];
  }
  // Add the /presentation route mapping
  if (path === "/presentation") {
    matched = routes["/presentation"];
  }
  if (!matched) {
    matched = routes["/"];
  }
  if (typeof matched === "function") {
    matched(container);
  }
}

window.addEventListener("hashchange", handleRoute);

