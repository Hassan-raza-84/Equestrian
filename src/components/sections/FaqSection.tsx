import { faq } from "@/content/faq";
import { Container, Section } from "@/components/ui/Container";
import { Faq } from "@/components/ui/Faq";
import { SectionHead } from "@/components/ui/SectionHead";

export function FaqSection({ background = true }: { background?: boolean }) {
  return (
    <Section className={background ? "bg-cream-50" : undefined}>
      <Container>
        <SectionHead title="Questions we are asked." lead="Straight answers, before you have to ask." />
        <div className="mt-[clamp(3rem,6vw,5rem)] max-w-[56rem]">
          <Faq items={faq} />
        </div>
      </Container>
    </Section>
  );
}
