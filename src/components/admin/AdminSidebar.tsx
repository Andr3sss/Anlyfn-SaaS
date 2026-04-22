'use client'

import {
  LayoutDashboard, Users, Package,
  ChartColumn, Eye, Settings, LogOut
} from 'lucide-react'
import { AnlyfnLogo } from './AnlyfnLogo'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  { id: 'clients',   label: 'Clientes',    icon: Users },
  { id: 'products',  label: 'Productos',   icon: Package },
  { id: 'analytics', label: 'Analytics',   icon: ChartColumn },
  { id: 'preview',   label: 'Preview',     icon: Eye },
]

interface AdminSidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function AdminSidebar({
  activeSection, onNavigate
}: AdminSidebarProps) {
  return (
    <aside
      className="flex flex-col shrink-0 h-screen"
      style={{
        width: '72px',
        background: '#020F16',
        borderRight: '1px solid rgba(10,123,158,0.12)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-[72px]
                      shrink-0">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-md
                       opacity-30"
            style={{
              background: '#0A7B9E',
              transform: 'scale(2)',
            }}
          />
          <AnlyfnLogo size={32} />
        </div>
      </div>

      {/* Separator */}
      <div
        className="mx-4 shrink-0"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent,' +
            ' rgba(10,123,158,0.3), transparent)',
        }}
      />

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-1
                      py-6 flex-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={label}
              className="relative flex items-center justify-center
                         w-11 h-11 rounded-xl transition-all
                         duration-200 group"
              style={{
                background: isActive
                  ? 'rgba(10,123,158,0.15)' : 'transparent',
                border: isActive
                  ? '1px solid rgba(10,123,158,0.35)'
                  : '1px solid transparent',
              }}
            >
              <Icon
                size={18}
                style={{
                  color: isActive ? '#7BBFD6' : '#1E4D5C',
                  strokeWidth: isActive ? 1.8 : 1.5,
                  transition: 'color 200ms',
                }}
                className="group-hover:text-[#7BBFD6]"
              />

              {/* Active indicator line */}
              {isActive && (
                <span
                  className="absolute right-0 top-1/2
                             -translate-y-1/2 translate-x-1/2
                             w-1 h-4 rounded-full"
                  style={{ background: '#0A7B9E' }}
                />
              )}

              {/* Tooltip */}
              <span
                className="absolute pointer-events-none
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-200 z-50
                           whitespace-nowrap px-2 py-1 rounded text-xs"
                style={{
                  left: 'calc(100% + 12px)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#0A1E28',
                  color: '#7BBFD6',
                  border: '1px solid rgba(10,123,158,0.25)',
                  fontSize: '11px',
                  fontFamily: 'system-ui',
                }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-1 pb-6">
        <div
          className="mx-4 mb-2"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent,' +
              ' rgba(10,123,158,0.2), transparent)',
          }}
        />
        {[
          { icon: Settings, label: 'Configuración' },
          { icon: LogOut,   label: 'Cerrar sesión' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            className="flex items-center justify-center w-11 h-11
                       rounded-xl transition-all duration-200 group"
            style={{ border: '1px solid transparent' }}
          >
            <Icon
              size={17}
              style={{
                color: '#1E4D5C',
                strokeWidth: 1.5,
                transition: 'color 200ms',
              }}
              className={label === 'Cerrar sesión'
                ? 'group-hover:text-red-400'
                : 'group-hover:text-[#7BBFD6]'}
            />
          </button>
        ))}
      </div>
    </aside>
  )
}
