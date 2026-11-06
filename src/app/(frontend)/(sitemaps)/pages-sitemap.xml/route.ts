import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { isSample } from '@/utilities/pageMeta'

export const dynamic = 'force-dynamic'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const staticRoutes = [
      '/',
      '/about',
      '/meet-the-team',
      '/solutions',
      '/capabilities',
      '/our-work',
      '/ecosystem',
      '/pricing',
      '/contact',
    ]
    const defaultSitemap = staticRoutes.map((route) => ({
      loc: `${SITE_URL}${route === '/' ? '/' : route}`,
      lastmod: dateFallback,
    }))

    const [services, projects, posts] = await Promise.all([
      payload.find({
        collection: 'services',
        depth: 0,
        limit: 100,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'projects',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 200,
        pagination: false,
        where: { _status: { equals: 'published' } },
        select: { slug: true, updatedAt: true },
      }),
      payload.count({ collection: 'posts', overrideAccess: false }),
    ])
    // Insights only goes in the sitemap once there is something to read there.
    if (posts.totalDocs > 0)
      defaultSitemap.push({ loc: `${SITE_URL}/posts`, lastmod: dateFallback })
    const agencySitemap = [
      ...services.docs.map((d) => ({
        loc: `${SITE_URL}/solutions/${d.slug}`,
        lastmod: d.updatedAt || dateFallback,
      })),
      ...projects.docs
        .filter((d) => !isSample(d))
        .map((d) => ({
          loc: `${SITE_URL}/our-work/${d.slug}`,
          lastmod: d.updatedAt || dateFallback,
        })),
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug) && page.slug !== 'home')
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...agencySitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
