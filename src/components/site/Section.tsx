import { cn } from '@/utilities/ui'
import React from 'react'

import { Reveal } from './Reveal'

/** Vertical rhythm for every page section: 96px mobile, 128px desktop. */
export const Section: React.FC<{
  children: React.ReactNode
  className?: string
  id?: string
  tone?: 'dark' | 'light' | 'raised'
  'aria-labelledby'?: string
}> = ({ children, className, id, tone = 'dark', ...rest }) => (
  <section
    {...rest}
    className={cn(
      'relative py-24 md:py-32',
      tone === 'raised' && 'bg-card',
      tone === 'light' && 'bg-background text-foreground',
      className,
    )}
    data-theme={tone === 'light' ? 'light' : undefined}
    id={id}
  >
    {children}
  </section>
)

export const SectionHeader: React.FC<{
  eyebrow?: string
  title: string
  lead?: string | null
  id?: string
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}> = ({ eyebrow, title, lead, id, align = 'left', className, children }) => (
  <Reveal
    className={cn(
      'mb-12 flex flex-col gap-5 md:mb-16',
      align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl',
      className,
    )}
  >
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="text-h2" id={id}>
      {title}
    </h2>
    {lead && <p className="text-lead max-w-2xl">{lead}</p>}
    {children}
  </Reveal>
)
