export type Plan = 'free' | 'pro'

export interface Prompt {
  id: string
  title: string
  description: string
  body: string
  group_name: string
  subgroup: string | null
  plan: Plan
  created_at: string
  format?: 'texto' | 'imagem' | 'video'
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: Plan
  status: 'active' | 'canceled' | 'past_due'
  current_period_end: string | null
}

export interface UserProfile {
  id: string
  email: string
  plan: Plan
  subscription?: Subscription
}
