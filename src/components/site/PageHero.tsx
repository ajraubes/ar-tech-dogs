import { cn } from '@/utilities/ui'
import React from 'react'

/** Interior page hero. One h1 per page, set in the shared type scale. */
export const PageHero: React.FC<{
  eyebrow?: string
  title: string
  lead?: string | null
  children?: React.ReactNode
  className?: string
}> = ({ eyebrow, title, lead, children, className }) => (
  <div className={cn('relative overflow-hidden border-b border-border', className)}>
    <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
    <div className="container relative pb-16 pt-16 md:pb-24 md:pt-28">
      <div className="max-w-4xl">
        {eyebrow && (
          <p className="eyebrow fade-up mb-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-primary" />
            {eyebrow}
          </p>
        )}
        <h1 className="text-h1 fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>
          {title}
        </h1>
        {lead && (
          <p
            className="text-lead fade-up mt-6 max-w-2xl"
            style={{ '--delay': '140ms' } as React.CSSProperties}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="fade-up mt-10" style={{ '--delay': '220ms' } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </div>
  </div>
)
