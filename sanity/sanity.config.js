import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'botines-alta-gama',
  title: 'Botines Alta Gama CBA',

  // ⚠️  Reemplazá esto con tu Project ID de sanity.io/manage
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
