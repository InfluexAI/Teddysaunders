// Testimonials.jsx — three-up bronze pull-quotes with vertical
// hairline separators between them (matching Featured Work section spec).
function Testimonials() {
  const items = [
    {
      body: "Ten years later, I still come here when the world gets dark and my soul needs a hug.",
      by:   "@FeatherzMcG",
    },
    {
      body: "I really think this is one of the loveliest things on Youtube.",
      by:   "@FeatherzMcG",
    },
    {
      body: "No matter how many times I watch this, it makes me cry every time. I love it more than words can express.",
      by:   "@FeatherzMcG",
    },
  ];
  return (
    <div className="tk-testimonials">
      <Testimonial {...items[0]} />
      <div className="tk-vrule" aria-hidden="true" />
      <Testimonial {...items[1]} />
      <div className="tk-vrule" aria-hidden="true" />
      <Testimonial {...items[2]} />
    </div>
  );
}

function Testimonial({ body, by }) {
  return (
    <div className="tk-testimonial">
      <div className="quote-icon" aria-hidden="true" />
      <div className="body">{body}</div>
      <div className="by">{by}</div>
    </div>
  );
}

window.Testimonials = Testimonials;
window.Testimonial = Testimonial;
