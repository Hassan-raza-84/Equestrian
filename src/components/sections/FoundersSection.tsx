import { brand } from "@/config/brand";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container, Section } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHead } from "@/components/ui/SectionHead";

export function FoundersSection() {
  return (
    <Section>
      <Container>
        <SectionHead
          title="You deal with the people who build it."
          lead="Two founders, one niche, and a direct line to both of us."
        />
        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 sm:grid-cols-2 lg:max-w-[52rem]">
          {brand.founders.map((founder) => (
            <div key={founder.name}>
              <MediaFrame alt="" ratio="4 / 5" caption="Portrait to come" />
              <h3 className="mt-5 font-display text-display-md text-green-900">{founder.name}</h3>
              <p className="text-ink-muted">{founder.role}</p>
              <p className="mt-2 text-ink-muted">
                <Copy text="[VERIFY: one line about this founder]" />
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <TransitionLink href="/about" className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900">
            Our story
          </TransitionLink>
        </div>
      </Container>
    </Section>
  );
}
