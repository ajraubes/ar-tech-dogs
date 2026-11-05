import type { CollectionConfig } from 'payload'

import { projectCategories } from '@/content/categories'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateSite'
import { orderField, slugField, textList } from './shared'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateCollection('projects')],
    afterDelete: [revalidateCollectionDelete('projects')],
  },
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', '_status'],
    description:
      'Case studies. Only publish client work you have permission to show, and say clearly if it was founder work before AR Tech Dogs.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'client', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'industry', type: 'text', admin: { width: '33%' } },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: projectCategories,
          admin: { width: '33%' },
        },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Case study',
          fields: [
            { name: 'challenge', type: 'textarea' },
            { name: 'solution', type: 'textarea' },
            textList('technologies', 'Technologies'),
            textList('features', 'Key features'),
            textList('results', 'Results', 'Only measurable, verifiable results.'),
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
      ],
    },
    {
      name: 'liveUrl',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'attribution',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'e.g. "Founder work at a previous agency". Shown on the case study.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the homepage.' },
    },
    orderField,
    slugField({ useAsSlug: 'title' }),
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
