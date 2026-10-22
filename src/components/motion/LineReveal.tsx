"use client";

import { useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { whenReady } from "@/lib/ready";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  /** "ready" plays as soon as the brand is ready; "view" plays when scrolled into view. */
  on?: "ready" | "view";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Line-by-line text reveal: each line slides up out of a mask. Reserved for the
 * hero and key statements. The text is real, server-rendered content (fast first
 * paint, readable by search engines and screen readers). Once scripts load it is
 * split into lines, parked out of view, and revealed when the brand is ready.
 *
 * To keep the page light, the text-splitting code loads on demand, and "view"
 * headings are only split shortly before they scroll into sight.
 */
export function LineReveal({
  text,
  as = "div",
  on = "ready",
  className,
  delay = 0,
  stagger = 0.11,
  duration = 1.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.visibility = "visible";
      return;
    }

    let cancelled = false;
    let revealed = false;
    let lines: Element[] = [];
    let tween: gsap.core.Tween | null = null;
    let revert: () => void = () => undefined;
    const observers: IntersectionObserver[] = [];

    const play = () => {
      revealed = true;
      tween = gsap.to(lines, { yPercent: 0, duration, delay, stagger, ease: "expo.out" });
    };

    const start = async () => {
      const { SplitText } = await import("gsap/SplitText");
      if (cancelled) return;
      gsap.registerPlugin(SplitText);

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          lines = self.lines;
          if (!revealed) gsap.set(lines, { yPercent: 115 });
          el.style.visibility = "visible";
        },
      });
      revert = () => split.revert();

      await whenReady();
      if (cancelled) return;
      if (on === "view") {
        const watcher = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              watcher.disconnect();
              play();
            }
          },
          { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
        );
        observers.push(watcher);
        watcher.observe(el);
      } else {
        play();
      }
    };

    if (on === "view") {
      // Split only when the heading is within about one screen of being seen.
      const near = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            near.disconnect();
            void start();
          }
        },
        { rootMargin: "0px 0px 100% 0px" },
      );
      observers.push(near);
      near.observe(el);
    } else {
      void start();
    }

    return () => {
      cancelled = true;
      observers.forEach((o) => o.disconnect());
      tween?.kill();
      revert();
    };
  }, [text, on, delay, stagger, duration]);

  const Tag: ElementType = as;
  return (
    <Tag ref={ref} className={cn("lr", className)}>
      {text}
    </Tag>
  );
}
