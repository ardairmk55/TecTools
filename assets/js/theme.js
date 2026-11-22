import { getItem, setItem } from './storage.js';

const THEME_KEY = 'theme';

export function getStoredTheme() {
  return getItem(THEME_KEY, null);
}

export function getEffectiveTheme() {
  return getStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
  root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme) {
  setItem(THEME_KEY, theme);
  applyTheme(theme);
  document.dispatchEvent(new CustomEvent('tectools:theme-change', { detail: { theme } }));
}

export function toggleTheme() {
  setTheme(getEffectiveTheme() === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  applyTheme(getStoredTheme());
}
