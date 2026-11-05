import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import { Pug } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

/**
 * The homepage opens on the logo, enlarged into architecture: the name set as wide as the
 * page, and the pug sitting on its letters with his coffee, as he does in the lockup.
 */
export const HomeHero: React.FC<{
  heading: string
  subheading?: string | null
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}> = ({ heading, subheading, primary, secondary }) => (
  <section className="relative overflow-hidden" aria-labelledby="home-title">
    <div className="container flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-10 pb-6 pt-10 md:min-h-[calc(100svh-5rem)] md:pb-8 md:pt-16">
      <div className="relative z-10 max-w-[34rem] lg:max-w-[38rem]">
        <p className="fade-up text-[clamp(1.75rem,1.2rem+1.9vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.025em]">
          {/* "Digital experiences. Engineered to grow." breaks at the full stop, not mid-phrase. */}
          {heading.split(/(?<=\.)\s+/).map((part, i) => (
            <span className="block" key={i}>
              {part}
            </span>
          ))}
        </p>
        {subheading && (
          <p
            className="fade-up mt-5 max-w-[36ch] text-lg leading-relaxed md:text-xl"
            style={{ '--delay': '90ms' } as React.CSSProperties}
          >
            {subheading}
          </p>
        )}
        <div
          className="fade-up mt-8 flex flex-col gap-3 sm:flex-row"
          style={{ '--delay': '180ms' } as React.CSSProperties}
        >
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

      {/* The monument: one line on wide screens, "AR TECH" over "DOGS" on phones. */}
      <div className="relative [container-type:inline-size]">
        <div
          aria-hidden
          className="absolute bottom-[calc(100%-7cqi)] right-[2%] z-10 w-[40cqi] md:bottom-[calc(100%-4.2cqi)] md:right-[3%] md:w-[27cqi] xl:w-[26cqi]"
        >
          <div className="pug-land">
            <div className="pug-breathe">
              <Pug className="h-auto w-full" priority sizes="(min-width: 768px) 27vw, 40vw" />
            </div>
          </div>
        </div>
        <h1
          className="text-monument word-rise relative -mb-[0.06em] flex flex-col whitespace-nowrap text-[27cqi] leading-[0.9] md:leading-[0.82] md:block md:text-[16.45cqi]"
          id="home-title"
        >
          <span style={{ '--i': 0 } as React.CSSProperties}>AR Tech</span>{' '}
          <span style={{ '--i': 1 } as React.CSSProperties}>Dogs</span>
        </h1>
      </div>
    </div>
  </section>
)
