// Button.jsx — bronze / bronze-strong / outline
function Button({ variant = "bronze", children, onClick, type = "button" }) {
  const cls = "tk-btn tk-btn--" + variant;
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

// PlayTriangle — bronze-gradient triangle inside a circle.
// Used inside .tk-video .play and in iconography previews.
function PlayTriangle({ size = 38, id = "pg" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#BF8753" />
          <stop offset="35%"  stopColor="#FAC288" />
          <stop offset="70%"  stopColor="#C9915C" />
          <stop offset="100%" stopColor="#AB7442" />
        </linearGradient>
      </defs>
      <polygon points="7,4 21,12 7,20" fill={`url(#${id})`} />
    </svg>
  );
}

window.Button = Button;
window.PlayTriangle = PlayTriangle;
