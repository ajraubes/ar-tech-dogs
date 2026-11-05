import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

const buildLog = [
  { label: 'Discovery & architecture', meta: 'brief' },
  { label: 'Design system', meta: 'tokens' },
  { label: 'Next.js + Payload CMS', meta: 'app' },
  { label: 'Shopify Liquid sections', meta: 'theme' },
  { label: 'Performance & SEO checks', meta: 'qa' },
]

/** Words are wrapped so CSS can stagger them in. Screen readers get the plain heading. */
const SplitWords = ({ text, offset = 0 }: { text: string; offset?: number }) => (
  <>
    {text.split(' ').map((word, i) => (
      <React.Fragment key={`${word}-${i}`}>
        <span style={{ '--i': i + offset } as React.CSSProperties}>{word}</span>{' '}
      </React.Fragment>
    ))}
  </>
)

export const HomeHero: React.FC<{
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}> = ({ eyebrow, heading, subheading, primary, secondary }) => {
  // "Digital experiences. Engineered to grow." → two lines, second one quieter.
  const [first, ...rest] = heading.split(/(?<=\.)\s+/)
  const second = rest.join(' ')
  const firstCount = first?.split(' ').length ?? 0

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl"
      />
      <div className="container relative grid gap-16 pb-20 pt-14 md:pb-28 md:pt-24 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          {eyebrow && (
            <p className="eyebrow fade-up mb-8 flex items-center gap-3">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {eyebrow}
            </p>
          )}
          <h1 aria-label={heading} className="text-display">
            <span aria-hidden className="word-rise block">
              <SplitWords text={first ?? heading} />
            </span>
            {second && (
              <span aria-hidden className="word-rise block text-muted-foreground">
                <SplitWords offset={firstCount} text={second} />
              </span>
            )}
          </h1>
          {subheading && (
            <p
              className="text-lead fade-up mt-8 max-w-xl"
              style={{ '--delay': '450ms' } as React.CSSProperties}
            >
              {subheading}
            </p>
          )}
          <div
            className="fade-up mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ '--delay': '550ms' } as React.CSSProperties}
          >
            <Button asChild size="lg">
              <Link href={primary.href}>
                {primary.label}
                <span aria-hidden>→</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>

        {/* Decorative "build log": shows how we work, without inventing numbers. */}
        <div
          aria-hidden
          className="fade-up hidden rounded-2xl border border-border bg-card/80 p-5 font-mono text-[0.8125rem] shadow-[var(--shadow-card)] backdrop-blur sm:block lg:col-span-4"
          style={{ '--delay': '650ms' } as React.CSSProperties}
        >
          <div className="mb-4 flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="ml-3 text-muted-foreground">~/your-project</span>
          </div>
          <p className="text-muted-foreground">
            <span className="text-primary">$</span> artechdogs build
          </p>
          <ul className="mt-3 space-y-2">
            {buildLog.map((step, i) => (
              <li
                className="fade-up flex items-center justify-between gap-4"
                key={step.label}
                style={{ '--delay': `${900 + i * 160}ms` } as React.CSSProperties}
              >
                <span className="flex items-center gap-2">
                  <span className="text-[oklch(72%_0.15_155)]">✓</span>
                  {step.label}
                </span>
                <span className="text-muted-foreground">{step.meta}</span>
              </li>
            ))}
            <li
              className="fade-up flex items-center gap-2 pt-1"
              style={{ '--delay': `${900 + buildLog.length * 160}ms` } as React.CSSProperties}
            >
              <span className="text-primary">→</span> Launch & grow
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary motion-reduce:animate-none" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
