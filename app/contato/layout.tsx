import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a equipe do PromptIAPro. Tire dúvidas sobre planos, prompts ou suporte.',
  robots: { index: false, follow: false }, // página de suporte: sem valor para indexar
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
