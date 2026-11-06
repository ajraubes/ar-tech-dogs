import type { Metadata } from 'next'

import { pageMeta } from '@/utilities/pageMeta'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { getCompany } from '@/lib/data'

export const metadata: Metadata = pageMeta({
  title: 'About Our Web Development Studio',
  description:
    'AR Tech Dogs is a senior-led web development studio in Cape Town. The story, values and way of working behind every website and Shopify store we build.',
  path: '/about',
  share: 'A development partner, not a template shop.',
  kicker: 'About AR Tech Dogs',
})

export default async function AboutPage() {
  const company = await getCompany()
  const paragraphs = (company?.story ?? '').split(/\n\s*\n/).filter(Boolean)

  return (
    <>
      <PageHero lead={company?.intro} title="A development partner, not a template shop." />

      {paragraphs.length > 0 && (
        <Section aria-labelledby="story-title">
          <div className="container grid gap-10 lg:grid-cols-12">
            <h2 className="text-h2 lg:col-span-4" id="story-title">
              Our story
            </h2>
            <Reveal className="space-y-6 text-lg leading-relaxed lg:col-span-7 lg:col-start-6">
              {paragraphs.map((p, i) => (
                <p
                  className={
                    i === 0
                      ? 'text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-semibold leading-snug tracking-[-0.015em]'
                      : 'text-muted-foreground'
                  }
                  key={i}
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </Section>
      )}

      {(company?.mission || company?.vision) && (
        <section aria-label="Mission and vision" data-theme="dark">
          <div className="container grid md:grid-cols-2 md:gap-16">
            {[
              { label: 'Mission', text: company.mission },
              { label: 'Vision', text: company.vision },
            ]
              .filter((x) => x.text)
              .map((x, i) => (
                <Reveal
                  className={i === 0 ? 'pt-16 md:py-28' : 'pb-16 pt-10 md:py-28'}
                  delay={i * 80}
                  key={x.label}
                >
                  <h2 className="text-h3 text-brand-text">{x.label}</h2>
                  <p className="mt-5 text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-semibold leading-snug tracking-[-0.015em]">
                    {x.text}
                  </p>
                </Reveal>
              ))}
          </div>
        </section>
      )}

      {(company?.values?.length ?? 0) > 0 && (
        <Section aria-labelledby="values-title">
          <div className="container">
            <SectionHeader id="values-title" title="What we hold ourselves to." />
            <FeatureGrid items={company.values!} />
          </div>
        </Section>
      )}

      {company?.philosophy && (
        <Section aria-labelledby="philosophy-title" className="pt-0 md:pt-0">
          <div className="container">
            <Reveal
              className="rounded-[var(--radius-xl)] bg-crema p-8 text-espresso md:p-16"
              stagger
            >
              <h2 className="text-h3" id="philosophy-title">
                Technical philosophy
              </h2>
              <p className="mt-6 max-w-4xl text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-snug tracking-[-0.015em]">
                {company.philosophy}
              </p>
            </Reveal>
          </div>
        </Section>
      )}

      {(company?.differentiators?.length ?? 0) > 0 && (
        <Section aria-labelledby="why-title" tone="raised">
          <div className="container">
            <SectionHeader id="why-title" title="What makes us different." />
            <FeatureGrid columns={4} items={company.differentiators!} />
          </div>
        </Section>
      )}

      <CTASection />
    </>
  )
}
