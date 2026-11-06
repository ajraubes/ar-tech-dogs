import type { Metadata } from 'next'

import { pageMeta } from '@/utilities/pageMeta'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { getCapabilities, values } from '@/lib/data'

export const metadata: Metadata = pageMeta({
  title: 'Development Capabilities & Tech Stack',
  description:
    'Frontend, backend and CMS development, Shopify engineering, eCommerce architecture, integrations, performance and infrastructure, end to end.',
  path: '/capabilities',
  share: 'Engineering depth, end to end.',
  kicker: 'Capabilities',
})

export default async function CapabilitiesPage() {
  const capabilities = await getCapabilities()
  return (
    <>
      <PageHero
        lead="Solutions are what you buy. Capabilities are how we build it: the engineering behind every project."
        title="Engineering depth, end to end."
      />
      <section className="py-20 md:py-28">
        <div className="container">
          {capabilities.length ? (
            <ol className="space-y-4">
              {capabilities.map((c) => (
                <Reveal
                  as="li"
                  className="grid gap-4 rounded-[var(--radius-xl)] bg-card p-7 md:grid-cols-12 md:gap-8 md:p-10"
                  key={c.id}
                >
                  <h2 className="text-h3 md:col-span-5" id={c.slug ?? undefined}>
                    {c.title}
                  </h2>
                  <div className="md:col-span-7">
                    <p className="text-lg leading-relaxed text-muted-foreground">{c.summary}</p>
                    {values(c.items).length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {values(c.items).map((item) => (
                          <li
                            className="rounded-full bg-background px-3.5 py-1.5 text-base"
                            key={item}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>
          ) : (
            <EmptyState
              body="Add capabilities under Agency → Capabilities in the CMS."
              title="No capabilities yet"
            />
          )}
        </div>
      </section>
      <CTASection />
    </>
  )
}
