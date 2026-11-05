import type { CollectionConfig } from 'payload'

import { orderField, publicContent, textList } from './shared'

export const TeamMembers: CollectionConfig<'team-members'> = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Team members' },
  ...publicContent('team'),
  defaultSort: 'order',
  admin: {
    group: 'Agency',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'type'],
    description: 'Only add real people. Do not invent team members or qualifications.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'core',
      options: [
        { label: 'Founder', value: 'founder' },
        { label: 'Core team', value: 'core' },
        { label: 'Collaborator', value: 'collaborator' },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea', required: true },
    textList('expertise', 'Expertise'),
    textList(
      'experience',
      'Brands worked on',
      'Founder experience before AR Tech Dogs. Only list brands you have permission to name.',
    ),
    {
      name: 'links',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    orderField,
  ],
}
