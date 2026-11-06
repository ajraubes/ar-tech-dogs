import type { Metadata } from 'next'

import { pageMeta } from '@/utilities/pageMeta'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EcosystemGrid } from '@/components/site/EcosystemGrid'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import { getPartners } from '@/lib/data'

export const metadata: Metadata = pageMeta({
  title: 'Platforms & Integrations We Work With',
  description:
    'The commerce platforms, CMS, payment gateways, infrastructure and analytics tools AR Tech Dogs builds on and connects for South African businesses.',
  path: '/ecosystem',
  share: 'How your stack fits together.',
  kicker: 'Ecosystem',
})

export default async function EcosystemPage() {
  const partners = await getPartners()
  const anyOfficial = partners.some((p) => p.officialPartner)
  return (
    <>
      <PageHero
        lead="We connect the parts of a digital business: commerce, content, payments, infrastructure and data."
        title="How your stack fits together."
      />
      <section className="py-20 md:py-28">
        <div className="container">
          {partners.length ? (
            <>
              <EcosystemGrid partners={partners} />
              {!anyOfficial && (
                <p className="mt-16 max-w-2xl text-sm text-muted-foreground">
                  These are platforms we build with. Listing a platform does not imply an official
                  partnership or certification.
                </p>
              )}
            </>
          ) : (
            <EmptyState
              body="Add platforms under Agency → Ecosystem in the CMS."
              title="Ecosystem coming soon"
            />
          )}
        </div>
      </section>
      <CTASection />
    </>
  )
}
