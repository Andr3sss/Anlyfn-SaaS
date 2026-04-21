'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface LoginFormProps {
  next: string
}

export default function LoginForm({ next }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.')
        return
      }

      // Verificar que el email coincide con el admin autorizado
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      if (adminEmail && data.user?.email !== adminEmail) {
        await supabase.auth.signOut()
        setError('No tienes permiso para acceder a este panel.')
        return
      }

      router.push(next)
      router.refresh()
    } catch {
      setError('Error inesperado. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-800 
                     rounded-lg text-white placeholder-gray-600 text-sm
                     focus:outline-none focus:border-blue-500 focus:ring-1 
                     focus:ring-blue-500 disabled:opacity-50"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-800 
                     rounded-lg text-white placeholder-gray-600 text-sm
                     focus:outline-none focus:border-blue-500 focus:ring-1 
                     focus:ring-blue-500 disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-950 border border-red-900 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 
                   disabled:bg-blue-900 disabled:cursor-not-allowed
                   text-white text-sm font-medium rounded-lg 
                   transition-colors duration-150"
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
