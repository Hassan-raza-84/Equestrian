"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useRouteTransition } from "./RouteTransition";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

const EXTERNAL = /^(https?:|mailto:|tel:)/;

/** A Link that plays the brand curtain transition for internal navigation. */
export function TransitionLink({ href, onClick, target, ...rest }: Props) {
  const { navigate } = useRouteTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (target && target !== "_self") return;
    if (EXTERNAL.test(href) || href.startsWith("#")) return;
    event.preventDefault();
    navigate(href);
  };

  return <Link href={href} target={target} onClick={handleClick} {...rest} />;
}
