import { audiences } from "@/content/audiences";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container, Section } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export function AudiencesSection() {
  return (
    <Section className="bg-cream-50">
      <Container>
        <SectionHead
          title="Built for the equestrian world, and only for it."
          lead="We start with horse sellers and grow carefully from there."
        />
        <ul className="mt-[clamp(3rem,6vw,5rem)] grid border-t border-green-900/40 md:grid-cols-2">
          {audiences.map((audience) => (
            <li key={audience.slug} className="border-b border-cream-300 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              {audience.active ? (
                <TransitionLink href={`/for/${audience.slug}`} className="group block py-7">
                  <span className="font-display text-display-md text-green-900">{audience.name}</span>
                  <span className="mt-2 block text-ink-muted">{audience.line}</span>
                  <span className="link-underline mt-4 inline-block py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900">
                    Where we start
                  </span>
                </TransitionLink>
              ) : (
                <div className="py-7">
                  <span className="font-display text-display-md text-green-900/55">{audience.name}</span>
                  <span className="mt-2 block text-ink-muted">{audience.line}</span>
                  <span className="mt-4 inline-block text-small text-ink-muted">Coming soon</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
