# Ted Saunders — Website UI Kit

An interactive recreation of the **Ted Saunders** marketing homepage, derived from the Figma file (`Page-1/Homepage~K V 1`). One product, one surface — this is the brand's only known design.

## What's here

| File | What it is |
|---|---|
| `index.html`        | Mount point. Loads React + Babel and all JSX. |
| `App.jsx`           | Top-level page assembly + interaction toasts. |
| `Header.jsx`        | Top nav (About · Work With Me · Films · Consulting) + wordmark + Explore CTA. |
| `Hero.jsx`          | `WEILDING MAGIC` hero with credit-row, corner reticles, CTAs, stat row. |
| `StatRow.jsx`       | 4-up bronze stats (`20+ · 10m+ · 100+ · 3`) with vertical hairline. |
| `PressStrip.jsx`    | Looping marquee of network logos at 31% opacity. |
| `Director.jsx`      | "The Visionary Director" — portrait + multi-paragraph bio + Read CTA. |
| `FeatureVideo.jsx`  | "Disrupting Culture" — section head, video poster, testimonials, CTAs. |
| `Testimonials.jsx`  | 3-up bronze-quote pull-quotes. |
| `Archive.jsx`       | "Explore the Archive" — 4 stacked tiles (Film / Photography / Music / Literature). |
| `Footer.jsx`        | Minimal closing footer. |
| `Button.jsx`        | All button variants + the bronze PlayTriangle SVG. |
| `components.css`    | All component styles. Loads after `colors_and_type.css`. |

## How it's interactive

Light interactions — nav switches the active link (bronze-gradient text fill), all buttons fire a small bronze toast in the bottom-right ("Explore the work", "View the reel", "Play feature reel", etc.). Archive tiles open a toast naming the medium clicked. No real navigation; this is a hi-fi mock.

## Design width

1920px. The kit is laid out for cinema-display viewing. Below ~1400px, the wordmark and credit-row will wrap awkwardly — responsive rules are intentionally out of scope (no mobile design exists in the Figma).

## Faithfulness notes

- **Type substituted**: Gotham → Montserrat. See main `README.md` → FONTS for severity.
- **Bronze gradient** is reused everywhere as a single CSS variable (`--grad-bronze`).
- **Cosmic feature panel** uses the real `assets/cosmic-bg.png` extracted from the Figma, plus a layered radial + linear gradient to recreate the lens-flare halo. The Figma uses backdrop-blur 110px; we approximate with a vignette+radial stack for performance.
- The **press strip** uses the actual SVGs extracted from Figma (Netflix, ABC, iHeart, Drew Barrymore Show). These are third-party trademarks credited as "as featured on."
- The **archive** tiles invent the Photography / Music / Literature thumbnails since only the Film thumbnail exists in the source. They reuse the Burning Man still as placeholder — please supply real archive thumbnails to replace.
