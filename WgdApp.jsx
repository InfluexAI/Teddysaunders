// WgdApp.jsx — "Web & Graphic Design" portfolio page.
// Header · Hero · Intro · four category galleries (4 mockup slots each) · Footer.
const { useState: useWgdState, useCallback: useWgdCb, useRef: useWgdRef, useEffect: useWgdEffect } = React;
const WGD_R = (k, fallback) => (window.__resources && window.__resources[k]) || fallback;

const WGD_CATS = [
  { n: "01", key: "websites", title: "Websites", tag: "Web",
    subtitle: "Story-first digital experiences",
    body: "Cinematic marketing sites and portfolios built from story first\u2014every scroll, transition, and frame composed to move people the way a film would. Designed and built end to end, from art direction through the final responsive build.",
    projects: [
      { client: "5th Kind", name: "Hollywood's Digital Vault",
        body: "When Marvel and Universal Studios need to manage their digital assets they turn to 5th Kind. And when 5th Kind needed to update their brand, website and software stack across all types of devices and browsers, they turned to us. The result? A multi-year journey, turning their platform into a masterpiece worthy of such massive clients, leading them to a successful acquisition by Sohonet.",
        deliverables: ["Platform Design", "Web Development", "UX"],
        link: { label: "View Website", href: "http://5thkind.webflow.io/" },
        media: [
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/web/5th1.mp4" },
          { type: "image", src: "https://framerusercontent.com/images/cYLuZBWvuQEQ3fGnRRShryXE.jpg" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/web/web1.mp4" },
        ] },
      { client: "Act-On", name: "From Legacy to Legend",
        body: "Act-On didn't just update their look and feel\u2014we orchestrated a digital renaissance for the brand. Through crafting a meticulous design system, re-skinning their entire website, and activating AI-powered analytics, we transformed Act-On from a Web 1.0 look to an industry leader, with every pixel telling the story of a modern and cutting-edge brand.",
        deliverables: ["Web Development", "Design System", "Brand Evolution"],
        link: { label: "View Website", href: "https://Act-On.com" },
        media: [
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/web/web3.mp4" },
          { type: "image", src: "https://framerusercontent.com/images/Ve3BhCYRNUvaryDSwIGAYLi2WUE.jpg" },
          { type: "image", src: "https://framerusercontent.com/images/wrytBstS35f1a7nXuOPEJ47njVQ.jpg" },
        ] },
      { client: "Trusted CMO", name: "Trust Made Visual",
        body: "Today's startups require a digital presence that breaks barriers. For Trusted CMO, we crafted a web experience where bold animations dance with powerful functionality. The result is more than a website\u2014it's a warm and comfortable experience that mirrors the innovative spirit of the CMOs it serves.",
        deliverables: ["Brand", "Web Design"],
        link: { label: "View Website", href: "http://trustedcmo.com/" },
        media: [
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/web/web4.mp4" },
          { type: "image", src: "https://framerusercontent.com/images/Y6p2qaMr7gzNEJcwsF3qoczJnY.jpg" },
          { type: "image", src: "https://framerusercontent.com/images/SOCMMxcCbAHj8OSzojg5cVhDR7k.jpg" },
        ] },
    ] },
  { n: "02", key: "brand", title: "Brand Identity", tag: "Brand",
    subtitle: "Marks, systems, and visual language",
    body: "Complete visual languages\u2014marks, type, color, and the rules that hold them together\u2014so a brand feels inevitable across every surface it touches. Each identity is built to carry the same weight in motion as it does in print.",
    projects: [
      { client: "Toolchain", name: "Brand Evolution",
        body: "Toolchain needed their brand to match their ambitions. We enhanced their existing logo, built comprehensive brand architecture, and created custom graphics for their pitch materials. Our strategic design work helped position them for a successful exit.",
        deliverables: ["Brand", "Brand Architecture", "Pitch Graphics"],
        link: { label: "View Project", href: "https://infinitstudios.com/services/branding" },
        media: [
          { type: "image", src: "https://framerusercontent.com/images/R89o8OikMfF6HMY1lC5fzAcwx1U.jpg" },
          { type: "image", src: "https://framerusercontent.com/images/083GMdhaUFlV87Jy0OIavnV4.jpg" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/branding/toolchain1.mp4" },
        ] },
      { client: "Trusted CMO", name: "Brand Identity",
        body: "For Trusted CMO, we developed a fresh brand identity that speaks to modern leadership. Our comprehensive design system blends bold visuals with flexibility, creating a foundation that grows alongside their evolving business needs.",
        deliverables: ["Brand", "Design System"],
        link: { label: "View Website", href: "http://trustedcmo.com/" },
        media: [
          { type: "image", src: "https://framerusercontent.com/images/KeQeXeuj8v5We4VyggsHaRdZpDY.jpg" },
          { type: "image", src: "https://framerusercontent.com/images/ud5x40JD2IhD0uItjhmuyG6QDA4.jpg" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/branding/cmo1.mp4" },
        ] },
      { client: "5th Kind", name: "Design Systems",
        body: "Working with 5th Kind, we crafted meticulous brand and design systems that set new standards for their visual identity. Our systematic approach unified their brand across all touchpoints, helping them attract and serve premium clients like Marvel and Universal Studios, ultimately contributing to their successful acquisition by Sohonet.",
        deliverables: ["Brand", "Design Systems"],
        link: { label: "View Project", href: "https://infinitstudios.com/services/branding" },
        media: [
          { type: "image", src: "https://framerusercontent.com/images/AZsURjgiorhPSZRT4BUyMhsrk.jpg" },
          { type: "image", src: "https://framerusercontent.com/images/d8EztubTTXBt2wAiHz13iJ5y3A.jpg" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/branding/5th1.mp4" },
        ] },
    ] },
  { n: "03", key: "uiux", title: "UI / UX Design", tag: "Product",
    subtitle: "Interfaces people enjoy using",
    body: "Product interfaces shaped around real human behavior\u2014flows that feel obvious, screens that feel effortless, details that reward a second look. Research and strategy grounded in what people actually do, not what looks good in a deck.",
    projects: [
      { client: "Raiinmaker", name: "Decentralized AI, Made Legible",
        body: "A DePIN network where users train AI models, run mobile nodes, and earn \u0024COIN\u2014an inherently technical product that had to feel effortless to a mainstream audience. The interface layers validator flows, staking, and reward mechanics into a single dark, luminous system where each concept earns its own moment on the page instead of arriving as a wall of jargon.",
        deliverables: ["User Flows", "Interface Design", "Design System", "Mobile App UX"],
        link: { label: "View Website", href: "https://www.raiinmaker.com/" },
        media: [
          { type: "image", src: "assets/wgd-uiux/raiinmaker.png", tall: true },
        ] },
      { client: "BroOracle", name: "Ritual as Interface",
        body: "A 44-card oracle deck rebuilt as a daily practice app. The core interaction\u2014pull, reflect, take action\u2014is protected from everything else: one card, one breath, one decision per screen. Spreads, deck switching, and the journal sit a tap away without ever competing with the draw itself.",
        deliverables: ["Product Design", "Interaction Design", "Prototypes", "Design System"],
        link: { label: "View Website", href: "https://brooracle.com/" },
        media: [
          { type: "image", src: "assets/wgd-uiux/brooracle.png", tall: true },
        ] },
    ] },
  { n: "04", key: "ai", title: "AI Systems & Automation", tag: "AI",
    subtitle: "Workflows that do the heavy lifting",
    body: "Custom AI workflows and agents woven into the design process\u2014quietly handling the heavy lifting so the creative work stays front and center. Built to scale a one-person studio into something that moves like a full team.",
    projects: [
      { client: "Act-On", name: "Brand Coach",
        body: "A Next.js application that leverages AI to analyze content against brand guidelines, ensuring messaging consistency and impact. The tool delivers comprehensive analysis of voice, tone, and audience targeting through an intuitive interface built with TypeScript and modern web technologies.",
        deliverables: ["React App", "LLM Integration", "TypeScript"],
        link: { label: "Github", href: "https://github.com/danhilse/brand-coach" },
        media: [
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/ai/bc1_1.mp4" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/ai/bc2_1.mp4" },
          { type: "image", src: "https://framerusercontent.com/images/ItZer2MuJ7wJ9wPWmEbVGDUt6jo.jpg" },
        ] },
      { client: "Act-On", name: "Blog Analysis",
        body: "AI-powered Python scripts that streamline blog content management by auditing brand alignment, SEO optimization, and content categorization. The system automatically analyzes tone, quality, and performance metrics, then surfaces actionable insights through detailed Excel reports.",
        deliverables: ["Python", "Spreadsheet", "Categorization"],
        link: { label: "Github", href: "https://github.com/danhilse/blog-analysis" },
        media: [
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/blog/blog1.mp4" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/blog/blog2.mp4" },
          { type: "video", src: "https://infinitsite.s3.us-east-2.amazonaws.com/blog/blog3.mp4" },
        ] },
    ] },
];

function WgdMedia({ m, i }) {
  const ref = useWgdRef(null);
  useWgdEffect(() => {
    const el = ref.current;
    if (!el || m.type !== "video") return;
    el.muted = true;                 // attribute form React omits — required for autoplay
    el.setAttribute("muted", "");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
        else el.pause();
      });
    }, { rootMargin: "200px 0px", threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [m.type]);

  if (m.type === "video") {
    return (
      <div className="wgd-media wgd-media--video">
        <video ref={ref} src={m.src} loop playsInline preload="none"></video>
      </div>
    );
  }
  return (
    <div className={"wgd-media" + (m.tall ? " wgd-media--tall" : "")}>
      <img src={m.src} alt="" loading="lazy" />
    </div>
  );
}

function WgdProject({ p }) {
  return (
    <article className="wgd-proj">
      <div className="wgd-proj__copy">
        <h3 className="wgd-proj__client">{p.client}</h3>
        <p className="wgd-proj__name">{p.name}</p>
        <p className="wgd-proj__body">{p.body}</p>
        <div className="wgd-proj__foot">
          <div className="wgd-proj__col">
            <span className="wgd-proj__coltitle">Deliverables</span>
            <ul className="wgd-proj__list">
              {p.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <div className="wgd-proj__col">
            <span className="wgd-proj__coltitle">Link</span>
            <a className="wgd-proj__link" href={p.link.href} target="_blank" rel="noreferrer">{p.link.label}</a>
          </div>
        </div>
      </div>
      <div className="wgd-proj__media">
        {p.media.map((m, i) => <WgdMedia key={i} m={m} i={i} />)}
      </div>
    </article>
  );
}

function WgdCategory({ cat }) {
  return (
    <section className="wgd-cat" data-screen-label={cat.title}>
      <div className="wgd-cat__head">
        <span className="wgd-cat__n">{cat.n}</span>
        <h2 className="wgd-cat__title ab-textured">{cat.title}</h2>
        <p className="wgd-cat__subtitle">{cat.subtitle}</p>
        <p className="wgd-cat__body">{cat.body}</p>
      </div>
      <div className="wgd-cat__projects">
        {cat.projects.map((p) => <WgdProject key={p.client + p.name} p={p} />)}
      </div>
    </section>
  );
}

function WgdApp() {
  const heroRef = useWgdRef(null);
  const galleryRef = useWgdRef(null);
  useWgdEffect(() => {
    const gal = galleryRef.current;
    if (!gal) return;
    const run = () => {
      gal.style.transform = window.innerWidth < 768 ? "none" : "rotate(-12deg) scale(1.28)";
    };
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  const wgdTiles = [1, 2, 3, 4, 5, 6, 7].map((n) => WGD_R("wgdTile" + n, "assets/wgd-hero/tile" + n + ".png"));
  const heroCols = [
    [wgdTiles[0], wgdTiles[3], wgdTiles[6], wgdTiles[2]],
    [wgdTiles[1], wgdTiles[4], wgdTiles[0], wgdTiles[5]],
    [wgdTiles[2], wgdTiles[5], wgdTiles[3], wgdTiles[1]],
    [wgdTiles[3], wgdTiles[6], wgdTiles[1], wgdTiles[4]],
    [wgdTiles[4], wgdTiles[0], wgdTiles[5], wgdTiles[6]],
  ];

  const go = (label) => {
    const map = {
      Home: "index.html", About: "About.html", Portfolio: "Portfolio.html",
      "Work With Ted": "work-with-ted.html", Contact: "contact.html",
    };
    if (map[label]) window.location.href = map[label];
  };

  return (
    <div className="wgd-page">
      <Header active="Portfolio" onNav={go} onCta={() => { window.location.href = "index.html"; }} />

      {/* HERO — drifting tilted gallery of live site designs */}
      <header className="wgd-hero" data-screen-label="Web &amp; Graphic Design — Hero" ref={heroRef}>
        <div className="wgd-hero__gallery" aria-hidden="true" ref={galleryRef}>
          {heroCols.map((col, ci) => (
            <div className={"wgd-hero__col" + (ci % 2 === 1 ? " wgd-hero__col--mid" : "")} key={ci}>
              <div className={"wgd-hero__track" + (ci % 2 === 1 ? " wgd-hero__track--down" : "")}>
                {col.concat(col).map((src, ti) => (
                  <div className="wgd-hero__tile" key={ti}><img src={src} alt="" loading="lazy" /></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="wgd-hero__veil" aria-hidden="true"></div>
        <div className="wgd-hero__band" aria-hidden="true"></div>
        <div className="wgd-hero__aura" aria-hidden="true"></div>
        <div className="wgd-hero__inner">
          <p className="ab-eyebrow">Portfolio · Digital</p>
          <h1 className="wgd-hero__title ab-textured">AI, Web &amp; Graphic Design</h1>
          <p className="wgd-hero__sub">
            Designing digital experiences where storytelling, branding, and technology become one.
          </p>
        </div>
        <div className="wgd-hero__cue" aria-hidden="true"><span>Scroll</span><span className="bar"></span></div>
        <div className="wgd-hero__fade" aria-hidden="true"></div>
      </header>

      {/* CATEGORIES */}
      <div className="wgd-cats">
        {WGD_CATS.map((cat) => <WgdCategory key={cat.key} cat={cat} />)}
      </div>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WgdApp />);
