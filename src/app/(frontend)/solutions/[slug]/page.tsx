import type { Metadata } from 'next'

import { pageMeta } from '@/utilities/pageMeta'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Bean } from '@/components/site/Coffee'
import { CTASection } from '@/components/site/CTASection'
import { FAQ } from '@/components/site/FAQ'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { JsonLd } from '@/components/site/JsonLd'
import { PackageGrid } from '@/components/site/PackageGrid'
import { PageHero } from '@/components/site/PageHero'
import { ProcessStory } from '@/components/site/ProcessStory'
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
  // Short summaries get a line of context so the snippet is not cut thin in results.
  const description =
    service.summary.length < 110
      ? `${service.summary} From a senior-led studio in Cape Town, with clear starting prices.`
      : service.summary
  return pageMeta({
    title: `${service.title} in South Africa`,
    description,
    path: `/solutions/${slug}`,
    share: service.heroHeading || service.title,
    kicker: service.title,
  })
}

const List = ({ items }: { items: string[] }) => (
  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
    {items.map((item) => (
      <li className="flex gap-3 text-lg" key={item}>
        <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-brand" />
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
      <PageHero lead={service.overview} title={service.heroHeading}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={enquireHref}>
              Start a project{' '}
              <ArrowRight aria-hidden className="size-[1.05em]" strokeWidth={2.25} />
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
        <section>
          <div className="container grid gap-x-16 gap-y-12 py-16 md:grid-cols-12 md:py-24">
            {audience.length > 0 && (
              <Reveal className="md:col-span-7">
                <h2 className="text-h3 mb-6">Who it is for</h2>
                <ul className="space-y-5">
                  {audience.map((a) => (
                    <li
                      className="flex gap-4 text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-semibold leading-snug tracking-[-0.015em]"
                      key={a}
                    >
                      <Bean className="mt-1.5 size-5 shrink-0 text-roast" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {technologies.length > 0 && (
              <Reveal className="md:col-span-5" delay={80}>
                <h2 className="text-h3 mb-6">Technologies</h2>
                <ul className="flex flex-wrap gap-2">
                  {technologies.map((t) => (
                    <li
                      className="rounded-full bg-card px-4 py-2 text-[0.9375rem] font-semibold"
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
                  {deliverables.map((d) => (
                    <li className="rounded-[var(--radius-md)] bg-card px-5 py-4 text-lg" key={d}>
                      {d}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section aria-labelledby="packages-title" id="packages" tone="raised">
        <div className="container">
          <SectionHeader
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
        <Section aria-label="How the project runs" tone="dark">
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

      {faqs.length > 0 && (
        <Section aria-labelledby="faq-title">
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
        <section aria-labelledby="related-title" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-h3 mb-6" id="related-title">
              Other solutions
            </h2>
            <ul className="grid gap-3 md:grid-cols-3">
              {others.map((s) => (
                <li key={s.id}>
                  <Link
                    className="group flex min-h-16 items-center justify-between rounded-[var(--radius-lg)] bg-card px-6 font-semibold transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-[0.99]"
                    href={`/solutions/${s.slug}`}
                  >
                    <span>{s.title}</span>
                    <span
                      aria-hidden
                      className="text-brand-text transition-transform group-hover:translate-x-1"
                    >
                      <ArrowRight className="size-[1.05em]" strokeWidth={2.25} />
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
