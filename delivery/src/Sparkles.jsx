// Sparkles.jsx — faithful dependency-free port of the tsparticles "Sparkles"
// component (slim). Same prop semantics: density = total particle count, tiny
// twinkling dots that drift in random directions with animated opacity.
const { useRef: useSpRef, useEffect: useSpEffect } = React;

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
  background = "transparent",
}) {
  const ref = useSpRef(null);
  useSpEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // detectRetina
    const rand = (a, b) => a + Math.random() * (b - a);

    const sMin = (minSize != null ? minSize : size / 2.5);
    const sMax = size;
    const spMin = (minSpeed != null ? minSpeed : speed / 10);
    const spMax = speed;
    const oMin = (minOpacity != null ? minOpacity : opacity / 10);
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
    sc.beginPath(); sc.arc(8, 8, 8, 0, Math.PI * 2); sc.fill();

    let W = 0, H = 0, parts = [], raf = 0;
    function build() {
      parts = Array.from({ length: density }, () => {
        const ang = Math.random() * Math.PI * 2;
        const mag = rand(spMin, spMax) * dpr;
        return {
          x: Math.random() * W, y: Math.random() * H,
          r: rand(sMin, sMax) * dpr,
          op: rand(oMin, oMax), dir: Math.random() < 0.5 ? 1 : -1,
          vx: Math.cos(ang) * mag, vy: Math.sin(ang) * mag,
        };
      });
    }
    function resize() {
      W = canvas.clientWidth * dpr; H = canvas.clientHeight * dpr;
      canvas.width = W; canvas.height = H;
      build();
    }
    const step = opacitySpeed / 100;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      if (background && background !== "transparent") { ctx.fillStyle = background; ctx.fillRect(0, 0, W, H); }
      for (const p of parts) {
        p.op += p.dir * step;
        if (p.op >= oMax) { p.op = oMax; p.dir = -1; }
        if (p.op <= oMin) { p.op = oMin; p.dir = 1; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -8) p.x = W + 8; if (p.x > W + 8) p.x = -8;
        if (p.y < -8) p.y = H + 8; if (p.y > H + 8) p.y = -8;
        ctx.globalAlpha = p.op;
        const s = p.r * 2;
        ctx.drawImage(sprite, p.x - s, p.y - s, s * 2, s * 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    resize(); frame();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className={"tk-sparkles" + (className ? " " + className : "")} />;
}

window.Sparkles = Sparkles;
