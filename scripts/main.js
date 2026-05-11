import "./modules/navbar.js";

document.querySelectorAll(".svg-icon")?.forEach((el) => {
  const src = el.getAttribute("data-src");
  el.style.setProperty("--src", `url(${src})`);
});

const lenis = new Lenis({
  autoRaf: true,
});
