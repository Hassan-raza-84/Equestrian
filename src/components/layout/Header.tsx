"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { brand } from "@/config/brand";
import { BrandMark } from "@/components/brand/BrandMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-cream-100 transition-colors duration-500 data-[scrolled=true]:border-cream-300"
    >
      <div className="mx-auto flex h-24 w-full max-w-page items-center justify-between px-gutter">
        <TransitionLink href="/" className="flex items-center gap-3 text-green-700" aria-label={`${brand.name}, home`}>
          <BrandMark className="h-auto w-10" />
          <Wordmark className="text-green-900" />
        </TransitionLink>

        <nav aria-label="Primary" className="hidden items-center gap-9 xl:gap-12 lg:flex">
          {brand.nav.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-ink"
            >
              {item.label}
            </TransitionLink>
          ))}
          <Button href={brand.cta.href}>{brand.cta.label}</Button>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
