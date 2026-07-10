// TypewriterMedium.jsx — cycles "FILM / PHOTOGRAPHY / MUSIC / STORY" with a
// "magic" dissolve: each word fades + blurs out on a golden glow and drifts
// up as it disperses, then the next word condenses back in from the blur.
// Rendered inline inside <div class="through"> so it inherits the bold styling.
function TypewriterMedium() {
  const words = ["Film", "Photography", "Music", "Story"];
  const HOLD_MS = 2200;   // time a word stays fully visible
  const FADE_MS = 700;    // dissolve out duration (must match CSS transition)

  const [idx, setIdx]   = React.useState(0);
  const [anim, setAnim] = React.useState("in"); // in | out

  React.useEffect(() => {
    let t;
    if (anim === "in") {
      t = setTimeout(() => setAnim("out"), HOLD_MS);
    } else {
      t = setTimeout(() => {
        setIdx((i) => (i + 1) % words.length);
        setAnim("in");
      }, FADE_MS);
    }
    return () => clearTimeout(t);
  }, [anim]);

  return (
    <span className="film">
      <span className={"film-text film-magic " + (anim === "in" ? "is-in" : "is-out")}>
        {words[idx]}
      </span>
    </span>
  );
}

window.TypewriterMedium = TypewriterMedium;
