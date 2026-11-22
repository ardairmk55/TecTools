import { getItem, setItem } from './storage.js';

const FAVORITES_KEY = 'favoriteModules';

export function getFavoriteIds() {
  return getItem(FAVORITES_KEY, []);
}

export function isFavorite(id) {
  return getFavoriteIds().includes(id);
}

export function toggleFavorite(id) {
  const ids = getFavoriteIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  setItem(FAVORITES_KEY, next);
  return next.includes(id);
}
