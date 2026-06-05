'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

const LINK_MENSAL = 'SEU_LINK_STRIPE_MENSAL'
const LINK_ANUAL = 'SEU_LINK_STRIPE_ANUAL'

export default function UpgradePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: 'var(--bg)' }}>
      <Link href="/dashboard" className="text-sm mb-8 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
        ← Voltar ao dashboard
      </Link>

      <div className="text-center mb-12">
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Upgrade para Pro</div>
        <h1 className="font-display text-4xl font-black tracking-tight mb-3">Escolha o seu plano</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Acesso completo a 800+ prompts profissionais. Cancele quando quiser.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">

        {/* PRO MENSAL */}
        <div className="p-8 rounded-2xl border flex flex-col" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Pro Mensal</div>
          <div className="font-display text-5xl font-black mb-1">R$ 19,90</div>
          <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>por mês</div>
          <div className="text-xs mb-6 px-3 py-1.5 rounded-full self-start font-medium" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}>✓ Garantia de 7 dias</div>
          <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {['800+ prompts completos', '14 categorias completas', '+30 novos prompts/mês', 'Busca avançada', 'Favoritos ilimitados', 'Suporte por WhatsApp'].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
            ))}
          </ul>
          <a href={LINK_MENSAL} className="block w-full text-center py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 mt-auto" style={{ background: 'var(--accent)' }}>
            Assinar mensal →
          </a>
        </div>

        {/* PRO ANUAL */}
        <div className="relative p-8 rounded-2xl border-2 flex flex-col" style={{ background: 'linear-gradient(145deg, rgba(124,111,247,0.08) 0%, var(--surface) 60%)', borderColor: 'rgba(124,111,247,0.5)' }}>
          <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Mais econômico</span>
          <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Pro Anual</div>
          <div className="font-display text-5xl font-black mb-1">R$ 12,50</div>
          <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>por mês · R$ 150/ano</div>
          <div className="text-xs mb-6 px-3 py-1.5 rounded-full self-start font-medium" style={{ background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' }}>⭐ Economize 37%</div>
          <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {['Tudo do Pro Mensal', 'Economia de R$ 89/ano', 'Acesso antecipado a novidades', '1 consultoria de 30 min', 'Garantia de 7 dias'].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
            ))}
          </ul>
          <a href={LINK_ANUAL} className="block w-full text-center py-3 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 mt-auto" style={{ background: 'var(--accent)' }}>
            Assinar anual →
          </a>
        </div>

      </div>

      <p className="text-xs mt-8 text-center" style={{ color: 'var(--subtle)' }}>
        Pagamento seguro via Stripe · Cartão de crédito, débito e PIX
      </p>
    </div>
  )
}