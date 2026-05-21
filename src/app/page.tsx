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

  useEffect(() => {
    const handleInteraction = () => {
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
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = ((activeVideo + 1) % 3) as 0|1|2;
      const nextVideo = videoRefs[nextIdx].current;
      
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
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
      <Link href="#diagnostico" className={`${styles.navItem} ${styles.navItemPrimary}`}>
        <LayoutIcon size={24} strokeWidth={2} />
      </Link>
      <Link href="#aplicativos" className={styles.navItem}>
        <Grid size={20} strokeWidth={1.5} />
      </Link>
      <Link href="/hub" className={styles.navItem}>
        <LogIn size={20} strokeWidth={1.5} style={{ color: '#C8F542' }} />
      </Link>
    </nav>
  );

  return (
    <div className={styles.page}>
      
      <div className={styles.meshBg}></div>

      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <button className={styles.burgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
        </button>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : styles.hideOnMobile}`} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.813rem', color: '#FFFFFF' }}>
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
          <Link href="/proposta-comercial" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onClick={() => setIsMenuOpen(false)}>
            <span>Proposta</span>
            <span style={{ fontSize: '0.55rem', fontWeight: 700, background: 'rgba(200,245,66,0.15)', color: '#C8F542', border: '1px solid rgba(200,245,66,0.3)', padding: '2px 6px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase' }}>cliente</span>
          </Link>
          <Link href="/diagnostico" target="_blank" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}><span>Diagnóstico</span></Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/hub">
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

      <section className={styles.heroAdapta}>
        <div className={styles.heroVideoBg}>
          <video ref={videoRefs[0]} autoPlay muted playsInline loop className={styles.heroVideoElement} poster="/arkos_growth_acceleration_hero_v1_1774542610685.png" style={{ opacity: activeVideo === 0 ? 1 : 0, transition: 'opacity 1.5s ease-in-out', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/hero-main-arkos.mp4" type="video/mp4" />
          </video>
          <video ref={videoRefs[1]} autoPlay muted playsInline loop className={styles.heroVideoElement} poster="/arkos_marketing_intelligence_hero_v1_1774542591336.png" style={{ opacity: activeVideo === 1 ? 1 : 0, transition: 'opacity 1.5s ease-in-out', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/hero-secondary-arkos.mp4" type="video/mp4" />
          </video>
          <video ref={videoRefs[2]} autoPlay muted playsInline loop className={styles.heroVideoElement} poster="/arkos_hub_dashboard_interface_1775141882974.png" style={{ opacity: activeVideo === 2 ? 1 : 0, transition: 'opacity 1.5s ease-in-out', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/hero-arkos-video.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroVideoOverlay}></div>
        </div>

        <motion.div className={styles.heroContentWrapper} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <motion.div className={styles.heroTag} style={{ background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.12)', color: '#C8F542' }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <Sparkles size={12} />
            <span>Infraestrutura de Inteligência</span>
          </motion.div>
          
          <motion.h1 className={styles.heroH1Adapta} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            A Infraestrutura de <br />
            <span style={{ color: '#C8F542', fontStyle: 'italic' }}>Inteligência</span> da nova economia, aliada a ciências de dados para negócios.
          </motion.h1>

          <motion.p className={styles.heroPAdapta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Do dado bruto à decisão executiva. A ARKOS conecta sistemas, dados, analytics e gestão em uma única arquitetura operacional.
          </motion.p>
          
          <motion.div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px', zIndex: 10, flexWrap: 'wrap' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
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
              <span style={{ fontWeight: company.weight, fontSize: company.size, letterSpacing: company.ls || '0px', fontFamily: company.font || 'sans-serif' }}>
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. O PROBLEMA (SISTÊMICO - WHITE PREMIUM) ────────── */}
      <section id="dores" style={{ 
        background: '#F4F2ED', 
        padding: '100px 0', 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        borderRadius: '48px', 
        margin: '60px 0',
        position: 'relative',
        zIndex: 5,
        border: '1px solid rgba(0,0,0,0.03)' 
      }}>
        <div className={styles.section} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', color: '#0A0C0F', opacity: 0.6, fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>A FRAGILIDADE ATUAL</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0A0C0F', borderBottom: '3px solid #C8F542', display: 'inline-block', paddingBottom: '10px' }}>O Problema Sistêmico</h2>
            <p style={{ color: '#4A4F59', fontSize: '1rem', marginTop: '24px', maxWidth: '600px', margin: '24px auto 0 auto', fontWeight: 500 }}>3 dores estruturais que se repetem em todo negócio, independente do porte ou segmento.</p>
          </div>

          <div className={styles.doresGrid}>
            {[
              { n: '01', t: 'Informação Fragmentada', b: 'Dados espalhados em planilhas, ERPs, CRMs e ferramentas digitais sem conexão entre si. A empresa enxerga pedaços do problema, nunca o todo.' },
              { n: '02', t: 'Baixa Capacidade Analítica', b: 'Dados existem, mas não se transformam em entendimento. Times passam horas em relatórios manuais e ainda assim chegam a conclusões imprecisas.' },
              { n: '03', t: 'Decisão por Percepção', b: 'Sem modelagem, a gestão reage ao passado em vez de prever o futuro. O ruído vence a evidência. A empresa investe mais e ainda assim não sabe o que está funcionando.' }
            ].map((dor, i) => (
              <div key={i} className={styles.dorCard} style={{ background: '#1A1C1F', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
                <span className={styles.dorNum} style={{ color: '#C8F542', opacity: 0.2 }}>{dor.n}</span>
                <h3 className={styles.dorTitle} style={{ color: '#F4F2ED', fontWeight: 800 }}>{dor.t}</h3>
                <p className={styles.dorBody} style={{ color: '#8A8F99', fontWeight: 500 }}>{dor.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DIAGNÓSTICO HUB ───────────────────────────────── */}
      <section id="diagnostico">
        <DiagnosticoHub />
      </section>

      {/* ── 6. COMPETIDORES (NETFLIX) ─────────────────────────── */}
      <CompetidoresSeccion />

      {/* ── 7. SOLUÇÃO (WHITE PREMIUM) ───────────────────────── */}
      <section id="solucao" style={{ 
        background: '#F4F2ED', 
        padding: '100px 0', 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        borderRadius: '48px', 
        margin: '60px 0',
        position: 'relative',
        zIndex: 5,
        border: '1px solid rgba(0,0,0,0.03)' 
      }}>
        <div className={styles.section} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', color: '#0A0C0F', opacity: 0.6, fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>A RESPOSTA ESTRUTURAL</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0A0C0F', borderBottom: '3px solid #C8F542', display: 'inline-block', paddingBottom: '10px' }}>Arquitetura de Inteligência Arkos</h2>
          </div>
        
          <div className={styles.solucaoHero}>
            <div className={styles.videoArchWrapper}>
              <div className={styles.videoArchContainer} style={{ background: '#0A0C0F', boxShadow: '0 24px 60px rgba(0,0,0,0.1)' }}>
                <video ref={solucaoVideoRef} autoPlay loop muted playsInline className={styles.videoPlayer} src="/hero-main-arkos.mp4" />
              </div>
              <div className={styles.videoBtmBadge} style={{ background: '#0A0C0F', color: '#F4F2ED' }}>
                <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Sua operação movida a</span> Inteligência Estrutural <span style={{ color: '#C8F542' }}>→</span>
              </div>
            </div>

            <div className={styles.solucaoDarkCard}>
              <div style={{ fontFamily: 'monospace', color: '#C8F542', opacity: 0.8, fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '12px' }}>A ARKOS É SUA SOLUÇÃO</div>
              <p style={{ color: '#F4F2ED', fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', lineHeight: '1.5' }}>Para escalar sua empresa ao patamar das gigantes analíticas, a <strong>ARKOS</strong> atua como a espinha dorsal da sua inteligência corporativa.</p>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '20px', lineHeight: '1.3' }}>Não vendemos software. Vendemos <em style={{ fontStyle: 'italic', borderBottom: '2px solid #C8F542' }}>infraestrutura e inteligência.</em></h3>
              <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>Nossa diferenciação está na arquitetura de dados que construímos e na capacidade analítica que formamos dentro do seu time.</p>
              <div className={styles.accList}>
                <div className={styles.accItem} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className={styles.accHeader}>
                    <div className={styles.accTitleBlock}>
                      <Shield size={22} color="#C8F542" />
                      <span className={styles.accTitle} style={{ color: '#F4F2ED', fontSize: '1.15rem' }}>Operação Analítica de Alto Nível</span>
                    </div>
                  </div>
                  <div className={styles.accText} style={{ color: '#8A8F99' }}>Operamos em analytics avançado, conectando referências para todo o conhecimento executivo da corporação.</div>
                </div>
                <div className={styles.accItem} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className={styles.accHeader}>
                    <div className={styles.accTitleBlock}>
                      <Users size={20} color="#C8F542" />
                      <span className={styles.accTitle} style={{ color: '#F4F2ED' }}>Letramento Nativo de Equipe</span>
                    </div>
                  </div>
                  <div className={styles.accText} style={{ color: '#8A8F99' }}>Modelos preditivos instalados, sua equipe de diretoria passa a decidir com autonomia de longo prazo.</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.camadasHorizontal} style={{ marginTop: '60px' }}>
            {[
              { n: 'Fontes de Dados', d: 'ERP, CRM, financeiro e planilhas conectados com segurança.' },
              { n: 'Data Lake Node', d: 'Pipelines que limpam os dados injetando regras de negócios.' },
              { n: 'Analytics Estruturado', d: 'Processamento que gera modelagem econométrica fiel.' },
              { n: 'Inteligência Ativa', d: 'Avisos e interações do Copiloto Executivo em texto natural.' }
            ].map((c, i) => (
              <div key={i} className={styles.camadaH} style={{ background: '#1A1C1F', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
                <div className={styles.camadaTag} style={{ color: '#0A0C0F', background: '#C8F542', padding: '4px 12px', display: 'inline-block', borderRadius: '4px', fontSize: '0.625rem', fontWeight: 800 }}>CAMADA {i+1}</div>
                <div className={styles.camadaName} style={{ color: '#F4F2ED', marginTop: '16px', fontWeight: 800, fontSize: '1.1rem' }}>{c.n}</div>
                <div className={styles.camadaDesc} style={{ color: '#8A8F99', fontWeight: 500, fontSize: '0.85rem' }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ECOSSISTEMA MÓDULOS (DARK PREMIUM) ───────────── */}
      <section id="modulos" style={{ 
        background: '#0A0C0F', 
        padding: '100px 0', 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        borderRadius: '48px', 
        margin: '60px 0',
        position: 'relative',
        zIndex: 5,
        border: '1px solid rgba(255,255,255,0.03)'
      }}>
        <div className={styles.section} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>MÓDULOS DE IMPACTO</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#F4F2ED', borderBottom: '3px solid #C8F542', display: 'inline-block', paddingBottom: '10px' }}>Ecossistema de Soluções</h2>
          </div>
          <div className={styles.modulosGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[
              { tag: 'MI', color: '#FF4D4D', sub: 'ENTRADA VISUAL E DECISÓRIA', title: 'Marketing Intelligence', desc: 'Marketing como gerador supremo de dados decisórios e análise de sentimento.' },
              { tag: 'GDB', color: '#EC4899', sub: 'GOVERNANÇA DE ATIVOS', title: 'Governança de Dados', desc: 'Data warehouse e dashboards preditivos de alta performance para números reais.' },
              { tag: 'CRM', color: '#3B82F6', sub: 'RELAÇÕES COMERCIAIS', title: 'Gestão Comercial', desc: 'Otimize o funil de vendas e conversões estratégicas em tempo real.' },
              { tag: 'CLM', color: '#C8F542', sub: 'ESPINHA DORSAL', title: 'Gestão de Contratos', desc: 'Centraliza a espinha dorsal financeira e física do negócio.' },
              { tag: 'ATI', color: '#8B5CF6', sub: 'ALOCAÇÃO ESTRATÉGICA', title: 'Talent Intelligence', desc: 'Redesenho organizacional via NLP e Otimização Matemática de processos.' },
              { tag: 'AIA', color: '#F472B6', sub: 'SISTEMAS AUTÔNOMOS', title: 'Agentes de IA', desc: 'Agentes treinados com as regras do seu negócio para automação complexa.' },
              { tag: 'CCI', color: '#F43F5E', sub: 'ECONOMIA DIGITAL', title: 'Comércio Inteligente', desc: 'Motor financeiro B2B integrado para e-commerce e faturamento agnóstico.' },
              { tag: 'ACG', color: '#2DD4BF', sub: 'TRAÇÃO DE MERCADO', title: 'Aceleração Growth', desc: 'Squads avançados operando tráfego pago escalável e ROI preditivo.' },
              { tag: 'PEC', color: '#F59E0B', sub: 'MODELAGEM DE FUTURO', title: 'Planejamento e Cenários', desc: 'Formulação de planos estratégicos dinâmicos e operação tática.' },
              { tag: 'EDT', color: '#EF4444', sub: 'LETRAMENTO DIGITAL', title: 'Edtech Academy', desc: 'Plataforma LMS completa para letramento digital da equipe e capacitação preditiva.' },
              { tag: 'GTC', color: '#14B8A6', sub: 'TECNOLOGIA E SEGURANÇA', title: 'Gestão de Tecnologia e Cyber', desc: 'Monitoramento de infraestrutura, segurança de servidores e otimização de redes.' },
              { tag: 'GSD', color: '#06B6D4', sub: 'FLUXOS DE ATENDIMENTO', title: 'Governança de Service Desk', desc: 'Controle centralizado de chamados e fluxos de atendimento escaláveis com foco em eficiência.' }
            ].map((m, i) => (
              <div key={i} className={styles.moduloCard} style={{ background: '#1A1C1F', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <div className={styles.moduloHeader}>
                  <div className={styles.moduloSub} style={{ color: '#F4F2ED', opacity: 0.5 }}>{m.sub}</div>
                  <div className={styles.moduloTag} style={{ background: m.color, color: '#000', fontWeight: 800 }}>{m.tag}</div>
                </div>
                <h3 className={styles.moduloTitle} style={{ color: '#F4F2ED' }}>{m.title}</h3>
                <p className={styles.moduloDesc} style={{ color: '#8A8F99' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. EQUIPE & FOUNDER ─────────────────────────────── */}
      <section id="equipe" style={{ 
        background: '#090a0c', 
        padding: '100px 0', 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        borderRadius: '48px', 
        margin: '60px 0',
        position: 'relative',
        zIndex: 5,
        border: '1px solid rgba(255,255,255,0.03)' 
      }}>
        <div className={styles.section} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>IDEALIZADOR & FOUNDER</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#F4F2ED', borderBottom: '3px solid #C8F542', display: 'inline-block', paddingBottom: '10px' }}>A mente por trás da Arkos</h2>
          </div>
          <div className={styles.founderCard}>
            <div className={styles.founderHeader}>
              <div className={styles.founderImageWrapper}>
                <img src="/renato_assis_co.jpg" alt="Renat" className={styles.founderPhoto} />
                <div className={styles.founderImageOverlay} />
              </div>
              <div className={styles.founderNameBlock}>
                <h3 className={styles.founderName}>Renato Silva <span style={{ color: '#C8F542' }}>de Assis</span></h3>
                <div className={styles.founderTitle}>Idealizador & Founder · Economista · Cientista de Dados</div>
              </div>
            </div>
            <div className={styles.founderBio}>
              <p className={styles.founderText} style={{ fontSize: '1rem', lineHeight: '1.7' }}>Economista (UFPB), Mestre em Economia Regional (UFRN) e bacharel em Ciências de Dados para Negócios. Com mais de 16 anos de experiência consolidada em análise de mercado e modelagem estatística estratégica.</p>
              <p className={styles.founderText} style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#F4F2ED', opacity: 0.8, marginBottom: '24px' }}>Renato liderou iniciativas de inteligência em setores críticos, unindo o rigor da econometria clássica à vanguarda das tecnologias de IA Generativa. Como idealizador da Arkos Intelligence, ele projeta infraestruturas que eliminam o "achismo" corporativo, transformando dados brutos em sistemas autônomos de decisão que elevam a rentabilidade e a eficiência operacional de negócios em escala.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {['Econometria', 'Python', 'SQL', 'IA Generativa', 'Data Strategy', 'Business Intelligence'].map((t, i) => (
                  <span key={i} style={{ padding: '4px 10px', background: 'rgba(200,245,66,0.06)', borderRadius: '5px', fontSize: '0.7rem', color: '#C8F542', fontFamily: 'monospace', border: '1px solid rgba(200,245,66,0.1)' }}>{t}</span>
                ))}
              </div>
              <div style={{ padding: '16px 20px', background: 'rgba(200,245,66,0.03)', borderRadius: '10px', borderLeft: '3px solid #C8F542' }}>
                <p style={{ color: '#F4F2ED', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>"Construir processos com pessoas e para pessoas. A tecnologia não é o fim, mas o meio para gerar impacto real e liberdade decisória."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. RESULTADOS (Canto a Canto) ──────────────────── */}
      <section id="resultados" style={{ 
        background: '#F4F2ED', 
        padding: '100px 0', 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        borderRadius: '48px', 
        margin: '60px 0',
        position: 'relative',
        zIndex: 5,
        border: '1px solid rgba(0,0,0,0.1)', 
        overflow: 'hidden' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0A0C0F', borderBottom: '3px solid #C8F542', display: 'inline-block', paddingBottom: '10px', marginBottom: '16px' }}>Impacto Projetado na Operação</h2>
          <p style={{ color: '#4A4F59', fontSize: '1rem', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px auto' }}>Métricas reais de rentabilidade e eficiência Arkos.</p>
        </div>

        <div className={styles.resultadosGridMetrics} style={{ width: '100vw', marginTop: '20px' }}>
          <div className={styles.resultadosInner}>
            {[
              { b: '↓ 25%', t: 'Redução de CAC', d: 'Otimização direta do Custo de Aquisição de Clientes.' },
              { b: '↑ 40%', t: 'Eficiência Analítica', d: 'Fim do trabalho manual em planilhas.' },
              { b: '8h → 3s', t: 'Aceleração de Resposta', d: 'Tempo para a diretoria compilar vendas vs. a resposta.' },
              { b: '↑ 30%', t: 'Crescimento de LTV', d: 'Algoritmos predizem produtos que o cliente quer comprar.' },
              { b: '↓ 25%', t: 'Redução de CAC', d: 'Otimização direta do Custo de Aquisição de Clientes.' },
              { b: '↑ 40%', t: 'Eficiência Analítica', d: 'Fim do trabalho manual em planilhas.' },
              { b: '8h → 3s', t: 'Aceleração de Resposta', d: 'Tempo para a diretoria compilar vendas vs. a resposta.' },
              { b: '↑ 30%', t: 'Crescimento de LTV', d: 'Algoritmos predizem produtos que o cliente quer comprar.' }
            ].map((m, i) => (
              <div key={i} className={styles.metricCard} style={{ 
                background: '#1A1C1F', 
                border: '1px solid rgba(255,255,255,0.08)', 
                width: '340px', 
                height: '340px', 
                padding: '40px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                textAlign: 'center',
                flexShrink: 0
              }}>
                <div className={styles.metricBig} style={{ color: '#C8F542', fontSize: '3rem', marginBottom: '16px' }}>{m.b}</div>
                <div className={styles.metricTitle} style={{ color: '#F4F2ED', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>{m.t}</div>
                <p className={styles.metricDesc} style={{ color: '#8A8F99', fontSize: '0.85rem', margin: 0, lineHeight: '1.6' }}><strong style={{ color: '#F4F2ED', display: 'block', marginBottom: '8px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>O que representa:</strong> {m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      {mobileNavbar}
    </div>
  );
}
