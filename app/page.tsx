// ─── Homepage (Server Component) ───────────────────────────────────────────────
// A home continua sendo gerada estaticamente, mas agora com ISR: a contagem de
// prompts por categoria é lida da view `prompt_counts` do Supabase no build e
// revalidada a cada hora (revalidate abaixo). O markup interativo mora em
// ./HomeClient ('use client'), que recebe o mapa `counts` já resolvido.
//
// Se o Supabase estiver indisponível no momento da (re)geração, `getPromptCounts`
// devolve {} e cada card cai no número fixo definido em HomeClient (fallback).

import { createClient } from '@supabase/supabase-js'
import HomeClient from './HomeClient'

// Revalida a página (e a contagem) a cada 1 hora.
export const revalidate = 3600

async function getPromptCounts(): Promise<Record<string, number>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Service role quando disponível (ignora RLS numa página pública/anônima);
  // cai na anon key se não estiver configurada.
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return {}

  try {
    const supabase = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // `prompt_counts` = (group_name, subgroup, total). Somamos por group_name
    // para ter o total de cada tema — mesma lógica usada no dashboard.
    const { data, error } = await supabase
      .from('prompt_counts')
      .select('group_name, total')

    if (error || !data) return {}

    const counts: Record<string, number> = {}
    for (const row of data as { group_name: string; total: number }[]) {
      counts[row.group_name] = (counts[row.group_name] || 0) + (row.total || 0)
    }
    return counts
  } catch {
    return {}
  }
}

export default async function Home() {
  const counts = await getPromptCounts()
  return <HomeClient counts={counts} />
}
