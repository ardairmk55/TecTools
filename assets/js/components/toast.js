let containerEl = null;

function ensureContainer() {
  if (containerEl) return containerEl;
  containerEl = document.createElement('div');
  containerEl.setAttribute('aria-live', 'polite');
  containerEl.style.cssText = 'position:fixed;right:16px;bottom:calc(var(--bottom-nav-height) + 16px);z-index:200;display:flex;flex-direction:column;gap:8px;max-width:min(360px,calc(100vw - 32px));';
  document.body.appendChild(containerEl);
  return containerEl;
}

export function showToast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  ensureContainer().appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
