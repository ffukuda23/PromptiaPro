'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError('Não foi possível enviar o e-mail. Verifique o endereço informado.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md p-8 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--foreground)' }}>
          Esqueci minha senha
        </h1>

        {sent ? (
          <div className="text-center mt-6">
            <div className="text-5xl mb-4">📧</div>
            <p className="mb-2 font-medium" style={{ color: 'var(--foreground)' }}>E-mail enviado!</p>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Verifique sua caixa de entrada e clique no link para criar uma nova senha.
              O link expira em 1 hora.
            </p>
            <Link href="/auth/login" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
              Voltar ao login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm mb-6 text-center" style={{ color: 'var(--muted)' }}>
              Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Seu e-mail cadastrado"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--accent)' }}
              >
                {loading ? 'Enviando...' : 'Enviar link de redefinição'}
              </button>
            </form>
            <p className="text-center text-sm mt-4" style={{ color: 'var(--muted)' }}>
              Lembrou a senha?{' '}
              <Link href="/auth/login" className="hover:underline" style={{ color: 'var(--accent)' }}>
                Fazer login
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  )
}

