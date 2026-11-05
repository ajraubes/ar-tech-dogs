# AR Tech Dogs — Design & Frontend Audit

_Audit of the website as built on branch `claude/project-thread-gfgj7c` (5 November 2026), measured against the AR Tech Dogs Company & Website Project Plan. Checked in a production build with Playwright at 390px (iPhone), 1024px, 1280px and 1440px._

---

## 1. Executive summary

The repository started as the unmodified Payload website template (Payload logo, Payload copy, light/dark toggle, MongoDB docker-compose). It is now a CMS-driven agency site with the plan's full sitemap, ten Payload collections and globals, a charcoal / warm-white / electric-orange design system, and a working enquiry pipeline. The engineering base is solid: typed, statically generated, no horizontal overflow at any tested width, and touch targets of 40px or more everywhere. What holds it back from "flawless" is mostly **content and identity, not code**: placeholder founder copy, no case studies or photography, a first-pass logo, and a type system (Geist) that is clean but not distinctive.

What the audit found and already fixed in this branch:

- The mobile menu collapsed to a 0px-tall strip. The header's `backdrop-filter` became the containing block for the `position: fixed` panel. Fixed by rendering the panel outside `<header>` (`src/Header/Component.client.tsx`).
- Orange numerals on warm-white sections were about 2.9:1 contrast, below WCAG AA for small text. Added a `--brand-text` token that switches to a darker orange (about 5:1) in light sections.
- Grids with an awkward item count (7 differentiators in 4 columns) left a visible grey empty cell. Each item is now its own card, so a short last row reads as intentional.
- Inline text links ("View all work →", "About this service →") were 20px tall. They are now 44px tap targets.
- The template's `sizes` attribute used `w` descriptors, which browsers ignore, so they downloaded oversized images. Images were also forced to `quality={100}`. Both are now fixed.

---

## 2. The six-lens deep dive

### 🍏 1. Apple design philosophy (HIG & craft)

**What works**

- One clear job per page. Every page has a single `h1`, a lead paragraph and one primary action. Orange is reserved for primary buttons and small accents, so the next step is always obvious.
- Content leads. Interior pages share one `PageHero`, and sections share one `SectionHeader`. Visitors learn the layout once.
- Feedback. Buttons press down (`active:scale-[0.97]`), cards lift on hover, nav links show `aria-current` with an orange underline, and the form shows pending, field-error and success states.

**Critiques**

1. **The homepage asks for too much attention.** Hero → positioning → services → why us → process → pricing → ecosystem → CTA is eight bands before the footer, and the positioning band repeats the hero. Apple pages earn length with imagery; this one is all type.
2. **Visible placeholders.** `[Founder to review and expand.]` and `[Founder to add: …]` render on `/meet-the-team` and `/about`. That is fine on staging and fatal in production.
3. **The hero `h1` uses `aria-label` on a heading whose visible words are `aria-hidden`.** It works in VoiceOver and NVDA, but `aria-label` on non-interactive elements is not reliably announced everywhere.

**Actionable fixes**

```tsx
// src/components/site/HomeHero.tsx — accessible name from real text, not aria-label
<h1 className="text-display">
  <span className="sr-only">{heading}</span>
  <span aria-hidden className="word-rise block">…</span>
</h1>
```

```tsx
// src/app/(frontend)/page.tsx — merge the positioning band into the hero lead,
// and move the "founder experience" strip directly under the hero CTAs.
```

Add a pre-launch check that fails the build when copy contains `[`:

```ts
// scripts/check-placeholders.ts (run in `pnpm ci`)
const docs = await payload.find({ collection: 'team-members', where: { bio: { like: '[' } } })
if (docs.totalDocs) throw new Error('Placeholder copy found in Team members')
```

### ⚡ 2. Emil design-engineering lens

**What works**

- Layout uses no magic numbers. The template's `-mt-[10.4rem]` hero hack, which only worked for one header height, is gone. The header is `sticky` and takes its own space.
- One container, one section rhythm (`py-24 md:py-32`), and a 4px-based spacing scale throughout.
- Clean data boundary. `src/lib/data.ts` is the only place that talks to Payload. Each query is cached under a tag, and every CMS hook revalidates that tag. Components receive typed Payload documents.
- Semantic HTML: `<nav aria-label>`, `<ol>` for the process, `<details>` for FAQs, `<dl>` for contact details and project facts.

**Critiques**

1. **Repeated arbitrary values.** `text-[0.9375rem]` appears in about 25 places, and radii mix `rounded-lg`, `xl`, `2xl`, `3xl` and `full` by feel. These should be tokens.
2. **`Reveal` uses `@ts-expect-error` for its polymorphic ref.** That is a small type hole in a core primitive.
3. **Stagger delays are passed as inline `--delay` styles** in many files. It works, but it is easy to get inconsistent.
4. **`unstable_cache`** is the legacy caching API in Next 16. The `'use cache'` directive with `cacheTag()` is the supported path going forward.

**Actionable fixes**

```css
/* globals.css — name the body size and the radius scale once */
@theme {
  --text-body: 0.9375rem;
  --text-body--line-height: 1.65;
  --radius-control: 0.5rem; /* inputs */
  --radius-card: 1rem; /* cards, tiles */
  --radius-panel: 1.5rem; /* CTA panels */
}
```

Then replace `text-[0.9375rem] leading-relaxed` with `text-body` and use `rounded-card` and `rounded-panel`.

```tsx
// Reveal.tsx — type the ref properly instead of suppressing it
export function Reveal<T extends 'div' | 'li' | 'section' | 'article' = 'div'>({ as, ...props }: { as?: T } & …) {
  const ref = useRef<HTMLElementTagNameMap[T]>(null)
  const Tag = (as ?? 'div') as React.ElementType
  …
}
```

```ts
// lib/data.ts — Next 16 cache API (after enabling `cacheComponents`)
export async function getServices() {
  'use cache'
  cacheTag('services')
  …
}
```

### 🎬 3. Animation & micro-interaction opportunities

**What exists**

- The hero headline rises in word by word, followed by the lead paragraph, the CTAs and a "build log" panel. It is all CSS with `cubic-bezier(0.16, 1, 0.3, 1)` easing.
- Sections reveal on scroll through `IntersectionObserver`. Content is hidden only when `html.js` is set, so no-JS visitors and crawlers see everything.
- The mobile menu staggers in, and the hamburger morphs into an ✕.
- The FAQ animates its height with `::details-content` (Chromium; other browsers open instantly).
- `prefers-reduced-motion` disables all of it.

**Critiques**

1. **The project filter (`WorkGrid`) has no layout motion.** Cards pop in and out when a category changes, which is the most noticeable missing transition.
2. **Navigating between pages is a hard cut.** Service card → service page is the main journey and gets no continuity.
3. **The hero `word-rise` animates `filter: blur()`.** That is a paint-heavy property on low-end Android. The `animate-ping` dot on the eyebrow loops forever and pulls the eye away from the headline.
4. **No spring physics anywhere.** CSS curves are the right default for performance, but drag and press interactions would feel better with a spring.

**Actionable fixes**

```tsx
// WorkGrid.tsx — let the browser animate the reflow (browsers without View Transitions just switch instantly)
const select = (value: string) =>
  document.startViewTransition ? document.startViewTransition(() => setFilter(value)) : setFilter(value)
// and give each card a stable name:
<li style={{ viewTransitionName: `project-${p.id}` }}>
```

```ts
// next.config.ts — cross-page continuity from service card to service hero
experimental: { viewTransition: true }
// ServiceCard title + PageHero h1 share `view-transition-name: service-${slug}`
```

```css
/* Cheaper hero entrance: drop blur on small screens, stop the ping after a few beats */
@media (max-width: 48rem) {
  @keyframes word-rise { from { opacity: 0; transform: translateY(0.35em) } }
}
.animate-ping { animation-iteration-count: 3; }
```

If Motion is added later (the plan suggests it), use it for gestures and layout, not for entrances CSS already handles:

```tsx
<motion.ul layout transition={{ type: 'spring', stiffness: 380, damping: 32 }}>…</motion.ul>
```

Delight worth adding:

- Loading skeletons in `our-work/loading.tsx` once projects carry images.
- A short "copied" tick on a click-to-copy email in the footer.
- An optional once-off / monthly toggle on `/pricing` with a number cross-fade.

### ✨ 4. Impeccable standards (the "flawless" bar)

**Verified clean**

- No horizontal overflow at 390, 1024, 1280 or 1440px.
- Header nav and CTA fit at 1024px (40px spare).
- Long titles use `text-wrap: balance`, card titles clamp to two lines, and ecosystem names truncate.
- Every collection has a written empty state (services, capabilities, projects, ecosystem, pricing).
- The form keeps values on error, focuses the error summary, links each error to its field with `aria-describedby`, and turns its button into a spinner with "Sending…".
- Spam submissions get a fake success, so bots learn nothing.
- An email failure never loses an enquiry, because it is stored first.

**Critiques**

1. **`/our-work` currently shows its empty state.** No projects are published. For an agency site, this is the biggest visible gap.
2. **The data layer has no fallback when the database is unreachable.** Static pages keep serving the last build. Dynamic `/contact` would show the new `error.tsx` boundary (added in this branch), but the root layout also reads Site Settings, so a DB outage at request time can still take down the shell.
3. **`/contact` is dynamic only because it reads `searchParams`** for pre-filling. It could be static.
4. **Enquiries have no rate limit** beyond the honeypot and the 3-second minimum fill time.
5. **Leftovers from the template:**
   - `favicon.ico` is still the Payload icon. Browsers request it even though the SVG favicon is declared.
   - `pnpm lint` fails on a circular ESLint config. This was already broken on `main`.
   - The `Dockerfile` runs `node server.js` but `next.config.ts` has no `output: 'standalone'`, so the image would not start.
6. **The logo is a first pass.** It reads well at 32px. It has no optical adjustment at 16px and no monochrome or reversed versions.

**Actionable fixes**

```ts
// next.config.ts
const nextConfig: NextConfig = { output: 'standalone', … }
```

```tsx
// contact/page.tsx — make it static: read the query on the client inside EnquiryForm
const params = useSearchParams() // wrap EnquiryForm in <Suspense>
```

```ts
// contact/actions.ts — simple per-IP limit (Upstash, Vercel KV or a Payload collection)
const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]
if (await tooManyRecent(ip, { max: 5, windowMin: 10 })) return { status: 'error', message: 'Please try again later.' }
```

```ts
// layout.tsx — never let settings take down the whole site
const settings = await getSiteSettings().catch(() => null)
```

Export a 32×32 `favicon.ico` from `public/favicon.svg` and replace the Payload one.

### 📱 5. Mobile-native patterns

**What works**

- **Touch targets:** buttons are 44–56px, nav and footer links 40–44px, menu rows 56px, form controls 48px, and the menu toggle is 44×44. An automated sweep of every link and control on `/`, `/pricing`, `/contact`, `/about`, `/meet-the-team` and a service page found nothing under 40px.
- **Thumb zone:** the mobile menu pins "Start a Project" to the bottom of the sheet, with `env(safe-area-inset-bottom)` padding. Hero and CTA buttons go full width on phones.
- **Viewport:**
  - `min-height: 100dvh` with a `100vh` fallback on `body`.
  - `svh` on the full-bleed template heroes.
  - `viewport-fit=cover`, and `theme-color` matched to charcoal.
  - The menu sheet locks body scroll and uses `overscroll-contain`.
- **Layout shift:** images sit in fixed-aspect boxes, fonts are self-hosted through `next/font` (Geist), and every entrance animates only `transform` and `opacity`, never layout.
- **Inputs:** `inputMode` and `autoComplete` on every field bring up the right keyboard. Input text is 16px, so iOS does not zoom on focus.

**Critiques**

1. **No persistent action on long pages.** Service pages are 5,000px or more on a phone. After the hero, the next "Start a project" button is far down the page.
2. **The pricing cards stack into a very long column on mobile.** Six or more cards scroll vertically where a swipeable row would let visitors compare tiers.
3. **The `/pricing` jump chips scroll to anchors without a sticky sub-nav,** so visitors lose their place.
4. **The header has no `safe-area-inset-top` padding** for landscape on notched phones.

**Actionable fixes**

```tsx
// A compact bottom bar on service pages, shown after the hero scrolls away
<div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
  <Button asChild className="w-full"><Link href={enquireHref}>Start a project</Link></Button>
</div>
```

```tsx
// PackageGrid on phones: native swipe with scroll-snap, no JS
<ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:overflow-visible md:px-0">
  <li className="w-[85%] shrink-0 snap-center md:w-auto">…</li>
</ul>
```

```css
header { padding-top: env(safe-area-inset-top); }
```

### 🎨 6. Frontend design taste & aesthetics

**What works**

- The palette follows the plan exactly:
  - Charcoal `#0e0e11` as the default surface.
  - A `#17171b` card layer.
  - Warm-white `#f6f3ee` sections for rhythm.
  - One electric orange `#ff6a1f`, with charcoal text on orange (white on orange fails contrast).
- Borders are translucent white (9% / 16%), so depth comes from light, not heavy grey lines.
- Shadows are soft and directional, with an inset top highlight on primary buttons.
- Mono "eyebrow" labels and the faint 64px technical grid make the site feel like a software studio without gimmicks.
- One fluid type scale (display 44→104px, h1, h2, h3, lead) with tight negative tracking on large sizes and 1.6 line height for body text.
- It avoids the plan's "don'ts": no gradients on text, no glassmorphism cards, no cartoon dog.

**Critiques**

1. **Geist is a neo-grotesk, not the geometric sans the plan asks for.** It is clean but very common in 2026 SaaS, so the brand risks looking like every Vercel-stack site.
2. **The site is all typography.** It has no founder photo, no project screenshots and no product imagery. The plan calls for "high-quality photography" and "interactive project showcases".
3. **Two soft orange blur glows** (hero and CTA panel) edge toward the "unnecessary glowing effects" the plan warns against.
4. **The dog identity is barely present.** It lives only in the mark (three square "toes" over a `</>` pad). The plan wants it subtle, and this may be too subtle to be memorable.
5. **Light sections are used for only two or three bands per page.** The warm white is lovely and could carry more, for example the whole pricing page.

**Actionable fixes**

```tsx
// layout.tsx — pair a geometric display face with Geist for body text
import localFont from 'next/font/local'
const display = localFont({ src: './fonts/GeneralSans-Variable.woff2', variable: '--font-display', display: 'swap' })
```

```css
.text-display, .text-h1, .text-h2 { font-family: var(--font-display), var(--font-sans); }
```

(General Sans, Satoshi or Space Grotesk all fit "modern geometric".)

- Replace the CTA glow with a single 1px orange top border on the panel, and keep the hero glow at most.
- Commission a proper mark: paw plus bracket, built on a grid, with 16px, mono and reversed versions. Animate the toes once on load in the header.
- Make the founder photo the first image on the site: a black-and-white portrait on `/meet-the-team` and a small avatar next to "You talk to the person who writes the code."

---

## 3. Top 3 high-impact fixes

1. **Publish real proof.** Add 3–4 permission-approved case studies with screenshots, publish them in **Agency → Projects**, mark two as featured, and add a founder photo. This turns on the homepage "Selected work" section, fills `/our-work`, and does more for conversion and the "premium" feel than any code change. While doing it, replace every `[placeholder]` in Team and Company.
2. **Make it launch-safe.**
   - Set `output: 'standalone'` (or fix the Dockerfile).
   - Configure an email adapter so enquiry notifications arrive.
   - Add a rate limit to the enquiry action.
   - Wrap the layout's settings query in a fallback.
   - Replace `favicon.ico`.
   - Run `pnpm ci` (migrate, then build) in your deploy pipeline.
   - Review every price in **Agency → Packages** before going live.
3. **Give the brand its own voice.** Pair a geometric display typeface with Geist, refine the logo mark into a full set, and drop the second glow. Then add the two motion upgrades that matter most: a View Transition from service card to service page, and layout animation on the work filter.
