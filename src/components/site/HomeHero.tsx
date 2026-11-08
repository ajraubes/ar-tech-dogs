import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { CollieTile } from './Coffee'
import { HeroTilt } from './HeroTilt'
import { SplitWords } from './SplitWords'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties

/**
 * The homepage opens like the brand's hero banner: the promise set large on the left, and on
 * the right Jinx at the laptop on a beige tile. Underneath,
 * three plain facts a buyer checks first: where, how much, and who does the work.
 */
export const HomeHero: React.FC<{
  heading: string
  subheading?: string | null
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  facts: { label: string; value: string }[]
  brands?: string[]
}> = ({ heading, subheading, primary, secondary, facts, brands = [] }) => (
  <section aria-labelledby="home-title" className="relative">
    <div className="container grid items-center gap-x-10 gap-y-12 pb-20 pt-10 md:pt-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:content-center lg:pb-24">
      {/* On a phone the order is promise, mark, facts; on desktop the facts sit under the promise. */}
      <div className="lg:col-span-7 lg:row-start-1 lg:self-end">
        <h1
          className="text-[clamp(2.75rem,1.4rem+4.2vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.03em]"
          id="home-title"
        >
          {/* "Digital experiences. Engineered to grow." breaks at the full stop, not mid-phrase. */}
          {heading.split(/(?<=\.)\s+/).map((part, i, lines) => (
            <span className="block" key={i}>
              <SplitWords
                onLoad
                start={lines.slice(0, i).join(' ').split(/\s+/).filter(Boolean).length}
                step={70}
                text={part}
              />
            </span>
          ))}
        </h1>
        {subheading && (
          <p className="text-lead fade-up mt-7 max-w-[40ch]" style={delay(90)}>
            {subheading}
          </p>
        )}
        <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={delay(180)}>
          <Button asChild className="group" size="lg">
            <Link href={primary.href}>
              {primary.label}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <ArrowRight className="size-[1.05em]" strokeWidth={2.25} />
              </span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:max-w-none">
        <HeroTilt>
          <CollieTile className="aspect-[4/4.6]" priority sizes="(min-width: 1024px) 34vw, 90vw">
            {brands.length > 0 && (
              <div
                className="fade-up relative mx-4 mb-4 mt-5 rounded-2xl bg-background px-5 py-4 md:mx-6 md:mb-6"
                style={delay(900)}
              >
                <p className="text-sm text-muted-foreground">
                  Before AR Tech Dogs, the founder built for
                </p>
                <p className="mt-1 font-semibold leading-snug">{brands.join(' · ')}</p>
              </div>
            )}
          </CollieTile>
        </HeroTilt>
      </div>

      {facts.length > 0 && (
        <dl
          className="fade-up grid max-w-2xl gap-3 pt-2 sm:grid-cols-3 sm:gap-6 lg:col-span-7 lg:row-start-2 lg:self-start"
          style={delay(280)}
        >
          {facts.map((f) => (
            <div className="flex items-baseline justify-between gap-4 sm:block" key={f.label}>
              <dt className="text-sm text-muted-foreground">{f.label}</dt>
              <dd className="text-right text-lg font-semibold leading-snug sm:mt-1 sm:text-left">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  </section>
)
