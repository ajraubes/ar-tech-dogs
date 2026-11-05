import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Reveal } from './Reveal'

/** The close: the page flips to espresso, one headline, one sentence, one gold action. */
export const CTASection: React.FC<{
  title?: string | null
  body?: string | null
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string } | null
}> = ({
  title,
  body,
  primary = { label: 'Start a project', href: '/contact' },
  secondary = { label: 'View pricing', href: '/pricing' },
}) => (
  <section aria-labelledby="cta-title" className="py-24 md:py-40" data-theme="dark">
    <div className="container">
      <Reveal className="grid gap-12 md:gap-20" stagger>
        <h2 className="text-display max-w-[13ch]" id="cta-title">
          {title || 'Have a project in mind?'}
        </h2>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <p className="text-lead max-w-xl md:col-span-6">
            {body || 'Tell us what you are building and we will come back with honest next steps.'}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
            <Button asChild className="group" size="lg">
              <Link href={primary.href}>
                {primary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                >
                  <ArrowRight className="size-[1.05em]" strokeWidth={2.25} />
                </span>
              </Link>
            </Button>
            {secondary && (
              <Button
                asChild
                className="border-cream/70 text-cream hover:bg-cream hover:text-espresso"
                size="lg"
                variant="outline"
              >
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)
