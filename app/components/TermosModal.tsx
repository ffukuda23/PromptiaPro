'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface TermosModalProps {
  onAccept: () => void
}

export default function TermosModal({ onAccept }: TermosModalProps) {
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    if (!accepted) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('user_consents').upsert({
        user_id: user.id,
        accepted_at: new Date().toISOString(),
        version: '1.0',
      })
    }
    setLoading(false)
    onAccept()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-2xl rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>

        {/* Header */}
        <div className="px-8 py-5 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">📋</span>
            <h2 className="font-display text-lg font-black tracking-tight">Termo de Licença e Consentimento de Uso</h2>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Última atualização: junho de 2026 · Leia com atenção antes de continuar.
          </p>
        </div>

        {/* Conteúdo com scroll */}
        <div className="px-8 py-5 overflow-y-auto text-sm leading-relaxed space-y-5" style={{ maxHeight: '48vh', color: 'var(--muted)' }}>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>1. OBJETO</p>
            <p>Este termo regula o uso do produto digital adquirido junto à:</p>
            <p className="mt-1 p-3 rounded-lg text-xs" style={{ background: 'var(--bg)', color: 'var(--muted)' }}>
              <strong style={{ color: '#F0EFF8' }}>EMPRESA:</strong> PromptIA Pro Desenvolvimento e Treinamento Ltda.<br/>
              <strong style={{ color: '#F0EFF8' }}>PRODUTO:</strong> PromptIA Pro — Plataforma de Prompts Profissionais
            </p>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>2. LICENÇA DE USO</p>
            <p>O CLIENTE recebe uma licença de uso <strong style={{ color: '#F0EFF8' }}>não exclusiva, intransferível e revogável</strong> em caso de descumprimento. A compra não transfere qualquer direito de propriedade intelectual ao CLIENTE.</p>
          </div>

          <div>
            <p className="font-semibold mb-2" style={{ color: '#F0EFF8' }}>3. USO PERMITIDO</p>
            <div className="space-y-1">
              {['Utilizar o conteúdo para fins pessoais ou internos da sua empresa.','Fazer download para uso próprio.','Acessar o conteúdo pelo período contratado.'].map(t => (
                <p key={t} className="flex gap-2"><span style={{ color: '#4ADE80' }}>✔</span>{t}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2" style={{ color: '#F0EFF8' }}>4. USO PROIBIDO</p>
            <div className="space-y-1">
              {['Compartilhar login e senha.','Revender ou distribuir gratuitamente o material.','Publicar em sites, grupos, redes sociais ou plataformas de terceiros.','Copiar integral ou parcialmente o conteúdo para comercialização.','Alterar, remover ou ocultar marcas, logotipos ou créditos do autor.'].map(t => (
                <p key={t} className="flex gap-2"><span style={{ color: '#F87171' }}>❌</span>{t}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>5. DIREITOS AUTORAIS</p>
            <p>Todo o conteúdo é protegido pela <strong style={{ color: '#F0EFF8' }}>Lei nº 9.610/98</strong>. A reprodução não autorizada poderá gerar cancelamento imediato do acesso, indenização por perdas e danos, e responsabilização civil e criminal.</p>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>6. POLÍTICA DE REEMBOLSO</p>
            <p>Compras realizadas fora do estabelecimento comercial observam o prazo de arrependimento de <strong style={{ color: '#F0EFF8' }}>7 (sete) dias</strong>, conforme o Código de Defesa do Consumidor.</p>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>7. PROTEÇÃO DE DADOS (LGPD)</p>
            <p>O CLIENTE autoriza o tratamento dos seus dados pessoais para processamento da compra, liberação de acesso, emissão de documentos fiscais e comunicações de suporte, conforme a <strong style={{ color: '#F0EFF8' }}>Lei nº 13.709/2018</strong>.</p>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>8. SUPORTE</p>
            <p>O suporte será prestado pelos canais informados na plataforma. Não inclui consultoria personalizada, salvo quando expressamente contratado.</p>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>9. CANCELAMENTO DE ACESSO</p>
            <p>A empresa poderá cancelar imediatamente o acesso em caso de compartilhamento indevido, pirataria ou violação deste termo, sem prejuízo das medidas judiciais cabíveis.</p>
          </div>

          <div>
            <p className="font-semibold mb-1" style={{ color: '#F0EFF8' }}>10. FORO</p>
            <p>Fica eleito o foro da Comarca de <strong style={{ color: '#F0EFF8' }}>Catanduva, São Paulo</strong>, para dirimir quaisquer controvérsias decorrentes deste termo.</p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t space-y-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border transition-colors"
            style={{ borderColor: accepted ? 'var(--accent)' : 'var(--border)', background: accepted ? 'rgba(124,111,247,0.08)' : 'transparent' }}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={e => setAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 cursor-pointer accent-purple-500 flex-shrink-0"
            />
            <span className="text-sm" style={{ color: accepted ? '#F0EFF8' : 'var(--muted)' }}>
              <strong>Li e concordo integralmente</strong> com o Termo de Licença e Consentimento de Uso da PromptIA Pro.
            </span>
          </label>

          <button
            onClick={handleAccept}
            disabled={!accepted || loading}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              background: accepted ? 'linear-gradient(135deg,#a855f7,#7c3aed)' : 'var(--border)',
              color: accepted ? '#fff' : 'var(--muted)',
              cursor: accepted ? 'pointer' : 'not-allowed',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Salvando aceite...' : 'Aceitar e acessar a plataforma →'}
          </button>
        </div>

      </div>
    </div>
  )
}

