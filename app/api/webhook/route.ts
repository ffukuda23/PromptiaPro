import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // Pagamento confirmado (boleto, cartão, PIX)
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        const subscriptionId = invoice.subscription as string

        // Buscar e-mail do cliente no Stripe
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
        const email = customer.email

        if (!email) break

        // Buscar usuário no Supabase pelo e-mail
        const { data: users } = await supabase.auth.admin.listUsers()
        const user = users?.users?.find(u => u.email === email)

        if (!user) break

        // Verificar se já existe assinatura
        const { data: existingList } = await supabase
  .from('subscriptions')
  .select('id')
  .eq('user_id', user.id)

const existing = existingList && existingList.length > 0

        if (existing) {
          // Atualizar assinatura existente
          await supabase
            .from('subscriptions')
            .update({
              plan: 'pro',
              status: 'active',
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              current_period_end: new Date(
                (invoice.period_end) * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
        } else {
          // Criar nova assinatura
          await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan: 'pro',
              status: 'active',
              current_period_end: new Date(
                (invoice.period_end) * 1000
              ).toISOString(),
            })
        }

        console.log(`✅ Plano Pro ativado para: ${email}`)
        break
      }

      // Assinatura cancelada
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await supabase
          .from('subscriptions')
          .update({ plan: 'free', status: 'canceled', updated_at: new Date().toISOString() })
          .eq('stripe_customer_id', customerId)

        console.log(`❌ Assinatura cancelada para customer: ${customerId}`)
        break
      }

      // Pagamento falhou
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        await supabase
          .from('subscriptions')
          .update({ status: 'past_due', updated_at: new Date().toISOString() })
          .eq('stripe_customer_id', customerId)

        console.log(`⚠️ Pagamento falhou para customer: ${customerId}`)
        break
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
