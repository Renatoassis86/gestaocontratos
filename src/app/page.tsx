'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, FileText, BarChart2, Users, Shield, CheckCircle2, Sparkles, Database, Brain, Rocket, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className={styles.page}>
      {/* ── BACKGROUNDS ────────────────────────────────────────── */}
      <div className={styles.heroGrid}></div>
      <div className={styles.heroGlow}></div>
      <div className={styles.meshBg}>
         <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_hero_network_1774133553349.png" alt="" className={styles.heroMesh} />
      </div>

      {/* ── NAV ───────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <div className={styles.headerActions}>
          <Link href="/login">
            <button className={styles.btnText}>Entrar</button>
          </Link>
          <Link href="https://wa.me/5500000000000" target="_blank">
            <button className={styles.btnPrimary}>
              <MessageCircle size={16} />
              <span>Falar com Consultor</span>
            </button>
          </Link>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroTag}>
          <Sparkles size={14} />
          <span>O SISTEMA OPERACIONAL DA INTELIGÊNCIA EMPRESARIAL</span>
        </div>

        <h1 className={styles.heroH1}>
          Do Dado Bruto <br />
          À <span className={styles.gradientText}>Decisão Executiva.</span>
        </h1>

        <p className={styles.heroP}>
          Conectamos sistemas, dados, Inteligência Artificial (IA) e gestão em uma única arquitetura operacional. Revelamos as estruturas invisíveis do seu negócio para que você decida com base em evidências, com previsibilidade e governança.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 10 }}>
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
          <h2 className={styles.modulesTitle}>Fragmentação de Dados & Decisões Lentas</h2>
          <p className={styles.sectionSubtitle}>Empresas produzem dados massivos, mas sofrem sem clareza estratégica. Criamos a ponte entre o caos e o controle.</p>
        </div>
        
        <div className={styles.doresGrid}>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>01</div>
            <h3 className={styles.dorTitle}>Dados Isolados</h3>
            <p className={styles.dorBody}>Sistemas que não conversam (CRM, ERP, Planilhas) multiplicam o trabalho operacional e geram gargalos de informação.</p>
          </div>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>02</div>
            <h3 className={styles.dorTitle}>Risco Jurídico e Compliance</h3>
            <p className={styles.dorBody}>Falta de rastreabilidade documental e gestão de ciclo de vida de contratos que custam tempo e verba.</p>
          </div>
          <div className={styles.dorCard}>
            <div className={styles.dorNum}>03</div>
            <h3 className={styles.dorTitle}>Visão Situacional Baixa</h3>
            <p className={styles.dorBody}>Sem o cruzamento de dados em tempo real, os líderes reagem tardiamente às mudanças do mercado.</p>
          </div>
        </div>
      </section>

      {/* ── 2. O ECOSSISTEMA MÓDULAR (O MOTOR) ─────────────────────── */}
      <section className={styles.section} style={{ background: 'rgba(255,,255,255,0.01)', borderY: '1px solid rgba(255,255,255,0.03)' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.modulesBadge}>Pillars & Ecosystem</span>
          <h2 className={styles.modulesTitle}>Um Ecossistema Completo de Gestão</h2>
          <p className={styles.sectionSubtitle}>Não vendemos um software. Entregamos uma infraestrutura modular capaz de abraçar cada vertical do seu negócio.</p>
        </div>

        <div className={styles.ecoGrid}>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#C8F542', color: '#000' }}><FileText size={24} /></div>
            <h3>Arkos Platform & Systems</h3>
            <p>A base operacional. Desenvolvimento, fluxos de processos, CRM, ERP, logística e central documental CLM integrada via APIs auditáveis.</p>
          </div>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#A855F7', color: '#fff' }}><Database size={24} /></div>
            <h3>Arkos Data & AI</h3>
            <p>Infraestrutura pesada em Engenharia de Dados e aplicação direta de Inteligência Artificial para revelar padrões e tendências da gestão.</p>
          </div>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#06B6D4', color: '#fff' }}><Brain size={24} /></div>
            <h3>Arkos Strategy & Intelligence</h3>
            <p>Diagnósticos situacionais, pesquisas de concorrência ativa e análise de Marketing Digital, unindo o cenário interno com o externo.</p>
          </div>
          <div className={styles.ecoCard}>
            <div className={styles.ecoIcon} style={{ background: '#F59E0B', color: '#fff' }}><Rocket size={24} /></div>
            <h3>Arkos Academy</h3>
            <p>A frente EdTech que forma gestores em ciência de dados e administração ágil, garantindo cultura orientada a dados na sua organização.</p>
          </div>
        </div>
      </section>

      {/* ── 3. AS 4 CAMADAS (TIMELINE) ────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.modulesBadge}>Arquitetura de Entrega</span>
          <h2 className={styles.modulesTitle}>Da Coleta à Decisão em 4 Etapas</h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>01</div>
            <div>
              <h4>1. Coleta e Conexão de Dados</h4>
              <p>Extraímos informações de todas as fontes nativas da empresa: ERPs, CRMs, APIs, planilhas e databases estruturadas.</p>
            </div>
          </div>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>02</div>
            <div>
              <h4>2. Tratamento e Integração</h4>
              <p>Processamento de engenharia de dados (ETL) que unifica, audita e armazena os dados em um Data Warehouse limpo e seguro.</p>
            </div>
          </div>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>03</div>
            <div>
              <h4>3. Inteligência e Modelagem (IA)</h4>
              <p>Modelagem estatística, Machine Learning e análise preditiva para traduzir números brutos em tendências de comportamento.</p>
            </div>
          </div>
          <div className={styles.timeItem}>
            <div className={styles.timeBadge}>04</div>
            <div>
              <h4>4. Resposta e Decisão Executiva</h4>
              <p>Dashboard de ponta, simulação de cenários de risco, alertas táticos e recomendações práticas para governança de alto nível.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VERTICAIS DE PRODUTOS ─────────────────────────────── */}
      <section id="modulos" className={styles.modulesWrapper} style={{ position: 'relative' }}>
        <div className={styles.modulesHeader}>
          <span className={styles.modulesBadge}>SaaS & Licenças</span>
          <h2 className={styles.modulesTitle}>Módulos Especializados por Departamento</h2>
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
              <h3 className={styles.cardTitle}>Arkos Ópera CLM</h3>
              <p className={styles.cardP}>Software de Gestão de Ciclo de Vida de Contratos e Documentações centralizadas.</p>
              <ul className={styles.cardList}>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: 'var(--primary)' }} /><span>Assinatura Digital Integrada</span></li>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: 'var(--primary)' }} /><span>Rastreabilidade de Fluxos Auditáveis</span></li>
              </ul>
              <Link href="/login"><button className={styles.cardBtn}>Iniciar Módulo</button></Link>
            </div>
          </div>

          {/* Módulo 2: Decision */}
          <div className={styles.card} style={{ opacity: 0.9 }}>
            <div className={styles.cardImage} style={{ backgroundImage: `url('file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_dashboard_decision_1774133572097.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}></div>
              <span className={styles.cardStatus} style={{ color: '#A855F7', borderColor: 'rgba(168,85,247,0.2)' }}>Em Carga</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Arkos Decision</h3>
              <p className={styles.cardP}>Cruzamento de cenários econômicos e indicadores táticos em tempo real (BI).</p>
              <ul className={styles.cardList}>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: '#A855F7' }} /><span>Predição de Cenários de Caixa</span></li>
                <li className={styles.cardListItem}><CheckCircle2 size={12} style={{ color: '#A855F7' }} /><span>Monitoramento Executivo Central</span></li>
              </ul>
              <button className={styles.cardBtn} disabled style={{ cursor: 'not-allowed', background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', color: '#64748B' }}>Iniciando Módulo...</button>
            </div>
          </div>

          {/* Módulo 3: Finance / Market */}
          <div className={styles.card} style={{ opacity: 0.8 }}>
            <div className={styles.cardImage}>
              <div className={styles.cardGlow} style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}></div>
              <div style={{ opacity: 0.2, color: '#22D3EE' }}><BarChart2 size={100} strokeWidth={1} /></div>
              <span className={styles.cardStatus} style={{ color: '#22D3EE', borderColor: 'rgba(6,182,212,0.2)' }}>Em breve</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Arkos Finance & Sales</h3>
              <p className={styles.cardP}>Inteligência aplicada à saúde financeira e performance comercial da sua rede.</p>
              <button className={styles.cardBtn} disabled style={{ background: 'transparent', color: '#64748B' }}>Em breve</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SOBRE A INSTITUIÇÃO (ARCHÉ) ─────────────────────────── */}
      <section className={styles.section} style={{ paddingY: '140px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span className={styles.modulesBadge}>A Origem idealista</span>
            <h2 className={styles.modulesTitle} style={{ textAlign: 'left', fontSize: '2.5rem' }}>Inspirados Pela Arché</h2>
            <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginTop: '1rem' }}>
              Baseados na palavra grega *arché* — aquilo que governa, organiza e fundamenta todas as coisas —, idealizamos uma plataforma para revelar o invisível das organizações através de dados limpos.
            </p>
            <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginTop: '1rem' }}>
              Unindo economia, ciência de dados, administração e agilidade tática, a ARKOS foi projetada por Renato Silva de Assis, Emmanuel Peixoto, Gabriel Mamede e Julio Cesar para entregar previsibilidade executiva e controle em escala.
            </p>
          </div>
          <div style={{ background: '#111318', border: '1px solid #1F242D', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
             <img src="/logo-high-res.svg" alt="Arkhe" style={{ width: '64px', marginBottom: '1rem', opacity: 0.8 }} />
             <h4 style={{ color: '#C8F542', fontSize: '1.25rem', fontFamily: 'var(--serif)' }}>Ciência de Dados • IA • Administração</h4>
             <p style={{ color: '#8A8F99', fontSize: '0.813rem', marginTop: '0.5rem' }}>Governança Baseada em Evidências.</p>
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
