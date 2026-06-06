import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { nome, email, telefone, assunto, mensagem } = await req.json()

    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'PromptIA Pro <suporte@promptiapro.com.br>',
      to: 'suporte@promptiapro.com.br',
      replyTo: email,
      subject: `[Contato] ${assunto} — ${nome}`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a1a1a;border-radius:12px;padding:32px;border:1px solid #2a2a2a;">
          <h2 style="color:#f59e0b;margin:0 0 24px;font-size:20px;">Nova mensagem de contato</h2>
          
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">
                <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Nome</span><br/>
                <span style="color:#f3f4f6;font-size:15px;">${nome}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">
                <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">E-mail</span><br/>
                <a href="mailto:${email}" style="color:#f59e0b;font-size:15px;">${email}</a>
              </td>
            </tr>
            ${telefone ? `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">
                <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Telefone</span><br/>
                <span style="color:#f3f4f6;font-size:15px;">${telefone}</span>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #2a2a2a;">
                <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Assunto</span><br/>
                <span style="color:#f3f4f6;font-size:15px;">${assunto}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0 0;">
                <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Mensagem</span><br/>
                <p style="color:#f3f4f6;font-size:15px;line-height:1.6;margin:8px 0 0;">${mensagem.replace(/\n/g, '<br/>')}</p>
              </td>
            </tr>
          </table>

          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #2a2a2a;">
            <p style="color:#6b7280;font-size:12px;margin:0;">
              Responda diretamente a este e-mail para contatar ${nome}.
            </p>
          </div>
        </div>
      `,
    })

    // E-mail de confirmação para o usuário
    await resend.emails.send({
      from: 'PromptIA Pro <suporte@promptiapro.com.br>',
      to: email,
      subject: 'Recebemos sua mensagem — PromptIA Pro',
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a1a1a;border-radius:12px;padding:32px;border:1px solid #2a2a2a;">
          <h2 style="color:#f59e0b;margin:0 0 16px;font-size:20px;">Mensagem recebida! ✅</h2>
          <p style="color:#d1d5db;font-size:15px;line-height:1.6;margin:0 0 16px;">
            Olá, <strong style="color:#fff;">${nome}</strong>! Recebemos sua mensagem e retornaremos em breve.
          </p>
          <div style="background:#252525;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="color:#9ca3af;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Assunto</p>
            <p style="color:#f3f4f6;font-size:14px;margin:0;">${assunto}</p>
          </div>
          <p style="color:#6b7280;font-size:13px;margin:0;">
            © 2026 PromptIA Pro — <a href="https://www.promptiapro.com.br" style="color:#f59e0b;">promptiapro.com.br</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contato error:', error)
    return NextResponse.json({ error: 'Erro ao enviar mensagem' }, { status: 500 })
  }
}
