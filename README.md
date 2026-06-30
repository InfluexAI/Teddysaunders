# Ted Saunders — Personal Brand Site

The marketing site for **Ted Saunders** (director · photographer · philosopher).
Cinematic bronze-on-black, built as static HTML pages with React components compiled
in the browser via Babel — **no build step, no bundler, no `npm install`.**

---

## Run it locally

Any static file server works. Pick one:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open <http://localhost:8000>. Open `index.html` as the entry point.

> Opening the `.html` files directly with `file://` will not work — the pages fetch
> sibling `.jsx`/`.css` files over HTTP, so they must be served.

---

## Pages

| File | Route | Notes |
|------|-------|-------|
| `index.html` | `/` | Home — hero reel, press, featured work, archive, compass, pathways, IP, finance, footer |
| `About.html` | `/About` | Origin story, compass, ventures |
| `Portfolio.html` | `/Portfolio` | Overview of all four media |
| `portfolio/films.html` | `/portfolio/films` | Films archive — reels, rails, TEDFLIX, filterable library |
| `portfolio/photography.html` | `/portfolio/photography` | Photography galleries |
| `portfolio/literature.html` | `/portfolio/literature` | Poetry, essays, worldbuilding |
| `work-with-ted.html` | `/work-with-ted` | Coaching · Brand · Investors conversion hub |
| `contact.html` | `/contact` | Contact / inquiry flow |
| `404.html` | — | Not-found page |

> The `portfolio/*.html` pages set `<base href="../">` at runtime so their relative
> `src/` and `assets/` references resolve to the site root regardless of how the host
> serves the URL (`/portfolio/films.html`, `/portfolio/films`, or `/portfolio/films/`).

---

## How a page is structured

Each HTML page:

1. Loads shared stylesheets from `src/` (`site.css`, `sections.css`) plus any
   page-specific CSS.
2. Loads **React 18.3.1**, **ReactDOM**, and **Babel Standalone 7.29.0** from unpkg
   (pinned, with integrity hashes).
3. Loads its components as `<script type="text/babel">` — shared ones from `src/`
   (e.g. `Header.jsx`, `Footer.jsx`, `Button.jsx`) and page apps from the root or
   `src/` (e.g. `WorkApp2.jsx`, `src/FilmsPageApp.jsx`).

Components share scope through the global `window` object rather than ES modules
(each Babel script is its own scope), so a component is attached to `window` at the
end of its file and read off `window` where it's used.

---

## Project layout

```
index.html  About.html  Portfolio.html  work-with-ted.html  contact.html  404.html
portfolio/          → films / photography / literature sub-pages
src/                → shared + page components (.jsx), stylesheets (.css), helpers (.js)
assets/             → all imagery, video, logos, fonts-as-images, icons
fonts/              → self-hosted Castoro + Cinzel
About*.jsx          → About page components
Work*.jsx, Wk*.jsx  → Work With Ted page components
contact-core.jsx, direction-*.jsx, app-v2.jsx → Contact page
work.css, w2.css, about*.css, contact.css, colors_and_type.css → root page styles
vercel.json         → static hosting config (clean URLs + asset caching)
```

---

## Deploying

It's a static site — drop it on any static host.

- **Vercel** — import the repo; `vercel.json` is already set up (clean URLs, immutable
  asset caching). No build command, output dir = project root.
- **Netlify / GitHub Pages / S3 / nginx** — serve the folder as-is.

---

## Notes for developers

- **Fonts:** Castoro and Cinzel are self-hosted in `fonts/`. Montserrat (nav, labels)
  and Poppins (body) load from Google Fonts — Montserrat is a stand-in for licensed
  Gotham/Mont; swap in licensed files when available.
- **No emoji, no hand-drawn SVG illustration** — the visual language is photographic,
  typographic, and gradient. Major headings clip a gold grunge texture
  (`assets/heading-texture.jpg`) into the letterforms via `background-clip: text`.
- **`?v=NNN` query strings** on script/link tags are cache-busters; bump them when you
  change a file if you're serving behind an aggressive cache.
- The in-browser Babel compile is convenient for iteration but recompiles on every
  load. If you move this into a real toolchain later, the `.jsx` files can be fed to a
  bundler (Vite/esbuild) largely unchanged once you convert the `window`-globals
  pattern to imports.
