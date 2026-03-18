import { createClient } from '@/infrastructure/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { cookies } from 'next/headers'
import styles from './dashboard.module.css'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Verificar Autenticação
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }



  // 2. Obter Detalhes do Perfil
  const { data: perfil } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Obter Empresas que o usuário pertence
  const { data: usuariosEmpresas } = await supabase
    .from('usuarios_empresas')
    .select('empresa_id, empresas(razao_social, nome_fantasia)')
    .eq('perfil_id', user.id)

  const empresas = usuariosEmpresas?.map((ue: any) => ({
    id: ue.empresa_id,
    razaoSocial: ue.empresas.razao_social,
    nomeFantasia: ue.empresas.nome_fantasia
  })) || []

  // 4. Resolver Empresa Ativa de Cookie
  const cookieStore = await cookies()
  const activeCompanyId = cookieStore.get('active_company_id')?.value

  const activeCompany = empresas.find(e => e.id === activeCompanyId) || empresas[0]

  return (
    <div className={styles.layout}>
      {/* Exemplo de caminho atual fixado para este layout */}
      <Sidebar currentPath="/dashboard" />
      
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.companySwitcher}>
            {activeCompany ? (
              <span className={styles.companyName}>🏢 {activeCompany.nomeFantasia || activeCompany.razaoSocial}</span>
            ) : (
              <span className={styles.placeholder}>Selecione uma empresa</span>
            )}
          </div>
          
          <div className={styles.userMenu}>
            <div className={styles.perfilIcon}>
              {perfil?.nome.charAt(0).toUpperCase()}
            </div>
            <span>{perfil?.nome || user.email}</span>
          </div>
        </header>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  )
}
