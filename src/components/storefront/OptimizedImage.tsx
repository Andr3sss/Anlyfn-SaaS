'use client'

import Image from 'next/image'

type OptimizedImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false
}: OptimizedImageProps) {
  // Configuración de tamaños responsivos basada en el ancho proporcionado
  let sizes = '100vw'
  if (width) {
    if (width <= 400) {
      sizes = '(max-width: 640px) 100vw, 400px'
    } else if (width <= 800) {
      sizes = '(max-width: 768px) 100vw, 800px'
    } else {
      sizes = '(max-width: 1024px) 100vw, 1200px'
    }
  }

  // Placeholder blur solo es posible estáticamente, o requiriendo configuración adicional para blurDataURL remoto.
  // Como estamos subiendo a Supabase, no tenemos el blurDataURL por defecto. Lo dejaremos empty para evitar errores.
  
  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      quality={85}
      sizes={sizes}
      className={className}
      // placeholder="blur" requiere blurDataURL para imágenes remotas, 
      // si en el futuro se implementa un generador de blurhash, se puede añadir aquí
    />
  )
}
