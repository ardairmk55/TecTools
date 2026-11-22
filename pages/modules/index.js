import { icon } from '../../assets/js/components/icons.js';
import { MODULE_LINKS } from '../../assets/js/navigation.js';
import { navigate } from '../../assets/js/router.js';

export function render() {
  const el = document.createElement('div');
  el.innerHTML = `
    <h1 style="margin-bottom:20px;">Modüller</h1>
    <div class="card" style="overflow:hidden;">
      ${MODULE_LINKS.map((m) => `
        <button type="button" class="list-row" style="width:100%;text-align:left;" data-path="${m.path}">
          <span class="list-row__icon">${icon(m.icon, { size: 20 })}</span>
          <span class="list-row__body">
            <span class="list-row__title">${m.labelTr}</span>
            <span class="list-row__desc">${m.descTr}</span>
          </span>
          ${icon('chevron-right', { size: 16 })}
        </button>
      `).join('')}
    </div>
  `;
  el.querySelectorAll('[data-path]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.getAttribute('data-path')));
  });
  return el;
}
