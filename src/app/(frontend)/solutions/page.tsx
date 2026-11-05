import type { Metadata } from 'next'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { ServiceCard } from '@/components/site/ServiceCard'
import { getServices } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Custom web development, Shopify and Shopify Plus, business websites, landing pages and ongoing support from a senior-led South African studio.',
  alternates: { canonical: '/solutions' },
}

export default async function SolutionsPage() {
  const services = await getServices()
  return (
    <>
      <PageHero
        lead="What you can buy from us. Every solution has transparent starting prices, a clear process and a named deliverable at each stage."
        title="Solutions for every stage of growth."
      />
      <section className="py-20 md:py-28">
        <div className="container">
          {services.length ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {services.map((s, i) => (
                <Reveal as="li" delay={(i % 3) * 60} key={s.id}>
                  <ServiceCard headingLevel="h2" service={s} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState
              action={{ label: 'Start a project', href: '/contact' }}
              body="Services have not been added yet. Add them under Agency → Services in the CMS, or run the seed script."
              title="No services yet"
            />
          )}
        </div>
      </section>
      <CTASection />
    </>
  )
}
