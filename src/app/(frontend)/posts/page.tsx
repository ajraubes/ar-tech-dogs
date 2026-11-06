import type { Metadata } from 'next/types'

import { getPublishedPostCount } from '@/lib/data'
import { pageMeta } from '@/utilities/pageMeta'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CTASection } from '@/components/site/CTASection'
import { EmptyState } from '@/components/site/EmptyState'
import { PageHero } from '@/components/site/PageHero'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <>
      <PageClient />
      <PageHero
        lead="Notes on Shopify, custom builds and running a fast, maintainable website."
        title="Insights"
      />
      <section className="py-16 md:py-24">
        {posts.totalDocs === 0 ? (
          <div className="container">
            <EmptyState
              action={{ label: 'Explore our solutions', href: '/solutions' }}
              body="The first articles are being written. In the meantime, our solutions pages explain how we approach each kind of project."
              title="Nothing published yet"
            />
          </div>
        ) : (
          <>
            <div className="container mb-8">
              <PageRange
                collection="posts"
                currentPage={posts.page}
                limit={12}
                totalDocs={posts.totalDocs}
              />
            </div>

            <CollectionArchive posts={posts.docs} />

            <div className="container">
              {posts.totalPages > 1 && posts.page && (
                <Pagination page={posts.page} totalPages={posts.totalPages} />
              )}
            </div>
          </>
        )}
      </section>
      <CTASection />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  // Keep the empty Insights page out of search results until the first post is published.
  const count = await getPublishedPostCount()
  return pageMeta({
    title: 'Insights on Shopify & Web Development',
    description:
      'Notes from AR Tech Dogs on Shopify, custom web development, site speed and running a store that grows. Practical, from a senior development studio.',
    path: '/posts',
    share: 'Insights',
    kicker: 'From the studio',
    noindex: count === 0,
  })
}
