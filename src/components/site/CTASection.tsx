import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Reveal } from './Reveal'

export const CTASection: React.FC<{
  title?: string | null
  body?: string | null
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string } | null
}> = ({
  title,
  body,
  primary = { label: 'Start a Project', href: '/contact' },
  secondary = { label: 'View pricing', href: '/pricing' },
}) => (
  <section className="py-24 md:py-32">
    <div className="container">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 md:px-16 md:py-24">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-h2">{title || 'Have a project in mind?'}</h2>
          <p className="text-lead mt-5">
            {body || 'Tell us what you are building and we will come back with honest next steps.'}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primary.href}>
                {primary.label}
                <span aria-hidden>→</span>
              </Link>
            </Button>
            {secondary && (
              <Button asChild size="lg" variant="outline">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)
