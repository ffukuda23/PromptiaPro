'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const ADMIN_EMAIL = 'catanduvamdfecommerce@gmail.com'

type Stats = {
  total: number
  hoje: number
  semana: number
  mes: number
  pro: number
  free: number
}

type Usuario = {
  id: string
  plan: string
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')
  const [filtroPlano, setFiltroPlano] = useState<'todos' | 'pro' | 'free'>('todos')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('')

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/dashboard')
        return
      }
      await carregarDados()
    }
    init()
  }, [])

  async function carregarDados() {
    setLoading(true)
    const agora = new Date()
    const inicioHoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate()).toISOString()
    const inicioSemana = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString()

    const res = await fetch('/api/admin/users')
    const subs = await res.json()

    if (!subs || !Array.isArray(subs)) { setLoading(false); return }

    const usuariosFormatados: Usuario[] = subs.map((s: any) => ({
      id: s.user_id,
      plan: s.plan || 'free',
      created_at: s.created_at,
    }))

    const total = subs.length
    const hoje = subs.filter((s: any) => s.created_at >= inicioHoje).length
    const semana = subs.filter((s: any) => s.created_at >= inicioSemana).length
    const mes = subs.filter((s: any) => s.created_at >= inicioMes).length
    const pro = subs.filter((s: any) => s.plan === 'pro').length
    const free = total - pro

    setStats({ total, hoje, semana, mes, pro, free })
    setUsuarios(usuariosFormatados)
    setUltimaAtualizacao(new Date().toLocaleTimeString('pt-BR'))
    setLoading(false)
  }

  const usuariosFiltrados = usuarios.filter(u => {
    const matchBusca = u.id.toLowerCase().includes(busca.toLowerCase())
    const matchPlano = filtroPlano === 'todos' || u.plan === filtroPlano
    return matchBusca && matchPlano
  })

  const taxaConversao = stats && stats.total > 0
    ? ((stats.pro / stats.total) * 100).toFixed(1)
    : '0'

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <div className="text-3xl mb-3">⏳</div>
        <p style={{ color: 'var(--muted)' }}>Carregando dados...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen p-6 md:p-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              📊 Painel Admin
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Monitoramento de usuários · PromptIA Pro
              {ultimaAtualizacao && <span className="ml-2 opacity-60">· atualizado às {ultimaAtualizacao}</span>}
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/dashboard" className="px-4 py-2 rounded-xl text-sm border hover:opacity-80" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              ← Dashboard
            </a>
            <button
              onClick={carregarDados}
              className="px-4 py-2 rounded-xl text-sm border hover:opacity-80"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
            >
              🔄 Atualizar
            </button>
          </div>
        </div>

        {/* Cards de métricas */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Total de usuários', value: stats.total, icon: '👥', color: '#7C6FF7' },
              { label: 'Novos hoje', value: stats.hoje, icon: '📅', color: '#10b981' },
              { label: 'Últimos 7 dias', value: stats.semana, icon: '📆', color: '#3b82f6' },
              { label: 'Este mês', value: stats.mes, icon: '🗓️', color: '#8b5cf6' },
              { label: 'Plano Pro', value: stats.pro, icon: '⭐', color: '#E8C96B' },
              { label: 'Plano Free', value: stats.free, icon: '🆓', color: '#6b7280' },
            ].map(card => (
              <div key={card.label} className="p-4 rounded-2xl border flex flex-col gap-2" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xl">{card.icon}</span>
                <span className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</span>
                <span className="text-xs leading-tight" style={{ color: 'var(--muted)' }}>{card.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Barras de distribuição + taxa de conversão */}
        {stats && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-6 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--foreground)' }}>Distribuição de planos</h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs w-8 text-right font-medium" style={{ color: 'var(--muted)' }}>Pro</span>
                <div className="flex-1 h-7 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${stats.total > 0 ? Math.max((stats.pro / stats.total) * 100, 2) : 0}%`, background: 'linear-gradient(90deg, #c8a800, #E8C96B)' }}
                  >
                    {stats.pro > 0 && <span className="text-xs font-bold text-black">{stats.pro}</span>}
                  </div>
                </div>
                <span className="text-xs font-bold w-10 text-right" style={{ color: '#E8C96B' }}>
                  {stats.total > 0 ? Math.round((stats.pro / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs w-8 text-right font-medium" style={{ color: 'var(--muted)' }}>Free</span>
                <div className="flex-1 h-7 rounded-full overflow-hidden" style={{ background: 'var(--bg)' }}>
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${stats.total > 0 ? Math.max((stats.free / stats.total) * 100, 2) : 0}%`, background: 'linear-gradient(90deg, #5b4fd4, #7C6FF7)' }}
                  >
                    {stats.free > 0 && <span className="text-xs font-bold text-white">{stats.free}</span>}
                  </div>
                </div>
                <span className="text-xs font-bold w-10 text-right" style={{ color: '#7C6FF7' }}>
                  {stats.total > 0 ? Math.round((stats.free / stats.total) * 100) : 0}%
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--foreground)' }}>Taxa de conversão Free → Pro</h2>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black" style={{ color: '#E8C96B' }}>{taxaConversao}%</span>
                <span className="text-sm mb-2" style={{ color: 'var(--muted)' }}>dos usuários são Pro</span>
              </div>
              <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>
                {stats.pro} usuário{stats.pro !== 1 ? 's' : ''} Pro de {stats.total} total
              </p>
              <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  💡 Benchmark SaaS: taxa saudável é 2–5% de free para pago
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de usuários */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="p-4 border-b flex flex-wrap items-center gap-3" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Usuários ({usuariosFiltrados.length}{filtroPlano !== 'todos' ? ` ${filtroPlano}` : ''})
            </h2>
            <div className="flex gap-2 ml-auto flex-wrap">
              {(['todos', 'pro', 'free'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setFiltroPlano(p)}
                  className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                  style={{
                    borderColor: filtroPlano === p ? 'var(--accent)' : 'var(--border)',
                    background: filtroPlano === p ? 'rgba(124,111,247,0.15)' : 'transparent',
                    color: filtroPlano === p ? 'var(--accent)' : 'var(--muted)',
                  }}
                >
                  {p === 'todos' ? 'Todos' : p === 'pro' ? '⭐ Pro' : '🆓 Free'}
                </button>
              ))}
              <input
                type="text"
                placeholder="Buscar por ID..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className="px-3 py-1 rounded-lg border text-xs outline-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--foreground)', width: '180px' }}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>#</th>
                  <th className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>User ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>Plano</th>
                  <th className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>Data de cadastro</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u, i) => (
                  <tr
                    key={u.id}
                    style={{ borderBottom: i < usuariosFiltrados.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--foreground)' }}>
                      {u.id.slice(0, 8)}...{u.id.slice(-6)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: u.plan === 'pro' ? 'rgba(232,201,107,0.15)' : 'rgba(124,111,247,0.15)',
                          color: u.plan === 'pro' ? '#E8C96B' : '#7C6FF7',
                        }}
                      >
                        {u.plan === 'pro' ? '⭐ Pro' : '🆓 Free'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                      {new Date(u.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
                {usuariosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm" style={{ color: 'var(--muted)' }}>
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs mt-6 text-center" style={{ color: 'var(--muted)', opacity: 0.5 }}>
          Acesso restrito ao administrador · promptiapro.com.br/admin
        </p>
      </div>
    </main>
  )
}

