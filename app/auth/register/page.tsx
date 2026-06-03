'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: 'https://www.promptiapro.com.br/auth/login'
      }
    })
       if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="font-display text-2xl font-black mb-2">Confirme seu e-mail</h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Enviamos um link de confirmação para <strong>{email}</strong>. Clique no link para ativar sua conta.</p>
          <Link href="/auth/login" className="inline-block mt-6 text-sm" style={{ color: 'var(--accent2)' }}>Ir para o login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl font-black">Prompt<span style={{ color: 'var(--accent)' }}>IA</span>Pro</Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Crie sua conta gratuita</p>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Nome completo</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>E-mail</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Senha</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" minLength={8}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }} />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--accent)' }}>
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
        </form>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
          Já tem conta?{' '}
          <Link href="/auth/login" className="font-medium" style={{ color: 'var(--accent2)' }}>Entrar</Link>
        </p>
      </div>
    </div>
  )
}
