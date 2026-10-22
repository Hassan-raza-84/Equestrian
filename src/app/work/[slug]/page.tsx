import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/work";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container, Section } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { PageHero } from "@/components/ui/PageHero";


export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: `${study.sector} case study`,
    description: "A case study: the problem, what we built and what changed.",
    alternates: { canonical: `/work/${study.slug}` },
    robots: study.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <PageHero title={study.sector}>
        <p className="mt-8 max-w-[40rem] text-lead text-ink-muted">
          <Copy text={study.summary} />
        </p>
        {study.placeholder && (
          <p className="mt-8 max-w-[40rem] text-small">
            <span className="verify">Placeholder case study. Replace every bracketed item with a real client before launch.</span>
          </p>
        )}
        <dl className="mt-12 grid gap-8 border-t border-green-900/40 pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-small text-ink-muted">Client</dt>
            <dd>
              <Copy text={study.client} />
            </dd>
          </div>
          <div>
            <dt className="text-small text-ink-muted">What we did</dt>
            <dd>{study.services.join(" and ")}</dd>
          </div>
          <div>
            <dt className="text-small text-ink-muted">Year</dt>
            <dd>
              <Copy text={study.year} />
            </dd>
          </div>
        </dl>
      </PageHero>

      <Section className="!pt-0">
        <Container>
          <MediaFrame alt="" ratio="16 / 9" caption="Project imagery to come" />
        </Container>
      </Section>

      <Section className="bg-cream-50">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-md text-green-900">The problem</h2>
          </div>
          <p className="text-lead lg:col-span-6 lg:col-start-7">
            <Copy text={study.problem} />
          </p>
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-md text-green-900">What we built</h2>
          </div>
          <p className="text-lead lg:col-span-6 lg:col-start-7">
            <Copy text={study.approach} />
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-display text-display-md text-green-900">What changed</h2>
          <dl className="mt-10 grid gap-10 border-t border-green-900/40 pt-8 md:grid-cols-3">
            {study.results.map((r, i) => (
              <div key={i}>
                <dd className="font-display text-display-lg text-green-900">
                  <Copy text={r.value} />
                </dd>
                <dt className="mt-2 text-ink-muted">
                  <Copy text={r.label} />
                </dt>
              </div>
            ))}
          </dl>
          <figure className="mt-20 max-w-[44rem] border-l border-brass pl-8">
            <blockquote className="font-display text-display-md text-green-900">
              <Copy text={study.quote.text} />
            </blockquote>
            <figcaption className="mt-4 text-ink-muted">
              <Copy text={study.quote.name} />, <Copy text={study.quote.role} />
            </figcaption>
          </figure>
          <div className="mt-20">
            <TransitionLink
              href={`/work/${next.slug}`}
              className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900"
            >
              Next: {next.sector}
            </TransitionLink>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
