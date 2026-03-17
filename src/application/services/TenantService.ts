import { createClient } from '@/infrastructure/supabase/server'
import { cookies } from 'next/headers'

export async function getValidatedCompanyId(): Promise<string | null> {
  const supabase = await createClient()

  // 1. Obter usuário logado
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return null

  // 2. Obter Empresas que o usuário pertence
  const { data: usuariosEmpresas } = await supabase
    .from('usuarios_empresas')
    .select('empresa_id')
    .eq('perfil_id', user.id)

  const empresasIds = usuariosEmpresas?.map((ue: any) => ue.empresa_id) || []
  if (empresasIds.length === 0) return null

  // 3. Obter Cookie
  const cookieStore = await cookies()
  const activeCompanyId = cookieStore.get('active_company_id')?.value

  // 4. Validar se o cookie está na lista permitido
  if (activeCompanyId && empresasIds.includes(activeCompanyId)) {
    return activeCompanyId
  }

  // 5. Fallback para primeira empresa se não houver cookie ou se for inválido
  const fallbackId = empresasIds[0]
  if (fallbackId) {
    // Atualizar cookie para evitar disparidades futuras
    cookieStore.set('active_company_id', fallbackId, { secure: true, httpOnly: true })
    return fallbackId
  }

  return null
}
