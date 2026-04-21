import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from './LoginForm'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Si ya hay sesión activa, redirigir al admin
  if (user) {
    redirect('/admin')
  }

  const params = await searchParams
  const next = params.next || '/admin'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Anlyfn Studio
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Panel de administración
          </p>
        </div>
        <LoginForm next={next} />
      </div>
    </div>
  )
}
