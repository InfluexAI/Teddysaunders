# Ted Saunders — Full Website (GitHub-ready)

The complete Ted Saunders marketing site, all pages and dependencies, ready to push to GitHub / deploy on a static host.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `About.html` | About |
| `Portfolio.html` | Portfolio |
| `Literature.html` | Literature & Philosophy |
| `work-with-ted.html` | Work With Ted |
| `contact.html` | Contact |
| `404.html` | Not-found page |
| `portfolio/films.html` | Portfolio → Films |
| `portfolio/literature.html` | Portfolio → Literature (nested copy; uses `<base href="../">`) |

## Structure

```
*.html              ← page entry points (open over HTTP, not file://)
*.jsx  *.css        ← page modules + stylesheets (Babel-compiled in-browser)
src/                ← shared components, styles, helpers
assets/             ← all images, icons, posters, textures
fonts/              ← self-hosted Castoro + Cinzel
```

## Deploy

Static site — **no build step**.

- **GitHub Pages:** push to a repo, enable Pages on the branch root. `index.html` is the entry point.
- **Vercel / Netlify:** import the repo, framework preset = "Other" / static, no build command.
- **Local preview:** serve over HTTP (`npx serve .` or VS Code Live Server) and open the page. Opening an `.html` directly via `file://` will show a blank screen because the in-browser Babel compiler can't fetch the separate `.jsx` files over `file://` — a local server fixes this, and any real web host works fine.

## Notes

- React, ReactDOM and Babel load from the unpkg CDN (pinned versions) — internet required on first load.
- Montserrat / Poppins load from Google Fonts; Castoro / Cinzel are self-hosted in `fonts/`.
- All internal paths are relative — safe for any static host, no renaming needed.
