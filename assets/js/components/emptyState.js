import { icon } from './icons.js';

export function emptyStateHTML({ iconName = 'grid-2x2', title, desc = '' }) {
  return `
    <div class="empty-state">
      <div class="empty-state__icon">${icon(iconName, { size: 40 })}</div>
      <div class="empty-state__title">${title}</div>
      ${desc ? `<div class="empty-state__desc">${desc}</div>` : ''}
    </div>`;
}
