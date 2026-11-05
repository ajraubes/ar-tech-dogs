import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { projectCategories } from '@/content/categories'
import type { Project } from '@/payload-types'

export const categoryLabel = (value: string) =>
  projectCategories.find((c) => c.value === value)?.label ?? value

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Link className="group flex h-full flex-col" href={`/our-work/${project.slug}`}>
    {/* Fixed aspect ratio reserves space before the image loads (no layout shift). */}
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-xl)] bg-card">
      {project.heroImage && typeof project.heroImage === 'object' && (
        <Media
          fill
          imgClassName="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          resource={project.heroImage}
          size="(min-width: 1024px) 50vw, 100vw"
        />
      )}
    </div>
    <div className="flex flex-1 flex-col pt-6">
      <p className="text-sm text-muted-foreground">
        {categoryLabel(project.category)}
        {project.industry ? `, ${project.industry}` : ''}
      </p>
      <h3 className="text-h3 mt-2 line-clamp-2 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-current">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 leading-relaxed text-muted-foreground">{project.summary}</p>
      <p className="mt-auto pt-4 text-sm font-semibold">{project.client}</p>
    </div>
  </Link>
)
