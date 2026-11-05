import type { Metadata } from 'next'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { FeatureGrid } from '@/components/site/FeatureGrid'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { getCompany } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'AR Tech Dogs is a senior-led digital development agency building websites, Shopify stores and custom platforms.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const company = await getCompany()
  const paragraphs = (company?.story ?? '').split(/\n\s*\n/).filter(Boolean)

  return (
    <>
      <PageHero
        eyebrow="About Us"
        lead={company?.intro}
        title="A development partner, not a template shop."
      />

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
                      ? 'text-xl leading-relaxed tracking-tight md:text-2xl'
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
        <section className="border-y border-border">
          <div className="container grid md:grid-cols-2">
            {[
              { label: 'Mission', text: company.mission },
              { label: 'Vision', text: company.vision },
            ]
              .filter((x) => x.text)
              .map((x, i) => (
                <Reveal
                  className={`py-14 md:py-20 ${i === 1 ? 'border-t border-border md:border-l md:border-t-0 md:pl-12' : 'md:pr-12'}`}
                  delay={i * 80}
                  key={x.label}
                >
                  <p className="eyebrow">{x.label}</p>
                  <p className="mt-5 text-xl leading-snug tracking-tight md:text-2xl">{x.text}</p>
                </Reveal>
              ))}
          </div>
        </section>
      )}

      {(company?.values?.length ?? 0) > 0 && (
        <Section aria-labelledby="values-title">
          <div className="container">
            <SectionHeader
              eyebrow="Core values"
              id="values-title"
              title="What we hold ourselves to."
            />
            <FeatureGrid items={company.values!} />
          </div>
        </Section>
      )}

      {company?.philosophy && (
        <Section aria-labelledby="philosophy-title" className="pt-0 md:pt-0">
          <div className="container">
            <Reveal className="rounded-3xl border border-border bg-card p-8 md:p-16">
              <p className="eyebrow" id="philosophy-title">
                Technical philosophy
              </p>
              <p className="mt-6 max-w-4xl text-2xl leading-snug tracking-tight md:text-4xl md:leading-tight">
                {company.philosophy}
              </p>
            </Reveal>
          </div>
        </Section>
      )}

      {(company?.differentiators?.length ?? 0) > 0 && (
        <Section aria-labelledby="why-title" tone="light">
          <div className="container">
            <SectionHeader
              eyebrow="Why work with us"
              id="why-title"
              title="What makes us different."
            />
            <FeatureGrid columns={4} items={company.differentiators!} />
          </div>
        </Section>
      )}

      <CTASection />
    </>
  )
}
