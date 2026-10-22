import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Cookies",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies and storage"
      intro="This site is built to use as little as possible."
      sections={[
        {
          heading: "What we store",
          paragraphs: [
            "The site remembers, for the length of your visit only, that you have already seen the opening screen. This uses your browser’s session storage, is not shared with anyone and disappears when you close the tab.",
            "We do not use advertising or tracking cookies.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "If we switch on analytics, we use a privacy-friendly, cookieless service that counts visits without following individuals. [VERIFY: confirm whether analytics is enabled and update this section to match]",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can clear your browser’s storage at any time. The site works without it, and the only effect is that the opening screen may play again.",
          ],
        },
      ]}
    />
  );
}
