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
                  'h-11 rounded-full border px-5 text-sm transition-[background-color,border-color,color] duration-200 active:scale-[0.97]',
                  filter === c.value
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
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
        {visible.map((p) => (
          <li className="fade-up" key={p.id}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </>
  )
}
