import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { FAQ } from '@/components/site/FAQ'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { JsonLd } from '@/components/site/JsonLd'
import { PackageGrid } from '@/components/site/PackageGrid'
import { PageHero } from '@/components/site/PageHero'
import { ProcessSteps } from '@/components/site/ProcessSteps'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { Button } from '@/components/ui/button'
import {
  getCompany,
  getPackagesForService,
  getServiceBySlug,
  getServices,
  getSiteSettings,
  values,
} from '@/lib/data'
import { getServerSideURL } from '@/utilities/getURL'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  // Pages render on first request, so the Docker build never needs the database.
  if (process.env.NEXT_PHASE === 'phase-production-build') return []
  const services = await getServices()
  return services.filter((s) => s.slug).map((s) => ({ slug: s.slug! }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/solutions/${slug}` },
  }
}

const List = ({ items }: { items: string[] }) => (
  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
    {items.map((item) => (
      <li className="flex gap-3 border-t border-border pt-3 text-[0.9375rem]" key={item}>
        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
)

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const [packages, company, settings, all] = await Promise.all([
    getPackagesForService(service.id),
    getCompany(),
    getSiteSettings(),
    getServices(),
  ])
  const audience = values(service.audience)
  const features = values(service.features)
  const deliverables = values(service.deliverables)
  const technologies = values(service.technologies)
  const faqs = service.faqs ?? []
  const enquireHref = `/contact?service=${encodeURIComponent(service.title)}`
  const others = all.filter((s) => s.id !== service.id).slice(0, 3)
  const url = getServerSideURL()

  return (
    <>
      <PageHero
        eyebrow={`${service.number} — ${service.title}`}
        lead={service.overview}
        title={service.heroHeading}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={enquireHref}>
              Start a project <span aria-hidden>→</span>
            </Link>
          </Button>
          {packages.length > 0 && (
            <Button asChild size="lg" variant="outline">
              <Link href="#packages">See packages</Link>
            </Button>
          )}
        </div>
      </PageHero>

      {(audience.length > 0 || technologies.length > 0) && (
        <section className="border-b border-border">
          <div className="container grid gap-10 py-14 md:grid-cols-2 md:py-16">
            {audience.length > 0 && (
              <Reveal>
                <h2 className="eyebrow mb-5">Who it is for</h2>
                <ul className="space-y-3">
                  {audience.map((a) => (
                    <li className="text-lg tracking-tight" key={a}>
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {technologies.length > 0 && (
              <Reveal delay={80}>
                <h2 className="eyebrow mb-5">Technologies</h2>
                <ul className="flex flex-wrap gap-2">
                  {technologies.map((t) => (
                    <li
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-[0.8125rem]"
                      key={t}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {(service.problems?.length ?? 0) > 0 && (
        <Section aria-labelledby="problems-title">
          <div className="container">
            <SectionHeader
              eyebrow="Problems we solve"
              id="problems-title"
              title="What usually goes wrong, and how we fix it."
            />
            <FeatureGrid items={service.problems!} />
          </div>
        </Section>
      )}

      {(features.length > 0 || deliverables.length > 0) && (
        <Section aria-labelledby="features-title" className="pt-0 md:pt-0">
          <div className="container grid gap-16 lg:grid-cols-12">
            {features.length > 0 && (
              <div className="lg:col-span-7">
                <h2 className="text-h3 mb-8" id="features-title">
                  Key features
                </h2>
                <List items={features} />
              </div>
            )}
            {deliverables.length > 0 && (
              <div className="lg:col-span-5">
                <h2 className="text-h3 mb-8">What you receive</h2>
                <ol className="space-y-3">
                  {deliverables.map((d, i) => (
                    <li className="flex gap-4 border-t border-border pt-3 text-[0.9375rem]" key={d}>
                      <span className="font-mono text-xs text-muted-foreground tabular">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {d}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section aria-labelledby="packages-title" id="packages" tone="light">
        <div className="container">
          <SectionHeader
            eyebrow="Packages"
            id="packages-title"
            lead={
              packages.length
                ? 'Starting prices with clear inclusions. Every project is confirmed in a scoped proposal.'
                : 'This service is scoped and quoted per project. Tell us what you need and we will send a tailored proposal.'
            }
            title={packages.length ? 'Choose a starting point.' : 'Tailored to your project.'}
          />
          {packages.length ? (
            <PackageGrid
              note={settings?.pricingNote}
              packages={packages}
              serviceTitle={service.title}
            />
          ) : (
            <Button asChild size="lg">
              <Link href={enquireHref}>Request a tailored quote</Link>
            </Button>
          )}
        </div>
      </Section>

      {(company?.process?.length ?? 0) > 0 && (
        <Section aria-labelledby="process-title">
          <div className="container">
            <SectionHeader eyebrow="Process" id="process-title" title="How the project runs." />
            <ProcessSteps steps={company.process!} />
          </div>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section aria-labelledby="faq-title" className="pt-0 md:pt-0">
          <div className="container grid gap-10 lg:grid-cols-12">
            <h2 className="text-h2 lg:col-span-4" id="faq-title">
              Questions
            </h2>
            <div className="lg:col-span-8">
              <FAQ items={faqs} />
            </div>
          </div>
        </Section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-border py-16">
          <div className="container">
            <h2 className="eyebrow mb-6" id="related-title">
              Other solutions
            </h2>
            <ul className="grid gap-3 md:grid-cols-3">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    className="group flex min-h-16 items-center justify-between rounded-xl border border-border px-5 transition-colors hover:border-border-strong"
                    href={`/solutions/${s.slug}`}
                  >
                    <span className="font-medium">{s.title}</span>
                    <span
                      aria-hidden
                      className="text-brand-text transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection
        primary={{ label: 'Start a project', href: enquireHref }}
        title={`Ready to talk about ${service.shortTitle || service.title}?`}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          provider: { '@type': 'ProfessionalService', name: 'AR Tech Dogs', url },
          areaServed: ['ZA', 'Worldwide'],
          url: `${url}/solutions/${service.slug}`,
          ...(packages.some((p) => p.price != null) && {
            offers: packages
              .filter((p) => p.price != null)
              .map((p) => ({
                '@type': 'Offer',
                name: p.name,
                priceCurrency: 'ZAR',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: p.price,
                  priceCurrency: 'ZAR',
                },
              })),
          }),
        }}
      />
      {faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }}
        />
      )}
    </>
  )
}
