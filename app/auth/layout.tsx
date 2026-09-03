import type { Metadata } from 'next'

// Layout compartilhado pelas rotas /auth/login e /auth/register.
// O Next.js aplica este metadata a ambas as páginas como fallback.
// Se quiser títulos diferentes para login e register, crie um layout.tsx
// dentro de cada subpasta em vez deste arquivo compartilhado.
export const metadata: Metadata = {
  title: 'Entrar ou Criar Conta',
  description: 'Acesse sua conta ou crie uma conta gratuita no PromptIAPro.',
  robots: { index: false, follow: false }, // páginas de auth não devem ser indexadas
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
