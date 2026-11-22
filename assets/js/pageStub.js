import { emptyStateHTML } from './components/emptyState.js';

export function renderStub({ titleTr, descTr, iconName = 'grid-2x2' }) {
  const el = document.createElement('div');
  el.innerHTML = `
    <h1 style="margin-bottom:20px;">${titleTr}</h1>
    <div class="card">${emptyStateHTML({ iconName, title: 'Yakında', desc: descTr })}</div>
  `;
  return el;
}
