import { getItem, setItem } from './storage.js';

const SIDEBAR_EXPANDED_KEY = 'sidebarExpanded';

export const NAV_GROUPS = [
  { id: 'workspace', labelTr: 'ÇALIŞMA ALANI', items: [
    { id: 'dashboard', path: '/', labelTr: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'toolbox', path: '/toolbox', labelTr: 'ToolBox', icon: 'wrench' },
    { id: 'systemlab', path: '/systemlab', labelTr: 'SystemLab', icon: 'monitor-cog' },
    { id: 'netlab', path: '/netlab', labelTr: 'NetLab', icon: 'network' },
    { id: 'devlab', path: '/devlab', labelTr: 'DevLab', icon: 'code-2' },
  ] },
  { id: 'management', labelTr: 'YÖNETİM', items: [
    { id: 'workdesk', path: '/workdesk', labelTr: 'WorkDesk', icon: 'briefcase' },
    { id: 'mynotes', path: '/mynotes', labelTr: 'MyNotes', icon: 'notebook-pen' },
    { id: 'records', path: '/records', labelTr: 'Kayıtlar', icon: 'history' },
  ] },
  { id: 'resources', labelTr: 'KAYNAKLAR', items: [
    { id: 'reference-library', path: '/reference-library', labelTr: 'Reference Library', icon: 'library' },
  ] },
];

export const FOOTER_ITEMS = [
  { id: 'settings', path: '/settings', labelTr: 'Ayarlar', icon: 'settings' },
  { id: 'data', path: '/data', labelTr: 'Veri Yönetimi', icon: 'database' },
];

export const BOTTOM_NAV_ITEMS = [
  { id: 'dashboard', path: '/', labelTr: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'toolbox', path: '/toolbox', labelTr: 'Araçlar', icon: 'wrench' },
  { id: 'modules', path: '/modules', labelTr: 'Modüller', icon: 'grid-2x2' },
  { id: 'records', path: '/records', labelTr: 'Kayıtlar', icon: 'history' },
  { id: 'profile', path: '/profile', labelTr: 'Profil', icon: 'user' },
];

export const MODULE_LINKS = [
  { id: 'systemlab', path: '/systemlab', labelTr: 'SystemLab', descTr: 'Sistem kurulumu, bakım ve sorun giderme', icon: 'monitor-cog' },
  { id: 'netlab', path: '/netlab', labelTr: 'NetLab', descTr: 'Ağ hesaplayıcıları, komutlar ve referanslar', icon: 'network' },
  { id: 'devlab', path: '/devlab', labelTr: 'DevLab', descTr: 'Kod geliştirme ve yazılım araçları', icon: 'code-2' },
  { id: 'workdesk', path: '/workdesk', labelTr: 'WorkDesk', descTr: 'Projeler, görevler ve teknik servis', icon: 'briefcase' },
  { id: 'mynotes', path: '/mynotes', labelTr: 'MyNotes', descTr: 'Kişisel teknik notların', icon: 'notebook-pen' },
  { id: 'reference-library', path: '/reference-library', labelTr: 'Reference Library', descTr: 'Resmi dokümantasyon kaynakları', icon: 'library' },
];

export const DASHBOARD_MODULES = [
  { id: 'toolbox', path: '/toolbox', labelTr: 'ToolBox', descTr: 'Hesaplayıcılar ve pratik araçlar', icon: 'wrench' },
  { id: 'systemlab', path: '/systemlab', labelTr: 'SystemLab', descTr: 'Sistem kurulumu, bakım ve sorun giderme', icon: 'monitor-cog' },
  { id: 'netlab', path: '/netlab', labelTr: 'NetLab', descTr: 'Ağ hesaplayıcıları, komutlar ve referanslar', icon: 'network' },
  { id: 'devlab', path: '/devlab', labelTr: 'DevLab', descTr: 'Kod geliştirme ve yazılım araçları', icon: 'code-2' },
  { id: 'workdesk', path: '/workdesk', labelTr: 'WorkDesk', descTr: 'Projeler, görevler ve teknik servis', icon: 'briefcase' },
  { id: 'mynotes', path: '/mynotes', labelTr: 'MyNotes', descTr: 'Kişisel teknik notların', icon: 'notebook-pen' },
];

export const ROUTE_META = new Map();
[...NAV_GROUPS.flatMap((g) => g.items), ...FOOTER_ITEMS, ...BOTTOM_NAV_ITEMS].forEach((item) => {
  if (!ROUTE_META.has(item.path)) ROUTE_META.set(item.path, { labelTr: item.labelTr, icon: item.icon });
});

export function getSidebarExpanded() {
  return getItem(SIDEBAR_EXPANDED_KEY, true);
}

export function setSidebarExpanded(expanded) {
  setItem(SIDEBAR_EXPANDED_KEY, expanded);
}

export function syncActiveNav(root, currentPath) {
  root.querySelectorAll('[data-nav-path]').forEach((el) => {
    if (el.getAttribute('data-nav-path') === currentPath) {
      el.setAttribute('aria-current', 'page');
    } else {
      el.removeAttribute('aria-current');
    }
  });
}
