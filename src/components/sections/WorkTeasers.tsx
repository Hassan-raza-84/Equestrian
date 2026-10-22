import { caseStudies } from "@/content/work";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container, Section } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHead } from "@/components/ui/SectionHead";

export function WorkCard({
  study,
  level = "h3",
}: {
  study: (typeof caseStudies)[number];
  /** Use "h2" when the card follows the page heading directly. */
  level?: "h2" | "h3";
}) {
  const Heading = level;
  return (
    <TransitionLink href={`/work/${study.slug}`} className="group block">
      <MediaFrame alt="" ratio="4 / 3" caption="Project imagery to come" />
      <p className="mt-5 text-small text-ink-muted">
        <Copy text={study.sector} />
        {study.placeholder && <span className="verify ml-3">Placeholder</span>}
      </p>
      <Heading className="mt-2 font-display text-display-md text-green-900">
        <Copy text={study.client} />
      </Heading>
      <p className="mt-3 text-ink-muted">
        <Copy text={study.summary} />
      </p>
      <p className="mt-4 text-green-900">
        <span className="link-underline pb-0.5">
          <Copy text={`${study.results[0].value} ${study.results[0].label}`} />
        </span>
      </p>
    </TransitionLink>
  );
}

export function WorkTeasers() {
  return (
    <Section className="bg-cream-50">
      <Container>
        <SectionHead
          title="Results, not promises."
          lead="A few of the yards and businesses we have worked with, and what changed for them."
        />
        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-14 md:grid-cols-3 md:gap-10">
          {caseStudies.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
