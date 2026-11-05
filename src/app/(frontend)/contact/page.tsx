import type { Metadata } from 'next'
import React from 'react'

import { PageHero } from '@/components/site/PageHero'
import { Button } from '@/components/ui/button'
import { enquiryOptions } from '@/content/seedData'
import { getServices, getSiteSettings } from '@/lib/data'
import { EnquiryForm } from './EnquiryForm'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Tell us about your website, Shopify store or custom platform project.',
  alternates: { canonical: '/contact' },
}

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
        eyebrow="Contact"
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
          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            {contact?.bookingUrl && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold tracking-tight">Prefer to talk first?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Book a free initial consultation at a time that suits you.
                </p>
                <Button asChild className="mt-5 w-full" variant="outline">
                  <a href={contact.bookingUrl} rel="noopener noreferrer" target="_blank">
                    Book a consultation ↗
                  </a>
                </Button>
              </div>
            )}
            <dl className="space-y-6 text-[0.9375rem]">
              {contact?.email && (
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a
                      className="inline-flex min-h-11 items-center hover:text-brand-text"
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
                  <dd className="mt-2">
                    <a
                      className="inline-flex min-h-11 items-center hover:text-brand-text"
                      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Message us on WhatsApp ↗
                    </a>
                  </dd>
                </div>
              )}
              {contact?.phone && (
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-2">
                    <a
                      className="inline-flex min-h-11 items-center hover:text-brand-text"
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              {contact?.location && (
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd className="mt-2">{contact.location}</dd>
                </div>
              )}
              <div>
                <dt className="eyebrow">What happens next</dt>
                <dd className="mt-3">
                  <ol className="space-y-3 text-muted-foreground">
                    <li>1. We review your enquiry personally.</li>
                    <li>2. We reply with questions or a short call to scope it.</li>
                    <li>3. You receive a clear proposal with fixed milestones.</li>
                  </ol>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}
