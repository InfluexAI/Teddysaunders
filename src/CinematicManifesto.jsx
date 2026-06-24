// CinematicManifesto.jsx — pinned scroll-scrub cinematic, adapted from the
// GSAP "CinematicHero". Rendered OUTSIDE the scaled stage so a real sticky
// pin works. As you scroll the pinned stage, the timeline scrubs:
//   1) "Imperfection is the story." title holds, then recedes (blur/scale).
//   2) A premium espresso-bronze card rises from below and scales up.
//   3) The card's photo of Ted + the rest of the copy reveal.
const { useRef: useCmRef, useEffect: useCmEffect } = React;

function CinematicManifesto({ onCta }) {
  const rootRef = useCmRef(null);
  const introRef = useCmRef(null);
  const cueRef = useCmRef(null);
  const cardRef = useCmRef(null);
  const copyRef = useCmRef(null);
  const photoRef = useCmRef(null);

  useCmEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ss = (a, b, x) => { let t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

    const apply = (p) => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const intro = introRef.current, cue = cueRef.current, card = cardRef.current,
            copy = copyRef.current, photo = photoRef.current;
      if (!intro || !card) return;

      // 1) Title recedes
      const tf = ss(0.05, 0.22, p);
      intro.style.opacity = String(1 - tf);
      intro.style.transform = `translateY(${-tf * 80}px) scale(${1 + tf * 0.16})`;
      intro.style.filter = `blur(${tf * 18}px)`;
      if (cue) cue.style.opacity = String(Math.max(0, 1 - ss(0.02, 0.12, p)));

      // 2) Card rises + grows
      const rise = ss(0.12, 0.46, p);
      const grow = ss(0.34, 0.66, p);
      const ty = (1 - rise) * vh * 0.82;
      const sc = 0.84 + grow * 0.16;
      card.style.opacity = String(Math.min(1, rise * 1.5));
      card.style.transform = `translate(-50%, -50%) translateY(${ty}px) scale(${sc})`;

      // 3) Content reveal — copy & photo "develop" in (blur → sharp), as if
      //    being inked onto the parchment rather than a card sliding in.
      const rev = ss(0.5, 0.76, p);
      if (copy) {
        copy.style.opacity = String(rev);
        copy.style.transform = `translateY(${(1 - rev) * 30}px)`;
        copy.style.filter = `blur(${(1 - rev) * 5}px)`;
      }
      if (photo) {
        photo.style.opacity = String(ss(0.28, 0.60, p));
      }
    };

    const onScroll = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = root.offsetHeight - vh;
      const p = total > 0 ? -root.getBoundingClientRect().top / total : 0;
      apply(Math.max(0, Math.min(1, p)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mouse sheen on the card
  useCmEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", (e.clientX - r.left) + "px");
      card.style.setProperty("--mouse-y", (e.clientY - r.top) + "px");
    };
    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="tk-cine" ref={rootRef}>
      <div className="cine-pin">
        <div className="cine-photo" aria-hidden="true" />
        <div className="cine-photoveil" aria-hidden="true" />
        <div className="cine-grain" aria-hidden="true" />
        <div className="cine-grid" aria-hidden="true" />

        <div className="cine-intro" ref={introRef} style={{ letterSpacing: "0.5px" }}>
          <h2 className="cine-line cine-line--1">Imperfection</h2>
          <h2 className="cine-line cine-line--2">is the story.</h2>
        </div>
        <div className="cine-scrollcue" ref={cueRef} aria-hidden="true">
          <span>SCROLL</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </div>

        <div className="cine-card" ref={cardRef}>
          <div className="card-sheen" aria-hidden="true" />
          <div className="cine-card__photo">
            <img ref={photoRef} src={(window.__resources && window.__resources.tedCinematic) || "assets/opt/ted-cinematic.png"} alt="Ted Saunders" />
            <div className="cine-card__photo-veil" />
          </div>
          <div className="cine-card__copy" ref={copyRef}>
            <div className="cine-eyebrow">The Manifesto</div>
            <h3 className="cine-card__head">Producing it perfectly is the art.</h3>
            <p>Every story is an invitation to feel something deeper. To open your aperture, remember who you were before the world told you who to be. To celebrate the truth, the shadows, and the beauty of what it means to be human.</p>
            <p>I tell stories for the people who are brave enough to see the world differently.</p>
            <div className="cine-card__cta">
              <Button variant="bronze" onClick={onCta}>WORK WITH TED &nbsp;→</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CinematicManifesto = CinematicManifesto;
