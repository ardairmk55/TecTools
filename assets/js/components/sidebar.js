import { icon } from './icons.js';
import { wordmarkHTML, iconHTML } from './logo.js';
import { NAV_GROUPS, FOOTER_ITEMS, getSidebarExpanded } from '../navigation.js';

function navItemHTML(item) {
  return `<a href="#${item.path}" class="nav-item" data-nav-path="${item.path}">
    <span class="nav-item__icon">${icon(item.icon, { size: 20 })}</span>
    <span class="nav-item__label">${item.labelTr}</span>
  </a>`;
}

export function buildSidebar() {
  const el = document.createElement('aside');
  el.className = 'app-sidebar';
  el.setAttribute('data-expanded', String(getSidebarExpanded()));

  const groupsHTML = NAV_GROUPS.map((group) => `
    <div class="app-sidebar__group">
      <div class="app-sidebar__group-label">${group.labelTr}</div>
      <nav>${group.items.map(navItemHTML).join('')}</nav>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="app-sidebar__brand">${iconHTML()}${wordmarkHTML()}</div>
    <div class="app-sidebar__groups">${groupsHTML}</div>
    <div class="app-sidebar__footer">${FOOTER_ITEMS.map(navItemHTML).join('')}</div>
  `;

  return el;
}

export function setSidebarDOMExpanded(el, expanded) {
  el.setAttribute('data-expanded', String(expanded));
}
