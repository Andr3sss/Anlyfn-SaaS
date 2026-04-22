'use client'

import { MODULE_CONFIG, type ModuleKey } from '@/lib/modules'

interface ModuleBadgeProps {
  moduleKey: ModuleKey
  active: boolean
}

export function ModuleBadge({ moduleKey, active }: ModuleBadgeProps) {
  const config = MODULE_CONFIG[moduleKey]

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 10px',
        borderRadius: '8px',
        transition: 'all 200ms',
        background: active ? config.bg : 'rgba(10,30,40,0.5)',
        border: `1px solid ${active ? config.color + '33' : 'rgba(10,123,158,0.06)'}`,
        opacity: active ? 1 : 0.35,
      }}
    >
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: active ? config.color : '#1E3A44',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '11px',
          fontWeight: active ? 500 : 400,
          color: active ? config.color : '#1E3A44',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        {config.name}
      </span>
    </div>
  )
}
