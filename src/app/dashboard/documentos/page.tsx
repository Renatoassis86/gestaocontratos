import { createClient } from '@/infrastructure/supabase/server'
import styles from '../dashboard.module.css'
import { getValidatedCompanyId } from '@/application/services/TenantService'
import Link from 'next/link'
import { FileText, GraduationCap, ArrowRight, ShieldCheck, Briefcase, Plus } from 'lucide-react'

export default async function DocumentosModelosPage() {
  const supabase = await createClient()
  const activeCompanyId = await getValidatedCompanyId()

  let templates: any[] = []
  let totalEmitidos = 0

  if (activeCompanyId) {
    const { data } = await supabase
      .from('templates_contrato')
      .select('*, tipos_contrato(titulo)')
      .eq('empresa_id', activeCompanyId)

    const { count } = await supabase
      .from('contratos')
      .select('id', { count: 'exact', head: true })
      .eq('empresa_id', activeCompanyId)

    templates = data || []
    totalEmitidos = count || 0
  }

  const contratos = templates.filter(t => t.tipos_contrato?.titulo.toLowerCase().includes('contrato'))
  const academicos = templates.filter(t => t.tipos_contrato?.titulo.toLowerCase().includes('histórico') || t.tipos_contrato?.titulo.toLowerCase().includes('certificado'))

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* 1. CABEÇALHO EXECUTIVO (1Doc + Adapta Copy) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.025em' }}>Central de Documentos</h1>
          <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Emita, acompanhe e controle contratos, históricos e certificados com rastreabilidade completa.</p>
        </div>
        <Link href="/dashboard/templates" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--primary)', color: 'black', padding: '0.7rem 1.2rem', borderRadius: '10px', fontWeight: '800', fontSize: '0.85rem', boxShadow: '0 0 20px var(--primary-glow)', transition: 'transform 0.2s' }}>
          <Plus size={18} /> Criar Modelo
        </Link>
      </div>

      {/* 2. INDICADORES RESUMO (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
        <div style={{ background: 'var(--accent)', color: 'white', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--card-shadow)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Documentos Emitidos</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.3rem' }}>{totalEmitidos}</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.4rem' }}>Atualizado hoje</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '12px' }}><ShieldCheck size={24} color="var(--primary)" /></div>
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--card-shadow)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contratos Ativos</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--foreground)', marginTop: '0.3rem' }}>{contratos.length}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--secondary)', opacity: 0.8, marginTop: '0.4rem' }}>Em acompanhamento</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '0.8rem', borderRadius: '12px' }}><Briefcase size={22} color="var(--secondary)" /></div>
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--card-shadow)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Módulos Acadêmicos</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--foreground)', marginTop: '0.3rem' }}>{academicos.length}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--secondary)', opacity: 0.8, marginTop: '0.4rem' }}>Prontos para emissão</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '0.8rem', borderRadius: '12px' }}><GraduationCap size={22} color="var(--secondary)" /></div>
        </div>
      </div>

      {!activeCompanyId && (
        <p style={{ color: 'var(--danger)', fontStyle: 'italic', background: 'rgba(239,68,68,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
          ⚠️ Selecione uma empresa na barra superior para carregar os templates ativos.
        </p>
      )}

      {activeCompanyId && (
        <>
          {/* 3. SEÇÃO CONTRATOS */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ background: 'var(--primary)', width: '4px', height: '16px', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Contratos Corporativos</h2>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Gestão e vigência</span>
            </div>
            
            {contratos.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>Nenhum modelo cadastrado.</p> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {contratos.map((t: any) => (
                  <Link href={`/dashboard/documentos/emitir/${t.id}`} key={t.id} style={{ textDecoration: 'none', color: 'inherit', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s', boxShadow: 'var(--card-shadow)' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--foreground)' }}>{t.titulo}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '0.2rem' }}>Padronizado · v{t.versao}</div>
                    </div>
                    <div style={{ background: 'rgba(0, 230, 118, 0.1)', color: 'var(--foreground)', padding: '0.5rem', borderRadius: '10px' }}><ArrowRight size={16} /></div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 4. SEÇÃO ACADÊMICO */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ background: 'var(--primary)', width: '4px', height: '16px', borderRadius: '2px' }}></div>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Documentos Acadêmicos</h2>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Geração rápida e segura</span>
            </div>

            {academicos.length === 0 ? <p style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>Nenhum modelo acadêmico cadastrado.</p> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {academicos.map((t: any) => (
                  <Link href={`/dashboard/documentos/emitir/${t.id}`} key={t.id} style={{ textDecoration: 'none', color: 'inherit', background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s', boxShadow: 'var(--card-shadow)' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <div style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px' }}><GraduationCap size={20} /></div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--foreground)' }}>{t.titulo}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '0.1rem' }}>Certificado & Histórico</div>
                      </div>
                    </div>
                    <div style={{ background: 'var(--primary)', color: 'black', padding: '0.5rem', borderRadius: '10px', fontWeight: 'bold' }}><Plus size={16} /></div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}


    </div>
  )
}
  
  
