'use client'

import { useRouter, usePathname } from 'next/navigation'
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
  href: string
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    id: 'clients',
    label: 'Clientes',
    icon: Users,
    href: '/admin/clients',
  },
  {
    id: 'products',
    label: 'Productos',
    icon: Package,
    href: '/admin/products',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartColumn,
    href: '/admin/analytics',
  },
  {
    id: 'preview',
    label: 'Preview',
    icon: Eye,
    href: '/admin/preview',
  },
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  function isActive(href: string): boolean {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <aside
      className="flex flex-col shrink-0 h-screen"
      style={{
        width: '72px',
        background: '#020F16',
        borderRight: '1px solid rgba(10,123,158,0.12)',
      }}
    >
      {/* Logo — click navega a /admin */}
      <button
        onClick={() => router.push('/admin')}
        className="flex items-center justify-center h-[72px]
                   shrink-0 cursor-pointer"
        style={{ background: 'transparent', border: 'none' }}
      >
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
      </button>

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
        {NAV_ITEMS.map(({ id, label, icon: Icon, href }) => {
          const active = isActive(href)
          return (
            <button
              key={id}
              onClick={() => router.push(href)}
              title={label}
              className="relative flex items-center justify-center
                         w-11 h-11 rounded-xl transition-all
                         duration-200 group cursor-pointer"
              style={{
                background: active
                  ? 'rgba(10,123,158,0.15)' : 'transparent',
                border: active
                  ? '1px solid rgba(10,123,158,0.35)'
                  : '1px solid transparent',
              }}
            >
              <Icon
                size={18}
                style={{
                  color: active ? '#7BBFD6' : '#1E4D5C',
                  strokeWidth: active ? 1.8 : 1.5,
                  transition: 'color 200ms',
                }}
              />

              {/* Active indicator */}
              {active && (
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
                           whitespace-nowrap px-2 py-1 rounded"
                style={{
                  left: 'calc(100% + 12px)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#0A1E28',
                  color: '#7BBFD6',
                  border: '1px solid rgba(10,123,158,0.25)',
                  fontSize: '11px',
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

        {/* Settings */}
        <button
          onClick={() => router.push('/admin/settings')}
          title="Configuración"
          className="flex items-center justify-center w-11 h-11
                     rounded-xl transition-all duration-200 group"
          style={{ border: '1px solid transparent' }}
        >
          <Settings
            size={17}
            style={{ color: '#1E4D5C', strokeWidth: 1.5 }}
            className="group-hover:text-[#7BBFD6]
                       transition-colors duration-200"
          />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="flex items-center justify-center w-11 h-11
                     rounded-xl transition-all duration-200 group"
          style={{ border: '1px solid transparent' }}
        >
          <LogOut
            size={17}
            style={{ color: '#1E4D5C', strokeWidth: 1.5 }}
            className="group-hover:text-red-400
                       transition-colors duration-200"
          />
        </button>
      </div>
    </aside>
  )
}
