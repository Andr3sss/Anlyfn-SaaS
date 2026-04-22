export interface Client {
  id: string
  name: string
  subdomain: string
  slug: string
  logo_url: string | null
  primary_color: string
  secondary_color: string
  font: string
  whatsapp: string | null
  custom_domain: string | null
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

