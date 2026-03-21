import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, FileText, BarChart2, Users, CheckCircle2, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.heroGrid}></div>
      <div className={styles.heroGlow}></div>

      {/* ── NAV ───────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <div className={styles.headerActions}>
          <Link href="/login">
            <button className={styles.btnText}>Entrar</button>
          </Link>
          <Link href="/login">
            <button className={styles.btnPrimary}>
              <span>Acessar Suite</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <Sparkles size={14} style={{ color: 'var(--primary)' }} />
          <span>Infraestrutura de Inteligência para a Nova Economia</span>
        </div>

        <h1 className={styles.heroH1}>
          Dados, Inteligência <br />
          <span className={styles.gradientText}>E Decisão Empresarial.</span>
        </h1>

        <p className={styles.heroP}>
          Do dado bruto à decisão executiva. A ARKOS conecta sistemas, analytics e gestão em uma única arquitetura operacional — transformando complexidade em clareza empresarial.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/login">
            <button className={styles.btnPrimary} style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <span>Diagnóstico Gratuito</span>
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="#modulos">
            <button className={styles.btnSecondary} style={{ padding: '14px 28px', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>Ver Módulos</button>
          </Link>
        </div>
      </section>

      {/* ── DORES/PROBLEMAS ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.modulesBadge}>O Desafio Executivo</span>
          <h2 className={styles.modulesTitle}>A Fragmentação Operacional</h2>
        </div>
        
        <div className={styles.doresGrid}>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>01</div>
            <h3 className={styles.dorTitle}>Dados Isolados</h3>
            <p className={styles.dorBody}>Sistemas que não conversam multiplicam o trabalho operacional e geram gargalos de informação.</p>
          </div>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>02</div>
            <h3 className={styles.dorTitle}>Risco Jurídico</h3>
            <p className={styles.dorBody}>Falta de rastreabilidade documental e gestão de ciclo de vida de contratos ineficiente.</p>
          </div>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>03</div>
            <h3 className={styles.dorTitle}>Decisões Lentas</h3>
            <p className={styles.dorBody}>A ausência de visibilidade em tempo real atrasa a reação tática e decisões estratégicas.</p>
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ───────────────────────────────────────────── */}
      <section id="modulos" className={styles.modulesWrapper}>
        <div className={styles.modulesHeader}>
          <span className={styles.modulesBadge}>Módulo Principal</span>
          <h2 className={styles.modulesTitle}>Ecossistema Integrado Arkos</h2>
        </div>

        <div className={styles.grid}>
          {/* Módulo 1: CLM */}
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <div className={styles.cardGlow}></div>
              <div style={{ opacity: 0.3, color: 'var(--primary)' }}>
                <FileText size={100} strokeWidth={1} />
              </div>
              <span className={styles.cardStatus}>Disponível</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Ópera CLM</h3>
              <p className={styles.cardP}>Gestão Inteligente de Ciclo de Vida de Contratos e Documentos Corporativos.</p>
              <ul className={styles.cardList}>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: 'var(--primary)' }} /><span>Assinatura Digital Integrada</span></li>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: 'var(--primary)' }} /><span>Painel Auditável e Rastreabilidade</span></li>
              </ul>
              <Link href="/login"><button className={styles.cardBtn}>Iniciar Módulo</button></Link>
            </div>
          </div>

          {/* Módulo 2: Analytics */}
          <div className={styles.card} style={{ opacity: 0.7 }}>
            <div className={styles.cardImage} style={{ background: 'linear-gradient(180deg, rgba(5,6,10,0.8), rgba(168, 85, 247, 0.08), rgba(5,6,10,0.8))' }}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}></div>
              <div style={{ opacity: 0.2, color: '#A855F7' }}>
                <BarChart2 size={100} strokeWidth={1} />
              </div>
              <span className={styles.cardStatus} style={{ color: '#A855F7', borderColor: 'rgba(168,85,247,0.2)' }}>Em breve</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle} style={{ color: '#E2E8F0' }}>Enterprise Analytics</h3>
              <p className={styles.cardP}>Cruzamento de dados BI em tempo real e Dashboards Executivos de alta performance.</p>
              <button className={styles.cardBtn} disabled style={{ cursor: 'not-allowed', background: 'transparent', color: '#64748B' }}>Em breve</button>
            </div>
          </div>

          {/* Módulo 3: Talent */}
          <div className={styles.card} style={{ opacity: 0.7 }}>
            <div className={styles.cardImage} style={{ background: 'linear-gradient(180deg, rgba(5,6,10,0.8), rgba(6, 182, 212, 0.08), rgba(5,6,10,0.8))' }}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}></div>
              <div style={{ opacity: 0.2, color: '#22D3EE' }}>
                <Users size={100} strokeWidth={1} />
              </div>
              <span className={styles.cardStatus} style={{ color: '#22D3EE', borderColor: 'rgba(6,182,212,0.2)' }}>Em breve</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Talent Management</h3>
              <p className={styles.cardP}>Onboarding digital inteligente e fluxos operacionais automatizados de RH.</p>
              <button className={styles.cardBtn} disabled style={{ cursor: 'not-allowed', background: 'transparent', color: '#64748B' }}>Em breve</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
        <p>&copy; 2026 ARKOS Intelligence. A Infraestrutura da Nova Economia Empresarial.</p>
      </footer>
    </div>
  )
}
