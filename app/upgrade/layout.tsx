import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acesso Vitalício Pro',
  description:
    'Garanta acesso vitalício a mais de 2500 prompts profissionais por apenas R$ 29,90 — pagamento único, sem mensalidade.',
  openGraph: {
    title: 'PromptIAPro Pro Vitalício — R$ 29,90 pagamento único',
    description:
      '2500+ prompts profissionais para ChatGPT, Claude e Gemini. Pague uma vez, use para sempre.',
  },
}

export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
