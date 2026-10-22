import { EnquiryDemo } from "@/components/tools/EnquiryDemo";
import { Container, Section } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export function DemoSection() {
  return (
    <Section tone="dark">
      <Container>
        <SectionHead
          tone="dark"
          title="See an enquiry answered."
          lead="Play the buyer. Watch the reply, the questions and the booking happen on their own."
        />
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <EnquiryDemo tone="dark" />
        </div>
      </Container>
    </Section>
  );
}
