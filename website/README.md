# Ted Saunders — Personal Brand Site

The cinematic personal-brand website for **Ted Saunders** — film director, photographer, philosopher.
A static site: plain HTML pages with React components compiled in the browser via Babel. No build step, no
server — every page runs by opening the HTML file or serving the folder from any static host.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `About.html` |
| Portfolio (overview) | `Portfolio.html` |
| Portfolio → Films | `portfolio/films.html` |
| Portfolio → Literature & Philosophy | `portfolio/literature.html` |
| Work With Ted | `work-with-ted.html` |
| Contact | `contact.html` |
| 404 | `404.html` |

## Structure

```
index.html, About.html, …      top-level pages
portfolio/                     nested portfolio pages (films, literature)
src/                           shared React components, page apps & stylesheets
assets/                        images, video, posters, logos, fonts art
fonts/                         self-hosted Castoro + Cinzel
```

Pages in `portfolio/` set a `<base href>` at runtime (computed from the URL) so their
`src/` and `assets/` references resolve to the site root whether served at the domain
root or under a subpath.

## Run locally

It's a static site — serve the folder with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deploy

Drop the folder onto any static host (Vercel, Netlify, GitHub Pages, S3, Cloudflare Pages).
No build command and no output directory are required — the repository root *is* the site.

> Note: React/Babel are loaded from a CDN and JSX is transpiled in the browser. This keeps
> the project build-free; for a production hardening pass you could precompile the JSX.

Innovated by **INFLUEX**.
