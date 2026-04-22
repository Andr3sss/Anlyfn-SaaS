'use client'

import { Layers, ChevronRight } from 'lucide-react'
import type { ClientWithModules } from '@/types/database'

interface ClientListProps {
  clients: ClientWithModules[]
  selectedId: string | null
  onSelect: (id: string) => void
  searchQuery: string
}

export function ClientList({
  clients, selectedId, onSelect, searchQuery
}: ClientListProps) {
  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subdomain.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: '420px',
        flexShrink: 0,
        background: '#040E16',
        border: '1px solid rgba(10,123,158,0.12)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-5 py-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(10,123,158,0.08)' }}
      >
        <Layers size={13} style={{ color: '#0A7B9E' }} />
        <span style={{
          fontSize: '11px', fontWeight: 600,
          color: '#4A8FA3', letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Seleccionar cliente
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex-1 flex items-center justify-center"
               style={{ color: '#1E3A44', fontSize: '13px' }}>
            Sin resultados
          </div>
        ) : (
          filtered.map(client => {
            const isSelected = selectedId === client.id
            return (
              <button
                key={client.id}
                onClick={() => onSelect(client.id)}
                className="w-full text-left transition-all
                           duration-200 relative"
                style={{
                  padding: '16px 20px',
                  background: isSelected
                    ? 'rgba(10,123,158,0.08)' : 'transparent',
                  borderBottom:
                    '1px solid rgba(10,123,158,0.06)',
                  borderLeft: isSelected
                    ? '2px solid #0A7B9E'
                    : '2px solid transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center
                               rounded-xl shrink-0 font-bold"
                    style={{
                      width: '40px', height: '40px',
                      fontSize: '14px',
                      background: isSelected
                        ? 'rgba(10,123,158,0.2)'
                        : 'rgba(10,123,158,0.06)',
                      border: `1px solid ${isSelected
                        ? 'rgba(10,123,158,0.4)'
                        : 'rgba(10,123,158,0.1)'}`,
                      color: isSelected ? '#7BBFD6' : '#1E4D5C',
                    }}
                  >
                    {client.name[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div style={{
                      fontSize: '13px', fontWeight: 600,
                      color: isSelected ? '#C8E8F0' : '#4A6B7A',
                      whiteSpace: 'nowrap', overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {client.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span style={{
                        fontSize: '11px',
                        color: isSelected
                          ? '#0A7B9E' : '#1E4D5C',
                        fontFamily: 'monospace',
                      }}>
                        {client.subdomain}
                      </span>
                    </div>
                  </div>

                  {/* Status + chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className="flex items-center gap-1.5
                                 px-2 py-1 rounded-lg"
                      style={{
                        background: client.active
                          ? 'rgba(16,185,129,0.08)'
                          : 'rgba(100,116,139,0.08)',
                        border: `1px solid ${client.active
                          ? 'rgba(16,185,129,0.2)'
                          : 'rgba(100,116,139,0.15)'}`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: client.active
                            ? '#10B981' : '#475569',
                        }}
                      />
                      <span style={{
                        fontSize: '10px', fontWeight: 600,
                        color: client.active
                          ? '#10B981' : '#475569',
                      }}>
                        {client.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <ChevronRight
                      size={12}
                      style={{
                        color: isSelected
                          ? '#0A7B9E' : '#0A3040',
                        transition: 'color 200ms',
                      }}
                    />
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
