import { cn } from '@/utilities/ui'
import React from 'react'

import { Reveal } from './Reveal'

/** Title and description pairs (values, differentiators, problems), set unboxed on the grid. */
export const FeatureGrid: React.FC<{
  items: { title: string; description: string }[]
  columns?: 2 | 3 | 4
}> = ({ items, columns = 3 }) => {
  if (!items.length) return null
  return (
    <ul
      className={cn(
        'grid gap-x-10 gap-y-10 md:gap-y-14',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
      )}
    >
      {items.map((item, i) => (
        <Reveal as="li" delay={(i % columns) * 70} key={item.title} stagger>
          <h3 className="text-h3">{item.title}</h3>
          <p className="mt-2 max-w-[38ch] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </Reveal>
      ))}
    </ul>
  )
}
