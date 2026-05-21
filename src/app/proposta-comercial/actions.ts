'use server'

import { createClient } from '@/infrastructure/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'proposta_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8h

function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function propostaSignIn(formData: FormData) {
  const empresaRaw = (formData.get('empresa') as string | null) ?? ''
  const senha = (formData.get('senha') as string | null) ?? ''

  const slug = toSlug(empresaRaw)

  if (!slug || !senha) {
    redirect(`/proposta-comercial?error=${encodeURIComponent('Informe a empresa e a senha.')}`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.rpc('validar_login_proposta', {
    p_slug: slug,
    p_senha: senha,
  })

  if (error || !data || data.length === 0) {
    redirect(`/proposta-comercial?error=${encodeURIComponent('Credenciais inválidas ou proposta inativa.')}`)
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, slug, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })

  redirect(`/proposta-comercial/${slug}`)
}

export async function propostaSignOut() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  redirect('/proposta-comercial')
}
