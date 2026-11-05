'use client'

import Link from 'next/link'
import React, { useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type BrewOption = {
  id: string | number
  label: string
  slug: string
  from: string
  monthly: boolean
  packages: { name: string; price: string; billing: string }[]
}

/**
 * The homepage's live thing: pick what you need and read its real starting price and
 * packages straight from the CMS. Without JS the first service shows, with a link onward.
 */
export const PriceBrewer: React.FC<{ options: BrewOption[]; titleId?: string }> = ({
  options,
  titleId,
}) => {
  const [index, setIndex] = useState(0)
  // Arrow-key changes swap instantly: repeated keyboard actions should never wait on motion.
  const [instant, setInstant] = useState(false)
  const groupId = useId()
  const current = options[index]
  if (!current) return null

  return (
    <div>
      <div aria-label="Choose a service" role="radiogroup">
        <div className="flex flex-wrap gap-2">
          {options.map((o, i) => (
            <button
              aria-checked={i === index}
              className={cn(
                'h-11 rounded-full px-5 text-[0.9375rem] font-semibold transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-quart)] active:scale-[0.96]',
                i === index
                  ? 'bg-espresso text-cream'
                  : 'bg-foreground/[0.07] text-foreground hover:bg-foreground/[0.14]',
              )}
              id={`${groupId}-${i}`}
              key={o.id}
              onClick={() => {
                setInstant(false)
                setIndex(i)
              }}
              onKeyDown={(e) => {
                const next =
                  e.key === 'ArrowRight' || e.key === 'ArrowDown'
                    ? 1
                    : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
                      ? -1
                      : 0
                if (!next) return
                e.preventDefault()
                const n = (index + next + options.length) % options.length
                setInstant(true)
                setIndex(n)
                document.getElementById(`${groupId}-${n}`)?.focus()
              }}
              role="radio"
              tabIndex={i === index ? 0 : -1}
              type="button"
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="mt-12 md:mt-16" data-instant={instant || undefined}>
        <p
          className="text-[clamp(2.75rem,1rem+6.6vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.035em]"
          id={titleId}
          key={current.id}
        >
          <span className="brew-in inline-block">{current.label}</span>{' '}
          <span className="brew-in inline-block [--d:60ms]">from</span>{' '}
          <span className="brew-in inline-block whitespace-nowrap rounded-[0.12em] bg-espresso px-[0.14em] text-crema [--d:120ms]">
            {current.from}
            {current.monthly && <span className="text-[0.4em] font-semibold"> /mo</span>}
          </span>
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
          <ul className="md:col-span-7" key={`list-${current.id}`}>
            {current.packages.map((p, i) => (
              <li
                className="brew-in flex items-baseline justify-between gap-6 py-2.5 text-lg"
                key={p.name}
                style={{ '--d': `${180 + i * 50}ms` } as React.CSSProperties}
              >
                <span className="font-semibold">{p.name}</span>
                <span className="shrink-0 text-right tabular">
                  {p.price}
                  {p.billing && <span className="text-muted-foreground"> {p.billing}</span>}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9 md:items-end">
            <Button asChild className="w-full md:w-auto" size="lg">
              <Link href={`/solutions/${current.slug}#packages`}>What each package includes</Link>
            </Button>
            <Link
              className="inline-flex min-h-11 items-center self-center font-semibold underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground md:self-end"
              href="/pricing"
            >
              Compare every price
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
