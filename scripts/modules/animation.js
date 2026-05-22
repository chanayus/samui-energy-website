import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.33.0/+esm";

export { animate, inView, scroll, stagger };

export const defaultEase = [0.25, 1, 0.5, 1];

const sections = document.querySelectorAll("[data-reveal]");

sections.forEach((section) => {
  const amount = Number(section.getAttribute("data-amount")) || 0.25;
  const delay = Number(section.getAttribute("data-delay")) || 0;
  const duration = Number(section.getAttribute("data-duration")) || 1;
  const type = section.getAttribute("data-type") || "default";

  const animationTypes = {
    default: [
      { opacity: 0, y: 18, filter: "blur(2px)" },
      { opacity: [0, 1], y: [18, 0], filter: ["blur(2px)", "blur(0px)"] },
    ],
    card: [
      { opacity: 0, scaleY: 0.7 },
      { opacity: [0, 1], scaleY: [0.7, 1] },
    ],
  };

  const anim = animationTypes[type] ?? animationTypes.default;
  const isCard = type === "card";

  animate(section, anim[0], { duration: 0 });
  inView(
    section,
    () => {
      animate(section, anim[1], {
        duration: isCard ? 0.5 : duration,
        easing: defaultEase,
        delay: delay,
      });
    },
    { amount: isCard ? 0.2 : amount },
  );
});

export function animateBreakpoint(query, callback) {
  const mq = window.matchMedia(query);
  let cleanup = null;

  function enable() {
    cleanup = callback() || null;
  }

  function disable() {
    cleanup?.();
    cleanup = null;
  }

  function onChange(e) {
    if (e.matches) {
      enable();
    } else {
      disable();
    }
  }

  mq.addEventListener("change", onChange);

  // run ครั้งแรก
  mq.matches && enable();

  // global cleanup (กรณี page destroy)
  return () => {
    mq.removeEventListener("change", onChange);
    disable();
  };
}
