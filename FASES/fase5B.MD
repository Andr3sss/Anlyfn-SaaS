════════════════════════════════════════════════════════════════
ANLYFN STUDIO — FASE 5B: INTEGRAR COMPRESIÓN Y OPTIMIZAR STOREFRONT
════════════════════════════════════════════════════════════════

CONTEXTO
────────
La Fase 5A implementó compresión de imágenes en el frontend
usando browser-image-compression. La función uploadImage
en src/lib/upload-image.ts comprime las imágenes antes
de subirlas a Supabase Storage.

Actualmente los formularios NewClientForm y EditClientForm
suben imágenes directamente a Storage sin usar esa función.

El storefront no existe todavía, pero cuando se construya
en la Fase 6 necesitará que las imágenes se rendericen
optimizadas usando el componente Image de Next.js.

OBJETIVO DE ESTA FASE
─────────────────────
1. Reemplazar la subida directa en los formularios del admin
   por la función uploadImage que comprime antes de subir.
2. Crear un componente OptimizedImage reutilizable para
   el storefront que usa next/image correctamente.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 1 — MODIFICAR NewClientForm
════════════════════════════════════════════════════════════════

En src/components/admin/NewClientForm.tsx, localizar
la función que maneja la subida del logo.

Actualmente hace algo como:
- Recibe el archivo del input
- Crea FormData
- Sube directamente a Storage con supabase.storage.upload
- Guarda la URL pública en el estado

Reemplazar esa lógica por:

1. Importar uploadImage desde '@/lib/upload-image'
2. Al recibir el archivo, llamar:
   const url = await uploadImage(file, 'logos')
3. Guardar url directamente en el estado del formulario

La función uploadImage ya maneja:
- Validación de tipo y tamaño
- Compresión con browser-image-compression
- Conversión a WebP
- Subida a Storage
- Retorno de la URL pública

Si uploadImage lanza error, capturarlo y mostrar el
mensaje de error al usuario sin que el form se rompa.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 2 — MODIFICAR EditClientForm
════════════════════════════════════════════════════════════════

En src/components/admin/EditClientForm.tsx, aplicar
exactamente el mismo cambio que en NewClientForm.

Localizar la función de subida del logo.
Reemplazar la subida directa por uploadImage.
Manejar errores mostrando mensaje al usuario.

Verificar que si el cliente ya tiene logo_url, se
muestra el preview correctamente desde el inicio.
La compresión solo se aplica cuando el usuario
sube un logo NUEVO o lo reemplaza.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 3 — COMPONENTE OptimizedImage
════════════════════════════════════════════════════════════════

Crear src/components/storefront/OptimizedImage.tsx

Este componente envuelve next/image con configuración
optimizada para el storefront. Se usará en la Fase 6
para renderizar logos, fotos de productos, y cualquier
otra imagen del cliente.

El componente debe:

- Recibir props: src, alt, width, height, priority
  (opcional), className (opcional)
- Usar el componente Image de next/image internamente
- Aplicar sizes responsivos automáticos según el ancho
- Si priority=true, marcar la imagen como priority
- Si priority=false o undefined, usar loading="lazy"
- Aplicar quality=85 para todas las imágenes
- Incluir placeholder="blur" cuando sea posible

SIZES AUTOMÁTICOS:
Si width <= 400px: sizes="(max-width: 640px) 100vw, 400px"
Si width <= 800px: sizes="(max-width: 768px) 100vw, 800px"
Si width > 800px: sizes="(max-width: 1024px) 100vw, 1200px"

Esto hace que el navegador descargue la imagen del
tamaño correcto según el dispositivo del usuario.

El componente debe ser Client Component ('use client')
porque Image de Next.js puede requerir interactividad.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 4 — ACTUALIZAR next.config.ts
════════════════════════════════════════════════════════════════

En next.config.ts, verificar que la configuración
de imágenes está optimizada para producción.

Debe tener:

images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}

Esto permite que Next.js genere versiones optimizadas
de las imágenes en múltiples tamaños automáticamente.

Si ya existe configuración de images, mantener lo que
está y solo agregar formats si no existe.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 5 — VERIFICACIÓN FINAL
════════════════════════════════════════════════════════════════

PRUEBA 1 — Crear cliente con logo:
Ir a /admin/clients/new.
Subir un logo de 3MB en formato JPG.
Verificar que aparece un mensaje "Comprimiendo imagen..."
antes de subir.
Verificar que la subida completa en menos de 2 segundos.
Guardar el cliente.
Ir a Supabase Storage y verificar que el logo guardado:
- Está en formato WebP
- Pesa menos de 250KB
- Se ve bien visualmente

PRUEBA 2 — Editar cliente y cambiar logo:
Ir a /admin/clients/[id] de un cliente existente.
El logo actual debe aparecer en preview.
Subir un nuevo logo de 4MB.
Verificar que se comprime antes de subir.
Guardar cambios.
Verificar en Storage que el logo nuevo reemplazó al
anterior y está optimizado.

PRUEBA 3 — Validación de archivos:
Intentar subir un archivo PDF como logo.
Verificar que aparece error claro: "Solo se permiten
imágenes JPG, PNG o WebP".

PRUEBA 4 — Validación de tamaño:
Intentar subir una imagen de 12MB.
Verificar que aparece error: "La imagen no puede
superar 10MB".

PRUEBA 5 — OptimizedImage existe:
Verificar que src/components/storefront/OptimizedImage.tsx
existe y exporta el componente correctamente.
Importarlo en un archivo de prueba y verificar que
no hay errores de TypeScript.

PRUEBA 6 — Build sin errores:
npm run build
Verificar que completa sin errores.

Si todo pasa:
git add .
git commit -m "fase-5b: integracion compresion frontend + optimized image"
git push origin main

════════════════════════════════════════════════════════════════
LO QUE NO DEBE HACER EN ESTA FASE
════════════════════════════════════════════════════════════════

No construir el storefront todavía.
No modificar la tabla products.
No tocar los módulos del storefront.
Solo preparar los componentes que se usarán en Fase 6.

════════════════════════════════════════════════════════════════
DESPUÉS DE ESTA FASE
════════════════════════════════════════════════════════════════

La Fase 5 está completa cuando:
✓ Los formularios del admin comprimen antes de subir
✓ Las imágenes en Storage son WebP optimizadas
✓ El componente OptimizedImage está listo para usarse
✓ next.config.ts tiene configuración de imágenes correcta

