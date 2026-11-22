# TecTools

Professional technical workspace for computer technicians, system administrators, network technicians, hardware/electronics specialists, and developers. Turkish UI, no backend, local-first storage (LocalStorage + IndexedDB).

Stack: HTML5 + Tailwind CSS + CSS3 + Vanilla JavaScript. Hosted on Vercel as a static PWA.

## Status

Phase 1 of 10 (see `PRODUCT.md` and `.impeccable/surfaces/index-html.md` for the full plan): app shell, Arctic Blue design tokens, light/dark themes, routing, and navigation across 13 destinations. Every module page beyond Dashboard is an honest "coming soon" stub — no fabricated data.

## Develop

```powershell
npm install
npm run dev
```

`npm run dev` watches `assets/css/tailwind-input.css` and rebuilds `assets/css/tailwind.css`. Serve `index.html` with any static server (e.g. `npx serve .`) alongside it.

## Build

```powershell
npm run build
```

Vercel runs this automatically (`vercel.json`).
