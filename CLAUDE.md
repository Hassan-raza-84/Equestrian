# Project bible: premium equestrian digital studio website

You are the lead creative developer and design director on this project. Read this file fully before every task. It is the source of truth. If a stage prompt conflicts with it, ask before deviating.

## 1. What we are building
The company website for a UK studio that sells two things to equestrian businesses: **premium websites** and **automation** (instant enquiry replies, booking, follow-ups). First audience: people who sell horses. The studio will expand to more audiences and services inside the equestrian niche, so everything is modular.

The site has one job: make a horse seller feel, in the first three seconds, that this is the authority, and prove it with real results and real build quality. The site is also our portfolio. Its speed, motion and craft are the demonstration.

Founders: Raza and Rehman (both engineers). Leads go to email for now (WhatsApp later). The company name is **not final**: never hard-code it. Use `src/config/brand.ts` (`name`, `tagline`, `domain`, `email`, `whatsapp`, `founders`, `social`) and read from it everywhere.

## 2. Stack (do not substitute without asking)
- Next.js (App Router), React, TypeScript (strict)
- Tailwind CSS with design tokens in CSS (`@theme`), no arbitrary hex values in components
- GSAP (+ SplitText, ScrollTrigger loaded lazily) for all choreographed motion, Lenis for smooth scroll. Framer Motion was dropped in Stage 1: GSAP covers everything.
- React Three Fiber only if a stage explicitly asks for it
- Content in typed local data files for now (`src/content/*`), structured so Sanity or MDX can replace them later
- Radix primitives for accessible dialogs, menus, accordions
- Package manager: npm. Hosting target: Vercel.

## 3. Design tokens
Palette (CSS variables, named, exactly these):
- `--cream-50: #FBF7EC` (lightest surface)
- `--cream-100: #F3ECD9` (page background, about 65% of the visual field)
- `--cream-300: #E3D8BD` (hairlines and quiet fills on cream)
- `--green-900: #0B2A1E` (deepest green, footer and splash)
- `--green-700: #1C4B32` (primary brand green, matches the logo exactly)
- `--green-500: #2F6B49` (hover and secondary on green)
- `--night: #050806` (splash screen, near-black)
- `--ink: #17211B` (body text on cream)
- `--ink-muted: #56645B`
- `--brass: #9A7640` (rare accent: focus rings, one hairline, tiny details; under 3% of the field; darkened from #A9854F so it reaches 3:1 on cream and green)
No gradients as decoration, no drop-shadow stacks, no other hues. Contrast must pass WCAG AA.

Type:
- Display: **Bodoni Moda** (light to regular weights, optical size, large, tight tracking, true italics available). Heritage, high contrast, fashion-house feel.
- Text and UI: **Hanken Grotesk**.
- Self-hosted via `next/font/local` (files in `src/app/fonts`). Cap optical size on large headings (`opsz` 34) so hairlines stay legible.
- Load through `next/font`. Fluid scale with `clamp()`. Body line length under 70 characters. Serif display gets generous line-height only when it wraps to several lines.
- These are free stand-ins; the token names must make swapping to licensed faces a one-line change.

Shape: restrained. Mostly straight edges with at most one small radius value used consistently. No pill-and-card grids of identical boxes.

## 4. The one memorable thing
Spend boldness in one place: **the horse and rider mark and the animated horse**. Everything else stays quiet and disciplined. Reference points chosen by the founders: the Ferrari store splash and the Hermes page transitions.
- **Splash (first visit per session, about 2.4 seconds):** a near-black screen (`--color-night`), the mark alone fades in smoothly, holds, then everything fades away into the page. No wordmark, no lines, no wipes. Skippable, never shown with `prefers-reduced-motion`.
- **Page transitions (Hermes style):** the page ghosts to a pale wash (it stays faintly visible), a thin progress line runs along the top, the next page appears beneath, the wash lifts. About 1 second. The centre of the wash is reserved for an **animated horse** with real gaits: sometimes a fast run, sometimes a slow run, sometimes a jump. This needs real animation artwork (see `src/config/horse-motion.ts`). Never fake it by sliding one static pose.
- **Logo usage:** the mark is always shown as the icon alone, never on a coloured tile or background, including the favicon (it switches colour for dark browser themes).
- **Image loading:** while an image loads, its frame shows a tonal cream block with the mark softly pulsing, then the image resolves from blur.
- Motion language: slow, confident, eased, 600 to 1200 ms for large moves. Text reveals use line masks sliding up, on the hero and key statements only.

## 5. Design rules (avoid generated-page tells)
- No tracked-out ALL-CAPS eyebrow above every heading. Small spaced capitals are right for navigation, buttons and footer links (as on Hermes), nowhere else.
- No numbered markers (01, 02, 03) unless the content is a real sequence (the process section qualifies).
- Do not accent a single word of a headline in italic or colour.
- No fade-and-slide-up on every section and no hover lift on every card. Scroll motion is reserved for a few deliberate moments.
- No middle-dot meta strings, no arrow glyph appended to every link, no monospaced data labels.
- Layout: strong grid, large margins, asymmetry where it helps, left-aligned text by default. Whitespace is a feature.
- Photography slots are real components with art-directed aspect ratios. Until real photos arrive they use the tonal mark placeholder, never stock imagery.

## 6. Content rules
- UK English. Short, specific, confident sentences, written about the visitor's outcome.
- Banned words: cutting-edge, world-class, revolutionary, seamless, game-changing, leverage, synergy, unlock, elevate.
- **Problem and results are compulsory** on every service and every case study: what hurt before, what changed after, with numbers.
- Real case studies come from real past clients. Until supplied, write clearly marked placeholders: every placeholder value is wrapped as `[VERIFY: ...]` in the data file and shows a visible dev-only badge. Never ship invented statistics, fake testimonials or fake logos as if real.
- Typographic punctuation in all visible text: curly apostrophes and quotation marks, en dashes for ranges.

## 7. Engineering standards
- TypeScript strict, no `any`. Components small and typed. Content separate from layout.
- Accessibility: semantic landmarks, one h1 per page, visible focus (brass ring), keyboard-complete menus and dialogs, skip link, `prefers-reduced-motion` honoured everywhere, captions and alt text.
- Performance: target Lighthouse 95+ on mobile for performance, accessibility, best practices and SEO. Use `next/image`, preload the display font, avoid layout shift, dynamic-import heavy motion code, no unused dependencies.
- SEO: metadata API per route, Open Graph images, JSON-LD (Organization, Service), sitemap, robots.
- Privacy: no analytics or tracking before consent. Plausible-style cookieless analytics only, behind a clearly marked integration point. Forms are GDPR-aware.
- Wrap all `localStorage` and `sessionStorage` use in try/catch; the site must work without them.
- No console errors or warnings. Run `npm run lint`, `npm run build` and fix everything before saying a stage is done.

## 8. Way of working
1. Before coding any stage, write a short plan (files to touch, decisions, risks) and review it against sections 3 to 6. Then build.
2. After building, critique your own work against this bible, fix what fails, and report what you changed.
3. Leave a running `PROGRESS.md` with what is done, decisions made, and open questions for the founders.
4. Never ask the founders for things already answered in this file. Ask only when something genuinely blocks you.

## 9. Stage map
All stages are built in the delivered project:
1. Foundation, splash, transitions  (done)
2. Hero and first screen  (done: headline plus an illustrative website and phone drawn in CSS)
3. Services and packages  (done: problem, build, what changes, proof placeholder)
4. Proof: case-study pages and index  (done, placeholders until real clients are supplied)
5. Interactive tools: live enquiry demo, calculator, readiness audit  (done)
6. About, journal, contact, legal, horse-sellers page  (done)
7. Polish, performance, accessibility, SEO, launch checklist  (done; see PROGRESS.md and LAUNCH.md)
Still waiting on: animated horse artwork, photography, real case studies, real prices.

## 10. Assets
- `public/brand/mark-green.svg`, `public/brand/mark-cream.svg` (traced from the supplied logo; replace with the original vector when available)
- Fonts via `next/font`. No other external assets.
