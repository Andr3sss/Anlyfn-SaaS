import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EditClientForm } from '@/components/admin/EditClientForm'

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { id } = await params

  const { data: client } = await supabase
    .from('clients')
    .select('*, modules(*)')
    .eq('id', id)
    .single()

  if (!client) notFound()

  return <EditClientForm client={client} />
}
