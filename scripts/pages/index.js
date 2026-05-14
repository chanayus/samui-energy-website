import { animate, scroll, stagger } from "../modules/animation.js";

const items = document.querySelectorAll(".img-container");

const servicesSection = document.querySelector("#services-section");
const bgCards = document.querySelectorAll("#bg-card-container .bg-card");
const serviceCards = document.querySelectorAll("#services-section .service-card");

let bgSequence = [];
let cardSequence = [];

bgCards?.forEach((card, index) => {
  if (index === bgCards.length - 1) return;
  bgSequence.push([card, { opacity: [1, 0], filter: ["blur(0px)", "blur(4px)"] }]);
});

serviceCards?.forEach((card, index) => {
  if (index === 0) {
    cardSequence.push([card, { opacity: [1, 0], scale: [1, 0.95], filter: ["blur(0px)", "blur(2px)"] }]);
  } else if (index === serviceCards.length - 1) {
    cardSequence.push([card, { opacity: [0, 1], scale: [1.05, 1], filter: ["blur(2px)", "blur(0px)"] }]);
  } else {
    cardSequence.push([card, { opacity: [0, 1, 0], scale: [1.05, 1, 0.95], filter: ["blur(2px)", "blur(0px)", "blur(4px)"] }]);
  }
});

// Animate gallery horizontally during vertical scroll

const revertAnimate = () => {
  serviceCards?.forEach((card) => {
    animate(card, { opacity: 1, scale: 1, filter: "blur(0px)" }, { duration: 0 });
  });

  bgCards?.forEach((card) => {
    animate(card, { opacity: 1, scale: 1, filter: "blur(0px)" }, { duration: 0 });
  });
};

let bgAnimate;
let cardAnimate;

const resizeObserver = new ResizeObserver((entries) => {
  if (entries[0].contentRect.width >= 768) {
    bgAnimate = scroll(animate(bgSequence), { target: document.querySelector("#services-section") });
    cardAnimate = scroll(animate(cardSequence), { target: document.querySelector("#services-section") });
  } else {
    bgAnimate && bgAnimate();
    cardAnimate && cardAnimate();
    revertAnimate();
  }
});
resizeObserver.observe(servicesSection);

// Reveal Section Animation

const heroSection = document.querySelector("#hero-section");

const sequence = [
  [heroSection.querySelector("#hero-bg"), { scale: [1.35, 1] }, { at: "+0.5", duration: 3 }],
  [heroSection.querySelector("hgroup span"), { opacity: [0, 1], y: [25, 0] }, { at: "<0.25" }],
  [heroSection.querySelector("hgroup h1"), { opacity: [0, 1], y: [25, 0] }, { at: "<0.25" }],
  [heroSection.querySelector("#video-card"), { opacity: [0, 1], y: [25, 0] }, { at: "<0.1" }],
  [heroSection.querySelectorAll("#info > *"), { opacity: [0, 1], y: [25, 0] }, { at: "<0.25", delay: stagger(0.15) }],
];

animate(sequence, { defaultTransition: { ease: [0.16, 1, 0.3, 1], duration: 1 } });
