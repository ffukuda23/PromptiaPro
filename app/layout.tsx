import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://www.promptiapro.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: 'dBeHrzHKuOaiPmrpV62zwgPxgFN_pZvHXrF39SMm_To',
  },
  title: {
    default: 'PromptIAPro — Biblioteca de Prompts Profissionais para IA em Português',
    template: '%s | PromptIAPro',
  },
  description:
    'Mais de 500 prompts profissionais testados em finanças, direito, saúde, vendas, carreira e muito mais. ' +
    'Compatíveis com ChatGPT, Claude e Gemini. Copie, personalize e use em segundos.',
  openGraph: {
    title: 'PromptIAPro — Biblioteca de Prompts Profissionais para IA',
    description:
      'Mais de 500 prompts prontos para ChatGPT, Claude e Gemini em português. Finanças, direito, saúde, carreira e muito mais.',
    url: SITE_URL,
    siteName: 'PromptIAPro',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptIAPro — Biblioteca de Prompts Profissionais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptIAPro — Prompts profissionais para IA em português',
    description:
      'Mais de 500 prompts prontos para ChatGPT, Claude e Gemini. Economize horas todo dia.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'PromptIAPro',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      sameAs: ['https://www.instagram.com/hub_promptiapro'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contato@promptiapro.com.br',
        contactType: 'customer support',
        availableLanguage: 'Portuguese',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'PromptIAPro',
      description: 'Biblioteca de prompts profissionais para IA em português',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'pt-BR',
    },
  ],
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
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-body bg-bg text-white antialiased">{children}</body>
    </html>
  )
}
