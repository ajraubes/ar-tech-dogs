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
        eyebrow="Pricing"
        lead="Starting prices for every service, with what is included at each level. Once-off and monthly prices are labelled clearly."
        title="Transparent pricing. No surprises."
      >
        {groups.length > 1 && (
          <nav aria-label="Jump to service">
            <ul className="flex flex-wrap gap-2">
              {groups.map(({ service }) => (
                <li key={service.id}>
                  <Link
                    className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm transition-colors hover:border-border-strong hover:bg-foreground/[0.04]"
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
            className={i > 0 ? 'border-t border-border' : undefined}
            id={service.slug ?? undefined}
            key={service.id}
          >
            <div className="container">
              <SectionHeader
                eyebrow={service.number}
                id={`${service.slug}-title`}
                lead={service.summary}
                title={service.title}
              >
                <Link
                  className="-my-2 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
                  href={`/solutions/${service.slug}`}
                >
                  About this service →
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
          <p className="max-w-3xl rounded-xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
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
