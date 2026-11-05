import { cn } from '@/utilities/ui'
import React from 'react'

export const TAGLINE = 'Design. Develop. Deliver, one sip at a time.'

/** The pug's head from the brand board. Used as the small mark; the favicon puts it on a crema tile. */
export const LogoMark = ({ className, priority }: { className?: string; priority?: boolean }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    alt=""
    className={cn('h-10 w-auto shrink-0', className)}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    height={256}
    loading={priority ? 'eager' : 'lazy'}
    src="/brand/mark.png"
    width={256}
  />
)

/** The stacked logo's pug, sitting with his coffee. Traced to vector, exported at 1000px. */
export const Pug = ({
  className,
  priority,
  sizes = '(min-width: 1024px) 40vw, 80vw',
}: {
  className?: string
  priority?: boolean
  sizes?: string
}) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    alt="The AR Tech Dogs pug, sitting with a cup of coffee"
    className={className}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    height={1110}
    loading={priority ? 'eager' : 'lazy'}
    sizes={sizes}
    src="/brand/pug.webp"
    width={1000}
  />
)

/**
 * The horizontal lockup from the brand board: head, "AR TECH DOGS" in Barlow ExtraBold, and
 * the tagline underneath on wide screens. The head tilts a little on hover, like he heard you.
 */
export const Logo = ({
  className,
  priority,
  tagline,
}: {
  className?: string
  priority?: boolean
  tagline?: boolean
}) => (
  <span className={cn('group/logo inline-flex items-center gap-2.5', className)}>
    <LogoMark className="logo-head" priority={priority} />
    <span className="flex flex-col">
      <span
        aria-hidden
        className="font-[family-name:var(--font-wordmark)] text-[1.25rem] font-extrabold uppercase leading-none tracking-[-0.01em]"
      >
        AR Tech Dogs
      </span>
      {tagline && (
        <span
          aria-hidden
          className="mt-1 hidden text-[0.75rem] font-medium leading-none text-muted-foreground xl:block"
        >
          {TAGLINE}
        </span>
      )}
    </span>
    <span className="sr-only">AR Tech Dogs</span>
  </span>
)
