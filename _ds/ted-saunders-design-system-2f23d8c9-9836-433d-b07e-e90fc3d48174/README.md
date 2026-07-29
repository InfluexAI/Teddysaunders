# Ted Saunders — Design System

A personal brand system for **Ted Saunders**, film director / photographer / philosopher. The work is cinematic, dark, premium, and warm — a stage where bronze gold flickers against deep espresso and slate. The brand wraps that work in a tone that feels half movie-poster, half artist's monograph.

> "WEILDING MAGIC THROUGH FILM" — the brand tagline, set in display serif Cinzel.

---

## Sources

- **Figma**: file `TedSaunders.fig`, mounted as a virtual filesystem during creation. Two top-level frames:
  - `/Page-1/Homepage-K-V-1` — the marketing homepage (1920 × 6906)
  - `/Page-1/Signature-Style---52` — the brand-guide spread documenting the color system
- No codebase was supplied. The marketing site is reconstructed from Figma JSX pseudocode + spot-check screenshots.

---

## Brand at a glance

| | |
|---|---|
| **Who**     | Ted Saunders — director, photographer, philosopher |
| **Promise** | Cinematic brand campaigns and original sci-fi worlds; "the beauty of humanity captured through its imperfection" |
| **Voice**   | Mythic, intimate, declarative. Half poet, half film-credit. |
| **Look**    | Deep blacks · espresso aura · polished-bronze gradient · Cinzel display serif |
| **Surfaces**| Marketing site (one-product brand) |

---

## CONTENT FUNDAMENTALS

**Tone** — Mythic and personal. Copy reads like a film's opening title card crossed with a memoir paragraph. Ted is **always third person** in marketing copy ("Ted was six when he asked…"); **first person** is reserved for testimonials and direct quotes ("I love it more than words can express").

**Casing** —
- **ALL-CAPS** for display moments: `WEILDING MAGIC`, `THROUGH FILM`, `THE BOY WHO BROUGHT THE WORLDS HE IMAGINED TO LIFE`. Used freely on the Cinzel display serif.
- **Sentence case** for body and testimonials.
- **Wide-tracked uppercase eyebrows** for role-tags and section labels: `D I R E C T O R · P H I L O S O P H E R · A R C H I T E C T   O F   W O R L D S`, `M Y   W O R K`, `T H E   V I S I O N A R Y   D I R E C T O R`, `F E A T U R E D   W O R K`.
- **Mixed case ALL-CAPS** appears on some hero words ("DirectoR " — trailing capital R) as a directorial credit-card flourish. Preserve it; don't auto-correct.

**You / I / we** — Ted is "Ted" or "he," never "I" in the marketing voice. The reader is implied, never addressed as "you" except inside CTA buttons.

**Emoji** — None. Anywhere. This is a serious art-house portfolio, not social copy.

**Numerals** — Featured statistics use giant Poppins ExtraLight numbers in bronze (`10m+`, `100+`, `3`, `20+`). The unit ("Years directing", "Collective video views") sits below in a small cream label. Dates use `MMM DD, YYYY` uppercase: `AUG 25, 2011`.

**Vocabulary** — favors: *magic, myth, story, world, lens, transformation, frame, fire, darkness, beauty, imperfection, soul, cinematic*. Avoids: corporate / SaaS language, "solutions," "platform," emoji.

**Specific examples**
- Hero copy: *"From cinematic brand campaigns to original sci-fi universes, Ted's work magic delivers work that is rich in story and alive with myth, at the intersection of technology, emotion and transformation."*
- Long-form bio: *"Ted was six when he asked an innocent question that would unknowingly shape his entire life and career: 'What does that button do, Daddy?' His father handed him the camera and he hasn't stopped using it since."*
- Section eyebrow: `THE VISIONARY DIRECTOR`
- CTA: `EXPLORE THE WORK` · `VIEW THE REEL` · `READ THE FULL STORY` · `VIEW FULL CASE STUDY` · `EXPLORE ALL FILMS`
- Testimonial pull-quote: *"Ten years later, I still come here when the world gets dark and my soul needs a hug." — @FeatherzMcG*

---

## VISUAL FOUNDATIONS

### Palette
A **bronze-on-black** scheme. The brand guide formalizes a 60 / 30 / 10 golden ratio:
- **Base (60%)** — Black `#000000`, Midnight Slate `#1D252D`, Stormy Blue `#415462`, Linen `#F5EDE3`. These hold the room.
- **Primary (30%)** — Soft Turquoise `#52AAA5`, Espresso `#5A3419`. Espresso does almost all the work; turquoise is rare.
- **Accent (10%)** — Orange `#D95F10`, Harvest Gold `#D89733`, Butter `#F6D36B`. These pop.

Plus a non-numbered but heavily-used **bronze sheen gradient** (`#BF8753 → #FAC288 → #C9915C → #FAC288 → #BF8753 → #D39B65 → #AB7442`) that lives on buttons, the play triangle, big stat numerals, the open-quote glyph, and warm dividers. It is the *signature* of the brand.

### Typography
- **Cinzel** — display serif. Classical Roman capitals; used for the wordmark moment (`WEILDING MAGIC`), section H1s (`DISRUPTING CULTURE BY IMPACTING MILLIONS`, `THE BOY WHO BROUGHT THE WORLDS HE IMAGINED TO LIFE`). Wide letter-spacing, line-height 0.92.
- **Montserrat** *(substitute for proprietary **Gotham** and **Mont**)* — geometric sans. Used for the nav, role-labels (`DIRECTOR · PHILOSOPHER`), button labels, eyebrows, and the brand-guide H1s. **⚠ Font substitution flagged — see "Fonts" section below.**
- **Poppins** — humanist sans. Used for body, testimonial pull-quotes, dates, and the giant ExtraLight stat numerals.

### Backgrounds
- **Full-bleed black** is the default canvas.
- **Espresso radial aura** (`#5A3419` rotated ellipses + linear gradients) bleeds through the hero, creating a warm halo from the corners. Think low-key lighting from a film set.
- **Cosmic / atmospheric textures** (a deep-space PNG with subtle clouds) sit under the "Disrupting culture" video panel, with conic-gradient gold-and-black wedges + heavy backdrop-blur layered on top to create a sun-flare-through-haze feel.
- **No flat brand-color blocks** in marketing surfaces. Backgrounds are always atmospheric / cinematic, never solid color, except inside the brand-guide document itself.
- **No repeating patterns. No hand-drawn illustrations. No emoji.** Imagery is photographic or filmic.

### Imagery vibe
Warm, low-key, slightly desaturated. Burning Man dust-bowl skies. A studio portrait against an off-white wall (the Ted portrait). Grain is acceptable; high-fidelity color-graded film stills preferred. Cool blues from a video poster contrast against the warm site chrome — that contrast IS the look.

### Animation
The Figma file is static. Implied motion from the brand language:
- **Slow fades** between hero photographs (reel-like).
- **Subtle parallax** on the cosmic background behind feature panels.
- **Bronze sheen shimmer** acceptable on the gradient on hover (a slow `background-position` slide).
- **No bounces, no springs, no playful micro-interactions.** Everything is *cinematic* — long easings, generous durations (600–900ms), `ease-in-out`.

### Hover / press states
- **Buttons**: bronze-filled buttons → on hover, the gradient subtly shifts darker (slide the gradient down ~15%); outline buttons → fill with `rgba(255,255,255,0.04)` and gain a hairline `#D19D63` border highlight.
- **Links / nav**: full opacity → 0.6 on hover. Bronze-tinted underline on active.
- **Press**: 0.97 scale on tap, 80 ms.
- No color flash, no shadow pump.

### Borders / hairlines
- **Warm gold hairlines (`#D19D63`, 1.5–3px)** bracket the brand wordmark and other key moments. Always horizontal or vertical — never diagonal, never decorative curls.
- **Corner "frame" brackets** — small white L-shapes (~60×60px, 2px stroke) sit at the four corners of the hero, like film-camera reticles. The Figma calls them `Union`.
- **Card borders** are nearly absent. Most cards rely on background contrast and the soft warm shadow.

### Shadows
- **Card shadow** — `0px 12px 40px rgba(0,0,0,0.05)` (soft, generous). Used on the brand-guide swatch cards.
- **Gold glow** — `0px 1px 30px rgba(240,170,64,0.16)` and `0px 4px 24px rgba(232,170,101,0.49)`. Used behind stat numerals and around the bronze quote bar.
- **No inner shadows.** No drop-shadow on text except a heavy `0px 4px 19px black` to lift Cinzel headlines off photographic backgrounds.
- Shadows are always **warm-tinted** (gold or pure black) — never cool / blue.

### Transparency & blur
- **Backdrop blur (110 px)** behind sun-flare panels — produces the hazy lens-bloom effect over the cosmic background.
- **Reduced-opacity logo strip** (`opacity: 0.31`) for the press / network logos — they whisper, they don't shout.
- **40–50% black overlays** on full-bleed imagery to keep type legible.

### Corner radii
Subtle. The brand prefers near-square corners.
- `3px` — color swatches in the brand guide.
- `19px` — archive cards.
- `24px` — the hero video frame.
- `50%` — the headshot circle.
Pill / fully-rounded buttons are **not used**.

### Cards
- **Archive row card** — `#000` fill, 19px radius, thumbnail-left + title-right layout, `0px 1px 30px rgba(240,170,64,0.16)` gold glow shadow.
- **Brand-guide swatch card** — white fill, 3px radius, 0.7px `rgba(221,221,221,0.5)` border, soft drop shadow. Inner colored block + label + hex.
- **Video poster frame** — 24px radius, black fill, full-bleed thumbnail with a centered black-circle + bronze-triangle play button.

### Layout rules
- **1920px design width.** Hero is full-bleed; content max-width sits around 1408px with generous 200–300px lateral whitespace.
- **Fixed elements** — none. The hero header sits in normal flow; there is no sticky nav in the Figma source.
- **Asymmetric flourish** — the role labels around the wordmark (`DIRECTOR ｜ PHILOSOPHER ｜ ARCHITECT OF WORLDS`) sit at three different vertical positions to feel like film-credit titling, not a balanced row.

---

## ICONOGRAPHY

The brand uses **almost no icons.** The visual vocabulary is photographic, typographic, and gradient — not iconographic.

What exists in the Figma:
- **A single open-quote glyph** (`"`), filled with the bronze gradient, used as a section-marker above testimonial pull-quotes. Stored at `assets/icons/quote.svg`.
- **A play triangle** — a bronze-gradient-filled triangle (`fill = var(--grad-bronze)`) sitting inside a black circle on the video poster. Rendered as a `polygon` SVG, not a separate file.
- **A press / network logo strip** — Netflix, ABC, iHeart, The Drew Barrymore Show, NYT, GMA, Business Insider — at 31% opacity. Copies stored in `assets/press/`. These are *brand logos, not icons*; treat them as recognized third-party trademarks used for credit. Use only where Ted's work has actually appeared.

**No icon font is used.** No Lucide / Heroicons / Material reference. No emoji.

**If you need a UI icon** that isn't in the asset folder (e.g. menu, close, arrow), use **Lucide** at the lightest stroke weight (`stroke-width: 1.25`) in `--c-cream` or `--c-bronze-2`. Keep them tiny (16–20 px) and rare. **⚠ Substitution flagged.**

**Logos**
- The primary logo is a gold **TS monogram** paired with the **TED SAUNDERS** wordmark, set in a classical serif. Stored at `assets/logo.png` (transparent PNG, 2583×616, ~4.2:1 aspect). Works on both light (Linen) and dark (Midnight Slate) backgrounds without re-color.
- The monogram alone (the left third of the lockup) can be used as an app icon / favicon / standalone mark — please ask if you need it isolated as a separate asset.

---

## FONTS — substitution notice

> ⚠ **The Figma file lists three proprietary or licensed font families that we don't ship.** Free Google-Fonts substitutes are wired in `colors_and_type.css`. **Please send the licensed font files** (woff2/ttf) and we'll swap them in.

| In Figma | Used for | Substituted with | Severity |
|---|---|---|---|
| **Cinzel** | Display headlines (`WEILDING MAGIC`, section H1s) | **Cinzel** (local — `fonts/Cinzel-*.ttf`, regular through black weights) | ✅ none |
| **Gotham** (Bold / Book / Ultra) | Nav, buttons, role-eyebrows, big "Through film" word | **Montserrat** | ⚠ flagged — similar geometric sans, but tracking / x-height differ |
| **Mont** (Bold / SemiBold / Book / Light) | Brand-guide spread itself (`BRAND COLOR PALETTE`, swatch labels) | **Montserrat** | ⚠ flagged — Mont is very close to Montserrat; substitution is safe-ish |
| **Poppins** | Body, testimonials, stat numerals | **Poppins** (Google Fonts — already free) | ✅ none |

---

## Index — what's in this folder

```
README.md                 ← you are here
SKILL.md                  ← Agent SKill manifest (cross-compatible w/ Claude Code)
colors_and_type.css       ← all CSS variables + semantic type classes

assets/
  logo.png                ← the primary gold TS monogram + wordmark lockup
  ted-portrait.png        ← the studio portrait of Ted
  burning-man-poster.jpg  ← "Oh, the Places You'll Go!" film poster still
  cosmic-bg.png           ← cosmic / atmospheric background for feature panels
  film-still.jpg          ← case-study background still
  icons/quote.svg         ← the bronze open-quote glyph
  press/                  ← network / press logos (Netflix, ABC, iHeart, Drew Show)

preview/                  ← Design-System tab cards (palettes, type, components)

ui_kits/
  website/                ← interactive recreation of the marketing site
    README.md
    index.html            ← the full homepage, click-through
    Header.jsx            ← top nav + wordmark
    Hero.jsx              ← WEILDING MAGIC hero with corner brackets
    StatRow.jsx           ← 10m+ / 100+ / 3 stat strip
    PressStrip.jsx        ← reduced-opacity media logo bar
    Director.jsx          ← portrait + long-bio panel
    FeatureVideo.jsx      ← Burning Man video poster + CTAs
    Testimonials.jsx      ← three-up bronze-quote testimonials
    Archive.jsx           ← "Explore the Archive" film list
    Button.jsx            ← bronze-filled + outline button variants
    components.css        ← all kit styles
```

---

## Caveats / what's NOT included

- **No mobile breakpoint** — the Figma is 1920-only. Responsive rules are a guess.
- **Only the homepage** exists in the Figma. Films / About / Consulting / Work-With-Me pages are referenced in the nav but not designed.
- **Font substitutions flagged above.**
