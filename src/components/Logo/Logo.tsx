import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * AR Tech Dogs mark: an abstract paw built from a code-bracket pad and three
 * square "toes". Technical first, dog second.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={cn('size-8 shrink-0', className)}
    fill="none"
    viewBox="0 0 32 32"
  >
    <rect fill="var(--primary)" height="32" rx="8" width="32" />
    <rect fill="var(--primary-foreground)" height="4.5" rx="1.25" width="4.5" x="7" y="7.5" />
    <rect fill="var(--primary-foreground)" height="4.5" rx="1.25" width="4.5" x="13.75" y="5.5" />
    <rect fill="var(--primary-foreground)" height="4.5" rx="1.25" width="4.5" x="20.5" y="7.5" />
    <path
      d="M11.5 16.5 8 20.25 11.5 24M20.5 16.5 24 20.25 20.5 24M17.5 15.5l-3 9.5"
      stroke="var(--primary-foreground)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.25"
    />
  </svg>
)

export const Logo = ({
  className,
}: {
  className?: string
  loading?: string
  priority?: string
}) => (
  <span className={cn('inline-flex items-center gap-2.5', className)}>
    <LogoMark />
    <span className="text-[1.0625rem] font-semibold leading-none tracking-[-0.02em] whitespace-nowrap">
      AR Tech Dogs
    </span>
  </span>
)
