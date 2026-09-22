import Lenis from "lenis";

export function createLenis() {
  return new Lenis({
    autoRaf: false,
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    anchors: { offset: -96 },
  });
}

