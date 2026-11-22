---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

## Scope

Operate-mode surface: the TecTools app shell (sidebar, header, mobile bottom nav, router, Dashboard welcome page) — Phase 1 of a 10-phase build. Audience: computer technicians/tech-service primary, 5 secondary technical roles. Constraint: no backend, no fake data/stats, Turkish UI.

## Direction contract

THESIS: TecTools is one Arctic Blue technician workspace, not six separate tool-site skins stitched together — refuses both the generic "grid of tool cards" default and the AI-dashboard neon/glass default.

OWN-WORLD: Arctic Background #F1F5F9 / Pure White #FFFFFF surfaces, Midnight Navy #0F172A text, Arctic Blue #0284C7 primary, Sky Blue #38BDF8 (dark-mode primary), Teal #14B8A6 secondary accent only; dark theme Midnight Navy #0B1220/#111C2E surfaces, same accent logic inverted. Inter for UI text, JetBrains Mono for code/commands. Radii per directive's component-dimension table: 12px small cards, 14-16px main cards, 16-20px large panels, 9-12px buttons (not a flat "12-16px" — the full tiered range, confirmed against directive section 6.7). 1px hairline borders, one soft shadow (`0 4px 16px rgba(15,23,42,.05)`), no gradients/neon/glass/decorative shapes. Logo: TT.png square mark used as-is (icon/favicon); wordmark elsewhere is CSS text with gradient only on the two T's, Midnight Navy for the rest.

STORY: A technician opens TecTools, sees real local data (recent tools, zero-state stats, not fabricated numbers), picks a module from one consistent nav, reaches any of 8 destinations in one tap/click with an always-legible active state.

FIRST VIEWPORT: Desktop — 256px sidebar (WORKSPACE / MANAGEMENT / RESOURCES groups, Settings+Data Management pinned at bottom) at left, 64px header (wordmark trims to icon-only when sidebar collapses to 76px, global search trigger, theme toggle) across top, Dashboard welcome block + quick-module grid filling the content pane. Mobile — compact header, full-width content, 5-item bottom nav (Dashboard / Araçlar / Modüller / Kayıtlar / Profil) fixed at bottom, no horizontal scroll.

FORM: seed: none (pinned). Quoted from the user's brief: "Apple's clarity and restraint... Avoid: Excessive gradients, Neon lighting, Strong shadows, Excessive glass effects... AI-generated-looking UI decoration" (design philosophy); "Use a persistent collapsible sidebar... WORKSPACE / MANAGEMENT / RESOURCES / BOTTOM" and "Five bottom navigation destinations: Dashboard, Araçlar, Modüller, Kayıtlar, Profil" (navigation structure). Pin confirmed with user via AskUserQuestion, 2026-11-22: building directly from it, no alternate directions rolled.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved decisions

None for this surface — palette, type, shell structure, and nav all pinned by brief.

## Finish review (round 1)

Disposition: fix. Material fixes applied:
1. `--text-muted` (~2.56:1 on white) was driving `.list-row__desc` and `.input-field::placeholder` — both are body/placeholder text under the user-confirmed WCAG 2.1 AA target. Retargeted both to `--text-secondary` (~8.4:1 light, higher in dark) instead of changing the shared token, so `--text-muted`'s other (non-body) uses are untouched.
2. OWN-WORLD's radius line said "12-16px" which contradicted `--radius-lg: 18px`. Verified against directive section 6.7's actual table (large-panel tier is 16-20px) — the token was correct, the brief's summary was wrong. Corrected above.
