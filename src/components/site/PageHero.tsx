import { cn } from '@/utilities/ui'
import React from 'react'

import { Pug } from '@/components/Logo/Logo'
import { Steam } from './Coffee'

/**
 * Interior page hero. One h1 per page, in the shared type scale. On wide screens the
 * pug sits on the hero's bottom edge, the way he sits on the wordmark in the logo.
 */
export const PageHero: React.FC<{
  title: string
  lead?: string | null
  children?: React.ReactNode
  className?: string
  pug?: boolean
}> = ({ title, lead, children, className, pug = true }) => (
  <div className={cn('relative bg-card', className)}>
    <div className="container relative grid gap-10 pb-14 pt-14 md:pb-20 md:pt-24 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-9">
        <h1 className="text-h1 fade-up max-w-[18ch]">{title}</h1>
        {lead && (
          <p
            className="text-lead fade-up mt-6 max-w-2xl"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="fade-up mt-10" style={{ '--delay': '160ms' } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
      {pug && (
        <div
          aria-hidden
          className="pug-sit pointer-events-none absolute bottom-0 right-10 z-10 hidden w-44 translate-y-[10%] lg:block xl:w-52"
        >
          <Pug className="h-auto w-full" priority sizes="208px" />
          <Steam className="steam-late absolute left-[49.5%] top-[48.5%] w-[10%] text-[#b89a63]" />
        </div>
      )}
    </div>
  </div>
)
