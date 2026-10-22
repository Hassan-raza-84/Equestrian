"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { brand } from "@/config/brand";
import { BrandMark } from "@/components/brand/BrandMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { getLenis } from "@/components/motion/SmoothScroll";

/**
 * Full-screen menu on the native <dialog> element: focus is trapped, Escape closes it
 * and the page behind is inert, with no library needed.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const items = [{ label: "Home", href: "/" }, ...brand.nav, { label: brand.cta.label, href: brand.cta.href }];

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.dataset.state = "open";
    dialog.showModal();
    setOpen(true);
    getLenis()?.stop();
  };

  const closeMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;
    dialog.dataset.state = "closed";
    setOpen(false);
    getLenis()?.start();
    const finish = () => dialog.close();
    const onEnd = (event: AnimationEvent) => {
      if (event.target === dialog) {
        dialog.removeEventListener("animationend", onEnd);
        finish();
      }
    };
    dialog.addEventListener("animationend", onEnd);
    window.setTimeout(() => {
      dialog.removeEventListener("animationend", onEnd);
      if (dialog.open) finish();
    }, 700);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      closeMenu();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [closeMenu]);

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        className="-mr-2 inline-flex min-h-12 min-w-12 items-center justify-center gap-3 px-2 text-[0.72rem] uppercase tracking-[0.2em] text-green-900 lg:hidden"
      >
        <span>Menu</span>
        <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        data-lenis-prevent
        className="menu-panel text-cream-100"
      >
        <div className="flex h-full flex-col">
          <div className="mx-auto flex h-24 w-full max-w-page items-center justify-between px-gutter">
            <div className="flex items-center gap-3 text-cream-100">
              <BrandMark className="h-auto w-10" />
              <Wordmark />
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="-mr-2 inline-flex min-h-12 min-w-12 items-center justify-center px-2 text-[0.72rem] uppercase tracking-[0.2em]"
            >
              Close
            </button>
          </div>

          <nav aria-label="Menu" className="mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-gutter pb-16">
            <ul className="flex flex-col gap-2">
              {items.map((item, index) => (
                <li key={item.href} className="menu-line" style={{ "--i": index } as CSSProperties}>
                  <TransitionLink
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-1 font-display text-display-lg text-cream-100 transition-colors duration-300 hover:text-cream-300"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
