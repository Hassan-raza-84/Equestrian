import Script from "next/script";

/**
 * Cookieless Plausible analytics. Renders nothing unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set,
 * so by default the site loads no analytics at all.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
