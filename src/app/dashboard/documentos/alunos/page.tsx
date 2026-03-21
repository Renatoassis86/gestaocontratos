'use client'

import { useState, useEffect } from 'react'
import styles from '../../dashboard.module.css'
import Link from 'next/link'
import { Trash2, Edit, Mail, Phone, FileDown, Filter, Search, CheckSquare } from 'lucide-react'
import { createClient } from '@/infrastructure/supabase/client'
import { testMoodleConnection, getMoodleCourses } from '@/app/actions'

// Função auxiliar idêntica ao explorador
function getAllDescendantCategoryIds(catId: string, categories: any[]): string[] {
  let ids = [catId];
  let queue = [catId];
  while (queue.length > 0) {
    const current = queue.shift();
    const children = categories.filter(c => String(c.parent) === current);
    for (const child of children) {
      if (!ids.includes(String(child.id))) {
        ids.push(String(child.id));
        queue.push(String(child.id));
      }
    }
  }
  return ids;
}

export default function AlunosDocumentosPage() {
  const [moodleCategories, setMoodleCategories] = useState<any[]>([])
  const [moodleCourses, setMoodleCourses] = useState<any[]>([])
  const [categoryChain, setCategoryChain] = useState<string[]>(['all'])
  const [selectedAno, setSelectedAno] = useState('all')
  const [courseSearch, setCourseSearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [tipoDocumento, setTipoDocumento] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [moodleUsers, setMoodleUsers] = useState<any[]>([])
  
  const [loadingAlunos, setLoadingAlunos] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [documentTemplates, setDocumentTemplates] = useState<any[]>([])

  const supabase = createClient()

  useEffect(() => {
    // 1. Carregar Categorias e Cursos do Moodle
    getMoodleCourses().then(res => {
      if (res.success) {
        setMoodleCourses(res.courses || [])
        setMoodleCategories(res.categories || [])
      }
    })

    // 2. Carregar templates de documentos salvos no banco
    async function fetchTemplates() {
      const { data } = await supabase
        .from('templates_contrato')
        .select('id, titulo, tipos_contrato(titulo)')
        .order('titulo', { ascending: true })
      setDocumentTemplates(data || [])
    }
    fetchTemplates()
  }, [])

  const handleCarregarAlunos = async () => {
    if (selectedCourse === 'all') return
    setLoadingAlunos(true)
    setMoodleUsers([])
    setSelectedIds([])

    try {
      const res = await testMoodleConnection(selectedCourse, 'historico')
      if (res.success && res.allUsers) {
        setMoodleUsers(res.allUsers)
      } else {
        alert('Falha ao carregar os dados dos alunos.')
      }
    } catch (e) {
      alert('Erro inesperado ao carregar alunos.')
    } finally {
      setLoadingAlunos(false)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredMoodleUsers.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredMoodleUsers.map(u => String(u.id)))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  // Filtragem local conforme os Inputs
  const filteredMoodleUsers = moodleUsers.filter(u => {
    const matchSearch = searchQuery === '' || u.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    return matchSearch
  })

  return (
    <div>
      <h1 className={styles.title}>Alunos e Documentos</h1>
      <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
        Selecione o curso e tipo de documento para emitir e fazer downloads em massa.
      </p>

      {/* BLOCO DE FILTROS - SEQUÊNCIA SOLICITADA */}
      <div className={styles.panel} style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} style={{ color: 'var(--primary)' }} /> Filtrar e Selecionar Público
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', alignItems: 'end' }}>
          {categoryChain.map((catId, idx) => {
            const parentId = idx === 0 ? 0 : Number(categoryChain[idx - 1]);
            if (idx > 0 && categoryChain[idx - 1] === 'all') return null; 

            const items = moodleCategories.filter(cat => Number(cat.parent) === parentId);
            if (items.length === 0 && idx > 0) return null; 

            return (
              <div className={styles.inputGroup} key={idx}>
                <label>
                  {idx === 0 ? 'Unidade / Instituição:' : 
                   idx === 1 ? 'Departamento / Escola:' : 
                   idx === 2 ? 'Área / Núcleo:' : 
                   idx === 3 ? 'Curso:' :
                   `Nível ${idx + 1}:`}
                </label>
                <select 
                  value={catId} 
                  onChange={(e) => { 
                    const val = e.target.value;
                    let newChain = [...categoryChain.slice(0, idx), val];
                    if (val !== 'all') {
                      const hasKids = moodleCategories.some(cat => Number(cat.parent) === Number(val));
                      if (hasKids) newChain.push('all');
                    }
                    setCategoryChain(newChain);
                    setSelectedCourse('all');
                  }}
                  className={styles.select}
                >
                  <option value="all">{idx === 0 ? 'Ver Todas' : 'Todas'}</option>
                  {items.map(cat => (
                    <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
                  ))}
                </select>
              </div>
            )
          })}

          <div className={styles.inputGroup}>
            <label>Ano:</label>
            <select 
              value={selectedAno} 
              onChange={(e) => setSelectedAno(e.target.value)}
              className={styles.select}
            >
              <option value="all">Ver Todos</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div className={styles.inputGroup} style={{ maxWidth: '160px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              🔍 Filtrar Disciplina:
            </label>
            <input 
              type="text" 
              value={courseSearch} 
              onChange={e => setCourseSearch(e.target.value)} 
              placeholder="Nome..." 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.55rem', fontSize: '0.813rem', color: 'var(--foreground)', height: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Disciplina:</label>
            <select 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={styles.select}
            >
              <option value="all">Selecione...</option>
              {moodleCourses
                .filter(c => {
                  const matchSearch = courseSearch === '' || c.fullname.toLowerCase().includes(courseSearch.toLowerCase());
                  if (!matchSearch) return false;

                  const activeCatId = categoryChain[categoryChain.length - 1] === 'all' 
                    ? (categoryChain.length > 1 ? categoryChain[categoryChain.length - 2] : 'all') 
                    : categoryChain[categoryChain.length - 1];

                  if (activeCatId !== 'all') {
                    const descendantIds = getAllDescendantCategoryIds(activeCatId, moodleCategories);
                    const matchCat = descendantIds.includes(String(c.category));
                    if (!matchCat) return false;
                  }

                  const matchYear = selectedAno === 'all' || c.fullname.includes(selectedAno);
                  return matchYear;
                })
                .map(c => (
                  <option key={c.id} value={c.id}>{c.fullname}</option>
                ))
              }
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Tipo de Documento:</label>
            <select 
              value={tipoDocumento} 
              onChange={(e) => setTipoDocumento(e.target.value)}
              className={styles.select}
            >
              <option value="all">Selecionar Tipo...</option>
              <option value="historico">Histórico Acadêmico</option>
              <option value="certificado">Certificado de Conclusão</option>
              <option value="atestado">Atestado de Matrícula</option>
              <option value="declaracao">Declaração</option>
              <option value="evento">Certificado de Evento</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Search size={14} /> Buscar Aluno:
            </label>
            <input 
              type="text" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              placeholder="Nome do aluno..." 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.55rem', fontSize: '0.813rem', color: 'var(--foreground)', height: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div className={styles.inputGroup}>
            <button 
              className={styles.nlpButton} 
              style={{ width: '100%', padding: '0.625rem', justifyContent: 'center', background: selectedCourse === 'all' ? 'var(--secondary)' : 'var(--primary)', color: '#000', fontWeight: 800, opacity: selectedCourse === 'all' ? 0.3 : 1 }} 
              onClick={handleCarregarAlunos}
              disabled={selectedCourse === 'all' || loadingAlunos}
            >
              {loadingAlunos ? 'Carregando...' : 'Carregar'}
            </button>
          </div>
        </div>
      </div>

      {/* PAINEL DE AÇÃO EM MASSA */}
      {selectedIds.length > 0 && (
        <div style={{ padding: '1rem', background: 'rgba(200, 245, 66, 0.05)', border: '1px solid rgba(200, 245, 66, 0.1)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            <CheckSquare size={16} style={{ marginBottom: -3, marginRight: 6 }} /> {selectedIds.length} Aluno(s) Selecionado(s)
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: 'var(--primary)', color: '#000', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileDown size={16} /> Emitir & Baixar em Lote
            </button>
          </div>
        </div>
      )}

      {/* TABELA DE ALUNOS */}
      <div className={styles.tableWrapper} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', overflowX: 'auto' }}>
        {moodleUsers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--secondary)' }}>
            Nenhum aluno carregado. Preencha os filtros acima para carregar o quadro.
          </div>
        ) : (
          <table className={styles.table} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead className={styles.thead}>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.8rem', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredMoodleUsers.length && filteredMoodleUsers.length > 0} 
                    onChange={toggleSelectAll} 
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '0.8rem', textAlign: 'left' }}>Nome Completo</th>
                <th style={{ padding: '0.8rem', textAlign: 'left' }}>E-mail</th>
                <th style={{ padding: '0.8rem', textAlign: 'left' }}>CPF</th>
                <th style={{ padding: '0.8rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '0.8rem', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMoodleUsers.map((u: any, i: number) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', background: selectedIds.includes(String(u.id)) ? 'rgba(200, 245, 66, 0.02)' : 'transparent' }}>
                  <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(String(u.id))} 
                      onChange={() => toggleSelect(String(u.id))} 
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '0.8rem', fontWeight: 'bold', color: 'white' }}>{u.fullname}</td>
                  <td style={{ padding: '0.8rem', color: 'var(--secondary)', fontSize: '0.8rem' }}>{u.email}</td>
                  <td style={{ padding: '0.8rem' }}>{u.cpf || '-'}</td>
                  <td style={{ padding: '0.8rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      background: u.status === 'Aprovado' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                      color: u.status === 'Aprovado' ? '#10b981' : '#f59e0b', 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      fontWeight: 600 
                    }}>
                      {u.status || 'Em Curso'}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem', display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
                    <button style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                      <FileDown size={14} /> Emitir
                    </button>
                    <button style={{ background: 'transparent', color: 'var(--secondary)', border: 'none', cursor: 'pointer' }}>
                      <ArrowRight size={16} />
                    </button>
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
