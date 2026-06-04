'use client'

export const dynamic = 'force-dynamic'
import Link from 'next/link'

const categories = [
  { icon: '💰', name: 'Financeiro Pessoal', count: '8 prompts', hot: false, isNew: false },
  { icon: '🏪', name: 'Empresa Varejo', count: '12 prompts', hot: true, isNew: false },
  { icon: '📦', name: 'Empresa Atacado', count: '10 prompts', hot: false, isNew: false },
  { icon: '🏭', name: 'Indústria', count: '10 prompts', hot: false, isNew: false },
  { icon: '🛎️', name: 'Empresa Serviços', count: '10 prompts', hot: false, isNew: false },
  { icon: '⚖️', name: 'Jurídico', count: '8 prompts', hot: false, isNew: false },
  { icon: '📈', name: 'Resumo Econômico', count: '6 prompts', hot: false, isNew: false },
  { icon: '🩺', name: 'Laudos Médicos', count: '8 prompts', hot: false, isNew: false },
  { icon: '🍳', name: 'Receitas Culinárias', count: '6 prompts', hot: false, isNew: false },
  { icon: '💪', name: 'Treinos Físicos', count: '8 prompts', hot: false, isNew: true },
  { icon: '🛒', name: 'Vendas E-commerce', count: '10 prompts', hot: true, isNew: false },
  { icon: '🌍', name: 'Novos Idiomas', count: '8 prompts', hot: false, isNew: false },
  { icon: '🎯', name: 'Carreira', count: '6 prompts', hot: false, isNew: true },
  { icon: '🤖', name: 'IA no Trabalho', count: '6 prompts', hot: false, isNew: true },
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

const faqs = [
  { q: 'Os prompts funcionam com qualquer IA?', a: 'Sim. Compatíveis com ChatGPT, Claude, Gemini, Copilot e qualquer IA conversacional. Escritos em português e otimizados para o contexto brasileiro.' },
  { q: 'Preciso de experiência com IA?', a: 'Não. Basta copiar, preencher os campos entre colchetes com seus dados e colar na IA. Sem conhecimento técnico necessário.' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim, a qualquer momento sem multa. No plano anual, oferecemos garantia de reembolso integral nos primeiros 30 dias.' },
  { q: 'Com que frequência chegam prompts novos?', a: 'Todo mês são adicionados pelo menos 30 novos prompts. Assinantes Pro recebem notificação por e-mail.' },
]

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 border-b" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
        <span className="font-display text-xl font-black tracking-tight">Prompt<span style={{ color: 'var(--accent)' }}>IA</span>Pro</span>
        <div className="hidden md:flex gap-8">
          {['Categorias', 'Como funciona', 'Planos', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EFF8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{item}</a>
          ))}
        </div>
        <Link href="/auth/login" className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-80" style={{ background: 'var(--accent)' }}>
          Entrar
        </Link>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(124,111,247,0.15) 0%, transparent 70%)' }} />
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 border" style={{ background: 'rgba(124,111,247,0.12)', borderColor: 'rgba(124,111,247,0.3)', color: 'var(--accent2)' }}>
            ✦ Biblioteca profissional de prompts
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            Resultados profissionais<br /><span style={{ color: 'var(--accent)' }}>com os prompts certos</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
            Mais de 800 prompts testados em finanças, direito, saúde, vendas, idiomas e muito mais. Economize horas todo dia.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register" className="px-8 py-4 rounded-xl text-base font-medium text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'var(--accent)' }}>
              Começar grátis →
            </Link>
            <a href="#planos" className="px-8 py-4 rounded-xl text-base font-medium transition-all border" style={{ color: '#F0EFF8', borderColor: 'var(--border2)', background: 'transparent' }}>
              Ver planos
            </a>
          </div>
        </div>
<div className="w-full mt-8 py-3 px-6 rounded-2xl text-center font-display text-sm font-bold uppercase" style={{ background: 'rgba(124,111,247,0.12)', border: '1px solid rgba(124,111,247,0.3)', color: 'var(--accent2)', letterSpacing: '0.1em' }}>⚡ Economize tempo e otimize suas atividades com prompts prontos e testados!</div>
        <div className="flex gap-12 mt-16 flex-wrap justify-center">
          {[['800+', 'Prompts profissionais'], ['14', 'Áreas de atuação'], ['+30', 'Novos/mês'], ['100%', 'Testados']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl font-black">{num}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Biblioteca completa</div>
        <h2 className="font-display text-4xl font-black tracking-tight mb-3">14 áreas do conhecimento</h2>
        <p className="mb-12" style={{ color: 'var(--muted)' }}>Prompts organizados por grupo e subgrupo para encontrar o que precisa em segundos.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(cat => (
            <div key={cat.name} className="relative p-4 rounded-xl border transition-all hover:-translate-y-0.5 cursor-default" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              {cat.hot && <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(248,113,113,0.12)', color: '#F87171' }}>🔥 Top</span>}
              {cat.isNew && <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}>Novo</span>}
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-display text-sm font-bold mb-1">{cat.name}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{cat.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMPTS PREVIEW */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Exemplos da biblioteca</div>
        <h2 className="font-display text-4xl font-black tracking-tight mb-12">Prompts que entregam resultados reais</h2>
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

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Como funciona</div>
        <h2 className="font-display text-4xl font-black tracking-tight mb-12">Do acesso ao resultado em 3 passos</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            ['01', 'Escolha seu plano', 'Assine o Free para explorar prompts gratuitos ou o Pro para acesso completo.'],
            ['02', 'Encontre o prompt', 'Navegue por categoria ou use a busca para encontrar o prompt ideal.'],
            ['03', 'Personalize e use', 'Copie, preencha os campos entre [colchetes] e cole na IA de sua escolha.'],
            ['04', 'Novidades todo mês', 'Receba +30 novos prompts por mês sem pagar nada a mais.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="font-display text-4xl font-black mb-4" style={{ color: 'var(--accent)', opacity: 0.3 }}>{num}</div>
              <div className="font-display text-base font-bold mb-2">{title}</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Planos e preços</div>
        <h2 className="font-display text-4xl font-black tracking-tight mb-3">Invista menos do que 1 hora do seu tempo</h2>
        <p className="mb-12" style={{ color: 'var(--muted)' }}>Cancele quando quiser, sem burocracia.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {/* FREE */}
          <div className="p-8 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Free</div>
            <div className="font-display text-5xl font-black mb-1">R$&nbsp;0</div>
            <div className="text-sm mb-6" style={{ color: 'var(--muted)' }}>para sempre gratuito</div>
            <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
            <ul className="space-y-3 mb-8">
              {['30 prompts gratuitos', '14 categorias (seleção)', 'Busca e filtros básicos', 'Copiar e usar imediatamente'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
              ))}
              {['Prompts Pro exclusivos', 'Novidades mensais'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--subtle)' }}><span>✕</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register" className="block w-full text-center py-3 rounded-xl text-sm font-medium border transition-all hover:opacity-80" style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>
              Criar conta grátis
            </Link>
          </div>
          {/* PRO MENSAL */}
          <div className="relative p-8 rounded-2xl border-2" style={{ background: 'linear-gradient(145deg, rgba(124,111,247,0.08) 0%, var(--surface) 60%)', borderColor: 'rgba(124,111,247,0.5)' }}>
            <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Mais popular</span>
            <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Pro Mensal</div>
            <div className="font-display text-5xl font-black mb-1"><sup className="text-2xl align-top mt-2 inline-block">R$</sup>39</div>
            <div className="text-sm mb-6" style={{ color: 'var(--muted)' }}>por mês · cancele quando quiser</div>
            <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
            <ul className="space-y-3 mb-8">
              {['800+ prompts completos', '14 categorias completas', '+30 novos prompts/mês', 'Busca avançada', 'Favoritos ilimitados', 'Suporte por WhatsApp'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register?plan=pro_mensal" className="block w-full text-center py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90" style={{ background: 'var(--accent)' }}>
              Assinar agora →
            </Link>
          </div>
          {/* PRO ANUAL */}
          <div className="p-8 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Pro Anual</div>
            <div className="font-display text-5xl font-black mb-1"><sup className="text-2xl align-top mt-2 inline-block">R$</sup>29</div>
            <div className="text-sm mb-6" style={{ color: 'var(--muted)' }}>por mês · R$ 348/ano · economize 26%</div>
            <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
            <ul className="space-y-3 mb-8">
              {['Tudo do Pro Mensal', 'Economia de R$ 120/ano', 'Acesso antecipado a novidades', '1 consultoria de 30 min', 'Garantia de 30 dias'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register?plan=pro_anual" className="block w-full text-center py-3 rounded-xl text-sm font-medium border transition-all hover:opacity-80" style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>
              Assinar anual →
            </Link>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-display text-4xl font-black tracking-tight mb-12">Quem já usa</h2>
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

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display text-4xl font-black tracking-tight mb-12">Dúvidas frequentes</h2>
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

      {/* CTA FINAL */}
      <section className="text-center py-24 px-6 border-y" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Comece hoje</div>
        <h2 className="font-display text-5xl font-black tracking-tight mb-4">Pronto para trabalhar<br /><span style={{ color: 'var(--accent)' }}>10x mais rápido?</span></h2>
        <p className="text-lg mb-10 font-light" style={{ color: 'var(--muted)' }}>Teste gratuitamente com 30 prompts. Sem cartão de crédito.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register" className="px-8 py-4 rounded-xl text-base font-medium text-white hover:opacity-90" style={{ background: 'var(--accent)' }}>
            Criar conta grátis →
          </Link>
          <a href="#planos" className="px-8 py-4 rounded-xl text-base border hover:opacity-80" style={{ borderColor: 'var(--border2)', color: '#F0EFF8' }}>
            Ver planos
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-wrap items-center justify-between gap-4 px-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <span className="font-display text-lg font-black">Prompt<span style={{ color: 'var(--accent)' }}>IA</span>Pro</span>
        <div className="flex gap-6">
          {['Termos', 'Privacidade', 'Contato'].map(l => (
            <a key={l} href="#" className="text-sm transition-colors" style={{ color: 'var(--subtle)' }}>{l}</a>
          ))}
        </div>
        <span className="text-sm" style={{ color: 'var(--subtle)' }}>© 2025 PromptIAPro</span>
      </footer>
    </main>
  )
}
