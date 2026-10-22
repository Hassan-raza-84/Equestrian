import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-page px-gutter", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn("py-section", tone === "dark" ? "bg-green-900 text-cream-100" : "text-ink", className)}
    >
      {children}
    </section>
  );
}
