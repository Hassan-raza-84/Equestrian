import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { assurance, packages, services } from "@/content/services";
import { JsonLd } from "@/components/JsonLd";
import { ServiceBlock } from "@/components/sections/ServicesOverview";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites and automation for equestrian businesses: a page worth the horse, and every enquiry answered in minutes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": services.map((s) => ({
            "@type": "Service",
            name: s.name,
            description: s.problem,
            provider: { "@type": "Organization", name: brand.name, url: absoluteUrl("/") },
            areaServed: "GB",
          })),
        }}
      />
      <PageHero
        title="Websites and automation, built for horse sellers."
        lead="Each starts with a problem we have seen again and again, and ends with something you can measure."
      />
      <Section className="!pt-0">
        <Container>
          {services.map((service) => (
            <ServiceBlock key={service.id} service={service} level="h2" />
          ))}
        </Container>
      </Section>

      <Section className="bg-cream-50">
        <Container>
          <SectionHead
            title="Choose a starting point."
            lead="Every project is agreed in writing before work begins."
          />
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-px border border-green-900/20 bg-green-900/20 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.id} className="flex flex-col bg-cream-50 p-8 sm:p-10">
                <h3 className="font-display text-display-md text-green-900">{pkg.name}</h3>
                <p className="mt-3 min-h-[4.5rem] text-ink-muted">{pkg.line}</p>
                <dl className="mt-8 grid gap-4 border-t border-cream-300 pt-6">
                  <div>
                    <dt className="text-small text-ink-muted">From</dt>
                    <dd className="font-display text-[1.6rem] text-green-900">
                      <Copy text={pkg.from} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-small text-ink-muted">Timeline</dt>
                    <dd>
                      <Copy text={pkg.timeline} />
                    </dd>
                  </div>
                </dl>
                <ul className="mt-8 flex-1 list-disc space-y-2 pl-5 marker:text-brass">
                  {pkg.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button href={brand.cta.href} variant="secondary">
                    {pkg.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-[44rem] text-ink-muted">
            <Copy text={assurance} />
          </p>
        </Container>
      </Section>

      <FaqSection background={false} />
      <CtaBand />
    </>
  );
}
