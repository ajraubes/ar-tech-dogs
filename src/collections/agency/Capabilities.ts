import type { CollectionConfig } from 'payload'

import { orderField, publicContent, slugField, textList } from './shared'

export const Capabilities: CollectionConfig<'capabilities'> = {
  slug: 'capabilities',
  labels: { singular: 'Capability', plural: 'Capabilities' },
  ...publicContent('capabilities'),
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    description: 'How we build. Shown on /capabilities.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    textList('items', 'Tools & techniques'),
    orderField,
    slugField({ useAsSlug: 'title' }),
  ],
}
