import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PromptIAPro — Biblioteca de Prompts Profissionais',
  description: 'Mais de 800 prompts profissionais testados em finanças, direito, saúde, vendas, idiomas e muito mais.',
  openGraph: {
    title: 'PromptIAPro',
    description: 'Biblioteca profissional de prompts por assinatura',
    url: 'https://www.promptiapro.com.br',
    siteName: 'PromptIAPro',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
