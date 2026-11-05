import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type {
  Capability,
  Company,
  Homepage,
  Package,
  Partner,
  Project,
  Service,
  SiteSetting,
  TeamMember,
  Testimonial,
} from '@/payload-types'

const payload = () => getPayload({ config: configPromise })

/** Wrap a query so pages share one cached result per tag, revalidated by CMS hooks. */
const cached = <T>(key: string, fn: () => Promise<T>) => unstable_cache(fn, [key], { tags: [key] })

export const getServices = cached('services', async (): Promise<Service[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'services',
    sort: 'order',
    limit: 100,
    depth: 0,
    pagination: false,
  })
  return res.docs
})

export const getServiceBySlug = async (slug: string) =>
  (await getServices()).find((s) => s.slug === slug) ?? null

export const getPackages = cached('packages', async (): Promise<Package[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'packages',
    sort: 'order',
    limit: 200,
    depth: 0,
    pagination: false,
  })
  return res.docs
})

export const getPackagesForService = async (serviceId: Service['id']) =>
  (await getPackages()).filter((p) => {
    const id = typeof p.service === 'object' ? p.service?.id : p.service
    return id === serviceId
  })

export const getCapabilities = cached('capabilities', async (): Promise<Capability[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'capabilities',
    sort: 'order',
    limit: 100,
    depth: 0,
    pagination: false,
  })
  return res.docs
})

export const getProjects = cached('projects', async (): Promise<Project[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'projects',
    sort: 'order',
    limit: 100,
    depth: 1,
    pagination: false,
    overrideAccess: false,
    draft: false,
    where: { _status: { equals: 'published' } },
  })
  return res.docs
})

export const getProjectBySlug = async (slug: string) =>
  (await getProjects()).find((p) => p.slug === slug) ?? null

export const getTeam = cached('team', async (): Promise<TeamMember[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'team-members',
    sort: 'order',
    limit: 50,
    depth: 1,
    pagination: false,
  })
  return res.docs
})

export const getTestimonials = cached('testimonials', async (): Promise<Testimonial[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'testimonials',
    sort: 'order',
    limit: 50,
    depth: 0,
    pagination: false,
    where: { approved: { equals: true } },
  })
  return res.docs
})

export const getPartners = cached('partners', async (): Promise<Partner[]> => {
  const res = await (
    await payload()
  ).find({
    collection: 'partners',
    sort: 'order',
    limit: 200,
    depth: 1,
    pagination: false,
  })
  return res.docs
})

export const getSiteSettings = cached('global_site-settings', async (): Promise<SiteSetting> =>
  (await payload()).findGlobal({ slug: 'site-settings', depth: 1 }),
)

export const getHomepage = cached('global_homepage', async (): Promise<Homepage> =>
  (await payload()).findGlobal({ slug: 'homepage', depth: 0 }),
)

export const getCompany = cached('global_company', async (): Promise<Company> =>
  (await payload()).findGlobal({ slug: 'company', depth: 0 }),
)

/** Text-list fields are stored as `{ value }[]`. */
export const values = (list?: { value: string }[] | null) =>
  (list ?? []).map((i) => i.value).filter(Boolean)

/** Brand price format: "R18,500". */
export const formatPrice = (price: number) => `R${Math.round(price).toLocaleString('en-US')}`
