# Progress

## Built (all stages)
- **Foundation:** tokens, local fonts, logo, layout shell, Lenis smooth scroll (mouse devices only), Ferrari-style splash, Hermes-style page transition with a reserved horse slot, image-loading frame, line reveals.
- **Home:** hero with an illustrative website and phone, the problem, two services (problem, build, what changes, proof), live enquiry demo, results teasers, process, audiences, founders, FAQ, call to action.
- **Services:** both services in full, three packages, assurance line, FAQ.
- **Work:** index and a case-study template (problem, approach, results, quote). Three placeholder case studies, hidden from search and the sitemap until marked real.
- **Tools:** scripted enquiry demo, cost-of-slow-replies calculator, six-question readiness audit with optional email capture.
- **About, Journal (3 practical guides), Contact (validated form, honeypot, rate limit, email via Resend), Privacy and Cookies (templates), For horse sellers, 404 and error pages.**
- **Polish:** native-dialog mobile menu (no library), security headers, sitemap, canonical URLs, Organization, Service and Article structured data, optional cookieless analytics, `npm run prelaunch`, `LAUNCH.md`.

## Verified (headless Chromium, production build)
- Lint, type check and `npm run build` pass; every route pre-rendered
- All 14 routes tested at 360, 768, 1440 and 1920 px: correct status, exactly one visible heading, no horizontal scroll, no console errors (apart from the deliberate 404 test)
- Splash: natural, click-skip, key-skip, JavaScript off, reduced motion
- Transitions: about 1 s, back/forward, interruption, focus moves to the new heading
- Demo plays through to a booked viewing and resets; calculator maths checked (100 enquiries, 30% cold, 10% conversion, £10,000 gives £360,000 a year); audit gates, scores and sends; contact form validates, handles the no-email-configured case gracefully, and sends in development; honeypot and bad input handled
- Mobile menu: opens, traps focus, closes with Escape and on navigation, returns focus
- Lighthouse desktop: accessibility 100 on every page (case-study placeholders score lower on SEO by design because they are set to noindex), best practices 100, SEO 100; performance 94 to 95 on home, services and tools
- Lighthouse mobile (simulated slow phone and slow 4G, first visit with splash): performance 76 on home and services (LCP 2.6 s, CLS 0), accessibility, best practices and SEO 100

## Known gaps and honest notes
1. **Mobile performance in the lab is 76, below the 95 target.** It simulates a slow phone on a slow connection and counts the 2.4 s splash. Real devices are faster, and desktop is 94 to 95. Retest with PageSpeed Insights on the live site. Further gains would come from trimming client-side JavaScript, which would mean simplifying motion.
2. **The animated horse is not built.** It needs real animation artwork. The slot and config are ready.
3. **No photography.** Frames show a tonal block with the mark. This is the biggest remaining gap to a prestige feel.
4. **Case studies, prices, bios and results are placeholders** marked `[VERIFY: ...]`.
5. **The enquiry demo is scripted**, clearly labelled as a demonstration. A live AI-driven version would need an API key and running costs.
6. **Logo** is a traced vector of the supplied PNG. Replace with the original vector.
7. **Privacy and cookies pages are templates** and need professional review.
8. Founder, ownership, data-handling, response-time and "agreed in writing" statements are sensible defaults. **Confirm each is a promise you will keep.**
9. The 5 high-severity `npm audit` items are in development tooling only; production dependencies have none.

## Decisions made for you (change freely)
- Primary navigation: Services, Work, Tools, About, Journal.
- Brass accent darkened to #9A7640 for accessible focus rings.
- Display font optical size capped on large headings for legibility.
- Framer Motion and Radix Dialog were removed to keep the site lighter.
