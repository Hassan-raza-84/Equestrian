import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <PageHero title="This page has wandered off." lead="The page you were looking for is not here. Let us take you somewhere that is.">
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/">Back to the home page</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </PageHero>
  );
}
