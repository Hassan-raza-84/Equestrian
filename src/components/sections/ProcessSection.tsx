import { process } from "@/content/process";
import { Container, Section } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export function ProcessSection() {
  return (
    <Section>
      <Container>
        <SectionHead title="How we work." lead="Four steps, no surprises, and you approve each one." />
        <ol className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 md:grid-cols-4 md:gap-8">
          {process.map((step, i) => (
            <li key={step.title} className="border-t border-green-900/40 pt-6">
              <span className="font-display text-display-md text-green-700">{i + 1}</span>
              <h3 className="mt-4 font-display text-[1.6rem] text-green-900">{step.title}</h3>
              <p className="mt-3 text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
