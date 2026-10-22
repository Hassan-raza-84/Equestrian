import { brand } from "@/config/brand";
import { BrandMark } from "@/components/brand/BrandMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const social = Object.entries(brand.social).filter(([, url]) => url);
  return (
    <footer className="border-t border-cream-300/15 bg-green-900 text-cream-100">
      <Container className="grid gap-16 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <BrandMark className="h-auto w-28 text-cream-100" />
          <Wordmark className="mt-6 block text-[1.75rem] text-cream-100" />
          <p className="mt-5 max-w-sm text-cream-300">{brand.description}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <ul className="flex flex-col gap-3">
            {brand.nav.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em]">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
            <li>
              <TransitionLink href="/for/horse-sellers" className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em]">
                For horse sellers
              </TransitionLink>
            </li>
            <li>
              <TransitionLink href={brand.cta.href} className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em]">
                Contact
              </TransitionLink>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-3 lg:col-span-4">
          <a href={`mailto:${brand.email}`} className="link-underline w-fit py-1">
            {brand.email}
          </a>
          {brand.whatsapp && (
            <a href={`https://wa.me/${brand.whatsapp}`} className="link-underline w-fit py-1" rel="noopener">
              WhatsApp
            </a>
          )}
          {social.map(([name, url]) => (
            <a key={name} href={url} className="link-underline w-fit py-1 capitalize" rel="noopener noreferrer">
              {name}
            </a>
          ))}
        </div>
      </Container>

      <div className="border-t border-cream-300/20">
        <Container className="flex flex-col gap-4 py-8 text-small text-cream-300 md:flex-row md:items-center md:justify-between">
          <p>
            {"\u00A9"} {brand.company.legalName}. {brand.company.number}. {brand.company.address}.
          </p>
          <ul className="flex gap-6">
            {brand.legalLinks.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em]">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
