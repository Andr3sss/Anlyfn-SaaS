import { createClient } from '@/lib/supabase/client'
import imageCompression from 'browser-image-compression'

/**
 * Comprime una imagen en el cliente (convirtiendo a WebP, reduciendo dimensiones y peso)
 * y la sube directamente a Supabase Storage.
 * 
 * @param file Archivo original seleccionado por el usuario
 * @param bucketName Nombre del bucket en Supabase (ej: 'client-assets')
 * @param folderPath Carpeta dentro del bucket (ej: 'logos' o 'covers')
 * @returns La URL pública de la imagen optimizada
 */
export async function uploadImage(file: File, bucketName: string = 'client-assets', folderPath: string = 'logos'): Promise<string> {
  // Opciones de compresión equivalentes a lo que hacía la Edge Function
  const options = {
    maxSizeMB: 1,               // Máximo 1MB
    maxWidthOrHeight: 1200,     // Redimensionar a max 1200px
    useWebWorker: true,         // Usar un worker para no bloquear la UI principal
    fileType: 'image/webp' as const, // Convertir siempre a WebP para máxima eficiencia
    initialQuality: 0.82        // Calidad inicial 82%
  }

  try {
    // 1. Comprimir imagen localmente en el navegador
    const compressedFile = await imageCompression(file, options)
    
    // 2. Preparar Supabase
    const supabase = createClient()
    
    // Generar un nombre único para el archivo
    const randomId = Math.random().toString(36).substring(2, 9)
    const filename = `${folderPath}/${Date.now()}-${randomId}.webp`
    
    // 3. Subir la imagen comprimida a Supabase
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filename, compressedFile, {
        contentType: 'image/webp',
        upsert: true
      })

    if (error) {
      throw error
    }

    // 4. Obtener la URL pública
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filename)

    return urlData.publicUrl

  } catch (error) {
    console.error('Error optimizando o subiendo la imagen:', error)
    throw error
  }
}
