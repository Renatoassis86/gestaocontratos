'use client'

import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, Sparkles, MessageCircle, Home as HomeIcon, Grid, Eye, TrendingUp, Cpu } from 'lucide-react'

export default function Home() {
  return (
    <div className={styles.page}>
      
      {/* ── BACKGROUNDS & DECORATIONS ─────────────────────────── */}
      <div className={styles.heroGlow}></div>
      <div className={styles.meshBg}></div>

      {/* ── HEADER (ADAPTA STYLE) ────────────────────────────────── */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <nav className={styles.hideOnMobile} style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: '#8A8F99' }}>
          <Link href="#solucoes" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span style={{ cursor: 'pointer' }}>Soluções</span></Link>
          <Link href="#fluxo" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span style={{ cursor: 'pointer' }}>Maturidade</span></Link>
          <Link href="#sobre" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span style={{ cursor: 'pointer' }}>Sobre</span></Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/login" className={styles.hideOnMobile}>
            <button className={styles.btnText}>Entrar</button>
          </Link>
          <Link href="https://wa.me/5583981957737" target="_blank" className={styles.headerCta}>
            <button className={styles.btnPrimary} style={{ background: '#C8F542', color: '#000', fontWeight: '800' }}>
              <MessageCircle size={16} />
              <span>Consultor</span>
            </button>
          </Link>
        </div>
      </header>

      {/* ── HERO (LAPTOP ADAPTA STYLE) ────────────────────────── */}
      <section className={styles.heroAdapta}>
        <div className={styles.heroTag} style={{ background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.12)', color: '#C8F542' }}>
          <Sparkles size={14} />
          <span>ARKOS INTELLIGENCE 2026</span>
        </div>

        <h1 className={styles.heroH1Adapta}>
          Tudo o que você precisa <br />
          de dados, <span style={{ color: '#C8F542' }}>em um só lugar.</span>
        </h1>

        <p className={styles.heroPAdapta}>
          As melhores infraestruturas de dados, cruzes econômicos práticos e uma esteira de ciclo operacional dentro de uma única infraestrutura empresarial.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', zIndex: 10 }}>
          <Link href="/login">
            <button className={styles.btnPrimary} style={{ background: '#C8F542', color: '#000', padding: '16px 32px', borderRadius: '14px', fontWeight: '800' }}>
              <span>Quero Fazer Parte</span>
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="https://wa.me/5583981957737" target="_blank" className={styles.hideOnMobile}>
            <button className={styles.btnSecondary} style={{ padding: '16px 32px', borderRadius: '14px' }}>
              <span>Diagnóstico Gratuito</span>
              <ArrowRight size={18} opacity={0.5} />
            </button>
          </Link>
        </div>

        {/* MOCKUP DO LAPTOP COM DASHBOARD CLICKUP STYLE */}
        <div className={styles.laptopContainer}>
          <div className={styles.laptopInnerShadow}></div>
          <img 
            src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_financial_clickup_dashboard_1774143700587.png" 
            alt="Dashboard Ágil Arkos" 
            className={styles.laptopImage} 
          />
        </div>
      </section>

      {/* ── SEÇÃO DE PARCEIROS (LOGOS MONOCROMATICOS) ─────────────── */}
      <div className={styles.logobar}>
        <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '1.5rem', textAlign: 'center' }}>APLICADO E APOIADO POR PROFISSIONAIS DE EMPRESAS COMO</p>
        <div className={styles.logoGrid}>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', opacity: 0.6 }}>BRASIL PARALELO</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', opacity: 0.6 }}>USP</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', opacity: 0.6 }}>facebook</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', opacity: 0.6 }}>ambev</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', opacity: 0.6 }}>ifcv</span>
        </div>
      </div>

      {/* ── 1. GRID DE FERRAMENTAS ESPECIAIS (ADAPTA 3X2 GRID) ─────── */}
      <section id="solucoes" className={styles.section} style={{ paddingTop: '80px' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', padding: '6px 14px', background: 'rgba(200,245,66,0.06)', borderRadius: '20px', color: '#C8F542', fontSize: '0.75rem', fontWeight: '700', gap: '6px', alignItems: 'center', margin: '0 auto 12px auto' }}> <Sparkles size={12} /> SISTEMAS GERENCIAIS</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', letterSpacing: '-0.03em' }}>Além disso, tenha acesso a <br /> Gestão e BI</h2>
        </div>

        <div className={styles.adaptaGrid}>
          
          <div className={styles.adaptaCard}>
            <div className={styles.adaptaCardHeader}>
              <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_financial_clickup_dashboard_1774143700587.png" alt="SaaS Dashboard" className={styles.adaptaCardImg} />
            </div>
            <div className={styles.adaptaCardBody}>
              <h4>Gestão de Contratos e Documentos</h4>
              <p>Mantenha seus fluxos centralizados, categorizados e organize seus contratos de maneira ágil, via Kanban e dashboards de status.</p>
            </div>
          </div>

          <div className={styles.adaptaCard}>
            <div className={styles.adaptaCardHeader}>
              <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_corporate_presenting_1774143639165.png" alt="BI Dashboard" className={styles.adaptaCardImg} />
            </div>
            <div className={styles.adaptaCardBody}>
              <h4>Análise de Dados de Negócio</h4>
              <p>Painéis financeiros cruzados com cruzamentos operacionais em tempo real para tomada de decisão executiva segura.</p>
            </div>
          </div>

          <div className={styles.adaptaCard}>
            <div className={styles.adaptaCardHeader}>
              <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_corporate_boardroom_1774143669395.png" alt="Decision" className={styles.adaptaCardImg} />
            </div>
            <div className={styles.adaptaCardBody}>
              <h4>Painel de Decisores</h4>
              <p>Visão de governança de alta liderança em painéis interativos de BI baseados em compliance robusto.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. FLUXO DE MATURIDADE ANALÍTICA (TIMELINE STYLE) ─────── */}
      <section id="fluxo" className={styles.section} style={{ background: '#07080a', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', padding: '6px 14px', background: 'rgba(200,245,66,0.06)', borderRadius: '20px', color: '#C8F542', fontSize: '0.75rem', fontWeight: '700', gap: '6px', alignItems: 'center', margin: '0 auto 12px auto' }}> <TrendingUp size={12} /> PIPELINE DE MATURIDADE</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', letterSpacing: '-0.03em' }}>A Jornada do Dado <br /> À Tomada de Decisão</h2>
        </div>

        <div className={styles.streamTimeline}>
          <div className={styles.streamLine}></div>

          {/* ITEM 1: DESCRIÇÃO */}
          <div className={styles.streamItem}>
            <div className={styles.streamIcon}><Eye size={18} /></div>
            <div className={styles.streamContent}>
              <div className={styles.streamImageWrapper}>
                <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_corporate_boardroom_1774143669395.png" alt="Descrição" className={styles.streamImage} />
              </div>
              <div className={styles.streamText}>
                <span className={styles.streamLabel}>ETAPA 01</span>
                <h3>Descrição: Análise de Diagnóstico</h3>
                <p>O que aconteceu? Estruture dados operacionais crus em painéis de BI vivos para entender as métricas agregadas e gargalos produtivos da empresa.</p>
              </div>
            </div>
          </div>

          {/* ITEM 2: PREDIÇÃO */}
          <div className={styles.streamItem}>
            <div className={styles.streamIcon} style={{ background: '#C8F542', color: '#000' }}><Cpu size={18} /></div>
            <div className={styles.streamContent}>
              <div className={styles.streamImageWrapper}>
                <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_financial_clickup_dashboard_1774143700587.png" alt="Predição" className={styles.streamImage} />
              </div>
              <div className={styles.streamText}>
                <span className={styles.streamLabel} style={{ color: '#C8F542' }}>ETAPA 02</span>
                <h3>Predição: Modelagem de Cenários</h3>
                <p>O que vai acontecer? Projete comportamentos futuros, flutuações financeiras e tendências de mercado com base em pipelines de dados preditivos estruturados.</p>
              </div>
            </div>
          </div>

          {/* ITEM 3: PRESCRIÇÃO */}
          <div className={styles.streamItem}>
            <div className={styles.streamIcon}><Sparkles size={18} /></div>
            <div className={styles.streamContent}>
              <div className={styles.streamImageWrapper}>
                <img src="file:///C:/Users/renato/.gemini/antigravity/brain/93e64aad-1b74-4bf1-8e76-61f845a2ba1f/arkos_real_executive_dashboard_1774143584596.png" alt="Prescrição" className={styles.streamImage} />
              </div>
              <div className={styles.streamText}>
                <span className={styles.streamLabel}>ETAPA 03</span>
                <h3>Prescrição: Tomada de Decisão</h3>
                <p>O que devemos fazer? Geração de planos de ação táticos, otimização de fluxos e recomendações executivas baseadas em cenários estruturados e cruzados.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER (ADAPTA STYLE SITEMAP) ───────────────────────── */}
      <footer className={styles.footerMega}>
        <div className={styles.footerGrid}>
          
          <div className={styles.footerCol}>
            <h4>Mapa</h4>
            <Link href="#solucoes">Soluções</Link>
            <Link href="#fluxo">Maturidade Analítica</Link>
            <Link href="#">Para Empresas</Link>
            <Link href="#">Planos & Preços</Link>
            <Link href="#">Políticas de Privacidade</Link>
          </div>

          <div className={styles.footerCol}>
            <h4>Redes Sociais</h4>
            <Link href="https://linkedin.com" target="_blank">LinkedIn</Link>
            <Link href="https://instagram.com" target="_blank">Instagram</Link>
            <Link href="https://facebook.com" target="_blank">Facebook</Link>
          </div>

          <div className={styles.footerCol}>
            <h4>Fale Conosco</h4>
            <p style={{ color: '#F4F2ED' }}>contato@arkos.com</p>
            <p style={{ color: '#F4F2ED' }}>+55 (83) 98195-7737</p>
            <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '4px' }}>Atendimento humanizado, todos os dias de 09h00 às 18h00.</p>
          </div>

          <div className={styles.footerCol} style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
            <img src="/logo-high-res.svg" alt="Arkos" style={{ height: '24px', opacity: 0.8, marginBottom: '8px' }} />
            <p style={{ fontSize: '0.75rem', color: '#475569' }}>Caixa Postal-035</p>
            <p style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'right', lineHeight: '1.4' }}>Avenida João Machado, 849, Sala 801<br />Centro, João Pessoa - PB<br />CEP: 58013-522</p>
          </div>

        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '30px', textAlign: 'center', fontSize: '11px', color: '#475569', marginTop: '60px' }}>
          &copy; {new Date().getFullYear()} ARKOS. A Infraestrutura da Nova Economia Empresarial.
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAVBAR ────────────────────────────────── */}
      <nav className={styles.mobileNavbar}>
        <Link href="#" className={styles.navItem}><HomeIcon size={20} /><span>Início</span></Link>
        <Link href="#solucoes" className={styles.navItem}><Grid size={20} /><span>Sistemas</span></Link>
        <Link href="https://wa.me/5583981957737" target="_blank" className={styles.navItemCta} style={{ color: '#C8F542' }}><MessageCircle size={20} /><span>Consultor</span></Link>
      </nav>

    </div>
  )
}
