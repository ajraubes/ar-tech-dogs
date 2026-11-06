import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const SITE = 'AR Tech Dogs'

/** The share image for a page: the branded card with this page's own headline on it. */
export const ogImage = (title?: string, kicker?: string) => {
  const params = new URLSearchParams()
  if (title) params.set('title', title)
  if (kicker) params.set('kicker', kicker)
  const query = params.toString()
  return `${getServerSideURL()}/og${query ? `?${query}` : ''}`
}

/**
 * Everything a page needs for search and for link previews, in one call: the title and
 * description Google shows, the canonical URL, and the Open Graph and X card that
 * WhatsApp, LinkedIn, Slack and iMessage use when the link is shared.
 *
 * Keep `title` under ~45 characters (" · AR Tech Dogs" is added) and `description`
 * between ~120 and 155 characters, so neither is cut off in results.
 */
export const pageMeta = ({
  title,
  description,
  path,
  absoluteTitle,
  share,
  kicker,
  image,
  noindex,
}: {
  title: string
  description: string
  path: string
  /** Use the title as is, without the site name added (the home page). */
  absoluteTitle?: boolean
  /** Headline on the share card, when it should differ from the page title. */
  share?: string
  kicker?: string
  /** A real image for the share card (e.g. a case study's hero), instead of the branded card. */
  image?: string
  noindex?: boolean
}): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE}`
  const images = [
    {
      url: image ?? (absoluteTitle && !share ? ogImage() : ogImage(share ?? title, kicker)),
      width: 1200,
      height: 630,
      alt: share ?? title,
    },
  ]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: mergeOpenGraph({ title: fullTitle, description, url: path, images }),
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

/** The seeded sample case studies (slug "sample-…"): previews only, never indexed. */
export const isSample = (project: { slug?: string | null }) =>
  Boolean(project.slug?.startsWith('sample-'))
