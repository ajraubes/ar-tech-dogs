import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * The team, drawn as the pack from the brand's team profiles: each person has their own
 * dog at the laptop with a coffee. Portraits are matched by first name, so they work with
 * whatever is in the CMS. Anyone without one gets the "Profile coming soon" card.
 */
const PORTRAITS: Record<string, { src: string; alt: string }> = {
  jinx: { src: '/brand/team/jinx.webp', alt: 'Jinx, drawn as a black and white border collie' },
  aj: { src: '/brand/team/aj.webp', alt: 'AJ, drawn as a German shepherd in a dark suit' },
  danika: { src: '/brand/team/danika.webp', alt: 'Danika, drawn as a golden retriever' },
  zurika: { src: '/brand/team/zurika.webp', alt: 'Zurika, drawn as a whippet' },
  ruan: { src: '/brand/team/ruan.webp', alt: 'Ruan, drawn as a husky' },
}
// The artwork spells Ruan as "Raun"; accept both.
const ALIASES: Record<string, string> = { raun: 'ruan' }

export const portraitFor = (name: string) => {
  const first = name.trim().split(/\s+/)[0]?.toLowerCase() ?? ''
  return PORTRAITS[ALIASES[first] ?? first]
}

export const TeamPortrait: React.FC<{
  name: string
  className?: string
  sizes?: string
  /** Round portrait only, no tile behind it (for the overview grid). */
  bare?: boolean
}> = ({ name, className, sizes = '(min-width: 1024px) 36vw, 90vw', bare }) => {
  const portrait = portraitFor(name)

  if (!portrait) {
    return (
      <div
        className={cn('team-pug relative overflow-hidden rounded-[2rem] bg-[#fbf3ea]', className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`${name}: profile coming soon`}
          className="absolute inset-0 size-full object-cover"
          decoding="async"
          height={800}
          loading="lazy"
          sizes={sizes}
          src="/brand/team/coming-soon.webp"
          width={800}
        />
      </div>
    )
  }

  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      alt={portrait.alt}
      className="pug-tilt h-auto w-full"
      decoding="async"
      height={560}
      loading="lazy"
      sizes={sizes}
      src={portrait.src}
      width={560}
    />
  )

  if (bare) return <div className={cn('team-pug', className)}>{img}</div>

  return (
    <div
      className={cn(
        'team-pug relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-card',
        className,
      )}
    >
      <div className="w-[84%]">{img}</div>
    </div>
  )
}
