'use client'
// NOTA: 'use client' é necessário por causa dos event handlers (onMouseEnter/Leave)
// e do SVG de logo. O Next.js ainda faz SSR deste componente — o H1 e o JSON-LD
// aparecem no HTML entregue ao Google normalmente.

// ─── force-dynamic REMOVIDO ────────────────────────────────────────────────
// A homepage não tem nenhum dado dinâmico por usuário; não há razão para
// desabilitar o cache. Remover force-dynamic permite que o Next.js faça
// static generation (SSG) ou ISR, melhorando TTFB e Core Web Vitals.
// Se precisar de dados do Supabase na home no futuro, use revalidate em vez disso.

import Link from 'next/link'

const categories = [
  { icon: '💰', name: 'Financeiro Pessoal', count: '24 prompts', hot: false, isNew: false },
  { icon: '🏪', name: 'Empresa Varejo', count: '16 prompts', hot: true, isNew: false },
  { icon: '🏭', name: 'Empresa Atacado', count: '16 prompts', hot: false, isNew: false },
  { icon: '⚙️', name: 'Empresa Indústria', count: '16 prompts', hot: false, isNew: false },
  { icon: '🛠️', name: 'Empresa Serviços', count: '16 prompts', hot: false, isNew: false },
  { icon: '⚖️', name: 'Jurídico', count: '18 prompts', hot: false, isNew: false },
  { icon: '📊', name: 'Resumo Econômico', count: '16 prompts', hot: false, isNew: false },
  { icon: '🏥', name: 'Laudos Médicos', count: '18 prompts', hot: false, isNew: false },
  { icon: '🛒', name: 'Vendas E-commerce', count: '18 prompts', hot: true, isNew: false },
  { icon: '👔', name: 'Carreira', count: '18 prompts', hot: false, isNew: true },
  { icon: '👥', name: 'RH Empresarial', count: '15 prompts', hot: false, isNew: false },
  { icon: '📱', name: 'Marketing Digital', count: '18 prompts', hot: true, isNew: false },
  { icon: '🎓', name: 'Estudantes Universitários', count: '24 prompts', hot: false, isNew: false },
  { icon: '🚗', name: 'Compra e Venda de Automóveis', count: '16 prompts', hot: false, isNew: false },
  { icon: '🏠', name: 'Locação de Imóveis', count: '18 prompts', hot: false, isNew: false },
  { icon: '📣', name: 'Marketing Empresarial', count: '20 prompts', hot: false, isNew: false },
  { icon: '🎨', name: 'Personalização de Produtos', count: '16 prompts', hot: false, isNew: true },
  { icon: '🧘', name: 'Saúde e Qualidade de Vida', count: '18 prompts', hot: false, isNew: true },
  { icon: '🎉', name: 'Festas e Eventos', count: '12 prompts', hot: false, isNew: false },
  { icon: '🌍', name: 'Novos Idiomas', count: '8 prompts', hot: false, isNew: false },
  { icon: '🗂️', name: 'Secretária Particular', count: '18 prompts', hot: false, isNew: true },
]
const prompts = [
  { icon: '💰', title: 'Diagnóstico financeiro pessoal', desc: 'Analisa renda, despesas e metas. Entrega diagnóstico completo e 3 ações prioritárias.', cat: 'Financeiro Pessoal', plan: 'free' },
  { icon: '🏪', title: 'Cálculo de markup e preço de venda', desc: 'Calcula o preço correto incluindo impostos, comissão, cartão e despesas fixas.', cat: 'Empresa Varejo', plan: 'free' },
  { icon: '⚖️', title: 'Revisão de cláusulas contratuais', desc: 'Analisa contratos identificando riscos, lacunas e pontos de renegociação.', cat: 'Jurídico', plan: 'pro' },
  { icon: '🛒', title: 'Descrição persuasiva para marketplace', desc: 'Redige descrição otimizada para SEO e conversão em Mercado Livre, Shopee ou Amazon.', cat: 'Vendas E-commerce', plan: 'free' },
]
const testimonials = [
  { initials: 'RM', name: 'Ricardo M.', role: 'Contador · São Paulo, SP', text: 'O que eu demorava 2 horas para interpretar agora levo 10 minutos. Meus clientes ficam impressionados com a clareza dos relatórios.' },
  { initials: 'AS', name: 'Ana S.', role: 'E-commerce · Curitiba, PR', text: 'Minha taxa de conversão subiu 40% em 3 semanas depois que comecei a usar os prompts de descrição de produto.' },
  { initials: 'LF', name: 'Luiza F.', role: 'Advogada · Rio de Janeiro, RJ', text: 'Os prompts jurídicos são incríveis para primeiras análises de contratos. O tempo de triagem caiu pela metade.' },
]

// ── FAQs ─────────────────────────────────────────────────────────────────────
// Usados tanto no render quanto no JSON-LD (FAQPage schema)
const faqs = [
  {
    q: 'Os prompts funcionam com qualquer IA?',
    a: 'Sim. Compatíveis com ChatGPT, Claude, Gemini, Copilot e qualquer IA conversacional. Escritos em português e otimizados para o contexto brasileiro.',
  },
  {
    q: 'Preciso de experiência com IA?',
    a: 'Não. Basta copiar, preencher os campos entre colchetes com seus dados e colar na IA. Sem conhecimento técnico necessário.',
  },
  {
    q: 'O acesso vitalício é mesmo para sempre?',
    a: 'Sim. Você paga uma única vez e tem acesso para sempre — incluindo todos os novos prompts adicionados todo mês, sem custo adicional.',
  },
]

// ── JSON-LD: FAQPage ──────────────────────────────────────────────────────────
// Habilita rich snippets no Google para as perguntas frequentes.
// O Google exige que o conteúdo do schema seja visível na página — e está,
// na seção de FAQ abaixo (os mesmos objetos `faqs`).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

const LogoNavbar = () => (
  <svg width="180" height="36" viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg">
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
const LogoFooter = () => (
  <svg width="140" height="28" viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg">
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
const LogoHero = () => (
  <svg width="100%" height="auto" viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '860px', margin: '0 auto', display: 'block' }}>
    <g transform="translate(10, 45)">
      <polygon points="55,30 110,30 155,50 175,105 155,160 100,185 45,165 25,105" fill="#1a0a2e" stroke="#a855f7" strokeWidth="2.5"/>
      <circle cx="88" cy="107" r="9" fill="#e879f9"/>
      <circle cx="110" cy="107" r="9" fill="#c084fc"/>
      <circle cx="132" cy="107" r="9" fill="#e879f9"/>
    </g>
    <text x="200" y="155" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="90" fontWeight="700" fill="#ffffff" letterSpacing="-3">Prompt</text>
    <rect x="508" y="88" width="105" height="82" rx="10" fill="#7c3aed"/>
    <text x="560" y="152" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="76" fontWeight="800" fill="#f0abfc" textAnchor="middle">IA</text>
    <text x="622" y="155" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="90" fontWeight="700" fill="#c084fc"> Pro</text>
    <text x="435" y="208" fontFamily="'Segoe UI',Arial,sans-serif" fontSize="15" fill="#9333ea" textAnchor="middle" letterSpacing="4">PLATAFORMA DE PROMPTS PROFISSIONAIS</text>
  </svg>
)

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── JSON-LD: FAQPage ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
        <LogoNavbar />
        <div className="hidden md:flex gap-8">
          {['Categorias', 'Como funciona', 'Planos', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EFF8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="hidden sm:block text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--muted)' }}>
            Entrar
          </Link>
          <Link href="/auth/register" className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-85 whitespace-nowrap" style={{ background: 'var(--accent)' }}>
            Começar grátis →
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-14 px-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(124,111,247,0.15) 0%, transparent 70%)' }} />
        <div className="animate-fade-up w-full">
          {/*
            ── H1 REAL ───────────────────────────────────────────────────────
            Anteriormente o "título" da página era um SVG — texto invisível
            para o Google. Este <h1> é o heading semântico principal.
            A classe "sr-only" o mantém visualmente oculto para não duplicar
            o logotipo SVG na tela, mas ele está no DOM e é lido pelos crawlers.
            Se preferir exibir o H1 visivelmente, remova a classe sr-only e
            ajuste a tipografia conforme o design.
          */}
          <h1 className="sr-only">
            Biblioteca de Prompts Profissionais para IA em Português — ChatGPT, Claude e Gemini
          </h1>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border" style={{ background: 'rgba(124,111,247,0.12)', borderColor: 'rgba(124,111,247,0.3)', color: 'var(--accent2)' }}>
            ✦ Biblioteca profissional de prompts
          </span>
          <div className="w-full"><LogoHero /></div>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
            Mais de 500 prompts profissionais em 22 categorias — finanças, direito, saúde, vendas, carreira e muito mais. Saiba o que perguntar e economize horas todo dia.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register" className="px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'var(--accent)' }}>
              Começar grátis →
            </Link>
            <a href="#planos" className="px-8 py-4 rounded-xl text-base font-medium transition-all border" style={{ color: '#F0EFF8', borderColor: 'var(--border2)', background: 'transparent' }}>
              Ver planos
            </a>
          </div>
        </div>
        <div className="w-full mt-8 py-3 px-6 rounded-2xl text-center font-display text-sm font-bold uppercase" style={{ background: 'rgba(124,111,247,0.12)', border: '1px solid rgba(124,111,247,0.3)', color: 'var(--accent2)', letterSpacing: '0.1em' }}>⚡ Economize tempo e otimize suas atividades com prompts prontos e testados!</div>
        <div className="w-full mt-3 py-3 px-6 rounded-2xl text-center font-display text-sm font-bold uppercase" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ADE80', letterSpacing: '0.1em' }}>🤖 Use os prompts na IA de sua preferência — ChatGPT, Claude, Gemini e muito mais!</div>
        <div className="flex gap-12 mt-12 flex-wrap justify-center">
          {[['500+', 'Prompts profissionais'], ['22', 'Áreas de atuação'], ['100%', 'Testados']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl font-black">{num}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIAS ─────────────────────────────────────────────────────── */}
      <section id="categorias" className="max-w-5xl mx-auto px-6 pt-4 pb-14">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Biblioteca completa</div>
        <h2 className="font-display text-4xl font-extrabold tracking-normal mb-3 uppercase">22 áreas do conhecimento</h2>
        <p className="mb-10" style={{ color: 'var(--muted)' }}>Prompts organizados por grupo e subgrupo para encontrar o que precisa em segundos.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.name}
              href="/auth/register"
              className="relative p-4 rounded-xl border transition-all hover:-translate-y-1 hover:border-[rgba(124,111,247,0.4)] hover:shadow-[0_4px_20px_rgba(124,111,247,0.12)] cursor-pointer block"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {cat.hot && !cat.isNew && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(248,113,113,0.12)', color: '#F87171' }}>🔥 Top</span>
              )}
              {cat.isNew && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}>Novo</span>
              )}
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-display text-sm font-bold mb-1">{cat.name}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{cat.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EXEMPLOS ───────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Exemplos da biblioteca</div>
        <h2 className="font-display text-4xl font-extrabold tracking-normal mb-10 uppercase">Prompts que entregam resultados reais</h2>
        <div className="flex flex-col gap-3">
          {prompts.map(p => (
            <div key={p.title} className="grid grid-cols-[auto_1fr_auto] gap-4 items-start p-5 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(124,111,247,0.12)' }}>{p.icon}</div>
              <div>
                <div className="font-display text-sm font-bold mb-1">{p.title}</div>
                <div className="text-xs leading-relaxed mb-1" style={{ color: 'var(--muted)' }}>{p.desc}</div>
                <div className="text-xs" style={{ color: 'var(--subtle)' }}>{p.cat}</div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full self-center whitespace-nowrap" style={p.plan === 'free' ? { background: 'rgba(74,222,128,0.12)', color: '#4ADE80' } : { background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' }}>
                {p.plan === 'free' ? 'Gratuito' : 'Pro'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ──────────────────────────────────────────────────── */}
      <section id="como-funciona" className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Como funciona</div>
        <h2 className="font-display text-4xl font-extrabold tracking-normal mb-10 uppercase">Do acesso ao resultado em 3 passos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ['01', 'Escolha seu plano', 'Comece grátis ou garanta o acesso vitalício Pro por apenas R$ 29,90.'],
            ['02', 'Encontre o prompt', 'Navegue por categoria ou use a busca para encontrar o prompt ideal.'],
            ['03', 'Personalize e use', 'Copie, preencha os campos entre [colchetes] e cole na IA de sua escolha.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="font-display text-4xl font-black mb-4" style={{ color: 'var(--accent)', opacity: 0.3 }}>{num}</div>
              <div className="font-display text-base font-bold mb-2">{title}</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANOS ─────────────────────────────────────────────────────────── */}
      <section id="planos" className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Planos e preços</div>
        <h2 className="font-display text-4xl font-extrabold tracking-normal mb-3 uppercase">Simples assim — Free ou Pro</h2>
        <p className="mb-10" style={{ color: 'var(--muted)' }}>Sem mensalidade. Sem anuidade. O Pro é pague uma vez, use para sempre.</p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* FREE */}
          <div className="p-8 rounded-2xl border flex flex-col" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Free</div>
            <div className="font-display text-5xl font-black mb-1">R$ 0</div>
            <div className="text-sm mb-6" style={{ color: 'var(--muted)' }}>para sempre gratuito</div>
            <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
            <ul className="space-y-3 mb-8 flex-1">
              {['50+ prompts gratuitos', '22 categorias (seleção)', 'Busca e filtros básicos', 'Copiar e usar imediatamente'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
              ))}
              {['Prompts Pro exclusivos'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--subtle)' }}><span>✕</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register" className="block w-full text-center py-3 rounded-xl text-sm font-medium border transition-all hover:opacity-80" style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>
              Começar grátis
            </Link>
          </div>
          {/* PRO VITALÍCIO */}
          <div className="relative p-8 rounded-2xl border-2 flex flex-col" style={{ background: 'linear-gradient(145deg, rgba(124,111,247,0.08) 0%, var(--surface) 60%)', borderColor: 'rgba(124,111,247,0.5)' }}>
            <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Oferta especial</span>
            <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Pro Vitalício</div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-2xl line-through" style={{ color: 'var(--muted)' }}>R$ 99,90</span>
              <span className="font-display text-5xl font-black">R$ 29,90</span>
            </div>
            <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>pagamento único · acesso vitalício</div>
            <div className="text-xs mb-6 px-3 py-1.5 rounded-full self-start font-medium" style={{ background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' }}>⭐ menos de R$ 0,02 por prompt, para sempre</div>
            <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
            <ul className="space-y-3 mb-8 flex-1">
              {[
                '500+ prompts completos',
                '22 categorias completas',
                'Busca avançada',
                'Favoritos ilimitados',
                'Acesso vitalício — pague uma vez',
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
              ))}
            </ul>
            <a href="https://buy.stripe.com/5kQaEP9yK3Sa7az3W897G03" className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'var(--accent)' }}>
              Garantir acesso vitalício →
            </a>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="font-display text-4xl font-black tracking-tight mb-10">Quem já usa</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div key={t.name} className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-sm mb-4" style={{ color: 'var(--gold)' }}>★★★★★</div>
              <p className="text-sm leading-relaxed mb-4 italic font-light">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-sm font-bold" style={{ background: 'var(--surface2)', color: 'var(--accent2)' }}>{t.initials}</div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="font-display text-4xl font-black tracking-tight mb-10">Dúvidas frequentes</h2>
        <div className="flex flex-col gap-2">
          {faqs.map(faq => (
            <details key={faq.q} className="group rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <summary className="flex justify-between items-center p-5 text-sm font-medium cursor-pointer list-none">
                {faq.q}
                <span className="text-xl font-light transition-transform group-open:rotate-45" style={{ color: 'var(--muted)' }}>+</span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <section className="text-center py-24 px-6 border-y" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Comece hoje</div>
        <h2 className="font-display text-5xl font-black tracking-tight mb-4">Pronto para trabalhar<br /><span style={{ color: 'var(--accent)' }}>10x mais rápido?</span></h2>
        <p className="text-lg mb-10 font-light" style={{ color: 'var(--muted)' }}>Teste gratuitamente com 50+ prompts. Sem cartão de crédito.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/register" className="px-8 py-4 rounded-xl text-base font-semibold text-white hover:opacity-90" style={{ background: 'var(--accent)' }}>
            Começar grátis →
          </Link>
          <a href="#planos" className="px-8 py-4 rounded-xl text-base border hover:opacity-80" style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>
            Ver planos
          </a>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="flex flex-wrap items-center justify-between gap-4 px-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-col gap-1">
          <LogoFooter />
          <span className="text-xs" style={{ color: 'var(--subtle)' }}>F Mitsuo Fukuda</span>
          <span className="text-xs" style={{ color: 'var(--subtle)' }}>CNPJ: 29.751.016/0001-18</span>
        </div>
        <div className="flex gap-6 items-center">
          <a href="/termos" className="text-sm hover:opacity-80" style={{ color: 'var(--subtle)' }}>Termos de Uso</a>
          <a href="/privacidade" className="text-sm hover:opacity-80" style={{ color: 'var(--subtle)' }}>Política de Privacidade</a>
          <a href="/contato" className="text-sm hover:opacity-80" style={{ color: 'var(--subtle)' }}>Contato</a>
          <a href="https://www.instagram.com/hub_promptiapro" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#9ca3af" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="4.5" stroke="#9ca3af" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1" fill="#9ca3af"/>
            </svg>
          </a>
        </div>
        <span className="text-sm" style={{ color: 'var(--subtle)' }}>© 2025 PromptIAPro</span>
      </footer>

    </main>
  )
}



