import { problems } from "@/content/process";
import { Container, Section } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export function Problem() {
  return (
    <Section className="bg-cream-50">
      <Container>
        <SectionHead
          title="A good horse can lose a buyer in an afternoon."
          lead="Three things cost sellers more than they realise."
        />
        <div className="mt-[clamp(3rem,6vw,5.5rem)] grid gap-10 md:grid-cols-3 md:gap-12">
          {problems.map((item) => (
            <div key={item.title} className="border-t border-green-900/40 pt-6">
              <h3 className="font-display text-display-md text-green-900">{item.title}</h3>
              <p className="mt-4 text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
