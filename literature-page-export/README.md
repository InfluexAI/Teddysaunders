# Ted Saunders — Literature & Philosophy page

GitHub-ready export of the Literature page, including all of today's updates:

- Vintage antique-card styling for the Articles & Blog cards and their pop-ups
- Feathered/blended featured images inside the ornate card frame
- Worldbuilding & Essay pop-ups sized to fit content and fully scrollable
- Global **sticky top navigation** (`src/sticky-nav.js` + styles in `src/nav.css`)
- On this page the in-hero top nav fades out on scroll and the fixed sticky nav takes over

## Structure

```
Literature.html          ← entry point (open this)
src/
  site.css               ← base tokens; @imports nav.css
  nav.css                ← shared header + sticky-nav styles
  sections.css
  lit-page.css           ← Literature-specific styles
  sticky-nav.js          ← scroll-activated sticky header (all pages)
  *.jsx                  ← React components (compiled in-browser via Babel)
fonts/                   ← Cinzel + Castoro
assets/                  ← images, textures, posters, video
```

## Running locally

The page compiles JSX in-browser and loads fonts/assets by relative path, so it
must be served over HTTP (not opened via `file://`). From this folder:

```
python3 -m http.server 8000
# then open http://localhost:8000/Literature.html
```

## Notes

- Header nav links (About, Portfolio, Work With Ted, Contact) point to sibling
  pages that are not part of this single-page export; wire them to your routes.
- React/ReactDOM/Babel load from unpkg CDNs (pinned versions with integrity hashes).
