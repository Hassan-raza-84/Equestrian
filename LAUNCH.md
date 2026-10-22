# Launch checklist

Work through this top to bottom. `npm run prelaunch` lists every placeholder still in the site and fails until they are gone.

## 1. Replace the placeholders
- [ ] Run `npm run prelaunch` and clear every item it lists.
- [ ] `src/config/brand.ts`: real company name, domain (`url`, `domain`), email, WhatsApp (optional), booking link (optional), registered company details, social links, response-time promise.
- [ ] `src/content/services.ts`: real prices and timelines for each package, the assurance wording you will stand behind, and one real result per service.
- [ ] `src/content/work.ts`: real case studies. Set `placeholder: false` on each. Real numbers only, with the client's permission.
- [ ] `src/content/faq.ts`: confirm every answer, especially ownership and data handling.
- [ ] About page and founders: real bios and why you work in the equestrian world.
- [ ] Privacy and cookies pages: have them reviewed by a professional. Check whether you need to register or pay the ICO data protection fee.

## 2. Brand assets
- [ ] Replace the traced logo with the original vector: update `src/components/brand/mark-path.ts`, `public/brand/*.svg`, `src/app/icon.svg` and `src/app/apple-icon.png`.
- [ ] Photography: add images to `public/images/` and pass them to `<MediaFrame src="/images/..." alt="..." />`. Always write real alt text.
- [ ] Animated horse for page transitions: see `src/config/horse-motion.ts` and the README.

## 3. Email for the contact form
1. Create an account at resend.com and verify your sending domain (add the DNS records it shows, including SPF and DKIM).
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
3. Test with `npm run dev`: submit the form and check the email arrives.

## 4. Deploy (Vercel)
1. Put the project in a GitHub repository (`.env.local` is already ignored).
2. At vercel.com, import the repository.
3. Add the same environment variables in the project settings.
4. Add your domain in Vercel and update DNS as instructed.
5. Visit the live site, run through every page, and submit the form once.

## 5. After launch
- [ ] Test on at least one real iPhone and one real Android phone.
- [ ] Run PageSpeed Insights on the live address for home, services and tools.
- [ ] Add the site to Google Search Console and submit `/sitemap.xml`.
- [ ] Optional analytics: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, then update the cookies page to match.
- [ ] Add a Content Security Policy (needs a nonce for the two small inline scripts in `src/app/layout.tsx`).
