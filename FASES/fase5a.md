════════════════════════════════════════════════════════════════
ANLYFN STUDIO — FASE 5A: EDGE FUNCTION DE OPTIMIZACIÓN
════════════════════════════════════════════════════════════════

CONTEXTO
────────
El proyecto usa Supabase Storage para guardar logos y fotos
de productos. Actualmente las imágenes se suben tal cual
desde el navegador, sin procesamiento.

Un cliente que sube fotos de productos desde celular genera
imágenes de 4-6MB cada una. Con 15 productos el storefront
pesa 60MB y carga en 8 segundos en móvil. Esto destruye
la experiencia del usuario final.

SOLUCIÓN
────────
Crear una Supabase Edge Function que procese todas las
imágenes antes de guardarlas. La función las convierte a
WebP, las redimensiona a máximo 1200px manteniendo
proporción, y las comprime a calidad 82. Una foto de 4MB
se convierte en 180KB sin pérdida visual perceptible.

OBJETIVO DE ESTA FASE
─────────────────────
Construir y desplegar la Edge Function `optimize-image`.
Validar que funciona correctamente procesando imágenes
reales. NO modificar los formularios del admin todavía.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 1 — ENTENDER SUPABASE EDGE FUNCTIONS
════════════════════════════════════════════════════════════════

Las Edge Functions de Supabase son código TypeScript que
se ejecuta en Deno (no Node.js) en el edge de Supabase.
Se despliegan usando el CLI de Supabase.

Antes de continuar, leer la documentación oficial:
https://supabase.com/docs/guides/functions

Puntos clave que debes entender antes de escribir código:
- Usan Deno, no Node.js
- sharp está disponible como NPM:sharp sin instalación
- Se despliegan con: supabase functions deploy
- Requieren autenticación si no son públicas
- Tienen límite de 10MB de request body
- Timeout de 150 segundos

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 2 — INSTALAR SUPABASE CLI
════════════════════════════════════════════════════════════════

Si no tienes el CLI de Supabase instalado:
npm install -g supabase

Verificar instalación:
supabase --version

Iniciar sesión:
supabase login

Esto abre el navegador para autenticarte con tu cuenta
de Supabase. Después del login el CLI queda conectado
a tu proyecto.

Vincular el CLI al proyecto Anlyfn Studio:
supabase link --project-ref ieqvgehhzslbefpimvqz

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 3 — CREAR LA EDGE FUNCTION
════════════════════════════════════════════════════════════════

Crear la función con el CLI:
supabase functions new optimize-image

Esto crea la carpeta supabase/functions/optimize-image/
con un archivo index.ts de ejemplo.

Reemplazar completamente el contenido de ese index.ts
con la siguiente lógica:

LÓGICA DE LA FUNCIÓN:

1. Recibir un POST request con la imagen como FormData
   en el campo "file".

2. Validar que el archivo existe y es una imagen
   (image/jpeg, image/png, image/webp).
   Si no es válido, devolver 400.

3. Validar que el tamaño no excede 10MB.
   Si excede, devolver 413.

4. Importar sharp desde npm:sharp.

5. Procesar la imagen:
   - Convertir a WebP
   - Redimensionar: si el lado más largo > 1200px,
     reducir manteniendo aspect ratio. Si es menor,
     dejar el tamaño original.
   - Aplicar calidad 82

6. El resultado es un Buffer con la imagen optimizada.

7. Generar un nombre de archivo único:
   `${Date.now()}-${crypto.randomUUID()}.webp`

8. Subir el Buffer optimizado a Supabase Storage
   bucket client-assets con ese nombre.

9. Obtener la URL pública del archivo subido.

10. Devolver JSON:
    { success: true, url: "...", originalSize: X,
      optimizedSize: Y, format: "webp" }

MANEJO DE ERRORES:

Si sharp falla al procesar: devolver 422 con mensaje
"No se pudo procesar la imagen".

Si falla la subida a Storage: devolver 500 con mensaje
"Error al guardar la imagen".

HEADERS DE RESPONSE:

Siempre incluir:
Content-Type: application/json
Access-Control-Allow-Origin: * (para desarrollo local)

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 4 — DESPLEGAR LA FUNCIÓN
════════════════════════════════════════════════════════════════

Desplegar a Supabase:
supabase functions deploy optimize-image

Esto sube el código a Supabase y lo hace disponible en:
https://ieqvgehhzslbefpimvqz.supabase.co/functions/v1/optimize-image

Verificar el deploy:
supabase functions list

Debe aparecer optimize-image con status "ACTIVE".

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 5 — VERIFICACIÓN MANUAL
════════════════════════════════════════════════════════════════

Antes de conectar la función al frontend, verificar
que funciona correctamente de forma aislada.

PRUEBA 1 — Con curl:
Descargar una imagen de prueba de 4MB en formato JPG.
Guardarla como test.jpg en tu escritorio.

Ejecutar:
curl -X POST \
  https://ieqvgehhzslbefpimvqz.supabase.co/functions/v1/optimize-image \
  -H "Authorization: Bearer SUPABASE_ANON_KEY_AQUI" \
  -F "file=@test.jpg"

Reemplazar SUPABASE_ANON_KEY_AQUI con tu anon key real.

RESULTADO ESPERADO:
{
  "success": true,
  "url": "https://...client-assets/...webp",
  "originalSize": 4200000,
  "optimizedSize": 185000,
  "format": "webp"
}

PRUEBA 2 — Verificar en Storage:
Ir a Supabase Dashboard → Storage → client-assets
Buscar el archivo que acaba de subirse.
Descargarlo y verificar:
- Formato: WebP
- Tamaño: menor a 250KB
- Dimensiones: máximo 1200px en el lado más largo
- Calidad visual: sin pérdidas perceptibles

PRUEBA 3 — Subir imagen pequeña:
Crear una imagen de 800x600 píxeles.
Subirla con curl igual que antes.
Verificar que NO se redimensionó (quedó 800x600)
porque era menor a 1200px.

PRUEBA 4 — Subir imagen muy grande:
Crear una imagen de 4000x3000 píxeles.
Subirla con curl.
Verificar que se redimensionó a 1200x900
(mantuvo proporción 4:3).

Si las 4 pruebas pasan, la función está lista.

════════════════════════════════════════════════════════════════
INSTRUCCIÓN 6 — CREAR HELPER EN EL FRONTEND
════════════════════════════════════════════════════════════════

Crear src/lib/upload-image.ts

Este archivo exporta una función que el frontend
usará para subir imágenes a través de la Edge Function.

La función debe:
- Recibir un File objeto del navegador
- Validar tipo (solo image/jpeg, image/png, image/webp)
- Validar tamaño (máximo 10MB)
- Si falla validación, lanzar Error con mensaje claro
- Crear FormData con el archivo
- Hacer POST a la Edge Function con el anon key
- Si response.ok, devolver la URL
- Si falla, lanzar Error con el mensaje del servidor

Esta función se usará en la Fase 5B para reemplazar
la subida directa a Storage en los formularios.

════════════════════════════════════════════════════════════════
VERIFICACIÓN FINAL — TODAS DEBEN PASAR
════════════════════════════════════════════════════════════════

1. supabase functions list muestra optimize-image ACTIVE ✓

2. curl con imagen de 4MB devuelve JSON con success: true ✓

3. La URL devuelta apunta a un archivo WebP real en Storage ✓

4. El tamaño del archivo optimizado es < 250KB ✓

5. La imagen optimizada tiene máximo 1200px de ancho/alto ✓

6. La calidad visual es buena (sin artefactos visibles) ✓

7. src/lib/upload-image.ts existe y exporta la función ✓

Si todo pasa:
git add .
git commit -m "fase-5a: edge function optimizacion imagenes"
git push origin main

════════════════════════════════════════════════════════════════
LO QUE NO DEBE HACER EN ESTA FASE
════════════════════════════════════════════════════════════════

No modificar NewClientForm ni EditClientForm todavía.
No tocar el componente Image de Next.js todavía.
No cambiar la lógica de subida directa a Storage.
Eso es la Fase 5B.

Esta fase solo construye y verifica la Edge Function.

════════════════════════════════════════════════════════════════