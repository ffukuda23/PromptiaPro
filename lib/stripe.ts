import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

// IDs dos produtos criados no Stripe (substitua pelos IDs reais)
export const STRIPE_PLANS = {
  PRO_MENSAL: process.env.STRIPE_PRICE_PRO_MENSAL!,
  PRO_ANUAL: process.env.STRIPE_PRICE_PRO_ANUAL!,
}
