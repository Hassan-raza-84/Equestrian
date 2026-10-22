# Studio website

Next.js, React, TypeScript and Tailwind CSS. A complete site: home, services, work (with case-study pages), tools (live enquiry demo, calculator, readiness audit), about, journal, contact, legal pages and a page for horse sellers.

## Run it
1. Install Node.js (LTS) from nodejs.org.
2. In this folder, in a terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000. Review the design system at http://localhost:3000/design-system.

Production check: `npm run build && npm start`.
Before launch: `npm run prelaunch` (lists placeholders still to replace) and read `LAUNCH.md`.

## Where to edit
| What | Where |
|---|---|
| Company name, domain, email, WhatsApp, founders, navigation, response time | `src/config/brand.ts` |
| Services, packages, prices, timelines | `src/content/services.ts` |
| Case studies (copy, results, quotes) | `src/content/work.ts` |
| Journal articles | `src/content/journal.ts` |
| FAQ, process, the three problems | `src/content/faq.ts`, `src/content/process.ts` |
| Audiences (activate "coming soon" ones later) | `src/content/audiences.ts` |
| Colours, type scale, easings | `src/app/globals.css` (`@theme`) |
| Splash screen | `src/components/motion/Splash.tsx` |
| Page transitions and the horse slot | `src/components/motion/RouteTransition.tsx`, `src/config/horse-motion.ts` |
| Live enquiry demo script | `src/components/tools/EnquiryDemo.tsx` |
| Calculator and audit | `src/components/tools/Calculator.tsx`, `Audit.tsx` |
| Contact form email | `src/app/api/contact/route.ts` and `.env.example` |

Anything written as `[VERIFY: ...]` is placeholder copy and shows highlighted on the page, so it cannot slip through unnoticed.

## Adding the animated horse
Page transitions already reserve the centre of the pale wash for the horse. When you have the animation files, tell me their format (Lottie, video with transparency, or image frames) and I will wire them in. The list of gaits (fast run, slow run, jump) lives in `src/config/horse-motion.ts`.

## Adding a new audience, service or case study
Edit the matching file in `src/content/`. Pages, navigation, sitemap and structured data update from the content. No layout changes needed.
