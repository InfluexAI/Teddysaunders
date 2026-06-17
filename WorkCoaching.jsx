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

function CoachDial() {
  const rings = [486, 430, 372, 300];
  return (
    <svg className="wk-compass__svg" viewBox="0 0 1000 1000" aria-hidden="true">
      <defs>
        <linearGradient id="wkBrass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9C7B38" /><stop offset="28%" stopColor="#F4D58E" />
          <stop offset="55%" stopColor="#A9863F" /><stop offset="80%" stopColor="#E8C98A" /><stop offset="100%" stopColor="#6E5226" />
        </linearGradient>
      </defs>
      <circle cx="500" cy="500" r="486" fill="none" stroke="url(#wkBrass)" strokeWidth="2" opacity="0.85" />
      <circle cx="500" cy="500" r="454" fill="none" stroke="#3A2C16" strokeWidth="24" opacity="0.5" />
      {rings.map((r, i) => (
        <circle key={r} cx="500" cy="500" r={r} fill="none" stroke="url(#wkBrass)" strokeWidth={i === 0 ? 2.2 : 1.1} opacity={0.32 + i * 0.07} />
      ))}
      <g opacity="0.5">
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 5) * Math.PI / 180, r1 = 372, r2 = i % 3 === 0 ? 352 : 362;
          return <line key={i} x1={500 + r1 * Math.sin(a)} y1={500 - r1 * Math.cos(a)} x2={500 + r2 * Math.sin(a)} y2={500 - r2 * Math.cos(a)} stroke="#D9B96B" strokeWidth="1" />;
        })}
      </g>
      {/* cardinal spokes */}
      {[0, 90, 180, 270].map((deg) => {
        const a = deg * Math.PI / 180;
        return <line key={deg} x1={500 + 150 * Math.sin(a)} y1={500 - 150 * Math.cos(a)} x2={500 + 430 * Math.sin(a)} y2={500 - 430 * Math.cos(a)} stroke="url(#wkBrass)" strokeWidth="2" opacity="0.5" />;
      })}
      {/* compass star */}
      <path d="M500 150 L520 480 L500 500 L480 480 Z" fill="#E8C98A" opacity="0.85" />
      <path d="M500 850 L520 520 L500 500 L480 520 Z" fill="#C9A24B" opacity="0.7" />
      <path d="M150 500 L480 480 L500 500 L480 520 Z" fill="#C9A24B" opacity="0.7" />
      <path d="M850 500 L520 480 L500 500 L520 520 Z" fill="#E8C98A" opacity="0.85" />
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
        <div className="wk-head wk-reveal">
          <p className="wk-eyebrow"><span className="wk-slash">/</span> Compass Coaching — Individuals</p>
          <h2 className="wk-head__title wk-textured">Mentorship for Modern Men</h2>
          <p className="wk-head__sub">Full Spectrum transformation for men building meaningful lives.</p>
          <div className="wk-body">
            <p>Ted works with filmmakers, creatives, founders, and visionaries navigating identity, creativity, alignment, storytelling, and transformation.</p>
            <p>The work blends philosophy, practical strategy, emotional clarity, and creative direction.</p>
          </div>
        </div>

        <div className="wk-coach__grid">
          {/* the compass */}
          <div className="wk-compass wk-reveal" role="group" aria-label="Coaching categories compass">
            <div className="wk-compass__glow" aria-hidden="true"></div>
            <div className="wk-compass__dial"><CoachDial /></div>
            <div className="wk-compass__bearings" aria-hidden="true">
              <span className="wk-bearing wk-bearing--n">N</span>
              <span className="wk-bearing wk-bearing--e">E</span>
              <span className="wk-bearing wk-bearing--s">S</span>
              <span className="wk-bearing wk-bearing--w">W</span>
            </div>
            {WK_QUADRANTS.map((q, i) => (
              <div key={q.key} className={"wk-node wk-node--" + q.pos + (i === active ? " is-active" : "")}
                   onClick={() => pick(i)} role="button" aria-label={q.cat + " — " + q.arch}>
                <div className="wk-node__inner">
                  <div className="wk-node__disc"><ArchetypeGlyph name={q.key} size={42} /></div>
                  <div className="wk-node__label">{q.cat}</div>
                  <div className="wk-node__arch">{q.arch}</div>
                </div>
              </div>
            ))}
            <div className="wk-compass__core">
              <div className="wk-compass__core-name">Highest<br />Path</div>
              <div className="wk-compass__core-rule"></div>
              <div className="wk-compass__core-sub">Full Spectrum</div>
            </div>
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
          <TestimonialSlider title="Testimonials · Personal Clients" items={WK_COACH_TESTIMONIALS} />
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
            <image-slot id="wk-path-map" shape="rect" placeholder="Map of one's path — relationships · finance · career · health"></image-slot>
          </div>
        </div>
      </div>
    </section>
  );
}

window.WorkCoaching = WorkCoaching;
