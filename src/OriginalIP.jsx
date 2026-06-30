// OriginalIP.jsx — "Original IP in Development": a private vault of four
// cinematic worlds. 2×2 grid of full-bleed concept-art frames, each overlaid
// with World number, title, logline, and an aged "fragment" annotation card.
// Cards carry a cursor-tracking gold spotlight glow-border on hover (ported
// from the shadcn "spotlight-card" to vanilla CSS custom props).
const { useRef: useIpRef, useEffect: useIpEffect } = React;

function OriginalIP({ onExplore, onContact }) {
  const gridRef = useIpRef(null);
  useIpEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--glow-x", e.clientX.toFixed(1));
      document.documentElement.style.setProperty("--glow-y", e.clientY.toFixed(1));
      document.documentElement.style.setProperty("--glow-xp", (e.clientX / window.innerWidth).toFixed(3));
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  const R = (window.__resources) || {};
  const worlds = [
    {
      id: "juiced", num: "World 01", title: "Juiced", img: R.ipJuiced || "assets/ip/juiced.jpg",
      genres: ["Drama", "Coming-of-Age", "True Story"],
      log: "Based on a true story: kidnapped, forced to sell fruit juice in the ghetto, and awoken to the realities of race, class, and culture.",
      fragLabel: "Field Journal",
      frag: "They took everything, but the hunger to be something more.",
    },
    {
      id: "prosopagnosia", num: "World 02", title: "Prosopagnosia", img: R.ipProsopagnosia || "assets/ip/prosopagnosia.jpg",
      genres: ["Thriller", "Sci-Fi", "Mystery"],
      log: "A man who loses the ability to recognize faces must find his kidnapped fiancée, aided only by an elixir that bends time.",
      fragLabel: "Temporal Elixir Notes",
      frag: "One drop unlocks the moments between moments.",
    },
    {
      id: "fated", num: "World 03", title: "The Fated", img: R.ipFated || "assets/ip/fated.jpg",
      genres: ["Fantasy", "Epic", "Action"],
      log: "A man who released a dark god to end a war must now lead rebels to save the world — and his wife — from the corrupt order he unknowingly served.",
      fragLabel: "Prophecy Fragment",
      frag: "When the god is set free, the order will kneel in ash.",
    },
    {
      id: "inevitable", num: "World 04", title: "Inevitable", img: R.ipInevitable || "assets/ip/inevitable.jpg",
      genres: ["Sci-Fi", "Cyberpunk", "Philosophical"],
      log: "The first human consciousness inside a cyborg body understands everything — except where we came from. So he ushers existence toward the singularity.",
      fragLabel: "Consciousness Architecture",
      frag: "Identity = pattern.  Pattern = data.  Data = eternal.",
      side: "Singularity Threshold Approaching",
    },
  ];

  return (
    <section className="tk-ip tk-ip--light">
      <div className="tk-section-head">
        <div className="eyebrow">Original IP in Development</div>
        <h2>The Worlds That<br />Haven&rsquo;t Been Made Yet</h2>
        <p className="blurb">
          Four original scripts. Each one a universe waiting to exist.
        </p>
      </div>

      <div className="ip-grid" ref={gridRef}>
        {worlds.map((w) => (
          <article className={"ip-world ip-world--" + w.id} key={w.id}>
            <img className="ip-world__img" src={w.img} alt={w.title} loading="lazy" />
            <div className="ip-world__scrim" aria-hidden="true" />
            <div className="ip-world__frame" aria-hidden="true" />

            <div className="ip-world__top">
              <div className="ip-world__num">{w.num}</div>
              <h3 className="ip-world__title">{w.title}</h3>
              <div className="ip-world__rule" />
              {w.genres && (
                <div className="ip-world__genres">
                  {w.genres.map((g) => (
                    <span className="ip-world__genre" key={g}>{g}</span>
                  ))}
                </div>
              )}
              <p className="ip-world__log">{w.log}</p>
            </div>

          </article>
        ))}
      </div>

      <div className="ip-cta">
        <button className="ip-cta__btn ip-cta__btn--solid" onClick={onExplore}>Explore the IP &nbsp;&rarr;</button>
        <button className="ip-cta__btn ip-cta__btn--ghost" onClick={onContact}>Contact Ted About a Project</button>
      </div>
    </section>
  );
}

window.OriginalIP = OriginalIP;
