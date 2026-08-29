'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import TermosModal from '../components/TermosModal'
import type { Prompt, UserProfile } from '@/types'

// ─── Tipos e configuração de formato ─────────────────────────────────────────
type Format = 'texto' | 'imagem' | 'video'

const FORMAT_CONFIG = {
  texto:  { label: 'Texto',  color: '#7C6FF7', bg: 'rgba(124,111,247,0.15)', border: 'rgba(124,111,247,0.35)' },
  imagem: { label: 'Imagem', color: '#E040FB', bg: 'rgba(224,64,251,0.12)',  border: 'rgba(224,64,251,0.30)'  },
  video:  { label: 'Vídeo',  color: '#FF7043', bg: 'rgba(255,112,67,0.12)',  border: 'rgba(255,112,67,0.30)'  },
} as const

// ─── Árvore de temas ──────────────────────────────────────────────────────────
interface TemaConfig     { key: string; isNew?: boolean; isEnriquecida?: boolean }
interface CategoryConfig { key: string; icon: string; isNew?: boolean; temas: TemaConfig[] }

const TREE: Record<Format, CategoryConfig[]> = {
  texto: [
    {
      key: 'Trabalho e Produtividade', icon: '💼', isNew: true,
      temas: [
        { key: 'E-mails e comunicação profissional',  isNew: true },
        { key: 'Reuniões e atas',                     isNew: true },
        { key: 'Priorização e gestão de tempo',       isNew: true },
        { key: 'Delegação e gestão de equipes',       isNew: true },
        { key: 'Feedback e avaliação de desempenho',  isNew: true },
        { key: 'Apresentações e slides',              isNew: true },
        { key: 'Relatórios e documentos corporativos',isNew: true },
        { key: 'Produtividade pessoal e rotina',      isNew: true },
      ],
    },
    {
      key: 'Pequenos Negócios e Empreendedorismo', icon: '🚀',
      temas: [
        { key: 'Marketing Digital' },
        { key: 'Marketing Empresarial' },
        { key: 'Personalização de Produtos' },
        { key: 'Vendas E-commerce' },
        { key: 'Locação de Imóveis' },
        { key: 'Compra e Venda de Automóveis' },
        { key: 'Festas e Eventos' },
      ],
    },
    {
      key: 'Carreira', icon: '👔',
      temas: [
        { key: 'Carreira' },
        { key: 'RH Empresarial' },
        { key: 'Secretária Particular' },
        { key: 'Estudantes Universitários' },
        { key: 'Novos Idiomas' },
      ],
    },
    {
      key: 'Financeiro Pessoal', icon: '💰',
      temas: [
        { key: 'Financeiro Pessoal' },
        { key: 'Resumo Econômico' },
      ],
    },
    {
      key: 'Empresas por Segmento e Gestão', icon: '🏢',
      temas: [
        { key: 'Empresa Varejo' },
        { key: 'Empresa Atacado' },
        { key: 'Empresa Indústria' },
        { key: 'Empresa Serviços' },
      ],
    },
    {
      key: 'Vendas e Documentos Especializados', icon: '📄',
      temas: [
        { key: 'Jurídico' },
      ],
    },
    {
      key: 'Saúde e Qualidade de Vida', icon: '🧘',
      temas: [
        { key: 'Laudos Médicos' },
        { key: 'Saúde e Qualidade de Vida' },
        { key: 'Treinos Físicos' },
        { key: 'Receitas Culinárias' },
      ],
    },
  ],
  imagem: [
    { key: 'Redes Sociais e Marketing Visual', icon: '📸', isNew: true,
      temas: [{ key: 'Posts para Instagram', isNew: true }, { key: 'Stories e Reels', isNew: true }, { key: 'Capas de YouTube', isNew: true }] },
    { key: 'Design e Identidade Visual', icon: '🎨', isNew: true,
      temas: [{ key: 'Logotipos e Marcas', isNew: true }, { key: 'Apresentações Visuais', isNew: true }] },
    { key: 'Produtos e E-commerce', icon: '🛍️', isNew: true,
      temas: [{ key: 'Fotos de Produto', isNew: true }, { key: 'Banners Promocionais', isNew: true }] },
    { key: 'Arte e Criatividade', icon: '🖼️', isNew: true,
      temas: [{ key: 'Ilustrações', isNew: true }, { key: 'Arte Conceitual', isNew: true }] },
  ],
  video: [
    { key: 'Marketing em Vídeo', icon: '🎥', isNew: true,
      temas: [{ key: 'Anúncios e Ads', isNew: true }, { key: 'Vídeos para Redes Sociais', isNew: true }] },
    { key: 'Educação e Tutoriais', icon: '📚', isNew: true,
      temas: [{ key: 'Aulas Online', isNew: true }, { key: 'Tutoriais Práticos', isNew: true }] },
    { key: 'Storytelling e Narrativa', icon: '🎬', isNew: true,
      temas: [{ key: 'Shorts e Reels', isNew: true }, { key: 'Documentários Curtos', isNew: true }] },
  ],
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter()
  const [user,           setUser]           = useState<UserProfile | null>(null)
  const [prompts,        setPrompts]        = useState<Prompt[]>([])
  const [format,         setFormat]         = useState<Format>('texto')
  const [selCategory,    setSelCategory]    = useState<string | null>(null)
  const [selTema,        setSelTema]        = useState<string | null>(null)
  const [expanded,       setExpanded]       = useState<Set<string>>(new Set())
  const [search,         setSearch]         = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [copied,         setCopied]         = useState(false)
  const [favorites,      setFavorites]      = useState<string[]>([])
  const [sidebarOpen,    setSidebarOpen]    = useState(true)
  const [showTermos,     setShowTermos]     = useState(false)
  const [favoritesView,  setFavoritesView]  = useState(false)
  const [personalizing,  setPersonalizing]  = useState(false)
  const [varValues,      setVarValues]      = useState<Record<string, string>>({})
  const [personalizedBody, setPersonalizedBody] = useState<string | null>(null)

  // Carrega dados ao montar
  useEffect(() => {
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/auth/login'); return }

      const { data: consentList } = await supabase
        .from('user_consents').select('id').eq('user_id', authUser.id)
      if (!consentList || consentList.length === 0) setShowTermos(true)

      const { data: sub } = await supabase
        .from('subscriptions').select('*').eq('user_id', authUser.id).single()
      setUser({ id: authUser.id, email: authUser.email!, plan: sub?.plan || 'free', subscription: sub })

      const { data: promptsData } = await supabase
        .from('prompts').select('*').order('created_at', { ascending: false })
      setPrompts(promptsData || [])

      const { data: favsData } = await supabase
        .from('favorites').select('prompt_id').eq('user_id', authUser.id)
      setFavorites(favsData?.map((f: { prompt_id: string }) => f.prompt_id) || [])
    }
    load()
  }, [router])

  // Handlers de auth
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
      if (favorites.length >= 20) return // limite de 20 favoritos
      await supabase.from('favorites').insert({ user_id: user.id, prompt_id: promptId })
      setFavorites(f => [...f, promptId])
    }
  }

  function copyPrompt(body: string) {
    navigator.clipboard.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extrai variáveis únicas entre colchetes: [Nome do cliente] → ["Nome do cliente"]
  function extractVars(body: string): string[] {
    const matches = [...body.matchAll(/\[([^\]]+)\]/g)]
    return [...new Set(matches.map(m => m[1]))]
  }

  // Substitui [variável] pelos valores preenchidos
  function buildPersonalized(body: string, vals: Record<string, string>): string {
    return body.replace(/\[([^\]]+)\]/g, (_, key) => vals[key]?.trim() || `[${key}]`)
  }

  function openPersonalizar(body: string) {
    const vars = extractVars(body)
    const initial: Record<string, string> = {}
    vars.forEach(v => { initial[v] = '' })
    setVarValues(initial)
    setPersonalizedBody(null)
    setPersonalizing(true)
  }

  function closeModal() {
    setSelectedPrompt(null)
    setPersonalizing(false)
    setPersonalizedBody(null)
    setVarValues({})
  }

  function openPrompt(p: Prompt) {
    setSelectedPrompt(p)
    setPersonalizing(false)
    setPersonalizedBody(null)
    setVarValues({})
  }

  // Prompts favoritados (até 20)
  const favoritedPrompts = useMemo(() =>
    prompts.filter(p => favorites.includes(p.id)).slice(0, 20),
  [prompts, favorites])

  // Estado derivado
  const fc         = FORMAT_CONFIG[format]
  const categories = TREE[format]
  const curCat     = categories.find(c => c.key === selCategory)
  const curTema    = curCat?.temas.find(t => t.key === selTema)

  const countByGroup = useMemo(() => {
    const m: Record<string, number> = {}
    prompts.forEach(p => { m[p.group_name] = (m[p.group_name] || 0) + 1 })
    return m
  }, [prompts])

  // Prompts filtrados pelo tema selecionado
  const filteredPrompts = useMemo(() => {
    if (!selTema) return []
    const q = search.toLowerCase()
    return prompts.filter(p => {
      if (p.group_name !== selTema) return false
      if (q) return p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      return true
    })
  }, [prompts, selTema, search])

  // Resultados de busca global (sem tema selecionado)
  const searchResults = useMemo(() => {
    if (!search || selTema) return []
    const q = search.toLowerCase()
    return prompts.filter(p =>
      p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    )
  }, [prompts, search, selTema])

  // Navegação
  function selectCategory(key: string) {
    setFavoritesView(false)
    setSelCategory(key)
    setSelTema(null)
    setExpanded(prev => { const s = new Set(prev); s.add(key); return s })
  }

  function selectTema(temaKey: string, catKey: string) {
    setFavoritesView(false)
    setSelCategory(catKey)
    setSelTema(temaKey)
    setExpanded(prev => { const s = new Set(prev); s.add(catKey); return s })
    setSearch('')
  }

  function toggleExpand(key: string, e: React.MouseEvent) {
    e.stopPropagation()
    setExpanded(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s })
  }

  function changeFormat(f: Format) {
    setFavoritesView(false)
    setFormat(f)
    setSelCategory(null)
    setSelTema(null)
    setSearch('')
    setExpanded(new Set())
  }

  // Qual view mostrar no main
  const showFavorites = favoritesView && !search
  const showSearch    = !!search && !selTema && !favoritesView
  const showPrompts   = !!selTema && !favoritesView
  const showTemas     = !!selCategory && !selTema && !search && !favoritesView
  const showWelcome   = !selCategory && !search && !favoritesView

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>

      {/* Modal de termos */}
      {showTermos && <TermosModal onAccept={() => setShowTermos(false)} />}

      {/* ── SIDEBAR ── */}
      <aside
        className={`${sidebarOpen ? 'w-60' : 'w-0'} flex-shrink-0 transition-all duration-200 overflow-hidden border-r flex flex-col`}
        style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}
      >
        {/* Logo + plano */}
        <div className="p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="font-display text-base font-black">
            Prompt<span style={{ color: fc.color }}>IA</span>Pro
          </div>
          <div className="text-xs mt-1 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: user?.plan === 'pro' ? '#4ADE80' : 'var(--muted)' }}
            />
            {user?.plan === 'pro' ? 'Plano Pro' : 'Plano Free'}
          </div>
        </div>

        {/* Favoritos */}
        <div className="px-2 pt-2 pb-1 flex-shrink-0">
          <button
            onClick={() => {
              setFavoritesView(true)
              setSelCategory(null)
              setSelTema(null)
              setSearch('')
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors"
            style={{
              background:  favoritesView ? 'rgba(248,113,113,0.12)' : 'transparent',
              color:       favoritesView ? '#F87171' : 'var(--muted)',
              fontWeight:  favoritesView ? '600' : '400',
              border:      `1px solid ${favoritesView ? 'rgba(248,113,113,0.3)' : 'transparent'}`,
            }}
          >
            <span>{favoritesView ? '♥' : '♡'}</span>
            <span className="flex-1 text-left">Favoritos</span>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded"
              style={{
                background: favorites.length >= 20
                  ? 'rgba(248,113,113,0.2)'
                  : 'rgba(255,255,255,0.06)',
                color: favorites.length >= 20 ? '#F87171' : 'var(--subtle)',
              }}
            >
              {favorites.length}/20
            </span>
          </button>
        </div>

        {/* Separador */}
        <div className="mx-3 mb-1" style={{ height: '1px', background: 'var(--border)' }} />

        {/* Árvore de categorias */}
        <div className="overflow-y-auto flex-1 py-1">
          {categories.map(cat => {
            const isActive   = selCategory === cat.key
            const isExpanded = expanded.has(cat.key)

            return (
              <div key={cat.key}>
                {/* Linha da categoria */}
                <button
                  onClick={() => selectCategory(cat.key)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors"
                  style={{
                    background:  isActive ? fc.bg : 'transparent',
                    color:       isActive ? fc.color : 'var(--muted)',
                    fontWeight:  isActive ? '600' : '400',
                    borderLeft:  `2px solid ${isActive ? fc.color : 'transparent'}`,
                  }}
                >
                  <span className="text-sm flex-shrink-0">{cat.icon}</span>
                  <span className="flex-1 leading-tight">{cat.key}</span>
                  {cat.isNew && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ background: fc.bg, color: fc.color }}
                    >
                      NOVO
                    </span>
                  )}
                  {/* Chevron — toggle expand sem mudar seleção */}
                  <span
                    className="flex-shrink-0 text-[10px] cursor-pointer px-1"
                    style={{ color: 'var(--subtle)' }}
                    onClick={e => toggleExpand(cat.key, e)}
                  >
                    {isExpanded ? '▾' : '›'}
                  </span>
                </button>

                {/* Lista de temas expandida */}
                {isExpanded && (
                  <div className="ml-4 border-l" style={{ borderColor: 'var(--border)' }}>
                    {cat.temas.map(tema => {
                      const isTemaActive = selTema === tema.key
                      const count        = countByGroup[tema.key] || 0
                      return (
                        <button
                          key={tema.key}
                          onClick={() => count > 0 && selectTema(tema.key, cat.key)}
                          className="w-full flex items-center gap-2 pl-3 pr-2 py-1.5 text-left text-xs transition-colors"
                          style={{
                            background: isTemaActive ? fc.bg : 'transparent',
                            color: isTemaActive
                              ? fc.color
                              : count === 0 ? 'var(--subtle)' : 'var(--muted)',
                            fontWeight:  isTemaActive ? '500' : '400',
                            cursor: count === 0 ? 'default' : 'pointer',
                          }}
                        >
                          <span className="flex-1 leading-tight">{tema.key}</span>
                          {tema.isNew && count === 0 && (
                            <span
                              className="text-[9px] font-bold px-1 py-0.5 rounded flex-shrink-0"
                              style={{ background: fc.bg, color: fc.color }}
                            >
                              EM BREVE
                            </span>
                          )}
                          {count > 0 && (
                            <span className="text-[9px] flex-shrink-0" style={{ color: 'var(--subtle)' }}>
                              {count}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <header
          className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Toggle sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-surface text-sm flex-shrink-0"
            style={{ color: 'var(--muted)' }}
          >
            ☰
          </button>

          {/* Abas de formato */}
          <div
            className="flex items-center gap-1 rounded-xl p-1 flex-shrink-0"
            style={{ background: 'var(--surface)' }}
          >
            {(Object.keys(FORMAT_CONFIG) as Format[]).map(f => {
              const cfg    = FORMAT_CONFIG[f]
              const active = format === f
              return (
                <button
                  key={f}
                  onClick={() => changeFormat(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={active
                    ? { background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }
                    : { color: 'var(--muted)', border: '1px solid transparent' }
                  }
                >
                  {cfg.label}
                </button>
              )
            })}
          </div>

          {/* Busca */}
          <div
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <span style={{ color: 'var(--muted)' }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar tema — ex: currículo, Instagram…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#F0EFF8' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-lg leading-none" style={{ color: 'var(--muted)' }}>
                ×
              </button>
            )}
          </div>

          {/* Upgrade */}
          {user?.plan !== 'pro' && (
            <a
              href="/upgrade"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap flex-shrink-0"
              style={{ background: fc.color }}
            >
              Upgrade Pro
            </a>
          )}

          {/* Links para IAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* ChatGPT */}
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="ChatGPT"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.28 9.98a5.6 5.6 0 0 0-.48-4.6 5.75 5.75 0 0 0-6.19-2.76A5.65 5.65 0 0 0 11.34 1a5.74 5.74 0 0 0-5.47 3.98 5.65 5.65 0 0 0-3.77 2.74 5.74 5.74 0 0 0 .71 6.72 5.6 5.6 0 0 0 .48 4.6 5.75 5.75 0 0 0 6.19 2.76A5.65 5.65 0 0 0 12.66 23a5.74 5.74 0 0 0 5.47-3.98 5.65 5.65 0 0 0 3.77-2.74 5.74 5.74 0 0 0-.62-6.3ZM12.66 21.5a4.24 4.24 0 0 1-2.72-.99l.13-.08 4.52-2.61a.75.75 0 0 0 .37-.64v-6.38l1.91 1.1a.07.07 0 0 1 .04.05v5.28a4.26 4.26 0 0 1-4.25 4.27Zm-9.14-3.91a4.24 4.24 0 0 1-.51-2.85l.14.08 4.52 2.61a.75.75 0 0 0 .74 0l5.52-3.19V16.1a.07.07 0 0 1-.03.06l-4.57 2.64a4.26 4.26 0 0 1-5.81-1.21Zm-1.19-9.87a4.24 4.24 0 0 1 2.22-1.87v5.37a.75.75 0 0 0 .37.64l5.51 3.18-1.91 1.1a.07.07 0 0 1-.07 0L3.9 13.5a4.26 4.26 0 0 1-.57-5.78Zm15.69 3.66-5.52-3.19 1.91-1.1a.07.07 0 0 1 .07 0l4.54 2.62a4.26 4.26 0 0 1-.66 7.68V12.02a.75.75 0 0 0-.34-.64Zm1.9-2.88-.14-.08-4.51-2.62a.75.75 0 0 0-.75 0L9 9.99V8.04a.07.07 0 0 1 .03-.06l4.57-2.64a4.26 4.26 0 0 1 6.32 4.41v.1Zm-11.97 3.94-1.91-1.1a.07.07 0 0 1-.04-.06V6a4.26 4.26 0 0 1 6.99-3.27l-.14.08-4.52 2.61a.75.75 0 0 0-.37.64l-.01 6.38Zm1.04-2.24 2.46-1.42 2.46 1.42v2.83l-2.46 1.42-2.46-1.42V12.2Z" fill="#9ca3af"/>
              </svg>
            </a>

            {/* Claude */}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Claude"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4.8 21.6 12 2.4l7.2 19.2H4.8Z" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M7.2 15.6h9.6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>

            {/* Gemini */}
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Gemini"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 14.5 9.5 22 12C14.5 14.5 12 22 12 22C12 22 9.5 14.5 2 12C9.5 9.5 12 2 12 2Z" fill="#9ca3af"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/hub_promptiapro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              title="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#9ca3af" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="4.5" stroke="#9ca3af" strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#9ca3af"/>
              </svg>
            </a>
          </div>

          {/* Sair */}
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 rounded-lg border flex-shrink-0"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            Sair
          </button>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* ── Favoritos ── */}
          {showFavorites && (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-xl font-bold">Meus Favoritos</h1>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: favorites.length >= 20 ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.07)',
                      color:      favorites.length >= 20 ? '#F87171' : 'var(--muted)',
                    }}
                  >
                    {favorites.length}/20
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {favorites.length === 0
                    ? 'Marque prompts com ♡ para salvá-los aqui.'
                    : favorites.length >= 20
                    ? 'Limite atingido. Remova um favorito para adicionar outro.'
                    : `${favorites.length} prompt${favorites.length !== 1 ? 's' : ''} salvos · limite de 20.`}
                </p>
              </div>

              {favoritedPrompts.length === 0 ? (
                <div className="text-center py-20" style={{ color: 'var(--muted)' }}>
                  <div className="text-5xl mb-4">♡</div>
                  <p className="text-sm font-medium mb-1">Nenhum favorito ainda</p>
                  <p className="text-xs">Clique no ♡ em qualquer prompt para salvá-lo aqui.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {favoritedPrompts.map(p => (
                    <PromptCard
                      key={p.id}
                      p={p}
                      user={user}
                      favorites={favorites}
                      accentColor="#F87171"
                      onView={openPrompt}
                      onFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Resultados de busca ── */}
          {showSearch && (
            <>
              <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para &quot;{search}&quot;
              </p>
              {searchResults.length === 0 ? (
                <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-sm">Nenhum prompt encontrado.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {searchResults.map(p => (
                    <PromptCard
                      key={p.id}
                      p={p}
                      user={user}
                      favorites={favorites}
                      accentColor={fc.color}
                      onView={openPrompt}
                      onFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Tela de boas-vindas: grade de categorias ── */}
          {showWelcome && (
            <>
              <div className="mb-6">
                <h1 className="font-display text-xl font-bold mb-1">
                  Explore por formato e tema
                </h1>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {format === 'texto'
                    ? 'Prompts prontos para ChatGPT, Claude, Gemini e mais — organizados por categoria.'
                    : format === 'imagem'
                    ? 'Prompts para Midjourney, DALL·E, Stable Diffusion e mais — em breve.'
                    : 'Prompts para Sora, Runway, Pika e mais — em breve.'}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map(cat => {
                  const count = cat.temas.reduce((n, t) => n + (countByGroup[t.key] || 0), 0)
                  return (
                    <button
                      key={cat.key}
                      onClick={() => selectCategory(cat.key)}
                      className="p-4 rounded-xl border text-left transition-all hover:border-opacity-60"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{cat.icon}</span>
                        {cat.isNew && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{ background: fc.bg, color: fc.color }}
                          >
                            NOVO
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-sm font-bold mb-1 leading-tight">{cat.key}</h3>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        {cat.temas.length} temas
                        {count > 0 ? ` · ${count} prompts` : ' · em breve'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {/* ── Cards de temas (categoria selecionada) ── */}
          {showTemas && curCat && (
            <>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: 'var(--muted)' }}>
                <button onClick={() => { setSelCategory(null); setSelTema(null) }} className="hover:underline">
                  Categorias
                </button>
                <span>/</span>
                <span style={{ color: '#F0EFF8' }}>{selCategory}</span>
              </nav>

              {/* Cabeçalho */}
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{curCat.icon}</span>
                <h1 className="font-display text-xl font-bold">{selCategory}</h1>
                {curCat.isNew && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: fc.bg, color: fc.color }}
                  >
                    NOVO
                  </span>
                )}
              </div>
              <p className="text-xs mb-6" style={{ color: 'var(--muted)' }}>
                {curCat.temas.length} temas neste grupo · formato {fc.label}
              </p>

              {/* Grade de temas */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {curCat.temas.map(tema => {
                  const count   = countByGroup[tema.key] || 0
                  const isEmpty = count === 0
                  return (
                    <button
                      key={tema.key}
                      onClick={() => !isEmpty ? selectTema(tema.key, curCat.key) : undefined}
                      disabled={isEmpty}
                      className="p-4 rounded-xl border text-left transition-all hover:border-opacity-60 disabled:opacity-50 disabled:cursor-default"
                      style={{
                        background:   'var(--surface)',
                        borderColor:  'var(--border)',
                        borderLeft:   `3px solid ${isEmpty ? 'var(--border2)' : fc.color}`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-sm font-medium leading-tight" style={{ color: '#F0EFF8' }}>
                          {tema.key}
                        </span>
                        <div className="flex gap-1 flex-shrink-0">
                          {tema.isNew && isEmpty && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                              style={{ background: fc.bg, color: fc.color }}
                            >
                              EM BREVE
                            </span>
                          )}
                          {tema.isNew && !isEmpty && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                              style={{ background: fc.bg, color: fc.color }}
                            >
                              NOVO
                            </span>
                          )}
                          {tema.isEnriquecida && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' }}
                            >
                              ENRIQUECIDA
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        {count > 0 ? `${count} prompt${count !== 1 ? 's' : ''}` : 'Em breve'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {/* ── Prompts (tema selecionado) ── */}
          {showPrompts && (
            <>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: 'var(--muted)' }}>
                <button onClick={() => { setSelCategory(null); setSelTema(null) }} className="hover:underline">
                  Categorias
                </button>
                <span>/</span>
                <button onClick={() => setSelTema(null)} className="hover:underline">
                  {selCategory}
                </button>
                <span>/</span>
                <span style={{ color: '#F0EFF8' }}>{selTema}</span>
              </nav>

              {/* Cabeçalho */}
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-lg font-bold">{selTema}</h1>
                {curTema?.isNew && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: fc.bg, color: fc.color }}
                  >
                    NOVO
                  </span>
                )}
              </div>
              <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>
                {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} disponíveis
              </p>

              {filteredPrompts.length === 0 ? (
                <div className="text-center py-16" style={{ color: 'var(--muted)' }}>
                  <div className="text-4xl mb-3">✨</div>
                  <p className="text-sm">Prompts chegando em breve!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredPrompts.map(p => (
                    <PromptCard
                      key={p.id}
                      p={p}
                      user={user}
                      favorites={favorites}
                      accentColor={fc.color}
                      onView={openPrompt}
                      onFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── MODAL DO PROMPT ── */}
      {selectedPrompt && (() => {
        const vars        = extractVars(selectedPrompt.body)
        const hasVars     = vars.length > 0
        const bodyToShow  = personalizedBody ?? selectedPrompt.body

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            onClick={closeModal}
          >
            {/* ── MODAL PRINCIPAL ── */}
            <div
              className="w-full max-w-lg rounded-2xl border p-6 max-h-[85vh] overflow-y-auto"
              style={{ background: 'var(--surface)', borderColor: 'var(--border2)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Cabeçalho */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-3">
                  <h2 className="font-display text-base font-bold leading-tight">{selectedPrompt.title}</h2>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                    {selectedPrompt.group_name}
                    {selectedPrompt.subgroup ? ` › ${selectedPrompt.subgroup}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Botão Personalizar — só aparece se há variáveis */}
                  {hasVars && !personalizedBody && (
                    <button
                      onClick={() => openPersonalizar(selectedPrompt.body)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                      style={{ borderColor: fc.border, color: fc.color, background: fc.bg }}
                      title="Preencher campos do prompt"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Personalizar
                    </button>
                  )}
                  {/* Reset personalização */}
                  {personalizedBody && (
                    <button
                      onClick={() => { setPersonalizedBody(null); setVarValues({}) }}
                      className="text-xs px-2.5 py-1.5 rounded-lg border transition-colors hover:opacity-70"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                    >
                      ↺ Original
                    </button>
                  )}
                  <button onClick={closeModal} className="text-xl leading-none" style={{ color: 'var(--muted)' }}>×</button>
                </div>
              </div>

              {/* Badge "personalizado" */}
              {personalizedBody && (
                <div
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg mb-3"
                  style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80' }}
                >
                  <span>✓</span>
                  <span>Prompt personalizado com seus dados</span>
                </div>
              )}

              {/* Corpo do prompt */}
              <div
                className="p-4 rounded-xl text-xs leading-relaxed font-mono mb-4 whitespace-pre-wrap"
                style={{ background: 'var(--bg)', color: 'var(--muted)' }}
              >
                {/* Destaca os campos não preenchidos em laranja */}
                {bodyToShow.split(/(\[[^\]]+\])/g).map((part, i) =>
                  /^\[[^\]]+\]$/.test(part)
                    ? <mark key={i} style={{ background: 'rgba(255,112,67,0.18)', color: '#FF7043', borderRadius: '3px', padding: '0 2px' }}>{part}</mark>
                    : <span key={i}>{part}</span>
                )}
              </div>

              {/* Rodapé */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-sm border"
                  style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}
                >
                  Fechar
                </button>
                <button
                  onClick={() => copyPrompt(bodyToShow)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                  style={{ background: copied ? '#4ADE80' : fc.color }}
                >
                  {copied ? '✓ Copiado!' : '📋 Copiar prompt'}
                </button>
              </div>
            </div>

            {/* ── MODAL DE PERSONALIZAÇÃO ── */}
            {personalizing && (
              <div
                className="fixed inset-0 flex items-center justify-center p-4"
                style={{ zIndex: 60, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
                onClick={() => setPersonalizing(false)}
              >
                <div
                  className="w-full max-w-md rounded-2xl border p-6 max-h-[85vh] overflow-y-auto"
                  style={{ background: 'var(--bg2)', borderColor: 'var(--border2)' }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Cabeçalho do modal de personalização */}
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-display text-base font-bold">Personalizar Prompt</h3>
                    <button onClick={() => setPersonalizing(false)} className="text-xl leading-none" style={{ color: 'var(--muted)' }}>×</button>
                  </div>
                  <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>
                    Preencha os campos abaixo para personalizar o prompt com seus dados.
                  </p>

                  {/* Campos dinâmicos */}
                  <div className="flex flex-col gap-4">
                    {vars.map(v => (
                      <div key={v}>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#F0EFF8' }}>
                          {v}
                        </label>
                        <input
                          type="text"
                          value={varValues[v] || ''}
                          onChange={e => setVarValues(prev => ({ ...prev, [v]: e.target.value }))}
                          placeholder={`Ex.: ${v}`}
                          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none border transition-colors"
                          style={{
                            background: 'var(--surface)',
                            borderColor: varValues[v] ? fc.border : 'var(--border)',
                            color: '#F0EFF8',
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setPersonalizing(false)}
                      className="flex-1 py-2.5 rounded-xl text-sm border"
                      style={{ borderColor: 'var(--border2)', color: 'var(--muted)' }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setPersonalizedBody(buildPersonalized(selectedPrompt.body, varValues))
                        setPersonalizing(false)
                      }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: fc.color }}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })()}
    </div>
  )
}

// ─── Card de prompt (subcomponente) ──────────────────────────────────────────
function PromptCard({
  p, user, favorites, accentColor, onView, onFavorite,
}: {
  p:           Prompt
  user:        UserProfile | null
  favorites:   string[]
  accentColor: string
  onView:      (p: Prompt) => void
  onFavorite:  (id: string) => void
}) {
  const isPro   = p.plan === 'pro'
  const locked  = isPro && user?.plan !== 'pro'
  return (
    <div
      className="flex flex-col p-4 rounded-xl border transition-all"
      style={{
        background:      'var(--surface)',
        borderColor:     isPro ? 'rgba(232,201,107,0.2)' : 'var(--border)',
        borderLeftWidth: isPro ? '2px' : '1px',
      }}
    >
      <span
        className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 self-start"
        style={isPro
          ? { background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' }
          : { background: 'rgba(74,222,128,0.12)',  color: '#4ADE80' }
        }
      >
        {isPro ? '⭐ Pro' : 'Gratuito'}
      </span>
      <h3 className="font-display text-sm font-bold mb-1 leading-tight">{p.title}</h3>
      <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: 'var(--muted)' }}>
        {p.description}
      </p>
      {p.subgroup && (
        <p className="text-xs mb-3" style={{ color: 'var(--subtle)' }}>{p.subgroup}</p>
      )}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => !locked && onView(p)}
          disabled={locked}
          className="flex-1 py-2 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}
        >
          {locked ? '🔒 Ver prompt' : '👁 Ver prompt'}
        </button>
        <button
          onClick={() => onFavorite(p.id)}
          className="px-2.5 py-2 rounded-lg border text-xs transition-colors"
          style={{ borderColor: 'var(--border)', color: favorites.includes(p.id) ? '#F87171' : 'var(--muted)' }}
        >
          {favorites.includes(p.id) ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}


