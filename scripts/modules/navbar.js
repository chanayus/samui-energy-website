const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const mobileNav = document.querySelector("#mobile-nav");

let menuEnabled = false;

mobileNavToggle?.addEventListener("click", () => {
  menuEnabled = !menuEnabled;

  mobileNavToggle.classList.toggle("active");
  mobileNav.classList.toggle("active");
});
