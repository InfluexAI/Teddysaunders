// Laurel.jsx — single laurel/wheat branch emblem (client-supplied SVG).
// The default renders the LEFT branch (leaves opening toward the text on its
// right); `flip` mirrors it horizontally for the RIGHT branch.
function Laurel({ flip, className }) {
  return (
    <img
      className={"award__laurel " + (className || "")}
      src="assets/laurel.svg"
      alt=""
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    />
  );
}
window.Laurel = Laurel;
