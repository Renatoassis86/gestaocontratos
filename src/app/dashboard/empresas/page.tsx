import { createClient } from '@/infrastructure/supabase/server'
import styles from '../dashboard.module.css'
import { Building2 } from 'lucide-react'

export default async function EmpresasPage() {
  const supabase = await createClient()

  // 1. Obter todas as empresas vinculadas ao usuário
  const { data: { user } } = await supabase.auth.getUser()
  const { data: uv } = await supabase
    .from('usuarios_empresas')
    .select('empresa_id, empresas(*)')
    .eq('perfil_id', user?.id)

  const empresas = uv?.map((u: any) => u.empresas) || []

  return (
    <div>
      <h1 className={styles.title}>Empresas</h1>
      <p className={styles.subtitle}>Gestão de Tenants que você pertence.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button className={styles.companySwitcher} style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
          + Cadastrar Empresa
        </button>
      </div>

      <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
        {empresas.length === 0 ? (
          <p style={{ color: 'var(--secondary)', textAlign: 'center' }}>Nenhuma empresa vinculada encontrada.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Razão Social</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>CNPJ</th>
                <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((e: any) => (
                <tr key={e.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>{e.razao_social}</td>
                  <td style={{ padding: '0.75rem 0' }}>{e.cnpj || '-'}</td>
                  <td style={{ padding: '0.75rem 0' }}>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '0.2rem 0.5rem', borderRadius: '5px' }}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
