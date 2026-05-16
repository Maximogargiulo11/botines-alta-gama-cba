# Google Sheets — Guía de configuración

Gestionar lanzamientos y stock sin tocar código.

---

## 1. Crear la hoja de cálculo

1. Andá a [sheets.new](https://sheets.new) para crear una hoja nueva.
2. Renombrá la hoja principal como **lanzamientos** (clic derecho en la pestaña → Cambiar nombre).
3. Agregá una segunda pestaña y nombrala **stock**.
4. Copiá los encabezados de la sección de abajo en la fila 1 de cada pestaña.

---

## 2. Compartir la hoja

La hoja debe ser **pública de solo lectura** para que el sitio pueda leerla.

1. Clic en **Compartir** (botón verde arriba a la derecha).
2. En "Acceso general", seleccioná **Cualquier persona con el enlace**.
3. Asegurate de que el rol sea **Lector** (no Editor).
4. Copiá el **ID de la hoja** de la URL:
   ```
   docs.google.com/spreadsheets/d/  →  ESTE_ES_TU_ID  ← /edit
   ```

---

## 3. Conectar al sitio

Abrí el archivo **`src/sheets-client.jsx`** y reemplazá la línea:

```js
const SHEET_ID = 'YOUR_SPREADSHEET_ID';
```

con tu ID real:

```js
const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';  // ejemplo
```

Guardá y el sitio ya leerá los datos de tu hoja.

---

## 4. Estructura de columnas

### Pestaña: `lanzamientos`

Copiá estos encabezados exactamente en la fila 1:

```
slug | titulo | marca | marcaSlug | modeloSlug | fecha | fechaISO | categoria | descripcionCorta | imagen | destacado | contenido | galeria | suela | terreno | peso | colorways | coleccion
```

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| `slug` | URL del artículo (sin espacios) | `f50-tunit-archive` |
| `titulo` | Título completo | `F50 Tunit Archive: el regreso modular` |
| `marca` | Nombre de la marca (para mostrar) | `adidas` |
| `marcaSlug` | Slug de la marca | `adidas` · `nike` · `puma` · `new-balance` |
| `modeloSlug` | Slug del modelo | `f50` · `mercurial` · `phantom` · `predator` |
| `fecha` | Fecha legible | `23 ABR 2026` |
| `fechaISO` | Fecha ISO (para ordenar) | `2026-04-23` |
| `categoria` | Tipo de lanzamiento | `Lanzamiento` · `Signature` · `Pack` · `Colección` |
| `descripcionCorta` | Bajada del artículo (máx. 220 caracteres) | `adidas reedita el botín que...` |
| `imagen` | URL de la imagen principal | `https://i.imgur.com/abc.jpg` |
| `destacado` | ¿Aparece en el carrusel de la home? | `TRUE` o `FALSE` |
| `contenido` | Párrafos del artículo, **separados por `\|\|\|`** | `Primer párrafo.|||Segundo párrafo.` |
| `galeria` | URLs de imágenes adicionales, **separadas por `\|`** | `https://.../foto1.jpg\|https://.../foto2.jpg` |
| `suela` | Descripción de la suela | `Sprintframe con placa de carbono` |
| `terreno` | Tipo de terreno | `Firm Ground (FG)` |
| `peso` | Peso del botín | `195g (talle 8.5 US)` |
| `colorways` | Colorways disponibles, **separados por `\|`** | `Solar Yellow / Black\|Electric Blue / White` |
| `coleccion` | Nombre de la colección | `F50 Archive Collection · 14 Years Edition` |

---

### Pestaña: `stock`

Copiá estos encabezados en la fila 1:

```
id | modelo | marcaSlug | modeloSlug | colorway | precio | imagen | euTalles
```

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| `id` | ID único del producto | `f50-tunit-solar` |
| `modelo` | Nombre del modelo | `F50 Tunit Archive` |
| `marcaSlug` | Slug de la marca | `adidas` · `nike` · `puma` · `new-balance` |
| `modeloSlug` | Slug del modelo | `f50` · `predator` · `copa` · `mercurial` |
| `colorway` | Nombre del colorway | `Solar Yellow / Black` |
| `precio` | Precio en ARS (solo el número, sin $ ni puntos) | `529990` |
| `imagen` | URL de la imagen | `https://i.imgur.com/abc.jpg` |
| `euTalles` | Talles EU disponibles, **separados por coma** | `40,41,42,43,44` |

> **Talles EU válidos:** 39 · 39.5 · 40 · 40.5 · 41 · 42 · 42.5 · 43 · 44 · 44.5 · 45 · 45.5 · 46 · 46.5 · 47

---

## 5. Cómo subir imágenes

El sitio acepta cualquier URL de imagen pública. Opciones gratuitas:

- **Google Drive**: subí la imagen, compartila como "Cualquiera con el enlace" y usá la URL directa.
- **Imgur**: subí la imagen en [imgur.com](https://imgur.com) y copiá la URL directa (termina en `.jpg` o `.png`).
- **GitHub**: subí la imagen al repositorio en la carpeta `assets/` y usá la URL raw (`raw.githubusercontent.com/...`).

---

## 6. Notas importantes

- **No borres la fila 1** (encabezados). El sistema la necesita para mapear las columnas.
- Los datos se cargan cada vez que un usuario abre el sitio. No hay caché.
- Si dejás `SHEET_ID = 'YOUR_SPREADSHEET_ID'` sin cambiar, el sitio sigue usando los datos de `src/articles-data.jsx` como fallback.
- Los `slug` de lanzamientos deben coincidir con los slugs en `marcaSlug`/`modeloSlug` para que los links de "Ver en catálogo" funcionen correctamente.

---

## Referencia rápida: slugs válidos

| Marca | `marcaSlug` | `modeloSlug` disponibles |
|-------|-------------|--------------------------|
| adidas | `adidas` | `f50` · `predator` · `copa` |
| Nike | `nike` | `mercurial` · `phantom` · `tiempo` |
| Puma | `puma` | `future` · `ultra` |
| New Balance | `new-balance` | `furon` · `tekela` |
