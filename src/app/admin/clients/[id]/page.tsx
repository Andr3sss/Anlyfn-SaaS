import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

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
    .select('id, name, subdomain')
    .eq('id', id)
    .single()

  if (!client) notFound()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020F16',
      color: '#E8F6FA',
      fontFamily: 'system-ui',
      padding: '40px',
    }}>
      <h1 style={{ fontSize: '20px', marginBottom: '8px' }}>
        Editar: {client.name}
      </h1>
      <p style={{ color: '#4A8FA3', fontSize: '13px' }}>
        Formulario completo se construye en Fase 4B
      </p>
      <a
        href="/admin"
        style={{ display: 'block', marginTop: '24px',
                 color: '#0A7B9E', fontSize: '12px' }}
      >
        ← Volver al dashboard
      </a>
    </div>
  )
}
