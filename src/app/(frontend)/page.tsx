import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  alternates: { canonical: '/' },
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

      {/* What we build: six tiles, each with its published starting price. The tile is the link. */}
      {services.length > 0 && (
        <Section aria-labelledby="services-title" className="pt-8 md:pt-12">
          <div className="container">
            <SectionHeader
              id="services-title"
              lead="From a focused landing page to an enterprise Shopify Plus platform, with support that continues after launch."
              title="What we build"
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const price = fromBy.get(s.id)
                return (
                  <Reveal as="li" className="h-full" delay={(i % 3) * 70} key={s.id}>
                    <Link
                      className="group flex h-full flex-col rounded-[var(--radius-xl)] bg-card p-7 transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:bg-popover hover:shadow-[var(--shadow-float)] active:scale-[0.99] md:p-8"
                      href={`/solutions/${s.slug}`}
                    >
                      <h3 className="text-h3">{s.title}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                        {s.summary}
                      </p>
                      <p className="mt-8 flex items-center justify-between gap-4 text-[0.9375rem] font-semibold">
                        <span>
                          {price
                            ? `From ${price.from}${price.monthly ? ' a month' : ''}`
                            : 'Custom quote'}
                        </span>
                        <span
                          aria-hidden
                          className="flex size-10 items-center justify-center rounded-full bg-background transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-primary-foreground"
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
                  Built properly, by the person you speak to.
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
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {experience.map((brand) => (
                      <li
                        className="rounded-full bg-background px-4 py-2 text-[0.9375rem] font-semibold"
                        key={brand}
                      >
                        {brand}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
            {(company?.differentiators?.length ?? 0) > 0 && (
              <dl className="grid gap-3 self-start lg:col-span-6">
                {company.differentiators!.map((d, i) => (
                  <Reveal
                    className="flex gap-4 rounded-[var(--radius-xl)] bg-background p-6"
                    delay={i * 60}
                    key={d.title}
                  >
                    <Bean className="mt-1 size-5 shrink-0 text-roast" />
                    <div>
                      <dt className="font-semibold">{d.title}</dt>
                      <dd className="mt-1 text-muted-foreground">{d.description}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
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
                One partner across your whole stack.
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
