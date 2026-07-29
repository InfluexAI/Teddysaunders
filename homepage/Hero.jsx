// Hero.jsx — full-bleed video hero, exact recreation of
// "Header v2 — Futurism.png" reference.
function Hero({ active, onNav, onCta, onPrimary, onSecondary }) {
  return (
    <section className="tk-hero">
      {/* Full-bleed background video */}
      <video
        className="tk-hero__video"
        src={(window.__resources && window.__resources.heroVideo) || "assets/hero-bg.mp4"}
        autoPlay loop muted playsInline
      />
      <div className="tk-hero__vignette" />
      <div className="tk-hero__veil" />

      <div className="tk-hero__content">
        <Header active={active} onNav={onNav} onCta={onCta} />

        {/* Corner reticles */}
        <div className="tk-hero__reticles">
          <span className="r tl" />
          <span className="r tr" />
          <span className="r bl" />
          <span className="r br" />
        </div>

        {/* Center stack */}
        <div className="tk-hero__center">
          <div className="credits">
            <span className="c-director">Director</span>
            <span className="dot" />
            <span className="c-phil">Philosopher</span>
            <span className="dot" />
            <span className="c-architect">Architect of Worlds</span>
          </div>

          <h1 className="wordmark">Weilding&nbsp;Magic</h1>

          <div className="through">
            Through<TypewriterMedium />
          </div>

          <p className="subhead">
            From cinematic brand campaigns to original sci-fi universes, Ted&rsquo;s work
            delivers stories that are rich in myth and alive with humanity — at the
            intersection of technology, emotion, and transformation.
          </p>

          <div className="actions">
            <Button variant="bronze"        onClick={onPrimary}  >EXPLORE THE WORK</Button>
            <Button variant="gold-outline"  onClick={onSecondary}>VIEW THE REEL</Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="tk-hero__stats">
          <Stat num="20+"  lbl="Years directing" />
          <Stat num="10m+" lbl="Collective video views" />
          <Stat num="100+" lbl="Clients serviced" />
          <Stat num="3"    lbl="Client acquisitions" />
        </div>

        {/* Tedivider — gold hairlines with the monogram disc centered */}
        <div className="tk-hero__divider">
          <div className="rule" />
          <div className="disc">
            <img src={(window.__resources && window.__resources.logo) || "assets/logo.png"} alt="" />
          </div>
          <div className="rule" />
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
