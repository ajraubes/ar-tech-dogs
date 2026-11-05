import React from 'react'

import { Media } from '@/components/Media'
import { partnerCategories } from '@/content/categories'
import type { Partner } from '@/payload-types'
import { Reveal } from './Reveal'

const Tile = ({ partner }: { partner: Partner }) => {
  const body = (
    <>
      <div className="flex items-center gap-3">
        {/* A real logo when the CMS has one; no invented monogram when it does not. */}
        {partner.logo && typeof partner.logo === 'object' && (
          <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-background">
            <Media fill imgClassName="object-contain p-1.5" resource={partner.logo} size="40px" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-xl font-semibold tracking-[-0.01em]">{partner.name}</p>
          {partner.officialPartner && (
            <p className="text-sm font-semibold text-brand-text">Official partner</p>
          )}
        </div>
      </div>
      <p className="mt-2 leading-relaxed text-muted-foreground">{partner.description}</p>
    </>
  )
  const cls =
    'block h-full rounded-[var(--radius-xl)] bg-card p-6 transition-[background-color,transform] duration-200 ease-[var(--ease-out-quart)]'
  return partner.website ? (
    <a
      className={`${cls} hover:bg-secondary active:scale-[0.99]`}
      href={partner.website}
      rel="noopener noreferrer"
      target="_blank"
    >
      {body}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export const EcosystemGrid: React.FC<{ partners: Partner[] }> = ({ partners }) => {
  const groups = partnerCategories
    .map((c) => ({ ...c, items: partners.filter((p) => p.category === c.value) }))
    .filter((g) => g.items.length)

  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section
          aria-labelledby={`eco-${group.value}`}
          className="grid gap-6 lg:grid-cols-12"
          key={group.value}
        >
          <div className="lg:col-span-3">
            <h2 className="text-h3 lg:sticky lg:top-28" id={`eco-${group.value}`}>
              {group.label}
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
            {group.items.map((p, i) => (
              <Reveal as="li" delay={i * 50} key={p.id}>
                <Tile partner={p} />
              </Reveal>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
