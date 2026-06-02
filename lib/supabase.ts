import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClientComponentClient()
  : createClient('https://placeholder.supabase.co', 'placeholder')

export const supabaseAdmin = supabaseUrl
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '')
  : createClient('https://placeholder.supabase.co', 'placeholder')