import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Determinar el dominio base según el entorno
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'localhost:3000'

  // Detectar si hay un subdominio real
  // Ejemplos válidos: monferec.localhost:3000, tienda.anlyfn.com
  // Excluir: localhost:3000 (sin subdominio), www.anlyfn.com
  const isSubdomain =
    hostname !== baseDomain &&
    hostname !== `www.${baseDomain}` &&
    hostname.endsWith(`.${baseDomain}`) &&
    !hostname.startsWith('www.')

  if (isSubdomain) {
    // Extraer solo el subdominio (antes del primer punto)
    const subdomain = hostname.split('.')[0]

    // Reescribir internamente a /storefront/[subdomain]
    // El visitante sigue viendo su subdominio en la barra
    url.pathname = `/storefront/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Refrescar la sesión de Supabase en cada request
  const response = await updateSession(request)

  // Proteger rutas /admin/*
  if (url.pathname.startsWith('/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

    // Leer el token de sesión desde las cookies del request
    const cookieName = `sb-${supabaseUrl
      .replace('https://', '')
      .split('.')[0]}-auth-token`

    const hasSession =
      request.cookies.has(cookieName) ||
      request.cookies.has('sb-access-token') ||
      request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

    if (!hasSession) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', url.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    // Aplicar a todas las rutas excepto archivos estáticos
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
}
