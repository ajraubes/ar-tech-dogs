import type { CollectionConfig, Field } from 'payload'

import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateSite'

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
}

export const textList = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'array',
  admin: { initCollapsed: true, description },
  fields: [{ name: 'value', type: 'text', required: true, label: false }],
})

/** Public read, editor-only write, with site-wide revalidation. */
export const publicContent = (tag: string): Pick<CollectionConfig, 'access' | 'hooks'> => ({
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateCollection(tag)],
    afterDelete: [revalidateCollectionDelete(tag)],
  },
})

export { slugField }
