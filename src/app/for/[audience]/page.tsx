import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { audiences } from "@/content/audiences";
import { problems } from "@/content/process";
import { services } from "@/content/services";
import { ServiceBlock } from "@/components/sections/ServicesOverview";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";

const active = audiences.filter((a) => a.active);


export function generateStaticParams() {
  return active.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const { audience } = await params;
  const found = active.find((a) => a.slug === audience);
  if (!found) return {};
  return {
    title: `For ${found.name.toLowerCase()}`,
    description: found.line,
    alternates: { canonical: `/for/${found.slug}` },
  };
}

export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params;
  const found = active.find((a) => a.slug === audience);
  if (!found) notFound();

  return (
    <>
      <PageHero title={`For ${found.name.toLowerCase()}.`} lead={found.line}>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact">Book a consultation</Button>
          <Button href="/tools#demo" variant="secondary">
            Try the enquiry demo
          </Button>
        </div>
      </PageHero>

      <Section className="bg-cream-50">
        <Container>
          <SectionHead title="What it costs you today." lead="Three things we see in almost every yard." />
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-10 md:grid-cols-3 md:gap-12">
            {problems.map((item) => (
              <div key={item.title} className="border-t border-green-900/40 pt-6">
                <h3 className="font-display text-display-md text-green-900">{item.title}</h3>
                <p className="mt-4 text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead title="What we build for you." />
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            {services.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection />
      <CtaBand />
    </>
  );
}
