import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.33.0/+esm";

export { animate, inView, scroll, stagger };

export const defaultEase = [0.25, 1, 0.5, 1];

const sections = document.querySelectorAll("[data-reveal]");

sections.forEach((section) => {
  const amount = Number(section.getAttribute("data-amount")) || 0.3;
  const delay = Number(section.getAttribute("data-delay")) || 0;
  const duration = Number(section.getAttribute("data-duration")) || 1;

  animate(section, { opacity: 0, y: 25 }, { duration: 0 });
  inView(
    section,
    () => {
      animate(
        section,
        { opacity: [0, 1], y: [25, 0] },
        {
          duration: duration,
          easing: defaultEase,
          delay: delay,
        },
      );
    },
    { amount: amount },
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
      console.log("match");
      enable();
    } else {
      console.log("unmatch");
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
