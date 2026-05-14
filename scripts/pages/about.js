import { scroll, animate } from "../modules/animation.js";

// Timeline scroll-driven animation
requestAnimationFrame(() => {
  const timelineEl = document.querySelector("#timelineScroll");
  const railFill = document.querySelector("#timelineRailFill");
  const rail = document.querySelector(".timeline-rail");
  const dots = document.querySelectorAll(".timeline-dot");

  if (!timelineEl || !railFill || !rail || !dots.length) return;

  const railAbsTop = rail.getBoundingClientRect().top + window.scrollY;
  const railH = rail.offsetHeight;

  const thresholds = Array.from(dots).map((dot) => {
    const dotCenter = dot.getBoundingClientRect().top + window.scrollY + dot.offsetHeight / 2;
    return (dotCenter - railAbsTop) / railH;
  });

  scroll(
    (progress) => {
      railFill.style.height = progress * 100 + "%";
      dots.forEach((dot, i) => dot.classList.toggle("is-active", progress >= thresholds[i]));
    },
    { target: timelineEl, offset: ["start center", "end center"] },
  );
});

// Gallery scroll scale animation
const timeline = [
  [".gallery-imgs", { scale: [0.875, 1], opacity: [0, 1], filter: ["blur(2px)", "blur(0px)"] }],
  [".gallery-imgs", { scale: [1, 4] }, { at: "<+0.2" }],
];

scroll(animate(timeline), { target: document.querySelector("#download-section") });

// Mouse parallax — translates .gallery-parallax (separate layer from scroll scale)
const stickyDiv = document.querySelector("#download-section .sticky");
const galleryParallax = document.querySelector(".gallery-parallax");

if (stickyDiv && galleryParallax) {
  let targetX = 0, targetY = 0, x = 0, y = 0;

  function parallaxFrame() {
    x += (targetX - x) * 0.07;
    y += (targetY - y) * 0.07;
    galleryParallax.style.transform = `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px)`;
    requestAnimationFrame(parallaxFrame);
  }

  requestAnimationFrame(parallaxFrame);

  stickyDiv.addEventListener("mousemove", (e) => {
    targetX = ((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 18;
    targetY = ((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * 18;
  });

  stickyDiv.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });
}
