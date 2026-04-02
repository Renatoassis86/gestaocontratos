"use client"
import { AlertCircle, FileX, Terminal, ShieldX, BarChart3, Database } from 'lucide-react'
import styles from '../../page.module.css'

export default function OProblema() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_problem_chaos_1775141807336.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>O Caos da</span> Fragmentação <span style={{ color: '#FF4D4D' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#FF4D4D', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>CHAOS · FRAGMENTATION · RISK</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            O Problema: <br/>O Custo Invisível dos Dados Ocultos.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            Nas corporações modernas, o maior inimigo não é a concorrência externa, mas o <strong>caos interno de informações</strong>. Planilhas de silos departamentais, contratos perdidos em pastas físicas, e decisões baseadas em instinto geram um "atrito invisível" que consome margens e impede a escalabilidade. Sem uma estrutura analítica, o gestor atua como um piloto voando no escuro.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,77,77,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <FileX size={22} color="#FF4D4D" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Vulnerabilidade Jurídica</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Contratos sem gestão centralizada levam a prazos perdidos, multas desnecessárias e total incapacidade de auditoria instantânea.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,77,77,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldX size={22} color="#FF4D4D" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Opacidade Decisória</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                A falta de uma "única versão da verdade" gera discussões políticas internas em vez de ações estratégicas focadas em crescimento.
              </p>
            </div>
            
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,77,77,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Terminal size={22} color="#FF4D4D" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Obsolescência Digital</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Empresas que não automatizam o letramento analítico de seus times perdem relevância na era da IA e Big Data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
