'use client'

import { useState, useEffect } from 'react'
import styles from '../../dashboard.module.css'
import Link from 'next/link'
import { Trash2, Edit, Mail, Phone, FileDown, Filter, CheckSquare } from 'lucide-react'
import { createClient } from '@/infrastructure/supabase/client'
import { testMoodleConnection } from '@/app/actions'

export default function AlunosDocumentosPage() {
  const [alunos, setAlunos] = useState<any[]>([])
  const [filteredAlunos, setFilteredAlunos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [docFilter, setDocFilter] = useState('')
  const [testCourseId, setTestCourseId] = useState('')
  const [testDocType, setTestDocType] = useState('historico')
  const [testLogs, setTestLogs] = useState<string[]>([])
  const [testVariables, setTestVariables] = useState<any[]>([])
  const [testLoading, setTestLoading] = useState(false)
  const [moodleCourses, setMoodleCourses] = useState<any[]>([])

  const [activeTab, setActiveTab] = useState<'moodle' | 'salvos'>('moodle')
  const [cursoCategoria, setCursoCategoria] = useState('')
  const [moodleCategories, setMoodleCategories] = useState<any[]>([])
  const [moodleUsers, setMoodleUsers] = useState<any[]>([])

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

  // Carregar cursos e categorias do Moodle
  useEffect(() => {
    import('@/app/actions').then(m => {
      m.getMoodleCourses().then(res => {
        if (res.success) {
          setMoodleCourses(res.courses || [])
          setMoodleCategories(res.categories || [])
        }
      })
    })
  }, [])

  const handleTestMoodle = async () => {
    if (!testCourseId) return alert('Escolha um curso do Moodle!')
    setTestLoading(true)
    setTestLogs([])
    setTestVariables([])
    setMoodleUsers([])

    const res = await testMoodleConnection(testCourseId, testDocType)
    setTestLoading(false)
    if (res.logs) setTestLogs(res.logs)
    if (res.variables) setTestVariables(res.variables)
    if (res.allUsers) {
      setMoodleUsers(res.allUsers) // Salvar usuários reais para a tabela
      setActiveTab('moodle') // Mudar aba para focar nos resultados
    }
  }

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
      <h1 className={styles.title}>Integração Moodle</h1>
      <p className={styles.subtitle}>Consulte variáveis, teste a API em tempo real e verifique integridade dos dados.</p>
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>📡 Testar Integração com Moodle</h2>
        <p style={{ color: 'var(--secondary)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Escolha um curso e o tipo de documento para ver as variáveis mapeadas do Moodle.</p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '5px' }}>Categoria ou Curso (Moodle):</label>
            <select 
              value={cursoCategoria}
              onChange={e => setCursoCategoria(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0a0a0b', border: '1px solid var(--border)', color: 'white' }}
            >
              <option value="">Todas as categorias...</option>
              {moodleCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1.5, minWidth: '240px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '5px' }}>Disciplina / Módulo:</label>
            <select 
              value={testCourseId}
              onChange={e => setTestCourseId(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0a0a0b', border: '1px solid var(--border)', color: 'white' }}
            >
              <option value="">Selecione uma disciplina...</option>
              {moodleCourses
                .filter((c: any) => !cursoCategoria || String(c.category) === cursoCategoria)
                .map((c: any) => (
                  <option key={c.id} value={c.id}>{c.fullname} (ID: {c.id})</option>
                ))}
            </select>
          </div>

          <div style={{ width: '160px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '5px' }}>Tipo Documento:</label>
            <select 
              value={testDocType}
              onChange={e => setTestDocType(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0a0a0b', border: '1px solid var(--border)', color: 'white' }}
            >
              <option value="historico">Histórico</option>
              <option value="certificado">Certificado</option>
            </select>
          </div>

          <div style={{ alignSelf: 'flex-end' }}>
            <button 
              onClick={handleTestMoodle}
              disabled={testLoading}
              style={{ padding: '10px 20px', background: 'var(--primary)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: testLoading ? 0.6 : 1 }}
            >
              {testLoading ? 'Carregando...' : 'Carregar Alunos'}
            </button>
          </div>
        </div>

        {testLogs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: '#0a0a0c', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>Logs da API</h3>
              <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.8rem', color: '#8892b0', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {testLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>Variáveis Mapeadas</h3>
              <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {testVariables.length === 0 ? <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Nenhuma variável encontrada.</span> : 
                  testVariables.map((v, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.8rem' }}>
                      <code style={{ color: 'var(--primary)' }}>{v.chave_tag}</code>
                      <span style={{ color: 'white' }}>{v.valor}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Controller */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('moodle')}
          style={{ padding: '10px 20px', background: activeTab === 'moodle' ? 'var(--primary)' : 'transparent', color: activeTab === 'moodle' ? 'black' : 'white', border: 'none', borderBottom: activeTab === 'moodle' ? '2px solid var(--primary)' : 'none', fontWeight: 600, cursor: 'pointer', borderRadius: '8px 8px 0 0' }}
        >
          Alunos do Moodle ({moodleUsers.length})
        </button>
        <button 
          onClick={() => setActiveTab('salvos')}
          style={{ padding: '10px 20px', background: activeTab === 'salvos' ? 'var(--primary)' : 'transparent', color: activeTab === 'salvos' ? 'black' : 'white', border: 'none', borderBottom: activeTab === 'salvos' ? '2px solid var(--primary)' : 'none', fontWeight: 600, cursor: 'pointer', borderRadius: '8px 8px 0 0' }}
        >
          Documentos Gerados ({alunos.length})
        </button>
      </div>

      {activeTab === 'moodle' ? (
        <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.2rem', overflowX: 'auto' }}>
          {moodleUsers.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--secondary)', padding: '2rem' }}>Carregue os alunos do Moodle no painel acima.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.8rem', width: '40px' }}><input type="checkbox" /></th>
                  <th style={{ padding: '0.8rem' }}>Nome Completo</th>
                  <th style={{ padding: '0.8rem' }}>E-mail</th>
                  <th style={{ padding: '0.8rem' }}>CPF</th>
                  <th style={{ padding: '0.8rem' }}>Carga Horária</th>
                  <th style={{ padding: '0.8rem' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {moodleUsers.map((u: any, i: number) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '0.8rem' }}><input type="checkbox" /></td>
                    <td style={{ padding: '0.8rem', fontWeight: 'bold', color: 'white' }}>{u.fullname}</td>
                    <td style={{ padding: '0.8rem', color: 'var(--secondary)' }}>{u.email}</td>
                    <td style={{ padding: '0.8rem' }}>{u.cpf || '-'}</td>
                    <td style={{ padding: '0.8rem' }}>{u.carga_horaria || '360h'}</td>
                    <td style={{ padding: '0.8rem', display: 'flex', gap: '0.6rem' }}>
                      <button style={{ background: 'rgba(200, 245, 66, 0.1)', color: 'black', border: 'none', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Emitir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <>
          {/* Barra de Ações & Filtros para Salvos */}
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
                  <button onClick={handleBulkEmail} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgb(16,185,129,0.2)', padding: '10px 14px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={16} /> Disparar Email ({selectedIds.length})</button>
                  <button onClick={handleBulkWhatsapp} style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: '1px solid rgb(37,99,235,0.2)', padding: '10px 14px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={16} /> WhatsApp Massa</button>
                </>
              )}
              <Link href="/dashboard/documentos/alunos/emitir">
                <button style={{ background: 'var(--primary)', color: '#000', fontWeight: 700, border: 'none', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer' }}>+ Emitir Documento</button>
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
                        <span style={{ fontSize: '0.75rem', background: 'rgba(200, 245, 66, 0.05)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>{d.templates_contrato?.tipos_contrato?.titulo || 'Documento'}</span>
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
        </>
      )}
    </div>
  )
}
