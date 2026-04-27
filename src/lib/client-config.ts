// 20 fuentes de Google Fonts organizadas por estilo
export const FONT_OPTIONS = [
  // Sans-serif modernas
  { value: 'inter',        label: 'Inter',
    category: 'Moderna', preview: 'The quick brown fox' },
  { value: 'outfit',       label: 'Outfit',
    category: 'Moderna', preview: 'The quick brown fox' },
  { value: 'plus-jakarta-sans', label: 'Plus Jakarta Sans',
    category: 'Moderna', preview: 'The quick brown fox' },
  { value: 'dm-sans',      label: 'DM Sans',
    category: 'Moderna', preview: 'The quick brown fox' },
  { value: 'manrope',      label: 'Manrope',
    category: 'Moderna', preview: 'The quick brown fox' },
  // Serif elegantes
  { value: 'playfair-display', label: 'Playfair Display',
    category: 'Elegante', preview: 'The quick brown fox' },
  { value: 'cormorant',    label: 'Cormorant',
    category: 'Elegante', preview: 'The quick brown fox' },
  { value: 'libre-baskerville', label: 'Libre Baskerville',
    category: 'Elegante', preview: 'The quick brown fox' },
  { value: 'eb-garamond',  label: 'EB Garamond',
    category: 'Elegante', preview: 'The quick brown fox' },
  { value: 'lora',         label: 'Lora',
    category: 'Elegante', preview: 'The quick brown fox' },
  // Amigables / redondeadas
  { value: 'poppins',      label: 'Poppins',
    category: 'Amigable', preview: 'The quick brown fox' },
  { value: 'nunito',       label: 'Nunito',
    category: 'Amigable', preview: 'The quick brown fox' },
  { value: 'quicksand',    label: 'Quicksand',
    category: 'Amigable', preview: 'The quick brown fox' },
  { value: 'fredoka',      label: 'Fredoka',
    category: 'Amigable', preview: 'The quick brown fox' },
  // Display / impacto
  { value: 'montserrat',   label: 'Montserrat',
    category: 'Display', preview: 'The quick brown fox' },
  { value: 'raleway',      label: 'Raleway',
    category: 'Display', preview: 'The quick brown fox' },
  { value: 'josefin-sans', label: 'Josefin Sans',
    category: 'Display', preview: 'The quick brown fox' },
  { value: 'space-grotesk', label: 'Space Grotesk',
    category: 'Display', preview: 'The quick brown fox' },
  // Monospace
  { value: 'jetbrains-mono', label: 'JetBrains Mono',
    category: 'Técnica', preview: 'The quick brown fox' },
  { value: 'space-mono',   label: 'Space Mono',
    category: 'Técnica', preview: 'The quick brown fox' },
] as const

// Tamaños base de fuente
export const FONT_SIZE_OPTIONS = [
  { value: '14px', label: 'Pequeño (14px)' },
  { value: '16px', label: 'Normal (16px)' },
  { value: '18px', label: 'Grande (18px)' },
  { value: '20px', label: 'Muy grande (20px)' },
] as const

// Espaciado de letras
export const LETTER_SPACING_OPTIONS = [
  { value: '-0.02em', label: 'Compacto' },
  { value: 'normal',  label: 'Normal' },
  { value: '0.05em',  label: 'Amplio' },
  { value: '0.1em',   label: 'Muy amplio' },
  { value: '0.15em',  label: 'Ultra amplio' },
] as const

// Altura de línea
export const LINE_HEIGHT_OPTIONS = [
  { value: '1.3', label: 'Compacto (1.3)' },
  { value: '1.5', label: 'Normal (1.5)' },
  { value: '1.6', label: 'Cómodo (1.6)' },
  { value: '1.8', label: 'Aireado (1.8)' },
  { value: '2.0', label: 'Muy aireado (2.0)' },
] as const

// Radio de bordes
export const BORDER_RADIUS_OPTIONS = [
  { value: '0px',   label: 'Sin redondeo',  preview: '□' },
  { value: '4px',   label: 'Muy sutil',     preview: '▢' },
  { value: '8px',   label: 'Sutil',         preview: '▣' },
  { value: '12px',  label: 'Suave',         preview: '⬜' },
  { value: '16px',  label: 'Redondeado',    preview: '🔲' },
  { value: '24px',  label: 'Muy redondeado',preview: '⭕' },
  { value: '999px', label: 'Píldora',       preview: '💊' },
] as const

// Peso de los títulos
export const FONT_WEIGHT_OPTIONS = [
  { value: 300, label: 'Light (300)' },
  { value: 400, label: 'Regular (400)' },
  { value: 500, label: 'Medium (500)' },
  { value: 600, label: 'Semibold (600)' },
  { value: 700, label: 'Bold (700)' },
  { value: 800, label: 'Extrabold (800)' },
  { value: 900, label: 'Black (900)' },
] as const

// Provincias del Ecuador
export const ECUADOR_PROVINCES = [
  'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo',
  'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas',
  'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona Santiago',
  'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
  'Santo Domingo de los Tsáchilas', 'Sucumbíos',
  'Tungurahua', 'Zamora Chinchipe',
] as const

// Símbolo de moneda
export const CURRENCY_OPTIONS = [
  { value: '$',   label: 'Dólar ($)' },
  { value: '€',   label: 'Euro (€)' },
  { value: '£',   label: 'Libra (£)' },
  { value: 'S/.',  label: 'Sol (S/.)' },
  { value: 'COP', label: 'Peso colombiano (COP)' },
  { value: 'MXN', label: 'Peso mexicano (MXN)' },
] as const

// Paletas de color predefinidas
export const COLOR_PRESETS = [
  {
    name: 'Océano',
    primary: '#0A7B9E', secondary: '#34D399',
    background: '#F0F9FF', text: '#0C4A6E',
    accent: '#06B6D4',
  },
  {
    name: 'Rosas',
    primary: '#DB2777', secondary: '#F472B6',
    background: '#FFF1F2', text: '#881337',
    accent: '#EC4899',
  },
  {
    name: 'Bosque',
    primary: '#166534', secondary: '#4ADE80',
    background: '#F0FDF4', text: '#14532D',
    accent: '#22C55E',
  },
  {
    name: 'Atardecer',
    primary: '#D97706', secondary: '#FCD34D',
    background: '#FFFBEB', text: '#78350F',
    accent: '#F59E0B',
  },
  {
    name: 'Noche',
    primary: '#7C3AED', secondary: '#A78BFA',
    background: '#0F0F1A', text: '#E2E8F0',
    accent: '#8B5CF6',
  },
  {
    name: 'Coral',
    primary: '#DC2626', secondary: '#FB7185',
    background: '#FFF5F5', text: '#7F1D1D',
    accent: '#F43F5E',
  },
  {
    name: 'Minimal',
    primary: '#1A1A2E', secondary: '#6B7280',
    background: '#FFFFFF', text: '#111827',
    accent: '#374151',
  },
  {
    name: 'Arena',
    primary: '#92400E', secondary: '#D97706',
    background: '#FFFBEB', text: '#451A03',
    accent: '#B45309',
  },
] as const
