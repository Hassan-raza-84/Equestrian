import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { brand } from "@/config/brand";
import { MarkSprite } from "@/components/brand/BrandMark";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Splash } from "@/components/motion/Splash";
import { Analytics } from "@/components/Analytics";

const bodoni = localFont({
  src: "./fonts/BodoniModa-normal.woff2",
  weight: "400 900",
  style: "normal",
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Didot", "Georgia", "serif"],
});

const hanken = localFont({
  src: "./fonts/HankenGrotesk-normal.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.name} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: brand.locale,
    title: brand.name,
    description: brand.description,
  },
  twitter: { card: "summary_large_image", title: brand.name, description: brand.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F3ECD9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint. Decides whether the splash plays, so there is no
 * flash of page content and no scroll while the splash is up.
 */
const preflight = `(function(){try{var d=document.documentElement;var seen=false;try{seen=sessionStorage.getItem('brand-splash')==='1'}catch(e){}var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(seen||rm){d.setAttribute('data-splash','skip')}else{d.classList.add('splash-lock')}}catch(e){}})();`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.url,
  email: brand.email,
  description: brand.description,
  areaServed: "GB",
  founder: brand.founders.map((f) => ({ "@type": "Person", name: f.name })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${bodoni.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preflight }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`#splash{display:none!important}.lr{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[120] -translate-y-[200%] bg-green-900 px-5 py-3 text-cream-100 focus:translate-y-0"
        >
          Skip to content
        </a>
        <MarkSprite />
        <SmoothScroll />
        <RouteTransition>
          <Header />
          <main id="main" className="min-h-[70svh] pt-24">
            {children}
          </main>
          <Footer />
        </RouteTransition>
        <Splash />
        <Analytics />
      </body>
    </html>
  );
}
