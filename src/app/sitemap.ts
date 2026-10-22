import type { MetadataRoute } from "next";
import { absoluteUrl, allRoutes } from "@/lib/site";
import { caseStudies } from "@/content/work";

// Case studies stay out of the sitemap while they are placeholders.
export default function sitemap(): MetadataRoute.Sitemap {
  const hidden = new Set(caseStudies.filter((c) => c.placeholder).map((c) => `/work/${c.slug}`));
  return allRoutes()
    .filter((path) => !hidden.has(path))
    .map((path) => ({ url: absoluteUrl(path) }));
}
