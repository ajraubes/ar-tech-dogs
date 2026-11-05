import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import { Media } from '@/components/Media'
import { CTASection } from '@/components/site/CTASection'
import { PageHero } from '@/components/site/PageHero'
import { categoryLabel } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { getProjectBySlug, getProjects, values } from '@/lib/data'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  // Pages render on first request, so the Docker build never needs the database.
  if (process.env.NEXT_PHASE === 'phase-production-build') return []
  return (await getProjects()).filter((p) => p.slug).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} · Case study`,
    description: project.summary,
    alternates: { canonical: `/our-work/${slug}` },
  }
}

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Reveal className="grid gap-4 py-10 md:grid-cols-12">
    <h2 className="text-h3 md:col-span-4">{title}</h2>
    <div className="md:col-span-8">{children}</div>
  </Reveal>
)

export default async function ProjectPage({ params }: Args) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const tech = values(project.technologies)
  const features = values(project.features)
  const results = values(project.results)

  return (
    <>
      <PageHero lead={project.summary} title={project.title}>
        <dl className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Type</dt>
            <dd className="mt-1 font-medium">
              {categoryLabel(project.category)}
              {project.industry ? `, ${project.industry}` : ''}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Client</dt>
            <dd className="mt-1 font-medium">{project.client}</dd>
          </div>
          {project.attribution && (
            <div>
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="mt-1 font-medium">{project.attribution}</dd>
            </div>
          )}
          {project.liveUrl && (
            <div className="self-end">
              <Button asChild size="sm" variant="outline">
                <a href={project.liveUrl} rel="noopener noreferrer" target="_blank">
                  Visit live site{' '}
                  <ArrowUpRight aria-hidden className="size-[1.05em]" strokeWidth={2.25} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          )}
        </dl>
      </PageHero>

      {project.heroImage && typeof project.heroImage === 'object' && (
        <div className="container pt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] bg-card">
            <Media
              fill
              imgClassName="object-cover"
              priority
              resource={project.heroImage}
              size="(min-width: 1408px) 1360px, 100vw"
            />
          </div>
        </div>
      )}

      <article className="container py-16 md:py-24">
        {project.challenge && (
          <Block title="The challenge">
            <p className="text-lg leading-relaxed">{project.challenge}</p>
          </Block>
        )}
        {project.solution && (
          <Block title="Our solution">
            <p className="text-lg leading-relaxed">{project.solution}</p>
          </Block>
        )}
        {features.length > 0 && (
          <Block title="Key features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li className="flex gap-3" key={f}>
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {tech.length > 0 && (
          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <li className="rounded-full bg-card px-3.5 py-1.5 text-base" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {results.length > 0 && (
          <Block title="Results">
            <ul className="space-y-3 text-lg">
              {results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Block>
        )}
        {(project.gallery?.length ?? 0) > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {project.gallery!.map(
              (g) =>
                typeof g.image === 'object' && (
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] bg-card"
                    key={g.id}
                  >
                    <Media
                      fill
                      imgClassName="object-cover"
                      resource={g.image}
                      size="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                ),
            )}
          </div>
        )}
      </article>
      <CTASection title="Want results like this?" />
    </>
  )
}
