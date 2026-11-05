import type { Metadata } from 'next'
import React from 'react'

import { Media } from '@/components/Media'
import { CTASection } from '@/components/site/CTASection'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { Section, SectionHeader } from '@/components/site/Section'
import { getCompany, getTeam, values } from '@/lib/data'
import type { TeamMember } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Meet the Team',
  description: 'AR Tech Dogs is a founder-led, senior development studio.',
  alternates: { canonical: '/meet-the-team' },
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const Portrait = ({ member, className }: { member: TeamMember; className: string }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-border bg-secondary ${className}`}
  >
    {member.photo && typeof member.photo === 'object' ? (
      <Media
        fill
        imgClassName="object-cover"
        resource={member.photo}
        size="(min-width: 1024px) 400px, 100vw"
      />
    ) : (
      <div className="bg-grid absolute inset-0 flex items-center justify-center">
        <span className="text-display text-foreground/15">{initials(member.name)}</span>
      </div>
    )}
  </div>
)

export default async function TeamPage() {
  const [team, company] = await Promise.all([getTeam(), getCompany()])
  const founder = team.find((m) => m.type === 'founder')
  const others = team.filter((m) => m !== founder)

  return (
    <>
      <PageHero
        eyebrow="Meet the Team"
        lead="A founder-led development studio. You work directly with a senior developer, supported by trusted specialists when a project needs them."
        title="Senior-led. Hands-on."
      />

      {founder && (
        <Section aria-labelledby="founder-title">
          <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Portrait className="aspect-[4/5]" member={founder} />
            </Reveal>
            <Reveal className="lg:col-span-7" delay={80}>
              <p className="eyebrow">{founder.role}</p>
              <h2 className="text-h2 mt-4" id="founder-title">
                {founder.name}
              </h2>
              <p className="text-lead mt-6 whitespace-pre-line">{founder.bio}</p>
              {values(founder.expertise).length > 0 && (
                <>
                  <h3 className="eyebrow mt-10">Expertise</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {values(founder.expertise).map((e) => (
                      <li className="rounded-full border border-border px-3 py-1 text-sm" key={e}>
                        {e}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {values(founder.experience).length > 0 && (
                <>
                  <h3 className="eyebrow mt-10">Brands worked on</h3>
                  <p className="mt-4 text-lg tracking-tight">
                    {values(founder.experience).join(' · ')}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Founder experience before AR Tech Dogs, not AR Tech Dogs client work.
                  </p>
                </>
              )}
              {(founder.links?.length ?? 0) > 0 && (
                <ul className="mt-8 flex flex-wrap gap-4 text-sm">
                  {founder.links!.map((l) => (
                    <li key={l.url}>
                      <a
                        className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                        href={l.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </Section>
      )}

      {others.length > 0 && (
        <Section aria-labelledby="team-title" className="pt-0 md:pt-0">
          <div className="container">
            <SectionHeader id="team-title" title="The team" />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((m, i) => (
                <Reveal as="li" delay={(i % 3) * 60} key={m.id}>
                  <Portrait className="aspect-square" member={m} />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {(company?.teamModel?.length ?? 0) > 0 && (
        <Section aria-labelledby="model-title" tone="light">
          <div className="container">
            <SectionHeader
              eyebrow="How we staff projects"
              id="model-title"
              lead="The right specialists for each project, led by the same senior developer from start to finish."
              title="Small core. Trusted specialists."
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {company.teamModel!.map((r, i) => (
                <Reveal
                  as="li"
                  className="rounded-2xl border border-border bg-card p-6 md:p-8"
                  delay={i * 60}
                  key={r.role}
                >
                  <h3 className="text-lg font-semibold tracking-tight">{r.role}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
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
