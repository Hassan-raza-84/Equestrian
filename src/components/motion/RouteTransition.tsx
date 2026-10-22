"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { setReady } from "@/lib/ready";
import { getLenis } from "./SmoothScroll";

type Api = {
  /** Navigate with the transition (falls back to a plain push). */
  navigate: (href: string) => void;
  /** Play the transition without navigating, for design review. */
  preview: () => void;
};

const Ctx = createContext<Api | null>(null);

export function useRouteTransition(): Api {
  const api = useContext(Ctx);
  if (!api) throw new Error("useRouteTransition must be used inside <RouteTransition>");
  return api;
}

/** Moves focus to the visible page heading. Next keeps visited routes mounted but hidden. */
function focusHeading(): void {
  const heading = Array.from(document.querySelectorAll<HTMLElement>("main h1")).find((el) => el.checkVisibility());
  if (!heading || document.activeElement === heading) return;
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

const waitFor = (target: gsap.core.Animation) =>
  new Promise<void>((resolve) => target.eventCallback("onComplete", () => resolve()));

/**
 * Page transition in the manner of a fashion house: the page ghosts out to a pale
 * wash, the next page appears beneath it, and the wash lifts. A thin line at the top
 * shows progress. The centre of the wash (data-horse-slot) is reserved for the
 * animated horse; see src/config/horse-motion.ts.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const washRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const runId = useRef(0);
  const busy = useRef(false);
  const running = useRef<gsap.core.Animation | null>(null);
  const resolver = useRef<(() => void) | null>(null);
  const previousPath = useRef(pathname);
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    resolver.current?.();
    resolver.current = null;

    // Headings stay hidden until their reveal starts, and hidden elements cannot take
    // focus, so try again shortly after the page has appeared.
    requestAnimationFrame(focusHeading);
    window.setTimeout(focusHeading, 160);
  }, [pathname]);

  useEffect(() => {
    if (washRef.current) gsap.set(washRef.current, { opacity: 0, visibility: "hidden" });
    if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0, opacity: 0, transformOrigin: "0 50%" });
    return () => {
      running.current?.kill();
    };
  }, []);

  const play = useCallback(
    async (href: string | null) => {
      const wash = washRef.current;
      const line = lineRef.current;
      if (!wash || !line) {
        if (href) router.push(href);
        return;
      }

      // A new request while one is running ends the old one and goes straight through.
      if (busy.current) {
        runId.current += 1;
        running.current?.kill();
        gsap.set(wash, { opacity: 0, visibility: "hidden" });
        gsap.set(line, { opacity: 0 });
        busy.current = false;
        setReady(true);
        if (href) router.push(href);
        return;
      }

      const id = ++runId.current;
      busy.current = true;
      setReady(false);
      getLenis()?.stop();

      gsap.set(wash, { visibility: "visible", opacity: 0 });
      gsap.set(line, { scaleX: 0, opacity: 1 });
      const navigated = href
        ? new Promise<void>((resolve) => {
            resolver.current = resolve;
          })
        : null;

      const cover = gsap.timeline();
      running.current = cover;
      // The page ghosts to a pale wash. It stays faintly visible, like a held breath.
      cover.to(wash, { opacity: 0.94, duration: 0.34, ease: "power1.out" }, 0);
      cover.to(line, { scaleX: 0.72, duration: 0.4, ease: "power2.out" }, 0);
      // Only navigate once the wash is nearly opaque, so nothing flashes.
      cover.call(() => {
        if (href) router.push(href);
      }, [], 0.34);

      await waitFor(cover);
      if (id !== runId.current) return;
      if (navigated) {
        await Promise.race([navigated, new Promise<void>((r) => setTimeout(r, 2500))]);
        if (id !== runId.current) return;
      }

      window.scrollTo(0, 0);
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      setReady(true);
      window.setTimeout(focusHeading, 90);

      const reveal = gsap.timeline();
      running.current = reveal;
      reveal.to(line, { scaleX: 1, duration: 0.18, ease: "power1.out" }, 0);
      reveal.to(wash, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 0.08);
      reveal.to(line, { opacity: 0, duration: 0.2 }, 0.3);
      await waitFor(reveal);
      if (id !== runId.current) return;

      gsap.set(wash, { visibility: "hidden" });
      getLenis()?.start();
      busy.current = false;
    },
    [router],
  );

  const navigate = useCallback(
    (href: string) => {
      if (prefersReducedMotion() || href === pathRef.current) {
        router.push(href);
        return;
      }
      void play(href);
    },
    [play, router],
  );

  const preview = useCallback(() => {
    if (prefersReducedMotion()) return;
    void play(null);
  }, [play]);

  const api = useMemo<Api>(() => ({ navigate, preview }), [navigate, preview]);

  return (
    <Ctx.Provider value={api}>
      {children}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[91] h-[2px]">
        <div ref={lineRef} className="h-full w-full bg-green-900" />
      </div>
      <div
        ref={washRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-cream-50"
        style={{ visibility: "hidden" }}
      >
        {/* Reserved for the animated horse. Empty until the artwork is supplied. */}
        <div data-horse-slot className="w-[min(34vw,22rem)]" />
      </div>
    </Ctx.Provider>
  );
}
