import { icon } from './icons.js';
import { wordmarkHTML, iconHTML } from './logo.js';
import { toggleTheme, getEffectiveTheme } from '../theme.js';
import { openSearchModal } from './searchModal.js';
import { showToast } from './toast.js';

export function buildHeader({ onToggleSidebar }) {
  const el = document.createElement('header');
  el.className = 'app-header';
  el.innerHTML = `
    <button type="button" class="btn-icon app-sidebar-toggle" aria-label="Kenar çubuğunu daralt veya genişlet" data-action="toggle-sidebar">${icon('chevron-left', { size: 18 })}</button>
    <div class="app-header__brand">${iconHTML()}${wordmarkHTML()}</div>
    <button type="button" class="app-header__search-trigger" data-action="open-search">
      ${icon('search', { size: 16 })}
      <span class="app-header__search-label">Ara: araç, komut, rehber...</span>
      <span class="mono app-header__kbd-hint" style="margin-left:auto;color:var(--text-muted);font-size:11px;">Ctrl+K</span>
    </button>
    <div class="app-header__actions">
      <button type="button" class="btn-icon" data-action="notifications" aria-label="Bildirimler">${icon('bell', { size: 18 })}</button>
      <button type="button" class="btn-icon" data-action="theme-toggle" aria-label="Temayı değiştir">${icon(getEffectiveTheme() === 'dark' ? 'sun' : 'moon', { size: 18 })}</button>
    </div>
  `;

  el.querySelector('[data-action="open-search"]').addEventListener('click', openSearchModal);
  el.querySelector('[data-action="notifications"]').addEventListener('click', () => {
    showToast('Yeni bildirim yok.');
  });
  el.querySelector('[data-action="theme-toggle"]').addEventListener('click', () => {
    toggleTheme();
  });
  el.querySelector('[data-action="toggle-sidebar"]').addEventListener('click', onToggleSidebar);

  document.addEventListener('tectools:theme-change', () => {
    const btn = el.querySelector('[data-action="theme-toggle"]');
    if (btn) btn.innerHTML = icon(getEffectiveTheme() === 'dark' ? 'sun' : 'moon', { size: 18 });
  });

  return el;
}
