'use client'

import Link from 'next/link'
import { useDeferredValue, useState } from 'react'
import {
  ArrowUpRight,
  ChevronRight,
  PackagePlus,
  Search,
} from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'
import { MODULE_CONFIG, countActiveModules, splitModules } from '@/lib/modules'
import type { ClientWithModules } from '@/types/database'

interface ClientsDirectoryProps {
  clients: ClientWithModules[]
}

export function ClientsDirectory({
  clients,
}: ClientsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const filteredClients = clients.filter((client) => {
    const query = deferredSearchQuery.trim().toLowerCase()
    if (!query) return true

    return [
      client.name,
      client.subdomain,
      client.tagline ?? '',
      client.custom_domain ?? '',
    ].some((value) => value.toLowerCase().includes(query))
  })

  const featuredClient = filteredClients[0] ?? null
  const showFeaturedClient = filteredClients.length > 1

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020F16]">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-8 px-8 py-7">
          <header className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#1E4D5C]">
                  Panel de control
                </span>
                <ChevronRight size={10} className="text-[#1E4D5C]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#4A8FA3]">
                  Clientes
                </span>
              </div>

              <div className="mt-3 max-w-3xl">
                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#E8F6FA] sm:text-4xl">
                  Directorio de clientes
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative flex min-w-[280px] items-center">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-4 text-[#1E4D5C]"
                />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Buscar por nombre, subdominio o dominio..."
                  className="h-11 w-full rounded-2xl border border-[#0A7B9E]/15 bg-[#040E16] pl-11 pr-4 text-sm text-[#C8E8F0] outline-none transition-colors placeholder:text-[#1E4D5C] focus:border-[#0A7B9E]/45"
                />
              </label>

              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#0A7B9E]/15 bg-[#040E16] px-4 text-sm font-medium text-[#7BBFD6] transition-colors hover:border-[#0A7B9E]/30 hover:bg-[#0A7B9E]/8"
                >
                  Volver al dashboard
                </Link>
                <Link
                  href="/admin/clients/new"
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[#0A7B9E]/40 bg-[linear-gradient(135deg,#0A7B9E,#032D3B)] px-5 text-sm font-medium text-[#E8F6FA] transition-opacity hover:opacity-90"
                >
                  <PackagePlus size={14} />
                  Nuevo cliente
                </Link>
              </div>
            </div>
          </header>

          {showFeaturedClient ? (
            <section>
              <div className="overflow-hidden rounded-[28px] border border-[#0A7B9E]/12 bg-[#040E16]">
                <div className="border-b border-[#0A7B9E]/10 px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A8FA3]">
                        Cliente destacado
                      </div>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#E8F6FA]">
                        {featuredClient?.name ?? 'Sin resultados'}
                      </h3>
                    </div>
                    {featuredClient ? (
                      <Link
                        href={`/admin/clients/${featuredClient.id}`}
                        className="inline-flex h-10 items-center gap-2 rounded-2xl border border-[#0A7B9E]/20 bg-[#020F16] px-4 text-sm font-medium text-[#7BBFD6] transition-colors hover:border-[#0A7B9E]/35 hover:bg-[#0A7B9E]/8"
                      >
                        Abrir editor
                        <ArrowUpRight size={13} />
                      </Link>
                    ) : null}
                  </div>
                </div>

                {featuredClient ? (
                  <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        {featuredClient.logo_url ? (
                          <img
                            src={featuredClient.logo_url}
                            alt={`Logo de ${featuredClient.name}`}
                            className="h-16 w-16 rounded-2xl border border-[#0A7B9E]/15 bg-[#020F16] object-cover p-2"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0A7B9E]/25 bg-[linear-gradient(135deg,rgba(10,123,158,0.2),rgba(10,123,158,0.05))] text-xl font-semibold text-[#7BBFD6]">
                            {featuredClient.name.slice(0, 1).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                                featuredClient.active
                                  ? 'border-[#10B981]/20 bg-[#10B981]/8 text-[#10B981]'
                                  : 'border-[#64748B]/20 bg-[#64748B]/8 text-[#94A3B8]'
                              }`}
                            >
                              {featuredClient.active ? 'Activo' : 'Inactivo'}
                            </span>
                            <span className="rounded-full border border-[#0A7B9E]/15 bg-[#020F16] px-2.5 py-1 text-[11px] font-semibold text-[#4A8FA3]">
                              {featuredClient.custom_domain ? 'Dominio propio' : 'Subdominio base'}
                            </span>
                          </div>
                          <div className="mt-3 truncate text-sm font-medium text-[#E8F6FA]">
                            {featuredClient.subdomain}.anlyfn.com
                          </div>
                          <p className="mt-2 text-sm leading-6 text-[#4A8FA3]">
                            {featuredClient.tagline?.trim() ||
                              'Configuracion lista para edicion, modulos y storefront desde un solo punto.'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {splitModules(featuredClient.modules).active
                          .slice(0, 5)
                          .map((key) => (
                            <span
                              key={key}
                              className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                              style={{
                                color: MODULE_CONFIG[key].color,
                                borderColor: `${MODULE_CONFIG[key].color}33`,
                                background: MODULE_CONFIG[key].bg,
                              }}
                            >
                              {MODULE_CONFIG[key].name}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                      {[
                        {
                          label: 'Modulos activos',
                          value: countActiveModules(featuredClient.modules),
                        },
                        {
                          label: 'Dominio',
                          value: featuredClient.custom_domain ? 'Custom' : 'Base',
                        },
                        {
                          label: 'Entrada',
                          value: featuredClient.created_at.slice(0, 10),
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-[#0A7B9E]/10 bg-[#020F16] px-4 py-4"
                        >
                          <div className="text-base font-semibold text-[#E8F6FA]">
                            {item.value}
                          </div>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#1E4D5C]">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-16 text-center text-sm text-[#4A8FA3]">
                    No hay clientes que coincidan con la busqueda actual.
                  </div>
                )}
              </div>
            </section>
          ) : null}

          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A8FA3]">
                  Biblioteca operativa
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#E8F6FA]">
                  Todos los clientes
                </h2>
              </div>
              <div className="text-sm text-[#4A8FA3]">
                {filteredClients.length} resultado{filteredClients.length === 1 ? '' : 's'} visibles
              </div>
            </div>

            {filteredClients.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#0A7B9E]/18 bg-[#040E16] px-8 py-16 text-center">
                <div className="text-lg font-semibold text-[#E8F6FA]">
                  Sin coincidencias por ahora
                </div>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#4A8FA3]">
                  Prueba otro termino de busqueda o crea un nuevo cliente para seguir
                  poblando este directorio.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredClients.map((client) => {
                  const activeModules = splitModules(client.modules).active.slice(0, 4)

                  return (
                    <Link
                      key={client.id}
                      href={`/admin/clients/${client.id}`}
                      className="group relative overflow-hidden rounded-[26px] border border-[#0A7B9E]/12 bg-[#040E16] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A7B9E]/28"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,123,158,0.14),transparent_48%)]" />
                      </div>

                      <div className="relative flex h-full flex-col gap-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-4">
                            {client.logo_url ? (
                              <img
                                src={client.logo_url}
                                alt={`Logo de ${client.name}`}
                                className="h-14 w-14 rounded-2xl border border-[#0A7B9E]/15 bg-[#020F16] object-cover p-2"
                              />
                            ) : (
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#0A7B9E]/20 bg-[linear-gradient(135deg,rgba(10,123,158,0.2),rgba(10,123,158,0.05))] text-lg font-semibold text-[#7BBFD6]">
                                {client.name.slice(0, 1).toUpperCase()}
                              </div>
                            )}

                            <div className="min-w-0">
                              <h3 className="truncate text-lg font-semibold tracking-[-0.03em] text-[#E8F6FA]">
                                {client.name}
                              </h3>
                              <div className="mt-1 truncate font-mono text-xs text-[#0A7B9E]">
                                {client.subdomain}.anlyfn.com
                              </div>
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                              client.active
                                ? 'border-[#10B981]/20 bg-[#10B981]/8 text-[#10B981]'
                                : 'border-[#64748B]/20 bg-[#64748B]/8 text-[#94A3B8]'
                            }`}
                          >
                            {client.active ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>

                        <p className="min-h-[48px] text-sm leading-6 text-[#4A8FA3]">
                          {client.tagline?.trim() ||
                            'Sin tagline todavia. El editor esta listo para completar identidad y configuracion.'}
                        </p>

                        <div className="grid grid-cols-3 gap-3">
                          {[
                            {
                              label: 'Modulos',
                              value: countActiveModules(client.modules),
                            },
                            {
                              label: 'Dominio',
                              value: client.custom_domain ? 'Custom' : 'Base',
                            },
                            {
                              label: 'Estado',
                              value: client.active ? 'Online' : 'Pausa',
                            },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="rounded-2xl border border-[#0A7B9E]/8 bg-[#020F16] px-3 py-3"
                            >
                              <div className="text-sm font-semibold text-[#E8F6FA]">
                                {item.value}
                              </div>
                              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#1E4D5C]">
                                {item.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {activeModules.length > 0 ? (
                            activeModules.map((key) => (
                              <span
                                key={key}
                                className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                                style={{
                                  color: MODULE_CONFIG[key].color,
                                  borderColor: `${MODULE_CONFIG[key].color}30`,
                                  background: MODULE_CONFIG[key].bg,
                                }}
                              >
                                {MODULE_CONFIG[key].name}
                              </span>
                            ))
                          ) : (
                            <span className="rounded-full border border-[#0A7B9E]/12 bg-[#020F16] px-2.5 py-1 text-[11px] font-semibold text-[#4A8FA3]">
                              Sin modulos activos
                            </span>
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-[#0A7B9E]/10 pt-4 text-sm">
                          <span className="font-medium text-[#7BBFD6]">
                            Abrir editor
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#1E4D5C] transition-colors duration-300 group-hover:text-[#0A7B9E]">
                            Entrar
                            <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
