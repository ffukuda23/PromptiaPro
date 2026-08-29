export interface Prompt {
  id: string
  title: string
  description: string
  body: string
  group_name: string
  subgroup: string | null
  plan: Plan
  created_at: string
  format?: 'texto' | 'imagem' | 'video'  // ← linha nova
}
