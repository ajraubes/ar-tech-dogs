import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import { Media } from '@/components/Media'
import { CTASection } from '@/components/site/CTASection'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { SplitWords } from '@/components/site/SplitWords'
import { lookFor, TeamPug } from '@/components/site/TeamPug'
import { getCompany, getTeam, values } from '@/lib/data'
import type { TeamMember } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const metadata: Metadata = {
  title: 'Meet the Team',
  description: 'AR Tech Dogs is a founder-led, senior development studio.',
  alternates: { canonical: '/meet-the-team' },
}

/** A small round photo on the pug tile, once a real photo is uploaded in the CMS. */
const PhotoBadge = ({ member }: { member: TeamMember }) =>
  member.photo && typeof member.photo === 'object' ? (
    <div className="absolute bottom-4 left-4 size-20 overflow-hidden rounded-full shadow-[var(--shadow-float)] ring-4 ring-background md:size-24">
      <Media fill imgClassName="object-cover" resource={member.photo} size="96px" />
    </div>
  ) : null

/** One person: their pug, then who they are, what they are good at and where they have worked. */
const Member = ({
  member,
  flip,
  heading: Heading = 'h3',
  id,
}: {
  member: TeamMember
  flip?: boolean
  heading?: 'h2' | 'h3'
  id?: string
}) => {
  const expertise = values(member.expertise)
  const brands = values(member.experience)
  const Sub = Heading === 'h2' ? 'h3' : 'h4'
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal className={cn('lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
        <div className="clip-rise relative">
          <TeamPug
            className="aspect-[4/4.6]"
            look={lookFor(member.type, member.role)}
            name={member.name}
          />
          <PhotoBadge member={member} />
        </div>
      </Reveal>
      <Reveal className={cn('lg:col-span-7', flip && 'lg:order-1')} delay={80} stagger>
        <Heading className={Heading === 'h2' ? 'text-h1' : 'text-h2'} id={id}>
          <SplitWords text={member.name} />
        </Heading>
        <p className="mt-2 text-lg font-semibold text-brand-text">{member.role}</p>
        <p className="text-lead mt-6 max-w-[52ch] whitespace-pre-line">{member.bio}</p>
        {expertise.length > 0 && (
          <div className="mt-9">
            <Sub className="text-lg font-semibold">Expertise</Sub>
            <ul className="mt-3 flex flex-wrap gap-2">
              {expertise.map((e) => (
                <li
                  className="rounded-full bg-card px-3.5 py-1.5 text-[0.9375rem] font-medium"
                  key={e}
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}
        {brands.length > 0 && (
          <div className="mt-9">
            <Sub className="text-lg font-semibold">Brands worked on</Sub>
            <p className="mt-2 text-xl font-semibold tracking-[-0.01em]">{brands.join(', ')}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Experience before AR Tech Dogs, not AR Tech Dogs client work.
            </p>
          </div>
        )}
        {(member.links?.length ?? 0) > 0 && (
          <ul className="mt-8 flex flex-wrap gap-4 text-sm">
            {member.links!.map((l) => (
              <li key={l.url}>
                <a
                  className="inline-flex min-h-11 items-center gap-1 underline-offset-4 hover:underline"
                  href={l.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {l.label}
                  <ArrowUpRight aria-hidden className="size-[1.05em]" strokeWidth={2.25} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  )
}

export default async function TeamPage() {
  const [team, company] = await Promise.all([getTeam(), getCompany()])
  const founder = team.find((m) => m.type === 'founder')
  const others = team.filter((m) => m !== founder)

  return (
    <>
      <PageHero
        pug={false}
        lead="A founder-led studio with a small senior team. You work directly with the people doing the work, from the first call to launch and beyond."
        title="Senior-led. Hands-on."
      />

      {founder && (
        <Section aria-labelledby="founder-title">
          <div className="container">
            <Member heading="h2" id="founder-title" member={founder} />
          </div>
        </Section>
      )}

      {others.length > 0 && (
        <Section aria-labelledby="team-title" className="pt-0 md:pt-0">
          <div className="container">
            <SectionHeader
              id="team-title"
              lead="The people who design, build and grow what we make, each one senior in their field."
              title="The team"
            />
            <ul className="space-y-24 md:space-y-32">
              {others.map((m, i) => (
                <li key={m.id}>
                  <Member flip={i % 2 === 0} member={m} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {(company?.teamModel?.length ?? 0) > 0 && (
        <Section aria-labelledby="model-title" tone="raised">
          <div className="container">
            <SectionHeader
              id="model-title"
              lead="The right specialists for each project, led by the same senior developer from start to finish."
              title="Small core. Trusted specialists."
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {company.teamModel!.map((r, i) => (
                <Reveal
                  as="li"
                  className="rounded-[var(--radius-xl)] bg-background p-7 md:p-9"
                  delay={i * 60}
                  key={r.role}
                >
                  <h3 className="text-lg font-semibold tracking-tight">{r.role}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CTASection title="Work directly with a senior developer." />
    </>
  )
}
