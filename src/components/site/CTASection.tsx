import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Steam } from './Coffee'
import { Reveal } from './Reveal'

/** The close: espresso field, one headline, one sentence, one gold action, and the pug's cup still steaming. */
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
  <section aria-labelledby="cta-title" className="overflow-hidden py-24 md:py-32" data-theme="dark">
    <div className="container grid items-center gap-12 lg:grid-cols-12">
      <Reveal className="grid gap-8 lg:col-span-8" stagger>
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
      <Reveal className="hidden lg:col-span-4 lg:block" delay={160}>
        <div aria-hidden className="relative mx-auto w-full max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="h-auto w-full"
            decoding="async"
            height={1110}
            loading="lazy"
            src="/brand/pug.webp"
            width={1000}
          />
          <Steam className="absolute left-[49.5%] top-[48.5%] w-[10%] text-cream/80" />
        </div>
      </Reveal>
    </div>
  </section>
)
