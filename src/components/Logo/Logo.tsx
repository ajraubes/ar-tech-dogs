import { cn } from '@/utilities/ui'
import React from 'react'

/** The AR Tech Dogs app-icon mark (husky with visor on a navy tile). */
export const LogoMark = ({ className, priority }: { className?: string; priority?: boolean }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    alt=""
    className={cn('size-10 shrink-0 rounded-[22%]', className)}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    height={224}
    loading={priority ? 'eager' : 'lazy'}
    src="/brand/mark-tile.png"
    width={224}
  />
)

/** Mark plus the two-line wordmark from the brand lockup: "AR TECH" over a blue "DOGS". */
export const Logo = ({
  className,
  priority,
  tagline,
}: {
  className?: string
  priority?: boolean
  tagline?: boolean
}) => (
  <span className={cn('inline-flex items-center gap-3', className)}>
    <LogoMark priority={priority} />
    <span className="flex flex-col font-[family-name:var(--font-wordmark)] font-extrabold uppercase leading-[0.9] tracking-[-0.01em]">
      <span className="text-[0.9375rem]">AR Tech</span>
      <span className="text-[1.0625rem] text-brand">Dogs</span>
      {tagline && (
        <span className="mt-1.5 font-sans text-[0.5625rem] font-semibold tracking-[0.28em] text-muted-foreground">
          Build · Innovate · Scale
        </span>
      )}
    </span>
    <span className="sr-only">AR Tech Dogs</span>
  </span>
)
