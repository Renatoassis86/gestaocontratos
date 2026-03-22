'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, FileText, BarChart2, Users, Shield, CheckCircle2, Sparkles, Database, Brain, Rocket, MessageCircle, Home as HomeIcon, Grid } from 'lucide-react'

export default function Home() {
  return (
    <div className={styles.page}>
      
      {/* ── BACKGROUNDS & DECORATIONS ─────────────────────────── */}
      <div className={styles.heroGrid}></div>
      <div className={styles.heroGlow}></div>
      <div className={styles.meshBg}>
         <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_business_strategy_1774143055983.png" alt="" className={styles.heroMesh} style={{ filter: 'brightness(0.35) contrast(1.1)' }} />
      </div>

      {/* ── HEADER (FIXED DIAGRAMMING FOR MOBILE) ────────────────── */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <div className={styles.headerActions}>
          <Link href="/login" className={styles.hideOnMobile}>
            <button className={styles.btnText}>Entrar</button>
          </Link>
          <Link href="https://wa.me/5500000000000" target="_blank" className={styles.headerCta}>
            <button className={styles.btnPrimary}>
              <MessageCircle size={16} />
              <span>Consultor</span>
            </button>
          </Link>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <Sparkles size={14} />
          <span>SISTEMA OPERACIONAL DE INTELIGÊNCIA</span>
        </div>

        <h1 className={styles.heroH1}>
          Dados Brutos <br />
          <span className={styles.gradientText}>Decisões Fortes.</span>
        </h1>

        <p className={styles.heroP}>
          Conectamos sistemas, dados e Inteligência Artificial em uma arquitetura executiva modular. Revelamos as estruturas invisíveis do seu negócio para governança baseada em evidências.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}>
          <Link href="/login">
            <button className={styles.btnPrimary} style={{ padding: '16px 36px', fontSize: '1.05rem', borderRadius: '14px' }}>
              <span>Diagnóstico Gratuito</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── 1. PROPOSTA DE VALOR / DORES ────────────────────────── */}
      <section className={styles.section} id="proposta">
        <div className={styles.sectionHeader}>
          <span className={styles.modulesBadge}>O Desafio Operacional</span>
          <h2 className={styles.modulesTitle}>A Fragmentação Corporativa</h2>
          <p className={styles.sectionSubtitle}>Não sofra com atrasos. Unifique o caos da sua empresa em uma única esteira de controle.</p>
        </div>
        
        <div className={styles.doresGrid}>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>01</div>
            <h3 className={styles.dorTitle}>Dados Isolados</h3>
            <p className={styles.dorBody}>CRM, ERP e planilhas desconectados multiplicam o esforço e geram gargalos críticos.</p>
          </div>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>02</div>
            <h3 className={styles.dorTitle}>Risco em Compliance</h3>
            <p className={styles.dorBody}>A ausência de rastreabilidade documental e ciclo de vida de contratos ineficientes custam orçamentos.</p>
          </div>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>03</div>
            <h3 className={styles.dorTitle}>Visão Situacional Baixa</h3>
            <p className={styles.dorBody}>Sem o BI cruzado em tempo real, os líderes reagem tardiamente às mudanças do mercado.</p>
          </div>
        </div>
      </section>

      {/* ── 2. O ECOSSISTEMA MÓDULAR ─────────────────────────────── */}
      <section className={styles.section} style={{ background: 'rgba(255,255,255,0.01)', borderY: '1px solid rgba(255,255,255,0.03)' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.modulesBadge}>Modular Pillars</span>
          <h2 className={styles.modulesTitle}>Ecossistema Integrado Arkos</h2>
        </div>

        <div className={styles.ecoGrid}>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#C8F542', color: '#000' }}><FileText size={24} /></div>
            <h3>Platform & Systems</h3>
            <p>Aceleramos seu ERP/CRM com central documental CLM integrada via APIs auditáveis.</p>
          </div>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#A855F7', color: '#fff' }}><Database size={24} /></div>
            <h3>Data & AI</h3>
            <p>Infraestrutura pesada em Engenharia de Dados aplicadas diretamente à Inteligência Artificial estratégica.</p>
          </div>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#06B6D4', color: '#fff' }}><Brain size={24} /></div>
            <h3>Strategy & Intelligence</h3>
            <p>Diagnósticos situacionais ativos, unindo pesquisas de concorrência com cenários táticos.</p>
          </div>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#F59E0B', color: '#fff' }}><Rocket size={24} /></div>
            <h3>Arkos Academy</h3>
            <p>Capacitação EdTech garantindo uma forte cultura orientada a dados na sua organização total.</p>
          </div>
        </div>
      </section>

      {/* ── 3. AS 4 CAMADAS (TIMELINE) ────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.modulesBadge}>Delivery Pipeline</span>
          <h2 className={styles.modulesTitle}>Da Coleta à Decisão em 4 Etapas</h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>01</div>
            <div>
              <h4>1. Coleta e Conexão</h4>
              <p>Extraímos informações de todas as fontes: ERPs, CRMs, APIs e planilhas corporativas.</p>
            </div>
          </div>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>02</div>
            <div>
              <h4>2. Tratamento e Integração</h4>
              <p>Processamento ETL para auditing centralizado em Data Warehouse seguro.</p>
            </div>
          </div>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>03</div>
            <div>
              <h4>3. Inteligência (IA)</h4>
              <p>Machine Learning e modelos táticos para traduzir números brutos em tendências reais.</p>
            </div>
          </div>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>04</div>
            <div>
              <h4>4. Decisão Executiva</h4>
              <p>Dashboard executivo travado com simulação de cenários de risco e controle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SECTION (ESTRUTURA BUSINESS) ──────────────────── */}
      <section className={styles.section} style={{ paddingBottom: '2rem' }}>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_business_strategy_1774143055983.png" alt="Estratégia Empresarial Arkos" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      {/* ── 4. VERTICAIS DE PRODUTOS ─────────────────────────────── */}
      <section id="modulos" className={styles.modulesWrapper}>
        <div className={styles.modulesHeader}>
          <span className={styles.modulesBadge}>Saas & Licenças</span>
          <h2 className={styles.modulesTitle}>Produtos Especializados</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <div className={styles.cardGlow}></div>
              <div style={{ opacity: 0.3, color: 'var(--primary)' }}><FileText size={80} strokeWidth={1} /></div>
              <span className={styles.cardStatus}>Disponível</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Arkos Ópera CLM</h3>
              <p className={styles.cardP}>Gestão Inteligente de Ciclo de Vida de Contratos e Documentos.</p>
              <ul className={styles.cardList}>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: 'var(--primary)' }} /><span>Assinatura Digital Integrada</span></li>
              </ul>
              <Link href="/login"><button className={styles.cardBtn}>Iniciar Módulo</button></Link>
            </div>
          </div>

          <div className={styles.card} style={{ opacity: 0.8 }}>
            <div className={styles.cardImage}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}></div>
              <div style={{ opacity: 0.2, color: '#A855F7' }}><BarChart2 size={80} strokeWidth={1} /></div>
              <span className={styles.cardStatus} style={{ color: '#A855F7', borderColor: 'rgba(168,85,247,0.2)' }}>Em carga</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Arkos Decision</h3>
              <p className={styles.cardP}>Cruzamento de cenários econômicos e táticos em tempo real (BI).</p>
              <button className={styles.cardBtn} disabled style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', color: '#64748B' }}>Em Carga...</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ padding: '60px 40px 120px 40px', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
        <p>&copy; 2026 ARKOS Intelligence. A Infraestrutura da Nova Economia Empresarial.</p>
      </footer>

      {/* ── MOBILE BOTTOM NAVBAR ────────────────────────────────── */}
      <nav className={styles.mobileNavbar}>
        <Link href="#" className={styles.navItem}><HomeIcon size={20} /><span>Início</span></Link>
        <Link href="#modulos" className={styles.navItem}><Grid size={20} /><span>Módulos</span></Link>
        <Link href="https://wa.me/5500000000000" target="_blank" className={styles.navItemCta}><MessageCircle size={20} /><span>Consultor</span></Link>
      </nav>

    </div>
  )
}
