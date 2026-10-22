import { brand } from "@/config/brand";
import { audiences } from "@/content/audiences";
import { articles } from "@/content/journal";
import { caseStudies } from "@/content/work";

/** Every finished, indexable route. The sitemap and prelaunch checks read from this. */
export function allRoutes(): string[] {
  return [
    "/",
    "/services",
    "/work",
    "/tools",
    "/about",
    "/journal",
    "/contact",
    "/privacy",
    "/cookies",
    ...audiences.filter((a) => a.active).map((a) => `/for/${a.slug}`),
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
  ];
}

export const absoluteUrl = (path: string) => `${brand.url}${path === "/" ? "" : path}`;
