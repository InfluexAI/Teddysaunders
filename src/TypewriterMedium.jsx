// TypewriterMedium.jsx — cycles "FILM / PHOTOGRAPHY / MUSIC / STORY"
// with a type-in, hold, type-out animation every ~4 seconds.
// Rendered inline inside <div class="through"> so it inherits the
// black bold "FILM" styling.
function TypewriterMedium() {
  const words = ["Film", "Photography", "Music", "Story"];
  const TYPE_MS  = 90;    // per character on type-in
  const ERASE_MS = 50;    // per character on type-out
  const HOLD_MS  = 2400;  // pause once fully typed

  const [wordIdx, setWordIdx]   = React.useState(0);
  const [charCount, setCharCnt] = React.useState(0);
  const [phase, setPhase]       = React.useState("type"); // type | hold | erase

  React.useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (phase === "type") {
      if (charCount < current.length) {
        t = setTimeout(() => setCharCnt((c) => c + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("erase"), HOLD_MS);
      }
    } else if (phase === "erase") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCnt((c) => c - 1), ERASE_MS);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [phase, charCount, wordIdx]);

  const visible = words[wordIdx].slice(0, charCount);

  return (
    <span className="film">
      <span className="film-text">{visible || "\u00A0"}</span>
      <span className="film-caret" aria-hidden="true" />
    </span>
  );
}

window.TypewriterMedium = TypewriterMedium;
