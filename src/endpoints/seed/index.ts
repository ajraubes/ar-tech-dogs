import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

import {
  capabilities,
  company,
  footerNavigation,
  founder,
  homepage,
  navigation,
  packages,
  partners,
  sampleProjects,
  services,
  siteSettings,
  team,
} from '@/content/seedData'

/** Collections this seed owns. Enquiries, users, media, pages and posts are never touched. */
const owned: CollectionSlug[] = ['packages', 'services', 'capabilities', 'partners', 'team-members']

const list = (items: string[]) => items.map((value) => ({ value }))
const customLink = (label: string, url: string) => ({
  link: { type: 'custom' as const, label, url, newTab: false },
})

/**
 * Loads AR Tech Dogs starting content from src/content/seedData.ts.
 * Re-running it replaces services, packages, capabilities, ecosystem and team entries,
 * and resets the Site Settings, Homepage, Company, Header and Footer globals.
 */
export const seed = async ({ payload, req }: { payload: Payload; req: PayloadRequest }) => {
  const ctx = { disableRevalidate: true }
  payload.logger.info('Seeding AR Tech Dogs content…')

  for (const collection of owned) {
    await payload.delete({ collection, where: {}, req, context: ctx })
  }

  const serviceIds: Record<string, number | string> = {}
  for (const [i, s] of services.entries()) {
    const doc = await payload.create({
      collection: 'services',
      req,
      context: ctx,
      data: {
        number: s.number,
        title: s.title,
        shortTitle: s.shortTitle,
        slug: s.slug,
        summary: s.summary,
        heroHeading: s.heroHeading,
        overview: s.overview,
        audience: list(s.audience),
        problems: s.problems,
        features: list(s.features),
        deliverables: list(s.deliverables),
        technologies: list(s.technologies),
        faqs: s.faqs,
        core: s.core,
        order: i,
      },
    })
    serviceIds[s.slug] = doc.id
  }

  for (const [i, p] of packages.entries()) {
    await payload.create({
      collection: 'packages',
      req,
      context: ctx,
      data: {
        name: p.name,
        tier: p.tier,
        service: serviceIds[p.service] as number,
        price: p.price,
        orMore: p.orMore,
        billing: p.billing,
        description: p.description,
        includesPrevious: p.includesPrevious,
        features: list(p.features),
        featured: Boolean(p.featured),
        order: i,
      },
    })
  }

  for (const [i, c] of capabilities.entries()) {
    await payload.create({
      collection: 'capabilities',
      req,
      context: ctx,
      data: { title: c.title, slug: c.slug, summary: c.summary, items: list(c.items), order: i },
    })
  }

  for (const [i, p] of partners.entries()) {
    await payload.create({
      collection: 'partners',
      req,
      context: ctx,
      data: { ...p, officialPartner: false, order: i },
    })
  }

  await payload.create({
    collection: 'team-members',
    req,
    context: ctx,
    data: {
      name: founder.name,
      role: founder.role,
      type: 'founder',
      bio: founder.bio,
      expertise: list(founder.expertise),
      experience: list(founder.experience),
      order: 0,
    },
  })
  for (const [i, m] of team.entries()) {
    await payload.create({
      collection: 'team-members',
      req,
      context: ctx,
      data: {
        name: m.name,
        role: m.role,
        type: 'core',
        bio: m.bio,
        expertise: list(m.expertise),
        experience: list(m.experience),
        order: i + 1,
      },
    })
  }

  // Sample case studies, created once and always as drafts, so the Our Work layout can be
  // previewed in the admin. They are never overwritten or published by the seed.
  for (const [i, p] of sampleProjects.entries()) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: p.slug } },
      limit: 1,
      draft: true,
      req,
    })
    if (existing.docs.length) continue
    await payload.create({
      collection: 'projects',
      req,
      context: ctx,
      draft: true,
      data: {
        ...p,
        technologies: list(p.technologies),
        features: list(p.features),
        results: list(p.results),
        order: 10 + i,
        _status: 'draft',
      },
    })
  }

  // One unpublished example so the case-study structure is visible in the admin.
  const existingExample = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'example-case-study' } },
    limit: 1,
    req,
  })
  if (!existingExample.docs.length) {
    await payload.create({
      collection: 'projects',
      req,
      context: ctx,
      draft: true,
      data: {
        title: 'Example case study (draft)',
        slug: 'example-case-study',
        client: '[Client name]',
        industry: '[Industry]',
        category: 'shopify',
        summary: '[One-sentence summary of the project and its outcome.]',
        challenge: '[What problem did the client have?]',
        solution: '[What did you build, and why?]',
        technologies: list(['Shopify', 'Liquid']),
        features: list(['[Key feature]']),
        attribution: '[e.g. Founder work at a previous agency]',
        _status: 'draft',
      },
    })
  }

  await payload.updateGlobal({ slug: 'site-settings', req, context: ctx, data: siteSettings })
  await payload.updateGlobal({ slug: 'homepage', req, context: ctx, data: homepage })
  await payload.updateGlobal({ slug: 'company', req, context: ctx, data: company })
  await payload.updateGlobal({
    slug: 'header',
    req,
    context: ctx,
    data: {
      navItems: navigation.map((n) => customLink(n.label, n.url)),
      cta: { label: 'Start a Project', url: '/contact' },
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    req,
    context: ctx,
    data: { navItems: footerNavigation.map((n) => customLink(n.label, n.url)) },
  })

  payload.logger.info('Seed complete.')
}
