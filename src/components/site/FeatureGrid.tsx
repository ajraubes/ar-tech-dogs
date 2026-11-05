import { cn } from '@/utilities/ui'
import React from 'react'

import { Reveal } from './Reveal'

/** Numbered title/description grid used for values, differentiators and problems. */
export const FeatureGrid: React.FC<{
  items: { title: string; description: string }[]
  columns?: 2 | 3 | 4
  numbered?: boolean
}> = ({ items, columns = 3, numbered = true }) => {
  if (!items.length) return null
  return (
    <ul
      className={cn(
        'grid gap-4',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
      )}
    >
      {items.map((item, i) => (
        <Reveal
          as="li"
          className="rounded-2xl border border-border bg-card p-6 md:p-8"
          delay={(i % columns) * 60}
          key={item.title}
        >
          {numbered && (
            <span className="font-mono text-xs text-brand-text tabular">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className={cn('text-lg font-semibold tracking-tight', numbered && 'mt-4')}>
            {item.title}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </Reveal>
      ))}
    </ul>
  )
}
