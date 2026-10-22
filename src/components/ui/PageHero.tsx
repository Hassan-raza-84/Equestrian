import type { ReactNode } from "react";
import { LineReveal } from "@/components/motion/LineReveal";
import { Container, Section } from "./Container";
import { Copy } from "./Copy";

export function PageHero({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <Section className="pt-[clamp(3rem,7vw,6rem)] pb-[clamp(3rem,6vw,5.5rem)]">
      <Container>
        <LineReveal as="h1" text={title} className="max-w-[22ch] font-display text-display-lg text-green-900" />
        {lead && (
          <p className="mt-8 max-w-[40rem] text-lead text-ink-muted">
            <Copy text={lead} />
          </p>
        )}
        {children}
      </Container>
    </Section>
  );
}
