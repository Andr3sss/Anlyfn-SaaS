export interface Client {
  id: string
  name: string
  subdomain: string
  slug: string
  logo_url: string | null
  favicon_url: string | null
  primary_color: string
  secondary_color: string
  color_background: string
  color_text: string
  color_text_muted: string
  color_border: string
  color_accent: string
  color_success: string
  color_warning: string
  color_error: string
  font: string
  font_heading: string
  font_size_base: string
  font_weight_heading: number
  letter_spacing: string
  line_height: string
  border_radius: string
  button_style: 'square' | 'rounded' | 'pill'
  shadow_style: 'none' | 'soft' | 'medium' | 'strong'
  tagline: string | null
  whatsapp: string | null
  phone: string | null
  email: string | null
  address: string | null
  province: string
  country: string
  social_instagram: string | null
  social_facebook: string | null
  social_tiktok: string | null
  social_youtube: string | null
  social_twitter: string | null
  social_website: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  currency_symbol: string
  language: string
  custom_domain: string | null
  maintenance_message: string
  active: boolean
  created_at: string
}

export interface Module {
  id: string
  client_id: string
  announcement_bar: boolean
  navigation_menu: boolean
  hero_section: boolean
  product_catalog: boolean
  whatsapp_button: boolean
  contact_form: boolean
  gallery: boolean
  about_section: boolean
  reviews_section: boolean
  paypal_button: boolean
  footer: boolean
}

export interface Product {
  id: string
  client_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  available: boolean
  created_at: string
  badge: string | null
  original_price: number | null
  order_index: number
}

export interface MenuItem {
  id: string
  client_id: string
  label: string
  url: string
  order: number
  open_in_new_tab: boolean
  icon: string
  is_highlighted: boolean
  section_id: string
}

// Tipo extendido para clientes con módulos incluidos
export interface ClientWithModules extends Client {
  modules: Module | null
}

// Tipo para métricas del dashboard
export interface DashboardMetrics {
  totalClients: number
  activeSites: number
  totalProducts: number
  totalModules: number
}

