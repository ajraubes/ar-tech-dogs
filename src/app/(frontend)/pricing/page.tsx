import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PackageGrid } from '@/components/site/PackageGrid'
import { PageHero } from '@/components/site/PageHero'
import { Section, SectionHeader } from '@/components/site/Section'
import { getPackages, getServices, getSiteSettings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent starting prices in ZAR for websites, Shopify, Shopify Plus, landing pages and monthly care plans.',
  alternates: { canonical: '/pricing' },
}

export default async function PricingPage() {
  const [services, packages, settings] = await Promise.all([
    getServices(),
    getPackages(),
    getSiteSettings(),
  ])
  const groups = services
    .map((s) => ({
      service: s,
      items: packages.filter(
        (p) => (typeof p.service === 'object' ? p.service.id : p.service) === s.id,
      ),
    }))
    .filter((g) => g.items.length)

  return (
    <>
      <PageHero
        lead="Starting prices for every service, with what is included at each level. Once-off and monthly prices are labelled clearly."
        title="Transparent pricing. No surprises."
      >
        {groups.length > 1 && (
          <nav aria-label="Jump to service">
            <ul className="flex flex-wrap gap-2">
              {groups.map(({ service }) => (
                <li key={service.id}>
                  <Link
                    className="inline-flex h-11 items-center rounded-full bg-background px-5 text-[0.9375rem] font-semibold transition-[background-color,transform] duration-200 hover:bg-secondary active:scale-[0.96]"
                    href={`#${service.slug}`}
                  >
                    {service.shortTitle || service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </PageHero>

      {groups.length ? (
        groups.map(({ service, items }, i) => (
          <Section
            aria-labelledby={`${service.slug}-title`}
            tone={i % 2 ? 'raised' : 'base'}
            id={service.slug ?? undefined}
            key={service.id}
          >
            <div className="container">
              <SectionHeader
                id={`${service.slug}-title`}
                lead={service.summary}
                title={service.title}
              >
                <Link
                  className="-my-2 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
                  href={`/solutions/${service.slug}`}
                >
                  About this service
                </Link>
              </SectionHeader>
              <PackageGrid packages={items} serviceTitle={service.title} />
            </div>
          </Section>
        ))
      ) : (
        <div className="container py-20">
          <EmptyState
            action={{ label: 'Request a quote', href: '/contact' }}
            body="Packages have not been published yet. Contact us for a tailored quote."
            title="Pricing coming soon"
          />
        </div>
      )}

      {settings?.pricingNote && (
        <div className="container pb-8">
          <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-muted-foreground">
            {settings.pricingNote}
          </p>
        </div>
      )}

      <CTASection
        body="Not sure which package fits? Describe the project and we will recommend the right starting point."
        secondary={null}
        title="Need something tailored?"
      />
    </>
  )
}
