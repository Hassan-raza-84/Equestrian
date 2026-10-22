import { Container, Section } from "./Container";
import { Copy } from "./Copy";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero title={title} lead={intro} />
      <Section className="!pt-0">
        <Container>
          <p className="mb-12 max-w-[40rem] text-small">
            <span className="verify">Template: have this reviewed by a professional before launch.</span>
          </p>
          <div className="max-w-[40rem]">
            {sections.map((s) => (
              <section key={s.heading} className="mb-12">
                <h2 className="mb-4 font-display text-display-md text-green-900">{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="my-4">
                    <Copy text={p} />
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
