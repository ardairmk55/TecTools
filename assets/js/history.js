import { getItem, setItem } from './storage.js';
import { ROUTE_META } from './navigation.js';

const HISTORY_KEY = 'moduleHistory';
const MAX_ENTRIES = 30;

function readAll() {
  return getItem(HISTORY_KEY, []);
}

export function recordVisit(path) {
  if (path === '/' || !ROUTE_META.has(path)) return;
  const entries = readAll();
  const existing = entries.find((e) => e.path === path);
  const now = Date.now();
  if (existing) {
    existing.count += 1;
    existing.lastVisitedAt = now;
  } else {
    entries.push({ path, count: 1, lastVisitedAt: now });
  }
  entries.sort((a, b) => b.lastVisitedAt - a.lastVisitedAt);
  setItem(HISTORY_KEY, entries.slice(0, MAX_ENTRIES));
}

function resolve(entry) {
  const meta = ROUTE_META.get(entry.path);
  return meta ? { ...entry, labelTr: meta.labelTr, icon: meta.icon } : null;
}

export function getRecent(limit = 5) {
  return readAll()
    .slice()
    .sort((a, b) => b.lastVisitedAt - a.lastVisitedAt)
    .slice(0, limit)
    .map(resolve)
    .filter(Boolean);
}

export function getFrequent(limit = 5) {
  return readAll()
    .slice()
    .sort((a, b) => b.count - a.count || b.lastVisitedAt - a.lastVisitedAt)
    .slice(0, limit)
    .map(resolve)
    .filter(Boolean);
}

export function getVisitedCount() {
  return readAll().length;
}

export function getVisitedPaths() {
  return new Set(readAll().map((e) => e.path));
}
