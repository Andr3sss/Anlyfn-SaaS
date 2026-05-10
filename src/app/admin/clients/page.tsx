import { redirect } from 'next/navigation'
import { ClientsDirectory } from '@/components/admin/ClientsDirectory'
import { createClient } from '@/lib/supabase/server'
import type { ClientWithModules } from '@/types/database'

export default async function ClientsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: clientsRaw, error } = await supabase
    .from('clients')
    .select('*, modules (*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients for directory:', error)
  }

  const clients = (clientsRaw ?? []).map((client) => ({
    ...client,
    modules: Array.isArray(client.modules)
      ? (client.modules[0] ?? null)
      : (client.modules ?? null),
  })) as ClientWithModules[]

  return (
    <ClientsDirectory
      clients={clients}
    />
  )
}
