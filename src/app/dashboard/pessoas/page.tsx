import { createClient } from '@/infrastructure/supabase/server'
import styles from '../dashboard.module.css'
import { getValidatedCompanyId } from '@/application/services/TenantService'

export default async function PessoasPage() {
  const supabase = await createClient()

  // 1. Obter Empresa Ativa Validada
  const activeCompanyId = await getValidatedCompanyId()


  let pessoas: any[] = []

  if (activeCompanyId) {
    const { data } = await supabase
      .from('pessoas')
      .select('*')
      .eq('empresa_id', activeCompanyId)
    pessoas = data || []
  }

  return (
    <div>
      <h1 className={styles.title}>Pessoas</h1>
      <p className={styles.subtitle}>Gestão de Fornecedores, Clientes e Testemunhas da empresa ativa.</p>

      {!activeCompanyId && (
        <p style={{ color: 'var(--danger)', fontStyle: 'italic' }}>
          ⚠️ Selecione ou Cadastre uma empresa para listar as pessoas vinculadas.
        </p>
      )}

      {activeCompanyId && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1.5rem' }}>
            <a href="/api/planilha/modelo/pessoas" download style={{ textDecoration: 'none' }}>
              <button style={{ background: 'rgba(200, 245, 66, 0.1)', color: 'var(--primary)', border: '1px solid rgba(200, 245, 66, 0.2)', padding: '10px 16px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>
                Baixar Planilha Modelo (.xlsx)
              </button>
            </a>


            <button style={{ background: 'rgba(255,255,255,0.02)', color: 'white', border: '1px solid var(--border)', padding: '10px 16px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Importar Planilha (.xls)
            </button>

            
            <button style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
              + Cadastrar Pessoa
            </button>
          </div>




          <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
            {pessoas.length === 0 ? (
              <p style={{ color: 'var(--secondary)', textAlign: 'center' }}>Nenhuma pessoa cadastrada para esta empresa.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Nome / Razão Social</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>CPF/CNPJ</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Email</th>
                    <th style={{ padding: '0.75rem 0', color: 'var(--secondary)' }}>Eixos</th>
                  </tr>
                </thead>
                <tbody>
                  {pessoas.map((p: any) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <td style={{ padding: '0.75rem 0', fontWeight: 'bold' }}>{p.nome_razao_social}</td>
                      <td style={{ padding: '0.75rem 0' }}>{p.documento || '-'}</td>
                      <td style={{ padding: '0.75rem 0' }}>{p.email_contato || '-'}</td>
                      <td style={{ padding: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.8rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '5px' }}>
                          {p.tipo_pessoa}
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
