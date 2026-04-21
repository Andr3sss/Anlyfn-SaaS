import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'white', background: '#0c0c10', minHeight: '100vh' }}>
      <h1>Admin — Fase 2 verificada</h1>
      <p style={{ color: '#4ade80', marginTop: '1rem' }}>
        Sesión activa: {user.email}
      </p>
      <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.8rem' }}>
        Esta página se reemplaza en la Fase 3.
      </p>
    </div>
  )
}
