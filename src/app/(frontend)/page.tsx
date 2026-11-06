import type { Metadata } from 'next'

import { getServerSideURL } from '@/utilities/getURL'
import { pageMeta } from '@/utilities/pageMeta'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Bean } from '@/components/site/Coffee'
import { CTASection } from '@/components/site/CTASection'
import { HomeHero } from '@/components/site/HomeHero'
import { PriceBrewer, type BrewOption } from '@/components/site/PriceBrewer'
import { ProcessStory } from '@/components/site/ProcessStory'
import { ProjectCard } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { SplitWords } from '@/components/site/SplitWords'
import {
  formatPrice,
  getCompany,
  getHomepage,
  getPackages,
  getPartners,
  getProjects,
  getServices,
  getSiteSettings,
  getTeam,
  getTestimonials,
  values,
} from '@/lib/data'

/** The home page's title, description and share image come from Site Settings in the CMS. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const image =
    settings?.ogImage && typeof settings.ogImage === 'object' && settings.ogImage.url
      ? new URL(
          settings.ogImage.sizes?.og?.url || settings.ogImage.url,
          getServerSideURL(),
        ).toString()
      : undefined
  return pageMeta({
    title: `${settings?.siteName || 'AR Tech Dogs'} · ${settings?.tagline || 'Web & Shopify Development, Cape Town'}`,
    absoluteTitle: true,
    description:
      settings?.defaultDescription ||
      'Senior-led web development studio in Cape Town. Custom websites, Shopify and Shopify Plus stores, and platforms built to load fast and grow.',
    path: '/',
    image,
  })
}

export default async function HomePage() {
  const [home, company, services, packages, projects, partners, team, testimonials, settings] =
    await Promise.all([
      getHomepage(),
      getCompany(),
      getServices(),
      getPackages(),
      getProjects(),
      getPartners(),
      getTeam(),
      getTestimonials(),
      getSiteSettings(),
    ])

  const featured = projects.filter((p) => p.featured).slice(0, 4)
  const founder = team.find((m) => m.type === 'founder')
  const experience = values(founder?.experience)

  const billing = { 'once-off': 'once-off', monthly: 'per month', custom: '' } as const
  const priceOf = (p: (typeof packages)[number]) =>
    p.price == null || p.billing === 'custom'
      ? 'Custom quote'
      : `${formatPrice(p.price)}${p.orMore ? '+' : ''}`

  // One option per service with published prices, for the live price brewer.
  const brew: BrewOption[] = services
    .map((s): BrewOption | null => {
      const own = packages.filter(
        (p) => (typeof p.service === 'object' ? p.service.id : p.service) === s.id,
      )
      const priced = own.filter((p) => p.price != null && p.billing !== 'custom')
      if (!priced.length) return null
      const min = priced.reduce((a, b) => ((a.price ?? 0) <= (b.price ?? 0) ? a : b))
      return {
        id: s.id,
        label: s.shortTitle || s.title,
        slug: s.slug ?? '',
        from: formatPrice(min.price!),
        monthly: min.billing === 'monthly',
        packages: own.map((p) => ({
          name: p.name,
          price: priceOf(p),
          billing: p.price == null || p.billing === 'custom' ? '' : billing[p.billing],
        })),
      }
    })
    .filter((o): o is BrewOption => o !== null)

  const location = settings?.contact?.location?.split('·')[0]?.trim() || 'South Africa'
  const cheapest = [...brew].sort(
    (a, b) => Number(a.from.replace(/\D/g, '')) - Number(b.from.replace(/\D/g, '')),
  )[0]
  const facts = [
    { label: 'Based in', value: location },
    ...(cheapest ? [{ label: 'Published prices', value: `From ${cheapest.from}` }] : []),
    {
      label: 'You work with',
      value: founder ? `${founder.name}, directly` : 'The developer, directly',
    },
  ]
  const fromBy = new Map(brew.map((o) => [o.id, o]))

  return (
    <>
      <HomeHero
        brands={experience.slice(0, 4)}
        facts={facts}
        heading={home?.heroHeading || 'Digital experiences. Engineered to grow.'}
        primary={{
          label: home?.primaryCta?.label || 'Start a Project',
          href: home?.primaryCta?.url || '/contact',
        }}
        secondary={{
          label: home?.secondaryCta?.label || 'Explore Our Work',
          href: home?.secondaryCta?.url || '/our-work',
        }}
        subheading={home?.heroSubheading}
      />

      {/* What we build: read like a café menu board. Name, what it is, and the published
          starting price on one line; the whole row is the link. */}
      {services.length > 0 && (
        <Section aria-labelledby="services-title" className="pt-8 md:pt-12">
          <div className="container">
            <SectionHeader
              id="services-title"
              lead="From a focused landing page to an enterprise Shopify Plus platform, with support that continues after launch."
              title="What we build"
            />
            <ul className="overflow-hidden rounded-[var(--radius-xl)] bg-background">
              {services.map((s, i) => {
                const price = fromBy.get(s.id)
                return (
                  <Reveal as="li" className="mt-1 first:mt-0" delay={i * 50} key={s.id}>
                    <Link
                      className="menu-row group grid items-center gap-x-10 gap-y-2 bg-card px-6 py-7 active:bg-secondary md:px-10 md:py-9 lg:grid-cols-12"
                      href={`/solutions/${s.slug}`}
                    >
                      <h3 className="menu-title text-[clamp(1.5rem,1.2rem+1.1vw,2.25rem)] font-bold leading-[1.05] tracking-[-0.02em] lg:col-span-5">
                        {s.title}
                      </h3>
                      <p className="max-w-[46ch] leading-relaxed text-muted-foreground lg:col-span-4">
                        {s.summary}
                      </p>
                      <p className="mt-3 flex items-center justify-between gap-4 lg:col-span-3 lg:mt-0 lg:justify-end">
                        <span className="text-lg font-semibold tabular">
                          {price
                            ? `From ${price.from}${price.monthly ? ' a month' : ''}`
                            : 'Custom quote'}
                        </span>
                        <span
                          aria-hidden
                          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <ArrowRight className="size-[1.05em]" strokeWidth={2.25} />
                        </span>
                      </p>
                    </Link>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </Section>
      )}

      {/* The studio: the claim, who is behind it, and the reasons, each marked with a bean. */}
      {(home?.positioning || (company?.differentiators?.length ?? 0) > 0) && (
        <Section aria-labelledby="why-title" tone="raised">
          <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-h1 max-w-[14ch]" id="why-title">
                  <SplitWords step={55} text="Built properly, by the person you speak to." />
                </h2>
              </Reveal>
              {home?.positioning && (
                <Reveal delay={60}>
                  <p className="text-lead mt-8 max-w-[42ch]">{home.positioning}</p>
                </Reveal>
              )}
              {experience.length > 0 && (
                <Reveal className="mt-12" delay={120}>
                  <h3 className="text-sm text-muted-foreground">
                    Brands the founder has built for, before AR Tech Dogs
                  </h3>
                  {/* A slow drift of names: the list is real, the motion just keeps it present. */}
                  <div className="marquee-wrap -mx-2 mt-4 overflow-hidden">
                    <div className="marquee">
                      {[0, 1].map((copy) => (
                        <ul
                          aria-hidden={copy === 1 || undefined}
                          className="flex shrink-0 items-center"
                          key={copy}
                        >
                          {experience.map((brand) => (
                            <li
                              className="flex items-center whitespace-nowrap px-2 text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] font-bold tracking-[-0.02em]"
                              key={brand}
                            >
                              {brand}
                              <Bean className="ml-4 size-4 text-roast/50" />
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
            {(company?.differentiators?.length ?? 0) > 0 && (
              <ul className="grid gap-x-10 gap-y-9 self-start sm:grid-cols-2 lg:col-span-6 lg:pt-3">
                {company.differentiators!.map((d, i) => (
                  <Reveal as="li" className="flex gap-4" delay={(i % 2) * 60} key={d.title}>
                    <Bean className="mt-1 size-5 shrink-0 text-roast" />
                    <div>
                      <h3 className="text-lg font-semibold leading-snug">{d.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">
                        {d.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </Section>
      )}

      {featured.length > 0 && (
        <Section aria-labelledby="work-title">
          <div className="container">
            <SectionHeader id="work-title" title="Recent projects">
              <Link
                className="-my-2 inline-flex min-h-11 items-center font-semibold underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                href="/our-work"
              >
                View all work
              </Link>
            </SectionHeader>
            <ul className="grid gap-6 md:grid-cols-2">
              {featured.map((p, i) => (
                <Reveal as="li" delay={(i % 2) * 80} key={p.id}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {(company?.process?.length ?? 0) > 0 && (
        <Section aria-label="How we deliver" tone="dark">
          <div className="container">
            <ProcessStory
              id="process-title"
              lead="Six stages, each with a deliverable you sign off before we move on."
              steps={company.process!}
              title="One sip at a time."
            />
          </div>
        </Section>
      )}

      {brew.length > 0 && (
        <Section aria-labelledby="pricing-title" tone="gold">
          <div className="container">
            <Reveal className="mb-10 flex flex-col gap-3 md:mb-12" stagger>
              <h2 className="text-h3" id="pricing-title">
                Published prices, before the first call
              </h2>
              <p className="max-w-xl text-muted-foreground">
                Pick what you need. These are real starting prices in rand, straight from our
                packages.
              </p>
            </Reveal>
            <PriceBrewer options={brew} />
          </div>
        </Section>
      )}

      {partners.length > 0 && (
        <Section aria-labelledby="eco-title">
          <div className="container grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-12">
              <h2 className="text-h2 max-w-[20ch]" id="eco-title">
                <SplitWords text="One partner across your whole stack." />
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-4" stagger>
              <p className="text-lead">
                The platforms, payment gateways and infrastructure we connect for clients.
              </p>
              <Link
                className="mt-6 inline-flex min-h-11 items-center font-semibold underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                href="/ecosystem"
              >
                How it fits together
              </Link>
            </Reveal>
            <Reveal as="ul" className="flex flex-wrap content-start gap-2 lg:col-span-8" delay={80}>
              {partners.map((p) => (
                <li
                  className="rounded-full bg-card px-4 py-2.5 text-[0.9375rem] font-semibold"
                  key={p.id}
                >
                  {p.name}
                </li>
              ))}
            </Reveal>
          </div>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section aria-labelledby="testimonials-title" tone="raised">
          <div className="container">
            <SectionHeader id="testimonials-title" title="In their words" />
            <ul className="grid gap-16 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <Reveal as="li" delay={i * 60} key={t.id}>
                  <blockquote className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-semibold leading-snug tracking-[-0.015em]">
                    “{t.quote}”
                  </blockquote>
                  <p className="mt-6">
                    <span className="font-semibold">{t.name}</span>
                    {(t.role || t.company) && (
                      <span className="text-muted-foreground">
                        {', '}
                        {[t.role, t.company].filter(Boolean).join(', ')}
                      </span>
                    )}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CTASection body={home?.finalCtaBody} title={home?.finalCtaHeading} />
    </>
  )
}
