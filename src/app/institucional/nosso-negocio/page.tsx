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
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Evoluindo a sua</span> corporação <span style={{ color: 'var(--primary)' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>PERFORMANCE · SCALE · ECOSYSTEM</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: 'var(--foreground)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Nosso Negócio: <br/>Reengenharia de Performance.
          </h1>
          
          <p style={{ color: 'var(--secondary)', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            O core-business da Arkos Intelligence é a <strong>arquitetura de excelência corporativa</strong>. Atuamos através de um ecossistema integrado que combina tecnologia proprietária, consultoria analítica de ponta e capacitação institucional. Nosso negócio não é apenas "vender um software", mas sim estruturar a espinha dorsal operacional que permite ao C-Level crescer com segurança e alta previsibilidade.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div style={{ background: 'var(--accent)', padding: '24px', border: '1px solid var(--border)', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <TrendingUp size={24} color="var(--primary)" />
                <h3 style={{ color: 'var(--foreground)', fontSize: '1.2rem', fontWeight: 900 }}>Ecosistema Hub Integral</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <li>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>CORE PLATFORM</div>
                  <strong style={{ color: 'var(--foreground)', display: 'block', marginBottom: '6px' }}>CLM & Governance</strong>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Automação inteligente de contratos via Smart Contracts e algoritmos de auditoria.</span>
                </li>
                <li>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>INTELLIGENCE LAYER</div>
                  <strong style={{ color: 'var(--foreground)', display: 'block', marginBottom: '6px' }}>Growth & Predictive BI</strong>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Mapeamento de LTV, análise de P&L em tempo real e modelagem de crescimento.</span>
                </li>
                <li>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>INSTITUTIONAL SCALE</div>
                  <strong style={{ color: 'var(--foreground)', display: 'block', marginBottom: '6px' }}>Arkos Academy (EDT)</strong>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Programas de letramento analítico para funcionários, garantindo que a cultura de dados seja sustentável.</span>
                </li>
                <li>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>STRATEGIC ADVISORY</div>
                  <strong style={{ color: 'var(--foreground)', display: 'block', marginBottom: '6px' }}>Consultoria Nativa</strong>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>Consultoria fiduciária direta de Renato Assis para decisões de alto impacto estrutural.</span>
                </li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '24px', background: 'var(--primary-glow)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--background)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <Globe size={24} color="var(--primary)" />
              </div>
              <p style={{ color: 'var(--foreground)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                O resultado final do nosso negócio é uma empresa <strong style={{ color: 'var(--primary)' }}>imune a choques brutos</strong>, com processos fluidos e uma marca que se torna referência nacional em governança e eficiência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
