import { createClient } from '@/infrastructure/supabase/server'
import styles from '../dashboard.module.css'
import { getValidatedCompanyId } from '@/application/services/TenantService'

export default async function TemplatesPage() {
  const supabase = await createClient()

  // 1. Obter Empresa Ativa Validada
  const activeCompanyId = await getValidatedCompanyId()

  let templates: any[] = []

  if (activeCompanyId) {
    const { data } = await supabase
      .from('templates_contrato')
      .select('*, tipos_contrato(titulo)')
      .eq('empresa_id', activeCompanyId)
    templates = data || []
  }

  return (
    <div>
      <h1 className={styles.title}>Templates de Contratos</h1>
      <p className={styles.subtitle}>Gestão de modelos e conteúdos base pré-aprovados.</p>

      {!activeCompanyId && (
        <p style={{ color: 'var(--danger)', fontStyle: 'italic' }}>
          ⚠️ Selecione ou Cadastre uma empresa para listar os templates.
        </p>
      )}

      {activeCompanyId && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button className={styles.companySwitcher} style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
              + Novo Template
            </button>
          </div>

          <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
            {templates.length === 0 ? (
              <p style={{ color: 'var(--secondary)', textAlign: 'center' }}>Nenhum template cadastrado para esta empresa.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Título</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Tipo</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Versão</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((t: any) => (
                    <tr key={t.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>{t.titulo}</td>
                      <td style={{ padding: '0.75rem 0' }}>{t.tipos_contrato?.titulo || '-'}</td>
                      <td style={{ padding: '0.75rem 0' }}>{t.versao || '1.0.0'}</td>
                      <td style={{ padding: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.8rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '5px' }}>
                          {t.status}
                        </span>
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
  
