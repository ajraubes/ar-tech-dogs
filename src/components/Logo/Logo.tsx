import { cn } from '@/utilities/ui'
import React from 'react'

export const TAGLINE = 'Custom development and websites, with a Shopify focus.'
export const LOCKUP_LINE = 'Design. Develop. Deliver, one sip at a time.'

/**
 * The icon mark from the brand guide: Jinx the border collie at the laptop, coffee in front.
 * Transparent, so it sits on any light or espresso ground.
 */
export const LogoMark = ({ className, priority }: { className?: string; priority?: boolean }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    alt=""
    className={cn('h-10 w-auto shrink-0', className)}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    height={244}
    loading={priority ? 'eager' : 'lazy'}
    src="/brand/mark.png"
    width={256}
  />
)

/** The full icon mark at large sizes (1000px master). */
export const Collie = ({
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
    alt="Jinx, the AR Tech Dogs border collie, at a laptop with a cup of coffee"
    className={className}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    height={955}
    loading={priority ? 'eager' : 'lazy'}
    sizes={sizes}
    src="/brand/collie.webp"
    width={1000}
  />
)

/**
 * The primary horizontal lockup: the mark, "AR Tech Dogs" in Montserrat Bold, and the
 * lockup line underneath on wide screens. The mark tilts a little on hover, like a dog
 * that heard its name.
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
  <span className={cn('group/logo inline-flex items-center gap-3', className)}>
    <LogoMark className="logo-head h-11 md:h-12" priority={priority} />
    <span className="flex flex-col">
      <span
        aria-hidden
        className="font-[family-name:var(--font-wordmark)] text-[1.3125rem] font-bold leading-none tracking-[-0.035em]"
      >
        AR Tech Dogs
      </span>
      {tagline && (
        <span
          aria-hidden
          className="mt-1.5 hidden text-[0.75rem] font-medium leading-none text-muted-foreground xl:block"
        >
          {LOCKUP_LINE}
        </span>
      )}
    </span>
    <span className="sr-only">AR Tech Dogs</span>
  </span>
)
