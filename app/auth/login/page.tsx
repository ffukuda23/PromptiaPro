export const dynamic = 'force-dynamic'
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl font-black">Prompt<span style={{ color: 'var(--accent)' }}>IA</span>Pro</Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Entre na sua conta</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>E-mail</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors focus:border-accent"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Senha</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }}
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--accent)' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
          Não tem conta?{' '}
          <Link href="/auth/register" className="font-medium" style={{ color: 'var(--accent2)' }}>Criar conta grátis</Link>
        </p>
      </div>
    </div>
  )
}
