import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

function emailBoasVindas(email: string) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bem-vindo ao Plano Pro</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
          <tr>
            <td style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:40px;text-align:center;">
              <div style="font-size:36px;margin-bottom:8px;">🤖</div>
              <h1 style="margin:0;color:#0f0f0f;font-size:28px;font-weight:800;letter-spacing:-0.5px;">PromptIA Pro</h1>
              <p style="margin:8px 0 0;color:#0f0f0f;opacity:0.7;font-size:14px;">Plataforma de Prompts Profissionais</p>
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px;">
              <h2 style="margin:0 0 16px;color:#f59e0b;font-size:22px;font-weight:700;">🎉 Seu Acesso Vitalício está ativo!</h2>
              <p style="margin:0 0 24px;color:#d1d5db;font-size:16px;line-height:1.6;">
                Parabéns! Seu <strong style="color:#fff;">Acesso Pro Vitalício</strong> foi ativado com sucesso.
                Você pagou uma vez e tem acesso para sempre a todos os prompts profissionais da plataforma.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#252525;border-radius:12px;padding:24px;margin-bottom:32px;">
                <tr><td>
                  <p style="margin:0 0 16px;color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">O que você desbloqueou</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:8px 0;color:#d1d5db;font-size:15px;">⭐ 500+ prompts exclusivos Pro</td></tr>
                    <tr><td style="padding:8px 0;color:#d1d5db;font-size:15px;">📂 22 categorias profissionais completas</td></tr>
                    <tr><td style="padding:8px 0;color:#d1d5db;font-size:15px;">🔄 Novos prompts todo mês — sem custo adicional</td></tr>
                    <tr><td style="padding:8px 0;color:#d1d5db;font-size:15px;">♾️ Acesso vitalício — pague uma vez, use sempre</td></tr>
                  </table>
                </td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://www.promptiapro.com.br/dashboard"
                       style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0f0f0f;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:10px;letter-spacing:0.3px;">
                      Acessar meus prompts →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#111;padding:24px 40px;border-top:1px solid #2a2a2a;">
              <p style="margin:0;color:#6b7280;font-size:13px;text-align:center;line-height:1.6;">
                Dúvidas? Fale conosco em
                <a href="mailto:suporte@promptiapro.com.br" style="color:#f59e0b;text-decoration:none;">suporte@promptiapro.com.br</a>
                <br/>© 2026 PromptIA Pro — Todos os direitos reservados
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // ── Pagamento único (vitalício) ──
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const customerId = paymentIntent.customer as string
        if (!customerId) break

        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
        const email = customer.email
        if (!email) break

        const { data: users } = await supabase.auth.admin.listUsers()
        const user = users?.users?.find(u => u.email === email)
        if (!user) break

        const { data: existingList } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)

        const existing = existingList && existingList.length > 0

        if (existing) {
          await supabase
            .from('subscriptions')
            .update({
              plan: 'pro',
              status: 'active',
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
        } else {
          await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              stripe_customer_id: customerId,
              plan: 'pro',
              status: 'active',
            })
        }

        await resend.emails.send({
          from: 'PromptIA Pro <suporte@promptiapro.com.br>',
          to: email,
          subject: '🎉 Seu Acesso Vitalício está ativo — PromptIA Pro',
          html: emailBoasVindas(email),
        })

        console.log(`✅ Acesso vitalício ativado para: ${email}`)
        break
      }

      // ── Pagamento por assinatura (legado) ──
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        const subscriptionId = invoice.subscription as string

        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
        const email = customer.email
        if (!email) break

        const { data: users } = await supabase.auth.admin.listUsers()
        const user = users?.users?.find(u => u.email === email)
        if (!user) break

        const { data: existingList } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)

        const existing = existingList && existingList.length > 0

        if (existing) {
          await supabase
            .from('subscriptions')
            .update({
              plan: 'pro',
              status: 'active',
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              current_period_end: new Date((invoice.period_end) * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
        } else {
          await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan: 'pro',
              status: 'active',
              current_period_end: new Date((invoice.period_end) * 1000).toISOString(),
            })
        }

        await resend.emails.send({
          from: 'PromptIA Pro <suporte@promptiapro.com.br>',
          to: email,
          subject: '🎉 Seu Plano Pro está ativo — PromptIA Pro',
          html: emailBoasVindas(email),
        })

        console.log(`✅ Plano Pro ativado para: ${email}`)
        break
      }

      // ── Assinatura cancelada ──
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

      // ── Pagamento falhou ──
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
