/* @ds-bundle: {"format":3,"namespace":"TedSaundersDesignSystem_2f23d8","components":[],"sourceHashes":{"src/App.jsx":"1fd49bb6ba41","src/Button.jsx":"925098a9b653","src/CinematicManifesto.jsx":"35a58c0eecff","src/CompassIcons.jsx":"fa7a16246eca","src/CompassOrrery.jsx":"4e39da555a5f","src/Director.jsx":"684b9b735c6c","src/FeatureScroll.jsx":"5d54db6903dd","src/FilmStrip.jsx":"df0a43137240","src/FinancialStrategy.jsx":"037c5169a8e8","src/FocusRail.jsx":"56bdb39f5631","src/Footer.jsx":"bd100843c40a","src/Header.jsx":"64f0c5b9e0c3","src/Hero.jsx":"65d9fb6895ce","src/InsightsCTA.jsx":"8f541a04b3ea","src/OriginalIP.jsx":"1be76e15e723","src/Pathways.jsx":"ffb3e3a0890e","src/Portfolio.jsx":"56480bd25457","src/PressStrip.jsx":"1986fb5bd963","src/Sparkles.jsx":"06fda94428ca","src/StatRow.jsx":"36926ee65c01","src/Testimonials.jsx":"87df8958cda5","src/TypewriterMedium.jsx":"ed1580e56abf","src/image-slot.js":"9309434cb09c","ui_kits/website/App.jsx":"562d400826bd","ui_kits/website/Archive.jsx":"3de210c831b3","ui_kits/website/Button.jsx":"925098a9b653","ui_kits/website/Director.jsx":"684b9b735c6c","ui_kits/website/FeatureVideo.jsx":"9c2b81a01399","ui_kits/website/Footer.jsx":"cc869b261ac9","ui_kits/website/Header.jsx":"64f0c5b9e0c3","ui_kits/website/Hero.jsx":"8f32f0db62fa","ui_kits/website/PressStrip.jsx":"6c7c10a691ac","ui_kits/website/StatRow.jsx":"36926ee65c01","ui_kits/website/Testimonials.jsx":"87df8958cda5","ui_kits/website/TypewriterMedium.jsx":"ed1580e56abf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TedSaundersDesignSystem_2f23d8 = window.TedSaundersDesignSystem_2f23d8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// src/App.jsx
try { (() => {
// App.jsx — assembles the marketing site.
const {
  useState,
  useCallback
} = React;
function ToastShelf({
  events,
  onDismiss
}) {
  if (!events.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: 24,
      bottom: 24,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, events.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    onClick: () => onDismiss(e.id),
    style: {
      background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)",
      color: "#000",
      padding: "12px 18px",
      borderRadius: 4,
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
      cursor: "pointer",
      maxWidth: 360
    }
  }, e.text)));
}

// Scaler hook — applies transform: scale to a 1920-design stage and
// sets the wrapper's height to (natural height × scale) so the rest
// of the page lays out correctly underneath.
function useStageScale(designWidth = 1920) {
  const wrapRef = React.useRef(null);
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    const MOBILE_BP = 768;
    const apply = () => {
      const stage = stageRef.current;
      const wrap = wrapRef.current;
      if (!stage || !wrap) return;
      const vw = window.innerWidth;
      if (vw < MOBILE_BP) {
        // Mobile: true responsive layout, no scaling.
        stage.classList.add("is-mobile");
        stage.style.transform = "none";
        stage.style.width = "100%";
        wrap.style.height = "auto";
      } else {
        // Tablet / desktop: pixel-perfect 1920 stage scaled to viewport.
        stage.classList.remove("is-mobile");
        const scale = vw / designWidth;
        stage.style.width = designWidth + "px";
        stage.style.transform = `scale(${scale})`;
        const naturalH = stage.scrollHeight;
        wrap.style.height = naturalH * scale + "px";
      }
    };
    apply();
    window.addEventListener("resize", apply);
    const ro = new ResizeObserver(apply);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => {
      window.removeEventListener("resize", apply);
      ro.disconnect();
    };
  }, [designWidth]);
  return {
    wrapRef,
    stageRef
  };
}
function App() {
  const [active, setActive] = useState("Films");
  const [events, setEvents] = useState([]);
  const {
    wrapRef,
    stageRef
  } = useStageScale(1920);
  const {
    wrapRef: wrap2Ref,
    stageRef: stage2Ref
  } = useStageScale(1920);
  const {
    wrapRef: wrap3Ref,
    stageRef: stage3Ref
  } = useStageScale(1920);
  const fire = useCallback(text => {
    const id = Date.now() + Math.random();
    setEvents(cur => [...cur, {
      id,
      text
    }]);
    setTimeout(() => setEvents(cur => cur.filter(x => x.id !== id)), 2600);
  }, []);
  const dismiss = id => setEvents(cur => cur.filter(x => x.id !== id));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tk-scaler",
    ref: wrapRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-stage",
    ref: stageRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement(Hero, {
    active: active,
    onNav: label => {
      setActive(label);
      fire(`Nav → ${label}`);
    },
    onCta: () => fire("Explore the work"),
    onPrimary: () => fire("Explore the work"),
    onSecondary: () => fire("View the reel")
  }), /*#__PURE__*/React.createElement(CosmicPanel, null, /*#__PURE__*/React.createElement(Director, {
    onReadMore: () => fire("Open full story")
  }))))), /*#__PURE__*/React.createElement(FeatureScroll, {
    onPlay: () => fire("Play feature reel"),
    onCase: () => fire("View full case study"),
    onAll: () => fire("Explore all films")
  }), /*#__PURE__*/React.createElement(Portfolio, {
    onExplore: () => fire("Explore the Portfolio")
  }), /*#__PURE__*/React.createElement(FilmStrip, null), /*#__PURE__*/React.createElement(CinematicManifesto, {
    onCta: () => fire("Work with Ted")
  }), /*#__PURE__*/React.createElement(CompassOrrery, {
    onActivate: n => fire(`Compass → ${n.name}`)
  }), /*#__PURE__*/React.createElement(Pathways, {
    onPath: p => fire(`Pathway → ${p.label}`),
    onConverge: () => fire("Start a conversation")
  }), /*#__PURE__*/React.createElement(OriginalIP, {
    onExplore: () => fire("Explore the IP"),
    onContact: () => fire("Contact about a project")
  }), /*#__PURE__*/React.createElement(FinancialStrategy, {
    onApply: () => fire("Apply for a Strategy Session"),
    onCoaching: () => fire("Explore Men's Coaching")
  }), /*#__PURE__*/React.createElement(InsightsCTA, {
    onSubscribe: d => fire(`Subscribe: ${d.email || ""}`),
    onConsult: () => fire("Book a consultation")
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-scaler",
    ref: wrap2Ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-stage",
    ref: stage2Ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement(Footer, {
    onSubscribe: email => fire(`Newsletter: ${email || ""}`)
  })))), /*#__PURE__*/React.createElement(ToastShelf, {
    events: events,
    onDismiss: dismiss
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/App.jsx", error: String((e && e.message) || e) }); }

// src/Button.jsx
try { (() => {
// Button.jsx — bronze / bronze-strong / outline
function Button({
  variant = "bronze",
  children,
  onClick,
  type = "button"
}) {
  const cls = "tk-btn tk-btn--" + variant;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    className: cls,
    onClick: onClick
  }, children);
}

// PlayTriangle — bronze-gradient triangle inside a circle.
// Used inside .tk-video .play and in iconography previews.
function PlayTriangle({
  size = 38,
  id = "pg"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#BF8753"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "35%",
    stopColor: "#FAC288"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "70%",
    stopColor: "#C9915C"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#AB7442"
  }))), /*#__PURE__*/React.createElement("polygon", {
    points: "7,4 21,12 7,20",
    fill: `url(#${id})`
  }));
}
window.Button = Button;
window.PlayTriangle = PlayTriangle;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Button.jsx", error: String((e && e.message) || e) }); }

// src/CinematicManifesto.jsx
try { (() => {
// CinematicManifesto.jsx — pinned scroll-scrub cinematic, adapted from the
// GSAP "CinematicHero". Rendered OUTSIDE the scaled stage so a real sticky
// pin works. As you scroll the pinned stage, the timeline scrubs:
//   1) "Imperfection is the story." title holds, then recedes (blur/scale).
//   2) A premium espresso-bronze card rises from below and scales up.
//   3) The card's photo of Ted + the rest of the copy reveal.
const {
  useRef: useCmRef,
  useEffect: useCmEffect
} = React;
function CinematicManifesto({
  onCta
}) {
  const rootRef = useCmRef(null);
  const introRef = useCmRef(null);
  const cueRef = useCmRef(null);
  const cardRef = useCmRef(null);
  const copyRef = useCmRef(null);
  const photoRef = useCmRef(null);
  useCmEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ss = (a, b, x) => {
      let t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const apply = p => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const intro = introRef.current,
        cue = cueRef.current,
        card = cardRef.current,
        copy = copyRef.current,
        photo = photoRef.current;
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

      // 3) Content reveal
      const rev = ss(0.5, 0.76, p);
      if (copy) {
        copy.style.opacity = String(rev);
        copy.style.transform = `translateY(${(1 - rev) * 34}px)`;
      }
      if (photo) photo.style.transform = `scale(${1.16 - grow * 0.16})`;
    };
    const onScroll = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = root.offsetHeight - vh;
      const p = total > 0 ? -root.getBoundingClientRect().top / total : 0;
      apply(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
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
    const onMove = e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", e.clientX - r.left + "px");
      card.style.setProperty("--mouse-y", e.clientY - r.top + "px");
    };
    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-cine",
    ref: rootRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "cine-pin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cine-photo",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cine-photoveil",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cine-grain",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cine-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cine-intro",
    ref: introRef
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cine-line cine-line--1"
  }, "Imperfection"), /*#__PURE__*/React.createElement("h2", {
    className: "cine-line cine-line--2"
  }, "is the story.")), /*#__PURE__*/React.createElement("div", {
    className: "cine-scrollcue",
    ref: cueRef,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "SCROLL"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M6 13l6 6 6-6"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cine-card",
    ref: cardRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-sheen",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cine-card__photo"
  }, /*#__PURE__*/React.createElement("img", {
    ref: photoRef,
    src: window.__resources && window.__resources.tedCinematic || "assets/ted-cinematic.jpg",
    alt: "Ted Saunders"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cine-card__photo-veil"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cine-card__copy",
    ref: copyRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "cine-eyebrow"
  }, "The Manifesto"), /*#__PURE__*/React.createElement("h3", {
    className: "cine-card__head"
  }, "Producing it perfectly is the art."), /*#__PURE__*/React.createElement("p", null, "Every story is an invitation to feel something deeper. To open your aperture, remember who you were before the world told you who to be. To celebrate the truth, the shadows, and the beauty of what it means to be human."), /*#__PURE__*/React.createElement("p", null, "I tell stories for the people who are brave enough to see the world differently."), /*#__PURE__*/React.createElement("div", {
    className: "cine-card__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "bronze",
    onClick: onCta
  }, "WORK WITH TED \xA0\u2192"))))));
}
window.CinematicManifesto = CinematicManifesto;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/CinematicManifesto.jsx", error: String((e && e.message) || e) }); }

// src/CompassIcons.jsx
try { (() => {
// CompassIcons.jsx — engraved brass line-icons for the Compass of Creations.
// Each is a thin-stroke glyph that reads as an engraving on a brass medallion.
// stroke uses currentColor so the brass gradient/illumination drives the color.
function CompassIcon({
  name,
  size = 40
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const glyphs = {
    // TEDPLOTS — film / aperture
    plots: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "13"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 11 L29 21 H19 Z M37 24 L27 29 V19 Z M24 37 L19 27 H29 Z M11 24 L21 19 V29 Z",
      opacity: "0.9"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "3.4"
    })),
    // TEDSHOTS — camera lens
    shots: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "13"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "8.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 11 V15 M24 33 V37 M11 24 H15 M33 24 H37"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "20",
      cy: "20",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    })),
    // TEDDROPS — sound wave / tuning fork
    drops: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M8 24 H12 M40 24 H36"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 24 V24 M14 18 V30 M19 12 V36 M24 7 V41 M29 13 V35 M34 19 V29 M38 22 V26"
    })),
    // TEDBOTS — mechanical eye
    bots: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M10 24 C16 15 32 15 38 24 C32 33 16 33 10 24 Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "5.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 18.5 V14 M24 29.5 V34 M18.5 24 H14 M29.5 24 H34"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "1.6",
      fill: "currentColor",
      stroke: "none"
    })),
    // TEDUNLOCKS — key
    unlocks: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "18",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22.9 22.9 L37 37 M33 33 L36 30 M30 30 L33 27"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "18",
      r: "2.4"
    })),
    // TEDCROPS — fashion crest / textile diamond
    crops: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M24 7 L38 24 L24 41 L10 24 Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 15 L31 24 L24 33 L17 24 Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 7 V41 M10 24 H38",
      opacity: "0.7"
    })),
    // TEDTHOUGHTS — labyrinth
    thoughts: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "24",
      r: "13"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 24 m0 -4 a4 4 0 1 1 -0.01 0 M24 14 a10 10 0 1 0 0.01 0 M30 24 a6 6 0 1 1 -6 -6"
    })),
    // TEDPROPS — theatre mask
    props: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M13 12 C13 12 35 12 35 12 C35 24 31 38 24 38 C17 38 13 24 13 12 Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 21 C19.5 19.5 22 19.5 23.5 21 M24.5 21 C26 19.5 28.5 19.5 30 21"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 29 C21 32 27 32 29 29"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", common, glyphs[name] || null);
}
window.CompassIcon = CompassIcon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/CompassIcons.jsx", error: String((e && e.message) || e) }); }

// src/CompassOrrery.jsx
try { (() => {
// CompassOrrery.jsx — "Ted's Compass of Creations".
// A cinematic ORRERY COMPASS: storytelling is the sun at the center; eight
// creative expressions orbit it on engraved brass rings. Scroll drives the
// whole machine's rotation; whichever node reaches the top pointer becomes
// "active" and updates the editorial panel on the left. Rendered OUTSIDE the
// scaled stage so the pinned scroll + true-scale geometry work correctly.
const {
  useRef: useCoRef,
  useEffect: useCoEffect,
  useState: useCoState
} = React;
const COMPASS_NODES = [{
  dir: "N",
  key: "plots",
  name: "TedPlots",
  tag: "Films that change how you see the world.",
  panel: "Stories that rearrange reality and challenge the stories we tell ourselves.",
  cta: "Explore Films"
}, {
  dir: "NW",
  key: "props",
  name: "TedProps",
  tag: "Expression through embodied acting.",
  panel: "The body as instrument — truth performed until it stops being performance.",
  cta: "Explore Acting"
}, {
  dir: "W",
  key: "thoughts",
  name: "TedThoughts",
  tag: "Philosophy for people who dare to think different.",
  panel: "Questions worth getting lost in, for minds unwilling to take the map on faith.",
  cta: "Explore Philosophy"
}, {
  dir: "SW",
  key: "crops",
  name: "TedCrops",
  tag: "Elevating style with future-ancient designs.",
  panel: "Garments as artifacts — woven from where we came from and where we're headed.",
  cta: "Explore Design"
}, {
  dir: "S",
  key: "unlocks",
  name: "TedUnlocks",
  tag: "Coaching for men ready to build a meaningful life.",
  panel: "The keys a man needs to unlock the life he was quietly built to live.",
  cta: "Explore Coaching"
}, {
  dir: "SE",
  key: "bots",
  name: "TedBots",
  tag: "Technology in service of human storytelling.",
  panel: "Intelligence pointed back at the oldest human art — the telling of the tale.",
  cta: "Explore Technology"
}, {
  dir: "E",
  key: "drops",
  name: "TedDrops",
  tag: "Music built to melt your insides and awaken your mind.",
  panel: "Frequency as feeling — sound engineered to reach the places words can't.",
  cta: "Explore Music"
}, {
  dir: "NE",
  key: "shots",
  name: "TedShots",
  tag: "Photography that celebrates the beauty of all people.",
  panel: "A single frame held long enough to reveal the dignity in every face.",
  cta: "Explore Photography"
}];

// Cinematic preview placeholder for each destination — a distinct warm tint,
// soft vignette, the category name and a faint engraving. Built as a data-URI
// <img> so swapping in a real still later is a one-line src change per node.
function compassPreview(key, name, tint) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='460' viewBox='0 0 720 460'>
    <defs>
      <radialGradient id='g' cx='38%' cy='32%' r='90%'>
        <stop offset='0%' stop-color='${tint[0]}'/>
        <stop offset='62%' stop-color='${tint[1]}'/>
        <stop offset='100%' stop-color='#0A0703'/>
      </radialGradient>
      <linearGradient id='v' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='55%' stop-color='rgba(0,0,0,0)'/>
        <stop offset='100%' stop-color='rgba(8,5,2,0.85)'/>
      </linearGradient>
      <pattern id='s' width='30' height='30' patternUnits='userSpaceOnUse' patternTransform='rotate(38)'>
        <line x1='0' y1='0' x2='0' y2='30' stroke='rgba(247,219,160,0.08)' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='720' height='460' fill='url(#g)'/>
    <rect width='720' height='460' fill='url(#s)'/>
    <rect width='720' height='460' fill='url(#v)'/>
    <text x='40' y='402' font-family='ui-monospace, monospace' font-size='15' letter-spacing='5' fill='rgba(247,219,160,0.6)'>${name}</text>
    <text x='40' y='428' font-family='ui-monospace, monospace' font-size='12' letter-spacing='3' fill='rgba(255,234,202,0.32)'>CINEMATIC PREVIEW</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Per-destination tints (warm brass family, each shifted so every chapter
// reads as its own visual world).
const COMPASS_TINTS = {
  plots: ["#5A3A1E", "#241408"],
  props: ["#5E2E2A", "#241010"],
  thoughts: ["#3E3A5A", "#161426"],
  crops: ["#5A4A22", "#231C0C"],
  unlocks: ["#6A4420", "#281806"],
  bots: ["#2E4A50", "#0E1E22"],
  drops: ["#4A2E5A", "#1A0F24"],
  shots: ["#6A5230", "#281D0E"]
};
function CompassOrrery({
  onActivate
}) {
  const rootRef = useCoRef(null);
  const rotorRef = useCoRef(null); // SVG group that visibly rotates (spokes/ticks)
  const nodesRef = useCoRef([]); // the 8 HTML medallions
  const [active, setActive] = useCoState(0);
  const [hoverIdx, setHoverIdx] = useCoState(null);
  const activeRef = useCoRef(0);
  const targetAngleRef = useCoRef(0); // continuous target rotation (deg)
  const currentAngleRef = useCoRef(0); // live spring angle (deg)
  const goToRef = useCoRef(null); // click handler set up inside effect
  const userInteractedRef = useCoRef(false); // stops auto-rotate once user clicks
  const autoTimerRef = useCoRef(null); // single shared auto-rotate interval
  const N = COMPASS_NODES.length;
  useCoEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector(".orrery-stage");
    const STEP = 360 / N; // 45° between notches

    const place = spinDeg => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.40;
      for (let i = 0; i < N; i++) {
        const el = nodesRef.current[i];
        if (!el) continue;
        const baseAngle = i * STEP; // 0 = top, clockwise
        const a = (baseAngle + spinDeg) * Math.PI / 180;
        el.style.left = cx + radius * Math.sin(a) + "px";
        el.style.top = cy - radius * Math.cos(a) + "px";
      }
    };

    // ---- Click → destination. Whichever node is clicked rotates to the top
    //      pointer via a weighted spring (accelerate, overshoot, settle). No
    //      scroll lock — the visitor drives the machine directly. ----
    const stopAuto = () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
    const goTo = (i, isAuto) => {
      if (!isAuto) {
        userInteractedRef.current = true;
        stopAuto();
      } // manual disables auto
      let desired = -i * STEP;
      const cur = currentAngleRef.current;
      while (desired - cur > 180) desired -= 360; // always take the short way
      while (desired - cur < -180) desired += 360;
      targetAngleRef.current = desired;
      activeRef.current = i;
      setActive(i);
      if (onActivate) onActivate(COMPASS_NODES[i]);
    };
    goToRef.current = goTo;

    // ---- Auto-rotate: advance one expression every 5.5s until the visitor
    //      takes manual control. Guarded so only ONE interval ever runs. ----
    stopAuto();
    if (!userInteractedRef.current) {
      autoTimerRef.current = setInterval(() => {
        if (userInteractedRef.current) {
          stopAuto();
          return;
        }
        goTo((activeRef.current + 1) % N, true);
      }, 5500);
    }

    // ---- Weighted spring: accelerate, overshoot 3–5°, recoil, settle ----
    let current = 0,
      velocity = 0,
      raf = 0;
    const STIFF = 0.055,
      DAMP = 0.78; // underdamped → mechanical overshoot
    const tick = () => {
      const target = targetAngleRef.current;
      velocity += (target - current) * STIFF;
      velocity *= DAMP;
      current += velocity;
      currentAngleRef.current = current;
      if (rotorRef.current) rotorRef.current.style.transform = `rotate(${current}deg)`;
      place(current);
      raf = requestAnimationFrame(tick);
    };
    targetAngleRef.current = -activeRef.current * STEP;
    current = targetAngleRef.current;
    currentAngleRef.current = current;
    tick();
    const onResize = () => place(current);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      stopAuto();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Panel content is driven only by the locked destination — exactly one
  // active at a time. Hover merely highlights a disc, it doesn't switch chapters.
  const node = COMPASS_NODES[active];

  // Concentric ring radii (in the 1000-unit SVG space)
  const rings = [488, 430, 372, 300, 232];
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-compass",
    ref: rootRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "compass-dust"
  })), /*#__PURE__*/React.createElement("div", {
    className: "compass-pin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-eyebrow"
  }, "Ted\u2019s Compass of Creations"), /*#__PURE__*/React.createElement("h2", {
    className: "compass-head"
  }, "One obsession. Eight expressions."), /*#__PURE__*/React.createElement("p", {
    className: "compass-sub"
  }, "Storytelling is the center of gravity. Everything else orbits from the same source.")), /*#__PURE__*/React.createElement("div", {
    className: "compass-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-active",
    key: active
  }, /*#__PURE__*/React.createElement("div", {
    className: "compass-active__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "compass-active__badge"
  }, /*#__PURE__*/React.createElement(CompassIcon, {
    name: node.key,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    className: "compass-active__num"
  }, "Expression ", String(active + 1).padStart(2, "0"), " \xB7 ", node.dir)), /*#__PURE__*/React.createElement("div", {
    className: "compass-active__name"
  }, node.name), /*#__PURE__*/React.createElement("div", {
    className: "compass-active__preview"
  }, /*#__PURE__*/React.createElement("img", {
    src: compassPreview(node.key, node.name, COMPASS_TINTS[node.key]),
    alt: node.name + " preview"
  }), /*#__PURE__*/React.createElement("span", {
    className: "compass-active__previewedge"
  })), /*#__PURE__*/React.createElement("p", {
    className: "compass-active__desc"
  }, node.panel), /*#__PURE__*/React.createElement("button", {
    className: "compass-active__cta",
    onClick: () => onActivate && onActivate(node)
  }, node.cta, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "compass-link",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "compass-link__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "compass-link__line"
  })), /*#__PURE__*/React.createElement("div", {
    className: "compass-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orrery-stage"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "orrery-svg",
    viewBox: "0 0 1000 1000",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "brassCore",
    cx: "42%",
    cy: "38%",
    r: "70%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#FBE6B8"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "42%",
    stopColor: "#C9A24B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#5A4220"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "brassRing",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#9C7B38"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "28%",
    stopColor: "#F4D58E"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: "#A9863F"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "80%",
    stopColor: "#E8C98A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#6E5226"
  })), /*#__PURE__*/React.createElement("path", {
    id: "ringText",
    d: "M500,500 m-454,0 a454,454 0 1,1 908,0 a454,454 0 1,1 -908,0"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "500",
    r: "488",
    fill: "none",
    stroke: "url(#brassRing)",
    strokeWidth: "2",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "500",
    r: "454",
    fill: "none",
    stroke: "#3A2C16",
    strokeWidth: "30",
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "500",
    r: "454",
    fill: "none",
    stroke: "url(#brassRing)",
    strokeWidth: "1.2",
    opacity: "0.7"
  }), rings.map((r, i) => /*#__PURE__*/React.createElement("circle", {
    key: r,
    cx: "500",
    cy: "500",
    r: r,
    fill: "none",
    stroke: "url(#brassRing)",
    strokeWidth: i === 0 ? 2.4 : 1.2,
    opacity: 0.32 + i * 0.06
  })), /*#__PURE__*/React.createElement("g", {
    opacity: "0.5"
  }, Array.from({
    length: 120
  }).map((_, i) => {
    const a = i * 3 * Math.PI / 180;
    const r1 = 372,
      r2 = i % 5 === 0 ? 356 : 364;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 500 + r1 * Math.sin(a),
      y1: 500 - r1 * Math.cos(a),
      x2: 500 + r2 * Math.sin(a),
      y2: 500 - r2 * Math.cos(a),
      stroke: "#D9B96B",
      strokeWidth: "1"
    });
  })), /*#__PURE__*/React.createElement("g", {
    ref: rotorRef,
    style: {
      transformOrigin: "500px 500px"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "500",
    r: "400",
    fill: "none",
    stroke: "url(#brassRing)",
    strokeWidth: "3",
    opacity: "0.85"
  }), Array.from({
    length: 72
  }).map((_, i) => {
    const a = i * 5 * Math.PI / 180;
    const r1 = 400,
      r2 = 412;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 500 + r1 * Math.sin(a),
      y1: 500 - r1 * Math.cos(a),
      x2: 500 + r2 * Math.sin(a),
      y2: 500 - r2 * Math.cos(a),
      stroke: "#C9A24B",
      strokeWidth: "2",
      opacity: "0.7"
    });
  }), COMPASS_NODES.map((_, i) => {
    const a = i * 45 * Math.PI / 180;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 500 + 120 * Math.sin(a),
      y1: 500 - 120 * Math.cos(a),
      x2: 500 + 400 * Math.sin(a),
      y2: 500 - 400 * Math.cos(a),
      stroke: "url(#brassRing)",
      strokeWidth: "3",
      opacity: "0.6"
    });
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "500",
    r: "120",
    fill: "#120C06",
    stroke: "url(#brassRing)",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "500",
    cy: "500",
    r: "132",
    fill: "none",
    stroke: "url(#brassRing)",
    strokeWidth: "1.2",
    opacity: "0.6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "orrery-pointer",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 28",
    width: "26",
    height: "30"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 28 L2 4 Q12 10 22 4 Z",
    fill: "url(#brassRing)",
    stroke: "#FBE6B8",
    strokeWidth: "0.8"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "orrery-core"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orrery-core__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orrery-core__label"
  }, "Ted Saunders"), /*#__PURE__*/React.createElement("div", {
    className: "orrery-core__rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "orrery-core__sub"
  }, "Storytelling"))), COMPASS_NODES.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.name,
    ref: el => nodesRef.current[i] = el,
    className: "orrery-node" + (i === active ? " is-active" : "") + (i === hoverIdx ? " is-hover" : ""),
    onMouseEnter: () => setHoverIdx(i),
    onMouseLeave: () => setHoverIdx(null),
    onClick: () => goToRef.current && goToRef.current(i)
  }, /*#__PURE__*/React.createElement("div", {
    className: "orrery-node__disc"
  }, /*#__PURE__*/React.createElement(CompassIcon, {
    name: d.key,
    size: 38
  })), /*#__PURE__*/React.createElement("div", {
    className: "orrery-node__label"
  }, d.name))))))));
}
window.CompassOrrery = CompassOrrery;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/CompassOrrery.jsx", error: String((e && e.message) || e) }); }

// src/Director.jsx
try { (() => {
// Director.jsx — "The Visionary Director" section.
// Layered figure (vignetted base photo + warm lamp spill + sharp cutout)
// on the left, copy + CTA on the right.
function Director({
  onReadMore
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-director"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-figure",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.directorImg || "../../assets/director-composite.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "The Visionary Director"), /*#__PURE__*/React.createElement("h2", null, "The Boy Who Brought", /*#__PURE__*/React.createElement("br", null), "The Worlds He Imagined", /*#__PURE__*/React.createElement("br", null), "To Life"), /*#__PURE__*/React.createElement("p", null, "Ted was six when he asked an innocent question that would unknowingly shape his entire life and career: \u201CWhat does that button do, Daddy?\u201D His father handed him the camera and he hasn\u2019t stopped using it since."), /*#__PURE__*/React.createElement("p", null, "Forty years later, Ted Saunders has directed everything from viral Burning Man narrative films to high-converting global Salesforce campaigns. He has gone from building studios, to losing everything, and much like his photography, had to develop in that darkness \u2014 reemerging with a strength, stamina and skill forged in the fires of transformation. Ted\u2019s philosophy, to show the beauty of humanity captured through our imperfection, is exposed through every frame he shoots."), /*#__PURE__*/React.createElement("div", {
    className: "cta-wrap"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold-outline",
    onClick: onReadMore
  }, "READ THE FULL STORY"))));
}
window.Director = Director;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Director.jsx", error: String((e && e.message) || e) }); }

// src/FeatureScroll.jsx
try { (() => {
// FeatureScroll.jsx — "Featured Work", ported from the Aceternity
// ContainerScroll (framer-motion → plain React + scroll math). The headline
// block translates up while a 3D video card rotates from tilted to flat and
// scales as you scroll through the section — the video unfolds into view in
// the SAME scroll, no separate section. Rendered outside the scaled stage so
// the perspective + scroll mapping run at true viewport scale.
const {
  useRef: useFsRef,
  useEffect: useFsEffect,
  useState: useFsState
} = React;
function FeatureScroll({
  onPlay,
  onCase,
  onAll
}) {
  const containerRef = useFsRef(null);
  const headerRef = useFsRef(null);
  const cardRef = useFsRef(null);
  useFsEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = () => window.innerWidth <= 768;
    const lerp = (a, b, t) => a + (b - a) * t;
    const apply = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = container.getBoundingClientRect();
      // framer useScroll default ["start end","end start"]: 0 when top hits
      // viewport bottom, 1 when bottom hits viewport top.
      let p = (vh - rect.top) / (rect.height + vh);
      p = Math.max(0, Math.min(1, p));
      // Map the active part of the pass-through to [0,1] so the card settles
      // flat while centered (feels anchored, not still rotating off-screen).
      let q = Math.max(0, Math.min(1, (p - 0.16) / 0.62));
      q = q * q * (3 - 2 * q);
      const rotate = lerp(22, 0, q);
      const scale = isMobile() ? lerp(0.72, 0.92, q) : lerp(1.06, 1, q);
      const translate = lerp(40, -110, q);
      if (headerRef.current) headerRef.current.style.transform = `translateY(${translate}px)`;
      if (cardRef.current) cardRef.current.style.transform = `perspective(1100px) rotateX(${rotate}deg) scale(${scale})`;
    };
    apply();
    window.addEventListener("scroll", apply, {
      passive: true
    });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-fscroll",
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "fscroll-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fscroll-header",
    ref: headerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "fintro-eyebrow"
  }, "Featured Work"), /*#__PURE__*/React.createElement("h2", {
    className: "fintro-head"
  }, "Disrupting Culture", /*#__PURE__*/React.createElement("br", null), "By Impacting Millions"), /*#__PURE__*/React.createElement("p", {
    className: "fintro-blurb"
  }, "With over 4 million views, this film tripled Burning Man\u2019s ticket sales, selling them out for the first time. Over a decade later, people still watch it religiously, stating that it gives them hope during hard times.")), /*#__PURE__*/React.createElement("div", {
    className: "fscroll-card",
    ref: cardRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "fscroll-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-video",
    onClick: onPlay,
    role: "button",
    "aria-label": "Play feature reel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "play"
  }, /*#__PURE__*/React.createElement(PlayTriangle, {
    size: 42,
    id: "pgFScroll"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "fscroll-after"
  }, /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement("div", {
    className: "tk-feature-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "bronze",
    onClick: onCase
  }, "VIEW FULL CASE STUDY"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onAll
  }, "EXPLORE ALL FILMS")))));
}
window.FeatureScroll = FeatureScroll;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/FeatureScroll.jsx", error: String((e && e.message) || e) }); }

// src/FilmStrip.jsx
try { (() => {
// FilmStrip.jsx — a slanted, infinitely-scrolling strip of film frames that
// bridges the TEDFLIX archive and the "Imperfection is the story" section,
// bleeding diagonally between them like a continuous reel.
function FilmStrip() {
  const R = typeof window !== "undefined" && window.__resources || {};
  const photos = [1, 2, 3, 4, 5, 6, 7, 8].map(n => R["film" + n] || `assets/film/photo-${n}.jpg`);
  // Duplicate the set so the marquee can loop seamlessly (-50%).
  const cells = photos.concat(photos);
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-filmstrip",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "film-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "film-track"
  }, cells.map((src, i) => /*#__PURE__*/React.createElement("div", {
    className: "film-cell",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "film-photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    draggable: "false"
  })))))));
}
window.FilmStrip = FilmStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/FilmStrip.jsx", error: String((e && e.message) || e) }); }

// src/FinancialStrategy.jsx
try { (() => {
// FinancialStrategy.jsx — "Financial Strategy". Markets as oceans, strategy as
// navigation. A restrained three-column editorial composition built live:
//   LEFT   — editorial content + selective CTAs
//   CENTER — Ted graded into a dark studio, emerging from shadow
//   RIGHT  — a "Field Notes" navigator's-journal panel
// Background intelligence (compass geometry, a market-cycle wave) sits below
// 10% opacity so it's discovered, not announced.
function FinanceCompass() {
  // Faint navigational diagram — the market cycle as a compass.
  return /*#__PURE__*/React.createElement("svg", {
    className: "finance-compass",
    viewBox: "0 0 400 400",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "200",
    cy: "200",
    r: "186",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "200",
    cy: "200",
    r: "150",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.4",
    strokeDasharray: "2 4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "200",
    cy: "200",
    r: "92",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.5"
  }), Array.from({
    length: 72
  }).map((_, i) => {
    const a = i / 72 * Math.PI * 2;
    const r1 = i % 9 === 0 ? 168 : 180;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 200 + Math.cos(a) * r1,
      y1: 200 + Math.sin(a) * r1,
      x2: 200 + Math.cos(a) * 186,
      y2: 200 + Math.sin(a) * 186,
      stroke: "currentColor",
      strokeWidth: "0.5"
    });
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "0.6",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200 38 L214 200 L200 362 L186 200 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M38 200 L200 186 L362 200 L200 214 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M86 86 L200 200 L314 314 M314 86 L200 200 L86 314",
    strokeWidth: "0.4",
    opacity: "0.6"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "200",
    cy: "200",
    r: "4",
    fill: "currentColor"
  }));
}
function FinancialStrategy({
  onApply,
  onCoaching
}) {
  const notes = [{
    n: "01",
    t: "1-on-1 Strategy Sessions"
  }, {
    n: "02",
    t: "Portfolio Review"
  }, {
    n: "03",
    t: "Market Cycle Education & Timing Frameworks"
  }, {
    n: "04",
    t: "Mindset & Psychology of Wealth Coaching"
  }, {
    n: "05",
    t: "Technical Analysis & Macro Fundamental Training"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-finance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance-bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(FinanceCompass, null), /*#__PURE__*/React.createElement("div", {
    className: "finance-cyclewave"
  })), /*#__PURE__*/React.createElement("img", {
    className: "finance-portrait",
    src: window.__resources && window.__resources.financePortrait || "assets/finance-portrait.jpg",
    alt: "Ted Saunders in his studio"
  }), /*#__PURE__*/React.createElement("div", {
    className: "finance-scrim",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "finance-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance-col finance-col--text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance-eyebrow"
  }, "Financial Strategy"), /*#__PURE__*/React.createElement("h2", {
    className: "finance-head"
  }, "New money systems require a new mindset."), /*#__PURE__*/React.createElement("p", {
    className: "finance-sub"
  }, "Stay ahead of the chain,", /*#__PURE__*/React.createElement("br", null), "mastering the future of finance."), /*#__PURE__*/React.createElement("div", {
    className: "finance-body"
  }, /*#__PURE__*/React.createElement("p", null, "Ted Saunders has spent years navigating the decentralized financial landscape \u2014 studying market cycles, portfolio architecture, risk frameworks, and the psychology of wealth that most advisors won\u2019t touch."), /*#__PURE__*/React.createElement("p", null, "This isn\u2019t generic advice. It\u2019s a strategic conversation with someone who has lived the volatility, learned from it, and built a clear philosophy around it.")), /*#__PURE__*/React.createElement("div", {
    className: "finance-cta-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "finance-btn finance-btn--primary",
    onClick: onApply
  }, "Apply for a Strategy Session", /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "finance-btn finance-btn--ghost",
    onClick: onCoaching
  }, "Explore Men\u2019s Coaching", /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "finance-col finance-col--spacer",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "finance-fieldnotes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance-fieldnotes__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "finance-fieldnotes__star",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 40",
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 3 L23 20 L20 37 L17 20 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 20 L20 17 L37 20 L20 23 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "2",
    fill: "currentColor",
    stroke: "none"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "finance-fieldnotes__title"
  }, "Field Notes")), /*#__PURE__*/React.createElement("div", {
    className: "finance-fieldnotes__grid"
  }, notes.map(it => /*#__PURE__*/React.createElement("div", {
    className: "finance-fnote",
    key: it.n
  }, /*#__PURE__*/React.createElement("span", {
    className: "finance-fnote__n"
  }, it.n), /*#__PURE__*/React.createElement("span", {
    className: "finance-fnote__t"
  }, it.t))))));
}
window.FinancialStrategy = FinancialStrategy;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/FinancialStrategy.jsx", error: String((e && e.message) || e) }); }

// src/FocusRail.jsx
try { (() => {
// FocusRail.jsx — cinematic 3D coverflow, ported from the 21st.dev
// "Focus Rail" (framer-motion/next) to dependency-free React + CSS,
// restyled into the Ted Saunders bronze-on-black vibe.
const {
  useState,
  useRef,
  useCallback,
  useEffect
} = React;
function frWrap(min, max, v) {
  const range = max - min;
  return ((v - min) % range + range) % range + min;
}

// Striped poster placeholder — warm dark field, hairline stripes, and a
// monospace note marking where real concept art should be dropped.
function frPoster(title, i) {
  const hues = ["#2A1C10", "#241A12", "#2E1E11", "#201611"];
  const bg = hues[i % hues.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='${bg}'/>
        <stop offset='100%' stop-color='#000000'/>
      </linearGradient>
      <pattern id='s' width='26' height='26' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
        <rect width='26' height='26' fill='transparent'/>
        <line x1='0' y1='0' x2='0' y2='26' stroke='rgba(209,157,99,0.10)' stroke-width='1'/>
      </pattern>
    </defs>
    <rect width='600' height='800' fill='url(#g)'/>
    <rect width='600' height='800' fill='url(#s)'/>
    <text x='44' y='720' font-family='ui-monospace, monospace' font-size='17' letter-spacing='2' fill='rgba(209,157,99,0.55)'>CONCEPT ART</text>
    <text x='44' y='748' font-family='ui-monospace, monospace' font-size='14' letter-spacing='1' fill='rgba(255,234,202,0.30)'>${title.toUpperCase()}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  header = null,
  controlledActive = null,
  onStep = null,
  controlsCta = null,
  arrows = false
}) {
  const [internalActive, setInternalActive] = useState(initialIndex);
  const [playing, setPlaying] = useState(null);
  const drag = useRef(null);
  const frRef = useRef(null);
  const lastWheel = useRef(0);
  const count = items.length;
  const controlled = controlledActive != null;
  const active = controlled ? controlledActive : internalActive;
  const activeIndex = frWrap(0, count, active);
  const activeItem = items[activeIndex];
  const prev = useCallback(() => {
    controlled ? onStep && onStep(-1) : setInternalActive(p => !loop && p === 0 ? p : p - 1);
  }, [controlled, onStep, loop]);
  const next = useCallback(() => {
    controlled ? onStep && onStep(1) : setInternalActive(p => !loop && p === count - 1 ? p : p + 1);
  }, [controlled, onStep, loop, count]);
  const stepBy = d => {
    controlled ? onStep && onStep(d) : setInternalActive(p => p + d);
  };

  // Horizontal-only wheel/trackpad navigation (only when NOT scroll-controlled;
  // in pinned/controlled mode the page scroll drives the active card).
  useEffect(() => {
    if (controlled) return;
    const el = frRef.current;
    if (!el) return;
    const onWheelNative = e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 240) return;
      if (Math.abs(e.deltaX) > 10) {
        e.deltaX > 0 ? next() : prev();
        lastWheel.current = now;
      }
    };
    el.addEventListener("wheel", onWheelNative, {
      passive: false
    });
    return () => el.removeEventListener("wheel", onWheelNative);
  }, [next, prev, controlled]);
  const onKey = e => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };
  const onPointerDown = e => {
    if (controlled) return;
    drag.current = {
      x: e.clientX,
      moved: false
    };
  };
  const onPointerUp = e => {
    if (controlled || !drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    drag.current = null;
  };
  const visible = [-2, -1, 0, 1, 2];
  return /*#__PURE__*/React.createElement("div", {
    className: "fr",
    tabIndex: 0,
    onKeyDown: onKey,
    ref: frRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-amb",
    key: "amb-" + activeItem.id
  }, /*#__PURE__*/React.createElement("img", {
    src: activeItem.imageSrc,
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "fr-amb__veil"
  })), header && /*#__PURE__*/React.createElement("div", {
    className: "fr-header"
  }, header), /*#__PURE__*/React.createElement("div", {
    className: "fr-stage"
  }, arrows && /*#__PURE__*/React.createElement("button", {
    className: "fr-arrow fr-arrow--prev",
    "aria-label": "Previous",
    onClick: prev
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "26",
    height: "26",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 5l-7 7 7 7"
  }))), arrows && /*#__PURE__*/React.createElement("button", {
    className: "fr-arrow fr-arrow--next",
    "aria-label": "Next",
    onClick: next
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "26",
    height: "26",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fr-rail",
    onPointerDown: onPointerDown,
    onPointerUp: onPointerUp
  }, visible.map(offset => {
    const abs = active + offset;
    const index = frWrap(0, count, abs);
    const item = items[index];
    if (!loop && (abs < 0 || abs >= count)) return null;
    const isCenter = offset === 0;
    const dist = Math.abs(offset);
    const style = {
      transform: `translate(-50%, -50%) translateX(${offset * 300}px) translateZ(${-dist * 180}px) rotateY(${offset * -20}deg) scale(${isCenter ? 1 : 0.85})`,
      opacity: isCenter ? 1 : Math.max(0.12, 1 - dist * 0.5),
      filter: `blur(${isCenter ? 0 : dist * 5}px) brightness(${isCenter ? 1 : 0.5})`,
      zIndex: 20 - dist
    };
    return /*#__PURE__*/React.createElement("div", {
      key: abs,
      className: "fr-card" + (isCenter ? " is-center" : ""),
      style: style,
      onClick: () => {
        offset !== 0 ? stepBy(offset) : setPlaying(item);
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: item.imageSrc,
      alt: item.title,
      draggable: "false"
    }), /*#__PURE__*/React.createElement("div", {
      className: "fr-card__sheen"
    }), isCenter && /*#__PURE__*/React.createElement("button", {
      className: "fr-play",
      "aria-label": "Play " + item.title,
      onClick: e => {
        e.stopPropagation();
        setPlaying(item);
      }
    }, /*#__PURE__*/React.createElement(PlayTriangle, {
      size: 30,
      id: "frPlay"
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "fr-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-info__text",
    key: "t-" + activeItem.id
  }, activeItem.meta && /*#__PURE__*/React.createElement("span", {
    className: "fr-meta"
  }, activeItem.meta), /*#__PURE__*/React.createElement("h3", {
    className: "fr-title"
  }, activeItem.title), activeItem.description && /*#__PURE__*/React.createElement("p", {
    className: "fr-desc"
  }, activeItem.description)), /*#__PURE__*/React.createElement("div", {
    className: "fr-controls"
  }, arrows && /*#__PURE__*/React.createElement("div", {
    className: "fr-dots",
    role: "tablist",
    "aria-label": "Select work"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: it.id || i,
    className: "fr-dot" + (i === activeIndex ? " is-active" : ""),
    "aria-label": it.title,
    "aria-selected": i === activeIndex,
    onClick: () => stepBy(i - active)
  }))), controlsCta))), playing && /*#__PURE__*/React.createElement(FRLightbox, {
    item: playing,
    onClose: () => setPlaying(null)
  }));
}

// Fullscreen video lightbox. Renders a YouTube/Vimeo embed when item.videoUrl
// is set; otherwise a placeholder frame marking where the embed will live.
function FRLightbox({
  item,
  onClose
}) {
  useEffect(() => {
    const onEsc = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fr-lb",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("button", {
    className: "fr-lb__close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fr-lb__frame",
    onClick: e => e.stopPropagation()
  }, item.videoUrl ? /*#__PURE__*/React.createElement("iframe", {
    src: item.videoUrl,
    title: item.title,
    frameBorder: "0",
    allow: "autoplay; fullscreen; picture-in-picture",
    allowFullScreen: true
  }) : /*#__PURE__*/React.createElement("div", {
    className: "fr-lb__placeholder"
  }, /*#__PURE__*/React.createElement(PlayTriangle, {
    size: 56,
    id: "frLbPlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fr-lb__meta"
  }, item.meta), /*#__PURE__*/React.createElement("div", {
    className: "fr-lb__title"
  }, item.title), /*#__PURE__*/React.createElement("div", {
    className: "fr-lb__note"
  }, "YOUTUBE / VIMEO EMBED \u2014 drop the video URL here"))));
}
window.FocusRail = FocusRail;
window.frPoster = frPoster;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/FocusRail.jsx", error: String((e && e.message) || e) }); }

// src/Footer.jsx
try { (() => {
// Footer.jsx — opt-in finale, laid out to the approved reference:
//   LEFT   — "Download My Free Guide" (book cover + name/email + CTA)
//   CENTER — Ted (the hooded-philosopher scene) as the full-bleed centerpiece
//   RIGHT  — "Connect with Ted" social rail (rune-marked rows)
//   BASE   — compass wordmark divider + sitemap nav + agency credit
const {
  useState: useFtState
} = React;
function Footer({
  onSubscribe
}) {
  const [form, setFt] = useFtState({
    name: "",
    email: ""
  });
  const set = k => e => setFt(f => ({
    ...f,
    [k]: e.target.value
  }));
  const submit = e => {
    e.preventDefault();
    onSubscribe && onSubscribe(form);
  };
  const socials = [{
    label: "Facebook",
    rune: "\u16A0"
  }, {
    label: "Instagram",
    rune: "\u16D7"
  }, {
    label: "YouTube",
    rune: "\u16C9"
  }, {
    label: "X",
    rune: "\u2715"
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "tk-footer2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ft-bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ft-bg__img",
    src: window.__resources && window.__resources.footerScene || "assets/footer-scene.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "ft-bg__fade"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ft-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ft-optin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ft-optin__copy"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ft-optin__head"
  }, "Download My", /*#__PURE__*/React.createElement("br", null), "Free Guide"), /*#__PURE__*/React.createElement("p", {
    className: "ft-optin__sub"
  }, "7 Questions That Turn a Moment Into a Story"), /*#__PURE__*/React.createElement("form", {
    className: "ft-optin__form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Name",
    value: form.name,
    onChange: set("name"),
    "aria-label": "Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "Email",
    value: form.email,
    onChange: set("email"),
    "aria-label": "Email",
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "ft-optin__btn"
  }, "Download Now")))), /*#__PURE__*/React.createElement("div", {
    className: "ft-spacer",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ft-connect"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ft-connect__head"
  }, "Connect", /*#__PURE__*/React.createElement("br", null), "with ", /*#__PURE__*/React.createElement("strong", null, "Ted")), /*#__PURE__*/React.createElement("div", {
    className: "ft-connect__rail"
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    className: "ft-social",
    href: "#",
    key: s.label,
    "aria-label": "Follow on " + s.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "ft-social__label"
  }, "Follow on ", /*#__PURE__*/React.createElement("strong", null, s.label)), /*#__PURE__*/React.createElement("span", {
    className: "ft-social__rune",
    "aria-hidden": "true"
  }, s.rune)))))), /*#__PURE__*/React.createElement("div", {
    className: "ft-base"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ft-mark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ft-mark__rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ft-mark__center"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ft-mark__logo",
    src: window.__resources && window.__resources.logo || "assets/logo.png",
    alt: "Ted Saunders"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ft-mark__rule"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "ft-nav",
    "aria-label": "Footer"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Work With Me"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Films"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Consulting")), /*#__PURE__*/React.createElement("div", {
    className: "ft-credit"
  }, /*#__PURE__*/React.createElement("span", null, "Innovated by"), " ", /*#__PURE__*/React.createElement("strong", null, "INFLUEX")), /*#__PURE__*/React.createElement("div", {
    className: "ft-legal"
  }, "\xA9 2026 Ted Saunders \xA0\xB7\xA0 ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Terms"), " \xA0\xB7\xA0 ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Privacy"))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Footer.jsx", error: String((e && e.message) || e) }); }

// src/Header.jsx
try { (() => {
// Header.jsx — top nav with a hamburger toggle on mobile.
const {
  useState: useStateHdr
} = React;
function Header({
  active = "Films",
  onNav,
  onCta
}) {
  const items = ["About", "Work With Me", "Films", "Consulting"];
  const [open, setOpen] = useStateHdr(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const pick = label => {
    onNav && onNav(label);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "tk-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "tk-brand",
    onClick: () => onNav && onNav("Home")
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo",
    src: window.__resources && window.__resources.logo || "../../assets/logo.png",
    alt: "Ted Saunders"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "tk-nav"
  }, items.map(label => /*#__PURE__*/React.createElement("li", {
    key: label
  }, /*#__PURE__*/React.createElement("a", {
    className: active === label ? "is-active" : "",
    onClick: e => {
      e.preventDefault();
      pick(label);
    },
    href: "#"
  }, label)))), /*#__PURE__*/React.createElement(Button, {
    variant: "turquoise",
    onClick: onCta
  }, "EXPLORE THE WORK"), /*#__PURE__*/React.createElement("button", {
    className: "tk-menu-toggle",
    "aria-label": "Open menu",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M3 12h18M3 18h18",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tk-mobile-menu" + (open ? " is-open" : "")
  }, /*#__PURE__*/React.createElement("button", {
    className: "close",
    "aria-label": "Close menu",
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    strokeLinecap: "round"
  }))), items.map(label => /*#__PURE__*/React.createElement("a", {
    key: label,
    className: active === label ? "is-active" : "",
    onClick: e => {
      e.preventDefault();
      pick(label);
    },
    href: "#"
  }, label)), /*#__PURE__*/React.createElement(Button, {
    variant: "turquoise",
    onClick: () => {
      onCta && onCta();
      setOpen(false);
    }
  }, "EXPLORE THE WORK")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Header.jsx", error: String((e && e.message) || e) }); }

// src/Hero.jsx
try { (() => {
// Hero.jsx — full-bleed video hero, exact recreation of
// "Header v2 — Futurism.png" reference.
function Hero({
  active,
  onNav,
  onCta,
  onPrimary,
  onSecondary
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-hero"
  }, /*#__PURE__*/React.createElement("video", {
    className: "tk-hero__video",
    src: window.__resources && window.__resources.heroVideo || "../../assets/hero-bg.mp4",
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__veil"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__content"
  }, /*#__PURE__*/React.createElement(Header, {
    active: active,
    onNav: onNav,
    onCta: onCta
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__reticles"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r tl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r tr"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r bl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r br"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "credits"
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-director"
  }, "Director"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-phil"
  }, "Philosopher"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-architect"
  }, "Architect of Worlds")), /*#__PURE__*/React.createElement("h1", {
    className: "wordmark"
  }, "Wielding\xA0Magic"), /*#__PURE__*/React.createElement("div", {
    className: "through"
  }, "Through", /*#__PURE__*/React.createElement(TypewriterMedium, null)), /*#__PURE__*/React.createElement("p", {
    className: "subhead"
  }, "From cinematic brand campaigns to original sci-fi universes, Ted\u2019s work delivers stories that are rich in myth and alive with humanity \u2014 at the intersection of technology, emotion, and transformation."), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "bronze",
    onClick: onPrimary
  }, "EXPLORE THE WORK"), /*#__PURE__*/React.createElement(Button, {
    variant: "gold-outline",
    onClick: onSecondary
  }, "VIEW THE REEL"))), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__stats"
  }, /*#__PURE__*/React.createElement(Stat, {
    num: "20+",
    lbl: "Years directing"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "10m+",
    lbl: "Collective video views"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "100+",
    lbl: "Clients serviced"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "3",
    lbl: "Client acquisitions"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__divider"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "disc"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "../../assets/logo.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Hero.jsx", error: String((e && e.message) || e) }); }

// src/InsightsCTA.jsx
try { (() => {
// InsightsCTA.jsx — HOME SECTION 10, the finale. "See through a new lens."
// A cinematic aperture/iris opens behind the headline; a refined glass capture
// card holds the form. The aperture motif ties directly to the director theme.
const {
  useState: useInsState,
  useRef: useInsRef,
  useEffect: useInsEffect
} = React;
function CompassDial() {
  // A navigator's compass: rotating tick ring + cardinal marks, a fixed
  // 8-point rose, and a slowly sweeping needle. Gold light on black.
  const cx = 250,
    cy = 250;
  const ticks = [];
  for (let i = 0; i < 72; i++) {
    const a = i / 72 * Math.PI * 2;
    const major = i % 9 === 0;
    const r1 = major ? 196 : 206;
    ticks.push(/*#__PURE__*/React.createElement("line", {
      key: i,
      x1: cx + Math.cos(a) * r1,
      y1: cy + Math.sin(a) * r1,
      x2: cx + Math.cos(a) * 216,
      y2: cy + Math.sin(a) * 216,
      stroke: major ? "rgba(232,201,138,0.7)" : "rgba(201,162,75,0.35)",
      strokeWidth: major ? 1.6 : 0.8
    }));
  }
  const cardinals = [["N", 0], ["E", 90], ["S", 180], ["W", 270]];
  return /*#__PURE__*/React.createElement("svg", {
    className: "ins-compass",
    viewBox: "0 0 500 500",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 232,
    fill: "none",
    stroke: "rgba(201,162,75,0.20)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 170,
    fill: "none",
    stroke: "rgba(201,162,75,0.16)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 170,
    fill: "url(#insPupil)"
  }), /*#__PURE__*/React.createElement("g", {
    className: "ins-compass__ring"
  }, ticks), /*#__PURE__*/React.createElement("g", {
    className: "ins-compass__cardinals"
  }, cardinals.map(([l, deg]) => {
    const a = deg / 180 * Math.PI - Math.PI / 2;
    return /*#__PURE__*/React.createElement("text", {
      key: l,
      x: cx + Math.cos(a) * 150,
      y: cy + Math.sin(a) * 150 + 7,
      textAnchor: "middle",
      className: "ins-compass__card"
    }, l);
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "rgba(232,201,138,0.5)",
    strokeWidth: "0.8",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M250 96 L266 250 L250 404 L234 250 Z",
    fill: "rgba(247,219,160,0.06)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M96 250 L250 234 L404 250 L250 266 Z",
    fill: "rgba(247,219,160,0.05)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M141 141 L250 250 L359 359 M359 141 L250 250 L141 359",
    strokeWidth: "0.5",
    opacity: "0.5"
  })), /*#__PURE__*/React.createElement("g", {
    className: "ins-compass__needle"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M250 120 L262 250 L250 250 Z",
    fill: "#F4D58E"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M250 380 L238 250 L250 250 Z",
    fill: "rgba(201,162,75,0.45)"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "7",
    fill: "#F7DBA0",
    stroke: "rgba(120,74,30,0.6)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "insPupil",
    cx: "50%",
    cy: "44%",
    r: "62%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(247,219,160,0.16)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "rgba(120,74,30,0.08)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(0,0,0,0)"
  }))));
}
function InsightsCTA({
  onSubscribe,
  onConsult
}) {
  const [form, setForm] = useInsState({
    first: "",
    last: "",
    email: ""
  });
  const [sent, setSent] = useInsState(false);
  const rootRef = useInsRef(null);
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const submit = e => {
    e.preventDefault();
    setSent(true);
    onSubscribe && onSubscribe(form);
  };

  // Reveal-on-scroll (robust inside / outside the scaled stage)
  useInsEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.82 && r.bottom > vh * 0.1) {
        el.classList.add("is-in");
        window.removeEventListener("scroll", check, true);
      }
    };
    check();
    window.addEventListener("scroll", check, true);
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-insights",
    ref: rootRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "ins-bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ins-stars"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ins-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ins-compass-wrap"
  }, /*#__PURE__*/React.createElement(CompassDial, null)), /*#__PURE__*/React.createElement("div", {
    className: "ins-beam ins-beam--l"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ins-beam ins-beam--r"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ins-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ins-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ins-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ins-kicker__star"
  }, "\u2726"), /*#__PURE__*/React.createElement("span", null, "Get Free Insights"), /*#__PURE__*/React.createElement("span", {
    className: "ins-kicker__star"
  }, "\u2726")), /*#__PURE__*/React.createElement("h2", {
    className: "ins-head"
  }, "See through a", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "new lens.")), /*#__PURE__*/React.createElement("div", {
    className: "ins-rule",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("p", {
    className: "ins-sub"
  }, "Insights that refuse to stay quiet."), /*#__PURE__*/React.createElement("p", {
    className: "ins-body"
  }, "Drop your email and receive the first chapter of Ted\u2019s upcoming book \u2014 plus occasional transmissions from the world behind the work: philosophy, new music, films and insights.")), /*#__PURE__*/React.createElement("form", {
    className: "ins-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "ins-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "ins-field"
  }, /*#__PURE__*/React.createElement("span", null, "First name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.first,
    onChange: set("first"),
    placeholder: "Jane",
    autoComplete: "given-name"
  })), /*#__PURE__*/React.createElement("label", {
    className: "ins-field"
  }, /*#__PURE__*/React.createElement("span", null, "Last name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.last,
    onChange: set("last"),
    placeholder: "Doe",
    autoComplete: "family-name"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "ins-field"
  }, /*#__PURE__*/React.createElement("span", null, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: form.email,
    onChange: set("email"),
    placeholder: "you@domain.com",
    autoComplete: "email",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "ins-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "ins-btn ins-btn--primary"
  }, sent ? "Welcome aboard" : "Subscribe", !sent && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ins-btn ins-btn--ghost",
    onClick: () => onConsult && onConsult()
  }, "Book a consultation")), /*#__PURE__*/React.createElement("p", {
    className: "ins-fineprint"
  }, "No noise. Unsubscribe anytime."))));
}
window.InsightsCTA = InsightsCTA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/InsightsCTA.jsx", error: String((e && e.message) || e) }); }

// src/OriginalIP.jsx
try { (() => {
// OriginalIP.jsx — "Original IP in Development": a private vault of four
// cinematic worlds. 2×2 grid of full-bleed concept-art frames, each overlaid
// with World number, title, logline, and an aged "fragment" annotation card.
// Cards carry a cursor-tracking gold spotlight glow-border on hover (ported
// from the shadcn "spotlight-card" to vanilla CSS custom props).
const {
  useRef: useIpRef,
  useEffect: useIpEffect
} = React;
function OriginalIP({
  onExplore,
  onContact
}) {
  const gridRef = useIpRef(null);
  useIpEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const onMove = e => {
      grid.style.setProperty("--glow-x", e.clientX.toFixed(1));
      grid.style.setProperty("--glow-y", e.clientY.toFixed(1));
      grid.style.setProperty("--glow-xp", (e.clientX / window.innerWidth).toFixed(3));
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  const R = window.__resources || {};
  const worlds = [{
    id: "fated",
    num: "World 01",
    title: "The Fated",
    img: R.ipFated || "assets/ip/fated.jpg",
    log: "A man who released a dark god to end a war must now lead rebels to save the world — and his wife — from the corrupt order he unknowingly served.",
    fragLabel: "Prophecy Fragment",
    frag: "When the god is set free, the order will kneel in ash."
  }, {
    id: "inevitable",
    num: "World 02",
    title: "Inevitable",
    img: R.ipInevitable || "assets/ip/inevitable.jpg",
    log: "The first human consciousness inside a cyborg body understands everything — except where we came from. So he ushers existence toward the singularity.",
    fragLabel: "Consciousness Architecture",
    frag: "Identity = pattern.  Pattern = data.  Data = eternal.",
    side: "Singularity Threshold Approaching"
  }, {
    id: "prosopagnosia",
    num: "World 03",
    title: "Prosopagnosia",
    img: R.ipProsopagnosia || "assets/ip/prosopagnosia.jpg",
    log: "A man who loses the ability to recognize faces must find his kidnapped fiancée, aided only by an elixir that bends time.",
    fragLabel: "Temporal Elixir Notes",
    frag: "One drop unlocks the moments between moments."
  }, {
    id: "juiced",
    num: "World 04",
    title: "Juiced",
    img: R.ipJuiced || "assets/ip/juiced.jpg",
    log: "Based on a true story: kidnapped, forced to sell fruit juice in the ghetto, and awoken to the realities of race, class, and culture.",
    fragLabel: "Field Journal",
    frag: "They took everything, but the hunger to be something more."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-ip tk-ip--light"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Original IP in Development"), /*#__PURE__*/React.createElement("h2", null, "The Worlds That", /*#__PURE__*/React.createElement("br", null), "Haven\u2019t Been Made Yet"), /*#__PURE__*/React.createElement("p", {
    className: "blurb"
  }, "Secret development materials from the private archive \u2014 atmospheric windows into universes that already exist.")), /*#__PURE__*/React.createElement("div", {
    className: "ip-grid",
    ref: gridRef
  }, worlds.map(w => /*#__PURE__*/React.createElement("article", {
    className: "ip-world ip-world--" + w.id,
    key: w.id
  }, /*#__PURE__*/React.createElement("img", {
    className: "ip-world__img",
    src: w.img,
    alt: w.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ip-world__scrim",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ip-world__frame",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ip-world__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ip-world__num"
  }, w.num), /*#__PURE__*/React.createElement("h3", {
    className: "ip-world__title"
  }, w.title), /*#__PURE__*/React.createElement("div", {
    className: "ip-world__rule"
  }), /*#__PURE__*/React.createElement("p", {
    className: "ip-world__log"
  }, w.log)), w.side && /*#__PURE__*/React.createElement("div", {
    className: "ip-world__side"
  }, w.side, /*#__PURE__*/React.createElement("span", {
    className: "ip-world__side-t"
  }, "T \u2212 0")), /*#__PURE__*/React.createElement("div", {
    className: "ip-world__frag"
  }, /*#__PURE__*/React.createElement("div", {
    className: "frag__label"
  }, w.fragLabel), /*#__PURE__*/React.createElement("div", {
    className: "frag__quote"
  }, w.frag))))), /*#__PURE__*/React.createElement("div", {
    className: "ip-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ip-cta__btn ip-cta__btn--solid",
    onClick: onExplore
  }, "Explore the IP \xA0\u2192"), /*#__PURE__*/React.createElement("button", {
    className: "ip-cta__btn ip-cta__btn--ghost",
    onClick: onContact
  }, "Contact Ted About a Project")));
}
window.OriginalIP = OriginalIP;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/OriginalIP.jsx", error: String((e && e.message) || e) }); }

// src/Pathways.jsx
try { (() => {
// Pathways.jsx — HOME SECTION 8: three cinematic "world portals" the visitor
// chooses between. Equal vertical panels that expand on hover (the hovered
// world opens, neighbours compress), each a full-height image the user drops
// in. Below: a calm convergence CTA for those who don't fit one box.
function Pathways({
  onPath,
  onConverge
}) {
  const paths = [{
    id: "brands",
    index: "01",
    label: "Brands & Clients",
    category: "Commercial & Brand Work",
    copy: "You need a director who understands story at a cellular level. Ted has helmed campaigns for Salesforce, Ancestry.com, and Comcast — with the emotional intelligence and visual command to match any scale.",
    cta: "View Commercial Work",
    img: "assets/pathways/brands.jpg",
    res: "pathBrands"
  }, {
    id: "individuals",
    index: "02",
    label: "Individual Clients",
    category: "Compass Coaching",
    copy: "You're a man ready to find your path and optimize your life. Ted works with men to master the four core dimensions that determine everything: career, finances, health, and relationships.",
    cta: "Apply for Coaching",
    img: "assets/pathways/individuals.jpg",
    res: "pathIndividuals"
  }, {
    id: "investors",
    index: "03",
    label: "Investors",
    category: "Original IP & Ventures",
    copy: "You believe in the kind of platforms that dare to shift the paradigm of today's culture. Ted has developed original cinematic worlds for visionary investors who back what matters.",
    cta: "Explore Original IP",
    img: "assets/pathways/investors.jpg",
    res: "pathInvestors"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-pathways"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pathways-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pathways-eyebrow"
  }, "Choose your entrance"), /*#__PURE__*/React.createElement("h2", {
    className: "pathways-title"
  }, "There is a path here for you."), /*#__PURE__*/React.createElement("p", {
    className: "pathways-sub"
  }, "Whether you need a director, a collaborator, a guide or a return on investment \u2014 Ted can help you build something meaningful.")), /*#__PURE__*/React.createElement("div", {
    className: "pathways-row"
  }, paths.map(p => /*#__PURE__*/React.createElement("div", {
    className: "pathway pathway--" + p.id,
    key: p.id
  }, /*#__PURE__*/React.createElement("img", {
    className: "pathway__img",
    src: window.__resources && window.__resources[p.res] || p.img,
    alt: p.label
  }), /*#__PURE__*/React.createElement("div", {
    className: "pathway__atmos",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pathway__scrim",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pathway__index",
    "aria-hidden": "true"
  }, p.index), /*#__PURE__*/React.createElement("div", {
    className: "pathway__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pathway__category"
  }, p.label), /*#__PURE__*/React.createElement("h3", {
    className: "pathway__label"
  }, p.category), /*#__PURE__*/React.createElement("p", {
    className: "pathway__copy"
  }, p.copy), /*#__PURE__*/React.createElement("button", {
    className: "pathway__cta",
    onClick: () => onPath && onPath(p)
  }, p.cta, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))))))));
}
window.Pathways = Pathways;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Pathways.jsx", error: String((e && e.message) || e) }); }

// src/Portfolio.jsx
try { (() => {
// Portfolio.jsx — "TEDFLIX" archive: a free, arrow-navigable FocusRail coverflow.
// No scroll lock — the visitor drives it with arrows, dots, drag or the cards.
function Portfolio({
  onExplore
}) {
  const rows = [{
    id: "film",
    title: "Film",
    meta: "01 — Film",
    description: "Stories that dare you to think differently.",
    imageSrc: window.__resources && window.__resources.posterPlaces || "assets/portfolio/poster-places.png",
    videoUrl: ""
  }, {
    id: "photography",
    title: "Photography",
    meta: "02 — Photography",
    description: "Moments captured in a single frame.",
    imageSrc: window.__resources && window.__resources.posterBubbles || "assets/portfolio/poster-bubbles.png",
    videoUrl: ""
  }, {
    id: "music",
    title: "Music",
    meta: "03 — Music",
    description: "Rhythm and frequency to awaken the mind.",
    imageSrc: window.__resources && window.__resources.posterSynthesis || "assets/portfolio/poster-synthesis.png",
    videoUrl: ""
  }, {
    id: "literature",
    title: "Literature",
    meta: "04 — Literature",
    description: "Insights that refused to stay quiet.",
    imageSrc: window.__resources && window.__resources.posterEudaimonia || "assets/portfolio/poster-eudaimonia.png",
    videoUrl: ""
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-ip-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ip-pin"
  }, /*#__PURE__*/React.createElement(FocusRail, {
    items: rows,
    loop: true,
    arrows: true,
    controlsCta: /*#__PURE__*/React.createElement(Button, {
      variant: "bronze",
      onClick: onExplore
    }, "EXPLORE THE PORTFOLIO \xA0\u2192"),
    header: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "tk-tedivider tk-tedivider--logo"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rule"
    }), /*#__PURE__*/React.createElement("img", {
      className: "tk-tedflix",
      src: window.__resources && window.__resources.tedflix || "assets/tedflix-logo.png",
      alt: "TEDFLIX"
    }), /*#__PURE__*/React.createElement("div", {
      className: "rule"
    })), /*#__PURE__*/React.createElement("p", {
      className: "blurb"
    }, "Every medium in service of the same obsession \u2014 to reveal the beauty of humanity through a transformational new lens."))
  })));
}
window.Portfolio = Portfolio;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Portfolio.jsx", error: String((e && e.message) || e) }); }

// src/PressStrip.jsx
try { (() => {
// PressStrip.jsx — looping marquee with bundler-friendly resource lookup.
const _R = typeof window !== "undefined" && window.__resources || {};
const LOGO_FILES = [{
  k: "netflix",
  src: _R.logoNetflix || "assets/press/netflix2.png"
}, {
  k: "bi",
  src: _R.logoBI || "assets/press/business-insider.png"
}, {
  k: "nyt",
  src: _R.logoNYT || "assets/press/nyt.png"
}, {
  k: "gma",
  src: _R.logoGMA || "assets/press/gma.png"
}, {
  k: "abc",
  src: _R.logoABC || "assets/press/abc2.png"
}, {
  k: "drew",
  src: _R.logoDrew || "assets/press/drew.png"
}];
function PressStrip() {
  const map = window.__resources || {};
  const fallback = (id, file) => map[id] || `../../assets/press/${file}`;
  const logos = [fallback("pressNetflix", "netflix.svg"), fallback("pressAbc", "abc.svg"), fallback("pressIheart", "iheart.svg"), fallback("pressDrew", "drew-large.svg")];
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-press",
    "aria-label": "As featured on"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee"
  }, [...logos, ...logos, ...logos, ...logos].map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: src,
    alt: ""
  }))));
}
function CosmicPanel({
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-press-section"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "tk-cosmic-sparkles",
    density: 800,
    size: 1.4,
    speed: 0.45,
    opacity: 0.65,
    color: "#FFFFFF"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-cosmic-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-logobar",
    "aria-label": "As featured on"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-logobar__track"
  }, [0, 1, 2, 3].flatMap(k => LOGO_FILES.map((f, j) => /*#__PURE__*/React.createElement("img", {
    key: k + "-" + j,
    className: "logo-" + f.k,
    src: f.src,
    alt: ""
  }))))), children));
}
window.PressStrip = PressStrip;
window.CosmicPanel = CosmicPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/PressStrip.jsx", error: String((e && e.message) || e) }); }

// src/Sparkles.jsx
try { (() => {
// Sparkles.jsx — faithful dependency-free port of the tsparticles "Sparkles"
// component (slim). Same prop semantics: density = total particle count, tiny
// twinkling dots that drift in random directions with animated opacity.
const {
  useRef: useSpRef,
  useEffect: useSpEffect
} = React;
function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent"
}) {
  const ref = useSpRef(null);
  useSpEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // detectRetina
    const rand = (a, b) => a + Math.random() * (b - a);
    const sMin = minSize != null ? minSize : size / 2.5;
    const sMax = size;
    const spMin = minSpeed != null ? minSpeed : speed / 10;
    const spMax = speed;
    const oMin = minOpacity != null ? minOpacity : opacity / 10;
    const oMax = opacity;

    // Cached soft round sprite (so tiny dots stay crisp + cheap to draw).
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 16;
    const sc = sprite.getContext("2d");
    const g = sc.createRadialGradient(8, 8, 0, 8, 8, 8);
    g.addColorStop(0, color);
    g.addColorStop(0.5, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    sc.fillStyle = g;
    sc.beginPath();
    sc.arc(8, 8, 8, 0, Math.PI * 2);
    sc.fill();
    let W = 0,
      H = 0,
      parts = [],
      raf = 0;
    function build() {
      parts = Array.from({
        length: density
      }, () => {
        const ang = Math.random() * Math.PI * 2;
        const mag = rand(spMin, spMax) * dpr;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: rand(sMin, sMax) * dpr,
          op: rand(oMin, oMax),
          dir: Math.random() < 0.5 ? 1 : -1,
          vx: Math.cos(ang) * mag,
          vy: Math.sin(ang) * mag
        };
      });
    }
    function resize() {
      W = canvas.clientWidth * dpr;
      H = canvas.clientHeight * dpr;
      canvas.width = W;
      canvas.height = H;
      build();
    }
    const step = opacitySpeed / 100;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      if (background && background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, W, H);
      }
      for (const p of parts) {
        p.op += p.dir * step;
        if (p.op >= oMax) {
          p.op = oMax;
          p.dir = -1;
        }
        if (p.op <= oMin) {
          p.op = oMin;
          p.dir = 1;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = W + 8;
        if (p.x > W + 8) p.x = -8;
        if (p.y < -8) p.y = H + 8;
        if (p.y > H + 8) p.y = -8;
        ctx.globalAlpha = p.op;
        const s = p.r * 2;
        ctx.drawImage(sprite, p.x - s, p.y - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "tk-sparkles" + (className ? " " + className : "")
  });
}
window.Sparkles = Sparkles;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Sparkles.jsx", error: String((e && e.message) || e) }); }

// src/StatRow.jsx
try { (() => {
// StatRow.jsx — bronze stat number + label, with a count-up animation
// from 0 → target on first viewport entry. Parses values like "20+",
// "10m+", "100+", "3" — animates the integer portion, keeps the suffix.

function parseStat(value) {
  const m = String(value).match(/^(\d+)(.*)$/);
  if (!m) return {
    num: 0,
    suffix: String(value)
  };
  return {
    num: parseInt(m[1], 10),
    suffix: m[2]
  };
}
function useCountUp(target, durationMs = 1800) {
  const [current, setCurrent] = React.useState(0);
  const elRef = React.useRef(null);
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - t0) / durationMs);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // Trigger when in view (or immediately if already in view)
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) start();
      });
    }, {
      threshold: 0.25
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);
  return [current, elRef];
}
function Stat({
  num,
  lbl
}) {
  const {
    num: target,
    suffix
  } = parseStat(num);
  const [val, ref] = useCountUp(target, 1800);
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-stat",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, val, suffix), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, lbl));
}
window.Stat = Stat;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/StatRow.jsx", error: String((e && e.message) || e) }); }

// src/Testimonials.jsx
try { (() => {
// Testimonials.jsx — three-up bronze pull-quotes with vertical
// hairline separators between them (matching Featured Work section spec).
function Testimonials() {
  const items = [{
    body: "Ten years later, I still come here when the world gets dark and my soul needs a hug.",
    by: "@FeatherzMcG"
  }, {
    body: "I really think this is one of the loveliest things on Youtube.",
    by: "@FeatherzMcG"
  }, {
    body: "No matter how many times I watch this, it makes me cry every time. I love it more than words can express.",
    by: "@FeatherzMcG"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-testimonials"
  }, /*#__PURE__*/React.createElement(Testimonial, items[0]), /*#__PURE__*/React.createElement("div", {
    className: "tk-vrule",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Testimonial, items[1]), /*#__PURE__*/React.createElement("div", {
    className: "tk-vrule",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Testimonial, items[2]));
}
function Testimonial({
  body,
  by
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-testimonial"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quote-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, body), /*#__PURE__*/React.createElement("div", {
    className: "by"
  }, by));
}
window.Testimonials = Testimonials;
window.Testimonial = Testimonial;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Testimonials.jsx", error: String((e && e.message) || e) }); }

// src/TypewriterMedium.jsx
try { (() => {
// TypewriterMedium.jsx — cycles "FILM / PHOTOGRAPHY / MUSIC / STORY"
// with a type-in, hold, type-out animation every ~4 seconds.
// Rendered inline inside <div class="through"> so it inherits the
// black bold "FILM" styling.
function TypewriterMedium() {
  const words = ["Film", "Photography", "Music", "Story"];
  const TYPE_MS = 90; // per character on type-in
  const ERASE_MS = 50; // per character on type-out
  const HOLD_MS = 2400; // pause once fully typed

  const [wordIdx, setWordIdx] = React.useState(0);
  const [charCount, setCharCnt] = React.useState(0);
  const [phase, setPhase] = React.useState("type"); // type | hold | erase

  React.useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (phase === "type") {
      if (charCount < current.length) {
        t = setTimeout(() => setCharCnt(c => c + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("erase"), HOLD_MS);
      }
    } else if (phase === "erase") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCnt(c => c - 1), ERASE_MS);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [phase, charCount, wordIdx]);
  const visible = words[wordIdx].slice(0, charCount);
  return /*#__PURE__*/React.createElement("span", {
    className: "film"
  }, /*#__PURE__*/React.createElement("span", {
    className: "film-text"
  }, visible || "\u00A0"), /*#__PURE__*/React.createElement("span", {
    className: "film-caret",
    "aria-hidden": "true"
  }));
}
window.TypewriterMedium = TypewriterMedium;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/TypewriterMedium.jsx", error: String((e && e.message) || e) }); }

// src/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
// App.jsx — assembles the marketing site.
const {
  useState,
  useCallback
} = React;
function ToastShelf({
  events,
  onDismiss
}) {
  if (!events.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: 24,
      bottom: 24,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, events.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    onClick: () => onDismiss(e.id),
    style: {
      background: "linear-gradient(180deg, #FFF2C6 0%, #BD8332 100%)",
      color: "#000",
      padding: "12px 18px",
      borderRadius: 4,
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
      cursor: "pointer",
      maxWidth: 360
    }
  }, e.text)));
}

// Scaler hook — applies transform: scale to a 1920-design stage and
// sets the wrapper's height to (natural height × scale) so the rest
// of the page lays out correctly underneath.
function useStageScale(designWidth = 1920) {
  const wrapRef = React.useRef(null);
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    const MOBILE_BP = 768;
    const apply = () => {
      const stage = stageRef.current;
      const wrap = wrapRef.current;
      if (!stage || !wrap) return;
      const vw = window.innerWidth;
      if (vw < MOBILE_BP) {
        // Mobile: true responsive layout, no scaling.
        stage.classList.add("is-mobile");
        stage.style.transform = "none";
        stage.style.width = "100%";
        wrap.style.height = "auto";
      } else {
        // Tablet / desktop: pixel-perfect 1920 stage scaled to viewport.
        stage.classList.remove("is-mobile");
        const scale = vw / designWidth;
        stage.style.width = designWidth + "px";
        stage.style.transform = `scale(${scale})`;
        const naturalH = stage.scrollHeight;
        wrap.style.height = naturalH * scale + "px";
      }
    };
    apply();
    window.addEventListener("resize", apply);
    const ro = new ResizeObserver(apply);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => {
      window.removeEventListener("resize", apply);
      ro.disconnect();
    };
  }, [designWidth]);
  return {
    wrapRef,
    stageRef
  };
}
function App() {
  const [active, setActive] = useState("Films");
  const [events, setEvents] = useState([]);
  const {
    wrapRef,
    stageRef
  } = useStageScale(1920);
  const fire = useCallback(text => {
    const id = Date.now() + Math.random();
    setEvents(cur => [...cur, {
      id,
      text
    }]);
    setTimeout(() => setEvents(cur => cur.filter(x => x.id !== id)), 2600);
  }, []);
  const dismiss = id => setEvents(cur => cur.filter(x => x.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-scaler",
    ref: wrapRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-stage",
    ref: stageRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement(Hero, {
    active: active,
    onNav: label => {
      setActive(label);
      fire(`Nav → ${label}`);
    },
    onCta: () => fire("Explore the work"),
    onPrimary: () => fire("Explore the work"),
    onSecondary: () => fire("View the reel")
  }), /*#__PURE__*/React.createElement(CosmicPanel, null, /*#__PURE__*/React.createElement(PressStrip, null), /*#__PURE__*/React.createElement(Director, {
    onReadMore: () => fire("Open full story")
  })), /*#__PURE__*/React.createElement(FeatureVideo, {
    onPlay: () => fire("Play feature reel"),
    onCase: () => fire("View full case study"),
    onAll: () => fire("Explore all films")
  }), /*#__PURE__*/React.createElement(Archive, {
    onOpen: it => fire(`Open: ${it.tag}`)
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(ToastShelf, {
    events: events,
    onDismiss: dismiss
  }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Archive.jsx
try { (() => {
// Archive.jsx — "Explore the Archive" film/photo/music/literature tiles.
function Archive({
  onOpen
}) {
  const items = [{
    tag: "Film",
    date: "AUG 25, 2011",
    title: "Stories that dare you to think differently."
  }, {
    tag: "Photography",
    date: "JUN 02, 2018",
    title: "Stories that dare you to think differently."
  }, {
    tag: "Music",
    date: "NOV 14, 2020",
    title: "Stories that dare you to think differently."
  }, {
    tag: "Literature",
    date: "MAR 09, 2023",
    title: "Stories that dare you to think differently."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-archive-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-tedivider"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "disc"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "../../assets/logo.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "rule"
  })), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "My Work"), /*#__PURE__*/React.createElement("h2", null, "Explore the Archive"), /*#__PURE__*/React.createElement("p", {
    className: "blurb"
  }, "Every medium in service of the same obsession \u2014 to reveal the beauty of humanity through a transformational new lens.")), /*#__PURE__*/React.createElement("div", {
    className: "tk-archive"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "tk-archive-card",
    onClick: e => {
      e.preventDefault();
      onOpen && onOpen(it);
    },
    href: "#"
  }, /*#__PURE__*/React.createElement("div", {
    className: "thumb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, it.tag)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, it.title), /*#__PURE__*/React.createElement("div", {
    className: "date"
  }, it.date)), /*#__PURE__*/React.createElement("div", {
    className: "arrow"
  }, "\u2192")))));
}
window.Archive = Archive;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Archive.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Button.jsx
try { (() => {
// Button.jsx — bronze / bronze-strong / outline
function Button({
  variant = "bronze",
  children,
  onClick,
  type = "button"
}) {
  const cls = "tk-btn tk-btn--" + variant;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    className: cls,
    onClick: onClick
  }, children);
}

// PlayTriangle — bronze-gradient triangle inside a circle.
// Used inside .tk-video .play and in iconography previews.
function PlayTriangle({
  size = 38,
  id = "pg"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#BF8753"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "35%",
    stopColor: "#FAC288"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "70%",
    stopColor: "#C9915C"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#AB7442"
  }))), /*#__PURE__*/React.createElement("polygon", {
    points: "7,4 21,12 7,20",
    fill: `url(#${id})`
  }));
}
window.Button = Button;
window.PlayTriangle = PlayTriangle;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Button.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Director.jsx
try { (() => {
// Director.jsx — "The Visionary Director" section.
// Layered figure (vignetted base photo + warm lamp spill + sharp cutout)
// on the left, copy + CTA on the right.
function Director({
  onReadMore
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-director"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-figure",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.directorImg || "../../assets/director-composite.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "The Visionary Director"), /*#__PURE__*/React.createElement("h2", null, "The Boy Who Brought", /*#__PURE__*/React.createElement("br", null), "The Worlds He Imagined", /*#__PURE__*/React.createElement("br", null), "To Life"), /*#__PURE__*/React.createElement("p", null, "Ted was six when he asked an innocent question that would unknowingly shape his entire life and career: \u201CWhat does that button do, Daddy?\u201D His father handed him the camera and he hasn\u2019t stopped using it since."), /*#__PURE__*/React.createElement("p", null, "Forty years later, Ted Saunders has directed everything from viral Burning Man narrative films to high-converting global Salesforce campaigns. He has gone from building studios, to losing everything, and much like his photography, had to develop in that darkness \u2014 reemerging with a strength, stamina and skill forged in the fires of transformation. Ted\u2019s philosophy, to show the beauty of humanity captured through our imperfection, is exposed through every frame he shoots."), /*#__PURE__*/React.createElement("div", {
    className: "cta-wrap"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold-outline",
    onClick: onReadMore
  }, "READ THE FULL STORY"))));
}
window.Director = Director;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Director.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FeatureVideo.jsx
try { (() => {
// FeatureVideo.jsx — "Disrupting Culture" section with section head,
// video poster, three testimonials, then primary+outline CTA pair.
function FeatureVideo({
  onPlay,
  onCase,
  onAll
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-feature-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tk-section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Featured Work"), /*#__PURE__*/React.createElement("h2", null, "Disrupting Culture", /*#__PURE__*/React.createElement("br", null), "By Impacting Millions"), /*#__PURE__*/React.createElement("p", {
    className: "blurb"
  }, "With over 4 million views, this film tripled Burning Man\u2019s ticket sales, selling them out for the first time. Over a decade later, people still watch it religiously, stating that it gives them hope during hard times.")), /*#__PURE__*/React.createElement("div", {
    className: "tk-video",
    onClick: onPlay,
    role: "button",
    "aria-label": "Play feature reel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "play"
  }, /*#__PURE__*/React.createElement(PlayTriangle, {
    size: 42,
    id: "pgFeat"
  }))), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement("div", {
    className: "tk-feature-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "bronze",
    onClick: onCase
  }, "VIEW FULL CASE STUDY"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onAll
  }, "EXPLORE ALL FILMS")));
}
window.FeatureVideo = FeatureVideo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FeatureVideo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Footer.jsx — simple footer
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "tk-footer"
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Ted Saunders"), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Vimeo"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "YouTube"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Contact")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Header.jsx — top nav with a hamburger toggle on mobile.
const {
  useState: useStateHdr
} = React;
function Header({
  active = "Films",
  onNav,
  onCta
}) {
  const items = ["About", "Work With Me", "Films", "Consulting"];
  const [open, setOpen] = useStateHdr(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const pick = label => {
    onNav && onNav(label);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "tk-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "tk-brand",
    onClick: () => onNav && onNav("Home")
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo",
    src: window.__resources && window.__resources.logo || "../../assets/logo.png",
    alt: "Ted Saunders"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "tk-nav"
  }, items.map(label => /*#__PURE__*/React.createElement("li", {
    key: label
  }, /*#__PURE__*/React.createElement("a", {
    className: active === label ? "is-active" : "",
    onClick: e => {
      e.preventDefault();
      pick(label);
    },
    href: "#"
  }, label)))), /*#__PURE__*/React.createElement(Button, {
    variant: "turquoise",
    onClick: onCta
  }, "EXPLORE THE WORK"), /*#__PURE__*/React.createElement("button", {
    className: "tk-menu-toggle",
    "aria-label": "Open menu",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M3 12h18M3 18h18",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tk-mobile-menu" + (open ? " is-open" : "")
  }, /*#__PURE__*/React.createElement("button", {
    className: "close",
    "aria-label": "Close menu",
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    strokeLinecap: "round"
  }))), items.map(label => /*#__PURE__*/React.createElement("a", {
    key: label,
    className: active === label ? "is-active" : "",
    onClick: e => {
      e.preventDefault();
      pick(label);
    },
    href: "#"
  }, label)), /*#__PURE__*/React.createElement(Button, {
    variant: "turquoise",
    onClick: () => {
      onCta && onCta();
      setOpen(false);
    }
  }, "EXPLORE THE WORK")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero.jsx — full-bleed video hero, exact recreation of
// "Header v2 — Futurism.png" reference.
function Hero({
  active,
  onNav,
  onCta,
  onPrimary,
  onSecondary
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-hero"
  }, /*#__PURE__*/React.createElement("video", {
    className: "tk-hero__video",
    src: window.__resources && window.__resources.heroVideo || "../../assets/hero-bg.mp4",
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__veil"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__content"
  }, /*#__PURE__*/React.createElement(Header, {
    active: active,
    onNav: onNav,
    onCta: onCta
  }), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__reticles"
  }, /*#__PURE__*/React.createElement("span", {
    className: "r tl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r tr"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r bl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "r br"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "credits"
  }, /*#__PURE__*/React.createElement("span", {
    className: "c-director"
  }, "Director"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-phil"
  }, "Philosopher"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "c-architect"
  }, "Architect of Worlds")), /*#__PURE__*/React.createElement("h1", {
    className: "wordmark"
  }, "Weilding\xA0Magic"), /*#__PURE__*/React.createElement("div", {
    className: "through"
  }, "Through", /*#__PURE__*/React.createElement(TypewriterMedium, null)), /*#__PURE__*/React.createElement("p", {
    className: "subhead"
  }, "From cinematic brand campaigns to original sci-fi universes, Ted\u2019s work delivers stories that are rich in myth and alive with humanity \u2014 at the intersection of technology, emotion, and transformation."), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "bronze",
    onClick: onPrimary
  }, "EXPLORE THE WORK"), /*#__PURE__*/React.createElement(Button, {
    variant: "gold-outline",
    onClick: onSecondary
  }, "VIEW THE REEL"))), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__stats"
  }, /*#__PURE__*/React.createElement(Stat, {
    num: "20+",
    lbl: "Years directing"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "10m+",
    lbl: "Collective video views"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "100+",
    lbl: "Clients serviced"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "3",
    lbl: "Client acquisitions"
  })), /*#__PURE__*/React.createElement("div", {
    className: "tk-hero__divider"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "disc"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logo || "../../assets/logo.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "rule"
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PressStrip.jsx
try { (() => {
// PressStrip.jsx — looping marquee with bundler-friendly resource lookup.
function PressStrip() {
  const map = window.__resources || {};
  const fallback = (id, file) => map[id] || `../../assets/press/${file}`;
  const logos = [fallback("pressNetflix", "netflix.svg"), fallback("pressAbc", "abc.svg"), fallback("pressIheart", "iheart.svg"), fallback("pressDrew", "drew-large.svg")];
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-press",
    "aria-label": "As featured on"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee"
  }, [...logos, ...logos, ...logos, ...logos].map((src, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: src,
    alt: ""
  }))));
}
function CosmicPanel({
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "tk-press-section"
  }, children);
}
window.PressStrip = PressStrip;
window.CosmicPanel = CosmicPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PressStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StatRow.jsx
try { (() => {
// StatRow.jsx — bronze stat number + label, with a count-up animation
// from 0 → target on first viewport entry. Parses values like "20+",
// "10m+", "100+", "3" — animates the integer portion, keeps the suffix.

function parseStat(value) {
  const m = String(value).match(/^(\d+)(.*)$/);
  if (!m) return {
    num: 0,
    suffix: String(value)
  };
  return {
    num: parseInt(m[1], 10),
    suffix: m[2]
  };
}
function useCountUp(target, durationMs = 1800) {
  const [current, setCurrent] = React.useState(0);
  const elRef = React.useRef(null);
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - t0) / durationMs);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // Trigger when in view (or immediately if already in view)
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) start();
      });
    }, {
      threshold: 0.25
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);
  return [current, elRef];
}
function Stat({
  num,
  lbl
}) {
  const {
    num: target,
    suffix
  } = parseStat(num);
  const [val, ref] = useCountUp(target, 1800);
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-stat",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, val, suffix), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, lbl));
}
window.Stat = Stat;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StatRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Testimonials.jsx
try { (() => {
// Testimonials.jsx — three-up bronze pull-quotes with vertical
// hairline separators between them (matching Featured Work section spec).
function Testimonials() {
  const items = [{
    body: "Ten years later, I still come here when the world gets dark and my soul needs a hug.",
    by: "@FeatherzMcG"
  }, {
    body: "I really think this is one of the loveliest things on Youtube.",
    by: "@FeatherzMcG"
  }, {
    body: "No matter how many times I watch this, it makes me cry every time. I love it more than words can express.",
    by: "@FeatherzMcG"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-testimonials"
  }, /*#__PURE__*/React.createElement(Testimonial, items[0]), /*#__PURE__*/React.createElement("div", {
    className: "tk-vrule",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Testimonial, items[1]), /*#__PURE__*/React.createElement("div", {
    className: "tk-vrule",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Testimonial, items[2]));
}
function Testimonial({
  body,
  by
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "tk-testimonial"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quote-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, body), /*#__PURE__*/React.createElement("div", {
    className: "by"
  }, by));
}
window.Testimonials = Testimonials;
window.Testimonial = Testimonial;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Testimonials.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/TypewriterMedium.jsx
try { (() => {
// TypewriterMedium.jsx — cycles "FILM / PHOTOGRAPHY / MUSIC / STORY"
// with a type-in, hold, type-out animation every ~4 seconds.
// Rendered inline inside <div class="through"> so it inherits the
// black bold "FILM" styling.
function TypewriterMedium() {
  const words = ["Film", "Photography", "Music", "Story"];
  const TYPE_MS = 90; // per character on type-in
  const ERASE_MS = 50; // per character on type-out
  const HOLD_MS = 2400; // pause once fully typed

  const [wordIdx, setWordIdx] = React.useState(0);
  const [charCount, setCharCnt] = React.useState(0);
  const [phase, setPhase] = React.useState("type"); // type | hold | erase

  React.useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (phase === "type") {
      if (charCount < current.length) {
        t = setTimeout(() => setCharCnt(c => c + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("erase"), HOLD_MS);
      }
    } else if (phase === "erase") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCnt(c => c - 1), ERASE_MS);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [phase, charCount, wordIdx]);
  const visible = words[wordIdx].slice(0, charCount);
  return /*#__PURE__*/React.createElement("span", {
    className: "film"
  }, /*#__PURE__*/React.createElement("span", {
    className: "film-text"
  }, visible || "\u00A0"), /*#__PURE__*/React.createElement("span", {
    className: "film-caret",
    "aria-hidden": "true"
  }));
}
window.TypewriterMedium = TypewriterMedium;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/TypewriterMedium.jsx", error: String((e && e.message) || e) }); }

})();
