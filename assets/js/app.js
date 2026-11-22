import { initTheme } from './theme.js';
import { initRouter, registerRoute, setNotFound } from './router.js';
import { buildHeader } from './components/header.js';
import { buildSidebar, setSidebarDOMExpanded } from './components/sidebar.js';
import { buildBottomNav } from './components/bottomNav.js';
import { getSidebarExpanded, setSidebarExpanded, syncActiveNav, ROUTE_META } from './navigation.js';
import { openSearchModal } from './components/searchModal.js';
import { emptyStateHTML } from './components/emptyState.js';
import { recordVisit } from './history.js';

import * as dashboardPage from '../../pages/dashboard/index.js';
import * as toolboxPage from '../../pages/toolbox/index.js';
import * as systemlabPage from '../../pages/systemlab/index.js';
import * as netlabPage from '../../pages/netlab/index.js';
import * as devlabPage from '../../pages/devlab/index.js';
import * as workdeskPage from '../../pages/workdesk/index.js';
import * as mynotesPage from '../../pages/mynotes/index.js';
import * as referenceLibraryPage from '../../pages/reference-library/index.js';
import * as recordsPage from '../../pages/records/index.js';
import * as modulesPage from '../../pages/modules/index.js';
import * as settingsPage from '../../pages/settings/index.js';
import * as dataPage from '../../pages/data/index.js';
import * as profilePage from '../../pages/profile/index.js';

initTheme();

const appRoot = document.getElementById('app');

const shell = document.createElement('div');
shell.className = 'app-shell';
shell.setAttribute('data-sidebar-collapsed', String(!getSidebarExpanded()));

const sidebarEl = buildSidebar();

const main = document.createElement('main');
main.className = 'app-main';

const header = buildHeader({
  onToggleSidebar: () => {
    const expanded = !getSidebarExpanded();
    setSidebarExpanded(expanded);
    setSidebarDOMExpanded(sidebarEl, expanded);
    shell.setAttribute('data-sidebar-collapsed', String(!expanded));
  },
});

shell.append(sidebarEl, header, main);
appRoot.append(shell, buildBottomNav());

registerRoute('/', dashboardPage.render);
registerRoute('/toolbox', toolboxPage.render);
registerRoute('/systemlab', systemlabPage.render);
registerRoute('/netlab', netlabPage.render);
registerRoute('/devlab', devlabPage.render);
registerRoute('/workdesk', workdeskPage.render);
registerRoute('/mynotes', mynotesPage.render);
registerRoute('/reference-library', referenceLibraryPage.render);
registerRoute('/records', recordsPage.render);
registerRoute('/modules', modulesPage.render);
registerRoute('/settings', settingsPage.render);
registerRoute('/data', dataPage.render);
registerRoute('/profile', profilePage.render);

setNotFound(() => {
  const el = document.createElement('div');
  el.innerHTML = `<div class="card">${emptyStateHTML({ iconName: 'grid-2x2', title: 'Sayfa bulunamadı', desc: 'Aradığınız sayfa mevcut değil.' })}</div>`;
  return el;
});

document.addEventListener('tectools:route-change', (e) => {
  syncActiveNav(document, e.detail.path);
  recordVisit(e.detail.path);
  const meta = ROUTE_META.get(e.detail.path);
  document.title = meta ? `${meta.labelTr} · TecTools` : 'TecTools';
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearchModal();
  }
});

initRouter(main);
