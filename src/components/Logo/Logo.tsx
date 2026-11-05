import { cn } from '@/utilities/ui'
import React from 'react'

export const TAGLINE = 'Design. Develop. Deliver, one sip at a time.'

/** The pug's head, cropped from the logo. Used as the small mark and the favicon. */
export const LogoMark = ({ className, priority }: { className?: string; priority?: boolean }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    alt=""
    className={cn('h-9 w-auto shrink-0', className)}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    height={256}
    loading={priority ? 'eager' : 'lazy'}
    src="/brand/mark.png"
    width={256}
  />
)

/** The full pug sipping coffee, traced from the logo so it stays sharp at any size. */
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
    height={1536}
    loading={priority ? 'eager' : 'lazy'}
    sizes={sizes}
    src="/brand/pug.webp"
    width={1312}
  />
)

/** Mark plus the one-line wordmark, as on the logo: "AR TECH DOGS" in Barlow Bold. */
export const Logo = ({
  className,
  priority,
  tagline,
}: {
  className?: string
  priority?: boolean
  tagline?: boolean
}) => (
  <span className={cn('inline-flex items-center gap-2.5', className)}>
    <LogoMark priority={priority} />
    <span className="flex flex-col">
      <span
        aria-hidden
        className="font-[family-name:var(--font-wordmark)] text-[1.1875rem] font-bold uppercase leading-none tracking-[-0.005em]"
      >
        AR Tech Dogs
      </span>
      {tagline && (
        <span aria-hidden className="mt-1.5 text-sm leading-tight text-muted-foreground">
          {TAGLINE}
        </span>
      )}
    </span>
    <span className="sr-only">AR Tech Dogs</span>
  </span>
)
