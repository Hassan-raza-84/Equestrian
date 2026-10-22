import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`How ${brand.name} uses the personal information you share with us.`}
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            `${brand.name} is a business based in the ${brand.company.country}. Our registered company name is ${brand.company.legalName}, company number ${brand.company.number}, registered at ${brand.company.address}.`,
            `You can contact us about this policy at ${brand.email}.`,
          ],
        },
        {
          heading: "What we collect",
          paragraphs: [
            "When you use our contact form we collect the details you enter: your name, email address, phone number if you give one, the type of business you run and your message.",
            "If you choose to send us the result of the readiness audit or the calculator, we also receive the answers you gave.",
            "Like all websites, our hosting provider receives technical information your browser sends when a page loads, such as your IP address and browser type.",
          ],
        },
        {
          heading: "Why we use it",
          paragraphs: [
            "We use your details to reply to your enquiry and, if you go ahead, to provide our services. [VERIFY: confirm the lawful basis with your adviser]",
            "We do not sell your information, and we do not use it for advertising.",
          ],
        },
        {
          heading: "Who we share it with",
          paragraphs: [
            "We use trusted providers to run the site and handle email, acting on our instructions. [VERIFY: list your actual providers, for example your hosting and email delivery services]",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: ["[VERIFY: your retention period for enquiries and for client records]"],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Under UK data protection law you can ask us for a copy of your information, ask us to correct or delete it, object to or restrict how we use it, and ask for it in a portable format. Email us and we will respond.",
            "If you are unhappy with how we handle your information, you can complain to the Information Commissioner’s Office at ico.org.uk.",
          ],
        },
      ]}
    />
  );
}
