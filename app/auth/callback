'use client'
// app/auth/callback/page.tsx
//
// Página client-side que lida com o retorno do OAuth (implicit flow).
// O Supabase JS lê o #access_token do hash da URL automaticamente
// e cria a sessão — só precisamos detectar o login e redirecionar.
//
// ⚠️  Se você tinha um arquivo route.ts nesta mesma pasta, delete-o.
//     Next.js não permite page.tsx + route.ts no mesmo diretório.

import { useEffect } from 'react'	
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // 1. Verifica se já existe sessão (pode ter sido setada instantaneamente)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/dashboard')
        return
      }
    })

    // 2. Escuta a mudança de estado — o Supabase dispara SIGNED_IN
    //    assim que processa o #access_token do hash da URL
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe()
          router.replace('/dashboard')
        }
        // Se algo der errado, manda pro login
        if (event === 'SIGNED_OUT') {
          subscription.unsubscribe()
          router.replace('/auth/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      <div className="text-center">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent mx-auto mb-4 animate-spin"
          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
        />
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Autenticando sua conta…
        </p>
      </div>
    </div>
  )
}
