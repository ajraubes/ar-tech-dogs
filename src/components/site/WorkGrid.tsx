'use client'

import React, { useMemo, useState } from 'react'

import { projectCategories } from '@/content/categories'
import type { Project } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ProjectCard } from './ProjectCard'

/** Category filter. Pills only appear for categories that have projects. */
export const WorkGrid: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('all')
  const available = projectCategories.filter((c) => projects.some((p) => p.category === c.value))
  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  )

  return (
    <>
      {available.length > 1 && (
        <div aria-label="Filter projects" className="-mx-5 mb-10 overflow-x-auto px-5" role="group">
          <div className="flex w-max gap-2">
            {[{ label: 'All', value: 'all' }, ...available].map((c) => (
              <button
                aria-pressed={filter === c.value}
                className={cn(
                  'h-11 rounded-full px-5 text-[0.9375rem] font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.96]',
                  filter === c.value
                    ? 'bg-foreground text-background'
                    : 'bg-card text-foreground hover:bg-secondary',
                )}
                key={c.value}
                onClick={() => setFilter(c.value)}
                type="button"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <ul className="grid gap-6 md:grid-cols-2">
        {visible.map((p, i) => (
          // Keyed by filter too, so the cards deal in again when the filter changes.
          <li
            className="fade-up"
            key={`${filter}-${p.id}`}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </>
  )
}
