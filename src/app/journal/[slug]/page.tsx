import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { articles } from "@/content/journal";
import { JsonLd } from "@/components/JsonLd";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArticleBody } from "@/components/ui/ArticleBody";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";


export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          author: brand.founders.map((f) => ({ "@type": "Person", name: f.name })),
          publisher: { "@type": "Organization", name: brand.name, url: absoluteUrl("/") },
          mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
        }}
      />
      <PageHero title={article.title}>
        <p className="mt-8 text-small text-ink-muted">
          {formatDate(article.date)}. {article.readingTime}
        </p>
      </PageHero>
      <Section className="!pt-0">
        <Container>
          <ArticleBody blocks={article.body} />
          <div className="mt-16">
            <TransitionLink
              href="/journal"
              className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900"
            >
              All guides
            </TransitionLink>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
