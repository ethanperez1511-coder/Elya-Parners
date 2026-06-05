# Handoff: Elya Partners — Marketing Site + Business Application

## Overview
A single-page marketing landing page for **Elya Partners**, a private business lender, plus a dedicated multi-section **business loan application** page. The aesthetic is "quiet-luxury finance" — editorial, restrained, premium: a high-end private credit fund crossed with a print fashion magazine. Navy + warm paper + a single champagne-gold accent, high-contrast serif headlines, oversized editorial section numbers, subtle film grain, and slow, weighted motion.

## About the Design Files
The two files in this bundle (`Elya Partners.html`, `Elya Application.html`) are **design references created in HTML** — prototypes that show the intended look, layout, and behavior. They are **not** production code to copy directly. The task is to **recreate these designs in your target codebase** (React, Vue, Svelte, Astro, plain HTML/CSS, etc.) using its established patterns, component library, and conventions. If no front-end environment exists yet, pick the most appropriate framework and implement there.

Everything is self-contained: vanilla JS, CSS in a `<style>` block, Google Fonts via `<link>`, and two photographs hot-linked from Unsplash (see **Assets**).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all specified below and present in the files. Recreate the UI pixel-perfectly, then map the raw values onto your design-token system. Replace the placeholder Unsplash photography with licensed assets.

---

## Screens / Views

### A. Landing Page (`Elya Partners.html`)
A single scrolling page. Sections in order:

1. **Nav** — Fixed/sticky header. Transparent over the hero (light text), transitions to a solid translucent-navy bar with blur once scrolled past ~82% of viewport height. Left: "Elya **Partners**" wordmark with a small gold dot mark. Center/right: text links (About, Solutions, Contact). Far right: solid gold "Apply Now" button → links to the application page. Below 680px the links + button collapse into a hamburger that opens a full-screen navy mobile menu.

2. **Hero** — Full-viewport (`100svh`). Full-bleed photograph (city skyline at dusk) with a dual navy gradient overlay (darkens toward bottom and left for text legibility). Image does a slow ken-burns zoom (scale 1.02→1.13 over 26s, alternating) and gentle scroll parallax (translateY at 0.28× scroll). Content anchored bottom-left: eyebrow "Private Business Lending" (gold, with a short rule), huge serif headline on two lines — "Capital without" / "*complexity.*" (last word gold + italic), supporting paragraph, a gold "Apply now" button + a "Explore our solutions →" text link, and a centered scroll cue. On load, headline lines reveal via a masked clip slide-up (translateY 110%→0), and eyebrow/lead/actions fade-and-rise with staggered delays.

3. **Marquee** — Navy strip. Infinite horizontal scroll of value props separated by gold dots: Fast Approvals · Transparent Terms · Asset-Based Lending · Direct Lender Access · Flexible Structures · Client-First Approach. Serif italic-ish, 38s linear loop, **pauses on hover**. Content duplicated in JS for a seamless loop.

4. **Stats row** — Navy background, 4 columns separated by hairline dividers. (1) "24–48 hrs" where 24 and 48 **count up** from 0 on scroll into view (1.5s, cubic ease-out); label "From inquiry to approval decision." (2) "Flexible", (3) "Direct", (4) "Transparent" — each a serif word with a label and a short gold rule. Collapses to 2-col then 1-col.

5. **About (01)** — Paper background. Editorial section tag: serif "01" + "About" eyebrow + a hairline that animates its width on reveal. Two-column asymmetric grid (1.05fr / 0.95fr): left is headline "Pragmatic, asset-minded lending built on *trust.*" + two paragraphs; right is a 4:5 photo (handshake) in a navy-tinted frame with a circular gold "Direct Lender" badge overlapping the top-right and a navy caption card ("Since 2014 / A partner, not a portal.") at the bottom-left. Image scales 1.04 on hover.

6. **Solutions (02)** — Paper. Section tag "02 / Solutions". Head row: "What we offer" + a supporting line. 2×2 card grid. Each card: top hairline, serif number (01–04), serif title, one-line description, and a hidden "Learn more →" that fades in on hover. On hover the whole card lifts (translateY -8px) and a 2px **gold line draws in** across the top (scaleX 0→1). Four cards: Asset-Based Lending, Receivables & Factoring, Equipment Leasing, Working Capital.

7. **CTA band** — Darker navy (`#081320`) with a soft radial gold glow bottom-right. Headline "Ready to unlock your business's *potential?*" + gold "Apply Now" button.

8. **Contact (03)** — Slightly warmer paper (`#EFEADF`). Section tag "03 / Contact". Two columns: left is "Let's discuss what you need." + a 4-step vertical process list (01 Inquiry received, 02 Evaluation & structuring, 03 Term sheet issued, 04 Funded), each row separated by hairlines with a serif number; right is a navy inquiry form (Name, Company, Email, Phone, Message) with underline-style inputs, a pulsing-dot "We'll respond within one business day." note, and a "Send Inquiry" button (mock submit with inline feedback).

9. **Footer** — Darkest navy. 3-col: wordmark + blurb, Navigate links, Reach-us (email/phone/address placeholders). Bottom bar: "© 2026 Elya Partners. All rights reserved." + Privacy/Terms/Disclosures.

### B. Application Page (`Elya Application.html`)
Reached from every "Apply Now" button on the landing page.

- **Nav** — Sticky translucent-navy bar: wordmark (links home) + "← Back to site".
- **Header band** — Navy with radial gold glow. Eyebrow "Private Business Lending", serif headline "Business *application.*", supporting line.
- **Two-column shell** — Left: a **sticky rail** listing the four sections (scroll-spy highlights the active one via IntersectionObserver) plus three reassurance rows (encryption, one-day response, no obligation). Right: the form. Below 1040px the rail becomes a horizontal row of pills above the form; reassurance hidden.
- **Form sections:**
  - **01 Business Information** — Business Legal Name*, Business DBA, Tax ID/EIN*, Entity Type* (select: LLC / Corporation / Sole Proprietorship / Partnership / Other), Capital You're Looking For*, Nature of Business*, Product/Service Offered, Length of Ownership, Date of Incorporation, Business Street Address*, City*, Use of Funds*, State*, Zip Code*, Do You Accept Credit Cards? (Yes/No segmented), Open MCA Positions? (Yes/No segmented).
  - **02 Business Owner Information** — Full Name*, SSN*, Date of Birth*, Credit Score* (select range 500–550 … 800+), Home Street Address*, City*, State*, Zip Code*.
  - **03 Bank Statements** — Drag-and-drop dropzone + browse; working file list with name/size and per-file remove. Accepts PDF/JPG/PNG. (Front-end only — no upload transport.)
  - **04 Terms & Signature** — Scrollable authorization/consent box (Elya's own copy — **have counsel review**), an agreement checkbox (custom navy checkmark), a **canvas signature pad** (mouse + touch, HiDPI-aware, "Clear signature" button, "Sign here" placeholder), and a Date field defaulting to today.
- **Submit** — Validates all `[required]` fields + signature presence; flags the first invalid field (terracotta border) and smooth-scrolls to it; otherwise shows a branded "Application received" success state with a random `ELYA-######` reference number. **Entirely client-side — wire to your backend/CRM.**

---

## Interactions & Behavior
- **Nav scroll state:** add `.scrolled` when `scrollY > innerHeight * 0.82`.
- **Hero motion:** ken-burns CSS keyframe; parallax via rAF-throttled scroll listener; on-load masked headline reveal with staggered transition-delays (0.15s / 0.75s / 0.9s / 1.2s).
- **Marquee:** CSS `translateX(-50%)` loop, `animation-play-state: paused` on hover, content cloned once in JS.
- **Count-up:** IntersectionObserver (threshold 0.5) triggers a rAF counter with cubic ease-out.
- **Scroll reveals:** elements with `.reveal` get `.in` via IntersectionObserver (threshold ~0.18, rootMargin bottom -8%); `.d1`–`.d4` add stagger delays. Section-tag hairline animates `max-width` 0→240px.
- **Buttons:** gold fill-sweep via a `::before` that slides in on hover; **magnetic** translate toward cursor (≤0.18×/0.28×) on fine pointers only.
- **Cards:** lift + gold top-line `scaleX` draw on hover.
- **Forms:** mock submit with inline label feedback; application validates required fields + signature, scroll-to-first-error, success screen.
- **Scroll-spy** (application rail): IntersectionObserver with `rootMargin: -30% 0 -60% 0`.
- **`prefers-reduced-motion: reduce`** is honored throughout — disables ken-burns, parallax, marquee, grain animation, count-up easing (snaps to final), reveal transforms, and smooth scroll.
- **Responsive:** fully fluid via `clamp()` type/spacing; breakpoints at 1040 / 980 / 680 / 640px.

## State Management
Minimal — all local UI state:
- Nav `scrolled` boolean; mobile-menu open boolean (locks body scroll).
- Marquee paused (CSS-only).
- Count-up "has animated" guard (unobserve after first run).
- Application: uploaded-files array (add/remove/render), signature `hasInk` boolean + canvas bitmap, active rail section, per-field validity, submitted boolean (toggles form ↔ success).
No data fetching in the prototype. In production: the inquiry form and the application POST to your backend; file uploads need multipart/presigned-URL handling; success screen should reflect a real reference ID.

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| navy | `#0B1A2B` | primary dark base, stats, form panel |
| navy-900 | `#081320` | CTA band, footer, nav-solid base |
| navy-800 | `#0F2235` | image frame fallback |
| navy-700 | `#16304a` | hover ink |
| paper | `#F6F3EC` | primary light background |
| paper-2 | `#EFEADF` | contact section / file chips |
| white | `#FCFAF5` | input fields (application) |
| gold | `#C2A05B` | primary accent / buttons |
| gold-soft | `#D8BE86` | accent on dark (eyebrows, emphasis) |
| gold-deep | `#A6863F` | accent on light, button hover sweep |
| ink | `#0B1A2B` | body text on paper |
| ink-60 | `rgba(11,26,43,.62)` | secondary text |
| ink-40 | `rgba(11,26,43,.42)` | tertiary / placeholders |
| paper-70 | `rgba(246,243,236,.72)` | secondary text on navy |
| paper-45 | `rgba(246,243,236,.46)` | tertiary on navy |
| hair-dark | `rgba(11,26,43,.14)` | hairlines on paper |
| hair-mid | `rgba(11,26,43,.22)` | input borders |
| hair-light | `rgba(246,243,236,.18)` | hairlines on navy |
| selection | bg gold / text navy | ::selection |
| error | `#b5503a` | invalid field border (terracotta) |

### Typography
- **Display / headlines:** `Fraunces` (Google Fonts; ital + optical-sizing 9–144; weights 300–600). Used for h1–h4, stat values, marquee, section numbers. Headlines weight ~340–380, letter-spacing -0.012 to -0.02em, line-height ~1.0–1.05. Italic + gold for emphasis words.
- **Body / UI:** `Inter` (weights 300/400/500/600). Body 400, line-height ~1.6.
- **Fallbacks:** serif → Georgia, serif; sans → system stack.
- **Eyebrows / labels:** Inter 500, ~0.7rem, letter-spacing 0.2–0.32em, uppercase.
- **Fluid scale (clamp):** hero `clamp(3rem,8.2vw,7.5rem)`; h2 `clamp(2.1rem,5vw,4.25rem)`; h3 `clamp(1.5rem,2.6vw,2.25rem)`; lead `clamp(1.125rem,1.55vw,1.4rem)`; body `clamp(1rem,1.05vw,1.1rem)`; big ghost number `clamp(4.5rem,13vw,11rem)`.

### Spacing
Scale: `0.5 / 1 / 1.5 / 2.5 / 4 / 6 / 9 / 13 rem`. Page gutter `clamp(1.25rem,5vw,6.5rem)`. Max content width 1440px (landing) / 1340px (application). Section padding `clamp(5rem,11vw,11rem)` vertical.

### Radius / Shadow / Effects
- Border radius: **1–2px** only (sharp, editorial). Buttons/inputs `1–2px`; circular badges/dots are the only round elements.
- Button hover shadow: `0 18px 40px -18px rgba(0,0,0,.4–.5)`.
- Card lift: `translateY(-8px)` + gold top line.
- **Film grain:** fixed full-viewport SVG `feTurbulence` overlay, `opacity ~0.045–0.05`, `mix-blend-mode: overlay`, subtle 7s stepped shift (disabled for reduced-motion).
- Easing: `cubic-bezier(.22,.61,.36,1)` (primary) and `cubic-bezier(.16,1,.3,1)` (ease-out). Motion is slow/weighted — transitions ~0.3–1.1s.

## Assets
- **Fonts:** Fraunces + Inter from Google Fonts (`<link>` in `<head>`). Self-host in production.
- **Photography (placeholders — replace with licensed images):**
  - Hero skyline at dusk — Unsplash `photo-1480714378408-67cf0d13bc1b`
  - Handshake / partners — Unsplash `photo-1521791136064-7986c2920216`
- **Icons:** small inline SVGs only (hamburger, close, arrows, shield/clock/bars in the application rail, upload, file, checkmarks). No icon-font dependency. The gold "dot" mark in the wordmark is a CSS circle — replace with the real Elya logo when available.
- No emoji, no clip-art, no raster icons.

## Files
- `Elya Partners.html` — the marketing landing page (all sections above).
- `Elya Application.html` — the business loan application page. Every "Apply Now" on the landing page links here; its nav/footer link back.
- Both are standalone; open either in a browser. The "Apply Now" links assume both files sit in the same directory.

## Notes for production
- Replace placeholder photography with licensed/owned assets; keep the navy gradient overlay treatment for cohesion.
- Swap the CSS-dot wordmark for the real logo.
- The inquiry form and full application are **front-end mocks** — implement real submission, validation, file storage, and a genuine reference-number system.
- **Legal:** the authorization/consent text on the application is original placeholder copy written in Elya's voice, not legal advice — have counsel review and localize it.
- Self-host fonts and audit color contrast against WCAG AA for your final palette tweaks.
