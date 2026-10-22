import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[1.35rem] leading-none font-normal tracking-[-0.01em]",
        className,
      )}
    >
      {brand.name}
    </span>
  );
}
