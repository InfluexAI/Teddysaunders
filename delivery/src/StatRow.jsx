// StatRow.jsx — bronze stat number + label, with a count-up animation
// from 0 → target on first viewport entry. Parses values like "20+",
// "10m+", "100+", "3" — animates the integer portion, keeps the suffix.

function parseStat(value) {
  const m = String(value).match(/^(\d+)(.*)$/);
  if (!m) return { num: 0, suffix: String(value) };
  return { num: parseInt(m[1], 10), suffix: m[2] };
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
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / durationMs);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // Trigger when in view (or immediately if already in view)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) start(); });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  return [current, elRef];
}

function Stat({ num, lbl }) {
  const { num: target, suffix } = parseStat(num);
  const [val, ref] = useCountUp(target, 1800);
  return (
    <div className="tk-stat" ref={ref}>
      <div className="num">{val}{suffix}</div>
      <div className="lbl">{lbl}</div>
    </div>
  );
}
window.Stat = Stat;
