import type { CollectionConfig } from 'payload'

import { orderField, publicContent } from './shared'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  ...publicContent('testimonials'),
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'approved'],
    description: 'Real client feedback only. Unapproved testimonials are never shown.',
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'role', type: 'text', admin: { width: '33%' } },
        { name: 'company', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'The client approved this quote for publication.',
      },
    },
    orderField,
  ],
}
