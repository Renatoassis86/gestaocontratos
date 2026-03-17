import { createClient } from '@/infrastructure/supabase/server'
import styles from '../dashboard.module.css'
import { getValidatedCompanyId } from '@/application/services/TenantService'
import Link from 'next/link'

export default async function ContratosPage() {
  const supabase = await createClient()

  // 1. Obter Empresa Ativa Validada
  const activeCompanyId = await getValidatedCompanyId()

  let contratos: any[] = []

  if (activeCompanyId) {
    const { data } = await supabase
      .from('contratos')
      .select('*, tipos_contrato(titulo)')
      .eq('empresa_id', activeCompanyId)
      .order('created_at', { ascending: false })
    contratos = data || []
  }

  return (
    <div>
      <h1 className={styles.title}>Contratos</h1>
      <p className={styles.subtitle}>Gestão e acompanhamento das minutas e documentos jurídicos.</p>

      {!activeCompanyId && (
        <p style={{ color: 'var(--danger)', fontStyle: 'italic' }}>
          ⚠️ Selecione ou Cadastre uma empresa para listar os contratos.
        </p>
      )}

      {activeCompanyId && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <Link href="/dashboard/contratos/novo" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '12px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
              + Novo Contrato
            </Link>
          </div>

          <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
            {contratos.length === 0 ? (
              <p style={{ color: 'var(--secondary)', textAlign: 'center' }}>Nenhum contrato gerado para esta empresa.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Título</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Tipo</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Status</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Criado em</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contratos.map((c: any) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>{c.titulo}</td>
                      <td style={{ padding: '0.75rem 0' }}>{c.tipos_contrato?.titulo || '-'}</td>
                      <td style={{ padding: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.4rem', borderRadius: '6px' }}>
                          {c.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0', color: 'var(--secondary)', fontSize: '0.85rem' }}>
                        {new Date(c.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={{ padding: '0.75rem 0' }}>
                        <Link href={`/dashboard/contratos/${c.id}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}>
                          Visualizar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  )
}
  
