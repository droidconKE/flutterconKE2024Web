# flutterconKE — Home Redesign / Rebrand Plan

> Status: **Planning** · Last updated: 2026-06-19 · Scope: Landing page first, then propagate the design language to other pages.

This is a **rebrand**, not just a home-page reshuffle: new logo, new color system, new display type, new image treatment, and a rounded-card layout. The current stack already supports it cleanly (Next 15 + Tailwind `darkMode:'class'` + custom theme context), so the work is mostly **design-token swaps + component restyling**, not a re-platform.

> **flutterconKE note:** the design is **shared with droidconKE** (same layout, same components, same Rauschen B display type). The **only difference is the color palette** — fluttercon will get its own Figma variable export that replaces the droidcon colors with event-relevant ones. Logo/mascot are the Flutter blue marks (not the droidcon green).

---

## 0. Branching & workflow

> 🌿 **`feat/home-redesign-plan` is the central integration branch for the rebrand.**
>
> - **All** redesign sub-PRs (font, tokens, components, etc.) target **`feat/home-redesign-plan`** — **not** `dev`.
> - Branch new redesign work **off** `feat/home-redesign-plan`.
> - We merge `feat/home-redesign-plan` → `dev` **once, when the whole redesign is approved**, so everything lands together.
> - Same strategy in both repos (droidconKE + flutterconKE).

---

## 1. Design sources

| Source                                                                    | Reference                                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------- |
| Figma variables export (fluttercon palette)                               | ✅ Received — `public/docs/colors/` (see §3 ramps)   |
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

| Element      | Current (flutterconKE)                         | New                                                          |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------ |
| Logo         | `fluttercon` flat                              | Flutter-blue `con` mark (SVG)                                |
| Primary      | Flutter blue `#0062FF`                         | **Flutter-blue** `#008BFF` (matches logo SVG)                |
| Brand accent | amber `#FFAB00`, accents `#0014E6` / `#54C4F7` | **Magenta** `#F73EDE`                                        |
| Display type | Montserrat bold                                | **Rauschen B** (heavy grotesque), solid + **outline**        |
| Images       | Plain photos                                   | **Halftone / dot-pattern** overlays                          |
| Layout       | Stacked sections                               | **Rounded card system** + stat cards (6TH, 2ND, 200+, 3000+) |
| Footer       | Gradient block                                 | **City skyline** illustration                                |

### Color tokens (from Figma variable export)

Source exports committed at `public/docs/colors/` (`Flutter-1` = magenta, `Flutter-2` = blue). Full Tailwind-style ramps — map straight into `tailwind.config.js`. Distinct from droidcon (magenta + flutter-blue, not green):

| Step | **Magenta** (brand accent) | **Blue** (primary)   |
| ---- | -------------------------- | -------------------- |
| 50   | `#FFF3FE`                  | `#EDFAFF`            |
| 100  | `#FFE7FE`                  | `#D6F3FF`            |
| 200  | `#FFCEFC`                  | `#B5EBFF`            |
| 300  | `#FFA7F5`                  | `#83E1FF`            |
| 400  | `#FF57E9`                  | `#48CEFF`            |
| 500  | `#F73EDE` ◀ accent        | `#1EB3FF`            |
| 600  | `#DB1EBE`                  | `#069AFF`            |
| 700  | `#B6159A`                  | `#008BFF` ◀ primary |
| 800  | `#95137D`                  | `#086AC5`            |
| 900  | `#791664`                  | `#0D5A9B`            |

**Neutrals & dark mode** (not in the export — inferred from the mockups): text/ink `#20201E`, white `#FFFFFF`, muted `#707070`, surface `#F5F5F5`; dark-mode background near-black `#0A0A0A` / `#000000` with the blue/magenta accents popping.

### Confirmed decisions (2026-06-19)

- **Colors:** replace fully — **flutter-blue `#008BFF` + magenta `#F73EDE`** become the system (retiring flutter blue/amber). Use the full ramps above as Tailwind color scales.
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

> 📌 **Font wiring is tracked in #25.** The licensed font is **not** stored in this public repo — it lives in the private repo **[droidconKE/private-fonts](https://github.com/droidconKE/private-fonts)** (shared with droidconKE) and is **injected at build time** into gitignored `public/fonts/`, then loaded via `@font-face`.

- **Display: Rauschen B** — sans-serif grotesque by Philipp Herrmann / Out of the Dark. The official droidcon brand display font; commercial/licensed. Web format (`.woff2`) is fetched from the private repo at build (auth via `FONT_REPO_TOKEN` → `gh auth token` → free fallback). Same font as droidconKE. See #25.
  - Only the **Book** weight is available so far. ⚠️ The heavy "BEYOND" headline ideally needs a **Bold/Black** cut from the droidcon brand kit.
- **Body font:** TBD — confirm from Figma whether body text is also Rauschen or a separate face.

---

## 7. Tech context

Next.js · TypeScript · Tailwind (`darkMode: 'class'`) · custom `ThemeContext` (localStorage theme key) · no component library. Tokens centralized in [tailwind.config.js](../../tailwind.config.js); global utility classes in [styles/globals.css](../../styles/globals.css). Repo mirrors `droidconKE/droidconKE2022Web` — see that repo's plan + issue for the parent design work.

---

## 8. Blockers

- ⏳ **fluttercon Figma variables export** (the event-relevant color palette) — needed before Phase 0 tokens.
- ⚠️ Confirm Rauschen B weight (Book vs. heavier) for the headline, and the body font.

---

## 9. Revised landing page (2026-08-14)

Ported from droidconKE, which carries the authoritative write-up: see **section 8** of [droidconKE's REDESIGN-PLAN.md](https://github.com/droidconKE/droidconKE2022Web/blob/feat/home-redesign-plan/docs/design/REDESIGN-PLAN.md). There is **no separate Figma for the flutter landing page** — this mirrors the droidcon layout with flutter branding, so droidcon stays the source of truth for structure.

### Assets

| Asset                                          | Origin                                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| `revised/fcke-square.png` (2524²)              | Flutter-specific — feeds the whole `public/images/icons/` set                          |
| `revised/fcke-cover.png` (2400×800)            | Flutter-specific — `og:image` / `twitter:image`                                        |
| `revised/beyond-sessions.png` · `dev-days.png` | **Flutter-only** — magenta halftones. droidconKE's are blue; do NOT copy between repos |
| `revised/new-footer-pink.png`                  | **Flutter-only** — dark-mode KICC. Light mode uses the shared blue `new-footer-2.png`  |
| `revised/stacks.png` · `new-footer-2.png`      | **Shared with droidconKE** — keep in step                                              |
| `logo-light.svg` / `logo-dark.svg`             | Footer wordmark (droidcon uses `droidcon-large-*.svg` instead)                         |

The cover was exported at 4501px and is **resized to 2400** — Twitter rejects `summary_large_image` above 4096px. Its 3:1 ratio is wider than OG's 1.91:1, so keep key content vertically centred.

Brand colours that were still pre-rebrand and are now `#008BFF`: `manifest.json` `theme_color` (was `#FFAB00`), `background_color` (was `#54C4F7`), the `theme-color` meta, and `browserconfig.xml` `TileColor`.

### Flutter-specific decisions

- **Editions:** `3RD · ANNUAL`, stats `3RD FLUTTERCON EDITION` / `7TH DROIDCON EDITION`. Conferences read `FLUTTER · DROIDCON`.
- **Hero gradient** uses the flutter ramp (`#008BFF → #F73EDE`) rather than droidcon's `#0055FF → #FF57E9`.
- **Two blocks invert between themes** — this is deliberate in the design, not a dark-mode bug:
  - About stats panel: black with magenta figures in light, magenta with white figures in dark.
  - Developer Days card: black with a magenta heading in light, magenta with a black heading in dark.
- **Beyond the Sessions** has a **white** heading, not the accent colour droidcon uses.
- **Community Partners** heading is black on the magenta card, not blue.
- **Conf. Essentials icons** were recoloured from droidcon green `#01FF4F` to `#F73EDE` in `public/images/svg/`.
- **"Beyond Stacks"** is the shared 2026 theme and is deliberately identical across both sites.
- **CFP / Speakers commented out**, same as droidcon — both return next year.
- **Conf. Highlights copy is drafted, not designed.** The joint-track line points at DroidconKE, and "Developer Days" was rewritten around Flutter/Dart. Needs a content review.
- **Code of Conduct stays app-specific.**

### Carried-over gotchas

Both apply here identically — see droidcon section 8 for the full reasoning:

- `styles/globals.css` styles bare `p` with `dark:text-lighter-dark`, and `.dark p` outranks a single utility class. Cards with a fixed brand background must pin text with an explicit `dark:` variant.
- The nav is `fixed … z-10`. Anything else using `z-10` ties with it and wins on DOM order — wrap in `isolate`.

### Hero cube

Same live Spline scene as droidcon (`@splinetool/runtime`, lazily imported). ⚠️ **Its loop is unresolved** — the scene is authored `start-once` and stops after one 30s pass; droidcon section 8 documents five failed approaches. Cost is ~546 KB gz. Dropping `<SplineCube />` from the hero is a one-line change if the download is not worth it.
