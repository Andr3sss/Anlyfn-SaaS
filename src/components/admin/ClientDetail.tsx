'use client'

import {
  Eye, Pen, Globe, Zap,
  CircleCheck, CircleX
} from 'lucide-react'
import { ModuleBadge } from './ModuleBadge'
import {
  MODULE_KEYS, splitModules, countActiveModules
} from '@/lib/modules'
import type { ClientWithModules } from '@/types/database'

interface ClientDetailProps {
  client: ClientWithModules
}

export function ClientDetail({ client }: ClientDetailProps) {
  const modulesObj = client.modules as Record<string, unknown> | null
  const activeCount = countActiveModules(modulesObj)
  const { active: activeKeys, inactive: inactiveKeys } =
    splitModules(modulesObj)

  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN
    ?? 'localhost:3000'

  return (
    <div
      className="flex flex-col flex-1 rounded-2xl overflow-hidden"
      style={{
        background: '#040E16',
        border: '1px solid rgba(10,123,158,0.12)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-6 py-5"
        style={{ borderBottom: '1px solid rgba(10,123,158,0.08)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center
                       rounded-2xl font-bold"
            style={{
              width: '56px', height: '56px', fontSize: '20px',
              color: '#7BBFD6',
              background: 'linear-gradient(135deg,' +
                ' rgba(10,123,158,0.2), rgba(10,123,158,0.05))',
              border: '1px solid rgba(10,123,158,0.3)',
            }}
          >
            {client.name[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{
              fontSize: '16px', fontWeight: 700,
              color: '#E8F6FA', letterSpacing: '-0.02em',
            }}>
              {client.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span style={{
                fontSize: '12px', color: '#0A7B9E',
                fontFamily: 'monospace',
              }}>
                {client.subdomain}.{baseDomain.split(':')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-xl
                       transition-all duration-200 hover:opacity-80"
            style={{
              padding: '8px 14px',
              background: 'rgba(10,123,158,0.08)',
              border: '1px solid rgba(10,123,158,0.2)',
              fontSize: '12px', color: '#7BBFD6', fontWeight: 500,
            }}
          >
            <Eye size={13} />
            Ver storefront
          </button>
          <button
            className="flex items-center gap-2 rounded-xl
                       transition-all duration-200 hover:opacity-90"
            style={{
              padding: '8px 14px',
              background: 'linear-gradient(135deg,' +
                ' #0A7B9E, #032D3B)',
              border: '1px solid rgba(10,123,158,0.4)',
              fontSize: '12px', color: '#C8E8F0', fontWeight: 500,
            }}
          >
            <Pen size={13} />
            Editar cliente
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-3 gap-px mx-6 my-4"
        style={{
          background: 'rgba(10,123,158,0.08)',
          borderRadius: '14px', overflow: 'hidden',
        }}
      >
        {[
          {
            label: 'Visitas este mes',
            value: '—',
            icon: Globe,
            colorOverride: null,
          },
          {
            label: 'Módulos activos',
            value: String(activeCount),
            icon: Zap,
            colorOverride: null,
          },
          {
            label: 'Estado',
            value: client.active ? 'Activo' : 'Inactivo',
            icon: client.active ? CircleCheck : CircleX,
            colorOverride: client.active ? '#10B981' : '#475569',
          },
        ].map(({ label, value, icon: Icon, colorOverride }) => (
          <div
            key={label}
            className="flex flex-col items-center
                       justify-center py-4"
            style={{ background: '#040E16' }}
          >
            <Icon
              size={14}
              style={{
                color: colorOverride ?? '#0A7B9E',
                marginBottom: '6px',
              }}
            />
            <div style={{
              fontSize: '18px', fontWeight: 700,
              color: '#C8E8F0', letterSpacing: '-0.02em',
            }}>
              {value}
            </div>
            <div style={{
              fontSize: '10px', color: '#1E4D5C',
              marginTop: '2px',
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Modules section */}
      <div className="px-6 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={12} style={{ color: '#0A7B9E' }} />
          <span style={{
            fontSize: '11px', fontWeight: 600,
            color: '#4A8FA3', letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Módulos activos
          </span>
          <span style={{
            fontSize: '9px', fontWeight: 700,
            color: '#0A7B9E',
            background: 'rgba(10,123,158,0.1)',
            border: '1px solid rgba(10,123,158,0.2)',
            padding: '1px 7px', borderRadius: '20px',
            letterSpacing: '1px',
          }}>
            {activeCount} / {MODULE_KEYS.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeKeys.map(key => (
            <ModuleBadge key={key} moduleKey={key} active={true} />
          ))}
          {inactiveKeys.map(key => (
            <ModuleBadge key={key} moduleKey={key} active={false} />
          ))}
        </div>
      </div>

      <div
        className="mx-6 mt-4 mb-5"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent,' +
            ' rgba(10,123,158,0.15), transparent)',
        }}
      />
    </div>
  )
}
