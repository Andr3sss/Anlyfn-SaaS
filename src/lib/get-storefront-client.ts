import { unstable_cache } from 'next/cache'
import { createServerClient } from '@supabase/ssr'
import type { Client } from '@/types/database'

function createAnonClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function getStorefrontClient(subdomain: string): Promise<Client | null> {
  return unstable_cache(
    async () => {
      const supabase = createAnonClient()
      const { data } = await supabase
        .from('clients')
        .select(`
          id, name, subdomain, slug, active, logo_url,
          primary_color, secondary_color, color_background,
          color_text, color_text_muted, color_border,
          color_accent, color_success, color_warning, color_error,
          font, font_heading, font_size_base, font_weight_heading,
          letter_spacing, line_height, border_radius,
          button_style, shadow_style,
          tagline, whatsapp, email, phone, address, province, country,
          social_instagram, social_facebook, social_tiktok,
          social_youtube, social_twitter, social_website,
          seo_title, seo_description, seo_keywords,
          currency_symbol, language, maintenance_message,
          favicon_url, custom_domain, created_at
        `)
        .eq('subdomain', subdomain)
        .single()
      return data ?? null
    },
    [`storefront-client-${subdomain}`],
    { tags: [`storefront-${subdomain}`] }
  )()
}
