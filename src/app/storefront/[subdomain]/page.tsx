import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { getStorefrontClient } from '@/lib/get-storefront-client'
import { getFontByKey } from '@/lib/storefront-fonts'
import type { Client } from '@/types/database'

type Props = { params: Promise<{ subdomain: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } = await params
  const client = await getStorefrontClient(subdomain)

  if (!client) {
    return { title: 'Storefront no encontrado — Anlyfn' }
  }

  return {
    title: client.seo_title ?? client.name,
    description: client.seo_description ?? undefined,
    icons: client.favicon_url ? { icon: client.favicon_url } : undefined,
  }
}

function buildCssVars(c: Client): CSSProperties {
  return {
    '--color-primary':     c.primary_color,
    '--color-secondary':   c.secondary_color,
    '--color-background':  c.color_background,
    '--color-text':        c.color_text,
    '--color-text-muted':  c.color_text_muted,
    '--color-border':      c.color_border,
    '--color-accent':      c.color_accent,
    '--border-radius':     c.border_radius,
    '--font-size-base':    c.font_size_base,
    '--letter-spacing':    c.letter_spacing,
    '--line-height':       c.line_height,
  } as CSSProperties
}

function MaintenancePage({ client }: { client: Client }) {
  const cssVars = buildCssVars(client)

  return (
    <div
      style={{
        ...cssVars,
        background: 'var(--color-background)',
        color: 'var(--color-text)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height)',
        letterSpacing: 'var(--letter-spacing)',
      }}
    >
      <style>{`
        @keyframes maint-breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>

      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        {/* Animated icon */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-primary)',
          margin: '0 auto 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'maint-breathe 3s ease-in-out infinite',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
            <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>

        {/* Business name */}
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          margin: '0 0 0.75rem',
          color: 'var(--color-text)',
        }}>
          {client.name}
        </h1>

        {/* Divider */}
        <div style={{
          width: '2.5rem',
          height: '2px',
          background: 'var(--color-primary)',
          margin: '0 auto 1.25rem',
          borderRadius: '2px',
        }} />

        {/* Maintenance message */}
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          margin: 0,
        }}>
          {client.maintenance_message}
        </p>
      </div>
    </div>
  )
}

export default async function StorefrontPage({ params }: Props) {
  // PASO A — leer subdominio
  const { subdomain } = await params

  // PASO B — obtener datos del cliente (con caché por tag)
  const client = await getStorefrontClient(subdomain)

  // PASO C — cliente no encontrado
  if (!client) notFound()

  // PASO D — cliente en mantenimiento
  if (!client.active) return <MaintenancePage client={client} />

  // PASO E — cargar fuentes
  const bodyFont    = getFontByKey(client.font)
  const headingFont = getFontByKey(client.font_heading)

  // PASO F — variables CSS del cliente
  const cssVars = buildCssVars(client)

  // PASO G — renderizar contenedor del storefront
  return (
    <div
      className={`${bodyFont.className} ${headingFont.className}`}
      style={{
        ...cssVars,
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        minHeight: '100vh',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height)',
        letterSpacing: 'var(--letter-spacing)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{client.name}</h1>
      <p style={{ margin: 0, opacity: 0.45, fontSize: '0.8rem', fontFamily: 'monospace' }}>
        {subdomain}
      </p>
    </div>
  )
}
