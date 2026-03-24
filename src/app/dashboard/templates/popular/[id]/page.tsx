'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/client'
import { ArrowLeft, FileText, Check, Upload, Database, Users } from 'lucide-react'
import Link from 'next/link'

const CURSOS_FICV = [
  "BACHARELADO EM TEOLOGIA EAD",
  "BACHARELADO EM TEOLOGIA PRES",
  "BACHARELADO EM DIREITO",
  "PÓS-GRADUAÇÃO EM PSICOTEOLOGIA",
  "PÓS-GRADUAÇÃO EM EDUCAÇÃO CRISTÃ CLÁSSICA",
  "PÓS-GRADUAÇÃO EM TEOLOGIA SISTEMÁTICA",
  "PÓS-GRADUAÇÃO EM GESTÃO ESCOLAR",
  "PÓS-GRADUAÇÃO EM TEOLOGIA DO NOVO TESTAMENTO",
  "PÓS-GRADUAÇÃO EM LIDERANÇA CRISTÃ",
  "PÓS-GRADUAÇÃO EM FORMAÇÃO POLÍTICA",
  "PÓS-GRADUAÇÃO EM MISSOLOGIA URBANA",
  "PÓS-GRADUAÇÃO EM PSICOPEDAGOGIA",
  "PÓS-GRADUAÇÃO EM HISTÓRIA DO CRISTIANISMO"
]

export default function PopularTemplatePage() {
  const { id } = useParams()
  const router = useRouter()
  const [template, setTemplate] = useState<any>(null)
  const [fields, setFields] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('manual') // manual, spreadsheet, moodle
  
  const [values, setValues] = useState<Record<string, string>>({})
  const [selectedCourse, setSelectedCourse] = useState('')

  // Campos para carregar do Banco de Dados Dinamicamente
  const [dbCourses, setDbCourses] = useState<any[]>([])
  const [selectedDbCourse, setSelectedDbCourse] = useState('')
  const [dbDisciplines, setDbDisciplines] = useState<any[]>([])
  const [discValues, setDiscValues] = useState<Record<string, string>>({})

  const spreadsheetInputRef = useRef<HTMLInputElement>(null)

  const handleDownloadTemplate = () => {
    let headers = fields.map(f => f.rotulo || f.chave_tag)
    if (dbDisciplines.length > 0) {
      dbDisciplines.forEach(d => {
        headers.push(`NOTA_${d.nome.toUpperCase().replace(/\s+/g, '_')}`)
      })
    }

    // Add ﻿ BOM starting text string to enforce strict UTF-8 CSV parsing in Microsoft Excel Windows
    const csvContent = "\uFEFF" + headers.join(',') + "\n";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `modelo_${template?.titulo || 'documento'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const handleSpreadsheetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      alert('✅ Planilha "' + e.target.files[0].name + '" carregada com sucesso! (Simulação de processamento)')
    }
  }

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      
      // 1. Carregar Template
      const { data: temp } = await supabase
        .from('templates_contrato')
        .select('*')
        .eq('id', id)
        .single()

      // Carregar Cursos do Banco para o formulário
      const { data: cData } = await supabase
        .from('cursos')
        .select('*')
      if (cData) setDbCourses(cData)

      if (temp) {
        setTemplate(temp)
        
        // 2. Carregar Campos
        const { data: flds } = await supabase
          .from('campos_template')
          .select('*')
          .eq('template_id', id)

        const standardFields = [
          { chave_tag: '{{nome_aluno}}', rotulo: 'NOME DO ALUNO' },
          { chave_tag: '{{cpf}}', rotulo: 'CPF' },
          { chave_tag: '{{data_nascimento}}', rotulo: 'DATA DE NASCIMENTO' },
          { chave_tag: '{{tipo_curso}}', rotulo: 'TIPO DE CURSO (EX: ESPECIALIZAÇÃO)' },
          { chave_tag: '{{nome_curso}}', rotulo: 'NOME DO CURSO' },
          { chave_tag: '{{carga_horaria}}', rotulo: 'CARGA HORÁRIA' },
          { chave_tag: '{{data_inicio}}', rotulo: 'DATA DE INÍCIO' },
          { chave_tag: '{{data_conclusao}}', rotulo: 'DATA DE CONCLUSÃO' },
          { chave_tag: '{{data_expedicao}}', rotulo: 'DATA DE EXPEDIÇÃO' }
        ]

        let finalFields: any[] = []

        if (flds && flds.length > 0) {
          finalFields = [...flds]
        } else {
          // Fallback: extrair variáveis do corpo se não houver
          const matches = temp.corpo_template ? (temp.corpo_template.match(/\{\{([^}]+)\}\}/g) || []) : []
          const fallbackFields = matches.map((tag: string) => ({
            chave_tag: tag,
            rotulo: tag.replace('{{', '').replace('}}', '').toUpperCase()
          }))
          finalFields = [...fallbackFields]
        }

        // Unificar com campos estáticos sem duplicar
        const existingTags = new Set(finalFields.map(f => f.chave_tag.toLowerCase()))
        
        // Inserir os campos padrão no início de finalFields apenas se não existirem
        standardFields.forEach(sf => {
          if (!existingTags.has(sf.chave_tag.toLowerCase())) {
            finalFields.unshift(sf)
          }
        })

        setFields(finalFields)
      }
      setLoading(false)
    }

    if (id) loadData()
  }, [id])

  // Efeito para carregar disciplinas do banco
  useEffect(() => {
    async function loadDisciplines() {
      if (!selectedDbCourse) {
        setDbDisciplines([])
        return
      }
      const supabase = createClient()
      const { data } = await supabase
        .from('disciplinas')
        .select('*')
        .eq('curso_id', selectedDbCourse)
      
      if (data) {
        setDbDisciplines(data)
      }
    }
    loadDisciplines()
  }, [selectedDbCourse])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('✅ Documento gerado com sucesso para ' + (values['{{nome_aluno}}'] || 'o aluno') + '!')
    router.push('/dashboard/templates')
  }

  if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Carregando dados do template...</div>
  if (!template) return <div style={{ padding: '2rem', color: 'red' }}>Template não encontrado.</div>

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
      <Link href="/dashboard/templates" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Voltar para Lists
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}> Popular Template: {template.titulo}</h1>
        <p style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Defina os dados para os campos variáveis do documento.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
        <button 
          onClick={() => setTab('manual')}
          style={{ padding: '0.6rem 1.2rem', background: tab === 'manual' ? 'var(--primary)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FileText size={16} /> Individual (Manual)
        </button>
        <button 
          onClick={() => setTab('spreadsheet')}
          style={{ padding: '0.6rem 1.2rem', background: tab === 'spreadsheet' ? 'var(--primary)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Upload size={16} /> Em Massa (Planilha)
        </button>
        <button 
          onClick={() => setTab('moodle')}
          style={{ padding: '0.6rem 1.2rem', background: tab === 'moodle' ? 'var(--primary)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Database size={16} /> Integração Moodle
        </button>
      </div>

      <div style={{ background: 'var(--sidebar)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
        
        {/* TAB 1 - MANUAL */}
        {tab === 'manual' && (
          <form onSubmit={handleManualSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Preencha os Campos do Documento</h3>
            
            {/* Seletor de Curso para Disciplinas do Banco */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 'bold' }}>VINCULAR CURSO DO BANCO DE DADOS (OPCIONAL):</label>
              <select 
                value={selectedDbCourse}
                onChange={(e) => setSelectedDbCourse(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', marginBottom: '1rem' }}
              >
                <option value="">--- Selecione um curso cadastrado ---</option>
                {dbCourses.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>

              {dbDisciplines.length > 0 && (
                <div style={{ marginTop: '1.2rem' }}>
                  <h4 style={{ color: 'white', fontSize: '0.9rem', marginBottom: '10px' }}>Médias Finais das Disciplinas:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', maxHeight: '200px', overflowY: 'auto', padding: '10px', background: '#0a0a0b', borderRadius: '8px' }}>
                    {dbDisciplines.map((d) => (
                      <div key={d.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '0.75rem', color: 'var(--secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={d.nome}>{d.nome}</label>
                        <input 
                          type="text" 
                          placeholder="Média (Ex: 8.5)"
                          value={discValues[d.id] || ''}
                          onChange={(e) => setDiscValues({...discValues, [d.id]: e.target.value})}
                          style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '6px', color: 'white', fontSize: '0.85rem' }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {fields
                .filter((f) => !selectedDbCourse || f.chave_tag.toLowerCase() !== '{{notas_disciplinas}}')
                .map((f) => (
                <div key={f.id || f.chave_tag}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '5px' }}>{f.rotulo}:</label>
                  <input 
                    type="text" 
                    required 
                    value={values[f.chave_tag] || ''}
                    onChange={(e) => setValues({...values, [f.chave_tag]: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} 
                  />
                </div>
              ))}
            </div>

            <button type="submit" style={{ justifySelf: 'start', marginTop: '1rem', padding: '0.8rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={18} /> Gerar Documento
            </button>
          </form>
        )}

        {/* TAB 2 - PLANILHA */}
        {tab === 'spreadsheet' && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Upload size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Importar via Planilha</h3>
            <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Baixe a planilha modelo contendo os cabeçalhos das variáveis, preencha os dados de todos os alunos e faça o upload novamente para gerar os certificados em massa.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <input 
                type="file" 
                ref={spreadsheetInputRef} 
                onChange={handleSpreadsheetUpload} 
                accept=".csv, .xlsx, .xls" 
                hidden 
              />
              <button 
                type="button"
                onClick={handleDownloadTemplate}
                style={{ padding: '0.75rem 1.2rem', background: 'transparent', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                ⬇️ Baixar Planilha Guia
              </button>
              <button 
                type="button"
                onClick={() => spreadsheetInputRef.current?.click()}
                style={{ padding: '0.75rem 1.2rem', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                📂 Selecionar Arquivo
              </button>
            </div>
          </div>
        )}

        {/* TAB 3 - MOODLE */}
        {tab === 'moodle' && (
          <div style={{ display: 'grid', gap: '1.2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Buscar dados do Moodle</h3>
            <p style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Selecione a turma e o curso no Moodle para carregar as notas e dados dos alunos automaticamente.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '5px' }}>Selecione o Curso:</label>
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }}
                >
                  <option value="">--- Selecione ---</option>
                  {CURSOS_FICV.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '5px' }}>Selecione a Turma:</label>
                <select style={{ width: '100%', padding: '0.75rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }}>
                  <option>--- Selecione ---</option>
                  <option>Turma 2024.1</option>
                  <option>Turma 2024.2</option>
                </select>
              </div>
            </div>

            <button style={{ justifySelf: 'start', marginTop: '1rem', padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} /> Sincronizar Alunos
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
