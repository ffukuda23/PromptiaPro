import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso da plataforma PromptIAPro. Leia antes de usar nossos serviços.',
  robots: { index: true, follow: false },
}

export default function TermosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
