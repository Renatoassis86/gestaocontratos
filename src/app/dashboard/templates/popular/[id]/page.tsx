'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/client'
import { ArrowLeft, FileText, Check, Upload, Database, Users } from 'lucide-react'
import Link from 'next/link'

export default function PopularTemplatePage() {
  const { id } = useParams()
  const router = useRouter()
  const [template, setTemplate] = useState<any>(null)
  const [fields, setFields] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('manual') // manual, spreadsheet, moodle
  
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      
      // 1. Carregar Template
      const { data: temp } = await supabase
        .from('templates_contrato')
        .select('*')
        .eq('id', id)
        .single()

      if (temp) {
        setTemplate(temp)
        
        // 2. Carregar Campos
        const { data: flds } = await supabase
          .from('campos_template')
          .select('*')
          .eq('template_id', id)

        if (flds && flds.length > 0) {
          setFields(flds)
        } else {
          // Fallback: extrair variáveis do corpo se não houver
          const matches = temp.corpo_template.match(/\{\{([^}]+)\}\}/g) || []
          const fallbackFields = matches.map((tag: string) => ({
            chave_tag: tag,
            rotulo: tag.replace('{{', '').replace('}}', '').toUpperCase()
          }))
          setFields(fallbackFields)
        }
      }
      setLoading(false)
    }

    if (id) loadData()
  }, [id])

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
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {fields.map((f) => (
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
              <button style={{ padding: '0.75rem 1.2rem', background: 'transparent', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
                ⬇️ Baixar Planilha Guia
              </button>
              <button style={{ padding: '0.75rem 1.2rem', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
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
                <select style={{ width: '100%', padding: '0.75rem', background: '#0a0a0b', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }}>
                  <option>--- Selecione ---</option>
                  <option>Pós-Graduação em Teologia Bíblica</option>
                  <option>Graduação em Teologia</option>
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
