"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: id === "top" ? 0 : -24, duration: 1.4 });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -24 } });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
