'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, Sparkles, MessageCircle, Home as HomeIcon, TrendingUp, Eye, Cpu, Shield, Users } from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  
  const handleVideoTimeUpdate = () => {
    if (!heroVideoRef.current) return;
    const { currentTime, duration } = heroVideoRef.current;
    // Fade out 1.2s before the end, keep faded for the first 0.5s to hide abrupt jump
    if (duration > 0 && (duration - currentTime < 1.0 || currentTime < 0.5)) {
      heroVideoRef.current.style.opacity = '0';
    } else {
      heroVideoRef.current.style.opacity = '1';
    }
  };

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
              <Link href="/institucional/o-que-e" className={styles.dropdownItem}>O que é a Arkos</Link>
              <Link href="/institucional/quem-somos" className={styles.dropdownItem}>Quem somos</Link>
              <Link href="/institucional/equipe" className={styles.dropdownItem}>Conheça nossa equipe</Link>
              <Link href="/institucional/nosso-negocio" className={styles.dropdownItem}>Nosso negócio</Link>
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
        
        {/* Background Video */}
        <div className={styles.heroVideoBg}>
          {/* Instrução: Faça o upload do vídeo final no formato .mp4 com o nome hero-main-arkos.mp4 para a pasta /public */}
          <video 
            ref={heroVideoRef}
            onTimeUpdate={handleVideoTimeUpdate}
            autoPlay loop muted defaultMuted playsInline 
            className={styles.heroVideoElement}
          >
            <source src="/hero-main-arkos.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroVideoOverlay}></div>
        </div>

        {/* Foreground Content */}
        <div className={styles.heroContentWrapper}>
          <div className={styles.heroTag} style={{ background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.12)', color: '#C8F542' }}>
            <Sparkles size={12} />
            <span>Infraestrutura de Inteligência</span>
          </div>

          <h1 className={styles.heroH1Adapta}>
            A Infraestrutura de <br />
            <span style={{ color: '#C8F542', fontStyle: 'italic' }}>Inteligência</span> da nova economia, aliada a ciências de dados para negócios.
          </h1>

          <p className={styles.heroPAdapta}>
            Do dado bruto à decisão executiva. A ARKOS conecta sistemas, dados, analytics e gestão em uma única arquitetura operacional.
          </p>
          
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
        </div>
      </section>

      <div className={styles.logobar}>
        <p style={{ fontSize: '0.75rem', color: '#8A8F99', marginBottom: '2rem', textAlign: 'center', fontFamily: 'monospace', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>TECNOLOGIA COMPATÍVEL AOS ECOSSISTEMAS DE</p>
        
        <div className={styles.logobarInner}>
          {Array(2).fill([
            { name: 'MICROSOFT', weight: 800, size: '1.25rem' },
            { name: 'SALESFORCE', weight: 800, size: '1.2rem', ls: '1px' },
            { name: 'SAP', weight: 900, size: '1.4rem', ls: '2px' },
            { name: 'ORACLE', weight: 700, size: '1.3rem', ls: '2px' },
            { name: 'IBM', weight: 900, size: '1.5rem', ls: '3px', font: 'serif' },
            { name: 'NVIDIA', weight: 800, size: '1.25rem', ls: '2px' },
            { name: 'AMAZON AWS', weight: 700, size: '1.1rem', ls: '1px' },
            { name: 'GOOGLE CLOUD', weight: 600, size: '1.1rem', ls: '1px' },
            { name: 'CISCO', weight: 800, size: '1.3rem', ls: '2px' },
            { name: 'INTEL', weight: 900, size: '1.4rem', ls: '1px' },
          ]).flat().map((company, idx) => (
            <div key={idx} className={styles.logoItem}>
              <span style={{ 
                fontWeight: company.weight, 
                fontSize: company.size, 
                letterSpacing: company.ls || '0px', 
                fontFamily: company.font || 'sans-serif' 
              }}>
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. O PROBLEMA ───────────────────────────────────────── */}
      <section id="problema" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>O PROBLEMA</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Por que as empresas perdem clareza</h2>
        </div>
        <p className={styles.sectionIntro}>3 dores estruturais que se repetem em todo negócio, independente do porte ou segmento.</p>

        <div className={styles.doresGrid}>
          <div className={styles.dorCard}>
            <span className={styles.dorNum}>01</span>
            <h3 className={styles.dorTitle}>Informação Fragmentada</h3>
            <p className={styles.dorBody}>Dados espalhados em planilhas, ERPs, CRMs e ferramentas digitais sem conexão entre si. A empresa enxerga pedaços do problema, nunca o todo.</p>
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
        
        <div className={styles.solucaoHero}>
          {/* Left: Arch Video Thumbnail */}
          <div className={styles.videoArchWrapper}>
            <div className={styles.videoArchContainer}>
              {/* O vídeo deve ser adicionado na pasta public/ com o nome "hero-arkos-video.mp4" */}
              <video 
                autoPlay loop muted defaultMuted playsInline 
                className={styles.videoPlayer}
                poster="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
              >
                <source src="/hero-arkos-video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.videoBtmBadge}>
              <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Sua operação movida a</span> Inteligência Estrutural <span style={{ color: '#C8F542' }}>&rarr;</span>
            </div>
          </div>

          {/* Right: Differentiators Accordion */}
          <div>
            <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px' }}>O QUE NOS DIFERENCIA</div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '20px', lineHeight: '1.3' }}>Não vendemos software. Vendemos infraestrutura.</h3>
            <p style={{ color: '#8A8F99', fontSize: '0.938rem', lineHeight: '1.8', marginBottom: '32px' }}>A vantagem real não está na simples tecnologia, está na cultura, nos dados proprietários e na capacidade educacional integrada às regras de negócio da empresa. O homem, chamado a analisar dados de excelência, não nasce pronto.</p>
            
            <div className={styles.accList}>
              <div className={styles.accItem}>
                <div className={styles.accHeader}>
                  <div className={styles.accTitleBlock}>
                    <Shield size={20} color="#C8F542" />
                    <span className={styles.accTitle}>Operação Analítica de Alto Nível</span>
                  </div>
                  <span style={{ color: '#8A8F99' }}>+</span>
                </div>
                <div className={styles.accText}>
                  Operamos em analytics avançado, conectando referências para todo o conhecimento executivo da corporação. Menos de 5% das empresas cruzam bases com esse grau de assertividade em tempo real sem ficarem alienadas das suas metas logísticas reais.
                </div>
              </div>

              <div className={styles.accItem}>
                <div className={styles.accHeader}>
                  <div className={styles.accTitleBlock}>
                    <Users size={20} color="#C8F542" />
                    <span className={styles.accTitle}>Letramento Nativo de Equipe</span>
                  </div>
                  <span style={{ color: '#8A8F99' }}>+</span>
                </div>
                <div className={styles.accText}>
                  Modelos preditivos instalados, letramento nativo ativado. Sua equipe de diretoria passa a decidir com autonomia de longo prazo, examinando ideias e evidências baseadas em regressões de inteligência corporativa, tornando a liderança apta a extrair a rentabilidade que a empresa demanda de forma autossustentável.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Layers Horizontal Grid */}
        <div className={styles.camadasHorizontal}>
          <div className={styles.camadaH}>
            <div className={styles.camadaTag}>Camada 1</div>
            <div className={styles.camadaName}>Fontes de Dados</div>
            <div className={styles.camadaDesc}>ERP, CRM, financeiro, marketing, planilhas e dados externos conectados passivamente de forma segura.</div>
          </div>
          <div className={styles.camadaH}>
            <div className={styles.camadaTag}>Camada 2</div>
            <div className={styles.camadaName}>Data Lake Node</div>
            <div className={styles.camadaDesc}>Pipelines, ETL e modelagem unificada que limpa os dados brutos injetando regras de negócios e compliance.</div>
          </div>
          <div className={styles.camadaH}>
            <div className={styles.camadaTag}>Camada 3</div>
            <div className={styles.camadaName}>Analytics Estruturado</div>
            <div className={styles.camadaDesc}>Processamento analítico que gera correlações, constrói modelagem econométrica fiel e segmentações de machine learning.</div>
          </div>
          <div className={styles.camadaH}>
            <div className={styles.camadaTag}>Camada 4</div>
            <div className={styles.camadaName}>Inteligência Ativa</div>
            <div className={styles.camadaDesc}>Avisos, interações do Copiloto Executivo em texto natural, alertas dinâmicos pre-configurados nos painéis de ativação.</div>
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
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" alt="Emanuel Peixoto" className={styles.equipeImage} />
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
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" alt="Gabriel Mamede" className={styles.equipeImage} />
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
              <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80" alt="Lucas Batista" className={styles.equipeImage} />
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
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Renato Silva de Assis" className={styles.equipeImage} />
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
              <img src="https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80" alt="Williams Calado" className={styles.equipeImage} />
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

          <div className={styles.compMegaTable}>
            <div className={styles.compMegaHeader}>
              <div className={styles.compMegaCol}>CENÁRIO TRADICIONAL (CONCORRENTES)</div>
              <div className={styles.compMegaCol}>A LIMITAÇÃO</div>
              <div className={styles.compMegaColArkos}><Sparkles size={14} /> NA ARKOS (NOVA ECONOMIA)</div>
            </div>
            
            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Consultorias de Gestão Clássicas</div>
              <div className={styles.compMegaLimit}>Desenham estratégias excelentes no papel, mas não possuem um produto de tecnologia escalável que aplique a tese no dia a dia da empresa de forma orgânica.</div>
              <div className={styles.compMegaArkos}>Produto SaaS embarcado com estratégia. Nós modelamos as regras de negócio e a própria infraestrutura corporativa roda e evolui 24/7 de forma algorítmica.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Softwares de BI (PowerBI, Tableau)</div>
              <div className={styles.compMegaLimit}>Exibem gráficos complexos, mas exigem analistas caros para interpretar continuamente. Eles não dizem o que o gestor deve fazer, apenas o que já passou.</div>
              <div className={styles.compMegaArkos}>Analytics Prescritivo. Nossos agentes de IA cruzam dados de todas as áreas simultaneamente e inferem as variáveis, recomendando a próxima ação tática para o líder.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>ERPs Tradicionais</div>
              <div className={styles.compMegaLimit}>São essenciais para emitir notas fiscais e contabilidade fiscal, mas não foram arquitetados com estatística avançada para modelar cenários.</div>
              <div className={styles.compMegaArkos}>Agregadores de ecossistema. Consumimos a base passiva do seu ERP via APIs e injetamos uma inteligência ativa que simula sua operação e prevê rupturas de caixa.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Plataformas de CRM Isoladas</div>
              <div className={styles.compMegaLimit}>Focam restritivamente na aquisição de vendas, funcionando como silos míopes: não conhecem o limite de orçamento do marketing nem as amarras logísticas do estoque.</div>
              <div className={styles.compMegaArkos}>Visibilidade correlacional. O módulo de funil comercial Arkos simula automaticamente o respectivo impacto sobre os suprimentos e capacidade de entrega futura.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Agências de Marketing (Growth)</div>
              <div className={styles.compMegaLimit}>Perseguem métricas superficiais (Cliques, Leads) e inflacionam campanhas sem o vínculo irrestrito à rentabilidade real ou Lifetime Value (LTV) da organização.</div>
              <div className={styles.compMegaArkos}>Marketing Intelligence de Fato. Os algoritmos bloqueiam ou aceleram canais de aquisição se a matemática do negócio demonstrar viabilidade real final.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Sistemas de Jurídico & CLM</div>
              <div className={styles.compMegaLimit}>Comportam-se como pastas de rede glorificadas. Apenas guardam PDFs ou requerem edição massiva em templates engessados com pouca validade negocial inteligente.</div>
              <div className={styles.compMegaArkos}>Smart Contracts integrados aos negócios. Os documentos são nutridos estruturalmente pelo banco de dados: variáveis ajustam valores e enviam alertas sobre reajustes indexadores automaticamente.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Serviços de Analytics & AI</div>
              <div className={styles.compMegaLimit}>Fabricam algoritmos 'caixa-preta' puramente estatística sem compreender a teoria econômica que rege os mercados dos seus clientes — e a diretoria ignora e abandona a tecnologia.</div>
              <div className={styles.compMegaArkos}>Construído por analistas econômicos. Nossos tensores levam em conta as premissas econométricas reais do mercado antes de realizar regressões ingênuas.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>LMS & Plataformas EaD</div>
              <div className={styles.compMegaLimit}>Alugam a prateleira virtual. Entregam vídeoclass para o aluno e um diploma, incapazes de ler o envolvimento preditivo dos alunos frente à sua evasão (Churn).</div>
              <div className={styles.compMegaArkos}>Arkos Academy White Label. Monitoramos telemetria em tempo-real para prever alunos em risco nos 30 dias que antecedem a matrícula e avaliamos a formação interna dos seus funcionários.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>SaaS Genéricos (Sistemas Comuns)</div>
              <div className={styles.compMegaLimit}>Focam no baixo custo padronizando as regras e forçando todas as empresas do Brasil a perderem sua vantagem competitiva para se adaptar a eles.</div>
              <div className={styles.compMegaArkos}>Modelagem Customizada Data Lake Node. Fundamos uma arquitetura Enterprise-Grade extremamente sólida, porém infinitamente moldável por nós ao diferencial peculiar de cada cliente.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Pequenas Startups Fragmentadas</div>
              <div className={styles.compMegaLimit}>Resolvem nichos microscópicos isolados gerando 'app fatigue' na empresa, onde o CEO precisa usar 12 programas diferentes para rodar o negócio diário.</div>
              <div className={styles.compMegaArkos}>O "Operating System" Corporativo. Desenhamos a Arkos para engolir gradualmente as demandas complexas e cruciais dentro de uma única suíte premium auditada.</div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── 7. RESULTADOS ───────────────────────────────────────── */}
      <section className={styles.section} style={{ background: '#090a0c', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '16px' }}>Impacto Projetado na Operação</h2>
        <p style={{ color: '#8A8F99', fontSize: '1rem', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px auto' }}>Métricas médias de rentabilidade e eficiência entregues na jornada das empresas que adotam a infraestrutura ARKOS.</p>
        
        <div className={styles.resultadosGridMetrics}>
          
          <div className={styles.metricCard}>
            <div className={styles.metricBig}>↓ 25%</div>
            <div className={styles.metricTitle}>Redução de CAC</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Otimização direta do Custo de Aquisição de Clientes, bloqueando investimentos sem ROI.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>↑ 40%</div>
            <div className={styles.metricTitle}>Eficiência Analítica</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Fim do trabalho manual. O RH e Financeiro focam em aprovar estratégias em vez de montar planilhas.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>8h → 3s</div>
            <div className={styles.metricTitle}>Aceleração de Resposta</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> O tempo necessário para a diretoria compilar vendas vs. a resposta no painel inteligenteizado.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>↑ 30%</div>
            <div className={styles.metricTitle}>Crescimento de LTV</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Algoritmos predizem produtos que o cliente quer comprar e notificam o comercial.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>99,9%</div>
            <div className={styles.metricTitle}>Precisão Operacional</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Fim dos cálculos errados, contratos defasados não reajustados pela inflação.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>↓ 18%</div>
            <div className={styles.metricTitle}>Redução de Opex</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Redução nas despesas operacionais devido à consolidação de ferramentas de software em um hub.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>360°</div>
            <div className={styles.metricTitle}>Abolição de Silos</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Financeiro e Marketing lendo a mesma fonte. O fim dos "meus dados vs. os seus dados".</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>D-0</div>
            <div className={styles.metricTitle}>Preditibilidade Caixa</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Modulação antecipada (predictive cashflow). O sistema simula calotes antes de ocorrerem.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>- 45%</div>
            <div className={styles.metricTitle}>Mitigação de Churn</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Identifica a probabilidade de um aluno evangelho evadir 60 dias antes dele deixar de pagar a mensalidade.</p>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricBig}>100%</div>
            <div className={styles.metricTitle}>Autonomia Capital</div>
            <p className={styles.metricDesc}><strong>O que representa:</strong> Letramento do time e posse total. A inteligência fica retida para a empresa, sem depender de consultorias.</p>
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
            <h4>Ecossistema Hub</h4>
            <Link href="#modulos">Arkos C-Level (Operação Diária)</Link>
            <Link href="#modulos">Arkos Data Lake Node (Datalake Próprio)</Link>
            <Link href="#modulos">Arkos Growth Intelligence</Link>
            <Link href="#modulos">Arkos Smart Contracts</Link>
            <Link href="#modulos">Arkos Financial Intelligence</Link>
            <Link href="#modulos">Arkos CRM / Pipeline</Link>
            <Link href="#modulos">Arkos RH / Performance</Link>
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
