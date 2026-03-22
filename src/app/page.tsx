'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, Sparkles, MessageCircle, Home as HomeIcon, TrendingUp, Eye, Cpu, Shield, Users } from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={styles.page}>
      
      {/* ── BACKGROUNDS & DECORATIONS ─────────────────────────── */}
      <div className={styles.meshBg}></div>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <nav className={styles.hideOnMobile} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.813rem', color: '#8A8F99' }}>
          {/* Dropdown Institucional */}
          <div className={styles.navLinkDropdown} style={{ transition: 'color 0.2s', color: 'inherit' }}>
            <span style={{ cursor: 'pointer' }}>Institucional</span>
            <div className={styles.dropdownMenu}>
              <Link href="#problema" className={styles.dropdownItem}>O que é a Arkos</Link>
              <Link href="#solucao" className={styles.dropdownItem}>Quem somos</Link>
              <Link href="#equipe" className={styles.dropdownItem}>Conheça nossa equipe</Link>
              <Link href="#modulos" className={styles.dropdownItem}>Nosso negócio</Link>
            </div>
          </div>

          <Link href="#problema" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span>O Problema</span></Link>
          <Link href="#solucao" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span>Solução</span></Link>
          <Link href="#modulos" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span>Módulos</span></Link>
          <Link href="#fluxo" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span>Maturidade</span></Link>
          <Link href="#vantagem" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }}><span>Diferencial</span></Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/login" className={styles.hideOnMobile}>
            <button className={styles.btnText}>Entrar</button>
          </Link>
          <Link href="https://wa.me/5583981957737" target="_blank" className={styles.headerCta}>
            <button className={styles.btnPrimary}>
              <MessageCircle size={14} />
              <span>Consultor</span>
            </button>
          </Link>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className={styles.heroAdapta}>
        <div className={styles.heroTag} style={{ background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.12)', color: '#C8F542' }}>
          <Sparkles size={12} />
          <span>Infraestrutura de Inteligência · B2B SaaS</span>
        </div>

        <h1 className={styles.heroH1Adapta}>
          A Infraestrutura de <br />
          <span style={{ color: '#C8F542', fontStyle: 'italic' }}>Inteligência</span> da Nova Economia.
        </h1>

        <p className={styles.heroPAdapta}>
          Do dado bruto à decisão executiva. A ARKOS conecta sistemas, dados, analytics e gestão em uma única arquitetura operacional.
        </p>

        {/* IMAGE: MOCKUP DO LAPTOP COM LOCAL PUBLIC APP PATH */}
        <div className={styles.laptopContainer}>
          <div className={styles.carouselTrack} style={{ transform: `translateX(-${(currentSlide * 100) / 3}%)` }}>
            {/* Slide 1 */}
            <div className={styles.carouselSlide}>
              <div className={styles.carouselInnerShadow}></div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2850&q=100" alt="Dashboard Ágil Arkos 1" className={styles.carouselImage} />
            </div>
            {/* Slide 2 */}
            <div className={styles.carouselSlide}>
              <div className={styles.carouselInnerShadow}></div>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2850&q=100" alt="Dashboard Ágil Arkos 2" className={styles.carouselImage} />
            </div>
            {/* Slide 3 */}
            <div className={styles.carouselSlide}>
              <div className={styles.carouselInnerShadow}></div>
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2850&q=100" alt="Dashboard Ágil Arkos 3" className={styles.carouselImage} />
            </div>
          </div>

          <div className={styles.carouselNav}>
            {[0, 1, 2].map((idx) => (
              <button 
                key={idx}
                className={`${styles.carouselDot} ${currentSlide === idx ? styles.carouselDotActive : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px', zIndex: 10 }}>
          <Link href="https://wa.me/5583981957737" target="_blank">
            <button className={styles.btnPrimary} style={{ padding: '14px 28px' }}>
              <span>Diagnóstico Gratuito</span>
              <ArrowRight size={16} />
            </button>
          </Link>
          <Link href="#solucao" className={styles.hideOnMobile}>
            <button className={styles.btnSecondary}>
              <span>Ver Como Funciona</span>
            </button>
          </Link>
        </div>
      </section>

      {/* ── LOGOBAR ─── */}
      <div className={styles.logobar} style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)', background: 'rgba(0,0,0,0.2)' }}>
        <p style={{ fontSize: '0.75rem', color: '#8A8F99', marginBottom: '2rem', textAlign: 'center', fontFamily: 'monospace', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>APLICADO E APOIADO POR INSTITUIÇÕES COMO</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', alignItems: 'center', maxWidth: '1100px', margin: '0 auto', padding: '0 20px', opacity: 0.5 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}>
            <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '2px', fontFamily: 'sans-serif' }}>DIEESE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>E-CONSULT</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFF' }}>
            <Shield size={24} />
            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Cidade Viva</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFF' }}>
            <span style={{ fontWeight: 400, fontSize: '1.4rem', fontFamily: 'serif', letterSpacing: '2px' }}>FICV</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '1px' }}>SINTAJ</span>
          </div>

        </div>
      </div>

      {/* ── 1. O PROBLEMA ───────────────────────────────────────── */}
      <section id="problema" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>O PROBLEMA</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Por que as empresas perdem clareza</h2>
        </div>
        <p className={styles.sectionIntro}>3 dores estruturais que se repetem em todo negócio — independente do porte ou segmento.</p>

        <div className={styles.doresGrid}>
          <div className={styles.dorCard}>
            <span className={styles.dorNum}>01</span>
            <h3 className={styles.dorTitle}>Informação Fragmentada</h3>
            <p className={styles.dorBody}>Dados espalhados em planilhas, ERPs, CRMs e ferramentas digitais sem conexão entre si. A empresa enxerga pedaços do problema — nunca o todo.</p>
          </div>
          <div className={styles.dorCard}>
            <span className={styles.dorNum}>02</span>
            <h3 className={styles.dorTitle}>Baixa Capacidade Analítica</h3>
            <p className={styles.dorBody}>Dados existem, mas não se transformam em entendimento. Times passam horas em relatórios manuais e ainda assim chegam a conclusões imprecisas.</p>
          </div>
          <div className={styles.dorCard}>
            <span className={styles.dorNum}>03</span>
            <h3 className={styles.dorTitle}>Decisão por Percepção</h3>
            <p className={styles.dorBody}>Sem modelagem, a gestão reage ao passado em vez de prever o futuro. O ruído vence a evidência. A empresa investe mais e ainda assim não sabe o que está funcionando.</p>
          </div>
        </div>
      </section>

      {/* ── 2. SOLUÇÃO ─────────────────────────────────────────── */}
      <section id="solucao" className={styles.section} style={{ background: '#090a0c' }}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>A SOLUÇÃO</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Do dado bruto à decisão executiva</h2>
        </div>
        
        <div className={styles.solucaoGrid}>
          {/* LEFT: Camadas do Pipeline */}
          <div className={styles.camadas}>
            <div className={styles.camada}>
              <div className={styles.camadaBar}></div>
              <div className={styles.camadaContent}>
                <div className={styles.camadaTag}>Camada 1</div>
                <div className={styles.camadaName}>Fontes de Dados</div>
                <div className={styles.camadaDesc}>ERP, CRM, financeiro, marketing, operações, planilhas e dados externos integrados.</div>
              </div>
            </div>
            <div className={styles.camada}>
              <div className={styles.camadaBar}></div>
              <div className={styles.camadaContent}>
                <div className={styles.camadaTag}>Camada 2</div>
                <div className={styles.camadaName}>Integração & Pipelines</div>
                <div className={styles.camadaDesc}>APIs, ETL automático, governança de dados limpos e modelagem unificada via Data Lake Node.</div>
              </div>
            </div>
            <div className={styles.camada}>
              <div className={styles.camadaBar}></div>
              <div className={styles.camadaContent}>
                <div className={styles.camadaTag}>Camada 3</div>
                <div className={styles.camadaName}>Analytics Estruturado</div>
                <div className={styles.camadaDesc}>Modelos estatísticos, segmentações e cruzamento correlacional de alta fidelidade Node.</div>
              </div>
            </div>
            <div className={styles.camada}>
              <div className={styles.camadaBar}></div>
              <div className={styles.camadaContent}>
                <div className={styles.camadaTag}>Camada 4</div>
                <div className={styles.camadaName}>Inteligência Ativa</div>
                <div className={styles.camadaDesc}>Dashboards dinâmicos, alertas configuráveis de métricas e copiloto analítico de auditoria.</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Video and Differentiators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Video Thumbnail Hero */}
            <div className={styles.videoContainer}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                className={styles.videoPlayer}
              >
                {/* O usuário precisará adicionar o arquivo video-executivos.mp4 na pasta public */}
                <source src="/video-executivos.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
              <div className={styles.videoOverlay}>
                <div className={styles.videoTag}>Decisão Estratégica em Tempo Real</div>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px' }}>O QUE NOS DIFERENCIA</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '16px', lineHeight: '1.2' }}>Não vendemos software. Vendemos infraestrutura.</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.938rem', lineHeight: '1.8', marginBottom: '24px' }}>A vantagem real não está na tecnologia — está na cultura, nos dados proprietários e na capacidade analítica integrada às regras de negócio da empresa.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', background: '#111318', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <Shield size={20} color="#C8F542" />
                  <span style={{ fontSize: '0.813rem', color: '#F4F2ED' }}>Operamos em analytics de alto nível — onde menos de 5% das empresas operam.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', background: '#111318', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <Users size={20} color="#C8F542" />
                  <span style={{ fontSize: '0.813rem', color: '#F4F2ED' }}>Letramento nativo para que sua equipe decida com autonomia de longo prazo.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MÓDULOS ─────────────────────────────────────────── */}
      <section id="modulos" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>6 MÓDULOS · 1 ECOSSISTEMA</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Suite de Produtos ARKOS</h2>
        </div>

        <div className={styles.modulosGrid}>
          {/* Módulos contents */}
          <div className={styles.moduloCard}>
            <div className={styles.moduloSub}>WEDGE ENTRADA</div>
            <h3 className={styles.moduloTitle}>Marketing Intelligence</h3>
            <p className={styles.moduloDesc}>Satisfação, mercado, digital e funil comercial. O módulo de entrada com ROI visível em semanas.</p>
          </div>
          <div className={styles.moduloCard}>
            <div className={styles.moduloSub}>FUNDAÇÃO</div>
            <h3 className={styles.moduloTitle}>Arkos Data</h3>
            <p className={styles.moduloDesc}>Data warehouse, APIs, pipelines e governança de dados. A fundação de sua esteira analítica.</p>
          </div>
          <div className={styles.moduloCard}>
            <div className={styles.moduloSub}>ESPINHA DORSAL</div>
            <h3 className={styles.moduloTitle}>Arkos Systems</h3>
            <p className={styles.moduloDesc}>Contratos, documentos, estoque e fluxos operacionais integrados em uma única plataforma.</p>
          </div>
          <div className={styles.moduloCard}>
            <div className={styles.moduloSub}>AUTOMAÇÃO</div>
            <h3 className={styles.moduloTitle}>Arkos AI</h3>
            <p className={styles.moduloDesc}>Copilots executivos, previsão de quebras de contrato e notificações de anomalia baseadas em IA.</p>
          </div>
          <div className={styles.moduloCard}>
            <div className={styles.moduloSub}>ESTRATÉGIA</div>
            <h3 className={styles.moduloTitle}>Arkos Strategy</h3>
            <p className={styles.moduloDesc}>Planejamento estratégico estruturado e leitura de cenários de cruzamento econômico.</p>
          </div>
          <div className={styles.moduloCard}>
            <div className={styles.moduloSub}>LETRAMENTO</div>
            <h3 className={styles.moduloTitle}>Arkos Academy</h3>
            <p className={styles.moduloDesc}>Trilhas educacionais corporativas, EdTechs white-label para faculdades e sistemas de ensino. Unimos rigor acadêmico com métricas preditivas de gestão e resultados a partir do comportamento e interação digital dos alunos.</p>
          </div>
        </div>
      </section>

      {/* ── 4. FLUXO DE MATURIDADE ANALÍTICA (TIMELINE) ─────── */}
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
                <img src="/arkos_corporate_boardroom_1774143669395.png" alt="Descrição" className={styles.streamImage} />
              </div>
              <div className={styles.streamText}>
                <span className={styles.streamLabel}>ETAPA 01</span>
                <h3>Descrição: Análise de Diagnóstico</h3>
                <p>O que aconteceu? Estruture dados operacionais crus em painéis de BI vivos para entender as métricas agregadas e gargalos produtivos da empresa.</p>
              </div>
            </div>
          </div>

          {/* ITEM 2: PREDIÇÃO - UPDATED WITH AI BRAIN IMAGE */}
          <div className={styles.streamItem}>
            <div className={styles.streamIcon} style={{ background: '#C8F542', color: '#000' }}><Cpu size={18} /></div>
            <div className={styles.streamContent}>
              <div className={styles.streamImageWrapper}>
                <img src="/arkos_data_brain_1774143436679.png" alt="Predição Modelagem e Redes Neurais" className={styles.streamImage} />
              </div>
              <div className={styles.streamText}>
                <span className={styles.streamLabel} style={{ color: '#C8F542' }}>ETAPA 02</span>
                <h3>Predição: Modelagem (Machine Learning)</h3>
                <p>O que vai acontecer? Projete comportamentos e cenários futuros em <strong>todas as áreas da empresa</strong> (comercial, operacional, financeira). Antecipe tendências, riscos de churn e gargalos produtivos cruzando dados <strong>estruturados e não-estruturados</strong> através de redes neurais avançadas.</p>
              </div>
            </div>
          </div>

          {/* ITEM 3: PRESCRIÇÃO */}
          <div className={styles.streamItem}>
            <div className={styles.streamIcon}><Sparkles size={18} /></div>
            <div className={styles.streamContent}>
              <div className={styles.streamImageWrapper}>
                <img src="/arkos_real_executive_dashboard_1774143584596.png" alt="Prescrição" className={styles.streamImage} />
              </div>
              <div className={styles.streamText}>
                <span className={styles.streamLabel}>ETAPA 03</span>
                <h3>Prescrição: Tomada de Decisão (Ações Dirigidas)</h3>
                <p>O que devemos fazer? Tradução da métrica em ação. Geração de planos táticos, otimização automática de fluxos operacionais, alocação inteligente de recursos financeiros e humanos, e formulação de recomendações executivas guiadas pelo cruzamento de múltiplos cenários simulados.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. EQUIPE (CREATORS) ────────────────────────────────── */}
      <section id="equipe" className={styles.section} style={{ background: '#090a0c' }}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>CONHEÇA NOSSA EQUIPE</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Os Criadores da ARKOS</h2>
        </div>
        <p className={styles.sectionIntro} style={{ textAlign: 'center', color: '#8A8F99', maxWidth: '600px', margin: '0 auto 40px auto' }}>Profissionais multidisciplinares unindo Ciência da Computação, Economia e Inteligência de Mercado.</p>

        <div className={styles.equipeGrid}>
          {/* Emanuel */}
          <div className={styles.equipeCard}>
            <div className={styles.equipeImageWrapper}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" alt="Emanuel Peixoto" className={styles.equipeImage} />
            </div>
            <div className={styles.equipeContent}>
              <h3 className={styles.equipeName}>Emanuel Peixoto</h3>
              <span className={styles.equipeRole}>Designer & Gestor de Marketing</span>
              <p className={styles.equipeBio}>Especialista em UI/UX e Estratégia de Marketing. Formado em Ciência da Computação, cria interfaces de dados de alta fidelidade ligadas à experiência do tomador de decisão.</p>
            </div>
          </div>

          {/* Gabriel */}
          <div className={styles.equipeCard}>
            <div className={styles.equipeImageWrapper}>
              <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=800&q=80" alt="Gabriel Mamede" className={styles.equipeImage} />
            </div>
            <div className={styles.equipeContent}>
              <h3 className={styles.equipeName}>Gabriel Mamede</h3>
              <span className={styles.equipeRole}>Desenvolvedor Full-Stack</span>
              <p className={styles.equipeBio}>Desenvolvedor de Software Full-Stack formado em Ciência da Computação. Atua na arquitetura de microsserviços seguros e pipelines de dados de alta performance.</p>
            </div>
          </div>

          {/* Lucas */}
          <div className={styles.equipeCard}>
            <div className={styles.equipeImageWrapper}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Lucas Batista" className={styles.equipeImage} />
            </div>
            <div className={styles.equipeContent}>
              <h3 className={styles.equipeName}>Lucas Batista</h3>
              <span className={styles.equipeRole}>Analista de Inteligência Artificial</span>
              <p className={styles.equipeBio}>Especialista em Processamento de Linguagem Natural (NLP) e algoritmos preditivos para negócios, gerando modelagens com Machine Learning.</p>
            </div>
          </div>

          {/* Renato */}
          <div className={styles.equipeCard}>
            <div className={styles.equipeImageWrapper}>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" alt="Renato Silva de Assis" className={styles.equipeImage} />
            </div>
            <div className={styles.equipeContent}>
              <h3 className={styles.equipeName}>Renato Silva de Assis</h3>
              <span className={styles.equipeRole}>Economista & Data Scientist</span>
              <p className={styles.equipeBio}>Economista e Cientista de Dados. Mestre em Economia com foco em econometria e inteligência de negócios. Desenvolve tomadas de decisões associadas às finanças corporativas.</p>
            </div>
          </div>

          {/* Williams */}
          <div className={styles.equipeCard}>
            <div className={styles.equipeImageWrapper}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" alt="Williams Calado" className={styles.equipeImage} />
            </div>
            <div className={styles.equipeContent}>
              <h3 className={styles.equipeName}>Williams Calado</h3>
              <span className={styles.equipeRole}>Desenvolvedor de Software</span>
              <p className={styles.equipeBio}>Desenvolvedor especialista em Integrações. Formado em Ciência da Computação, garante a robustez das APIs e integridade de governança do ecossistema.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. VANTAGEM COMPETITIVA ────────────────────────────── */}
      <section id="vantagem" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>DIFERENCIAL COMPETITIVO</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Por que a ARKOS é difícil de substituir</h2>
        </div>

        <div className={styles.vantagemGrid}>
          <div className={styles.compTable}>
            <div className={styles.compHeader}>
              <span>CONCORRENTE</span>
              <span>LIMITAÇÃO</span>
            </div>
            <div className={styles.compRow}>
              <span>Consultorias</span>
              <span style={{ color: '#8A8F99' }}>Têm estratégia, mas não têm produto escalável</span>
            </div>
            <div className={styles.compRow}>
              <span>BI Softwares</span>
              <span style={{ color: '#8A8F99' }}>Têm dados montados, mas não têm visões de negócio</span>
            </div>
            <div className={styles.compRow}>
              <span>ERPs / CRMs</span>
              <span style={{ color: '#8A8F99' }}>Têm inserção pontual, mas não têm analytics preditivo</span>
            </div>
          </div>

          <div className={styles.diffs}>
            <div className={styles.diffItem}>
              <div className={styles.diffBar}></div>
              <div>
                <div className={styles.diffTitle}>Não vendemos apenas Relatórios</div>
                <div className={styles.diffDesc}>Entregamos decisões fundamentadas em evidência — com recomendações acionáveis na rotina do tomador de decisão.</div>
              </div>
            </div>
            <div className={styles.diffItem}>
              <div className={styles.diffBar}></div>
              <div>
                <div className={styles.diffTitle}>Independência Estrutural</div>
                <div className={styles.diffDesc}>Ao contrário de outras soluções, nosso maior sucesso é quando o cliente não precisa mais de nós para entender seu negócio isoladamente.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. RESULTADOS ───────────────────────────────────────── */}
      <section className={styles.section} style={{ background: '#090a0c', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '40px' }}>Métricas de Ativação e Operações</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '32px', background: '#111318', borderRadius: '12px' }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#C8F542', marginBottom: '8px' }}>↓25%</div>
            <div style={{ fontSize: '0.688rem', fontFamily: 'monospace', color: '#8A8F99', textTransform: 'uppercase' }}>Redução de CAC</div>
          </div>
          <div style={{ padding: '32px', background: '#111318', borderRadius: '12px' }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#C8F542', marginBottom: '8px' }}>↑40%</div>
            <div style={{ fontSize: '0.688rem', fontFamily: 'monospace', color: '#8A8F99', textTransform: 'uppercase' }}>Eficiência Analítica</div>
          </div>
          <div style={{ padding: '32px', background: '#111318', borderRadius: '12px' }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#C8F542', marginBottom: '8px' }}>Horas</div>
            <div style={{ fontSize: '0.688rem', fontFamily: 'monospace', color: '#8A8F99', textTransform: 'uppercase' }}>Tempo de Decisão</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER MEGA ────────────────────────────────────────── */}
      <footer className={styles.footerMega}>
        <div className={styles.footerGrid}>
          
          <div className={styles.footerCol}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: '24px' }} />
            </div>
            <p style={{ lineHeight: '1.6', maxWidth: '240px' }}>A infraestrutura de inteligência da nova economia. Data · Intelligence · Decision.</p>
          </div>

          <div className={styles.footerCol}>
            <h4>Sistemas</h4>
            <Link href="#modulos">Marketing Intelligence</Link>
            <Link href="#modulos">Arkos Data Base</Link>
            <Link href="#modulos">Arkos Operations</Link>
            <Link href="#modulos">Arkos Academy</Link>
          </div>

          <div className={styles.footerCol}>
            <h4>Fale Conosco</h4>
            <p style={{ color: '#F4F2ED' }}>contato@arkos.com</p>
            <p style={{ color: '#F4F2ED' }}>+55 (83) 98195-7737</p>
          </div>

          <div className={styles.footerCol}>
            <h4>Localização</h4>
            <p style={{ lineHeight: '1.5' }}>Avenida João Machado, 849, Sala 801<br />Centro, João Pessoa - PB<br />CEP: 58013-522</p>
          </div>

        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '30px', textAlign: 'center', fontSize: '11px', color: '#5A5F6A', marginTop: '60px', fontFamily: 'monospace' }}>
          &copy; {new Date().getFullYear()} ARKOS Intelligence. A Infraestrutura da Nova Economia Empresarial.
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAVBAR ────────────────────────────────── */}
      <nav className={styles.mobileNavbar}>
        <Link href="#" className={styles.navItem}><HomeIcon size={20} /><span>Início</span></Link>
        <Link href="#fluxo" className={styles.navItem}><TrendingUp size={20} /><span>Maturidade</span></Link>
        <Link href="https://wa.me/5583981957737" target="_blank" className={styles.navItem} style={{ color: '#C8F542' }}><MessageCircle size={20} /><span>Consultor</span></Link>
      </nav>

    </div>
  )
}
