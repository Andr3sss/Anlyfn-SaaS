'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import {
  ArrowLeft, ChevronDown, ChevronRight,
  Upload, Check, AlertCircle, Loader2,
  Building2, Palette, Type, Globe,
  Share2, Search, Settings2, ImageIcon
} from 'lucide-react'
import {
  FONT_OPTIONS, FONT_SIZE_OPTIONS, LETTER_SPACING_OPTIONS,
  LINE_HEIGHT_OPTIONS, BORDER_RADIUS_OPTIONS,
  FONT_WEIGHT_OPTIONS, ECUADOR_PROVINCES,
  CURRENCY_OPTIONS, COLOR_PRESETS,
} from '@/lib/client-config'

type FormState = {
  name: string
  subdomain: string
  tagline: string
  logo_url: string
  favicon_url: string
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
  whatsapp: string
  phone: string
  email: string
  address: string
  province: string
  social_instagram: string
  social_facebook: string
  social_tiktok: string
  social_youtube: string
  social_twitter: string
  social_website: string
  seo_title: string
  seo_description: string
  seo_keywords: string
  currency_symbol: string
  maintenance_message: string
  active: boolean
  custom_domain: string
}

const DEFAULT_FORM_STATE: FormState = {
  name: '',
  subdomain: '',
  tagline: '',
  logo_url: '',
  favicon_url: '',
  primary_color: '#0A7B9E',
  secondary_color: '#34D399',
  color_background: '#F0F9FF',
  color_text: '#0C4A6E',
  color_text_muted: '#475569',
  color_border: '#E2E8F0',
  color_accent: '#06B6D4',
  color_success: '#10B981',
  color_warning: '#F59E0B',
  color_error: '#EF4444',
  font: 'inter',
  font_heading: 'inter',
  font_size_base: '16px',
  font_weight_heading: 700,
  letter_spacing: 'normal',
  line_height: '1.6',
  border_radius: '12px',
  button_style: 'rounded',
  shadow_style: 'soft',
  whatsapp: '',
  phone: '',
  email: '',
  address: '',
  province: 'Pichincha',
  social_instagram: '',
  social_facebook: '',
  social_tiktok: '',
  social_youtube: '',
  social_twitter: '',
  social_website: '',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  currency_symbol: '$',
  maintenance_message: '¡Volvemos muy pronto!',
  active: true,
  custom_domain: '',
}

export function NewClientForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormState>(DEFAULT_FORM_STATE)
  const [activeSection, setActiveSection] = useState<string>('identity')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof FormState, value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value }
      if (field === 'name' && !prev.subdomain) {
        next.subdomain = value.toLowerCase().replace(/[^a-z0-9]/g, '')
      }
      return next
    })
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    handleInputChange('subdomain', value)
    if (value && !/^[a-z0-9-]+$/.test(value)) {
      setErrors(prev => ({ ...prev, subdomain: 'Solo letras minúsculas, números y guiones' }))
    } else {
      setErrors(prev => {
        const next = { ...prev }
        delete next.subdomain
        return next
      })
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setErrors(prev => ({ ...prev, logo: 'Formato no soportado (solo PNG, JPG, WEBP)' }))
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'La imagen excede los 2MB permitidos' }))
      return
    }

    setErrors(prev => { const next = { ...prev }; delete next.logo; return next; })
    setUploadingLogo(true)
    
    // Preview inmediato (opcional, ya lo reemplazamos con URL publica enseguida)
    const objectUrl = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, logo_url: objectUrl }))

    try {
      const supabase = createSupabaseClient()
      const filename = `logos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const { data, error } = await supabase.storage
        .from('client-assets')
        .upload(filename, file, { upsert: true })

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('client-assets')
        .getPublicUrl(filename)

      setFormData(prev => ({ ...prev, logo_url: urlData.publicUrl }))
    } catch (error) {
      console.error('Error uploading logo:', error)
      setErrors(prev => ({ ...prev, logo: 'Error al subir la imagen' }))
      setFormData(prev => ({ ...prev, logo_url: '' })) // revert preview on error
    } finally {
      setUploadingLogo(false)
    }
  }

  const applyColorPreset = (preset: typeof COLOR_PRESETS[number]) => {
    setFormData(prev => ({
      ...prev,
      primary_color: preset.primary,
      secondary_color: preset.secondary,
      color_background: preset.background,
      color_text: preset.text,
      color_accent: preset.accent,
    }))
  }

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? '' : id)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.subdomain.trim()) newErrors.subdomain = 'El subdominio es obligatorio'
    else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) newErrors.subdomain = 'Formato inválido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setGlobalError(null)
    if (!validateForm()) {
      setGlobalError('Por favor revisa los campos en rojo')
      if (errors.subdomain) {
        setActiveSection('identity')
      }
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.status === 201) {
        setSuccess(true)
        setTimeout(() => {
          router.push(`/admin/clients/${data.id}`)
        }, 1500)
      } else if (res.status === 409) {
        setErrors(prev => ({ ...prev, subdomain: data.error }))
        setActiveSection('identity')
        setGlobalError(data.error)
        setLoading(false)
      } else {
        setGlobalError(data.error || 'Error desconocido')
        setLoading(false)
      }
    } catch (error) {
      setGlobalError('Error de red')
      setLoading(false)
    }
  }

  const inputClass = `w-full bg-[#040E16] border border-[#0A7B9E]/20 rounded-xl px-4 py-2.5 text-[#7BBFD6] text-sm focus:outline-none focus:border-[#0A7B9E]/50 transition-colors`
  const labelClass = `block text-xs font-semibold text-[#1E4D5C] uppercase tracking-wider mb-2`

  const renderSection = (id: string, title: string, icon: any, content: React.ReactNode) => {
    const isOpen = activeSection === id
    const Icon = icon
    return (
      <div className="mb-4 bg-[#020F16] border border-[#0A7B9E]/10 rounded-2xl overflow-hidden transition-all duration-300">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-5 flex items-center justify-between bg-[#040E16]/50 hover:bg-[#040E16] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-[#0A7B9E]/20 text-[#7BBFD6]' : 'bg-[#0A7B9E]/5 text-[#1E4D5C]'}`}>
              <Icon size={18} />
            </div>
            <h3 className={`font-semibold tracking-wide ${isOpen ? 'text-[#E8F6FA]' : 'text-[#7BBFD6]'}`}>
              {title}
            </h3>
          </div>
          {isOpen ? <ChevronDown size={18} className="text-[#1E4D5C]" /> : <ChevronRight size={18} className="text-[#1E4D5C]" />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="p-6 pt-2">
            {content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="sticky top-0 z-10 px-8 py-5 flex justify-between items-center bg-[#020F16]/90 backdrop-blur border-b border-[#0A7B9E]/10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin')} className="text-[#1E4D5C] hover:text-[#7BBFD6] transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-[2px] text-[#1E4D5C] font-medium uppercase">Clientes</span>
              <ChevronRight size={10} className="text-[#1E4D5C]" />
              <span className="text-[10px] tracking-[2px] text-[#4A8FA3] font-medium uppercase">Nuevo cliente</span>
            </div>
            <h1 className="text-lg font-semibold text-[#E8F6FA]">Crear nuevo cliente</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin')} className="px-5 py-2 rounded-xl text-sm font-medium text-[#7BBFD6] hover:bg-[#0A7B9E]/10 transition-colors">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || success}
            className={`px-5 py-2 rounded-xl text-sm font-medium text-[#C8E8F0] border transition-all duration-200 flex items-center gap-2
              ${success ? 'bg-[#10B981] border-[#10B981]' : 'bg-gradient-to-br from-[#0A7B9E] to-[#032D3B] border-[#0A7B9E]/40 hover:opacity-90'}
              ${(loading || success) ? 'opacity-80 cursor-not-allowed' : ''}
            `}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : success ? <Check size={16} /> : null}
            {success ? 'Creado' : loading ? 'Creando...' : 'Crear cliente'}
          </button>
        </div>
      </div>

      {globalError && (
        <div className="mx-8 mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={16} />
          {globalError}
        </div>
      )}

      {/* Main Form Area */}
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        
        {/* SECCIÓN 1: Identidad */}
        {renderSection('identity', 'Identidad de la Marca', Building2, (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Subir logo</label>
              <div
                onClick={() => logoInputRef.current?.click()}
                className="w-full h-32 rounded-xl border-2 border-dashed border-[#0A7B9E]/30 bg-[#040E16]/50 flex flex-col items-center justify-center cursor-pointer hover:bg-[#0A7B9E]/5 transition-colors relative overflow-hidden"
              >
                {formData.logo_url ? (
                  <img src={formData.logo_url} alt="Logo preview" className="max-h-full max-w-full object-contain p-2" />
                ) : (
                  <>
                    <Upload size={24} className="text-[#4A8FA3] mb-2" />
                    <span className="text-sm text-[#7BBFD6]">Haz clic para subir un archivo</span>
                    <span className="text-xs text-[#1E4D5C] mt-1">PNG, JPG, WEBP (Max 2MB)</span>
                  </>
                )}
                {uploadingLogo && (
                  <div className="absolute inset-0 bg-[#020F16]/80 flex items-center justify-center">
                    <Loader2 size={24} className="text-[#0A7B9E] animate-spin" />
                  </div>
                )}
                {formData.logo_url && !uploadingLogo && (
                  <div className="absolute top-2 right-2 bg-[#10B981] p-1 rounded-full text-[#020F16]">
                    <Check size={12} />
                  </div>
                )}
              </div>
              <input type="file" ref={logoInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleLogoUpload} />
              {errors.logo && <p className="text-red-400 text-xs mt-2">{errors.logo}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Nombre del negocio *</label>
                <input
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="Ej. Mi Tienda"
                  className={`${inputClass} ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  value={formData.tagline}
                  onChange={e => handleInputChange('tagline', e.target.value)}
                  placeholder="Tu eslogan aquí"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Subdominio *</label>
                <div className="relative flex items-center">
                  <input
                    value={formData.subdomain}
                    onChange={handleSubdomainChange}
                    placeholder="mitienda"
                    className={`${inputClass} pl-4 pr-24 ${errors.subdomain ? 'border-red-500/50 focus:border-red-500' : formData.subdomain ? 'border-green-500/50 focus:border-green-500' : ''}`}
                  />
                  <span className="absolute right-4 text-[#1E4D5C] text-sm pointer-events-none">.anlyfn.com</span>
                  {formData.subdomain && !errors.subdomain && (
                    <div className="absolute right-24 text-green-500">
                      <Check size={14} />
                    </div>
                  )}
                </div>
                {errors.subdomain && <p className="text-red-400 text-xs mt-1.5">{errors.subdomain}</p>}
              </div>
              <div>
                <label className={labelClass}>Dominio personalizado</label>
                <input
                  value={formData.custom_domain}
                  onChange={e => handleInputChange('custom_domain', e.target.value)}
                  placeholder="www.mitienda.com"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ))}

        {/* SECCIÓN 2: Colores */}
        {renderSection('colors', 'Colores y Tema', Palette, (
          <div className="space-y-8">
            <div>
              <label className={labelClass}>Paletas predefinidas</label>
              <div className="grid grid-cols-4 gap-3">
                {COLOR_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => applyColorPreset(preset)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#040E16] border border-[#0A7B9E]/20 hover:border-[#0A7B9E]/50 transition-colors"
                  >
                    <div className="flex -space-x-1">
                      {[preset.primary, preset.secondary, preset.background, preset.accent].map((c, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-[#040E16]" style={{ background: c }} />
                      ))}
                    </div>
                    <span className="text-xs text-[#7BBFD6]">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { key: 'primary_color', label: 'Color primario' },
                { key: 'secondary_color', label: 'Color secundario' },
                { key: 'color_background', label: 'Fondo del sitio' },
                { key: 'color_text', label: 'Texto principal' },
                { key: 'color_text_muted', label: 'Texto secundario' },
                { key: 'color_border', label: 'Bordes' },
                { key: 'color_accent', label: 'Acento' },
              ].map(colorField => (
                <div key={colorField.key} className="flex items-center gap-4">
                  <div className="w-1/2">
                    <label className="block text-[11px] font-medium text-[#4A8FA3] mb-1">{colorField.label}</label>
                  </div>
                  <div className="w-1/2 flex items-center gap-2">
                    <input
                      type="color"
                      value={formData[colorField.key as keyof FormState] as string}
                      onChange={e => handleInputChange(colorField.key as keyof FormState, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formData[colorField.key as keyof FormState] as string}
                      onChange={e => {
                        const val = e.target.value
                        handleInputChange(colorField.key as keyof FormState, val)
                      }}
                      className={`${inputClass} uppercase py-1.5 px-3`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-[#0A7B9E]/20 relative overflow-hidden" style={{ background: formData.color_background }}>
              <span className="absolute top-2 right-3 text-[10px] text-[#1E4D5C] font-mono tracking-widest uppercase bg-[#020F16]/50 px-2 py-1 rounded">Preview</span>
              
              <div className="flex items-center justify-between p-3 rounded-lg mb-6 shadow-sm" style={{ background: formData.primary_color }}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                  <span className="text-white text-xs font-bold">{formData.name || 'Logo'}</span>
                </div>
                <div className="flex gap-4 text-white/80 text-[10px] font-medium">
                  <span>Inicio</span><span>Productos</span><span>Contacto</span>
                </div>
                <div className="px-3 py-1 rounded text-[10px] font-bold bg-white text-black">Botón</div>
              </div>

              <div className="text-center px-8 pb-4">
                <h2 className="text-2xl font-bold mb-3" style={{ color: formData.color_text }}>Transforma tu negocio online hoy</h2>
                <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: formData.color_text_muted }}>
                  {formData.tagline || 'La mejor plataforma para llevar tus ventas al siguiente nivel con diseño moderno y minimalista.'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="px-6 py-2.5 rounded-lg text-xs font-semibold shadow-sm" style={{ background: formData.primary_color, color: formData.color_background }}>Empezar ahora</div>
                  <div className="px-6 py-2.5 rounded-lg text-xs font-semibold border" style={{ borderColor: formData.color_border, color: formData.color_text }}>Saber más</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* SECCIÓN 3: Tipografía */}
        {renderSection('typography', 'Tipografía y Estilo', Type, (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className={labelClass}>Fuente del cuerpo</label>
                <select
                  value={formData.font}
                  onChange={e => handleInputChange('font', e.target.value)}
                  className={inputClass}
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.value} value={f.value}>{f.label} ({f.category})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Fuente de títulos</label>
                <select
                  value={formData.font_heading}
                  onChange={e => handleInputChange('font_heading', e.target.value)}
                  className={inputClass}
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.value} value={f.value}>{f.label} ({f.category})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Tamaño base</label>
                <select value={formData.font_size_base} onChange={e => handleInputChange('font_size_base', e.target.value)} className={inputClass}>
                  {FONT_SIZE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Peso de títulos</label>
                <select value={formData.font_weight_heading} onChange={e => handleInputChange('font_weight_heading', Number(e.target.value))} className={inputClass}>
                  {FONT_WEIGHT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Espaciado de letras</label>
                <select value={formData.letter_spacing} onChange={e => handleInputChange('letter_spacing', e.target.value)} className={inputClass}>
                  {LETTER_SPACING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Altura de línea</label>
                <select value={formData.line_height} onChange={e => handleInputChange('line_height', e.target.value)} className={inputClass}>
                  {LINE_HEIGHT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Radio de bordes</label>
              <div className="flex flex-wrap gap-2">
                {BORDER_RADIUS_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => handleInputChange('border_radius', o.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-colors ${formData.border_radius === o.value ? 'bg-[#0A7B9E]/20 border-[#0A7B9E]' : 'bg-[#040E16] border-[#0A7B9E]/20 hover:border-[#0A7B9E]/50'}`}
                  >
                    <span className="text-lg">{o.preview}</span>
                    <span className="text-[10px] text-[#7BBFD6]">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Estilo de botones</label>
                <div className="flex gap-2">
                  {['square', 'rounded', 'pill'].map(style => (
                    <button
                      key={style}
                      onClick={() => handleInputChange('button_style', style)}
                      className={`flex-1 py-2 text-xs font-medium border transition-colors ${formData.button_style === style ? 'bg-[#0A7B9E]/20 border-[#0A7B9E] text-[#E8F6FA]' : 'bg-[#040E16] border-[#0A7B9E]/20 text-[#7BBFD6] hover:border-[#0A7B9E]/50'}`}
                      style={{ borderRadius: style === 'square' ? '0' : style === 'rounded' ? '8px' : '999px' }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Sombra</label>
                <select value={formData.shadow_style} onChange={e => handleInputChange('shadow_style', e.target.value)} className={inputClass}>
                  {['none', 'soft', 'medium', 'strong'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-[#040E16] border border-[#0A7B9E]/20">
              <link href={`https://fonts.googleapis.com/css2?family=${formData.font_heading.replace(/-/g, '+')}:wght@${formData.font_weight_heading}&family=${formData.font.replace(/-/g, '+')}&display=swap`} rel="stylesheet" />
              <h3 style={{ fontFamily: `"${formData.font_heading.replace(/-/g, ' ')}", sans-serif`, fontWeight: formData.font_weight_heading, color: '#E8F6FA', fontSize: '24px', letterSpacing: formData.letter_spacing, marginBottom: '12px' }}>
                Preview tipográfica
              </h3>
              <p style={{ fontFamily: `"${formData.font.replace(/-/g, ' ')}", sans-serif`, fontSize: formData.font_size_base, lineHeight: formData.line_height, color: '#7BBFD6', marginBottom: '24px' }}>
                El veloz murcélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja. 1234567890
              </p>
              <button style={{
                fontFamily: `"${formData.font.replace(/-/g, ' ')}", sans-serif`,
                background: formData.primary_color,
                color: formData.color_background,
                padding: '10px 20px',
                border: 'none',
                borderRadius: formData.button_style === 'square' ? '0' : formData.button_style === 'rounded' ? formData.border_radius : '999px',
                boxShadow: formData.shadow_style === 'none' ? 'none' : formData.shadow_style === 'soft' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}>
                Botón de prueba
              </button>
            </div>
          </div>
        ))}

        {/* SECCIÓN 4: Contacto */}
        {renderSection('contact', 'Información de Contacto', Globe, (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>WhatsApp</label>
              <input value={formData.whatsapp} onChange={e => handleInputChange('whatsapp', e.target.value)} placeholder="+593 99 999 9999" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="+593 2 999 9999" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="contacto@mitienda.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Dirección</label>
              <input value={formData.address} onChange={e => handleInputChange('address', e.target.value)} placeholder="Av. Principal 123" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Provincia</label>
              <select value={formData.province} onChange={e => handleInputChange('province', e.target.value)} className={inputClass}>
                {ECUADOR_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        ))}

        {/* SECCIÓN 5: Redes sociales */}
        {renderSection('social', 'Redes Sociales', Share2, (
          <div className="grid grid-cols-2 gap-6">
            {[
              { key: 'social_instagram', label: 'Instagram', prefix: 'instagram.com/' },
              { key: 'social_facebook', label: 'Facebook', prefix: 'facebook.com/' },
              { key: 'social_tiktok', label: 'TikTok', prefix: 'tiktok.com/@' },
              { key: 'social_youtube', label: 'YouTube', prefix: 'youtube.com/@' },
              { key: 'social_twitter', label: 'Twitter / X', prefix: 'x.com/' },
              { key: 'social_website', label: 'Sitio Web', prefix: 'https://' },
            ].map(social => (
              <div key={social.key}>
                <label className={labelClass}>{social.label}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#1E4D5C] text-xs pointer-events-none">{social.prefix}</span>
                  <input
                    value={formData[social.key as keyof FormState] as string}
                    onChange={e => handleInputChange(social.key as keyof FormState, e.target.value)}
                    className={`${inputClass} pl-[110px]`}
                    style={{ paddingLeft: `${social.prefix.length * 7 + 16}px` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* SECCIÓN 6: SEO */}
        {renderSection('seo', 'SEO y Buscadores', Search, (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs font-semibold text-[#1E4D5C] uppercase tracking-wider">Título SEO</label>
                <span className={`text-[10px] font-medium ${formData.seo_title.length > 60 ? 'text-red-400' : 'text-[#4A8FA3]'}`}>
                  {formData.seo_title.length}/60
                </span>
              </div>
              <input value={formData.seo_title} onChange={e => handleInputChange('seo_title', e.target.value)} className={inputClass} />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs font-semibold text-[#1E4D5C] uppercase tracking-wider">Descripción SEO</label>
                <span className={`text-[10px] font-medium ${formData.seo_description.length > 160 ? 'text-red-400' : 'text-[#4A8FA3]'}`}>
                  {formData.seo_description.length}/160
                </span>
              </div>
              <textarea value={formData.seo_description} onChange={e => handleInputChange('seo_description', e.target.value)} className={inputClass} rows={3} />
            </div>
            <div>
              <label className={labelClass}>Palabras clave</label>
              <input value={formData.seo_keywords} onChange={e => handleInputChange('seo_keywords', e.target.value)} placeholder="tienda, productos, online (separadas por comas)" className={inputClass} />
            </div>

            <div className="p-4 rounded-xl bg-white mt-4 border border-[#E2E8F0] shadow-sm">
              <div className="text-xs text-[#202124] mb-1 truncate">https://{formData.subdomain || 'mitienda'}.anlyfn.com</div>
              <div className="text-[18px] text-[#1a0dab] font-normal hover:underline cursor-pointer truncate mb-1">
                {formData.seo_title || formData.name || 'Título de tu página web'}
              </div>
              <div className="text-[13px] text-[#4d5156] line-clamp-2 leading-snug">
                {formData.seo_description || 'Esta es una descripción de ejemplo de cómo se verá tu página en los resultados de búsqueda de Google. Asegúrate de que sea atractiva.'}
              </div>
            </div>
          </div>
        ))}

        {/* SECCIÓN 7: Configuración avanzada */}
        {renderSection('advanced', 'Configuración Avanzada', Settings2, (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Moneda Principal</label>
                <select value={formData.currency_symbol} onChange={e => handleInputChange('currency_symbol', e.target.value)} className={inputClass}>
                  {CURRENCY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#040E16] rounded-xl border border-[#0A7B9E]/20">
                <div>
                  <div className="text-sm text-[#E8F6FA] font-medium mb-1">Sitio Activo</div>
                  <div className="text-xs text-[#4A8FA3]">Hacer público el storefront</div>
                </div>
                <button
                  onClick={() => handleInputChange('active', !formData.active)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${formData.active ? 'bg-[#0A7B9E]' : 'bg-[#1E4D5C]/50'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${formData.active ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className={`transition-all overflow-hidden ${!formData.active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <label className={labelClass}>Mensaje de Mantenimiento</label>
              <textarea
                value={formData.maintenance_message}
                onChange={e => handleInputChange('maintenance_message', e.target.value)}
                className={inputClass}
                rows={2}
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
