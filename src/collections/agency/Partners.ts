import type { CollectionConfig } from 'payload'

import { partnerCategories } from '@/content/categories'

import { orderField, publicContent } from './shared'

export const Partners: CollectionConfig<'partners'> = {
  slug: 'partners',
  labels: { singular: 'Ecosystem entry', plural: 'Ecosystem' },
  ...publicContent('partners'),
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'officialPartner'],
    description: 'Platforms and tools we work with, shown on /ecosystem.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: partnerCategories,
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'website', type: 'text' },
    {
      name: 'officialPartner',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Tick only if AR Tech Dogs holds a verified, official partnership. Shows a "Partner" badge.',
      },
    },
    orderField,
  ],
}
