# Ted Saunders — Literature & Philosophy (GitHub-ready)

The current Literature page with all of today's updates. Static site, no build step.

## ⚠️ Must be served over HTTP (this prevents the blank screen)

This page compiles its `.jsx` files in the browser. If you **double-click `index.html`**
(opening it as `file://`), the browser blocks those files from loading and you get a
**blank screen**. This is expected and is NOT a missing-file problem.

It works correctly when served over HTTP — which is exactly what GitHub Pages, Vercel,
and Netlify all do automatically. So once uploaded, it just works.

**To preview locally:** run a tiny server in this folder instead of double-clicking:
```
npx serve .
# or
python3 -m http.server
```
then open the printed `http://localhost:...` address.

## Deploy to GitHub Pages

1. Push this folder's contents to your repo.
2. Settings → Pages → deploy from branch → root.
3. Open the published URL. `index.html` is the entry point. Done.

## Structure

```
index.html              ← entry point
src/                    ← styles + React components (compiled in-browser)
  site.css  nav.css  sections.css  lit-page.css
  *.jsx / *.js
  sparkle-cursor.js     ← cursor animation DISABLED (no sparkle trail)
assets/                 ← all 61 images, icons, posters, textures
fonts/                  ← self-hosted Cinzel + Castoro
```

## Today's updates included

- Lyrics cards + popup use the music-parchment background
- TedThoughts background (`tedthoughts-bg-v4.png`)
- Article/Essay modals with hero image + shareable link
- Book of Ignorance chapter modals
- Worldbuilding popups
- Shared footer with Instagram / X rune-style SVG glyphs (v=127)
- **Cursor animation removed** — `src/sparkle-cursor.js` is a disabled no-op

## Notes

- React, ReactDOM and Babel load from the unpkg CDN (pinned) — internet required on load.
- Montserrat / Poppins from Google Fonts; Cinzel / Castoro self-hosted in `fonts/`.
- All paths are relative — no renaming needed.
