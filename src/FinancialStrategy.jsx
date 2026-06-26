// FinancialStrategy.jsx — "The Treasure", scroll-scrubbed.
// The section pins (sticky) and locks the scroll. As you scroll, the chest
// video scrubs frame-by-frame in the center — drawn to a canvas with its black
// background keyed out so the chest floats transparently on the dark scene.
// When the chest finishes opening, it fades out and the strategy copy + CTAs
// rise in — all while still pinned.
const { useState: useFvState, useRef: useFvRef, useEffect: useFvEffect } = React;

const CHEST_VIDEO = "assets/finance-chest-v2.mp4";

function FinancialStrategy({ onApply, onCoaching }) {
  const rootRef = useFvRef(null);
  const canvasRef = useFvRef(null);
  const scrubRef = useFvRef(null);
  const revealRef = useFvRef(null);

  useFvEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current,
          scrub = scrubRef.current, reveal = revealRef.current;
    if (!root || !canvas) return;

    const CW = 864, CH = 496;            // canvas keying resolution (matches the video)
    canvas.width = CW; canvas.height = CH;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const video = document.createElement("video");
    video.src = CHEST_VIDEO;
    video.muted = true; video.playsInline = true; video.preload = "auto";
    let dur = 5, ready = false;

    // draw the current frame, keying out the near-black background → transparent
    const draw = () => {
      try {
        ctx.clearRect(0, 0, CW, CH);
        ctx.drawImage(video, 0, 0, CW, CH);
        const im = ctx.getImageData(0, 0, CW, CH);
        const d = im.data;
        for (let i = 0; i < d.length; i += 4) {
          const mx = Math.max(d[i], d[i + 1], d[i + 2]);
          if (mx <= 14) d[i + 3] = 0;                                  // pure black → transparent
          else if (mx < 46) d[i + 3] = Math.round(255 * (mx - 14) / 32); // feather the edge
        }
        ctx.putImageData(im, 0, 0);
      } catch (e) { /* frame not ready */ }
    };

    let target = 0, pending = false;
    const tick = () => {
      pending = false;
      if (ready && Math.abs(video.currentTime - target) > 0.012) {
        try { video.currentTime = target; } catch (e) {}
      }
    };
    video.addEventListener("seeked", draw);
    video.addEventListener("loadeddata", () => {
      dur = video.duration || 5; ready = true;
      try { video.currentTime = 0; } catch (e) {}
      apply();
    });

    const ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const SCRUB_END = 0.58, FADE_END = 0.72;

    const apply = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = root.offsetHeight - vh;
      const p = total > 0 ? Math.max(0, Math.min(1, -root.getBoundingClientRect().top / total)) : 0;

      target = Math.max(0, Math.min(1, p / SCRUB_END)) * dur;
      if (ready && !pending) { pending = true; requestAnimationFrame(tick); }

      const out = ss(SCRUB_END, FADE_END, p);
      if (scrub) scrub.style.opacity = String(1 - out);
      const rev = ss(SCRUB_END + 0.02, FADE_END + 0.05, p);
      if (reveal) {
        reveal.style.opacity = String(rev);
        reveal.style.transform = "translateY(" + ((1 - rev) * 28) + "px)";
        reveal.style.pointerEvents = rev > 0.92 ? "auto" : "none";
      }
    };

    const onScroll = () => apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    const fail = setTimeout(() => { if (!ready && reveal) { reveal.style.opacity = "1"; reveal.style.transform = "none"; reveal.style.pointerEvents = "auto"; if (scrub) scrub.style.opacity = "0"; } }, 4500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(fail);
      video.removeAttribute("src"); try { video.load(); } catch (e) {}
    };
  }, []);

  return (
    <section className="tk-finance finv" ref={rootRef}>
      <div className="finv-pin">
        <div className="fin2-atmos" aria-hidden="true">
          <div className="fin2-aura" />
          <div className="fin2-dust" />
          <div className="fin2-vignette" />
        </div>

        {/* ---- scrubbed chest ---- */}
        <div className="finv-scrub" ref={scrubRef}>
          <div className="finv-cap">
            <div className="fin2-eyebrow">Financial Strategy</div>
            <h2 className="vault-title">The Treasure</h2>
          </div>
          <canvas className="finv-canvas" ref={canvasRef} aria-label="A compass-marked treasure chest opening"></canvas>
        </div>

        {/* ---- reveal copy ---- */}
        <div className="finv-reveal" ref={revealRef}>
          <div className="fin2-inner">
            <header className="fin2-head">
              <h2 className="fin2-title">New money systems require a new mindset.</h2>
              <p className="fin2-sub">Stay ahead of the chain, mastering the future of finance.</p>
              <div className="fin2-body">
                <p>Ted Saunders has spent years navigating the decentralized financial landscape — studying market cycles, portfolio architecture, risk frameworks, and the psychology of wealth that most advisors won&rsquo;t touch.</p>
                <p>This isn&rsquo;t generic advice. It&rsquo;s a strategic conversation with someone who has lived the volatility, learned from it, and built a clear philosophy around it.</p>
              </div>
            </header>
            <div className="fin2-cta">
              <button className="fin2-btn fin2-btn--primary" onClick={onApply}>
                Apply for a Strategy Session
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <button className="fin2-btn fin2-btn--ghost" onClick={onCoaching}>
                Explore Men&rsquo;s Coaching
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.FinancialStrategy = FinancialStrategy;
