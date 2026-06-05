'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default function TermosPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto" style={{ background: 'var(--bg)' }}>
      <Link href="/" className="text-sm mb-8 inline-flex items-center gap-2" style={{ color: 'var(--muted)' }}>← Voltar</Link>
      <h1 className="font-display text-4xl font-black tracking-tight mb-2 mt-6">Termos de Uso</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>Última atualização: junho de 2025</p>

      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
        É importante que você leia com atenção os presentes Termos e Condições de Uso antes de utilizar o serviço. Esses Termos e Condições são as regras para a utilização da plataforma PROMPTIAPRO.
      </p>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
        A PROMPTIAPRO é uma plataforma de prompts por assinatura que tem como objetivo democratizar este conhecimento, proporcionando um método simples, rápido e fácil de utilização das ferramentas de inteligência artificial disponíveis no mercado.
      </p>
      <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
        Os Termos de Uso são um tipo de contrato de adesão. Ao acessar ou utilizar a PROMPTIAPRO, os USUÁRIOS entendem que estão de acordo com as regras apresentadas.
      </p>

      {[
        {
          title: '1. Das Definições',
          content: [
            'USUÁRIO: toda pessoa que contrata uma licença de uso da PROMPTIAPRO, podendo ter acesso à plataforma e a todas suas funcionalidades e ferramentas disponibilizadas.',
            'PROMPTIAPRO: plataforma que disponibiliza ferramentas de prompts profissionais em diversas áreas como Financeira, Jurídica, Contábil, Empresarial, Pessoal, Médica e Atividades Físicas.',
          ]
        },
        {
          title: '2. Do Sistema da PROMPTIAPRO',
          content: [
            'Os USUÁRIOS ficam cientes de que o fluxo completo do serviço disponibilizado pela PROMPTIAPRO dependerá da ratificação de concordância quanto às condições dos Termos de Uso e da Política de Privacidade.',
            'Os dados pessoais solicitados para a realização do cadastro, bem como a finalidade de coleta desses dados, está explicada de maneira detalhada na Política de Privacidade.',
          ]
        },
        {
          title: '3. Do Cadastro do Usuário',
          content: [
            'Para utilizar as funcionalidades da PROMPTIAPRO, o USUÁRIO realizará seu cadastro na plataforma. O fluxo do processo inclui: preenchimento do formulário, cadastro na plataforma e avaliação do formulário.',
            'A disponibilização de acesso à plataforma para dependentes do usuário cadastrado é de opção, escolha e responsabilidade do mesmo.',
          ]
        },
        {
          title: '4. Das Considerações Gerais',
          content: [
            'A PROMPTIAPRO atua como ferramenta de comodidade aos USUÁRIOS, sem participação na execução das ferramentas e dispositivos disponibilizados na plataforma.',
            'A PROMPTIAPRO e seus funcionários se eximem de qualquer responsabilidade em relação ao manejo das ferramentas disponibilizadas aos USUÁRIOS.',
            'A PROMPTIAPRO não garante que as ferramentas funcionarão livres de erros, interrupções ou outras imperfeições.',
            'Os serviços estão disponíveis apenas para pessoas com capacidade legal para contratá-los, sendo vedado o uso por menores de 18 anos.',
          ]
        },
        {
          title: '5. Dos Direitos e das Obrigações dos Usuários',
          content: [
            'Não utilizar a PROMPTIAPRO com qualquer propósito ilegal ou que não atenda a critérios de veracidade.',
            'Não cadastrar informações falsas ou que não pertençam ao USUÁRIO.',
            'Não violar a privacidade do site da PROMPTIAPRO ou de outros USUÁRIOS.',
            'Não enviar arquivos que contenham vírus ou programas que possam causar danos.',
            'Não utilizar os serviços para fins diversos daqueles a que se destinam.',
          ]
        },
        {
          title: '6. Das Responsabilidades',
          content: [
            'Os USUÁRIOS devem fornecer informações verídicas e de sua titularidade.',
            'Os USUÁRIOS devem manter em sigilo sua identificação e senha de acesso.',
            'O USUÁRIO será responsável pela veracidade e exatidão dos dados inseridos.',
            'A PROMPTIAPRO empreenderá esforços para manter a plataforma disponível no mínimo 99,7% durante cada ano de serviço.',
          ]
        },
        {
          title: '7. Cancelamento da Contratação',
          content: [
            'Caso o USUÁRIO deseje cancelar a assinatura, em até 7 dias da data da aquisição do serviço o cancelamento será gratuito.',
            'Caso o pedido de cancelamento ultrapasse esse período, o cancelamento será realizado mediante a cobrança do período mínimo de 30 dias.',
          ]
        },
        {
          title: '8. Da Licença de Uso',
          content: [
            'A partir do primeiro acesso, a PROMPTIAPRO outorga aos USUÁRIOS uma licença de uso não exclusiva, temporária, intransferível e revogável.',
            'Qualquer cópia ou uso não autorizado da plataforma ou do conteúdo constitui violação destes Termos e é terminantemente proibido.',
          ]
        },
        {
          title: '9. Da Relação de Confidencialidade',
          content: [
            'Os USUÁRIOS obrigam-se a garantir o sigilo sobre qualquer informação técnica, comercial, econômica e estratégica revelada durante o uso da plataforma.',
            'Informações confidenciais não podem ser cedidas, transferidas, divulgadas ou veiculadas por quaisquer meios, salvo nas previsões descritas na Política de Privacidade.',
          ]
        },
        {
          title: '10. Das Disposições Finais',
          content: [
            'O USUÁRIO que violar os presentes Termos será notificado a cessar a prática irregular, sem prejuízo das cominações legais cabíveis.',
            'O descumprimento destes Termos dá à PROMPTIAPRO o direito de cancelar, suspender ou excluir o cadastro do USUÁRIO.',
            'O uso comercial da expressão "PROMPTIAPRO" como marca, nome empresarial ou nome de domínio é propriedade de "PROMPTIAPRO DESENVOLVIMENTO E TREINAMENTO LTDA."',
          ]
        },
        {
          title: '11. Do Foro',
          content: [
            'Fica eleito o foro da Comarca de Catanduva, Estado de São Paulo, como competente para dirimir quaisquer controvérsias decorrentes destes Termos de Uso.',
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
          Dúvidas sobre estes Termos? Entre em contato:{' '}
          <a href="mailto:suporte@promptiapro.com.br" style={{ color: 'var(--accent2)' }}>suporte@promptiapro.com.br</a>
        </p>
      </div>
    </div>
  )
}
