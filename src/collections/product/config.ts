import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Products',
    useAsTitle: 'title',
    description:
      'Upload Collections of images for product landing pages and product display pages.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Bongs', value: 'bongs' },
        { label: 'Bubblers', value: 'bubblers' },
        { label: 'Pipes', value: 'pipes' },
        { label: 'Bowls', value: 'bowls' },
        { label: 'Accessories', value: 'accessories' },
      ],
    },
    {
      name: 'primaryImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
  ],
}
