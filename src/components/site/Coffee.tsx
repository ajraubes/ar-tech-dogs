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
 * The icon mark on a flat beige tile, sitting on the tile's lower edge the way the laptop
 * sits on a desk. It lands with a small spring on first paint, then breathes slowly.
 */
export const CollieTile: React.FC<{
  className?: string
  priority?: boolean
  sizes?: string
  children?: React.ReactNode
}> = ({ className, priority, sizes = '(min-width: 1024px) 34vw, 80vw', children }) => (
  <div
    className={cn(
      'relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-beige',
      className,
    )}
  >
    <div className="tilt-depth flex min-h-0 flex-1 items-end justify-center px-[8%] pt-[9%]">
      <div className="pug-land flex h-full w-full items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Jinx, the AR Tech Dogs border collie, at a laptop with a cup of coffee"
          className="pug-breathe max-h-full w-full object-contain object-bottom"
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          height={955}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
          src="/brand/collie.webp"
          width={1000}
        />
      </div>
    </div>
    {children}
  </div>
)
