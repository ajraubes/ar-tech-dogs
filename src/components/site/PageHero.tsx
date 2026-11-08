import { cn } from '@/utilities/ui'
import React from 'react'

import { Collie } from '@/components/Logo/Logo'
import { SplitWords } from './SplitWords'
import type { Art } from './art'

/**
 * Interior page hero. One h1 per page, in the shared type scale. On wide screens Jinx's
 * laptop rests on the hero's bottom edge, the way it rests on the line in the logo.
 */
export const PageHero: React.FC<{
  title: string
  lead?: string | null
  children?: React.ReactNode
  className?: string
  pug?: boolean
  /** A brand illustration in place of the mark, for pages about one service. */
  art?: Art
}> = ({ title, lead, children, className, pug = true, art }) => (
  <div className={cn('relative bg-card', className)}>
    <div className="container relative grid gap-10 pb-14 pt-14 md:pb-20 md:pt-24 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-9">
        <h1 className="text-h1 max-w-[18ch]">
          <SplitWords onLoad text={title} />
        </h1>
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
      {art && (
        <div
          aria-hidden
          className="pug-sit pointer-events-none absolute bottom-10 right-10 hidden w-64 lg:block xl:w-80"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="h-auto w-full mix-blend-multiply"
            decoding="async"
            height={art.height}
            src={art.src}
            width={art.width}
          />
        </div>
      )}
      {pug && !art && (
        <div
          aria-hidden
          className="pug-sit pointer-events-none absolute bottom-0 right-10 z-10 hidden w-56 translate-y-[4%] lg:block xl:w-64"
        >
          <Collie className="h-auto w-full" priority sizes="256px" />
        </div>
      )}
    </div>
  </div>
)
