"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { isTouchPrimary, prefersReducedMotion } from "@/lib/motion";

let instance: Lenis | null = null;

/** Gives other motion code access to the scroller (for example to reset scroll). */
export function getLenis(): Lenis | null {
  return instance;
}

/** Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    // Smooth-scroll emulation helps mouse wheels. Touch screens scroll better natively.
    if (prefersReducedMotion() || isTouchPrimary()) return;
    let disposed = false;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    instance = lenis;
    if (document.documentElement.classList.contains("splash-lock")) lenis.stop();

    // ScrollTrigger is only needed once scroll-driven sections exist, so it loads after first render.
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      disposed = true;
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
