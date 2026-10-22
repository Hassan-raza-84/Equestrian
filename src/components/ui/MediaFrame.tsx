"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/cn";

type Props = {
  alt: string;
  src?: string;
  /** CSS aspect-ratio value, for example "4 / 5". Fixed so nothing shifts while loading. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Shown while no photograph is supplied yet. */
  caption?: string;
  /** Holds the loading state open, for design review. */
  forceLoading?: boolean;
  className?: string;
};

/**
 * Image frame with the brand loading state: a tonal block with the mark softly
 * pulsing, then the photograph resolves from blur. Never a blank box or spinner.
 */
export function MediaFrame({
  alt,
  src,
  ratio = "4 / 5",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  caption,
  forceLoading,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Covers images that finished loading before React attached its handler.
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
  }, [src]);

  const showImage = Boolean(src) && loaded && !forceLoading;

  return (
    <figure className={cn("relative m-0 overflow-hidden bg-cream-300", className)} style={{ aspectRatio: ratio }}>
      {!showImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BrandMark className={cn("w-[34%] text-green-700", forceLoading || src ? "mark-pulse" : "opacity-15")} />
        </div>
      )}
      {src && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-[opacity,filter,transform] duration-[900ms] ease-brand",
            showImage ? "scale-100 opacity-100 blur-0" : "scale-[1.03] opacity-0 blur-xl",
          )}
        />
      )}
      {!src && caption && (
        <figcaption className="absolute inset-x-0 bottom-0 p-4 text-small text-ink">{caption}</figcaption>
      )}
    </figure>
  );
}
