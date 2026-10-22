import { AudiencesSection } from "@/components/sections/AudiencesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { Hero } from "@/components/sections/Hero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Problem } from "@/components/sections/Problem";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WorkTeasers } from "@/components/sections/WorkTeasers";
import { CtaBand } from "@/components/ui/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ServicesOverview />
      <DemoSection />
      <WorkTeasers />
      <ProcessSection />
      <AudiencesSection />
      <FoundersSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
