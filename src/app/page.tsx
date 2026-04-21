import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('clients')
    .select('count')
    .single()

  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Anlyfn Studio</h1>
      <p>Estado de conexión Supabase:</p>
      {error ? (
        <p style={{ color: 'red' }}>
          Error: {error.message}
        </p>
      ) : (
        <p style={{ color: 'green' }}>
          Conexión exitosa. Clientes en DB: {JSON.stringify(data)}
        </p>
      )}
    </main>
  )
}
