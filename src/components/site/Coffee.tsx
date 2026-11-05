import { cn } from '@/utilities/ui'
import React from 'react'

/*
 * The coffee pieces the site uses for motion. All of it is CSS on transform and opacity,
 * and all of it stops under prefers-reduced-motion (see globals.css, "Coffee").
 */

/** Three wisps of steam rising out of phase. Sits above a cup; colour comes from `currentColor`. */
export const Steam: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden
    className={cn('cup-steam overflow-visible', className)}
    fill="none"
    viewBox="0 0 60 48"
  >
    <path
      d="M16 44c-5-7 5-11 0-19s4-12 1-19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="3"
    />
    <path
      d="M30 44c-5-7 5-11 0-19s4-12 1-19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="3"
    />
    <path
      d="M44 44c-5-7 5-11 0-19s4-12 1-19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="3"
    />
  </svg>
)

/** A small cup that fills and empties while something is brewing (a form sending). */
export const CupLoader: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-hidden className={cn('cup-loader size-5', className)} fill="none" viewBox="0 0 24 24">
    <defs>
      <clipPath id="cup-loader-clip">
        <path d="M4 7h13v6.5A5.5 5.5 0 0 1 11.5 19h-2A5.5 5.5 0 0 1 4 13.5V7Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#cup-loader-clip)">
      <rect className="cup-loader-fill" fill="currentColor" height="13" width="13" x="4" y="7" />
    </g>
    <path
      d="M4 7h13v6.5A5.5 5.5 0 0 1 11.5 19h-2A5.5 5.5 0 0 1 4 13.5V7Z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.75"
    />
    <path
      d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.75"
    />
  </svg>
)

/** A coffee bean, used as the list marker for the studio's reasons. */
export const Bean: React.FC<{ className?: string }> = ({ className }) => (
  <svg aria-hidden className={cn('size-4', className)} fill="none" viewBox="0 0 16 16">
    <ellipse cx="8" cy="8" fill="currentColor" rx="5" ry="6.6" transform="rotate(35 8 8)" />
    <path
      d="M5.2 12.4c1.9-1.4 1.3-3.4 2.6-4.6 1.1-1 2.4-1.2 3-3"
      stroke="var(--background)"
      strokeLinecap="round"
      strokeWidth="1.2"
    />
  </svg>
)

/**
 * The stacked logo's pug on a crema tile, with steam rising off his cup. The steam is
 * placed by percentage so it stays on the cup at every size.
 */
export const PugTile: React.FC<{
  className?: string
  priority?: boolean
  sizes?: string
  children?: React.ReactNode
}> = ({ className, priority, sizes = '(min-width: 1024px) 34vw, 80vw', children }) => (
  <div
    className={cn(
      'relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#ecc97e,#ddb565)]',
      className,
    )}
  >
    {/* A saucer of light behind him, so the tile reads as a warm room rather than a flat card. */}
    <div
      aria-hidden
      className="absolute inset-x-[12%] bottom-[8%] top-[18%] -z-10 rounded-full bg-[#f3d999] opacity-70 blur-2xl"
    />
    <div className="pug-land relative mx-auto w-[74%] pt-[12%]">
      <div className="pug-breathe">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="The AR Tech Dogs pug, sitting with a cup of coffee"
          className="h-auto w-full"
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          height={1110}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
          src="/brand/pug.webp"
          width={1000}
        />
        <Steam className="steam-late absolute left-[49.5%] top-[48.5%] w-[10%] text-[#fff8e8]" />
      </div>
    </div>
    {children}
  </div>
)
