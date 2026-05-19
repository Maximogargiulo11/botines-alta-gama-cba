---
name: auto-github-push
description: Usar en CADA tarea donde el usuario pida hacer cambios al código — fix, feature, estilo, contenido, cualquier modificación. Al terminar la tarea, commitear los archivos cambiados y pushear a GitHub automáticamente. No esperar a que el usuario lo pida. Activar siempre que el mensaje implique modificar archivos del proyecto.
---

# Auto GitHub Push

Después de completar cualquier tarea de desarrollo, commitear y pushear a GitHub sin que el usuario tenga que pedirlo.

## Flujo obligatorio

### 1. Completar la tarea
Hacer todos los cambios de código que se pidieron.

### 2. Verificar que hay cambios
```bash
git status
```
Si no hay archivos modificados, no commitear. Informar al usuario y terminar.

### 3. Stagear solo los archivos modificados en esta tarea
Nunca usar `git add -A` ni `git add .`. Agregar únicamente los archivos que se tocaron:
```bash
git add src/home.jsx src/article.jsx
```

**No commitear nunca:**
- `server/data/*.json` → datos locales, no van al repo
- `server/node_modules/`
- `.env` o archivos con credenciales

### 4. Escribir el mensaje de commit en español
Formato: `<Verbo>: <qué cambió y para qué>`

Ejemplos del proyecto:
- `Fix: hero portrait con fondo desenfocado en carrusel home y detalle artículo`
- `Fix: imágenes adaptadas al contenedor en todos los componentes`
- `Agregar panel de administración con backend local`
- `Actualizar estilos del carrusel para mobile`

Siempre terminar con:
```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### 5. Commitear y pushear
```bash
git commit -m "$(cat <<'EOF'
Mensaje descriptivo en español

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
git push origin main
```

### 6. Confirmar al usuario
Reportar el hash del commit. Ejemplo:
> Cambios pusheados a `main` (commit `abc1234`).

## Reglas clave

- **No preguntar** "¿lo pusheo?" — hacerlo directamente después de terminar
- **No pushear** si `git status` no muestra cambios
- **No pushear** `server/data/` ni archivos locales de datos
- **Un solo push** por tarea, al final, cuando todo esté listo
