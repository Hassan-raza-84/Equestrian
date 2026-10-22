import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { Container, Section } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "About",
  description: "We are Raza and Rehman. We build websites and automation for equestrian businesses, and only for equestrian businesses.",
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "Reply fast.", text: "A buyer’s patience is short. Everything we build is aimed at getting a useful answer to them in minutes." },
  { title: "Present well.", text: "A good horse deserves a page that does it justice: clear facts, honest words, proper photographs and video." },
  { title: "Say plainly.", text: "No jargon and no surprises. We tell you what we can do, what we cannot, and what it will cost." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We build for people who sell horses."
        lead="We are Raza and Rehman. We build websites and automation for equestrian businesses, and only for equestrian businesses."
      />

      <Section className="!pt-0">
        <Container>
          <SectionHead title="Why equestrian." />
          <div className="mt-10 max-w-[40rem] text-lead text-ink-muted">
            <p>
              <Copy text="[VERIFY: your real connection to the equestrian world, and why you chose to work only in it. Two or three honest sentences.]" />
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream-50">
        <Container>
          <SectionHead title="How we think." />
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 md:grid-cols-3 md:gap-12">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-green-900/40 pt-6">
                <h3 className="font-display text-display-md text-green-900">{p.title}</h3>
                <p className="mt-4 text-ink-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead title="The people." />
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 sm:grid-cols-2 lg:max-w-[52rem]">
            {brand.founders.map((founder) => (
              <div key={founder.name}>
                <MediaFrame alt="" ratio="4 / 5" caption="Portrait to come" />
                <h3 className="mt-5 font-display text-display-md text-green-900">{founder.name}</h3>
                <p className="text-ink-muted">{founder.role}</p>
                <p className="mt-3 text-ink-muted">
                  <Copy text="[VERIFY: a short, personal bio]" />
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
