import React from 'react'

import type { Project } from '@/payload-types'
import { cn } from '@/utilities/ui'

/**
 * Stand-in artwork for a case study that has no hero image yet: a browser window in the
 * brand's colours with the client's name set as the site's headline. It keeps the grid
 * looking finished while photography is on its way, and is replaced as soon as a hero
 * image is uploaded in the CMS.
 */

const TONES: Record<
  Project['category'],
  { field: string; page: string; ink: string; bar: string }
> = {
  shopify: {
    field: 'bg-[linear-gradient(160deg,#ecc97e,#d9ad5c)]',
    page: 'bg-[#2d2520]',
    ink: 'text-[#f2eee3]',
    bar: 'bg-[#e2c275]',
  },
  custom: {
    field: 'bg-[linear-gradient(160deg,#4f3e33,#2d2520)]',
    page: 'bg-[#f2eee3]',
    ink: 'text-[#2d2520]',
    bar: 'bg-[#725c4c]',
  },
  ecommerce: {
    field: 'bg-[linear-gradient(160deg,#d9c3a0,#bfa27a)]',
    page: 'bg-[#4f3e33]',
    ink: 'text-[#f2eee3]',
    bar: 'bg-[#e2c275]',
  },
  business: {
    field: 'bg-[linear-gradient(160deg,#e9e3d4,#d6ccb6)]',
    page: 'bg-[#fbf8f1]',
    ink: 'text-[#2d2520]',
    bar: 'bg-[#c9bba5]',
  },
}

/** "Kettle & Crema (sample)" → "Kettle & Crema" */
const cleanName = (client: string) => client.replace(/\s*\(.*?\)\s*$/, '')

export const ProjectCover: React.FC<{ project: Project; className?: string; large?: boolean }> = ({
  project,
  className,
  large,
}) => {
  const t = TONES[project.category] ?? TONES.business
  return (
    <div aria-hidden className={cn('cover absolute inset-0 overflow-hidden', t.field, className)}>
      <div
        className={cn(
          'cover-window absolute inset-x-[9%] top-[14%] -bottom-[6%] overflow-hidden rounded-t-[1.1rem] shadow-[0_30px_60px_-24px_rgb(42_32_25/0.55)]',
          t.page,
        )}
      >
        <div className="flex items-center gap-1.5 bg-black/15 px-4 py-2.5">
          <span className="size-2 rounded-full bg-white/40" />
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 h-2 w-1/3 rounded-full bg-white/15" />
        </div>
        <div
          className={cn(
            'flex flex-col gap-[0.6em] px-[8%] pt-[7%]',
            t.ink,
            large ? 'text-[clamp(1rem,2.4vw,2rem)]' : 'text-[clamp(0.85rem,1.6vw,1.25rem)]',
          )}
        >
          <span className="cover-line h-[0.35em] w-[22%] rounded-full bg-current opacity-30" />
          <span className="cover-title text-[2.2em] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            {cleanName(project.client)}
          </span>
          <span className="cover-line h-[0.35em] w-[58%] rounded-full bg-current opacity-25" />
          <span className="cover-line h-[0.35em] w-[44%] rounded-full bg-current opacity-25" />
          <span className={cn('cover-cta mt-[0.4em] h-[1.6em] w-[26%] rounded-full', t.bar)} />
        </div>
        <div className="absolute inset-x-[8%] bottom-[10%] grid grid-cols-3 gap-[3%]">
          {[0, 1, 2].map((i) => (
            <span
              className="cover-tile aspect-[4/3] rounded-[0.6rem] bg-current opacity-[0.12]"
              key={i}
              style={{ '--i': i } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
