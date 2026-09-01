'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

const LINK_VITALICIO = 'https://buy.stripe.com/fZuaEP8uGgEWamL8co97G04'

export default function UpgradePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: 'var(--bg)' }}>
      <Link href="/dashboard" className="text-sm mb-8 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
        ← Voltar ao dashboard
      </Link>

      <div className="text-center mb-12">
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>Upgrade para Pro</div>
        <h1 className="font-display text-4xl font-black tracking-tight mb-3">Acesso vitalício por R$ 29,90</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Pague uma vez. Acesse para sempre. 500+ prompts profissionais.</p>
      </div>

      <div className="w-full max-w-md">
        {/* PRO VITALÍCIO */}
        <div className="relative p-8 rounded-2xl border-2 flex flex-col" style={{ background: 'linear-gradient(145deg, rgba(124,111,247,0.08) 0%, var(--surface) 60%)', borderColor: 'rgba(124,111,247,0.5)' }}>
          <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Oferta especial</span>
          <div className="text-sm font-medium mb-4" style={{ color: 'var(--muted)' }}>Pro Vitalício</div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-display text-2xl line-through" style={{ color: 'var(--muted)' }}>R$ 99,90</span>
            <span className="font-display text-5xl font-black">R$ 29,90</span>
          </div>
          <div className="text-sm mb-2" style={{ color: 'var(--muted)' }}>pagamento único · acesso vitalício</div>
          <div className="text-xs mb-6 px-3 py-1.5 rounded-full self-start font-medium" style={{ background: 'rgba(232,201,107,0.12)', color: 'var(--gold)' }}>⭐ Economize 67% — por tempo limitado</div>
          <div className="h-px mb-6" style={{ background: 'var(--border)' }} />
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {[
              '500+ prompts profissionais completos',
              '22 categorias completas',
              'Novos prompts adicionados todo mês',
              'Busca avançada por categoria',
              'Favoritos ilimitados',
              'Acesso vitalício — pague uma vez',
              'Suporte por e-mail',
            ].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm"><span style={{ color: '#4ADE80' }}>✓</span>{f}</li>
            ))}
          </ul>
          <a href={LINK_VITALICIO} className="block w-full text-center py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 mt-auto" style={{ background: 'var(--accent)' }}>
            Garantir acesso vitalício →
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <svg width="140" height="140" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="goldOuter" cx="38%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff5b0"/><stop offset="40%" stopColor="#E8C96B"/><stop offset="100%" stopColor="#9a7010"/></radialGradient>
            <radialGradient id="goldRing3" cx="40%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff0a0"/><stop offset="45%" stopColor="#E8C96B"/><stop offset="100%" stopColor="#9a7010"/></radialGradient>
            <radialGradient id="centerGrad3" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#9d8ff9"/><stop offset="55%" stopColor="#7C6FF7"/><stop offset="100%" stopColor="#4a3fd4"/></radialGradient>
            <linearGradient id="shineGrad3" x1="0%" y1="0%" x2="55%" y2="100%"><stop offset="0%" stopColor="white" stopOpacity="0.18"/><stop offset="100%" stopColor="white" stopOpacity="0"/></linearGradient>
            <filter id="glow3"><feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.4"/></filter>
            <filter id="textBright3"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E8C96B" floodOpacity="0.8"/></filter>
            <path id="topCurve3" d="M 26,100 A 74,74 0 0,1 174,100"/>
            <path id="botCurve3" d="M 36,118 A 66,66 0 0,0 164,118"/>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#goldOuter)"/>
          <circle cx="100" cy="100" r="88" fill="#b8920a"/>
          <circle cx="100" cy="100" r="85" fill="url(#goldOuter)"/>
          <circle cx="100" cy="100" r="80" fill="url(#goldRing3)"/>
          <circle cx="100" cy="100" r="66" fill="url(#centerGrad3)"/>
          <ellipse cx="84" cy="72" rx="26" ry="15" fill="white" opacity="0.13"/>
          <line x1="44" y1="67" x2="156" y2="67" stroke="#E8C96B" strokeWidth="0.8" opacity="0.6"/>
          <text fontFamily="Arial, sans-serif" fontSize="11" fontWeight="900" fill="#fff8e0" letterSpacing="1.2" filter="url(#textBright3)"><textPath href="#topCurve3" startOffset="50%" textAnchor="middle">100% DINHEIRO DE VOLTA</textPath></text>
          <text x="102" y="116" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="58" fontWeight="900" fill="#0d0840" opacity="0.6">7</text>
          <text x="100" y="114" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="58" fontWeight="900" fill="white" filter="url(#glow3)">7</text>
          <text x="100" y="136" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="800" fill="#E8C96B" letterSpacing="5" filter="url(#glow3)">DIAS</text>
          <text x="58" y="154" textAnchor="middle" fontSize="11" fill="#E8C96B">★</text>
          <text x="142" y="154" textAnchor="middle" fontSize="11" fill="#E8C96B">★</text>
          <text fontFamily="Arial, sans-serif" fontSize="11" fontWeight="900" fill="#fff8e0" letterSpacing="3" filter="url(#textBright3)"><textPath href="#botCurve3" startOffset="50%" textAnchor="middle">GARANTIDO</textPath></text>
          <circle cx="100" cy="100" r="80" fill="url(#shineGrad3)"/>
        </svg>
        <p className="text-xs font-medium text-center" style={{ color: 'var(--muted)' }}>Garantia incondicional de 7 dias — se não gostar, devolvemos 100% do valor</p>
      </div>

      <p className="text-xs mt-8 text-center" style={{ color: 'var(--subtle)' }}>
        Pagamento seguro via Stripe · Cartão de crédito, débito e PIX
      </p>
    </div>
  )
}
