'use client'

import { type LucideIcon } from 'lucide-react'
import { TrendingUp } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  sub: string
  trend: 'up' | 'neutral'
  icon: LucideIcon
  accent: string
  glow: string
}

export function MetricCard({
  label, value, sub, trend, icon: Icon, accent, glow
}: MetricCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-5
                 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: '#040E16',
        border: '1px solid rgba(10,123,158,0.12)',
      }}
    >
      {/* Glow overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity
                   duration-300 pointer-events-none"
        style={{ background: glow }}
      />

      {/* Header row */}
      <div className="relative flex items-start
                      justify-between mb-4">
        <div
          className="flex items-center justify-center
                     w-9 h-9 rounded-xl"
          style={{
            background: glow,
            border: `1px solid ${accent}22`,
          }}
        >
          <Icon
            size={16}
            style={{ color: accent, strokeWidth: 1.5 }}
          />
        </div>

        {trend === 'up' && (
          <div
            className="flex items-center gap-1 px-2
                       py-0.5 rounded-lg"
            style={{
              background: 'rgba(10,148,100,0.1)',
              border: '1px solid rgba(10,148,100,0.15)',
            }}
          >
            <TrendingUp size={10} style={{ color: '#10B981' }} />
            <span style={{ fontSize: '9px', color: '#10B981',
                           fontWeight: 600 }}>↑</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        <div style={{ fontSize: '28px', fontWeight: 700,
                      color: '#E8F6FA', letterSpacing: '-0.03em',
                      lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: '11px', color: '#1E4D5C',
                      marginTop: '6px', fontWeight: 500 }}>
          {label}
        </div>
        <div style={{ fontSize: '10px', color: '#0A4D5C',
                      marginTop: '3px' }}>
          {sub}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent,
                       ${accent}33, transparent)`,
        }}
      />
    </div>
  )
}
