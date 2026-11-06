import type { Metadata } from 'next'

import { pageMeta } from '@/utilities/pageMeta'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import { WorkGrid } from '@/components/site/WorkGrid'
import { Reveal } from '@/components/site/Reveal'
import { getProjects, getTeam, values } from '@/lib/data'

export const metadata: Metadata = pageMeta({
  title: 'Our Work: Web & Shopify Case Studies',
  description:
    'Case studies from AR Tech Dogs: Shopify stores, custom websites and eCommerce platforms, with the challenge, the solution and the technology behind each.',
  path: '/our-work',
  share: 'Work that holds up in production.',
  kicker: 'Our work',
})

export default async function WorkPage() {
  const [projects, team] = await Promise.all([getProjects(), getTeam()])
  const brands = values(team.find((m) => m.type === 'founder')?.experience)
  return (
    <>
      <PageHero
        lead="The challenge, the solution and the technology behind each project, with results where they can be measured."
        title="Work that holds up in production."
      />
      <section className="py-20 md:py-28">
        <div className="container">
          {projects.length ? (
            <WorkGrid projects={projects} />
          ) : brands.length > 0 ? (
            // No case studies yet: say so plainly, and show the real experience behind the studio,
            // labelled as the founder's work before AR Tech Dogs.
            <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5" stagger>
                <h2 className="text-h2 max-w-[14ch]">Case studies are on the way.</h2>
                <p className="text-lead mt-6 max-w-[40ch]">
                  We only publish client work with permission, and we are writing up the first
                  projects properly: the problem, what we built and what changed.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/meet-the-team">Meet the founder</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/capabilities">See our capabilities</Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal
                className="rounded-[var(--radius-xl)] bg-card p-8 md:p-12 lg:col-span-7"
                delay={120}
              >
                <h3 className="text-lg font-semibold">
                  Before AR Tech Dogs, the founder built for
                </h3>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[clamp(1.75rem,1.3rem+1.8vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                  {brands.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-muted-foreground">
                  Founder experience before AR Tech Dogs, not AR Tech Dogs client work.
                </p>
              </Reveal>
            </div>
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
