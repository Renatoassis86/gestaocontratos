import { Sidebar } from '@/components/layout/Sidebar'
import { CompanySwitcher } from '@/components/layout/CompanySwitcher'
import { cookies } from 'next/headers'
import styles from './dashboard.module.css'
import { BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { selectCompany } from '../actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'


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

  // 3. Obter Empresas que o usuário pertence (Bypass de todas para renato086@gmail.com)
  const isAdmin = user.email === 'renato086@gmail.com';
  let empresas: any[] = []

  if (isAdmin) {
    const { data: todasEmpresas } = await supabase
      .from('empresas')
      .select('id, razao_social, nome_fantasia')
    
    empresas = todasEmpresas?.map((e: any) => ({
      id: e.id,
      razaoSocial: e.razao_social,
      nomeFantasia: e.nome_fantasia
    })) || []
  } else {
    const { data: usuariosEmpresas } = await supabase
      .from('usuarios_empresas')
      .select('empresa_id, empresas(razao_social, nome_fantasia)')
      .eq('perfil_id', user.id)

    empresas = usuariosEmpresas?.map((ue: any) => ({
      id: ue.empresa_id,
      razaoSocial: ue.empresas.razao_social,
      nomeFantasia: ue.empresas.nome_fantasia
    })) || []
  }


  // 4. Resolver Empresa Ativa de Cookie
  const cookieStore = await cookies()
  const activeCompanyId = cookieStore.get('active_company_id')?.value

  const activeCompany = empresas.find(e => e.id === activeCompanyId) || empresas[0]

  return (
    <div className={styles.layout}>
      <Sidebar currentPath="/dashboard" activeCompany={activeCompany} isAdmin={isAdmin} />


      
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.companySwitcher}>
            <CompanySwitcher empresas={empresas} activeCompany={activeCompany} />
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
