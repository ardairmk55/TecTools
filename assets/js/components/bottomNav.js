import { icon } from './icons.js';
import { BOTTOM_NAV_ITEMS } from '../navigation.js';

export function buildBottomNav() {
  const el = document.createElement('nav');
  el.className = 'app-bottom-nav';
  el.setAttribute('aria-label', 'Alt gezinme');
  el.innerHTML = BOTTOM_NAV_ITEMS.map((item) => `
    <a href="#${item.path}" class="bottom-nav-item" data-nav-path="${item.path}">
      ${icon(item.icon, { size: 22, className: 'bottom-nav-item__icon' })}
      <span>${item.labelTr}</span>
    </a>
  `).join('');
  return el;
}
