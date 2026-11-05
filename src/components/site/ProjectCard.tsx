import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { projectCategories } from '@/content/categories'
import type { Project } from '@/payload-types'

export const categoryLabel = (value: string) =>
  projectCategories.find((c) => c.value === value)?.label ?? value

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Link
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-border-strong"
    href={`/our-work/${project.slug}`}
  >
    {/* Fixed aspect ratio reserves space before the image loads (no layout shift). */}
    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
      {project.heroImage && typeof project.heroImage === 'object' ? (
        <Media
          fill
          imgClassName="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          resource={project.heroImage}
          size="(min-width: 1024px) 50vw, 100vw"
        />
      ) : (
        <div aria-hidden className="bg-grid absolute inset-0" />
      )}
    </div>
    <div className="flex flex-1 flex-col p-6 md:p-8">
      <p className="eyebrow">
        {categoryLabel(project.category)}
        {project.industry ? ` · ${project.industry}` : ''}
      </p>
      <h3 className="text-h3 mt-3 line-clamp-2">{project.title}</h3>
      <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
        {project.summary}
      </p>
      <p className="mt-auto pt-6 text-sm text-muted-foreground">{project.client}</p>
    </div>
  </Link>
)
