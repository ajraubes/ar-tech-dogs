import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'en_ZA',
  description:
    'Senior-led web development studio in Cape Town. Custom websites, Shopify and Shopify Plus stores, and platforms built to load fast and grow.',
  images: [{ url: `${getServerSideURL()}/og`, width: 1200, height: 630, alt: 'AR Tech Dogs' }],
  siteName: 'AR Tech Dogs',
  title: 'AR Tech Dogs · Web & Shopify Development, Cape Town',
  url: '/',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
