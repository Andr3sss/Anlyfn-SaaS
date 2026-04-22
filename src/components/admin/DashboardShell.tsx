'use client'

import { useState } from 'react'
import {
  Users, Globe, Package, TrendingUp,
  Search, Bell, Plus, ChevronRight
} from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'
import { MetricCard } from './MetricCard'
import { ClientList } from './ClientList'
import { ClientDetail } from './ClientDetail'
import type { ClientWithModules, DashboardMetrics }
  from '@/types/database'

interface DashboardShellProps {
  clients: ClientWithModules[]
  metrics: DashboardMetrics
}

export function DashboardShell({
  clients, metrics
}: DashboardShellProps) {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedClientId, setSelectedClientId] = useState<string | null>(clients[0]?.id ?? null)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedClient = clients.find(
    c => c.id === selectedClientId
  ) ?? null

  const METRIC_CARDS = [
    {
      label: 'Clientes activos',
      value: String(metrics.totalClients),
      sub: '+1 este mes',
      trend: 'up' as const,
      icon: Users,
      accent: '#0A7B9E',
      glow: 'rgba(10,123,158,0.15)',
    },
    {
      label: 'Storefronts en línea',
      value: String(metrics.activeSites),
      sub: `${metrics.totalClients - metrics.activeSites} en mantenimiento`,
      trend: 'neutral' as const,
      icon: Globe,
      accent: '#0D9488',
      glow: 'rgba(13,148,136,0.12)',
    },
    {
      label: 'Productos totales',
      value: String(metrics.totalProducts),
      sub: 'Próxima fase',
      trend: 'neutral' as const,
      icon: Package,
      accent: '#7C3AED',
      glow: 'rgba(124,58,237,0.12)',
    },
    {
      label: 'Módulos activos',
      value: String(metrics.totalModules),
      sub: 'en todos los clientes',
      trend: 'up' as const,
      icon: TrendingUp,
      accent: '#0A7B9E',
      glow: 'rgba(10,123,158,0.15)',
    },
  ]

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: '#020F16' }}
    >
      <AdminSidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <main className="flex-1 overflow-y-auto">
        <div style={{ padding: '28px 32px' }}>

          {/* Topbar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span style={{
                  fontSize: '11px', letterSpacing: '3px',
                  color: '#1E4D5C', fontWeight: 500,
                  textTransform: 'uppercase',
                }}>
                  Panel de control
                </span>
                <ChevronRight size={10}
                  style={{ color: '#1E4D5C' }} />
                <span style={{
                  fontSize: '11px', letterSpacing: '3px',
                  color: '#4A8FA3', fontWeight: 500,
                  textTransform: 'uppercase',
                }}>
                  Dashboard
                </span>
              </div>
              <h1 style={{
                fontSize: '22px', fontWeight: 600,
                color: '#E8F6FA', letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Anlyfn Studio
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex items-center">
                <Search
                  size={13}
                  style={{
                    position: 'absolute', left: '12px',
                    color: '#1E4D5C',
                  }}
                />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar cliente..."
                  style={{
                    background: '#040E16',
                    border: '1px solid rgba(10,123,158,0.2)',
                    borderRadius: '10px',
                    padding: '8px 12px 8px 32px',
                    fontSize: '12px', color: '#7BBFD6',
                    outline: 'none', width: '200px',
                  }}
                />
              </div>

              {/* Bell */}
              <button
                className="relative flex items-center
                           justify-center w-9 h-9 rounded-xl"
                style={{
                  background: '#040E16',
                  border: '1px solid rgba(10,123,158,0.2)',
                }}
              >
                <Bell size={15}
                  style={{ color: '#1E4D5C' }} />
                <span
                  className="absolute top-1.5 right-1.5
                             w-1.5 h-1.5 rounded-full"
                  style={{ background: '#0A7B9E' }}
                />
              </button>

              {/* New client */}
              <button
                className="flex items-center gap-2 rounded-xl
                           transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg,' +
                    ' #0A7B9E, #032D3B)',
                  border: '1px solid rgba(10,123,158,0.4)',
                  padding: '8px 16px', fontSize: '12px',
                  color: '#C8E8F0', fontWeight: 500,
                  letterSpacing: '0.03em',
                }}
              >
                <Plus size={13} />
                Nuevo cliente
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {METRIC_CARDS.map(card => (
              <MetricCard key={card.label} {...card} />
            ))}
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span style={{
                fontSize: '14px', fontWeight: 600,
                color: '#C8E8F0', letterSpacing: '-0.01em',
              }}>
                Clientes recientes
              </span>
              <span style={{
                fontSize: '10px', fontWeight: 600,
                letterSpacing: '2px', color: '#0A7B9E',
                background: 'rgba(10,123,158,0.1)',
                border: '1px solid rgba(10,123,158,0.2)',
                padding: '2px 8px', borderRadius: '20px',
              }}>
                {clients.length} REGISTROS
              </span>
            </div>
            <button
              className="flex items-center gap-1
                         hover:text-[#4A8FA3] transition-colors"
              style={{ fontSize: '11px', color: '#1E4D5C' }}
            >
              Ver todos <ChevronRight size={11} />
            </button>
          </div>

          {/* Clients panel */}
          <div className="flex gap-4">
            <ClientList
              clients={clients}
              selectedId={selectedClientId}
              onSelect={setSelectedClientId}
              searchQuery={searchQuery}
            />
            {selectedClient ? (
              <ClientDetail client={selectedClient} />
            ) : (
              <div
                className="flex-1 flex items-center
                           justify-center rounded-2xl"
                style={{
                  background: '#040E16',
                  border: '1px solid rgba(10,123,158,0.12)',
                  color: '#1E3A44', fontSize: '13px',
                }}
              >
                Selecciona un cliente para ver sus detalles
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
