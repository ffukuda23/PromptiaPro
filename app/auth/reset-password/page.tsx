'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('Não foi possível atualizar a senha. O link pode ter expirado — solicite um novo.')
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 3000)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md p-8 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--foreground)' }}>
          Criar nova senha
        </h1>

        {success ? (
          <div className="text-center mt-6">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-medium" style={{ color: 'var(--foreground)' }}>Senha atualizada com sucesso!</p>
            <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Redirecionando para o dashboard...</p>
          </div>
        ) : (
          <>
            <p className="text-sm mb-6 text-center" style={{ color: 'var(--muted)' }}>
              Digite sua nova senha abaixo.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Nova senha (mín. 6 caracteres)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
              <input
                type="password"
                placeholder="Confirme a nova senha"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
              {error && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-red-400">{error}</p>
                  {error.includes('expirado') && (
                    <a href="/auth/forgot-password" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                      Solicitar novo link →
                    </a>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--accent)' }}
              >
                {loading ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}

