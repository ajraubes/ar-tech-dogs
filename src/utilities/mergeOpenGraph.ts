import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'en_ZA',
  description:
    'Senior-led development studio building high-performance websites, Shopify stores and custom digital platforms.',
  images: [{ url: `${getServerSideURL()}/og`, width: 1200, height: 630 }],
  siteName: 'AR Tech Dogs',
  title: 'AR Tech Dogs · Design. Develop. Deliver, one sip at a time.',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
