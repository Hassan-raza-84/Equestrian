import { LineReveal } from "@/components/motion/LineReveal";
import { cn } from "@/lib/cn";
import { Copy } from "./Copy";

export function SectionHead({
  title,
  lead,
  tone = "light",
  className,
}: {
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <LineReveal
        as="h2"
        on="view"
        text={title}
        className={cn(
          "font-display text-display-lg lg:col-span-7",
          tone === "dark" ? "text-cream-100" : "text-green-900",
        )}
      />
      {lead && (
        <p
          className={cn(
            "max-w-[30rem] text-lead lg:col-span-4 lg:col-start-9 lg:self-end",
            tone === "dark" ? "text-cream-300" : "text-ink-muted",
          )}
        >
          <Copy text={lead} />
        </p>
      )}
    </div>
  );
}
