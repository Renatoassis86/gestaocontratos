"use client"
import { Shield, Database, Cpu, Sparkles, Workflow, Layout } from 'lucide-react'
import styles from '../../page.module.css'

export default function OQueEArkos() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_arche_foundation_1775140657952.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>O verdadeiro</span> Software Corporation <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>CONCEPT · ARCHÉ · ORIGIN</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Arkos: O Princípio Gerador <br/>da Inteligência Corporativa.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '24px' }}>
            Na Grécia Antiga, o termo <strong>Arkos</strong> (ou <em>Arché</em>) designava o princípio fundamental. Para os filósofos socráticos, era a origem comandante, o elemento subjacente e imutável que dava estrutura e sentido a todo o universo. Sem a Arché, haveria apenas o caos primordial.
          </p>

          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            Na economia do século XXI, a <strong>Arkos Intelligence</strong> assume esse papel. Não somos apenas um software de gestão ou uma plataforma de BI. Somos a infraestrutura que atua como o "DNA analítico" de uma organização. Conectamos dados dispersos, processos fragmentados e decisões isoladas em um único organismo de inteligência, garantindo que o crescimento seja uma consequência lógica de uma estrutura imperturbável.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(200,245,66,0.06)', p: '12px', borderRadius: '12px', border: '1px solid rgba(200,245,66,0.15)' }}>
                <Database size={24} color="#C8F542" />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#F4F2ED', fontSize: '1.05rem', marginBottom: '8px' }}>O Ponto Único de Verdade (SSOT)</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  Eliminamos os "silos de informação" que paralisam diretorias. Através da nossa infraestrutura, todos os dados da empresa convergem para um núcleo de verdade absoluta, processado com rigor econométrico e pronto para auditorias de alta complexidade. 
                </span>
              </div>
            </div>

            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(200,245,66,0.06)', p: '12px', borderRadius: '12px', border: '1px solid rgba(200,245,66,0.15)' }}>
                <Shield size={24} color="#C8F542" />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#F4F2ED', fontSize: '1.05rem', marginBottom: '8px' }}>Governance as an Engine</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  A governança deixa de ser um "manual de regras" para se tornar parte do motor operacional. Transformamos risco em previsibilidade ao ancorar cada clique e cada transação em modelos de governança nativos, desenhados para proteger a perpetuidade da corporação.
                </span>
              </div>
            </div>
            
            <div style={{ padding: '24px', background: 'rgba(200,245,66,0.02)', borderRadius: '16px', border: '1px solid rgba(200,245,66,0.1)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(200,245,66,0.06)', p: '12px', borderRadius: '12px', border: '1px solid rgba(200,245,66,0.15)' }}>
                <Sparkles size={24} color="#C8F542" />
              </div>
              <div>
                <strong style={{ display: 'block', color: '#F4F2ED', fontSize: '1.05rem', marginBottom: '8px' }}>Evolução Analítica Constante</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  Não somos estáticos. A Arkos aprende com o fluxo de cada departamento, entregando melhorias iterativas que reduzem a fricção operacional ao mínimo possível, permitindo que o C-Level foque exclusivamente na expansão.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
