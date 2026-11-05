import type { Metadata } from 'next'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { getCapabilities, values } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Frontend, backend and CMS development, Shopify engineering, eCommerce architecture, integrations, performance and infrastructure.',
  alternates: { canonical: '/capabilities' },
}

export default async function CapabilitiesPage() {
  const capabilities = await getCapabilities()
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        lead="Solutions are what you buy. Capabilities are how we build it: the engineering behind every project."
        title="Engineering depth, end to end."
      />
      <section className="py-20 md:py-28">
        <div className="container">
          {capabilities.length ? (
            <ol className="divide-y divide-border border-y border-border">
              {capabilities.map((c, i) => (
                <Reveal
                  as="li"
                  className="grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-12"
                  key={c.id}
                >
                  <span className="font-mono text-sm text-muted-foreground tabular md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-h3 md:col-span-4" id={c.slug ?? undefined}>
                    {c.title}
                  </h2>
                  <div className="md:col-span-7">
                    <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                      {c.summary}
                    </p>
                    {values(c.items).length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {values(c.items).map((item) => (
                          <li
                            className="rounded-full border border-border px-3 py-1 font-mono text-[0.8125rem]"
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
