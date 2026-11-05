# AR Tech Dogs

**Digital experiences. Engineered to grow.**

The AR Tech Dogs agency website: Next.js 16, React 19, Tailwind CSS 4 and Payload CMS 3 on PostgreSQL. All content (services, packages and prices, capabilities, case studies, team, testimonials, ecosystem, company copy and contact details) is managed in Payload. Ordinary content changes never need a code change.

## Quick start

```bash
cp .env.example .env          # set DATABASE_URL and PAYLOAD_SECRET
docker compose up -d postgres # or use any PostgreSQL 16 database
pnpm install
pnpm seed                     # run migrations and load the starting content from the project plan
pnpm dev                      # http://localhost:3000, admin at /admin
```

Create the first admin user at `/admin`. You can also load the content from the admin dashboard with the **Seed** button.

`pnpm seed` runs in production mode on purpose. Seeding in development mode would mark the database as "dev-pushed", and a production server would then stop at startup waiting for a yes/no answer about data loss.

## Production

```bash
pnpm build   # needs no database connection
pnpm start   # applies any pending migrations, then serves
```

Pending migrations run when the server starts, so a build never touches the database. Pages render on request and are cached until content changes in Payload. See [docs/DEPLOY_DOKPLOY.md](docs/DEPLOY_DOKPLOY.md) to deploy with Docker on Dokploy.

`pnpm migrate` applies the committed migrations in `src/migrations`. Development mode pushes schema changes automatically; after changing a collection, create a migration with `pnpm payload migrate:create <name>` and commit it.

Before going live:

- Review every price in **Agency → Packages**. They are the plan's proposed launch prices, not validated quotes.
- Add the public email, WhatsApp number, booking link and enquiry notification email in **Settings → Site Settings**.
- Configure an email adapter in `src/payload.config.ts` (for example Resend or Nodemailer) so enquiry notifications are sent. Without one, they are only logged. Enquiries are always stored in **Leads → Enquiries**.
- Replace the founder bio placeholder and add a photo in **Agency → Team members**. Remove any brand from "Brands worked on" you do not have permission to name.
- Publish case studies in **Agency → Projects** (a draft example shows the structure).

## Content model

| Collection           | Purpose                                                             | Shown on                                        |
| -------------------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| Services             | The six service divisions, each with its own page                   | `/solutions`, `/solutions/[slug]`, home, footer |
| Packages             | Tiers and starting prices (ZAR, once-off or monthly)                | Service pages, `/pricing`, home                 |
| Capabilities         | How we build                                                        | `/capabilities`                                 |
| Projects             | Case studies (drafts supported)                                     | `/our-work`, `/our-work/[slug]`, home           |
| Team members         | Founder and team                                                    | `/meet-the-team`, home                          |
| Testimonials         | Approved client quotes only                                         | Home                                            |
| Ecosystem (partners) | Platforms we work with; "official partner" badge only when verified | `/ecosystem`, home                              |
| Enquiries            | Project enquiries from `/contact`                                   | Admin only                                      |
| Pages, Posts         | Free-form pages built from blocks, and the blog                     | `/[slug]`, `/posts`                             |

| Global          | Purpose                                                                       |
| --------------- | ----------------------------------------------------------------------------- |
| Site Settings   | Name, tagline, SEO defaults, contact details, booking link, pricing note      |
| Homepage        | Hero copy, buttons, positioning, final call to action                         |
| Company         | Story, mission, vision, values, differentiators, delivery process, team model |
| Header / Footer | Navigation                                                                    |

Starting content lives in `src/content/seedData.ts`. After seeding, Payload is the source of truth.

## Design system

Tokens live in `src/app/(frontend)/globals.css`:

- **Colour:** matched to the logo. Deep navy `#070c14` default surface, cool off-white `#f4f7fb` for light sections (`data-theme="light"` on any element), logo blue `#008efa` for marks and accents, and a deeper button blue `#0b6fe0` so white button text passes WCAG AA.
- **Logo:** `public/brand/mark-tile.png` (app-icon mark, also the favicon source) and `public/brand/logo-light.png` (full lockup for light backgrounds), cut from the brand artwork. Replace them with vector exports from the designer when available.
- **Type:** Lexend for headings, Lexend Exa for the wordmark, Geist Sans for body text and Geist Mono for labels. Lexend fonts are self-hosted in `src/fonts`. One fluid scale: `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-lead`, `.eyebrow`.
- **Spacing:** 4px grid; sections are `py-24 md:py-32`.
- **Motion:** CSS only, with `cubic-bezier(0.16, 1, 0.3, 1)` easing. Scroll reveals (`<Reveal>`) are hidden only when JavaScript runs, and everything respects `prefers-reduced-motion`.

Reusable page pieces are in `src/components/site/`.

## Enquiry form

`/contact` posts to a server action (`src/app/(frontend)/contact/actions.ts`) that validates input, rejects bots with a honeypot field and a minimum fill time, and stores the enquiry with Payload. The form works without JavaScript. Links from packages pre-fill the service and package.

## Scripts

| Script                    | What it does                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| `pnpm dev`                | Development server                                                                                 |
| `pnpm seed`               | Load starting content (replaces services, packages, capabilities, ecosystem, team and the globals) |
| `pnpm migrate`            | Apply database migrations                                                                          |
| `pnpm ci`                 | Migrate, then build                                                                                |
| `pnpm generate:types`     | Regenerate `src/payload-types.ts` after changing collections                                       |
| `pnpm generate:importmap` | Regenerate the admin import map after adding admin components                                      |
