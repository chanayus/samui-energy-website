import { animate, inView, scroll, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.33.0/+esm";

export { animate, inView, scroll, stagger };

export const defaultEase = [0.25, 1, 0.5, 1];

const sections = document.querySelectorAll("[data-reveal]:not([data-text-split])");
const splitTextSections = document.querySelectorAll("[data-text-split]");

function createSplitPart(text) {
  const part = document.createElement("span");

  part.textContent = text;
  part.dataset.textSplitPart = "";
  part.style.display = "inline-block";

  return part;
}

function createSplitWord() {
  const word = document.createElement("span");

  word.dataset.textSplitWord = "";
  word.style.display = "inline-block";
  word.style.whiteSpace = "nowrap";

  return word;
}

function segmentCharacters(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

function splitTextContent(element, mode = "words") {
  if (element.dataset.textSplitReady === "true") {
    return Array.from(element.querySelectorAll("[data-text-split-part]"));
  }

  const sourceText = element.textContent;

  if (!sourceText?.trim()) {
    return [];
  }

  const fragment = document.createDocumentFragment();
  const parts = sourceText.split(/(\s+)/);

  element.textContent = "";

  parts.forEach((part) => {
    if (!part) {
      return;
    }

    if (/\s+/.test(part)) {
      fragment.append(document.createTextNode(part));
      return;
    }

    if (mode === "chars") {
      const word = createSplitWord();

      segmentCharacters(part).forEach((character) => {
        word.append(createSplitPart(character));
      });

      fragment.append(word);
      return;
    }

    fragment.append(createSplitPart(part));
  });

  element.append(fragment);
  element.dataset.textSplitReady = "true";

  return Array.from(element.querySelectorAll("[data-text-split-part]"));
}

sections.forEach((section) => {
  const amount = Number(section.getAttribute("data-amount")) || 1;
  const delay = Number(section.getAttribute("data-delay")) || 0;
  const duration = Number(section.getAttribute("data-duration")) || 1;
  const type = section.getAttribute("data-type") || "default";

  const animationTypes = {
    default: [
      { opacity: 0, y: 18, filter: "blur(2px)" },
      { opacity: [0, 1], y: [18, 0], filter: ["blur(2px)", "blur(0px)"] },
    ],
    card: [{ opacity: 0, scaleY: 0.7 }, { opacity: [0, 1], scaleY: [0.7, 1] }],
  };

  animate(section, animationTypes[type][0], { duration: 0 });
  inView(
    section,
    () => {
      animate(section, animationTypes[type][1], {
        duration: type === "card" ? 0.5 : duration,
        easing: defaultEase,
        delay: delay,
      });
    },
    { amount: type === "card" ? 0.2 : amount },
  );
});

export function animateTextSplit(element) {
  const mode = element.getAttribute("data-text-split") || "chars";
  const amount = Number(element.getAttribute("data-amount")) || 1;
  const delay = Number(element.getAttribute("data-delay")) || 0;
  const duration = Number(element.getAttribute("data-duration")) || 0.5;
  const splitDelay = Number(element.getAttribute("data-stagger")) || 0.005;
  const parts = splitTextContent(element, mode);

  if (!parts.length) {
    return;
  }

  animate(parts, { opacity: 0, y: 18, filter: "blur(2px)" }, { duration: 0 });
  inView(
    element,
    () => {
      animate(
        parts,
        {
          opacity: [0, 1],
          y: [18, 0],
          filter: ["blur(2px)", "blur(0px)"],
        },
        {
          duration: duration,
          easing: defaultEase,
          delay: stagger(splitDelay, { startDelay: delay }),
        },
      );
    },
    { amount: amount },
  );
}

splitTextSections.forEach((section) => {
  animateTextSplit(section);
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
