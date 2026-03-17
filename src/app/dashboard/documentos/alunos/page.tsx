import { createClient } from '@/infrastructure/supabase/server'
import styles from '../../dashboard.module.css'
import Link from 'next/link'
import { Trash2, Edit, Mail, Phone, FileDown } from 'lucide-react'

export default async function AlunosDocumentosPage() {
  const supabase = await createClient()

  // 1. Buscar todos os documentos com tipo 'Acadêmico' ou Certificado
  const { data: documentos } = await supabase
    .from('contratos')
    .select('*, templates_contrato(*, tipos_contrato(titulo))')
    .order('created_at', { ascending: false })

  const alunos = documentos?.filter(d => 
    d.templates_contrato?.tipos_contrato?.titulo.toLowerCase().includes('histórico') ||
    d.templates_contrato?.tipos_contrato?.titulo.toLowerCase().includes('certificado')
  ) || []

  return (
    <div>
      <h1 className={styles.title}>Alunos & Documentos</h1>
      <p className={styles.subtitle}>Gerenciamento de emissões em lote, históricos e certificados Cidade Viva.</p>

      <div style={{ marginTop: '1.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--sidebar)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.8rem' }}>Aluno</th>
              <th style={{ padding: '0.8rem' }}>Curso</th>
              <th style={{ padding: '0.8rem' }}>Documento</th>
              <th style={{ padding: '0.8rem' }}>C.R.A</th>
              <th style={{ padding: '0.8rem' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1rem', color: 'var(--secondary)' }}>Nenhum documento emitido encontrado.</td></tr>
            ) : (
              alunos.map((d: any) => (
                <tr key={d.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                  <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{d.dados_preenchimento?.NOME_ALUNO}</td>
                  <td style={{ padding: '0.8rem', fontSize: '0.82rem' }}>{d.templates_contrato?.titulo}</td>
                  <td style={{ padding: '0.8rem', fontSize: '0.75rem', background: 'rgba(37,99,235,0.05)', color: 'var(--primary)', borderRadius: '6px', textAlign: 'center' }}>Ativo</td>
                  <td style={{ padding: '0.8rem' }}>{d.dados_preenchimento?.CRA || '-'}</td>
                  
                  <td style={{ padding: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                    
                    <a href={`/api/documentos/${d.id}/gerar?format=pdf`} target="_blank" style={{ color: '#e11d48' }} title="Baixar PDF"><FileDown size={18} /></a>
                    <Link href={`/dashboard/documentos/${d.id}/detalhe`} style={{ color: 'var(--primary)' }} title="Editar/Ver"><Edit size={18} /></Link>
                    
                    <button style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }} title="Enviar Email"><Mail size={18} /></button>
                    <button style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }} title="Enviar WhatsApp"><Phone size={18} /></button>
                    
                    <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} title="Excluir"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
  
