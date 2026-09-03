import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de privacidade do PromptIAPro. Saiba como coletamos e protegemos seus dados.',
  robots: { index: true, follow: false },
}

export default function PrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
