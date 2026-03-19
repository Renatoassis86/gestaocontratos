'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/infrastructure/supabase/client'
import { FileText, Download, Filter, Check, ListFilter } from 'lucide-react'

export default function RelatoriosPage() {
  const [loading, setLoading] = useState(true)
  const [cursos, setCursos] = useState<any[]>([])
  const [alunos, setAlunos] = useState<any[]>([])

  // Filtros
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')

  // Colunas disponíveis
  const availableColumns = [
    { id: 'nome', label: 'Nome do Aluno' },
    { id: 'email', label: 'E-mail' },
    { id: 'cpf', label: 'CPF' },
    { id: 'data_nascimento', label: 'Data de Nascimento' },
    { id: 'curso', label: 'Curso' },
    { id: 'semestre', label: 'Semestre' },
    { id: 'media_geral', label: 'Média Geral' },
    { id: 'status', label: 'Status' }
  ]

  const [selectedColumns, setSelectedColumns] = useState<string[]>(['nome', 'curso', 'media_geral', 'status'])

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: cData } = await supabase.from('cursos').select('*')
      if (cData) setCursos(cData)

      // Remover simulação e chamar em tempo real se houver curso selecionado - Mas por enquanto, vamos apenas setar vazio e deixar claro se deu erro
      setAlunos([])
      setLoading(false)

      setLoading(false)
    }
    loadData()
  }, [])

  const toggleColumn = (id: string) => {
    if (selectedColumns.includes(id)) {
      setSelectedColumns(selectedColumns.filter(c => c !== id))
    } else {
      setSelectedColumns([...selectedColumns, id])
    }
  }

  const filteredAlunos = alunos.filter(a => {
    const matchCourse = !selectedCourse || a.curso_id === selectedCourse
    const matchSem = !selectedSemester || a.semestre === selectedSemester
    return matchCourse && matchSem
  })

  // Função para exportar como CSV
  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,"
    
    // Cabeçalhos
    const headers = availableColumns
      .filter(c => selectedColumns.includes(c.id))
      .map(c => c.label)
      .join(",")
    csvContent += headers + "\n"

    // Linhas
    filteredAlunos.forEach(aluno => {
      const row = availableColumns
        .filter(c => selectedColumns.includes(c.id))
        .map(c => aluno[c.id] || '')
        .join(",")
      csvContent += row + "\n"
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "relatorio_alunos_global.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'white' }}>Relatórios Dinâmicos</h1>
          <p style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Trabalhe os dados e atributos de alunos de forma global.</p>
        </div>
        <button 
          onClick={handleExport}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          <Download size={16} /> Exportar Planilha
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Painel de Filtros e Colunas */}
        <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', display: 'grid', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Filter size={16} /> FILTROS
            </span>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '4px' }}>Curso:</label>
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}>
                  <option value="">Todos</option>
                  {cursos.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '4px' }}>Semestre:</label>
                <select 
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }}>
                  <option value="">Todos</option>
                  <option value="2024.1">2024.1</option>
                  <option value="2024.2">2024.2</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <ListFilter size={16} /> EXIBIR COLUNAS
            </span>
            <div style={{ display: 'grid', gap: '8px' }}>
              {availableColumns.map(col => (
                <label key={col.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedColumns.includes(col.id)} 
                    onChange={() => toggleColumn(col.id)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  {col.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela Dinâmica */}
        <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1rem', overflowX: 'auto' }}>
          {loading ? (
            <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Carregando dados...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {availableColumns.filter(c => selectedColumns.includes(c.id)).map(col => (
                    <th key={col.id} style={{ padding: '12px 16px', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: 600 }}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAlunos.length === 0 ? (
                  <tr>
                    <td colSpan={selectedColumns.length} style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary)', fontSize: '0.85rem' }}>Nenhum aluno encontrado para os filtros selecionados.</td>
                  </tr>
                ) : (
                  filteredAlunos.map((aluno, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      {availableColumns.filter(c => selectedColumns.includes(c.id)).map(col => (
                        <td key={col.id} style={{ padding: '12px 16px', color: 'white', fontSize: '0.85rem' }}>{aluno[col.id]}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}
