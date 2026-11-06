import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { ogImage } from './pageMeta'

const getImageURL = (image: Media | Config['db']['defaultIDType'] | null | undefined) => {
  if (!image || typeof image !== 'object' || !image.url) return undefined
  return new URL(image.sizes?.og?.url || image.url, getServerSideURL()).toString()
}

/** Metadata for CMS pages and posts, from the SEO tab in the admin. */
export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  /** The page's own path, e.g. `/posts/my-post`. */
  path: string
}): Promise<Metadata> => {
  const { doc, path } = args

  // The SEO plugin's generated titles already end in the site name, so use them as is.
  const title = doc?.meta?.title || (doc?.title ? `${doc.title} · AR Tech Dogs` : 'AR Tech Dogs')
  const description = doc?.meta?.description || undefined
  const image = getImageURL(doc?.meta?.image) ?? ogImage(doc?.title || undefined)
  const images = [{ url: image, width: 1200, height: 630 }]

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: mergeOpenGraph({ title, description, images, url: path }),
    twitter: { card: 'summary_large_image', title, description, images },
  }
}
