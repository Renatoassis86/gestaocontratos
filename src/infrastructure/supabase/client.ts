import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://opicfwdrbzyqwgxhrnsv.supabase.co",
    "sb_publishable_oUn2Pqbr8GGDsdyYrEOwAA_zaOst8SG"
  )
}
