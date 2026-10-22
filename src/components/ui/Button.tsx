import type { ButtonHTMLAttributes, ReactNode } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Tone = "light" | "dark";

const base =
  "inline-flex min-h-12 items-center justify-center px-8 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-[500ms] ease-brand disabled:cursor-not-allowed disabled:opacity-60";

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-green-900 text-cream-100 hover:bg-green-700",
    secondary: "border border-green-900/60 text-green-900 hover:border-green-900 hover:bg-green-900 hover:text-cream-100",
  },
  dark: {
    primary: "bg-cream-100 text-green-900 hover:bg-cream-50",
    secondary: "border border-cream-300 text-cream-100 hover:bg-cream-100 hover:text-green-900",
  },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  /** "light" sits on cream, "dark" sits on green. */
  tone?: Tone;
  className?: string;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ children, variant = "primary", tone = "light", className, href, ...rest }: Props) {
  const classes = cn(base, styles[tone][variant], className);
  if (href) {
    return (
      <TransitionLink href={href} className={classes}>
        {children}
      </TransitionLink>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
