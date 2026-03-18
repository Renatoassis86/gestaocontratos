import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, FileText, ShoppingCart, Users, Sparkles, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Glow fundo top */}
      <div className={styles.heroGlow}></div>

      {/* 1. Header */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>A</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>ARKOS</span>
            <span className={styles.logoSub}>Intelligence</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <Link href="/login">
            <button className={styles.btnText}>Login</button>
          </Link>
          <Link href="/login">
            <button className={styles.btnPrimary}>
              <span>Começar</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <Sparkles size={14} className="text-emerald-400" style={{ color: '#10B981' }} />
          <span>A Infraestrutura de Inteligência da Nova Economia</span>
        </div>

        <h1 className={styles.heroH1}>
          Dados, Inteligência <br />
          <span className={styles.gradientText}>E Decisão Empresarial.</span>
        </h1>

        <p className={styles.heroP}>
          Otimize seus processos com B2B SaaS, Enterprise Analytics e Marketing Intelligence.
          Crie, comunique e assine tudo em uma única central de processamento.
        </p>

        <Link href="/login">
          <button className={styles.btnPrimary} style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <span>Acessar Suite Arkos</span>
            <ArrowRight size={18} />
          </button>
        </Link>
      </section>

      {/* 3. Grid de Módulos */}
      <section className={styles.modulesWrapper}>
        <div className={styles.modulesHeader}>
          <span className={styles.modulesBadge}>Nossos Módulos</span>
          <h2 className={styles.modulesTitle}>Ecossistema unificado para seu negócio</h2>
        </div>

        <div className={styles.grid}>
          {/* Módulo 1: Gestão de Contratos */}
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <div className={styles.cardGlow}></div>
              <div style={{ opacity: 0.3, color: '#10B981' }}>
                <FileText size={100} strokeWidth={1} />
              </div>
              <span className={styles.cardStatus}>Disponível</span>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Gestão de Contratos CLM</h3>
              <p className={styles.cardP}>
                Controle fluxos de processos, rastreabilidade auditável, assinatura digital em lote e central documental.
              </p>
              <ul className={styles.cardList}>
                <li className={styles.cardListItem}>
                  <CheckCircle2 size={12} style={{ color: '#10B981' }} />
                  <span>Assinatura Digital Integrada</span>
                </li>
                <li className={styles.cardListItem}>
                  <CheckCircle2 size={12} style={{ color: '#10B981' }} />
                  <span>Gestão de Ciclo de Vida (CLM)</span>
                </li>
              </ul>
              <Link href="/login">
                <button className={styles.cardBtn}>Iniciar Módulo</button>
              </Link>
            </div>
          </div>

          {/* Módulo 2: Enterprise Analytics */}
          <div className={styles.card} style={{ opacity: 0.7 }}>
            <div className={styles.cardImage} style={{ background: 'linear-gradient(180deg, rgba(5,6,10,0.8), rgba(124, 58, 237, 0.1), rgba(5,6,10,0.8))' }}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}></div>
              <div style={{ opacity: 0.2, color: '#A78BFA' }}>
                <ShoppingCart size={100} strokeWidth={1} />
              </div>
              <span className={styles.cardStatus} style={{ color: '#A78BFA', borderColor: 'rgba(124,58,237,0.2)' }}>Breve</span>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle} style={{ color: '#E2E8F0' }}>Enterprise Analytics</h3>
              <p className={styles.cardP}>
                Dashboards gerenciais em tempo real com cruzamento de dados comerciais e propostas automáticas.
              </p>
              <button className={styles.cardBtn} style={{ cursor: 'not-allowed', background: 'transparent', color: '#64748B', border: '1px solid rgba(255,255,255,0.02)' }} disabled>
                Em breve
              </button>
            </div>
          </div>

          {/* Módulo 3: Talent Management */}
          <div className={styles.card} style={{ opacity: 0.7 }}>
            <div className={styles.cardImage} style={{ background: 'linear-gradient(180deg, rgba(5,6,10,0.8), rgba(6, 182, 212, 0.1), rgba(5,6,10,0.8))' }}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}></div>
              <div style={{ opacity: 0.2, color: '#22D3EE' }}>
                <Users size={100} strokeWidth={1} />
              </div>
              <span className={styles.cardStatus} style={{ color: '#22D3EE', borderColor: 'rgba(6,182,212,0.2)' }}>Breve</span>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Talent Management</h3>
              <p className={styles.cardP}>
                Triagem inteligente de candidatos e Onboarding digital automatizado com fluxos de conformidade.
              </p>
              <button className={styles.cardBtn} style={{ cursor: 'not-allowed', background: 'transparent', color: '#64748B', border: '1px solid rgba(255,255,255,0.02)' }} disabled>
                Em breve
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer style={{ padding: '40px', borderTop: '1px solid rgba(255,255,255,0.02)', textAlign: 'center', fontSize: '11px', color: '#475569' }}>
        &copy; 2026 ARKOS Management. Inteligência da nova economia empresarial.
      </footer>
    </div>
  )
}
