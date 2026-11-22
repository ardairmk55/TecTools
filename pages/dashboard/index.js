import { icon, starIcon } from '../../assets/js/components/icons.js';
import { emptyStateHTML } from '../../assets/js/components/emptyState.js';
import { DASHBOARD_MODULES } from '../../assets/js/navigation.js';
import { navigate } from '../../assets/js/router.js';
import { getItem, setItem } from '../../assets/js/storage.js';
import { isFavorite, toggleFavorite, getFavoriteIds } from '../../assets/js/favorites.js';
import { getRecent, getFrequent, getVisitedPaths } from '../../assets/js/history.js';

const WIDGETS_KEY = 'dashboardWidgets';
const DEFAULT_ORDER = ['quickAccess', 'favorites', 'frequent', 'recent'];

function formatRelativeTime(ts) {
  const diffMs = Date.now() - ts;
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return 'az önce';
  if (minutes < 60) return `${minutes} dakika önce`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.round(hours / 24);
  return `${days} gün önce`;
}

function statsLineText() {
  const favIds = getFavoriteIds();
  const favCount = DASHBOARD_MODULES.filter((m) => favIds.includes(m.id)).length;
  const visited = getVisitedPaths();
  const visitedCount = DASHBOARD_MODULES.filter((m) => visited.has(m.path)).length;
  return `${favCount} favori modül · ${visitedCount}/${DASHBOARD_MODULES.length} modül görüntülendi`;
}

function favoritableRowHTML(m) {
  const fav = isFavorite(m.id);
  return `
    <div class="list-row">
      <button type="button" class="list-row__navbtn" data-nav="${m.path}">
        <span class="list-row__icon">${icon(m.icon, { size: 20 })}</span>
        <span class="list-row__body">
          <span class="list-row__title">${m.labelTr}</span>
          <span class="list-row__desc">${m.descTr}</span>
        </span>
      </button>
      <button type="button" class="star-toggle" data-fav="${m.id}" aria-pressed="${fav}" aria-label="${m.labelTr}: ${fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}">${starIcon(fav, { size: 18 })}</button>
      <span style="flex-shrink:0;color:var(--text-muted);display:flex;">${icon('chevron-right', { size: 16 })}</span>
    </div>`;
}

function simpleRowHTML(path, iconName, title, desc) {
  return `
    <button type="button" class="list-row" style="width:100%;text-align:left;" data-path="${path}">
      <span class="list-row__icon">${icon(iconName, { size: 20 })}</span>
      <span class="list-row__body">
        <span class="list-row__title">${title}</span>
        <span class="list-row__desc">${desc}</span>
      </span>
      ${icon('chevron-right', { size: 16 })}
    </button>`;
}

function renderQuickAccess() {
  return `<div class="card" style="overflow:hidden;">${DASHBOARD_MODULES.map(favoritableRowHTML).join('')}</div>`;
}

function renderFavorites() {
  const favIds = getFavoriteIds();
  const favs = DASHBOARD_MODULES.filter((m) => favIds.includes(m.id));
  if (favs.length === 0) {
    return `<div class="card">${emptyStateHTML({ iconName: 'star', title: 'Henüz favori modülün yok', desc: 'Hızlı Erişim listesindeki bir modülü yıldızlayarak favorilerine ekleyebilirsin.' })}</div>`;
  }
  return `<div class="card" style="overflow:hidden;">${favs.map(favoritableRowHTML).join('')}</div>`;
}

function renderFrequent() {
  const items = getFrequent(5);
  if (items.length === 0) {
    return `<div class="card">${emptyStateHTML({ iconName: 'history', title: 'Henüz sık kullanılan yok', desc: 'Modülleri kullanmaya başladığında en sık ziyaret ettiklerin burada listelenecek.' })}</div>`;
  }
  return `<div class="card" style="overflow:hidden;">${items.map((it) => simpleRowHTML(it.path, it.icon, it.labelTr, `${it.count} kez ziyaret edildi`)).join('')}</div>`;
}

function renderRecent() {
  const items = getRecent(5);
  if (items.length === 0) {
    return `<div class="card">${emptyStateHTML({ iconName: 'history', title: 'Henüz işlem yok', desc: 'Araç ve modülleri kullanmaya başladığında son işlemlerin burada görünecek.' })}</div>`;
  }
  return `<div class="card" style="overflow:hidden;">${items.map((it) => simpleRowHTML(it.path, it.icon, it.labelTr, formatRelativeTime(it.lastVisitedAt))).join('')}</div>`;
}

const WIDGETS = {
  quickAccess: { title: 'Hızlı Erişim', render: renderQuickAccess },
  favorites: { title: 'Favoriler', render: renderFavorites },
  frequent: { title: 'Sık Kullanılanlar', render: renderFrequent },
  recent: { title: 'Son İşlemler', render: renderRecent },
};

function loadConfig() {
  const stored = getItem(WIDGETS_KEY, null);
  const storedOrder = (stored?.order ?? []).filter((id) => WIDGETS[id]);
  const missing = DEFAULT_ORDER.filter((id) => !storedOrder.includes(id));
  return {
    order: [...storedOrder, ...missing],
    hidden: (stored?.hidden ?? []).filter((id) => WIDGETS[id]),
  };
}

function saveConfig(config) {
  setItem(WIDGETS_KEY, config);
}

export function render() {
  const root = document.createElement('div');
  let customizeMode = false;
  const config = loadConfig();

  function announce(msg) {
    const live = root.querySelector('#dashboard-live');
    if (live) live.textContent = msg;
  }

  function moveWidget(id, dir) {
    const idx = config.order.indexOf(id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= config.order.length) return;
    [config.order[idx], config.order[swapIdx]] = [config.order[swapIdx], config.order[idx]];
    saveConfig(config);
    announce(`${WIDGETS[id].title} ${dir < 0 ? 'yukarı' : 'aşağı'} taşındı.`);
    renderWidgets();
  }

  function toggleHidden(id) {
    const hiddenNow = config.hidden.includes(id);
    config.hidden = hiddenNow ? config.hidden.filter((x) => x !== id) : [...config.hidden, id];
    saveConfig(config);
    announce(`${WIDGETS[id].title} ${hiddenNow ? 'gösterildi' : 'gizlendi'}.`);
    renderWidgets();
  }

  function widgetHTML(id) {
    const w = WIDGETS[id];
    const hidden = config.hidden.includes(id);
    if (hidden && !customizeMode) return '';
    const idx = config.order.indexOf(id);
    const controls = !customizeMode ? '' : `
      <div class="dashboard-widget-controls">
        <button type="button" class="btn-icon" data-move="up" data-id="${id}" aria-label="${w.title} yukarı taşı" ${idx === 0 ? 'disabled' : ''}><span style="display:inline-flex;transform:rotate(-90deg);">${icon('chevron-right', { size: 16 })}</span></button>
        <button type="button" class="btn-icon" data-move="down" data-id="${id}" aria-label="${w.title} aşağı taşı" ${idx === config.order.length - 1 ? 'disabled' : ''}><span style="display:inline-flex;transform:rotate(90deg);">${icon('chevron-right', { size: 16 })}</span></button>
        <button type="button" class="btn-icon" data-toggle-hidden="${id}" aria-pressed="${hidden}" aria-label="${w.title} ${hidden ? 'göster' : 'gizle'}">${icon('eye', { size: 16 })}</button>
      </div>`;
    return `
      <section class="${hidden ? 'dashboard-widget--hidden' : ''}" style="margin-bottom:28px;">
        <div class="dashboard-widget-header">
          <h2>${w.title}${hidden ? ' <span style="font-size:var(--text-helper);color:var(--text-muted);font-weight:500;">(Gizli)</span>' : ''}</h2>
          ${controls}
        </div>
        ${w.render()}
      </section>`;
  }

  function bindWidgetEvents(container) {
    container.querySelectorAll('[data-path]').forEach((el) => {
      el.addEventListener('click', () => navigate(el.getAttribute('data-path')));
    });
    container.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', () => navigate(el.getAttribute('data-nav')));
    });
    container.querySelectorAll('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleFavorite(btn.getAttribute('data-fav'));
        refreshAll();
      });
    });
    container.querySelectorAll('[data-move]').forEach((btn) => {
      btn.addEventListener('click', () => {
        moveWidget(btn.getAttribute('data-id'), btn.getAttribute('data-move') === 'up' ? -1 : 1);
      });
    });
    container.querySelectorAll('[data-toggle-hidden]').forEach((btn) => {
      btn.addEventListener('click', () => toggleHidden(btn.getAttribute('data-toggle-hidden')));
    });
  }

  function renderWidgets() {
    const container = root.querySelector('#dashboard-widgets');
    container.innerHTML = config.order.map(widgetHTML).join('');
    bindWidgetEvents(container);
  }

  function refreshAll() {
    const statsEl = root.querySelector('#dashboard-stats');
    if (statsEl) statsEl.textContent = statsLineText();
    renderWidgets();
  }

  root.innerHTML = `
    <div class="sr-only" aria-live="polite" id="dashboard-live"></div>
    <section style="margin-bottom:28px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;">
        <div>
          <h1>Teknik çalışma merkezine hoş geldin.</h1>
          <p style="margin-top:8px;color:var(--text-secondary);max-width:62ch;">Teknik araçlarına, sistem rehberlerine ve çalışma kayıtlarına tek yerden eriş.</p>
          <p class="dashboard-stat-line" id="dashboard-stats">${statsLineText()}</p>
        </div>
        <button type="button" class="btn-ghost-sm" id="customize-toggle" aria-pressed="false">
          ${icon('settings', { size: 16 })}
          <span>Düzenle</span>
        </button>
      </div>
    </section>
    <div id="dashboard-widgets"></div>
  `;

  root.querySelector('#customize-toggle').addEventListener('click', (e) => {
    customizeMode = !customizeMode;
    const btn = e.currentTarget;
    btn.setAttribute('aria-pressed', String(customizeMode));
    btn.querySelector('span').textContent = customizeMode ? 'Tamam' : 'Düzenle';
    renderWidgets();
  });

  renderWidgets();
  return root;
}
