'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import TermosModal from '../components/TermosModal'
import type { Prompt, UserProfile } from '@/types'

const GROUPS = [
  { key: 'Financeiro Pessoal', icon: '💰', subs: ['Controle de Finanças Pessoais', 'Estratégia de Investimentos'] },
  { key: 'Empresa Varejo', icon: '🏪', subs: ['Fluxo de Caixa', 'Precificação', 'DRE', 'Estratégias de Venda'] },
  { key: 'Empresa Atacado', icon: '📦', subs: ['Fluxo de Caixa', 'Precificação', 'DRE', 'Estratégias de Venda'] },
  { key: 'Empresa Indústria', icon: '🏭', subs: ['Fluxo de Caixa', 'Precificação', 'DRE', 'Estratégias de Venda'] },
  { key: 'Empresa Serviços', icon: '🛎️', subs: ['Fluxo de Caixa', 'Precificação', 'DRE', 'Estratégias de Venda'] },
  { key: 'Jurídico', icon: '⚖️', subs: ['Contratos', 'Trabalhista', 'Consumidor'] },
  { key: 'Resumo Econômico', icon: '📈', subs: ['Cenário Brasil', 'Câmbio', 'Internacional'] },
  { key: 'Laudos Médicos', icon: '🩺', subs: ['Exames Laboratoriais', 'Laudos de Imagem', 'Receituários'] },
  { key: 'Receitas Culinárias', icon: '🍳', subs: ['Do Zero', 'Aproveitamento', 'Restrições'] },
  { key: 'Treinos Físicos', icon: '💪', subs: ['Musculação', 'Flexibilidade', 'Cardio'] },
  { key: 'Vendas E-commerce', icon: '🛒', subs: ['Fotos Fundo Branco', 'Fotos Ambientadas', 'Descrição', 'Título'] },
  { key: 'Novos Idiomas', icon: '🌍', subs: ['Inglês', 'Espanhol', 'Mandarim'] },
  { key: 'Carreira', icon: '🎯', subs: ['Currículo', 'Entrevistas'] },
  { key: 'IA no Trabalho', icon: '🤖', subs: ['Automação', 'Produtividade'] },
  { key: 'Festas e Eventos', icon: '🎉', subs: ['Confeiteiras', 'Decoradores de Festa'] },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [selectedGroup, setSelectedGroup] = useState(GROUPS[0].key)
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [copied, setCopied] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showTermos, setShowTermos] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/auth/login'); return }

      // Verificar se já aceitou os termos
      const { data: consent } = await supabase
        .from('user_consents')
        .select('id')
        .eq('user_id', authUser.id)
        .single()

      if (!consent) {
        setShowTermos(true)
      }

      const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_id', authUser.id).single()
      setUser({ id: authUser.id, email: authUser.email!, plan: sub?.plan || 'free', subscription: sub })
      const { data: promptsData } = await supabase.from('prompts').select('*').order('created_at', { ascending: false })
      setPrompts(promptsData || [])
      const { data: favsData } = await supabase.from('favorites').select('prompt_id').eq('user_id', authUser.id)
      setFavorites(favsData?.map(f => f.prompt_id) || [])
    }
    load()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function toggleFavorite(promptId: string) {
    if (!user) return
    if (favorites.includes(promptId)) {
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('prompt_id', promptId)
      setFavorites(f => f.filter(id => id !== promptId))
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, prompt_id: promptId })
      setFavorites(f => [...f, promptId])
    }
  }

  function copyPrompt(body: string) {
    navigator.clipboard.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filtered = prompts.filter(p => {
    const matchGroup = p.group_name === selectedGroup
    const matchSearch = search ? p.title.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()) : true
    const currentGroup = GROUPS.find(g => g.key === selectedGroup)
    const hasSubs = currentGroup?.subs && currentGroup.subs.length > 0
    const matchSub = hasSubs && selectedSub ? p.subgroup === selectedSub : true
    return matchGroup && matchSearch && matchSub
  })

  const currentGroup = GROUPS.find(g => g.key === selectedGroup)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>

      {/* MODAL DE TERMOS */}
      {showTermos && <TermosModal onAccept={() => setShowTermos(false)} />}

      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-0'} flex-shrink-0 transition-all overflow-hidden border-r`} style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="font-display text-base font-black">Prompt<span style={{ color: 'var(--accent)' }}>IA</span>Pro</div>
          <div className="text-xs mt-1 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: user?.plan === 'pro' ? '#4ADE80' : 'var(--muted)' }} />
            {user?.plan === 'pro' ? 'Plano Pro' : 'Plano Free'}
          </div>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          {GROUPS.map(g => (
            <button key={g.key} onClick={() => { setSelectedGroup(g.key); setSelectedSub(null) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors"
              style={{ background: selectedGroup === g.key ? 'var(--surface)' : 'transparent', color: selectedGroup === g.key ? '#F0EFF8' : 'var(--muted)', fontWeight: selectedGroup === g.key ? '500' : '400' }}>
              <span>{g.icon}</span>{g.key}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="flex items-center gap-3 px-5 py-3 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-sm p-1.5 rounded-lg hover:bg-surface" style={{ color: 'var(--muted)' }}>☰</button>
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar prompts..."
              className="flex-1 bg-transparent outline-none text-sm" style={{ color: '#F0EFF8' }} />
          </div>
          {user?.plan !== 'pro' && (
            <a href="/upgrade" className="px-4 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap" style={{ background: 'var(--accent)' }}>
              Upgrade Pro
            </a>
          )}
          <button onClick={handleLogout} className="text-xs px-3 py-1.5 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>Sair</button>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{currentGroup?.icon}</span>
            <h1 className="font-display text-lg font-bold">{selectedGroup}</h1>
          </div>
          <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>{filtered.length} prompts disponíveis</p>

          {/* SUBGROUP TABS */}
          {currentGroup?.subs && (
            <div className="flex gap-2 flex-wrap mb-5">
              <button onClick={() => setSelectedSub(null)}
                className="text-xs px-3 py-1 rounded-full border transition-colors"
                style={{ borderColor: selectedSub === null ? 'var(--accent)' : 'var(--border)', color: selectedSub === null ? 'var(--accent2)' : 'var(--muted)', background: selectedSub === null ? 'rgba(124,111,247,0.1)' : 'transparent' }}>
                Todos
              </button>
              {currentGroup.subs.map(s => (
                <button key={s} onClick={() => setSelectedSub(s)}
                  className="text-xs px-3 py-1 rounded-full border transition-colors"
                  style={{ borderColor: selectedSub === s ? 'var(--accent)' : 'var(--border)', color: selectedSub === s ? 'var(--accent2)' : 'var(--muted)', background: selectedSub === s ? 'rgba(124,111,247,0.1)' : 'transparent' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm">Nenhum prompt encontrado.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map(p => {
                const isPro = p.plan === 'pro'
                const locked = isPro && user?.plan !== 'pro'
                return (
                  <div key={p.id} className="flex flex-col p-4 rounded-xl border transition-all hover:border-opacity-50" style={{ background: 'var(--surface)', borderColor: isPro ? 'rgba(232,201,107,0.2)' : 'var(--border)', borderLeftWidth: isPro ? '2px' : '1px' }}>
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 self-start" style={isPro ? { background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' } : { background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}>
                      {isPro ? '⭐ Pro' : 'Gratuito'}
                    </span>
                    <h3 className="font-display text-sm font-bold mb-1 leading-tight">{p.title}</h3>
                    <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: 'var(--muted)' }}>{p.description}</p>
                    {p.subgroup && <p className="text-xs mb-3" style={{ color: 'var(--subtle)' }}>{p.subgroup}</p>}
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => !locked && setSelectedPrompt(p)} disabled={locked}
                        className="flex-1 py-2 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>
                        {locked ? '🔒 Ver prompt' : '👁 Ver prompt'}
                      </button>
                      <button onClick={() => toggleFavorite(p.id)}
                        className="px-2.5 py-2 rounded-lg border text-xs transition-colors"
                        style={{ borderColor: 'var(--border)', color: favorites.includes(p.id) ? '#F87171' : 'var(--muted)' }}>
                        {favorites.includes(p.id) ? '♥' : '♡'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL PROMPT */}
      {selectedPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={() => setSelectedPrompt(null)}>
          <div className="w-full max-w-lg rounded-2xl border p-6 max-h-[80vh] overflow-y-auto" style={{ background: 'var(--surface)', borderColor: 'var(--border2)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-base font-bold">{selectedPrompt.title}</h2>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{selectedPrompt.group_name}{selectedPrompt.subgroup ? ` › ${selectedPrompt.subgroup}` : ''}</p>
              </div>
              <button onClick={() => setSelectedPrompt(null)} className="text-lg ml-4 leading-none" style={{ color: 'var(--muted)' }}>×</button>
            </div>
            <div className="p-4 rounded-xl text-xs leading-relaxed font-mono mb-4 whitespace-pre-wrap" style={{ background: 'var(--bg)', color: 'var(--muted)' }}>
              {selectedPrompt.body}
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setSelectedPrompt(null)} className="px-4 py-2 rounded-lg text-sm border" style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>Fechar</button>
              <button onClick={() => copyPrompt(selectedPrompt.body)} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: copied ? '#4ADE80' : 'var(--accent)' }}>
                {copied ? '✓ Copiado!' : '📋 Copiar prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
