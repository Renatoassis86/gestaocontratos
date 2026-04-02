"use client"
import { Landmark, TrendingUp, Code2, Globe, GraduationCap, BarChart3, Presentation } from 'lucide-react'
import styles from '../../page.module.css'

export default function NossoNegocio() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_performance_reengineering_1775140701063.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Evoluindo a sua</span> corporação <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>PERFORMANCE · SCALE · ECOSYSTEM</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Nosso Negócio: <br/>Reengenharia de Performance.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            O core-business da Arkos Intelligence é a <strong>arquitetura de excelência corporativa</strong>. Atuamos através de um ecossistema integrado que combina tecnologia proprietária, consultoria analítica de ponta e capacitação institucional. Nosso negócio não é apenas "vender um software", mas sim estruturar a espinha dorsal operacional que permite ao C-Level crescer com segurança e alta previsibilidade.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{ background: '#111318', padding: '24px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <TrendingUp size={24} color="#C8F542" />
                <h3 style={{ color: '#F4F2ED', fontSize: '1.2rem', fontWeight: 900 }}>Ecosistema Hub Integral</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <li>
                  <div style={{ color: '#C8F542', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>CORE PLATFORM</div>
                  <strong style={{ color: '#F4F2ED', display: 'block', marginBottom: '6px' }}>CLM & Governance</strong>
                  <span style={{ color: '#8A8F99', fontSize: '0.85rem' }}>Automação inteligente de contratos via Smart Contracts e algoritmos de auditoria.</span>
                </li>
                <li>
                  <div style={{ color: '#C8F542', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>INTELLIGENCE LAYER</div>
                  <strong style={{ color: '#F4F2ED', display: 'block', marginBottom: '6px' }}>Growth & Predictive BI</strong>
                  <span style={{ color: '#8A8F99', fontSize: '0.85rem' }}>Mapeamento de LTV, análise de P&L em tempo real e modelagem de crescimento.</span>
                </li>
                <li>
                  <div style={{ color: '#C8F542', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>INSTITUTIONAL SCALE</div>
                  <strong style={{ color: '#F4F2ED', display: 'block', marginBottom: '6px' }}>Arkos Academy (EDT)</strong>
                  <span style={{ color: '#8A8F99', fontSize: '0.85rem' }}>Programas de letramento analítico para funcionários, garantindo que a cultura de dados seja sustentável.</span>
                </li>
                <li>
                  <div style={{ color: '#C8F542', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>STRATEGIC ADVISORY</div>
                  <strong style={{ color: '#F4F2ED', display: 'block', marginBottom: '6px' }}>Consultoria Nativa</strong>
                  <span style={{ color: '#8A8F99', fontSize: '0.85rem' }}>Consultoria fiduciária direta de Renato Assis para decisões de alto impacto estrutural.</span>
                </li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', p: '24px', background: 'rgba(200,245,66,0.03)', borderRadius: '16px', border: '1px solid rgba(200,245,66,0.1)' }}>
              <div style={{ width: '48px', height: '48px', bg: '#0A0C0F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(200,245,66,0.25)' }}>
                <Globe size={24} color="#C8F542" />
              </div>
              <p style={{ color: '#F4F2ED', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                O resultado final do nosso negócio é uma empresa <strong style={{ color: '#C8F542' }}>imune a choques brutos</strong>, com processos fluidos e uma marca que se torna referência nacional em governança e eficiência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
