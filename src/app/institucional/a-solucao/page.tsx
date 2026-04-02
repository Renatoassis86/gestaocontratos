"use client"
import { Sparkles, Database, ShieldCheck, Target, TrendingUp, Cpu } from 'lucide-react'
import styles from '../../page.module.css'

export default function ASolucao() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_solution_core_1775141834661.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Harmonizando a sua</span> inteligência <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>SOLUTION · HARMONY · POWER</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            A Solução: <br/>Orquestração Analítica de Ponta a Ponta.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            A Arkos Intelligence resolve o caos corporativo através de uma <strong style={{ color: '#F4F2ED' }}>Arquitetura de Harmonização</strong>. Integramos as camadas mais profundas de dados em uma única plataforma centralizada que combina <strong style={{ color: '#F4F2ED' }}>Engenharia de Decisão</strong> com <strong style={{ color: '#F4F2ED' }}>Automação de Governanca</strong>. Deixamos de ser apenas uma ferramenta para nos tornarmos a "Espinha Dorsal Digital" da sua empresa, garantindo que cada contrato, cada lead e cada processo esteja alinhado à visão estratégica do fundador.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Database size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Núcleo de Verdade Única</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Unificamos todas as fontes de dados em um repositório centralizado, auditável e acessível em tempo real.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Governança Ativa</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Transformamos contratos de arquivos passivos em ativos digitais que monitoram riscos e prazos de forma autônoma.
              </p>
            </div>
            
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Cpu size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Inteligência Prática</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Não entregamos apenas dados; entregamos recomendações acionáveis que aceleram o crescimento e eliminam gargalos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
