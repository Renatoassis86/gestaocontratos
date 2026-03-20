import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    "https://opicfwdrbzyqwgxhrnsv.supabase.co",
    "sb_publishable_oUn2Pqbr8GGDsdyYrEOwAA_zaOst8SG",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Rejeita silenciosamente se chamado em Server Component
          }
        },
      },
    }
  )
}
