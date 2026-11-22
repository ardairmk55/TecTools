---
name: TecTools
description: Arctic Blue — one technician workspace, not six tool-site skins.
colors:
  arctic-bg: "#F1F5F9"
  pure-white: "#FFFFFF"
  midnight-navy: "#0F172A"
  arctic-blue: "#0284C7"
  sky-blue: "#38BDF8"
  teal: "#14B8A6"
  border-base: "#E2E8F0"
  border-strong: "#CBD5E1"
  text-secondary: "#475569"
  text-muted: "#94A3B8"
  status-success: "#16A34A"
  status-warning: "#D97706"
  status-danger: "#DC2626"
  status-info: "#0284C7"
  dark-bg: "#0B1220"
  dark-surface: "#111C2E"
  dark-surface-elevated: "#1E293B"
  dark-primary: "#38BDF8"
  dark-secondary: "#2DD4BF"
typography:
  h1:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "28px"
    fontWeight: 700
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "24px"
    fontWeight: 700
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 600
  card-heading:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "15px"
    fontWeight: 600
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  helper:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 500
  code:
    fontFamily: "JetBrains Mono, ui-monospace, 'SFMono-Regular', monospace"
    fontSize: "13px"
rounded:
  sm: "12px"
  md: "15px"
  lg: "18px"
  btn: "10px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.arctic-blue}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.btn}"
    height: "44px"
    padding: "0 18px"
  button-primary-hover:
    backgroundColor: "#0369A1"
  card:
    backgroundColor: "{colors.pure-white}"
    rounded: "{rounded.md}"
  list-row-icon:
    backgroundColor: "{colors.arctic-blue}"
    textColor: "{colors.arctic-blue}"
    rounded: "{rounded.sm}"
  input-field:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.btn}"
    height: "46px"
---

# Design System: TecTools

## Overview

**Creative North Star: "Arctic Blue"**

Arctic Blue is one technician workspace rendered as a single calm instrument panel, not six tool sites stitched under one logo. The thesis the build actually carries: restraint over decoration. Surfaces are flat, near-white panels on a cool arctic-gray canvas; the only color event on a screen is the Arctic Blue accent marking the active destination, an icon chip, or a primary action. Everything else — body text, borders, hover states — stays in a narrow neutral range so the accent reads as signal, not noise.

The build confirms the brief's own anti-references: no gradients, no neon, no glass, no decorative shapes, no strong shadows. The one shadow in the system is a single soft ambient token used identically everywhere elevation is needed — there is no shadow scale to choose from, which is itself the point. Dark theme is not a tinted afterthought; it is a fully specified second token set with its own surface, text, and accent roles (Sky Blue replaces Arctic Blue as primary in the dark context), confirmed in `themes.css` and the OS-preference fallback block.

**Key Characteristics:**
- Flat, bordered surfaces — one hairline border, one soft shadow, no shadow scale
- A single accent color per theme, used sparingly (active nav, icon tint, primary button, focus ring)
- Tiered radii, not a flat corner value — small chips, mid cards, large panels, and buttons each round differently
- Inter for all UI text; JetBrains Mono reserved strictly for code/commands
- Confirmed rejections: gradients (outside the wordmark), neon lighting, glass/blur effects, decorative shapes, strong/dramatic shadows, glyph-icon fonts

## Colors

A narrow, cool-neutral palette with exactly one chromatic accent per theme; everything else is grayscale-navy.

### Primary
- **Arctic Blue** (`#0284C7`): light-theme primary accent — active nav item, primary buttons, focus ring, icon-chip tint, link color. Hover deepens to `#0369A1`.
- **Sky Blue** (`#38BDF8`): dark-theme primary accent, same roles as Arctic Blue inverted for dark surfaces. Hover lightens to `#7DD3FC`.

### Secondary
- **Teal** (`#14B8A6` light / `#2DD4BF` dark): secondary accent only — used sparingly, never as the primary interactive color. Not observed carrying interactive state in the shipped Dashboard; reserved for future module differentiation.

### Neutral
- **Arctic Background** (`#F1F5F9` / dark `#0B1220`): page canvas, sits behind every card and panel.
- **Pure White** (`#FFFFFF` / dark `#111C2E` surface, `#1E293B` elevated): card and panel surface, header/sidebar background.
- **Midnight Navy** (`#0F172A` / dark `#F8FAFC`): primary text color — headings, titles, active content.
- **Body-Safe Secondary Text** (`#475569` light / `#CBD5E1` dark, `--text-secondary`, ~8.4:1 on white): the only token approved for body-adjacent and placeholder text — descriptions, list-row subtext, input placeholders. A finish-review fix retargeted `.list-row__desc` and `.input-field::placeholder` here from `--text-muted` after an AA contrast failure (~2.56:1).
- **Chrome-Only Muted Text** (`#94A3B8`, `--text-muted`): NOT body-safe. Reserve for non-text-content chrome only — sidebar group labels, bottom-nav inactive icons/labels, empty-state iconography, search-trigger placeholder affordance. Never assign to body copy, descriptions, or input placeholders again.
- **Border** (`#E2E8F0` light / `#263449` dark) and **Border Strong** (`#CBD5E1` light / `#334155` dark): hairline dividers, card edges, scrollbar thumb.

### Status
- **Success** `#16A34A` (dark `#4ADE80`), **Warning** `#D97706` (dark `#FBBF24`), **Danger** `#DC2626` (dark `#F87171`), **Info** `#0284C7` (dark `#38BDF8`, same as primary).

### Named Rules
**The Two-T Rule.** Gradient is permitted in exactly one place in the entire system: the two capital T's of the "TecTools" wordmark (`linear-gradient(135deg, var(--arctic-blue), var(--sky-blue))`, clipped to text). Nowhere else. The square `TT.png` icon mark and every other surface in the build stay flat. This is a sanctioned brand exception, not a precedent — it does not license gradients on buttons, cards, or backgrounds.

**The One Accent Rule.** Each theme has exactly one primary accent (Arctic Blue light / Sky Blue dark) carrying all interactive-state color. Teal is a reserved secondary, not a second interactive color. Status colors are the only other chromatic exception, and only for status semantics.

## Typography

**Body Font:** Inter (with -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, 'SFMono-Regular', monospace fallback)

**Character:** One typeface for all UI text, kept restrained — no display face, no decorative weight jumps. Mono is scoped strictly to code, commands, and technical identifiers (confirmed in `base.css`: `code, pre, .mono`), never used for UI labels or emphasis.

### Hierarchy
- **H1** (700, 28px, -0.01em tracking): page-level welcome/title text (e.g. Dashboard greeting).
- **H2** (700, 24px, -0.01em tracking): section headings within a page ("Modüller", "Son işlemler").
- **H3** (600, 18px): sub-section and empty-state titles.
- **Card Heading** (600, 15px): list-row titles, card-internal headings.
- **Body** (400, 14px, 1.55 line-height): default running text, descriptions, empty-state body copy.
- **Helper** (500, 12px): list-row descriptions, sidebar group labels (uppercase, 0.04em tracking), bottom-nav labels.
- **Code** (400, 13px, mono): inline code, command snippets, technical identifiers.

### Named Rules
**The One-Face Rule.** Inter carries every UI role from H1 down to helper text; there is no separate display/headline typeface. Weight and size, not family, create hierarchy.

## Layout

Desktop uses a fixed CSS-grid shell: 256px sidebar + fluid content column, 64px sticky header row, content area capped at 1180px and centered with 24px side padding (28px top, 48px bottom). Collapsing the sidebar narrows the grid column to 76px (icon-only rail); labels, group headings, and the wordmark hide via `[data-expanded="false"]`.

Responsive breakpoints (confirmed in `responsive.css`): Mobile 0–639.98px, Desktop 640px+ (no separate tablet CSS branch beyond that threshold). Below 640px the sidebar hides entirely, the header grows a compact brand mark, the search trigger collapses to a 44×44px icon button, and a fixed 5-item bottom nav (64px + safe-area inset) appears. `overflow-x: hidden` is enforced on `html`/`body` to guarantee no horizontal scroll at any width.

Spacing rhythm observed: 8px/12px/16px/24px/28px steps, most commonly 14–16px internal padding on rows and inputs, 20–24px between sidebar groups and major sections.

## Elevation & Depth

The system is flat by default; depth comes from a single hairline border plus exactly one soft ambient shadow token, never a shadow scale and never per-component shadow tuning.

### Shadow Vocabulary
- **Ambient** (`--shadow-light`: `0 4px 16px rgba(15,23,42,.05)` light / `0 4px 16px rgba(0,0,0,.28)` dark): the only shadow in the system. Applied uniformly to `.card`, `.toast`, and `.modal-panel` — never intensified, stacked, or given a second tier.

### Named Rules
**The Single-Shadow Rule.** One ambient shadow token exists and it is the same shadow everywhere elevation is needed. No hover-lift shadows, no directional/hard-offset shadows, no multi-layer shadow stacks — those are explicitly outside this world's form language.

## Shapes

Radii are tiered by component scale, not a flat value:
- **12px** (`--radius-sm`) — small chips: list-row icon chips, toast corners, sidebar nav-item corners.
- **15px** (`--radius-md`) — main cards: the primary `.card` surface used for module lists and content blocks.
- **18px** (`--radius-lg`) — large panels: modal panels (directive range 16–20px).
- **10px** (`--radius-btn`) — buttons and form controls: primary buttons, input fields, icon buttons, search trigger.

Borders are uniformly 1px hairlines (`--border-width`) in the border/border-strong neutral tones; no border ever carries the accent color except as a focus ring. No clipping, masking, or decorative silhouette is used anywhere in the shipped build.

## Components

### Buttons
- **Shape:** 10px radius (`--radius-btn`), 44px height.
- **Primary:** Arctic/Sky Blue background, white text, 600 weight, 0 18px padding, 8px icon gap.
- **Hover:** background deepens to `--primary-hover`; transition 150ms ease (`--motion-fast`).
- **Icon buttons** (`.btn-icon`): 40×40px, 10px radius, transparent at rest, `--surface-hover` background on hover.

### Cards / Containers
- **Corner Style:** 15px (`--radius-md`).
- **Background:** `--surface` (white / dark elevated).
- **Shadow Strategy:** single ambient shadow (see Elevation & Depth); no border + shadow escalation on hover.
- **Border:** 1px hairline, `--border`.

### List Rows (signature pattern)
The recurring content primitive for module lists and history: a flex row (14px gap, 14px/16px padding) with a 38×38px icon chip (12px radius, 10%-opacity accent tint background, accent-colored icon), a title (15px/600) + description (12px, body-safe `--text-secondary`) body block, and a trailing chevron. Divided by 1px hairline borders between rows, last row borderless. Hover tints the row with `--surface-hover`. This is the shared shape every future module (ToolBox, SystemLab, NetLab, etc.) should reuse for its own listings, not a Dashboard-only pattern.

### Empty States (signature pattern)
Centered column (10px gap, 56px/24px padding): a 40×40px muted-chrome icon, an H3 title, and body-safe-secondary description text (max 42ch). This is the honest "Yakında" stub used by every module besides Dashboard right now (ToolBox, SystemLab, NetLab, DevLab, WorkDesk, MyNotes, Reference Library, Records, Settings, Data, Profile, Modules-listing) — document the pattern, not invented per-module content that doesn't exist yet.

### Inputs / Fields
- **Style:** 46px height, 10px radius, 1px hairline border, white/surface background.
- **Focus:** border shifts to accent color (no glow/ring décor beyond the global focus-visible outline).
- **Placeholder:** body-safe `--text-secondary` (corrected post-review from `--text-muted`, which failed AA).

### Stat Line (signature pattern, added Phase 2)
A single plain inline-text line under a page's welcome paragraph reporting real, honestly-computed counts (e.g. "N favori modül · M/6 modül görüntülendi") — `--text-helper` size, body-safe `--text-secondary` color. Deliberately not a hero-metric card or number tile (no large accent digits, no decorative chips): restraint over emphasis, consistent with the One Accent Rule. Never shows a fabricated or placeholder number — a true `0` is correct; an invented non-zero is not.

### Star Toggle (signature pattern, added Phase 2)
A 32×32px icon-button (`.star-toggle`) sitting between a `.list-row__navbtn` and its trailing chevron for any favoritable list row. Outline star at rest (`--text-muted`), fills solid `--primary` when active (`aria-pressed="true"`); hover tints `--surface-hover` background. Requires splitting what was a single `<button class="list-row">` into a non-interactive `.list-row` container holding a `.list-row__navbtn` (the navigation target) plus this sibling button — necessary because a toggle and a navigation action cannot share one `<button>`. Simple rows with no favoriting stay the original single-button `.list-row` pattern.

### Widget Customize Controls (signature pattern, added Phase 2)
A `.dashboard-widget-header` row (title + optional control cluster) above any user-reorderable/hideable section. In customize mode, three 40×40px `.btn-icon` buttons appear: reorder-up and reorder-down (the existing `chevron-right` icon rotated ±90° — no separate icon asset), and a hide/show toggle (`eye` icon, `aria-pressed` = hidden). A hidden widget stays rendered but dimmed (45% opacity, dashed card border) only while customize mode is on, so it can be un-hidden; outside customize mode a hidden widget renders nothing. Boundary reorder buttons (first/last widget) are `disabled`, not hidden. A visually-hidden `aria-live="polite"` region (`.sr-only`, defined in `base.css`) announces every reorder/visibility change — required for the confirmed WCAG 2.1 AA target, since the reorder is a visual-only DOM move screen readers would otherwise miss. No drag-and-drop: arrow buttons only, per the directive's own "keep customization simple" plus keyboard accessibility.

### Navigation
- **Sidebar (desktop):** 256px wide (76px collapsed, icon-only), grouped into WORKSPACE/MANAGEMENT/RESOURCES sections with uppercase 12px helper-style group labels, Settings + Data Management pinned to a bordered footer. Nav items: 12px radius, 500-weight 14px label, `--text-secondary` at rest, `--surface-hover` background + `--text-primary` on hover, accent-tinted background (12% opacity) + accent text color for the active route.
- **Bottom nav (mobile, <640px):** fixed, 64px tall + safe-area inset, 5 items (Dashboard / Araçlar / Modüller / Kayıtlar / Profil), muted-chrome at rest, accent color when active, no background change on active (color-only state, unlike sidebar).
- **Header:** 64px sticky bar, search trigger (48px height on desktop, collapses to 44px icon button on mobile), theme toggle and notification icon buttons right-aligned.

### Wordmark / Logo (signature component)
CSS-text wordmark: the two capital T's in "TecTools" carry the Two-T Rule gradient (Arctic Blue → Sky Blue, text-clipped); the remaining letters render in `--text-primary`. The square `TT.png` mark is used as-is for icon/favicon contexts and is never redrawn or given new decoration. Icons are a small hand-authored 24×24 line-icon set (2px stroke, round caps/joins, currentColor) in one consistent Lucide-style family — not a glyph icon font.

## Do's and Don'ts

### Do:
- **Do** use the single ambient shadow token (`--shadow-light`) for every elevated surface; do not create a second shadow tier.
- **Do** use `--text-secondary` for any body-adjacent or placeholder text; it is the only text-muted-range token verified at AA contrast.
- **Do** keep the wordmark gradient confined to the two T's (Two-T Rule); everywhere else stays flat.
- **Do** reuse the `.list-row` / `.card` / `.empty-state` primitives for new modules rather than inventing new list or stub patterns.
- **Do** respect the tiered radius scale (12/15/18/10px) by component scale, not a single flat radius.

### Don't:
- **Don't** apply gradients, neon color, glass/blur, or decorative shapes anywhere outside the wordmark's two T's.
- **Don't** use `--text-muted` for body text, descriptions, or placeholders — it is chrome-only (group labels, inactive nav/icon tint) and previously caused an AA contrast failure when misused as body text.
- **Don't** use hard-offset or strong/dramatic shadows, or stack multiple shadow layers on one surface.
- **Don't** introduce glyph-icon fonts or a second icon family; the system uses exactly one hand-authored line-icon set.
- **Don't** invent module-specific content or components for the stub modules (ToolBox, SystemLab, NetLab, DevLab, WorkDesk, MyNotes, Reference Library, Records, Settings, Data, Profile, Modules-listing) — they are honest empty states until their own phase builds them.
