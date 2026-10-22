import { services } from "@/content/services";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container, Section } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { SectionHead } from "@/components/ui/SectionHead";

export function ServiceBlock({
  service,
  linked = false,
  level = "h3",
}: {
  service: (typeof services)[number];
  linked?: boolean;
  /** Use "h2" when the block follows the page heading directly. */
  level?: "h2" | "h3";
}) {
  const Heading = level;
  const Label = level === "h2" ? "h3" : "h4";
  return (
    <article className="grid gap-10 border-t border-green-900/40 py-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="text-small text-ink-muted">{service.name}</p>
        <Heading className="mt-3 font-display text-display-md text-green-900">{service.headline}</Heading>
        {linked && (
          <div className="mt-8">
            <TransitionLink
              href="/services"
              className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900"
            >
              See the detail
            </TransitionLink>
          </div>
        )}
      </div>
      <div className="grid gap-8 lg:col-span-6 lg:col-start-7">
        <div>
          <Label className="text-small font-medium text-ink-muted">The problem</Label>
          <p className="mt-2">{service.problem}</p>
        </div>
        <div>
          <Label className="text-small font-medium text-ink-muted">What we build</Label>
          <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-brass">
            {service.build.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <Label className="text-small font-medium text-ink-muted">What changes</Label>
          <p className="mt-2">{service.change}</p>
          <p className="mt-3 text-ink-muted">
            <Copy text={service.proof} />
          </p>
        </div>
      </div>
    </article>
  );
}

export function ServicesOverview() {
  return (
    <Section>
      <Container>
        <SectionHead
          title="Two things, done properly."
          lead="Websites that present each horse at its best, and automation that answers every enquiry."
        />
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          {services.map((service) => (
            <ServiceBlock key={service.id} service={service} linked />
          ))}
        </div>
      </Container>
    </Section>
  );
}
