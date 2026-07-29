# Ted Saunders — Literature & Philosophy (site fragment)

The **Literature & Philosophy** page, structured to drop into the larger Ted Saunders
multi-page site. It lives at **`portfolio/literature.html`** — the exact path the site's
nav links to.

## Layout

This folder represents the **site root**. `src/`, `assets/`, and `fonts/` are shared
resources (the other portfolio pages use them too); the page sits one level down in
`portfolio/` and reaches the shared folders via `<base href="../">`.

```
<site root>/
├─ portfolio/
│   ├─ literature.html              ← deploy this (has <base href="../">)
│   └─ literature-standalone.html   ← local double-click preview
├─ src/                             ← shared styles + components
│   ├─ site.css  sections.css  lit-page.css  nav.css
│   └─ *.jsx / *.js
├─ assets/                          ← shared images, icons, posters
└─ fonts/                           ← shared Castoro + Cinzel
```

## How to merge into the full site

1. Copy `portfolio/literature.html` into your site's existing `portfolio/` folder.
2. Merge the contents of `src/`, `assets/`, and `fonts/` into the site's existing
   root-level `src/`, `assets/`, `fonts/` (these are shared — most files may already exist).
3. That's it — the nav link `portfolio/literature.html` already points here.

The `<base href="../">` tag makes every relative path (`src/...`, `assets/...`) resolve
to the site root, matching how the other nested portfolio pages work.

## Local preview

- **Double-click** `portfolio/literature-standalone.html` (scripts inlined, no server needed).
- Or serve the site root over HTTP (`npx serve .`) and open `/portfolio/literature.html`.

> Why two files? When you open `literature.html` directly via `file://`, the browser
> blocks the in-browser Babel compiler from fetching the `src/*.jsx` files (blank screen).
> Over HTTP (your real host) it works perfectly. `literature-standalone.html` inlines the
> scripts so it also works by double-click.

## Notes

- React, ReactDOM, and Babel load from the unpkg CDN (pinned versions) — internet required on load.
- Montserrat / Poppins load from Google Fonts; Castoro / Cinzel are self-hosted in `fonts/`.
- All internal paths are relative — no renaming needed for GitHub Pages / Vercel.
