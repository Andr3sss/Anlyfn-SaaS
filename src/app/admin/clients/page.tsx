import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: clients } = await supabase
    .from('clients')
    .select('id, name, subdomain, active')
    .order('created_at', { ascending: false })

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020F16',
      color: '#E8F6FA',
      fontFamily: 'system-ui',
      padding: '40px',
    }}>
      <h1 style={{ fontSize: '20px', marginBottom: '8px' }}>
        Todos los clientes
      </h1>
      <p style={{ color: '#4A8FA3', fontSize: '13px',
                  marginBottom: '32px' }}>
        {clients?.length ?? 0} registros · Diseño completo en Fase 4B
      </p>
      <div style={{ display: 'flex', flexDirection: 'column',
                    gap: '8px' }}>
        {clients?.map(c => (
          <a
            key={c.id}
            href={`/admin/clients/${c.id}`}
            style={{
              padding: '12px 16px',
              background: '#040E16',
              border: '1px solid rgba(10,123,158,0.15)',
              borderRadius: '10px',
              color: '#C8E8F0',
              textDecoration: 'none',
              fontSize: '13px',
            }}
          >
            {c.name} — {c.subdomain}
          </a>
        ))}
      </div>
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
