import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Reveal } from './Reveal'

const NEXT_STEPS = [
  'We review your enquiry personally.',
  'We reply with questions or a short call to scope it.',
  'You receive a clear proposal with fixed milestones.',
]

/**
 * The close: espresso field, one headline, one sentence, one gold action. Beside it, what
 * happens after someone writes, so the last thing a visitor reads lowers the cost of asking.
 * (The pug closes the page in the footer, sitting on the wordmark.)
 */
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
  <section aria-labelledby="cta-title" className="py-24 md:py-32" data-theme="dark">
    <div className="container grid gap-x-10 gap-y-14 lg:grid-cols-12 lg:items-end">
      <Reveal className="grid gap-8 lg:col-span-7" stagger>
        <h2 className="text-display max-w-[13ch]" id="cta-title">
          {title || 'Have a project in mind?'}
        </h2>
        <p className="text-lead max-w-xl">
          {body || 'Tell us what you are building and we will come back with honest next steps.'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
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
      </Reveal>

      <Reveal className="lg:col-span-4 lg:col-start-9" delay={160}>
        <h3 className="text-lg font-semibold">What happens after you write</h3>
        <ol className="mt-5 grid gap-3">
          {NEXT_STEPS.map((step, i) => (
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
      </Reveal>
    </div>
  </section>
)
