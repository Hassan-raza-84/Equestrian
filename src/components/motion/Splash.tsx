"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BrandMark } from "@/components/brand/BrandMark";
import { setReady } from "@/lib/ready";
import { getLenis } from "./SmoothScroll";

const STORAGE_KEY = "brand-splash";

/**
 * Brand splash. A black screen, the mark alone fades in smoothly, holds, then
 * everything fades away into the page. Plays once per session (about 2.4 s), is
 * skippable with a click or any key, and never plays with reduced motion. The page
 * renders underneath, so it does not delay first paint.
 */
export function Splash() {
  const [run, setRun] = useState(0);
  const [active, setActive] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const finish = useCallback(() => {
    document.documentElement.classList.remove("splash-lock");
    getLenis()?.start();
    setActive(false);
    setReady(true);
  }, []);

  // Lets the design-system page replay the splash for review.
  useEffect(() => {
    const replay = () => {
      document.documentElement.setAttribute("data-splash", "play");
      document.documentElement.classList.add("splash-lock");
      getLenis()?.stop();
      setReady(false);
      setActive(true);
      setRun((n) => n + 1);
    };
    window.addEventListener("brand:splash-replay", replay);
    return () => window.removeEventListener("brand:splash-replay", replay);
  }, []);

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    if (!root) return;

    if (document.documentElement.getAttribute("data-splash") === "skip") {
      setReady(true);
      queueMicrotask(() => setActive(false));
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable: the splash simply plays on every load */
    }
    getLenis()?.stop();

    gsap.set(root, { opacity: 1, pointerEvents: "auto" });
    gsap.set(markRef.current, { opacity: 0, scale: 0.97 });

    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;
    tl.to(markRef.current, { opacity: 1, scale: 1, duration: 1.15, ease: "power2.out" }, 0.25)
      .addLabel("out", 1.65)
      .set(root, { pointerEvents: "none" }, "out")
      // The headline starts rising while the splash is still fading.
      .call(() => setReady(true), [], "out+0.25")
      .to(root, { opacity: 0, duration: 0.85, ease: "power1.inOut" }, "out");

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [active, run, finish]);

  // Click or any key jumps straight to the fade-out.
  useEffect(() => {
    if (!active) return;
    const skip = () => {
      const tl = tlRef.current;
      if (!tl || tl.time() >= tl.labels.out) return;
      tl.pause();
      tl.tweenTo("out", { duration: 0.25, ease: "power2.out", onComplete: () => void tl.play() });
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      id="splash"
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night"
    >
      <div ref={markRef} style={{ opacity: 0 }} className="w-[clamp(4.5rem,8vw,7.5rem)] text-cream-100">
        <BrandMark className="block h-auto w-full" />
      </div>
    </div>
  );
}
