import { cn } from '@/utilities/ui'
import React from 'react'

import { Reveal } from './Reveal'
import { SplitWords } from './SplitWords'

export type SectionTone = 'base' | 'raised' | 'dark' | 'gold'

/**
 * Vertical rhythm for every page section: 80px on phones, 128px on desktop.
 * Tones change the whole field colour; sections never need a dividing line.
 */
export const Section: React.FC<{
  children: React.ReactNode
  className?: string
  id?: string
  tone?: SectionTone
  'aria-labelledby'?: string
  'aria-label'?: string
}> = ({ children, className, id, tone = 'base', ...rest }) => (
  <section
    {...rest}
    className={cn('relative py-20 md:py-32', tone === 'raised' && 'bg-card', className)}
    data-theme={tone === 'dark' ? 'dark' : tone === 'gold' ? 'gold' : undefined}
    id={id}
  >
    {children}
  </section>
)

export const SectionHeader: React.FC<{
  title: string
  lead?: string | null
  id?: string
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}> = ({ title, lead, id, align = 'left', className, children }) => (
  <Reveal
    className={cn(
      'mb-12 flex flex-col gap-5 md:mb-16',
      align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl',
      className,
    )}
    stagger
  >
    <h2 className="text-h2" id={id}>
      <SplitWords text={title} />
    </h2>
    {lead && <p className="text-lead max-w-2xl">{lead}</p>}
    {children}
  </Reveal>
)
