import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json(
      { error: 'No autorizado' }, { status: 401 }
    )
  }

  const body = await request.json()

  // Validaciones server-side
  if (!body.name?.trim()) {
    return NextResponse.json(
      { error: 'El nombre del negocio es obligatorio' },
      { status: 400 }
    )
  }
  if (!body.subdomain?.trim()) {
    return NextResponse.json(
      { error: 'El subdominio es obligatorio' },
      { status: 400 }
    )
  }
  const subdomainRegex = /^[a-z0-9-]+$/
  if (!subdomainRegex.test(body.subdomain)) {
    return NextResponse.json(
      { error: 'El subdominio solo puede tener letras minúsculas, números y guiones' },
      { status: 400 }
    )
  }

  // Verificar subdominio único
  const { data: existing } = await supabase
    .from('clients')
    .select('id')
    .eq('subdomain', body.subdomain)
    .single()

  if (existing) {
    return NextResponse.json(
      { error: 'Ese subdominio ya está en uso' },
      { status: 409 }
    )
  }

  // Generar slug desde el nombre
  const slug = body.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  const { data: client, error } = await supabase
    .from('clients')
    .insert({
      name:               body.name.trim(),
      subdomain:          body.subdomain.trim(),
      slug,
      tagline:            body.tagline ?? null,
      logo_url:           body.logo_url ?? null,
      favicon_url:        body.favicon_url ?? null,
      primary_color:      body.primary_color ?? '#1A1A2E',
      secondary_color:    body.secondary_color ?? '#F472B6',
      color_background:   body.color_background ?? '#FFFFFF',
      color_text:         body.color_text ?? '#1A1A1A',
      color_text_muted:   body.color_text_muted ?? '#6B7280',
      color_border:       body.color_border ?? '#E5E7EB',
      color_accent:       body.color_accent ?? '#F472B6',
      color_success:      body.color_success ?? '#10B981',
      color_warning:      body.color_warning ?? '#F59E0B',
      color_error:        body.color_error ?? '#EF4444',
      font:               body.font ?? 'inter',
      font_heading:       body.font_heading ?? 'inter',
      font_size_base:     body.font_size_base ?? '16px',
      font_weight_heading:body.font_weight_heading ?? 700,
      letter_spacing:     body.letter_spacing ?? 'normal',
      line_height:        body.line_height ?? '1.6',
      border_radius:      body.border_radius ?? '12px',
      button_style:       body.button_style ?? 'rounded',
      shadow_style:       body.shadow_style ?? 'soft',
      whatsapp:           body.whatsapp ?? null,
      phone:              body.phone ?? null,
      email:              body.email ?? null,
      address:            body.address ?? null,
      province:           body.province ?? 'Pichincha',
      country:            'Ecuador',
      social_instagram:   body.social_instagram ?? null,
      social_facebook:    body.social_facebook ?? null,
      social_tiktok:      body.social_tiktok ?? null,
      social_youtube:     body.social_youtube ?? null,
      social_twitter:     body.social_twitter ?? null,
      social_website:     body.social_website ?? null,
      seo_title:          body.seo_title ?? null,
      seo_description:    body.seo_description ?? null,
      seo_keywords:       body.seo_keywords ?? null,
      currency_symbol:    body.currency_symbol ?? '$',
      language:           'es',
      custom_domain:      body.custom_domain ?? null,
      maintenance_message:body.maintenance_message
        ?? '¡Volvemos muy pronto!',
      active: true,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Error al crear el cliente' }, { status: 500 }
    )
  }

  return NextResponse.json({ id: client.id }, { status: 201 })
}
