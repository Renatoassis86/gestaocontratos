'use client'

import { useState, useEffect } from 'react'
import styles from '../../dashboard.module.css'
import Link from 'next/link'
import { Trash2, Edit, Mail, Phone, FileDown, Filter, CheckSquare } from 'lucide-react'
import { createClient } from '@/infrastructure/supabase/client'

export default function AlunosDocumentosPage() {
  const [alunos, setAlunos] = useState<any[]>([])
  const [filteredAlunos, setFilteredAlunos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [docFilter, setDocFilter] = useState('')

  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: documentos } = await supabase
        .from('contratos')
        .select('*, templates_contrato(*, tipos_contrato(titulo))')
        .order('created_at', { ascending: false })

      const alunosData = documentos?.filter((d: any) => 
        d.templates_contrato?.tipos_contrato?.titulo.toLowerCase().includes('histórico') ||
        d.templates_contrato?.tipos_contrato?.titulo.toLowerCase().includes('certificado')
      ) || []

      setAlunos(alunosData)
      setFilteredAlunos(alunosData)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    let result = alunos
    if (docFilter) {
      result = alunos.filter((d: any) => 
         d.templates_contrato?.tipos_contrato?.titulo === docFilter
      )
    }
    setFilteredAlunos(result)
  }, [docFilter, alunos])

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAlunos.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredAlunos.map(a => a.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleBulkEmail = () => {
    alert(`Enviando Email padrão com anexo para ${selectedIds.length} alunos!`)
  }

  const handleBulkWhatsapp = () => {
    alert(`Enviando WhatsApp padrão para ${selectedIds.length} alunos!`)
  }

  const uniqueDocTypes = Array.from(new Set(alunos.map((d: any) => d.templates_contrato?.tipos_contrato?.titulo))).filter(Boolean)

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Carregando documentos...</div>

  return (
    <div>
      <h1 className={styles.title}>Alunos e Documentos</h1>
      <p className={styles.subtitle}>Gerenciamento de emissões em lote, históricos e certificados Cidade Viva.</p>

      {/* Barra de Ações & Filtros */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Filter size={18} style={{ color: 'var(--secondary)' }} />
          <select 
            value={docFilter}
            onChange={e => setDocFilter(e.target.value)}
            style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'white' }}
          >
            <option value="">Todos os Documentos</option>
            {uniqueDocTypes.map((t: any, i) => <option key={i} value={t} style={{ background: '#0A0C0F' }}>{t}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {selectedIds.length > 0 && (
            <>
              <button 
                onClick={handleBulkEmail}
                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '10px 14px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={16} /> Disparar Email ({selectedIds.length})
              </button>
              <button 
                onClick={handleBulkWhatsapp}
                style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.2)', padding: '10px 14px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Phone size={16} /> WhatsApp Massa
              </button>
            </>
          )}

          <Link href="/dashboard/documentos/alunos/emitir">
            <button style={{ background: 'var(--primary)', color: '#000', fontWeight: 700, border: 'none', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer' }}>
              + Emitir Documento
            </button>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.8rem', width: '40px' }}>
                <input type="checkbox" checked={selectedIds.length === filteredAlunos.length && filteredAlunos.length > 0} onChange={toggleSelectAll} style={{ cursor: 'pointer' }} />
              </th>
              <th style={{ padding: '0.8rem' }}>Aluno</th>
              <th style={{ padding: '0.8rem' }}>Curso</th>
              <th style={{ padding: '0.8rem' }}>Documento</th>
              <th style={{ padding: '0.8rem' }}>C.R.A</th>
              <th style={{ padding: '0.8rem' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary)' }}>Nenhum documento encontrado para os filtros ativos.</td></tr>
            ) : (
              filteredAlunos.map((d: any) => (
                <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', background: selectedIds.includes(d.id) ? 'rgba(200, 245, 66, 0.02)' : 'transparent' }}>
                  <td style={{ padding: '0.8rem' }}>
                    <input type="checkbox" checked={selectedIds.includes(d.id)} onChange={() => toggleSelect(d.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '0.8rem', fontWeight: 'bold', color: 'white' }}>{d.dados_preenchimento?.NOME_ALUNO}</td>
                  <td style={{ padding: '0.8rem', fontSize: '0.82rem', color: 'var(--secondary)' }}>{d.dados_preenchimento?.CURSO || d.templates_contrato?.titulo}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(200, 245, 66, 0.05)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>
                      {d.templates_contrato?.tipos_contrato?.titulo || 'Documento'}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem', color: 'white' }}>{d.dados_preenchimento?.CRA || '-'}</td>
                  
                  <td style={{ padding: '0.8rem', display: 'flex', gap: '0.6rem' }}>
                    <a href={`/api/documentos/${d.id}/gerar?format=pdf`} target="_blank" style={{ color: '#ef4444' }} title="Baixar PDF"><FileDown size={18} /></a>
                    <Link href={`/dashboard/documentos/${d.id}/detalhe`} style={{ color: 'var(--primary)' }} title="Editar"><Edit size={18} /></Link>
                    <button style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }} title="Emails"><Mail size={18} /></button>
                    <button style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }} title="WhatsApp"><Phone size={18} /></button>
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Excluir"><Trash2 size={18} /></button>
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
