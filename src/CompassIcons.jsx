// CompassIcons.jsx — engraved brass line-icons for the Compass of Creations.
// Each is a thin-stroke glyph that reads as an engraving on a brass medallion.
// stroke uses currentColor so the brass gradient/illumination drives the color.
function CompassIcon({ name, size = 40 }) {
  const common = {
    width: size, height: size, viewBox: "0 0 48 48", fill: "none",
    stroke: "currentColor", strokeWidth: 1.4,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  const glyphs = {
    // TEDPLOTS — film / aperture
    plots: (
      <g>
        <circle cx="24" cy="24" r="13" />
        <path d="M24 11 L29 21 H19 Z M37 24 L27 29 V19 Z M24 37 L19 27 H29 Z M11 24 L21 19 V29 Z" opacity="0.9" />
        <circle cx="24" cy="24" r="3.4" />
      </g>
    ),
    // TEDSHOTS — camera lens
    shots: (
      <g>
        <circle cx="24" cy="24" r="13" />
        <circle cx="24" cy="24" r="8.5" />
        <circle cx="24" cy="24" r="4" />
        <path d="M24 11 V15 M24 33 V37 M11 24 H15 M33 24 H37" />
        <circle cx="20" cy="20" r="1.2" fill="currentColor" stroke="none" />
      </g>
    ),
    // TEDDROPS — sound wave / tuning fork
    drops: (
      <g>
        <path d="M8 24 H12 M40 24 H36" />
        <path d="M14 24 V24 M14 18 V30 M19 12 V36 M24 7 V41 M29 13 V35 M34 19 V29 M38 22 V26" />
      </g>
    ),
    // TEDBOTS — mechanical eye
    bots: (
      <g>
        <path d="M10 24 C16 15 32 15 38 24 C32 33 16 33 10 24 Z" />
        <circle cx="24" cy="24" r="5.5" />
        <path d="M24 18.5 V14 M24 29.5 V34 M18.5 24 H14 M29.5 24 H34" />
        <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
      </g>
    ),
    // TEDUNLOCKS — key
    unlocks: (
      <g>
        <circle cx="18" cy="18" r="7" />
        <path d="M22.9 22.9 L37 37 M33 33 L36 30 M30 30 L33 27" />
        <circle cx="18" cy="18" r="2.4" />
      </g>
    ),
    // TEDCROPS — fashion crest / textile diamond
    crops: (
      <g>
        <path d="M24 7 L38 24 L24 41 L10 24 Z" />
        <path d="M24 15 L31 24 L24 33 L17 24 Z" />
        <path d="M24 7 V41 M10 24 H38" opacity="0.7" />
      </g>
    ),
    // TEDTHOUGHTS — labyrinth
    thoughts: (
      <g>
        <circle cx="24" cy="24" r="13" />
        <path d="M24 24 m0 -4 a4 4 0 1 1 -0.01 0 M24 14 a10 10 0 1 0 0.01 0 M30 24 a6 6 0 1 1 -6 -6" />
      </g>
    ),
    // TEDPROPS — theatre mask
    props: (
      <g>
        <path d="M13 12 C13 12 35 12 35 12 C35 24 31 38 24 38 C17 38 13 24 13 12 Z" />
        <path d="M18 21 C19.5 19.5 22 19.5 23.5 21 M24.5 21 C26 19.5 28.5 19.5 30 21" />
        <path d="M19 29 C21 32 27 32 29 29" />
      </g>
    ),
  };
  return <svg {...common}>{glyphs[name] || null}</svg>;
}

window.CompassIcon = CompassIcon;
