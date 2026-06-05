# CLAUDE.md — Elya Partners Design Handoff

This folder is a **design handoff package**, not a runnable app. It contains HTML prototypes that define the intended look, layout, and behavior of the Elya Partners marketing site and loan application. Your job is to **recreate these designs in this repository's existing stack** — not to ship the HTML directly.

## Start here
1. Read `README.md` in this folder — it is the source of truth (every screen, design token, interaction, and state is documented there).
2. Open `Elya Partners.html` and `Elya Application.html` in a browser to see the intended result.
3. Detect this project's framework and conventions (React/Vue/Svelte/Astro/plain, CSS approach, component lib) and implement the designs using **those** patterns. If there's no front-end yet, choose the most appropriate framework and set it up.

## Non-negotiable design conventions
- **Palette:** navy `#0B1A2B` base, warm paper `#F6F3EC`, single champagne-gold accent `#C2A05B` (used sparingly — hairlines, emphasis, buttons, hover). Full token table in README.
- **Type:** Fraunces (high-contrast serif) for headlines/numbers; Inter for body/UI. Emphasis words = gold + italic.
- **Editorial motifs:** oversized section numbers (01–04), thin hairline rules, subtle film-grain overlay, lots of negative space, asymmetric grids — never center-everything.
- **Sharp corners:** border-radius 1–2px only; circles reserved for dots/badges.
- **Motion:** slow and weighted (~0.3–1.1s, eased), never bouncy. Honor `prefers-reduced-motion` everywhere.
- **No** purple gradients, emoji, clip-art, or generic SaaS-template look.

## Conventions to map onto the codebase
- Turn the raw values in README's **Design Tokens** into this project's token system (CSS vars, Tailwind theme, design-tokens file — whatever exists here).
- Recreate components with the project's component library/patterns; keep the prototype's structure and styling fidelity, not its vanilla-JS implementation.
- Self-host the fonts instead of the Google Fonts `<link>`.

## Must-fix before production (currently mocked)
- **Forms are front-end only.** Wire the inquiry form and the full application to the real backend/CRM; implement real validation, file upload/storage, and a genuine reference-number system.
- **Photography is placeholder Unsplash** — replace with licensed/owned images; keep the navy gradient overlay treatment.
- **Logo** is a CSS dot placeholder — swap in the real Elya wordmark/logo.
- **Legal:** the application's authorization/consent copy is original placeholder text, not legal advice — route it through counsel and localize before launch.
- Audit color contrast for WCAG AA after any palette tweaks.

## Files
- `README.md` — full design spec (read this first)
- `Elya Partners.html` — marketing landing page
- `Elya Application.html` — business loan application (linked from every "Apply Now")
