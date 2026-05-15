import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lanzamiento',
  title: 'Lanzamiento',
  type: 'document',

  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'marca',
      title: 'Marca (nombre para mostrar)',
      type: 'string',
      description: 'ej: adidas, Nike, Puma',
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
      description: 'ej: f50, mercurial, phantom, predator',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha (para mostrar)',
      type: 'string',
      description: 'ej: 23 ABR 2026',
    }),
    defineField({
      name: 'fechaISO',
      title: 'Fecha',
      type: 'date',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: ['Lanzamiento', 'Signature', 'Pack', 'Colección'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'descripcionCorta',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(220),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'destacado',
      title: 'Destacado en home',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido (párrafos)',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Cada bloque de texto es un párrafo separado',
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'detallesTecnicos',
      title: 'Detalles técnicos',
      type: 'object',
      fields: [
        defineField({ name: 'suela', title: 'Suela', type: 'string' }),
        defineField({ name: 'terreno', title: 'Terreno', type: 'string' }),
        defineField({ name: 'peso', title: 'Peso', type: 'string' }),
        defineField({
          name: 'colorways',
          title: 'Colorways disponibles',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'coleccion',
      title: 'Colección',
      type: 'string',
    }),
  ],

  preview: {
    select: { title: 'titulo', media: 'imagen', subtitle: 'fecha' },
  },

  orderings: [
    {
      title: 'Fecha (recientes primero)',
      name: 'fechaDesc',
      by: [{ field: 'fechaISO', direction: 'desc' }],
    },
  ],
})
