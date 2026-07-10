# Ted Saunders — Website

Static, self-contained marketing site for Ted Saunders (director · photographer · philosopher).
No build step: pages are plain HTML that load React + Babel from a CDN and compile the `.jsx`
components in-browser. Just serve the folder as static files.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3).

- **GitHub Pages** — push this folder to a repo, then Settings → Pages → deploy from branch (root).
- **Netlify / Vercel** — drag-and-drop the folder, or point at the repo. No build command; publish
  directory is the repo root.
- **Local preview** — from this folder run `python3 -m http.server 8000` and open
  `http://localhost:8000/`. Opening the HTML via `file://` will not work (the browser blocks
  loading the `.jsx`/asset files).

## Pages

| URL | File |
|-----|------|
| Home | `index.html` |
| About | `About.html` |
| Portfolio (overview) | `Portfolio.html` |
| Films | `portfolio/films.html` |
| Photography | `portfolio/photography.html` |
| Music | `portfolio/music.html` |
| Literature & Philosophy | `portfolio/literature.html` |
| Web & Graphic Design | `web-graphic-design.html` |
| Work With Ted | `work-with-ted.html` |
| Contact | `contact.html` |
| 404 | `404.html` |

## Structure

```
index.html, About.html, …    top-level pages
portfolio/                   Films / Photography / Music / Literature pages
src/                         shared React components (.jsx), stylesheets (.css), small scripts
*.jsx, *.css (root)          page-specific components/styles (About*, Work*, contact, wgd, …)
assets/                      images, video, logos, press logos, IP art, fonts textures
fonts/                       self-hosted Castoro + Cinzel
```

## Notes

- `?v=NNN` suffixes on script/style URLs are cache-busting only; static hosts ignore the query
  and serve the underlying file.
- React/Babel are loaded from `unpkg.com` with pinned versions + integrity hashes.
- Tuned for desktop; narrow breakpoints are functional but not pixel-final.
