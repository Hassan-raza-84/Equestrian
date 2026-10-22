import type { Metadata } from "next";
import { Suspense } from "react";
import { brand } from "@/config/brand";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your horses and your yard. We reply within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let’s talk about your horses."
        lead={`Send a few details and we will reply ${brand.responseTime}.`}
      />
      <Section className="!pt-0">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<p className="text-ink-muted">Loading the form.</p>}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="font-display text-display-md text-green-900">Prefer to write directly?</h2>
            <dl className="mt-8 grid gap-6 border-t border-green-900/40 pt-6">
              <div>
                <dt className="text-small text-ink-muted">Email</dt>
                <dd>
                  <a href={`mailto:${brand.email}`} className="link-underline py-1">
                    {brand.email}
                  </a>
                </dd>
              </div>
              {brand.whatsapp && (
                <div>
                  <dt className="text-small text-ink-muted">WhatsApp</dt>
                  <dd>
                    <a href={`https://wa.me/${brand.whatsapp}`} rel="noopener" className="link-underline py-1">
                      Message us
                    </a>
                  </dd>
                </div>
              )}
              {brand.bookingUrl && (
                <div>
                  <dt className="text-small text-ink-muted">Book a call</dt>
                  <dd>
                    <a href={brand.bookingUrl} rel="noopener" className="link-underline py-1">
                      Choose a time
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-small text-ink-muted">We reply</dt>
                <dd>{brand.responseTime}</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </Section>
    </>
  );
}
