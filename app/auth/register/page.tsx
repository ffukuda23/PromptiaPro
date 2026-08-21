'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

/* ── Logo (mesmo do navbar da home e do login) ───────────────────────── */
const LogoNavbar = () => (
  <svg width="160" height="32" viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 18) scale(0.32)">
      <polygon points="55,30 110,30 155,50 175,105 155,160 100,185 45,165 25,105" fill="none" stroke="#a855f7" strokeWidth="5"/>
      <circle cx="88" cy="107" r="11" fill="#e879f9"/>
      <circle cx="110" cy="107" r="11" fill="#c084fc"/>
      <circle cx="132" cy="107" r="11" fill="#e879f9"/>
    </g>
    <text x="108" y="68" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="40" fontWeight="700" fill="#ffffff" letterSpacing="-1">Prompt</text>
    <rect x="263" y="33" width="56" height="42" rx="6" fill="#7c3aed"/>
    <text x="291" y="68" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="36" fontWeight="800" fill="#f0abfc" textAnchor="middle">IA</text>
    <text x="328" y="68" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="40" fontWeight="700" fill="#c084fc"> Pro</text>
  </svg>
)

/* ── Ícone do Google ─────────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

/* ── Mini-navbar compartilhado ───────────────────────────────────────── */
const AuthNav = () => (
  <nav
    className="flex items-center justify-between px-6 py-4 border-b"
    style={{ borderColor: 'var(--border)' }}
  >
    <Link href="/" aria-label="Voltar para a home">
      <LogoNavbar />
    </Link>
    <Link
      href="/"
      className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
      style={{ color: 'var(--muted)' }}
    >
      ← Voltar ao site
    </Link>
  </nav>
)

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  // signInWithOAuth cria conta se não existir, faz login se já existir —
  // o Supabase cuida dos dois casos com o mesmo provider.
  async function handleGoogleRegister() {
    setGoogleLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError('Erro ao continuar com Google. Tente novamente.')
      setGoogleLoading(false)
    }
  }

  /* ── Tela de confirmação de e-mail ─────────────────────────────────── */
  if (success) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <AuthNav />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="font-display text-2xl font-black mb-2">Confirme seu e-mail</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Enviamos um link de confirmação para <strong className="text-white">{email}</strong>.
              Clique no link para ativar sua conta.
            </p>
            <Link
              href="/auth/login"
              className="inline-block mt-6 text-sm font-medium hover:underline"
              style={{ color: 'var(--accent2)' }}
            >
              Ir para o login →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Formulário de cadastro ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <AuthNav />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-black mb-2">Crie sua conta grátis</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>50+ prompts profissionais sem cartão de crédito</p>
          </div>

          {/* ── Botão Google ─────────────────────────────────────────── */}
          <button
            onClick={handleGoogleRegister}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium border transition-all hover:opacity-80 disabled:opacity-50 mb-4"
            style={{ background: 'var(--surface)', borderColor: 'var(--border2)', color: '#F0EFF8' }}
          >
            <GoogleIcon />
            {googleLoading ? 'Redirecionando…' : 'Cadastrar com Google'}
          </button>

          {/* ── Separador ────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--subtle)' }}>ou cadastre com e-mail</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* ── Formulário e-mail/senha ──────────────────────────────── */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Nome completo</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border focus:border-[var(--accent)]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>E-mail</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border focus:border-[var(--accent)]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Senha</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres" minLength={8}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border focus:border-[var(--accent)]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: '#F0EFF8' }}
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit" disabled={loading || googleLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ background: 'var(--accent)' }}
            >
              {loading ? 'Criando conta…' : 'Criar conta grátis →'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
            Já tem conta?{' '}
            <Link href="/auth/login" className="font-semibold" style={{ color: 'var(--accent2)' }}>
              Entrar
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
