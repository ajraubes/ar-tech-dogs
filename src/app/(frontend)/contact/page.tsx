import type { Metadata } from 'next'

import { pageMeta } from '@/utilities/pageMeta'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import { PageHero } from '@/components/site/PageHero'
import { Button } from '@/components/ui/button'
import { enquiryOptions } from '@/content/seedData'
import { getServices, getSiteSettings } from '@/lib/data'
import { EnquiryForm } from './EnquiryForm'

export const metadata: Metadata = pageMeta({
  title: 'Start a Project',
  description:
    'Tell us about your website, Shopify store or custom platform. We review every enquiry personally and reply with clear, honest next steps.',
  path: '/contact',
  share: 'Have a project in mind?',
  kicker: 'Start a project',
})

type Args = { searchParams: Promise<{ service?: string; package?: string }> }

export default async function ContactPage({ searchParams }: Args) {
  const [{ service, package: pkg }, settings, services] = await Promise.all([
    searchParams,
    getSiteSettings(),
    getServices(),
  ])
  const contact = settings?.contact
  const serviceOptions = services.length
    ? [...services.map((s) => s.title), 'Something else']
    : enquiryOptions.services

  return (
    <>
      <PageHero
        lead="Tell us what you are building. The more context you share, the more useful our first reply will be."
        title="Start a project."
      />
      <section className="py-16 md:py-24">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EnquiryForm
              defaultMessage={pkg ? `I'm interested in the ${pkg} package.\n\n` : undefined}
              defaultService={service}
              options={{ ...enquiryOptions, services: serviceOptions }}
            />
          </div>
          <div className="space-y-8 lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:self-start">
            {contact?.bookingUrl && (
              <div className="rounded-[var(--radius-xl)] bg-card p-7">
                <h2 className="text-lg font-semibold tracking-tight">Prefer to talk first?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Book a free initial consultation at a time that suits you.
                </p>
                <Button asChild className="mt-5 w-full" variant="outline">
                  <a href={contact.bookingUrl} rel="noopener noreferrer" target="_blank">
                    Book a consultation{' '}
                    <ArrowUpRight aria-hidden className="size-[1.05em]" strokeWidth={2.25} />
                  </a>
                </Button>
              </div>
            )}
            {/* The direct line first, set large: plenty of people would rather just email. */}
            <div className="rounded-[var(--radius-xl)] p-7 md:p-8" data-theme="dark">
              <h2 className="text-lg font-semibold">Rather write directly?</h2>
              <dl className="mt-5 space-y-5">
                {contact?.email && (
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="inline-flex min-h-11 items-center break-all text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] font-bold tracking-[-0.015em] text-brand-text underline decoration-transparent underline-offset-[0.18em] transition-[text-decoration-color] duration-200 hover:decoration-current"
                        href={`mailto:${contact.email}`}
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                )}
                {contact?.whatsapp && (
                  <div>
                    <dt className="eyebrow">WhatsApp</dt>
                    <dd className="mt-1">
                      <a
                        className="inline-flex min-h-11 items-center gap-1 font-semibold hover:text-brand-text"
                        href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Message us on WhatsApp
                        <ArrowUpRight aria-hidden className="size-[1.05em]" strokeWidth={2.25} />
                      </a>
                    </dd>
                  </div>
                )}
                {contact?.phone && (
                  <div>
                    <dt className="eyebrow">Phone</dt>
                    <dd className="mt-1">
                      <a
                        className="inline-flex min-h-11 items-center font-semibold hover:text-brand-text"
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {contact?.location && (
                  <div>
                    <dt className="eyebrow">Where we are</dt>
                    <dd className="mt-1 text-lg">{contact.location}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 grid gap-3">
                {[
                  'We review your enquiry personally.',
                  'We reply with questions or a short call to scope it.',
                  'You receive a clear proposal with fixed milestones.',
                ].map((step, i) => (
                  <li
                    className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-card p-4"
                    key={step}
                  >
                    <span
                      aria-hidden
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground tabular"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1 leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
