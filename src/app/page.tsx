'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, MessageCircle, Home as HomeIcon, TrendingUp, Eye, Cpu, Shield, Users, Menu, X, LogIn, Grid, CheckCircle2, Cloud, Video, Globe, Handshake, Workflow, Calendar, Layout as LayoutIcon } from 'lucide-react'
import DiagnosticoHub from '@/components/DiagnosticoHub'
import CompetidoresSeccion from '@/components/CompetidoresSeccion'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<0|1|2>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const solucaoVideoRef = useRef<HTMLVideoElement>(null);

  // 1. Initial Mount: Setup persistent interaction listeners & prime initial videos
  useEffect(() => {
    const handleInteraction = () => {
      // Aggressively attempt to play ALL videos on any interaction
      videoRefs.forEach(ref => {
        if (ref.current && ref.current.paused) {
          ref.current.play().catch(() => {});
        }
      });
      if (solucaoVideoRef.current && solucaoVideoRef.current.paused) {
        solucaoVideoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('touchstart', handleInteraction, { passive: true, once: false });
    document.addEventListener('click', handleInteraction, { once: false });
    window.addEventListener('scroll', handleInteraction, { passive: true });

    // Initial check for refs with high frequency
    let retryCount = 0;
    const checkRefs = setInterval(() => {
      retryCount++;
      const videos = videoRefs.map(r => r.current).filter(Boolean);
      if (videos.length === 3 || retryCount > 50) {
        clearInterval(checkRefs);
        if (videos[0]) (videos[0] as HTMLVideoElement).play().catch(() => {});
      }
    }, 200);

    return () => {
      clearInterval(checkRefs);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Slider Logic: Single timer synchronized with current state
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = ((activeVideo + 1) % 3) as 0|1|2;
      const nextVideo = videoRefs[nextIdx].current;
      
      if (nextVideo) {
        // Prepare next video
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {
          // If play fails, it will attempt again on the next user interaction
        });
      }
      setActiveVideo(nextIdx);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeVideo]);

  const mobileNavbar = (
    <nav className={styles.mobileNavbar}>
      <Link href="#" className={styles.navItem}>
        <HomeIcon size={20} strokeWidth={1.5} />
      </Link>
      <Link href="#solucao" className={styles.navItem}>
        <CheckCircle2 size={20} strokeWidth={1.5} />
      </Link>
      
      {/* Central Primary Action */}
      <Link href="#diagnostico" className={`${styles.navItem} ${styles.navItemPrimary}`}>
        <LayoutIcon size={24} strokeWidth={2} />
      </Link>
      
      <Link href="#aplicativos" className={styles.navItem}>
        <Grid size={20} strokeWidth={1.5} />
      </Link>
      <Link href="/login" className={styles.navItem}>
        <LogIn size={20} strokeWidth={1.5} style={{ color: '#C8F542' }} />
      </Link>
    </nav>
  );

  return (
    <div className={styles.page}>
      
      {/* ── BACKGROUNDS E DECORATIONS ─────────────────────────── */}
      <div className={styles.meshBg}></div>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        {/* Botão Hambúrguer para Mobile */}
        <button className={styles.burgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
        </button>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : styles.hideOnMobile}`} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.813rem', color: '#FFFFFF' }}>
          {/* Dropdown Institucional */}
          <div className={styles.navLinkDropdown} style={{ transition: 'color 0.2s', color: 'inherit' }}>
            <span style={{ cursor: 'pointer' }}>Institucional</span>
            <div className={styles.dropdownMenu}>
              <Link href="/institucional/o-que-e" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>O que é a Arkos</Link>
              <Link href="/institucional/o-problema" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>O Problema</Link>
              <Link href="/institucional/a-solucao" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>A Solução</Link>
              <Link href="/institucional/o-ecossistema" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>O Ecossistema</Link>
              <Link href="/institucional/o-hub-arkos" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>Hub Arkos</Link>
              <Link href="/institucional/equipe" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>Conheça nossa equipe</Link>
            </div>
          </div>

          <Link href="#benchmarks" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}><span>Benchmarks</span></Link>
          <Link href="/institucional/diferencial" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}><span>Diferenciais</span></Link>
          <Link href="/diagnostico" target="_blank" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}><span>Diagnóstico</span></Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/login">
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
        
        <div className={styles.heroVideoBg}>
          <video
            ref={videoRefs[0]}
            autoPlay muted playsInline loop
            className={styles.heroVideoElement}
            poster="/arkos_growth_acceleration_hero_v1_1774542610685.png"
            style={{ 
              opacity: activeVideo === 0 ? 1 : 0, 
              transition: 'opacity 1.5s ease-in-out', 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' 
            }}
          >
            <source src="/hero-main-arkos.mp4" type="video/mp4" />
          </video>
          <video
            ref={videoRefs[1]}
            autoPlay muted playsInline loop
            className={styles.heroVideoElement}
            poster="/arkos_marketing_intelligence_hero_v1_1774542591336.png"
            style={{ 
              opacity: activeVideo === 1 ? 1 : 0, 
              transition: 'opacity 1.5s ease-in-out', 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' 
            }}
          >
            <source src="/hero-secondary-arkos.mp4" type="video/mp4" />
          </video>
          <video
            ref={videoRefs[2]}
            autoPlay muted playsInline loop
            className={styles.heroVideoElement}
            poster="/arkos_hub_dashboard_interface_1775141882974.png"
            style={{ 
              opacity: activeVideo === 2 ? 1 : 0, 
              transition: 'opacity 1.5s ease-in-out', 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' 
            }}
          >
            <source src="/hero-arkos-video.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroVideoOverlay}></div>
        </div>

        {/* Foreground Content */}
        <motion.div 
          className={styles.heroContentWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className={styles.heroTag} 
            style={{ background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.12)', color: '#C8F542' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles size={12} />
            <span>Infraestrutura de Inteligência</span>
          </motion.div>
          
          <motion.h1 
            className={styles.heroH1Adapta}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            A Infraestrutura de <br />
            <span style={{ color: '#C8F542', fontStyle: 'italic' }}>Inteligência</span> da nova economia, aliada a ciências de dados para negócios.
          </motion.h1>

          <motion.p 
            className={styles.heroPAdapta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Do dado bruto à decisão executiva. A ARKOS conecta sistemas, dados, analytics e gestão em uma única arquitetura operacional.
          </motion.p>
          
          <motion.div 
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px', zIndex: 10, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link href="#diagnostico">
              <button className={styles.btnPrimary} style={{ padding: '14px 28px' }}>
                <span>Diagnóstico Gratuito</span>
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="#solucao" className={styles.hideOnMobile}>
              <button className={styles.btnSecondary} style={{ padding: '14px 28px' }}>
                <span>Ver Como Funciona</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>



      <div className={styles.logobar}>
        <p className={styles.logobarTitle}>TECNOLOGIA COMPATÍVEL AOS ECOSSISTEMAS DE</p>
        
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

      {/* ── DIAGNÓSTICO HUB ── */}
      <section id="diagnostico">
        <DiagnosticoHub />
      </section>

      {/* ── COMPETIDORES ANALÍTICOS ── */}
      <CompetidoresSeccion />

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
                ref={solucaoVideoRef}
                autoPlay loop muted playsInline 
                className={styles.videoPlayer}
                src="/hero-main-arkos.mp4"
                poster="/maturity_level5_vibrant_1774438346831.png"
              />
            </div>
            <div className={styles.videoBtmBadge}>
              <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Sua operação movida a</span> Inteligência Estrutural <span style={{ color: '#C8F542' }}>→</span>
            </div>
          </div>

          {/* Right: Differentiators Accordion */}
          <div>
            <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '12px' }}>A ARKOS É SUA SOLUÇÃO</div>
            <p style={{ color: '#F4F2ED', fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Sora, sans-serif' }}>Para escalar sua empresa ao patamar das gigantes analíticas, a <strong>ARKOS</strong> atua como a espinha dorsal da sua inteligência corporativa.</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '20px', lineHeight: '1.3' }}>Não vendemos software. Vendemos <em style={{ color: '#C8F542', fontStyle: 'italic' }}>infraestrutura e inteligência.</em></h3>
            <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>Nossa diferenciacão não está em uma licença de ferramenta. Estão na arquitetura de dados que construímos, na inteligência que treinamos sobre os seus processos e na capacidade analítica que formamos dentro do seu time.</p>
            
            <div className={styles.accList}>
              <div className={styles.accItem}>
                <div className={styles.accHeader}>
                  <div className={styles.accTitleBlock}>
                    <Shield size={22} color="#C8F542" />
                    <span className={styles.accTitle} style={{ fontSize: '1.15rem' }}>Operação Analítica de Alto Nível</span>
                  </div>
                  <span style={{ color: '#8A8F99' }}>+</span>
                </div>
                <div className={styles.accText} style={{ fontSize: '0.925rem' }}>
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

      {/* ── 3. ECOSSISTEMA MÓDULOS ─────────────────────────────────────────── */}
      <section id="modulos" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>A INFRAESTRUTURA COMPLETA</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Plataformas Modulares ARKOS</h2>
        </div>

        <div className={styles.modulosGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { tag: 'MI', color: '#FF4D4D', sub: 'ENTRADA VISUAL E DECISÓRIA', title: 'Marketing Intelligence', desc: 'O marketing atua como gerador supremo de dados decisórios. Operamos desde o digital analítico até a inteligência profunda: pesquisas de mercado, NPS, testes de lançamentos e análise de sentimento.' },
            { tag: 'GDB', color: '#EC4899', sub: 'GOVERNANÇA DE ATIVOS DIGITAIS', title: 'Governança de Dados e BI', desc: 'Data warehouse, pipelines conectadas e dashboards preditivos de alta performance para a tomada de decisão baseada em números reais.' },
            { tag: 'CRM', color: '#3B82F6', sub: 'RELAÇÕES COMERCIAIS', title: 'Gestão Comercial (CRM)', desc: 'Otimize o funil de vendas, propostas comerciais e conversões estratégicas em tempo real, permitindo previsões de caixa assertivas.' },
            { tag: 'CLM', color: '#C8F542', sub: 'ESPINHA DORSAL ADMINISTRATIVA', title: 'Gestão de Contratos (CLM)', desc: 'Centraliza a espinha dorsal financeira e física do negócio: faturamento, fardamento, contratos e histórico acadêmico.' },
            { tag: 'ATI', color: '#8B5CF6', sub: 'ALOCAÇÃO ESTRATÉGICA', title: 'Arkos Talent Intelligence', desc: 'Redesenho organizacional via NLP e Otimização Matemática. Transforma relatos funcionais em evidência objetiva para estruturação de cargos e processos.' },
            { tag: 'AIA', color: '#F472B6', sub: 'SISTEMAS AUTÔNOMOS', title: 'Agentes de IA e Automação', desc: 'Agentes autônomos treinados com as regras do seu negócio para resolver chamados e automatizar fluxos complexos.' },
            { tag: 'CCI', color: '#F43F5E', sub: 'ECONOMIA DIGITAL', title: 'Central de Comércio Inteligente', desc: 'Motor financeiro robusto B2B integrado à gestão para e-commerce, recorrência, subscrições de produtos e faturamento agnóstico.' },
            { tag: 'ACG', color: '#2DD4BF', sub: 'TRAÇÃO DE MERCADO', title: 'Aceleração de Crescimento (Growth)', desc: 'Squads avançados operando tráfego pago escalável, ROI preditivo e SEO técnico para empresas que precisam de escala acelerada.' },
            { tag: 'PEC', color: '#F59E0B', sub: 'MODELAGEM DE FUTURO', title: 'Planejamento Estratégico e Cenários', desc: 'Formulação completa e acompanhamento de planos estratégicos dinâmicos. Orientamos desde a identidade organizacional até a operação tática.' },
            { tag: 'EDT', color: '#EF4444', sub: 'LETRAMENTO E CAPACITAÇÃO', title: 'Edtech Academy', desc: 'Plataforma LMS completa para letramento digital da equipe e capacitação preditiva. Acoplamos todo o ecossistema para elevar a eficiência.' },
            { tag: 'GTC', color: '#14B8A6', sub: 'GESTAO TECNOLÓGICA E CYBER', title: 'Gestão de Tecnologia e Cyber', desc: 'Monitoramento de infraestrutura, segurança de servidores e otimização de redes. Atuamos como seu braço direito de TI.' },
            { tag: 'GSD', color: '#06B6D4', sub: 'GOVERNANÇA DE SERVIÇOS', title: 'Governança de Service Desk e Demandas', desc: 'Controle centralizado de chamados e fluxos de atendimento escaláveis com foco em eficiência operacional e suporte inteligente.' },
          ].map((m, i) => (
            <div key={i} className={styles.moduloCard}>
              <div className={styles.moduloHeader}>
                <div className={styles.moduloSub}>{m.sub}</div>
                <div className={styles.moduloTag} style={{ background: m.color }}>{m.tag}</div>
              </div>
              <h3 className={styles.moduloTitle}>{m.title}</h3>
              <p className={styles.moduloDesc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. APLICATIVOS (HUB) ─────────────────────────────────────────── */}
      <section id="aplicativos" className={styles.section} style={{ background: '#0a0c10', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', padding: '6px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', color: '#FFF', fontSize: '0.75rem', fontWeight: '700', gap: '6px', alignItems: 'center', margin: '0 auto 12px auto' }}>HUB DE RECURSOS</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', letterSpacing: '-0.03em' }}>Ferramentas nativas prontas<br />para a sua rotina executiva.</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { tag: 'Arkos Cloud', icon: Cloud, desc: 'Armazenamento interno seguro como "Drive" para salvar, classificar e auditar entregáveis da sua empresa.', title: 'Bancos de Arquivos' },
            { tag: 'Arkos Rooms', icon: Video, desc: 'Aplicativo interno para salas de reunião remotas com mecanismo que transcreve falas automaticamente via Inteligência Artificial e gera atas em PDFs.', title: 'Reuniões Remotas' },
            { tag: 'Arkos LiveTranslate', icon: Globe, desc: 'Tradutor instantâneo e robusto embarcado para calls, acompanhando a prospecção da empresa globalmente de forma nativa e confidencial.', title: 'Call Translator' },
            { tag: 'Arkos Connect', icon: Handshake, desc: 'Rede social interna fechada da companhia para compartilhamento de informações confidenciais, boletins, murais de avisos e rituais de times', title: 'Feed Corporativo Gamificado' },
            { tag: 'Arkos Flow', icon: Workflow, desc: 'Gestão ágil de projetos com Scrum e Kanban nativos. Cada área da empresa gerencia suas ações, tarefas e entregas em painéis visuais. O gestor acompanha o andamento de cada setor em tempo real, garantindo execução disciplinada das metas estratégicas.', title: 'Projetos e Processos' },
            { tag: 'Arkos Smart Booking', icon: Calendar, desc: 'Links de reunião e formulários de prospecção autônomos por sistema web que despacham lembretes e agendamentos pelo WhatsApp automaticamente.', title: 'Agendamentos Inteligentes' },
          ].map((app, idx) => {
            const Icon = app.icon;
            return (
              <div key={idx} style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.03)', padding: '32px', borderRadius: '12px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <Icon size={28} color="#C8F542" />
                </div>
                <h4 style={{ color: '#F4F2ED', fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>{app.tag}</h4>
                <p style={{ color: '#8A8F99', fontSize: '0.9rem', lineHeight: '1.6' }}>{app.desc}</p>
              </div>
            )
          })}
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
                <p>O que vai acontecer? Projete comportamentos e cenários futuros em <strong>todas as áreas da empresa</strong> (comercial, operacional, financeira). Antecipe tendências, riscos de churn e gargalos produtivos cruzando dados <strong>estruturados e não-estruturados</strong> através de técnicas de aprendizagem de máquina (Machine Learning) supervisionadas e não-supervisionadas aplicadas sob medida.</p>
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

      {/* ── 6. EQUIPE (CREATORS) ────────────────────────────────── */}
      <section id="equipe" className={styles.section} style={{ background: '#090a0c' }}>
        <div className={styles.sectionHeader}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>IDEALIZADOR & FOUNDER</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>A mente por trás da Arkos</h2>
        </div>
        <p className={styles.sectionIntro} style={{ textAlign: 'center', color: '#8A8F99', maxWidth: '600px', margin: '0 auto 48px auto' }}>Economista, cientista de dados e estrategista. A visão que une análise econômica, governança de dados e inteligência artificial para transformar a gestão corporativa.</p>

        {/* Single Founder — Wide Card */}
        <div className={styles.founderCard}>
          {/* Foto (Mobile Side-by-Side Wrapper) */}
          <div className={styles.founderHeader}>
            <div className={styles.founderImageWrapper}>
              {/* Badge visual similar ao solicitado */}
              <div className={styles.founderBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Conheça-nos
              </div>
              <img
                src="/renato_assis_co.jpg"
                alt="Renato Silva de Assis"
                className={styles.founderPhoto}
              />
              <div className={styles.founderImageOverlay} />
            </div>

            <div className={styles.founderNameBlock}>
              <h3 className={styles.founderName}>
                Renato Silva <span style={{ color: '#C8F542' }}>de Assis</span>
              </h3>
              <div className={styles.founderTitle}>
                Idealizador &amp; Founder · Economista · Cientista de Dados
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className={styles.founderBio}>
            <p className={styles.founderText}>
              Economista (UFPB), Mestre em Economia Regional (UFRN) e bacharel em Ciências de Dados para Negócios. Com <strong style={{ color: '#F4F2ED' }}>mais de 16 anos como supervisor técnico do DIEESE</strong> (PB e RN), especializou-se em análise de mercado de trabalho, conjuntura econômica e pesquisa socioeconômica de alta complexidade. Fundador da Econsult — consultoria de planejamento estratégico, gestão financeira e perícia contábil. Atualmente gerente de sistema no Cidade Viva Education e professor de pós-graduação na FICV. Criou a Arkos Intelligence para transformar décadas de expertise analítica em infraestrutura tecnológica de alto impacto para o C-Level.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['SPSS', 'Stata', 'R', 'Python', 'SQL', 'Power BI', 'IA Generativa'].map((t, i) => (
                <span key={i} style={{ padding: '4px 10px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.15)', borderRadius: '5px', fontSize: '0.7rem', color: '#C8F542', fontFamily: 'monospace' }}>{t}</span>
              ))}
            </div>

            <div style={{ padding: '16px 20px', background: 'rgba(200,245,66,0.03)', borderRadius: '10px', borderLeft: '3px solid #C8F542' }}>
              <p style={{ color: '#F4F2ED', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                "Construir processos <strong style={{ color: '#C8F542' }}>com pessoas e para pessoas</strong>. A tecnologia precisa gerar impacto de escala e melhorar o bem-estar dos times."
              </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.1em', marginBottom: '4px' }}>FORMAÇÃO</div>
                <div style={{ color: '#F4F2ED', fontSize: '0.78rem' }}>UFPB · UFRN · FICV</div>
              </div>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.1em', marginBottom: '4px' }}>ORIGEM</div>
                <div style={{ color: '#F4F2ED', fontSize: '0.78rem' }}>João Pessoa, PB</div>
              </div>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.1em', marginBottom: '4px' }}>EXPERIÊNCIA</div>
                <div style={{ color: '#F4F2ED', fontSize: '0.78rem' }}>+16 anos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. VANTAGEM COMPETITIVA ────────────────────────────── */}
      <section id="vantagem" className={styles.section}>
        <div className={styles.sectionHeader} style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>DIFERENCIAL COMPETITIVO</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED' }}>Por que a ARKOS é a escolha estratégica definitiva</h2>
        </div>

        {/* --- TEXTO DE APRESENTAÇÃO ARKOS PARA EMPRESAS MENOS MADURAS --- */}
        <div style={{ background: '#111318', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', maxWidth: '800px', margin: '0 auto 40px auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '16px', lineHeight: '1.3' }}>A Espinha Dorsal Operacional e Analítica do seu Negócio</h3>
          <p style={{ color: '#F4F2ED', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '16px', opacity: 0.9 }}>
            Para empresas que ainda operam com dados fragmentados e processos manuais, o nível de competidores de alta maturidade analítica parece distante. A ARKOS foi concebida exatamente para fechar esse gap. 
          </p>
          <p style={{ color: '#8A8F99', fontSize: '0.9rem', lineHeight: '1.8' }}>
            Atuamos como a inteligência que unifica seus sistemas, automatiza a coleta e aplica modelos preditivos sobre a sua realidade. Nós não apenas apontamos o caminho: <strong style={{color: '#C8F542'}}>construímos a estrada tecnológica</strong> que permite à sua empresa escalar com controle absoluto das suas margens e custos operacionais.
          </p>
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
              <div className={styles.compMegaArkos}>A estratégia e a tecnologia andam juntas. Mapeamos as regras do seu negócio e a plataforma opera isso no dia a dia: coletando dados, gerando alertas e orientando decisões automaticamente, sem depender de consultores externos.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Ferramentas isoladas de BI (PowerBI, Tableau)</div>
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
              <div className={styles.compMegaTag}>Sistemas de Jurídico E CLM</div>
              <div className={styles.compMegaLimit}>Comportam-se como pastas de rede glorificadas. Apenas guardam PDFs ou requerem edição massiva em templates engessados com pouca validade negocial inteligente.</div>
              <div className={styles.compMegaArkos}>Smart Contracts integrados aos negócios. Os documentos são nutridos estruturalmente pelo banco de dados: variáveis ajustam valores e enviam alertas sobre reajustes indexadores automaticamente.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>Serviços de Analytics E AI</div>
              <div className={styles.compMegaLimit}>Fabricam algoritmos 'caixa-preta' puramente estatística sem compreender a teoria econômica que rege os mercados dos seus clientes — e a diretoria ignora e abandona a tecnologia.</div>
              <div className={styles.compMegaArkos}>Construído por analistas econômicos. Nossos tensores levam em conta as premissas econométricas reais do mercado antes de realizar regressões ingênuas.</div>
            </div>

            <div className={styles.compMegaRow}>
              <div className={styles.compMegaTag}>LMS E Plataformas EaD</div>
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
          <div className={styles.resultadosInner}>
            {[
              { b: '↓ 25%', t: 'Redução de CAC', d: 'Otimização direta do Custo de Aquisição de Clientes, bloqueando investimentos sem ROI.' },
              { b: '↑ 40%', t: 'Eficiência Analítica', d: 'Fim do trabalho manual. O RH e Financeiro focam em aprovar estratégias em vez de montar planilhas.' },
              { b: '8h → 3s', t: 'Aceleração de Resposta', d: 'O tempo necessário para a diretoria compilar vendas vs. a resposta no painel inteligenteizado.' },
              { b: '↑ 30%', t: 'Crescimento de LTV', d: 'Algoritmos predizem produtos que o cliente quer comprar e notificam o comercial.' },
              { b: '99,9%', t: 'Precisão Operacional', d: 'Fim dos cálculos errados, contratos defasados não reajustados pela inflação.' },
              { b: '↓ 18%', t: 'Redução de Opex', d: 'Redução nas despesas operacionais devido à consolidação de ferramentas de software em um hub.' },
              { b: '360°', t: 'Abolição de Silos', d: 'Financeiro e Marketing lendo a mesma fonte. O fim dos "meus dados vs. os seus dados".' },
              { b: 'D-0', t: 'Preditibilidade Caixa', d: 'Modulação antecipada (predictive cashflow). O sistema simula calotes antes de ocorrerem.' },
              { b: '- 45%', t: 'Mitigação de Churn', d: 'Identifica a probabilidade de um aluno evadir até 60 dias antes dele deixar de pagar a mensalidade.' },
              { b: '100%', t: 'Autonomia Capital', d: 'Letramento do time e posse total. A inteligência fica retida para a empresa, sem depender de consultorias.' }
            ].map((m, i) => (
              <div key={i} className={styles.metricCard}>
                <div className={styles.metricBig}>{m.b}</div>
                <div className={styles.metricTitle}>{m.t}</div>
                <p className={styles.metricDesc}><strong>O que representa:</strong> {m.d}</p>
              </div>
            ))}

            {/* Duplicata para o loop Marquee continuo em Mobile */}
            {[
              { b: '↓ 25%', t: 'Redução de CAC', d: 'Otimização direta do Custo de Aquisição de Clientes, bloqueando investimentos sem ROI.' },
              { b: '↑ 40%', t: 'Eficiência Analítica', d: 'Fim do trabalho manual. O RH e Financeiro focam em aprovar estratégias em vez de montar planilhas.' },
              { b: '8h → 3s', t: 'Aceleração de Resposta', d: 'O tempo necessário para a diretoria compilar vendas vs. a resposta no painel inteligenteizado.' },
              { b: '↑ 30%', t: 'Crescimento de LTV', d: 'Algoritmos predizem produtos que o cliente quer comprar e notificam o comercial.' },
              { b: '99,9%', t: 'Precisão Operacional', d: 'Fim dos cálculos errados, contratos defasados não reajustados pela inflação.' },
              { b: '↓ 18%', t: 'Redução de Opex', d: 'Redução nas despesas operacionais devido à consolidação de ferramentas de software em um hub.' },
              { b: '360°', t: 'Abolição de Silos', d: 'Financeiro e Marketing lendo a mesma fonte. O fim dos "meus dados vs. os seus dados".' },
              { b: 'D-0', t: 'Preditibilidade Caixa', d: 'Modulação antecipada (predictive cashflow). O sistema simula calotes antes de ocorrerem.' },
              { b: '- 45%', t: 'Mitigação de Churn', d: 'Identifica a probabilidade de um aluno evadir até 60 dias antes dele deixar de pagar a mensalidade.' },
              { b: '100%', t: 'Autonomia Capital', d: 'Letramento do time e posse total. A inteligência fica retida para a empresa, sem depender de consultorias.' }
            ].map((m, i) => (
              <div key={`dup-${i}`} className={`${styles.metricCard} ${styles.onlyOnMobile}`}>
                <div className={styles.metricBig}>{m.b}</div>
                <div className={styles.metricTitle}>{m.t}</div>
                <p className={styles.metricDesc}><strong>O que representa:</strong> {m.d}</p>
              </div>
            ))}
          </div>
      </div>
      </section>
      <Footer />
      
      {/* ── MOBILE BOTTOM NAVBAR (PREMIUM DOCK) ────────────────── */}
      {mobileNavbar}

    </div>
  )
}
