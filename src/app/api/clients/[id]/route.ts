import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params

  const { data: client, error } = await supabase
    .from('clients')
    .select('*, modules(*)')
    .eq('id', id)
    .single()

  if (error || !client) {
    return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
  }

  return NextResponse.json(client)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const body = await request.json()

  const { modules: moduleUpdates, ...rest } = body

  // Strip non-updatable fields
  const { id: _id, created_at: _ca, slug: _slug, subdomain: _sub, ...clientFields } = rest

  const { error: clientError } = await supabase
    .from('clients')
    .update(clientFields)
    .eq('id', id)

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 500 })
  }

  if (moduleUpdates) {
    const { error: moduleError } = await supabase
      .from('modules')
      .update(moduleUpdates)
      .eq('client_id', id)

    if (moduleError) {
      return NextResponse.json({ error: moduleError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
