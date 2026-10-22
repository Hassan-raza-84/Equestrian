"use client";

import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PageHero title="Something went wrong." lead="Sorry about that. Please try again, and if it keeps happening, let us know.">
      <div className="mt-10">
        <Button onClick={reset}>Try again</Button>
      </div>
    </PageHero>
  );
}
