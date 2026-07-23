// WorkCoaching.jsx — /Compass Coaching · Individuals.
// A 4-quadrant archetype compass (Career·King / Relationships·Lover /
// Finance·Magician / Health·Warrior) auto-cycles until the visitor picks a
// quadrant; an editorial panel cross-fades to the active category. Followed by
// a testimonial slider, the "Walk your Highest Path" block, and the apply CTA.
const { useState: useCoState, useRef: useCoRef, useEffect: useCoEffect } = React;

// Bearings: King=N, Lover=E, Magician=S, Warrior=W (the brief's duplicate
// "east" on the Warrior is placed at West so the four points stay distinct).
const WK_QUADRANTS = [
  { key: "king",     pos: "n", bearing: "North", cat: "Career",        arch: "The King",
    desc: "Purpose, positioning, storytelling, and creative alignment." },
  { key: "lover",    pos: "e", bearing: "East",  cat: "Relationships", arch: "The Lover",
    desc: "Polarity, communication, emotional intelligence, and connection." },
  { key: "magician", pos: "s", bearing: "South", cat: "Finance",       arch: "The Magician",
    desc: "Investing, crypto education, wealth psychology, and financial architecture." },
  { key: "warrior",  pos: "w", bearing: "West",  cat: "Health",        arch: "The Warrior",
    desc: "Energy, movement, vitality, and optimization." },
];

const WK_COACH_TESTIMONIALS = [
  { body: "Ted helped me see the story I was actually living — and gave me the courage to rewrite it.", by: "Personal Coaching Client" },
  { body: "Every quadrant of my life moved at once. Career, relationships, money, body — finally aligned.", by: "Personal Coaching Client" },
  { body: "Half philosopher, half strategist. I left every session clearer than I have ever been.", by: "Personal Coaching Client" },
];

// Map node positions, in panel-percent (x across, y down). Career N, Relationships W,
// Health E, Finance S — matching the treasure-map reference.
const WK_MAP_POS = {
  king:     { x: 50, y: 17 },  // Career — top
  lover:    { x: 17, y: 49 },  // Relationships — left
  warrior:  { x: 83, y: 49 },  // Health — right
  magician: { x: 50, y: 83 },  // Finance — bottom
};
// SVG uses viewBox 0 0 100 75 (4:3); convert panel-percent y → svg y.
function wkSvgPath(p) {
  const cx = 50, cy = 37.5, x = p.x, y = p.y * 0.75;
  const mx = (cx + x) / 2, my = (cy + y) / 2;
  const dx = x - cx, dy = y - cy, len = Math.hypot(dx, dy) || 1;
  const off = 5, ox = -dy / len * off, oy = dx / len * off;     // perpendicular bow → winding trail
  return `M ${cx} ${cy} Q ${mx + ox} ${my + oy} ${x} ${y}`;
}

// A small brass compass rose for the center of the map.
function MapCompassRose() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="wkRoseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBE6B8" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#C9A24B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#wkRoseGlow)" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#E8C98A" strokeWidth="1.4" opacity="0.85" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#C9A24B" strokeWidth="0.7" opacity="0.6" />
      {/* 8-point star */}
      <path d="M50 8 L56 44 L50 50 L44 44 Z" fill="#F4D58E" />
      <path d="M50 92 L56 56 L50 50 L44 56 Z" fill="#C9A24B" />
      <path d="M8 50 L44 44 L50 50 L44 56 Z" fill="#C9A24B" />
      <path d="M92 50 L56 44 L50 50 L56 56 Z" fill="#F4D58E" />
      <path d="M22 22 L47 47 L50 50 L46 46 Z" fill="#D9B96B" opacity="0.8" />
      <path d="M78 78 L53 53 L50 50 L54 54 Z" fill="#D9B96B" opacity="0.8" />
      <path d="M78 22 L53 47 L50 50 L54 46 Z" fill="#D9B96B" opacity="0.8" />
      <path d="M22 78 L47 53 L50 50 L46 54 Z" fill="#D9B96B" opacity="0.8" />
      <circle cx="50" cy="50" r="5.5" fill="#FBE6B8" />
    </svg>
  );
}

function WorkCoaching({ onApply, onActivate }) {
  const [active, setActive] = useCoState(0);
  const N = WK_QUADRANTS.length;
  const timer = useCoRef(null);
  const lockRef = useCoRef(false);

  useCoEffect(() => {
    timer.current = setInterval(() => {
      if (lockRef.current) return;
      setActive((c) => (c + 1) % N);
    }, 4200);
    return () => timer.current && clearInterval(timer.current);
  }, []);

  const pick = (i) => {
    lockRef.current = true;
    setActive(i);
    onActivate && onActivate(WK_QUADRANTS[i]);
  };

  return (
    <section className="wk-sec wk-sec--dark" id="wk-coaching">
      <div className="wk-dust" aria-hidden="true"></div>
      <div className="wk-inner">
        <WkIntro
          num="01"
          eyebrow="Compass Coaching — For Individuals"
          title="Mentorship for Modern Men"
          titleClass="wk-textured"
          sub="Full Spectrum transformation for men building meaningful lives."
          imgSrc="assets/work-mentorship.jpg"
          imgId="wk-intro-coaching"
          imgPlaceholder="Ted in mentorship / coaching session"
          body={<React.Fragment>
            <p>Ted works with creatives, founders, and visionaries navigating identity, creativity, alignment, storytelling, and transformation.</p>
            <p>The work blends philosophy, practical strategy, emotional clarity, and creative direction.</p>
          </React.Fragment>}
        />

        <div className="wk-balance wk-reveal">
          <h2 className="wk-balance__title wk-textured">Your life. In Balance.</h2>
          <p className="wk-balance__sub">For the ship of your life to sail smoothly, all four major aspects of it must be functioning optimally.</p>
        </div>

        <div className="wk-coach__grid">
          {/* the treasure map */}
          <div className="wk-mapc wk-reveal" role="group" aria-label="Coaching categories map">
            <div className="wk-mapc__img" aria-hidden="true"></div>
            <div className="wk-mapc__vignette" aria-hidden="true"></div>
            <svg className="wk-mapc__paths" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden="true">
              {WK_QUADRANTS.map((q, i) => {
                const d = wkSvgPath(WK_MAP_POS[q.key]);
                return (
                  <g key={q.key} className={"wk-trail" + (i === active ? " is-active" : "")}>
                    <path className="wk-trail__base" d={d} vectorEffect="non-scaling-stroke" />
                    <path className="wk-trail__flow" d={d} vectorEffect="non-scaling-stroke" />
                  </g>
                );
              })}
            </svg>

            <div className="wk-mapc__center" aria-hidden="true"><MapCompassRose /></div>

            {WK_QUADRANTS.map((q, i) => {
              const p = WK_MAP_POS[q.key];
              return (
                <button key={q.key} type="button"
                  className={"wk-mnode wk-mnode--" + q.key + (i === active ? " is-active" : "")}
                  style={{ left: p.x + "%", top: p.y + "%" }}
                  onClick={() => pick(i)} aria-label={q.cat + " — " + q.arch}>
                  <span className="wk-mnode__disc"><ArchetypeGlyph name={q.key} size={42} /></span>
                  <span className="wk-mnode__label">{q.cat}</span>
                  <span className="wk-mnode__arch">{q.arch}</span>
                </button>
              );
            })}
          </div>

          {/* editorial panel */}
          <div className="wk-quad wk-reveal">
            {WK_QUADRANTS.map((q, i) => (
              <div className={"wk-quad__slide" + (i === active ? " is-on" : "")} key={q.key}>
                <div className="wk-quad__meta">
                  <span className="wk-quad__badge"><ArchetypeGlyph name={q.key} size={26} /></span>
                  <span className="wk-quad__bearing">{q.arch} · {q.bearing}</span>
                </div>
                <h3 className="wk-quad__cat wk-textured">{q.cat}</h3>
                <p className="wk-quad__arch">{q.arch}</p>
                <p className="wk-quad__desc">{q.desc}</p>
              </div>
            ))}
            <div className="wk-quad__dots">
              {WK_QUADRANTS.map((q, i) => (
                <i key={q.key} className={i === active ? "on" : ""} onClick={() => pick(i)} role="button" aria-label={q.cat} />
              ))}
            </div>
          </div>
        </div>

        {/* testimonials */}
        <div className="wk-reveal">
          <TestimonialSlider items={WK_COACH_TESTIMONIALS} />
        </div>

        {/* walk your highest path */}
        <div className="wk-path-row">
          <div className="wk-path-row__copy wk-reveal">
            <p className="wk-eyebrow">The Blueprint</p>
            <h3 className="wk-textured">Walk your Highest Path</h3>
            <p>Work with Ted to design and execute the blueprint for your future. One that ensures that all four quadrants of your life are optimized.</p>
            <div className="wk-cta-row">
              <button className="wk-btn wk-btn--solid" onClick={onApply}>
                Apply for 1-on-1 Coaching
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
          <div className="wk-map wk-reveal">
            <span className="wk-map__corner tl" aria-hidden="true"></span>
            <span className="wk-map__corner br" aria-hidden="true"></span>
            <img src="assets/pathways/individuals.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

window.WorkCoaching = WorkCoaching;
