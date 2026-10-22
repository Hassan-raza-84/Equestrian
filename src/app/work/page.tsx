import type { Metadata } from "next";
import { caseStudies } from "@/content/work";
import { WorkCard } from "@/components/sections/WorkTeasers";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from equestrian businesses we have built websites and automation for, with the results that followed.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        title="Results, not promises."
        lead="Every project starts with a problem. Here is what we found, what we built and what changed."
      />
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {caseStudies.map((study) => (
              <WorkCard key={study.slug} study={study} level="h2" />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
