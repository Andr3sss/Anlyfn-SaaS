export const MODULE_CONFIG = {
  announcement_bar: {
    key: 'announcement_bar',
    name: 'Anuncios',
    color: '#0A7B9E',
    bg: 'rgba(10,123,158,0.12)'
  },
  navigation_menu: {
    key: 'navigation_menu',
    name: 'Menú',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.12)'
  },
  hero_section: {
    key: 'hero_section',
    name: 'Hero',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)'
  },
  product_catalog: {
    key: 'product_catalog',
    name: 'Catálogo',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.12)'
  },
  whatsapp_button: {
    key: 'whatsapp_button',
    name: 'WhatsApp',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)'
  },
  contact_form: {
    key: 'contact_form',
    name: 'Contacto',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)'
  },
  gallery: {
    key: 'gallery',
    name: 'Galería',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.12)'
  },
  about_section: {
    key: 'about_section',
    name: 'Nosotros',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)'
  },
  reviews_section: {
    key: 'reviews_section',
    name: 'Reseñas',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)'
  },
  paypal_button: {
    key: 'paypal_button',
    name: 'PayPal',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.12)'
  },
  footer: {
    key: 'footer',
    name: 'Footer',
    color: '#6B7280',
    bg: 'rgba(107,114,128,0.12)'
  }
} as const

export type ModuleKey = keyof typeof MODULE_CONFIG

export const MODULE_KEYS = Object.keys(MODULE_CONFIG) as ModuleKey[]

// Calcula cuántos módulos están activos dado un objeto Module
export function countActiveModules(
  modules: Record<string, unknown> | null
): number {
  if (!modules) return 0
  return MODULE_KEYS.filter(k => modules[k] === true).length
}

// Separa módulos activos e inactivos para renderizado
export function splitModules(
  modules: Record<string, unknown> | null
): { active: ModuleKey[]; inactive: ModuleKey[] } {
  if (!modules) return { active: [], inactive: MODULE_KEYS }
  const active = MODULE_KEYS.filter(k => modules[k] === true)
  const inactive = MODULE_KEYS.filter(k => modules[k] !== true)
  return { active, inactive }
}
