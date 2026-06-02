# PromptIAPro

Plataforma de prompts profissionais por assinatura.

## Stack
- **Frontend/Backend**: Next.js 14 (App Router)
- **Banco de dados + Auth**: Supabase
- **Pagamentos**: Stripe
- **Hospedagem**: Vercel
- **Domínio**: www.promptiapro.com.br

## Setup local

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env.local` e preencha com suas chaves:
```bash
cp .env.example .env.local
```

Preencha as variáveis:
```
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_SUA_CHAVE
STRIPE_SECRET_KEY=sk_live_SUA_CHAVE
STRIPE_WEBHOOK_SECRET=whsec_SUA_CHAVE
NEXT_PUBLIC_SITE_URL=https://www.promptiapro.com.br
NEXT_PUBLIC_STRIPE_PORTAL_URL=https://billing.stripe.com/p/login/SEU_PORTAL
STRIPE_PRICE_PRO_MENSAL=price_SEU_ID
STRIPE_PRICE_PRO_ANUAL=price_SEU_ID
```

### 3. Rodar localmente
```bash
npm run dev
```
Acesse http://localhost:3000

## Deploy na Vercel

O deploy é automático. Basta fazer push para a branch `main`:
```bash
git add .
git commit -m "primeiro deploy"
git push origin main
```

A Vercel detecta o push e faz o deploy automaticamente.

## Estrutura do projeto
```
app/
  page.tsx              # Landing page
  layout.tsx            # Layout raiz
  globals.css           # Estilos globais
  auth/
    login/page.tsx      # Tela de login
    register/page.tsx   # Tela de cadastro
  dashboard/
    page.tsx            # Dashboard do assinante
  api/
    prompts/            # API de prompts
    stripe/             # Webhooks do Stripe
components/             # Componentes reutilizáveis
lib/
  supabase.ts           # Cliente Supabase
  stripe.ts             # Cliente Stripe
types/
  index.ts              # Tipos TypeScript
```

## Adicionar prompts ao banco

No Supabase SQL Editor, execute:
```sql
INSERT INTO prompts (title, description, body, group_name, subgroup, plan)
VALUES (
  'Título do prompt',
  'Descrição breve',
  'Corpo completo do prompt aqui...',
  'Financeiro Pessoal',
  'Controle de Finanças Pessoais',
  'free' -- ou 'pro'
);
```
