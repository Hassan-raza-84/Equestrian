import type { Metadata } from "next";
import { articles } from "@/content/journal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Journal",
  description: "Practical guides for people who sell horses: replying to enquiries, building a good sales page, and saving time.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <PageHero title="Practical guides for horse sellers." lead="Short, useful and free of jargon." />
      <Section className="!pt-0">
        <Container>
          <ul className="border-t border-green-900/40">
            {articles.map((a) => (
              <li key={a.slug} className="border-b border-cream-300">
                <TransitionLink href={`/journal/${a.slug}`} className="group grid gap-4 py-10 lg:grid-cols-12 lg:gap-12">
                  <p className="text-small text-ink-muted lg:col-span-3">
                    {formatDate(a.date)}. {a.readingTime}
                  </p>
                  <div className="lg:col-span-8">
                    <h2 className="font-display text-display-md text-green-900">{a.title}</h2>
                    <p className="mt-3 max-w-[40rem] text-ink-muted">{a.description}</p>
                  </div>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
