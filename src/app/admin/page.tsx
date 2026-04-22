import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardShell } from '@/components/admin/DashboardShell'
import { MODULE_KEYS } from '@/lib/modules'

export default async function AdminPage() {
  const supabase = await createClient()

  // Verificar sesión
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Query: clientes con módulos en una sola llamada
  const { data: clientsRaw, error: clientsError } =
    await supabase
      .from('clients')
      .select(`
        id,
        name,
        subdomain,
        slug,
        active,
        created_at,
        logo_url,
        primary_color,
        secondary_color,
        font,
        whatsapp,
        custom_domain,
        modules (
          id, client_id,
          announcement_bar, navigation_menu, hero_section,
          product_catalog, whatsapp_button, contact_form,
          gallery, about_section, reviews_section,
          paypal_button, footer
        )
      `)
      .order('created_at', { ascending: false })

  if (clientsError) {
    console.error('Error fetching clients:', clientsError)
  }

  // Query: total de productos
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  // Normalizar datos: modules viene como array,
  // necesitamos el primer elemento
  const clients = (clientsRaw ?? []).map(client => ({
    ...client,
    modules: Array.isArray(client.modules)
      ? (client.modules[0] ?? null)
      : (client.modules ?? null),
  }))

  // Calcular métricas
  const totalClients = clients.length
  const activeSites = clients.filter(c => c.active).length
  const totalModules = clients.reduce((sum, client) => {
    if (!client.modules) return sum
    return sum + MODULE_KEYS.filter(
      k => (client.modules as Record<string, unknown>)[k] === true
    ).length
  }, 0)

  return (
    <DashboardShell
      clients={clients}
      metrics={{
        totalClients,
        activeSites,
        totalProducts: totalProducts ?? 0,
        totalModules,
      }}
    />
  )
}
