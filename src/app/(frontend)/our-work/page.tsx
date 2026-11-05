import type { Metadata } from 'next'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import { WorkGrid } from '@/components/site/WorkGrid'
import { getProjects } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Case studies across Shopify, custom websites and eCommerce platforms.',
  alternates: { canonical: '/our-work' },
}

export default async function WorkPage() {
  const projects = await getProjects()
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        lead="The challenge, the solution and the technology behind each project, with results where they can be measured."
        title="Work that holds up in production."
      />
      <section className="py-20 md:py-28">
        <div className="container">
          {projects.length ? (
            <WorkGrid projects={projects} />
          ) : (
            <EmptyState
              action={{ label: 'Meet the founder', href: '/meet-the-team' }}
              body="We are preparing detailed case studies and only publish client work with permission. In the meantime, read about the founder’s experience."
              title="Case studies are on the way"
            />
          )}
        </div>
      </section>
      <CTASection />
    </>
  )
}
