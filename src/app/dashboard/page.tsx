import { createClient } from '@/infrastructure/supabase/server'
import styles from './dashboard.module.css'
import { Building2, Users, FileText } from 'lucide-react'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const supabase = await createClient()

  const cookieStore = await cookies()
  const activeCompanyId = cookieStore.get('active_company_id')?.value

  // 1. Obter Estatísticas da Empresa Ativa
  let countEmpresas = 0
  let countPessoas = 0
  let countContratos = 0

  if (activeCompanyId) {
    // Conta Pessoas da Empresa Ativa
    const { count: pessoasCount } = await supabase
      .from('pessoas')
      .select('*', { count: 'exact', head: true })
      .eq('empresa_id', activeCompanyId)

    // Conta Contratos da Empresa Ativa
    const { count: contratosCount } = await supabase
      .from('contratos')
      .select('*', { count: 'exact', head: true })
      .eq('empresa_id', activeCompanyId)

    countPessoas = pessoasCount || 0
    countContratos = contratosCount || 0
  }

  // Conta total de empresas que o usuário tem vínculo
  const { count: empresasCount } = await supabase
    .from('usuarios_empresas')
    .select('*', { count: 'exact', head: true })

  countEmpresas = empresasCount || 0

  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Visão geral dos seus dados e operação.</p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.iconWrapper}>
            <Building2 size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Minhas Empresas</span>
            <span className={styles.statValue}>{countEmpresas}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconWrapper}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Pessoas Cadastradas</span>
            <span className={styles.statValue}>{countPessoas}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconWrapper}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Contratos Ativos</span>
            <span className={styles.statValue}>{countContratos}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
