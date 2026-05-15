# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CSS Build

This project uses Tailwind CSS v4 (standalone CLI). There is no `package.json` — Tailwind is invoked directly via `npx`.

**Watch mode (development):**
```
npx @tailwindcss/cli -i ./styles/tailwind/input.css -o ./styles/tailwind/output.css --watch --minify
```

**One-time build:**
```
npx @tailwindcss/cli -i ./styles/tailwind/input.css -o ./styles/tailwind/output.css --minify
```

The VSCode task runner also exposes these as "Watch Tailwind CSS" and "Minify Tailwind CSS".

After editing `styles/tailwind/input.css` or any HTML/JS that introduces new Tailwind classes, rebuild `styles/tailwind/output.css`.

## Architecture

**No framework, no bundler.** Plain HTML + vanilla JS (ES modules) + Tailwind CSS.

### Page structure

Each page (`index.html`, `about.html`, `eligibility.html`, `blogs.html`, `blog.html`, `contact.html`) follows the same pattern:
1. Links `styles/base.css` and its own `styles/pages/<name>.css`.
2. Loads `components/navbar.js` and `components/footer.js` as plain `<script>` tags (not modules).
3. Loads Lenis smooth scroll from CDN.
4. Loads `scripts/pages/<name>.js` (page-specific animations) and `scripts/main.js` as ES modules.

### Components

`components/navbar.js` and `components/footer.js` are Web Components (`customElements.define`). They render via `connectedCallback` and are placed as `<navbar-component>` / `<footer-component>` in each HTML file.

### JavaScript modules

- `scripts/main.js` — entry point shared by all pages. Initialises Lenis, loads `.svg-icon` masks, and imports `modules/navbar.js` (mobile toggle) and `modules/animation.js` (global reveal system).
- `scripts/modules/animation.js` — imports Motion (`animate`, `inView`, `scroll`, `stagger`) from CDN. Defines and runs two global systems:
  - `[data-reveal]` elements fade/slide in on scroll via `inView`.
  - `[data-text-split]` elements split into word/char spans and stagger-animate. Exported as `animateTextSplit()` for reuse.
  - Exports `animateBreakpoint(query, callback)` for responsive scroll animations.
- `scripts/pages/<name>.js` — page-specific scroll and entrance animations. Import from `../modules/animation.js`.

### Styling

- `styles/base.css` — imports Google Fonts, imports `tailwind/output.css`, declares CSS custom properties (design tokens: `--primary`, `--yellow`, `--dark-teal`, `--green`, `--background-primary`, `--background-secondary`, fluid type scale via `--fs-h*`), global base styles, and component classes (`.glass-element`, `.mobile-nav-toggle`, `.svg-icon`, `nav`, `footer`).
- `styles/tailwind/input.css` — Tailwind v4 source. Declares `@theme` tokens that map to CSS variables, `@utility container`, `@utility prose`, and component layers (`.btn-*`, `.arrow-btn`, `.glass-element`).
- `styles/pages/<name>.css` — page-specific styles.

### Animation conventions

- Add `data-reveal` to any element that should fade in on scroll (handled globally by `animation.js`).
- Add `data-text-split` to headings for word/char stagger animations.
- Optional data attributes: `data-delay`, `data-duration`, `data-amount`, `data-stagger`, `data-type="card"`.
- Page-specific scroll animations use Motion's `scroll()` utility imported from `animation.js`.

### Design tokens (CSS variables)

| Token | Value |
|---|---|
| `--primary` | `#74045f` (purple) |
| `--yellow` | `#c7911b` |
| `--dark-teal` | `#04303b` |
| `--green` | `#0b692e` |
| `--background-primary` | `#e3e4d4` |
| `--background-secondary` | `#f2f3ee` |

### Fonts

- **Thai text:** IBM Plex Sans Thai (body default)
- **Latin / numbers:** Inter
