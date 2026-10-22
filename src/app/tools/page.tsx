import type { Metadata } from "next";
import { Audit } from "@/components/tools/Audit";
import { Calculator } from "@/components/tools/Calculator";
import { EnquiryDemo } from "@/components/tools/EnquiryDemo";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "Tools",
  description: "Try a live enquiry demo, work out what slow replies may cost you, and see how ready your selling is.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        title="Try it before you talk to us."
        lead="Three short tools to see what we build and where your own selling could be stronger."
      />

      <Section id="demo" className="!pt-0">
        <Container>
          <SectionHead title="See an enquiry answered." lead="Play the buyer and watch the conversation build itself." />
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <EnquiryDemo tone="light" />
          </div>
        </Container>
      </Section>

      <Section id="calculator" className="bg-cream-50">
        <Container>
          <SectionHead
            title="What slow replies may be costing you."
            lead="Move the sliders to your own numbers. Nothing here is stored or sent."
          />
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <Calculator />
          </div>
        </Container>
      </Section>

      <Section id="audit">
        <Container>
          <SectionHead
            title="How ready is your selling?"
            lead="Six quick questions, and a plain-spoken view of where to start."
          />
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <Audit />
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
