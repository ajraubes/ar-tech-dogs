import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

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

  const facts = [
    {
      label: 'Based in',
      value: settings?.contact?.location?.split('·')[0]?.trim() || 'South Africa',
    },
    { label: 'Working with', value: 'Clients in South Africa and abroad' },
    { label: 'Led by', value: founder ? `${founder.name}, ${founder.role}` : 'A senior developer' },
  ]

  return (
    <>
      <HomeHero
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

      {/* The studio: three plain facts beside one wide paragraph, then the founder's record. */}
      {home?.positioning && (
        <Section aria-labelledby="studio-title" tone="raised">
          <div className="container grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-3" stagger>
              <h2 className="text-h3" id="studio-title">
                The studio
              </h2>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-muted-foreground">{f.label}</dt>
                    <dd className="mt-0.5 font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <div className="lg:col-span-8 lg:col-start-5">
              <Reveal>
                <p className="text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] font-semibold leading-[1.25] tracking-[-0.015em]">
                  {home.positioning}
                </p>
              </Reveal>
              {experience.length > 0 && (
                <Reveal className="mt-14 md:mt-20" delay={80}>
                  <h3 className="font-semibold">Brands the founder has built for</h3>
                  <ul className="mt-4 columns-2 gap-x-10 text-lg text-muted-foreground sm:columns-3">
                    {experience.map((brand) => (
                      <li className="py-1" key={brand}>
                        {brand}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Work by the founder before AR Tech Dogs, not studio client work.
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* What we build: an index of names, no boxes. The whole row is the link. */}
      {services.length > 0 && (
        <Section aria-labelledby="services-title">
          <div className="container">
            <SectionHeader
              id="services-title"
              lead="From a focused landing page to an enterprise Shopify Plus platform, with support that continues after launch."
              title="What we build"
            />
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal as="li" delay={(i % 3) * 70} key={s.id}>
                  <Link
                    className="group -mx-4 block rounded-[var(--radius-lg)] px-4 py-6 transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)] hover:bg-card active:scale-[0.99] md:py-8"
                    href={`/solutions/${s.slug}`}
                  >
                    <h3 className="text-h3 flex items-center gap-2">
                      {s.title}
                      <span
                        aria-hidden
                        className="text-brand-text opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-quart)] -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <ArrowRight className="size-[1.05em]" strokeWidth={2.25} />
                      </span>
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{s.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Why: the claim set large, the reasons as a table pushed to the right. */}
      {(company?.differentiators?.length ?? 0) > 0 && (
        <Section aria-labelledby="why-title" tone="raised">
          <div className="container">
            <Reveal>
              <h2 className="text-h1 max-w-[16ch]" id="why-title">
                Built properly, by the person you speak to.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12">
              <Reveal className="lg:col-span-4" delay={60}>
                <p className="text-lead">
                  Senior-level development without agency overhead. You talk to the person who
                  writes the code.
                </p>
              </Reveal>
              <dl className="lg:col-span-7 lg:col-start-6">
                {company.differentiators!.map((d, i) => (
                  <Reveal
                    className="grid gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8"
                    delay={i * 50}
                    key={d.title}
                  >
                    <dt className="font-semibold">{d.title}</dt>
                    <dd className="text-muted-foreground">{d.description}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
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
            <Reveal className="lg:col-span-8" delay={80}>
              <p className="text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] font-semibold leading-[1.3] tracking-[-0.015em]">
                {partners.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <span className="text-muted-foreground transition-colors duration-150 hover:text-foreground">
                      {p.name}
                    </span>
                    {i < partners.length - 1 ? (
                      <span className="text-muted-foreground">, </span>
                    ) : (
                      <span className="text-muted-foreground">.</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
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
