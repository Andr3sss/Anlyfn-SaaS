import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NewClientForm } from '@/components/admin/NewClientForm'

export default async function NewClientPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020F16',
    }}>
      <NewClientForm />
    </div>
  )
}
