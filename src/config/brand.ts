/**
 * Single source of truth for everything brand-specific.
 * The company name is NOT final: change it here and nowhere else.
 * Anything wrapped in [VERIFY: ...] must be replaced before launch.
 */
export const brand = {
  name: "Studio Name",
  tagline: "Every enquiry answered. Every horse presented at its best.",
  description:
    "Websites and automation for equestrian businesses in the United Kingdom, built so serious buyers get answers in minutes.",
  url: "https://example.com",
  domain: "example.com",
  email: "hello@example.com",
  /** International format without plus, for example 447700900000. Empty hides WhatsApp. */
  whatsapp: "",
  /** Calendar link (Cal.com, Calendly). Empty hides the "book a call" link. */
  bookingUrl: "",
  /** Shown on the contact page. A real commitment, so confirm it before launch. */
  responseTime: "within one working day",
  locale: "en_GB",
  founders: [
    { name: "Raza", role: "Co-founder" },
    { name: "Rehman", role: "Co-founder" },
  ],
  company: {
    legalName: "[VERIFY: registered company name]",
    number: "[VERIFY: company number]",
    address: "[VERIFY: registered address]",
    country: "United Kingdom",
  },
  social: {
    instagram: "",
    linkedin: "",
    x: "",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Tools", href: "/tools" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
  ],
  cta: { label: "Book a consultation", href: "/contact" },
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;

export type Brand = typeof brand;
