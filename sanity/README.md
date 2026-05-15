# Sanity Studio — Botines Alta Gama CBA

Panel visual para gestionar lanzamientos, stock e imágenes sin tocar código.

## Configuración inicial (una sola vez)

### 1. Crear cuenta y proyecto en Sanity

1. Andá a [sanity.io](https://www.sanity.io) y creá una cuenta gratuita.
2. Creá un nuevo proyecto (podés llamarlo "botines-alta-gama-cba").
3. Copiá el **Project ID** que te asigna (lo vas a necesitar en el paso 3).
4. En **Settings → API → CORS origins**, agregá:
   - `http://localhost:3000` (para desarrollo local)
   - La URL de tu sitio en Vercel (para producción)

### 2. Instalar dependencias

Desde la carpeta `sanity/`:

```bash
cd sanity
npm install
```

### 3. Conectar tu proyecto

En **`sanity/sanity.config.js`**, reemplazá `YOUR_PROJECT_ID` con el ID de tu proyecto:

```js
projectId: 'abc123xyz',   // ← tu Project ID
```

En **`src/sanity-client.jsx`** (en la raíz del sitio), hacé lo mismo:

```js
const SANITY_PROJECT_ID = 'abc123xyz';   // ← el mismo ID
```

### 4. Lanzar el Studio localmente

```bash
npm run dev
```

Abre http://localhost:3333 y ya podés gestionar el contenido.

### 5. (Opcional) Deployar el Studio a Sanity Cloud

```bash
npm run deploy
```

Esto crea una URL pública como `https://botines-alta-gama-cba.sanity.studio`
para acceder al panel desde cualquier lugar.

---

## Tipos de contenido

### Lanzamiento

Cada artículo editorial que aparece en la home y en `/lanzamientos/:slug`.

| Campo | Descripción |
|-------|-------------|
| Título | Nombre del lanzamiento |
| Slug | URL auto-generada desde el título |
| Marca / Marca slug | Nombre y slug de la marca (ej: `adidas`) |
| Modelo slug | Slug del modelo (ej: `f50`, `mercurial`) |
| Fecha | Texto para mostrar (ej: `23 ABR 2026`) |
| Destacado | Si aparece en el carrusel principal de la home |
| Contenido | Array de párrafos del artículo |
| Imagen principal | Foto hero del lanzamiento |
| Galería | Fotos adicionales |
| Detalles técnicos | Suela, terreno, peso, colorways |

### Producto (Stock)

Cada variante de producto disponible para la venta en `/marcas/:marca/:modelo`.

| Campo | Descripción |
|-------|-------------|
| Modelo | Nombre del modelo (ej: `F50 Tunit Archive`) |
| Marca slug | Slug de la marca (ej: `adidas`) |
| Modelo slug | Slug del modelo (ej: `f50`) |
| Colorway | Descripción del colorway |
| Precio | Precio en ARS |
| Imagen | Foto del producto |
| Talles disponibles | Array de objetos `{us, uk, eu, cm}` |

---

## Cómo funciona la integración

El sitio web carga los datos en dos etapas:

1. **Datos locales** (`src/articles-data.jsx`): se usan inmediatamente, sin esperar red.
2. **Datos de Sanity** (`src/sanity-client.jsx`): se cargan en paralelo vía HTTP. Cuando llegan, reemplazan los datos locales y el sitio se re-renderiza.

Si Sanity no está configurado (Project ID sin cambiar), el sitio funciona normalmente con los datos locales.
