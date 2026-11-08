'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { Company } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Step = NonNullable<Company['process']>[number]

/**
 * "One sip at a time": the cup stays pinned while the stages scroll past, and each stage
 * takes one sip. Ordinary scrolling drives it; nothing is hijacked. Without JS (or on a
 * phone) it is a plain ordered list.
 */
export const ProcessStory: React.FC<{
  steps: Step[]
  title: string
  lead?: string
  id?: string
}> = ({ steps, title, lead, id }) => {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const items = refs.current.filter(Boolean) as HTMLLIElement[]
    if (!items.length) return
    // A stage is "current" while it crosses the middle band of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const total = steps.length
  // Full cup before the first stage, one sip per stage, the last stage leaves a drop.
  const level = Math.max(0.08, 1 - active / total)

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-h2" id={id}>
            {title}
          </h2>
          {lead && <p className="text-lead mt-5 max-w-md">{lead}</p>}
          <div aria-hidden className="mt-12 hidden items-end gap-8 lg:flex">
            <Cup level={level} />
            <p className="pb-6 text-muted-foreground">
              <span className="block text-sm">
                Sip <span className="tabular">{active + 1}</span> of {total}
              </span>
              <span className="mt-1 block text-lg font-semibold text-foreground">
                {steps[active]?.title}
              </span>
            </p>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:col-start-7">
        {steps.map((step, i) => (
          <li
            className={cn(
              'py-8 transition-opacity duration-500 ease-[var(--ease-out-quart)] first:pt-0 lg:flex lg:min-h-[34vh] lg:flex-col lg:justify-center lg:py-0',
              i === active ? 'lg:opacity-100' : 'lg:opacity-70',
            )}
            data-index={i}
            key={step.title}
            ref={(el) => {
              refs.current[i] = el
            }}
          >
            <h3 className="text-[clamp(1.75rem,1.4rem+1.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {step.description}
            </p>
            {step.deliverable && (
              <p className="mt-4 text-lg">
                <span className="text-brand-text">You sign off: </span>
                {step.deliverable}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** A cortado glass, drawn in the logo's flat style. The coffee level eases down sip by sip. */
const Cup = ({ level }: { level: number }) => {
  const glass = 'M44 34 H236 L218 226 Q216 244 198 244 H82 Q64 244 62 226 Z'
  const top = 34
  const bottom = 244
  const y = top + (1 - level) * (bottom - top - 14)
  return (
    <svg className="w-44 shrink-0 overflow-visible xl:w-52" fill="none" viewBox="0 0 280 270">
      <defs>
        <clipPath id="cup-inside">
          <path d={glass} />
        </clipPath>
      </defs>
      {/* steam */}
      <g
        className={cn('cup-steam', level < 0.2 && 'opacity-0')}
        stroke="#c8b7a6"
        strokeLinecap="round"
        strokeWidth="6"
      >
        <path d="M112 18 C102 4 122 -6 112 -20" />
        <path d="M144 14 C134 0 154 -10 144 -24" />
        <path d="M176 18 C166 4 186 -6 176 -20" />
      </g>
      <path d={glass} fill="#faf8f5" fillOpacity="0.1" />
      <g clipPath="url(#cup-inside)">
        <g
          className="transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translateY(${y}px)` }}
        >
          <rect fill="#e6dace" height="16" width="300" x="-10" y="0" />
          <rect fill="#faf8f5" height="5" opacity="0.7" width="300" x="-10" y="2" />
          <rect fill="#9c735b" height="260" width="300" x="-10" y="16" />
          <rect fill="#6b442e" height="260" width="300" x="-10" y="90" />
        </g>
      </g>
      <path d={glass} stroke="#faf8f5" strokeLinejoin="round" strokeWidth="8" />
      <path
        d="M236 92 C276 92 280 168 226 172"
        stroke="#faf8f5"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <ellipse cx="140" cy="258" fill="#faf8f5" fillOpacity="0.14" rx="126" ry="10" />
    </svg>
  )
}
