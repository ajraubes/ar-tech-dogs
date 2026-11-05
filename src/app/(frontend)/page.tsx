import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EcosystemGrid } from '@/components/site/EcosystemGrid'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { HomeHero } from '@/components/site/HomeHero'
import { ProcessSteps } from '@/components/site/ProcessSteps'
import { ProjectCard } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { ServiceCard } from '@/components/site/ServiceCard'
import { Button } from '@/components/ui/button'
import {
  formatPrice,
  getCompany,
  getHomepage,
  getPackages,
  getPartners,
  getProjects,
  getServices,
  getTeam,
  getTestimonials,
  values,
} from '@/lib/data'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [home, company, services, packages, projects, partners, team, testimonials] =
    await Promise.all([
      getHomepage(),
      getCompany(),
      getServices(),
      getPackages(),
      getProjects(),
      getPartners(),
      getTeam(),
      getTestimonials(),
    ])

  const featured = projects.filter((p) => p.featured).slice(0, 4)
  const founder = team.find((m) => m.type === 'founder')
  const experience = values(founder?.experience)

  // "From" price per service, for the pricing teaser.
  const fromPrices = services
    .map((s) => {
      const own = packages.filter(
        (p) =>
          (typeof p.service === 'object' ? p.service.id : p.service) === s.id && p.price != null,
      )
      if (!own.length) return null
      const min = own.reduce((a, b) => ((a.price ?? 0) <= (b.price ?? 0) ? a : b))
      return { service: s, price: min.price!, monthly: min.billing === 'monthly' }
    })
    .filter(Boolean) as { service: (typeof services)[number]; price: number; monthly: boolean }[]

  return (
    <>
      <HomeHero
        eyebrow={home?.heroEyebrow}
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

      {(home?.positioning || experience.length > 0) && (
        <section aria-label="Positioning" className="border-y border-border">
          <div className="container grid gap-10 py-14 md:py-16 lg:grid-cols-12 lg:items-center">
            {home?.positioning && (
              <Reveal className="lg:col-span-7">
                <p className="text-xl leading-snug tracking-tight md:text-2xl">
                  {home.positioning}
                </p>
              </Reveal>
            )}
            {experience.length > 0 && (
              <Reveal className="lg:col-span-5" delay={100}>
                <p className="eyebrow">Founder experience includes</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] font-medium text-foreground/80">
                  {experience.map((brand) => (
                    <li key={brand}>{brand}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Work by the founder before AR Tech Dogs.
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {services.length > 0 && (
        <Section aria-labelledby="services-title">
          <div className="container">
            <SectionHeader
              eyebrow="Solutions"
              id="services-title"
              lead="From a focused landing page to an enterprise Shopify Plus platform, with support that continues after launch."
              title="What we build"
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {services.map((s, i) => (
                <Reveal as="li" delay={(i % 3) * 60} key={s.id}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {(company?.differentiators?.length ?? 0) > 0 && (
        <Section aria-labelledby="why-title" tone="light">
          <div className="container">
            <SectionHeader
              eyebrow="Why AR Tech Dogs"
              id="why-title"
              lead="Senior-level development without agency overhead. You talk to the person who writes the code."
              title="Built properly, by the person you speak to."
            />
            <FeatureGrid items={company.differentiators!} columns={4} />
          </div>
        </Section>
      )}

      {featured.length > 0 && (
        <Section aria-labelledby="work-title">
          <div className="container">
            <SectionHeader eyebrow="Selected work" id="work-title" title="Recent projects">
              <Link
                className="-my-2 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
                href="/our-work"
              >
                View all work →
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
        <Section aria-labelledby="process-title" tone="raised">
          <div className="container">
            <SectionHeader
              eyebrow="How we deliver"
              id="process-title"
              lead="Six stages, each with a clear deliverable you sign off before we move on."
              title="A process you can see."
            />
            <ProcessSteps steps={company.process!} />
          </div>
        </Section>
      )}

      {fromPrices.length > 0 && (
        <Section aria-labelledby="pricing-title">
          <div className="container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader
                className="mb-0 md:mb-0"
                eyebrow="Transparent pricing"
                id="pricing-title"
                lead="Published starting prices for every service, so you know where you stand before the first call."
                title="Know the starting point."
              >
                <div>
                  <Button asChild variant="outline">
                    <Link href="/pricing">Compare all packages</Link>
                  </Button>
                </div>
              </SectionHeader>
            </div>
            <ul className="divide-y divide-border border-y border-border lg:col-span-7">
              {fromPrices.map(({ service, price, monthly }, i) => (
                <Reveal as="li" delay={i * 50} key={service.id}>
                  <Link
                    className="group flex min-h-18 items-center justify-between gap-6 py-5"
                    href={`/solutions/${service.slug}#packages`}
                  >
                    <span className="text-lg font-medium tracking-tight">{service.title}</span>
                    <span className="flex shrink-0 items-baseline gap-2 text-right">
                      <span className="text-xs text-muted-foreground">from</span>
                      <span className="text-xl font-semibold tabular">{formatPrice(price)}</span>
                      {monthly && <span className="text-xs text-muted-foreground">/mo</span>}
                      <span
                        aria-hidden
                        className="ml-2 text-brand-text transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {partners.length > 0 && (
        <Section aria-labelledby="eco-title" className="pt-0 md:pt-0">
          <div className="container">
            <SectionHeader
              eyebrow="Ecosystem"
              id="eco-title"
              lead="The platforms, payment gateways and infrastructure we connect for our clients."
              title="One partner across your stack."
            >
              <Link
                className="-my-2 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
                href="/ecosystem"
              >
                Explore the ecosystem →
              </Link>
            </SectionHeader>
            <EcosystemGrid compact partners={partners} />
          </div>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section aria-labelledby="testimonials-title" tone="light">
          <div className="container">
            <SectionHeader eyebrow="Clients" id="testimonials-title" title="In their words" />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal
                  as="li"
                  className="surface flex flex-col p-6 md:p-8"
                  delay={i * 60}
                  key={t.id}
                >
                  <blockquote className="flex-1 text-lg leading-relaxed tracking-tight">
                    “{t.quote}”
                  </blockquote>
                  <p className="mt-6 text-sm">
                    <span className="font-medium">{t.name}</span>
                    {(t.role || t.company) && (
                      <span className="text-muted-foreground">
                        {' · '}
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
