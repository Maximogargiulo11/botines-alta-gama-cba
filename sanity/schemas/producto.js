import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'producto',
  title: 'Producto (Stock)',
  type: 'document',

  fields: [
    defineField({
      name: 'modelo',
      title: 'Modelo',
      type: 'string',
      description: 'ej: F50 Tunit Archive, Mercurial Vapor 16 Elite',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'marcaSlug',
      title: 'Marca slug',
      type: 'string',
      description: 'ej: adidas, nike, puma, new-balance',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'modeloSlug',
      title: 'Modelo slug',
      type: 'string',
      description: 'ej: f50, predator, copa, mercurial, phantom, tiempo, future, ultra, furon, tekela',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'colorway',
      title: 'Colorway',
      type: 'string',
      description: 'ej: Solar Yellow / Black, Blueprint Pack',
    }),
    defineField({
      name: 'precio',
      title: 'Precio (ARS)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del producto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tallesDisponibles',
      title: 'Talles disponibles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'talle',
          fields: [
            defineField({ name: 'us', title: 'US', type: 'string' }),
            defineField({ name: 'uk', title: 'UK', type: 'string' }),
            defineField({ name: 'eu', title: 'EU', type: 'string' }),
            defineField({ name: 'cm', title: 'CM', type: 'string' }),
          ],
          preview: {
            select: { title: 'eu', subtitle: 'us' },
            prepare({ title, subtitle }) {
              return { title: `EU ${title}`, subtitle: `US ${subtitle}` }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'modelo', subtitle: 'colorway', media: 'imagen' },
  },

  orderings: [
    {
      title: 'Precio (menor a mayor)',
      name: 'precioAsc',
      by: [{ field: 'precio', direction: 'asc' }],
    },
    {
      title: 'Modelo A–Z',
      name: 'modeloAsc',
      by: [{ field: 'modelo', direction: 'asc' }],
    },
  ],
})
