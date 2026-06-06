'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto" style={{ background: 'var(--bg)' }}>
      <Link href="/" className="text-sm mb-8 inline-flex items-center gap-2" style={{ color: 'var(--muted)' }}>← Voltar</Link>
      <h1 className="font-display text-4xl font-black tracking-tight mb-2 mt-6">Política de Privacidade</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>Última atualização: junho de 2025</p>

      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
        A PROMPTIAPRO valoriza a privacidade dos seus usuários e está comprometida em proteger os dados pessoais coletados durante o uso da plataforma. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
      </p>
      <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
        Ao utilizar a PROMPTIAPRO, você concorda com os termos desta Política de Privacidade. Caso não concorde, recomendamos que não utilize nossos serviços.
      </p>

      {[
        {
          title: '1. Dados Coletados',
          content: [
            'Dados de cadastro: nome, e-mail e senha para criação e acesso à conta.',
            'Dados de pagamento: processados de forma segura pelo Stripe. A PROMPTIAPRO não armazena dados de cartão de crédito.',
            'Dados de uso: informações sobre como você utiliza a plataforma, como prompts acessados e tempo de sessão.',
            'Dados técnicos: endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo.',
          ]
        },
        {
          title: '2. Finalidade do Tratamento de Dados',
          content: [
            'Criar e gerenciar sua conta na plataforma.',
            'Processar pagamentos e gerenciar assinaturas.',
            'Enviar comunicações transacionais, como confirmação de cadastro e ativação do plano.',
            'Melhorar continuamente os serviços e a experiência do usuário.',
            'Cumprir obrigações legais e regulatórias.',
          ]
        },
        {
          title: '3. Base Legal para o Tratamento',
          content: [
            'Execução de contrato: tratamento necessário para prestar os serviços contratados pelo usuário.',
            'Consentimento: quando o usuário fornece seus dados voluntariamente ao se cadastrar.',
            'Legítimo interesse: para melhoria dos serviços e segurança da plataforma.',
            'Cumprimento de obrigação legal: quando exigido por lei ou autoridade competente.',
          ]
        },
        {
          title: '4. Compartilhamento de Dados',
          content: [
            'Stripe: processamento seguro de pagamentos e assinaturas.',
            'Supabase: infraestrutura de banco de dados e autenticação.',
            'Vercel: hospedagem e entrega da plataforma.',
            'Resend: envio de e-mails transacionais.',
            'A PROMPTIAPRO não vende, aluga ou compartilha seus dados com terceiros para fins de marketing sem seu consentimento expresso.',
          ]
        },
        {
          title: '5. Armazenamento e Segurança',
          content: [
            'Os dados são armazenados em servidores seguros com criptografia em trânsito (TLS) e em repouso.',
            'Senhas são armazenadas com hash seguro e nunca em texto puro.',
            'Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado.',
            'Em caso de incidente de segurança que afete seus dados, você será notificado conforme exigido pela LGPD.',
          ]
        },
        {
          title: '6. Direitos do Titular',
          content: [
            'Confirmação da existência de tratamento dos seus dados pessoais.',
            'Acesso aos dados que temos sobre você.',
            'Correção de dados incompletos, inexatos ou desatualizados.',
            'Portabilidade dos seus dados a outro fornecedor de serviço.',
            'Eliminação dos dados pessoais tratados com base no consentimento.',
            'Revogação do consentimento a qualquer momento.',
            'Para exercer seus direitos, entre em contato pelo e-mail: suporte@promptiapro.com.br',
          ]
        },
        {
          title: '7. Retenção de Dados',
          content: [
            'Seus dados são mantidos enquanto sua conta estiver ativa ou pelo período necessário para prestar os serviços.',
            'Após o cancelamento da conta, os dados podem ser mantidos por até 5 anos para cumprimento de obrigações legais.',
            'Dados de pagamento são mantidos conforme exigido pela legislação fiscal e contábil aplicável.',
          ]
        },
        {
          title: '8. Cookies e Tecnologias de Rastreamento',
          content: [
            'Utilizamos cookies essenciais para o funcionamento da plataforma, como autenticação e preferências de sessão.',
            'Não utilizamos cookies de rastreamento para publicidade ou compartilhamento com redes de anúncios.',
            'Você pode configurar seu navegador para recusar cookies, mas isso pode afetar o funcionamento da plataforma.',
          ]
        },
        {
          title: '9. Transferência Internacional de Dados',
          content: [
            'Alguns de nossos fornecedores de infraestrutura (Stripe, Supabase, Vercel) podem processar dados fora do Brasil.',
            'Nesses casos, garantimos que os fornecedores adotam medidas adequadas de proteção de dados equivalentes às exigidas pela LGPD.',
          ]
        },
        {
          title: '10. Alterações nesta Política',
          content: [
            'Podemos atualizar esta Política de Privacidade periodicamente.',
            'Alterações significativas serão comunicadas por e-mail ou por aviso destacado na plataforma.',
            'O uso continuado da plataforma após as alterações implica na aceitação da nova política.',
          ]
        },
        {
          title: '11. Encarregado de Proteção de Dados (DPO)',
          content: [
            'Para questões relacionadas à privacidade e proteção de dados, entre em contato com nosso encarregado:',
            'E-mail: suporte@promptiapro.com.br',
            'PROMPTIAPRO DESENVOLVIMENTO E TREINAMENTO LTDA.',
            'Catanduva — SP, Brasil',
          ]
        },
        {
          title: '12. Foro',
          content: [
            'Fica eleito o foro da Comarca de Catanduva, Estado de São Paulo, como competente para dirimir quaisquer controvérsias decorrentes desta Política de Privacidade.',
          ]
        },
      ].map(s => (
        <div key={s.title} className="mb-8">
          <h2 className="font-display text-lg font-bold mb-3">{s.title}</h2>
          <ul className="flex flex-col gap-2">
            {s.content.map((item, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>{item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-10 p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Dúvidas sobre esta Política? Entre em contato:{' '}
          <a href="mailto:suporte@promptiapro.com.br" style={{ color: 'var(--accent2)' }}>suporte@promptiapro.com.br</a>
        </p>
      </div>
    </div>
  )
}
