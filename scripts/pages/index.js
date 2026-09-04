import { animate, scroll, stagger } from "../modules/animation.js";

// Reveal Section Animation

const heroSection = document.querySelector("#hero-section");

const sequence = [
  [heroSection.querySelector("#hero-bg"), { scale: [1.35, 1] }, { at: "+0.5", duration: 3 }],
  [heroSection.querySelectorAll(".opacity-0"), { opacity: [0, 1], y: [25, 0] }, { at: "<0.25", delay: stagger(0.15) }],
];

animate(sequence, { defaultTransition: { ease: [0.16, 1, 0.3, 1], duration: 1 } });
