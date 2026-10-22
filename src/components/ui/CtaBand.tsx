import { brand } from "@/config/brand";
import { LineReveal } from "@/components/motion/LineReveal";
import { Button } from "./Button";
import { Container, Section } from "./Container";

export function CtaBand({
  title = "Tell us about your yard.",
  text = "A short conversation is enough to know whether we can help.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section tone="dark">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <LineReveal
          as="h2"
          on="view"
          text={title}
          className="font-display text-display-lg text-cream-100 lg:col-span-7"
        />
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-lead text-cream-300">{text}</p>
          <div className="mt-8">
            <Button href={brand.cta.href} tone="dark">
              {brand.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
