# flutterconKE — Home Redesign / Rebrand Plan

> Status: **Planning** · Last updated: 2026-06-19 · Scope: Landing page first, then propagate the design language to other pages.

This is a **rebrand**, not just a home-page reshuffle: new logo, new color system, new display type, new image treatment, and a rounded-card layout. The current stack already supports it cleanly (Next 15 + Tailwind `darkMode:'class'` + custom theme context), so the work is mostly **design-token swaps + component restyling**, not a re-platform.

> **flutterconKE note:** the design is **shared with droidconKE** (same layout, same components, same Rauschen B display type). The **only difference is the color palette** — fluttercon will get its own Figma variable export that replaces the droidcon colors with event-relevant ones. Logo/mascot are the Flutter blue marks (not the droidcon green).

---

## 1. Design sources

| Source                                                                    | Reference                                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------- |
| Figma variables export (fluttercon palette)                               | ⏳ **Pending** — to be provided by the team          |
| Full-page mockup (light) — _shared droidcon layout, color reference only_ | [docs/design/light.png](./light.png)                 |
| Full-page mockup (dark) — _shared droidcon layout, color reference only_  | [docs/design/dark.png](./dark.png)                   |
| Combined half view                                                        | [docs/design/combined-half.png](./combined-half.png) |

> The mockups above are the **droidcon** renders, included as **layout reference** — the structure is identical; fluttercon colors come from the pending export.

---

## 2. New design assets

All in [`public/images/new-design/`](../../public/images/new-design/):

| Asset                                                                                                                                                                                     | Use                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [logo-light.svg](../../public/images/new-design/logo-light.svg) / [logo-dark.svg](../../public/images/new-design/logo-dark.svg)                                                           | New **fluttercon** logo (Flutter blue `#008bfe`) — navbar        |
| [flutter_icon.png](../../public/images/new-design/flutter_icon.png)                                                                                                                       | Blue 3D Flutter mascot/icon for hero                             |
| [beyond-stack-light.png](../../public/images/new-design/beyond-stack-light.png) / [beyond-stack-dark.png](../../public/images/new-design/beyond-stack-dark.png)                           | "BEYOND STACKS" headline — solid + outline treatment             |
| [kenyatta-types.png](../../public/images/new-design/kenyatta-types.png)                                                                                                                   | Halftone KICC cone (Event Types section)                         |
| [android254.png](../../public/images/new-design/android254.png)                                                                                                                           | Halftone/dot-pattern photo (Community Partners)                  |
| [exhibition.png](../../public/images/new-design/exhibition.png) · [pannels.png](../../public/images/new-design/pannels.png) · [speakers.png](../../public/images/new-design/speakers.png) | New Event Type icon cards                                        |
| [footer-city.png](../../public/images/new-design/footer-city.png)                                                                                                                         | City-skyline footer illustration with embedded "Get your ticket" |

---

## 3. Design language changes

| Element      | Current (flutterconKE)                                                  | New                                                              |
| ------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Logo         | `fluttercon` flat                                                       | Flutter-blue `con` mark (SVG)                                    |
| Color system | Flutter blue `#0062FF` + amber `#FFAB00`, accents `#0014E6` / `#54C4F7` | **Replaced** by fluttercon Figma export (event-relevant palette) |
| Display type | Montserrat bold                                                         | **Rauschen B** (heavy grotesque), solid + **outline**            |
| Images       | Plain photos                                                            | **Halftone / dot-pattern** overlays                              |
| Layout       | Stacked sections                                                        | **Rounded card system** + stat cards (6TH, 2ND, 200+, 3000+)     |
| Footer       | Gradient block                                                          | **City skyline** illustration                                    |

### Confirmed decisions (2026-06-19)

- **Colors:** replace fully — the fluttercon Figma export defines the new palette (event-relevant), retiring the old flutter blue/amber tokens.
- **Scope:** plan only for now (no code yet).
- **Halftone images:** use provided PNGs **as-is** (no dynamic CSS overlay).

---

## 4. Section-by-section gap analysis

Home renders in [pages/index.tsx](../../pages/index.tsx): Banner → About → EventTypes → Sponsor CTA → SponsorsList → Gallery → Organizers.

| New section                     | Current file                                                                                                                  | Work                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Hero "BEYOND STACKS" + meta bar | [components/home/Banner.tsx](../../components/home/Banner.tsx)                                                                | **Rebuild** — display type, outline text, blue mascot, meta/filter bar |
| About + stat cards              | About block in [pages/index.tsx](../../pages/index.tsx)                                                                       | **Restyle** → filled card + stat cards                                 |
| Event Types + KICC halftone     | [components/home/EventTypes.tsx](../../components/home/EventTypes.tsx)                                                        | **Restyle** — new icons + halftone building                            |
| Tiered sponsors                 | [components/home/SponsorsList.tsx](../../components/home/SponsorsList.tsx) · [Sponsor.tsx](../../components/home/Sponsor.tsx) | **Restyle** tier grouping + labels                                     |
| Past events gallery             | [components/home/Gallery.tsx](../../components/home/Gallery.tsx)                                                              | **Light restyle** (rounded, spacing)                                   |
| Community Partners / partners   | [components/home/Organizers.tsx](../../components/home/Organizers.tsx)                                                        | **Restyle** → cards                                                    |
| Skyline footer                  | [components/layouts/components/Footer.tsx](../../components/layouts/components/Footer.tsx)                                    | **Rebuild** with skyline asset                                         |
| Navbar (new logo + links)       | [components/layouts/components/NavBar.tsx](../../components/layouts/components/NavBar.tsx)                                    | **Update** logo + accent colors                                        |

---

## 5. Phased build order

- **Phase 0 — Tokens & font (foundation).** Apply the fluttercon Figma palette in [tailwind.config.js](../../tailwind.config.js); add rounded-card `borderRadius` scale; wire Rauschen B via `next/font/local`, replacing the Google `<link>` tags in [pages/\_document.js](../../pages/_document.js) and the `--font-family` / `--font-slab` vars in [styles/globals.css](../../styles/globals.css) (note: `--font-slab` is currently mis-pointed at Montserrat — fix it); update `.btn-*` / `.title` utility classes.
- **Phase 1 — Global chrome.** NavBar (new logo) + Footer (skyline). Appears on every page → fastest visible win, validates tokens.
- **Phase 2 — Hero.** Rebuild Banner.
- **Phase 3 — Body sections.** About/stat-cards → EventTypes → Sponsors → Gallery → Organizers.
- **Phase 4 — Polish.** Place halftone PNGs, dark-mode pass vs [dark.png](./dark.png), responsive QA.
- **Phase 5 — Propagate.** Apply tokens + chrome to Sessions / Speakers / About / Sponsors pages.

---

## 6. Fonts

> 📌 **Font wiring is deferred to a follow-up issue — see #25.** Decisions agreed: self-host **woff2 only** (exclude the `.otf`), load via **`@font-face` in `styles/globals.css`**. This plan PR stays docs/assets-only.

- **Display: Rauschen B** — sans-serif grotesque by Philipp Herrmann / Out of the Dark (2021). Commercial/licensed (not on Google Fonts); self-hosted via `@font-face`. Same font as droidconKE.
- **Font files received** ✅ — `docs/design/Rauschen B Font-20260527T105301Z-3-001.zip`, containing:
  - `Rauschen-BBook.otf`, `Rauschen-BBook.woff`, `Rauschen-BBook.woff2`
  - Only one weight present: **Book**. `.woff2` is ready for web.
  - ⚠️ Open item: the "BEYOND" headline reads heavy — confirm whether the design uses **Book + outline treatment** or needs a heavier cut not in this zip.
  - To wire up (deferred, #25): extract `.woff2` into `public/fonts/`, declare `@font-face` in `styles/globals.css`.
- **Body font:** TBD — confirm from Figma whether body text is also Rauschen or a separate face.

---

## 7. Tech context

Next.js · TypeScript · Tailwind (`darkMode: 'class'`) · custom `ThemeContext` (localStorage theme key) · no component library. Tokens centralized in [tailwind.config.js](../../tailwind.config.js); global utility classes in [styles/globals.css](../../styles/globals.css). Repo mirrors `droidconKE/droidconKE2022Web` — see that repo's plan + issue for the parent design work.

---

## 8. Blockers

- ⏳ **fluttercon Figma variables export** (the event-relevant color palette) — needed before Phase 0 tokens.
- ⚠️ Confirm Rauschen B weight (Book vs. heavier) for the headline, and the body font.
