'use client'

import { useState, useEffect } from 'react'
import { getMoodleCourses, testMoodleConnection } from '../../../../actions'
import { 
  Database, 
  Users, 
  GraduationCap, 
  FileText, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react'

export default function ExploradorMoodle() {
  const [activeTab, setActiveTab] = useState<'geral' | 'notas' | 'ementas'>('geral')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Dados brutos
  const [cursos, setCursos] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  
  // Dados de filtragem (Aba Notas)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [alunos, setAlunos] = useState<any[]>([])
  const [loadingAlunos, setLoadingAlunos] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Aprovado' | 'Em Curso'>('all')

  useEffect(() => {
    async function loadInitial() {
      setLoading(true)
      try {
        const result = await getMoodleCourses()
        if (result.success) {
          setCursos(result.courses || [])
          setCategories(result.categories || [])
          if (result.courses && result.courses.length > 0) {
            setSelectedCourse(String(result.courses[0].id))
          }
        } else {
          setError("Falha ao carregar metadados estruturais do Moodle.")
        }
      } catch (e) {
        setError("Erro de conexão ao carregar dados do Moodle.")
      } finally {
        setLoading(false)
      }
    }
    loadInitial()
  }, [])

  // Carregar alunos quando mudar o curso na Aba de Notas
  useEffect(() => {
    if (activeTab === 'notas' && selectedCourse) {
      loadCourseStudents(selectedCourse)
    }
  }, [selectedCourse, activeTab])

  const loadCourseStudents = async (id: string) => {
    setLoadingAlunos(true)
    try {
      const result = await testMoodleConnection(id, 'historico')
      if (result.success) {
        setAlunos(result.allUsers || [])
      } else {
        setAlunos([])
      }
    } catch (e) {
      setAlunos([])
    } finally {
      setLoadingAlunos(false)
    }
  }

  // Filtragem de Alunos
  const filteredAlunos = alunos.filter(a => {
    const matchSearch = a.fullname.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        a.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  if (loading) return <div className="p-8 text-zinc-400">Sincronizando com Moodle...</div>

  // Métricas de Painel Geral
  const totalCursos = cursos.filter(c => c.visible === 1).length
  const totalCat = categories.length

  return (
    <div className="p-6 space-y-6 text-white" style={{ fontFamily: 'var(--sans)' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-zinc-800/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Database className="text-brand-green w-6 h-6" /> Explorador de Ingestão Moodle
          </h1>
          <p className="text-zinc-400 text-sm">Navegação ao vivo por entidades relacionais, notas agregadas e auditoria documental.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-2 text-red-500">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* Tabs / Abas */}
      <div className="flex border-b border-zinc-800 gap-2">
        <button 
          onClick={() => setActiveTab('geral')} 
          className={`py-2 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'geral' ? 'border-brand-green text-brand-green' : 'border-transparent text-zinc-400 hover:text-white'}`}
        >
          <Database size={16} /> Visão Estrutural
        </button>
        <button 
          onClick={() => setActiveTab('notas')} 
          className={`py-2 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'notas' ? 'border-brand-green text-brand-green' : 'border-transparent text-zinc-400 hover:text-white'}`}
        >
          <GraduationCap size={16} /> Notas e Médias
        </button>
        <button 
          onClick={() => setActiveTab('ementas')} 
          className={`py-2 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'ementas' ? 'border-brand-green text-brand-green' : 'border-transparent text-zinc-400 hover:text-white'}`}
        >
          <FileText size={16} /> NLP e Ementas
        </button>
      </div>

      {/* Content */}
      <div className="pt-4">
        
        {/* ABA 1: VISÃO GERAL */}
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
              <h3 className="text-md font-bold mb-3 flex items-center gap-2 text-zinc-200"><Database size={18} /> Cursos Ativos ({totalCursos})</h3>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {cursos.filter(c => c.visible === 1).map(c => (
                  <div key={c.id} className="p-2 border-b border-zinc-900 text-xs text-zinc-300 flex justify-between">
                    <span className="font-semibold">{c.fullname}</span>
                    <span className="text-zinc-500">ID: {c.id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
              <h3 className="text-md font-bold mb-3 flex items-center gap-2 text-zinc-200"><Filter size={18} /> Categorias ({totalCat})</h3>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {categories.map(cat => (
                  <div key={cat.id} className="p-2 border-b border-zinc-900 text-xs text-zinc-300 flex justify-between">
                    <span>{cat.name}</span>
                    <span className="text-zinc-500">ID: {cat.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: NOTAS POR ALUNO */}
        {activeTab === 'notas' && (
          <div className="space-y-4">
            <div className="flex gap-4 items-center bg-zinc-950 p-4 border border-zinc-900 rounded-xl flex-wrap">
              <div className="flex-1">
                <label className="block text-xs text-zinc-400 mb-1">Selecione o Curso:</label>
                <select 
                  value={selectedCourse} 
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-lg text-sm text-white"
                >
                  {cursos.map(c => (
                    <option key={c.id} value={c.id}>{c.fullname}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs text-zinc-400 mb-1">Status da Média:</label>
                <select 
                  value={statusFilter} 
                  onChange={(e: any) => setStatusFilter(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-lg text-sm text-white"
                >
                  <option value="all">Ver Todos</option>
                  <option value="Aprovado">Aprovado ({">= 7.0"})</option>
                  <option value="Em Curso">Em Curso / Crítico</option>
                </select>
              </div>

              <div className="flex-[2]">
                <label className="block text-xs text-zinc-400 mb-1">Buscar Aluno ou E-mail:</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Nome completo..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 pl-10 pr-4 py-2 rounded-lg text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl overflow-x-auto">
              {loadingAlunos ? (
                <div className="text-center p-8 text-zinc-400 flex items-center justify-center gap-2"><RefreshCw className="animate-spin" size={18} /> Consultando notas ao vivo...</div>
              ) : (
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                      <th className="p-3">Nome</th>
                      <th className="p-3">CPF</th>
                      <th className="p-3">Média Geral</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Notas Variáveis (NLP/Split)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlunos.length === 0 ? (
                      <tr><td colSpan={5} className="p-4 text-center text-zinc-500">Nenhum aluno encontrado ou sem notas lançadas.</td></tr>
                    ) : (
                      filteredAlunos.map((a: any, i) => (
                        <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/10">
                          <td className="p-3 font-semibold text-white">{a.fullname}</td>
                          <td className="p-3 text-zinc-400">{a.cpf}</td>
                          <td className="p-3 font-bold text-sky-400">{a.media_final}</td>
                          <td className="p-3">
                            {a.status === 'Aprovado' ? (
                              <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={14} /> Aprovado</span>
                            ) : (
                              <span className="text-amber-500">Em Curso</span>
                            )}
                          </td>
                          <td className="p-3 text-zinc-400">{a.notas_disciplinas?.substring(0, 50)}...</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ABA 3: NLP EMMENTAS */}
        {activeTab === 'ementas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cursos.slice(0, 10).map(c => (
              <div key={c.id} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-brand-green">{c.shortname}</span>
                  <span className="text-xs text-zinc-500">Filtrado por regex (Strip)</span>
                </div>
                <h4 className="font-bold text-white text-md">{c.fullname}</h4>
                <div className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/60 max-h-[100px] overflow-y-auto">
                   {c.summary ? c.summary.replace(/<[^>]*>?/gm, ' ') : "Sem descrição estruturada de ementa."}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
