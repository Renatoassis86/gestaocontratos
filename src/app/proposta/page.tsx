import Link from 'next/link'
import styles from './proposta.module.css'
import { ArrowLeft, CheckCircle2, Award, Zap, BarChart4, Target, FileText } from 'lucide-react'

export default function PropostaArkos() {
  return (
    <div className={styles.page}>
      {/* Background Glows */}
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>Voltar para Início</span>
        </Link>
      </header>

      <main className={styles.main}>
        {/* Intro */}
        <div className={styles.intro}>
          <div className={styles.badge}>
            <Award size={14} style={{ color: '#10B981' }} />
            <span>ARKOS PITCH DECK 2026</span>
          </div>
          <h1 className={styles.title}>
            A Infraestrutura de Inteligência <br />
            <span className={styles.gradientText}>da Nova Economia</span>
          </h1>
          <p className={styles.subtitle}>
            Data • Intelligence • Decision. Como transformamos volume operacional em vantagens competitivas.
          </p>
        </div>

        {/* Sections Grid */}
        <div className={styles.sectionList}>
          {/* Pilar 1: B2B SaaS */}
          <div className={styles.row}>
            <div>
              <div className={styles.iconBox}>
                <Zap size={22} />
              </div>
              <h2 className={styles.rowTitle}>B2B SaaS: Ecossistema Modular</h2>
              <p className={styles.rowP}>
                Nossa arquitetura de software permite que cada área da corporação opere de forma independente, mas com governança fluida. Eliminamos silos de dados com um motor unificado de processamento.
              </p>
              <ul className={styles.uList}>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#10B981', marginTop: '2px' }} />
                  <span>Multi-Tenancy Dinâmico para segregação de dados.</span>
                </li>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#10B981', marginTop: '2px' }} />
                  <span>Workflows customizáveis que acompanham seu crescimento.</span>
                </li>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#10B981', marginTop: '2px' }} />
                  <span>Gestão de Contratos (CLM) com Assinatura em Lote.</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.visualCard}>
              <div className={styles.visualGlow} style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}></div>
              <div className={styles.visualIcon} style={{ color: '#10B981' }}>
                <FileText size={120} strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* Pilar 2: Enterprise Analytics */}
          <div className={styles.row}>
            {/* O desktop tem imagem na esquerda, mobile inverte. Usamos order CSS */}
            <div className={`${styles.visualCard} ${styles.order2}`} style={{ background: 'linear-gradient(135deg, #0C111A, #16102B)' }}>
              <div className={styles.visualGlow} style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}></div>
              <div className={styles.visualIcon} style={{ color: '#A78BFA' }}>
                <BarChart4 size={120} strokeWidth={1} />
              </div>
            </div>

            <div className={styles.order1}>
              <div className={styles.iconBox} style={{ backgroundColor: 'rgba(124, 58, 237, 0.05)', borderColor: 'rgba(124,58,237,0.2)', color: '#A78BFA' }}>
                <BarChart4 size={22} />
              </div>
              <h2 className={styles.rowTitle}>Enterprise Analytics</h2>
              <p className={styles.rowP}>
                Mais do que relatórios de dados; geramos inteligência preditiva. Entenda custos, projete volumes contratuais e localize gargalos operacionais instantaneamente.
              </p>
              <ul className={styles.uList}>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#A78BFA', marginTop: '2px' }} />
                  <span>Dashboards unificados com KPIs executivos em tempo real.</span>
                </li>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#A78BFA', marginTop: '2px' }} />
                  <span>Controle financeiro e análise de fluxo de caixa contratual.</span>
                </li>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#A78BFA', marginTop: '2px' }} />
                  <span>Geração de relatórios com inteligência automatizada.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pilar 3: Marketing Intelligence */}
          <div className={styles.row}>
            <div>
              <div className={styles.iconBox} style={{ backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6,182,212,0.2)', color: '#22D3EE' }}>
                <Target size={22} />
              </div>
              <h2 className={styles.rowTitle}>Marketing Intelligence</h2>
              <p className={styles.rowP}>
                Construa audiências e tome decisões baseadas em padrões de consumo de dados analíticos. Descubra exatamente onde concentrar investimentos e esforços.
              </p>
              <ul className={styles.uList}>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#22D3EE', marginTop: '2px' }} />
                  <span>Construção de audiências e segmentação baseada em uso real.</span>
                </li>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#22D3EE', marginTop: '2px' }} />
                  <span>Captação de leads e funil integrado automatizado.</span>
                </li>
                <li className={styles.uListItem}>
                  <CheckCircle2 size={16} style={{ color: '#22D3EE', marginTop: '2px' }} />
                  <span>Estratégias digitais respaldadas por inteligência preditiva.</span>
                </li>
              </ul>
            </div>

            <div className={styles.visualCard} style={{ background: 'linear-gradient(135deg, #0C111A, #06191E)' }}>
              <div className={styles.visualGlow} style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}></div>
              <div className={styles.visualIcon} style={{ color: '#22D3EE' }}>
                <Target size={120} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
