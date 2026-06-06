'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { useState } from 'react'

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen px-6 py-16 max-w-2xl mx-auto" style={{ background: 'var(--bg)' }}>
      <Link href="/" className="text-sm mb-8 inline-flex items-center gap-2" style={{ color: 'var(--muted)' }}>← Voltar</Link>
      <h1 className="font-display text-4xl font-black tracking-tight mb-2 mt-6">Contato</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>
        Ficou com alguma dúvida? Envie uma mensagem e responderemos em breve.
      </p>

      {status === 'success' ? (
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--accent)', background: 'var(--surface)' }}>
          <div className="text-3xl mb-3">✅</div>
          <h2 className="font-display text-xl font-bold mb-2">Mensagem enviada!</h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Recebemos seu contato e responderemos em breve no e-mail informado.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-sm underline"
            style={{ color: 'var(--accent2)' }}
          >
            Enviar nova mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Nome</label>
            <input
              type="text"
              required
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              className="w-full rounded-lg px-4 py-3 text-sm outline-none transition"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg)' }}
            />
          </div>

          {/* E-mail e Telefone */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">E-mail</label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Telefone <span style={{ color: 'var(--muted)' }}>(opcional)</span></label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={form.telefone}
                onChange={e => setForm({ ...form, telefone: e.target.value })}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg)' }}
              />
            </div>
          </div>

          {/* Assunto */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Assunto</label>
            <select
              required
              value={form.assunto}
              onChange={e => setForm({ ...form, assunto: e.target.value })}
              className="w-full rounded-lg px-4 py-3 text-sm outline-none"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: form.assunto ? 'var(--fg)' : 'var(--muted)' }}
            >
              <option value="" disabled>Selecione um assunto</option>
              <option value="Dúvida sobre o plano">Dúvida sobre o plano</option>
              <option value="Problema técnico">Problema técnico</option>
              <option value="Cancelamento">Cancelamento</option>
              <option value="Sugestão de prompt">Sugestão de prompt</option>
              <option value="Parceria">Parceria</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Mensagem */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Mensagem</label>
            <textarea
              required
              rows={5}
              placeholder="Descreva sua dúvida ou mensagem..."
              value={form.mensagem}
              onChange={e => setForm({ ...form, mensagem: e.target.value })}
              className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg)' }}
            />
          </div>

          {status === 'error' && (
            <p className="text-sm" style={{ color: '#ef4444' }}>
              Ocorreu um erro ao enviar. Tente novamente ou escreva para suporte@promptiapro.com.br
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded-lg font-bold text-sm transition"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#0f0f0f', opacity: status === 'loading' ? 0.7 : 1 }}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar mensagem →'}
          </button>

        </form>
      )}

      <div className="mt-12 p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Prefere contato direto?{' '}
          <a href="mailto:suporte@promptiapro.com.br" style={{ color: 'var(--accent2)' }}>suporte@promptiapro.com.br</a>
        </p>
      </div>
    </div>
  )
}
