import { icon } from './icons.js';
import { NAV_GROUPS, FOOTER_ITEMS } from '../navigation.js';
import { navigate } from '../router.js';

let overlayEl = null;

function buildIndex() {
  const items = [];
  NAV_GROUPS.forEach((g) => g.items.forEach((i) => items.push(i)));
  FOOTER_ITEMS.forEach((i) => items.push(i));
  return items;
}

const INDEX = buildIndex();

function filterItems(query) {
  const q = query.trim().toLocaleLowerCase('tr');
  if (!q) return INDEX;
  return INDEX.filter((i) => i.labelTr.toLocaleLowerCase('tr').includes(q));
}

function renderResults(listEl, query) {
  const results = filterItems(query);
  if (results.length === 0) {
    listEl.innerHTML = '<div class="empty-state" style="padding:32px 16px;"><div class="empty-state__desc">Sonuç bulunamadı.</div></div>';
    return;
  }
  listEl.innerHTML = results.map((item) => `
    <button type="button" class="list-row" style="width:100%;text-align:left;" data-path="${item.path}">
      <span class="list-row__icon">${icon(item.icon, { size: 18 })}</span>
      <span class="list-row__body"><span class="list-row__title">${item.labelTr}</span></span>
    </button>
  `).join('');
  listEl.querySelectorAll('[data-path]').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigate(btn.getAttribute('data-path'));
      closeSearchModal();
    });
  });
}

function onKeydown(e) {
  if (e.key === 'Escape') closeSearchModal();
}

export function openSearchModal() {
  if (overlayEl) return;
  overlayEl = document.createElement('div');
  overlayEl.className = 'modal-overlay';
  overlayEl.innerHTML = `
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="Hızlı erişim">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;">
        ${icon('search', { size: 18 })}
        <input type="text" class="input-field" style="border:none;height:auto;padding:4px 0;" placeholder="Modül ara..." />
        <button type="button" class="btn-icon" data-action="close">${icon('x', { size: 18 })}</button>
      </div>
      <div class="search-results" style="overflow-y:auto;"></div>
      <div style="padding:10px 16px;border-top:1px solid var(--border);font-size:12px;color:var(--text-muted);">
        Modüllere hızlı erişim için arayın. Araç ve içerik araması Faz 9'da eklenecek.
      </div>
    </div>`;
  document.body.appendChild(overlayEl);

  const input = overlayEl.querySelector('input');
  const listEl = overlayEl.querySelector('.search-results');
  renderResults(listEl, '');
  input.addEventListener('input', () => renderResults(listEl, input.value));
  input.focus();

  overlayEl.addEventListener('click', (e) => { if (e.target === overlayEl) closeSearchModal(); });
  overlayEl.querySelector('[data-action="close"]').addEventListener('click', closeSearchModal);
  document.addEventListener('keydown', onKeydown);
}

export function closeSearchModal() {
  if (!overlayEl) return;
  overlayEl.remove();
  overlayEl = null;
  document.removeEventListener('keydown', onKeydown);
}
