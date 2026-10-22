import { brand } from "@/config/brand";
import { LineReveal } from "@/components/motion/LineReveal";
import { HeroScene } from "@/components/mock/HeroScene";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";

export function Hero() {
  return (
    <Section className="pt-[clamp(3rem,7vw,6rem)] pb-[clamp(4rem,8vw,8rem)]">
      <Container>
        <LineReveal as="h1" text={brand.tagline} className="max-w-[20ch] font-display text-display-xl text-green-900" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[34rem] text-lead text-ink-muted lg:col-span-6">
            Websites and automation for equestrian businesses, built so every serious buyer hears back in minutes.
          </p>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Button href={brand.cta.href}>{brand.cta.label}</Button>
            <Button href="/work" variant="secondary">
              See the work
            </Button>
          </div>
        </div>
        <div className="mt-[clamp(3.5rem,7vw,6.5rem)]">
          <HeroScene />
        </div>
      </Container>
    </Section>
  );
}
