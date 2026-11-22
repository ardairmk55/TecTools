# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML5 + Tailwind CSS + CSS3 + Vanilla JavaScript. LocalStorage + IndexedDB (Dexie.js) for data. No backend, no remote database. Hosted on Vercel as a static site + PWA. Explicitly excluded: React, Vue, Angular, any server framework. User-mandated (not delegated) — directive sections 20/30.

## Users

Primary persona: computer technicians / technical service professionals (walk-in repair, on-site service work) — confirmed primary via user init interview. Secondary, equally served by the module set but not prioritized in UI/copy decisions: system administrators, network technicians, hardware specialists, electronics technicians/enthusiasts, software developers.

## Product Purpose

Bring daily technical operations into one local-first workspace: calculators, system/network references, command libraries, error-code lookups, developer utilities, and work-management (projects, tasks, technical service records, notes) — so the user stops switching between many separate sites and tools during real work.

## Positioning

Not a toolset directory and not a learning platform. The mechanism a generic "online tools" site or student dashboard can't copy: real technician workflows (service tickets, device profiles, diagnostic guides with risk levels and rollback steps) combined with the calculators/references in the same local-first app, with zero backend and zero accounts.

## Operating Context

Six work modules a technician moves between in one session: ToolBox (calculators/converters), SystemLab (Windows/Linux install, maintenance, BIOS/UEFI, error-code lookup), NetLab (network calculators, commands, references), DevLab (dev utilities, API tester, code editor, git/snippets), WorkDesk (projects, tasks/kanban, technical service tickets), MyNotes + Reference Library (personal technical notes, curated official doc links). Used on both desktop (primary diagnostic/reference work) and mobile (quick lookups, on-site service entry).

## Capabilities and Constraints

- Confirmed: all calculations must be mathematically correct and tested; no fabricated statistics or demo data anywhere; no dead/non-functional buttons.
- Constraint: browser sandbox — cannot do native ping/traceroute/port-scan/LAN-scan, cannot read CPU/GPU temps, SMART data, or real hardware sensors. Tools must say so and offer command references/external links instead of faking the capability.
- Constraint: no automatic cross-device sync; clearing browser storage loses local data. JSON export/import is the only backup path (must never silently overwrite on import).
- Terminology: keep JSON/API/DNS/BIOS/IPv4/Git/SQL/CPU/GPU etc. in English even in the Turkish UI; translate everything else.
- Undecided: exact catalogue/count of calculators and reference entries per module — build incrementally per phase, only what's verified correct.

## Brand Commitments

- Name: **TecTools** (exact spelling, never translated/abbreviated). Slogan: "Technical Tools. Simplified." Tagline: "Your Technology. Your Workspace."
- Logo: user-supplied `TT.png` (now `assets/images/brand/tectools-logo-original.png`) is the binding source of truth — square mark, two gradient-accented capital T's in "TecTools," Midnight Navy for the rest. Never redrawn, stretched, or given new icons/decoration.
- Design system name: "Arctic Blue" — full palette, type scale, and component-dimension tables are specified exactly (hex values, px sizes, radii) in the user's directive; these are binding tokens, not suggestions.
- Default and only language at this stage: Turkish (tr-TR) UI; English in source code/identifiers/docs.
- Personality: modern, professional, minimal, technical, reliable, premium — explicitly not "student dashboard," not "generic admin template," not "AI-generated-looking."
- Reference assets: `assets/images/brand/tectools-logo-original.png` (logo), `assets/images/reference/tectools-mobile-reference.png` (12-screen mobile UI mock — starting point to improve on, not to reproduce as-is).

## Evidence on Hand

None. Greenfield build — no existing users, content, demo data, testimonials, or prior app to preserve. Future phases must populate real, verified content (correct calculator math, accurate command/error references) rather than placeholders presented as real.

## Product Principles

1. Real technical workflows over decoration — every module must do real, verifiable work (correct math, accurate references), never a fake stat or a button with no effect.
2. Local-first and honest about it — no backend, no accounts, no silent sync; data safety and clear backup/restore are first-class, not an afterthought.
3. One premium system, not six separate apps — all modules share one Arctic Blue token set, one component library, one nav/search, so switching modules never feels like switching products.
4. Turkish-first, technically precise — natural professional Turkish throughout, with standard technical terms kept in English rather than awkwardly translated.
5. Technician-primary, generalist-friendly — UI and copy decisions default to the computer-technician/service persona's daily flow, while staying usable for the five secondary technical roles.

## Accessibility & Inclusion

Target: WCAG 2.1 AA (confirmed via init interview) — contrast ratios, keyboard navigation, focus order/indicators, semantic HTML/ARIA, reduced-motion support, and touch-target sizing all audited against AA, not just the directive's baseline practice list.
