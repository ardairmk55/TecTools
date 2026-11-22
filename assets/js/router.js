const routes = new Map();
let notFoundRenderer = null;
let mountEl = null;

export function registerRoute(path, renderer) {
  routes.set(path, renderer);
}

export function setNotFound(renderer) {
  notFoundRenderer = renderer;
}

export function navigate(path) {
  window.location.hash = '#' + path;
}

export function getCurrentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === '' ? '/' : hash;
}

function render() {
  const path = getCurrentPath();
  const renderer = routes.get(path) ?? notFoundRenderer;
  mountEl.replaceChildren();
  if (renderer) {
    mountEl.appendChild(renderer());
  }
  mountEl.scrollTo({ top: 0 });
  document.dispatchEvent(new CustomEvent('tectools:route-change', { detail: { path } }));
}

export function initRouter(el) {
  mountEl = el;
  window.addEventListener('hashchange', render);
  render();
}
