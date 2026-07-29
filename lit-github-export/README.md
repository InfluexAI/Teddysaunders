# Ted Saunders — Literature & Philosophy

A self-contained export of the Literature & Philosophy archive page.

## Deploy to GitHub Pages
1. Create a new repository and upload **the entire contents of this folder** (keep the folder structure intact — `index.html`, `src/`, `assets/`, `fonts/`).
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `root`.
3. Open the published URL. `index.html` loads automatically.

The `.nojekyll` file is included so GitHub Pages serves every file as-is.

## Important
- **Must be served over HTTP(S)** (GitHub Pages, or a local server). Opening `index.html` directly from disk (`file://`) shows a blank page, because the browser blocks loading the page's component scripts over `file://`.
  - To preview locally: `python3 -m http.server` in this folder, then visit `http://localhost:8000`.
- React, ReactDOM and Babel load from a CDN, so an internet connection is required.

## Structure
```
index.html          ← entry point (identical to Literature.html)
Literature.html     ← same page, original filename
src/                ← page components (.jsx), styles (.css), helper scripts (.js)
assets/             ← all images & textures
fonts/              ← Castoro + Cinzel typefaces
```
