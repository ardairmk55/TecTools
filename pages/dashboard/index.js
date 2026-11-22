import { icon } from '../../assets/js/components/icons.js';
import { emptyStateHTML } from '../../assets/js/components/emptyState.js';
import { MODULE_LINKS } from '../../assets/js/navigation.js';
import { navigate } from '../../assets/js/router.js';

export function render() {
  const el = document.createElement('div');
  el.innerHTML = `
    <section style="margin-bottom:28px;">
      <h1>Teknik çalışma merkezine hoş geldin.</h1>
      <p style="margin-top:8px;color:var(--text-secondary);max-width:62ch;">Teknik araçlarına, sistem rehberlerine ve çalışma kayıtlarına tek yerden eriş.</p>
    </section>

    <section style="margin-bottom:28px;">
      <h2 style="margin-bottom:12px;">Modüller</h2>
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
    </section>

    <section>
      <h2 style="margin-bottom:12px;">Son işlemler</h2>
      <div class="card">
        ${emptyStateHTML({ iconName: 'history', title: 'Henüz işlem yok', desc: 'Araç ve modülleri kullanmaya başladığında son işlemlerin burada görünecek.' })}
      </div>
    </section>
  `;

  el.querySelectorAll('[data-path]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.getAttribute('data-path')));
  });

  return el;
}
