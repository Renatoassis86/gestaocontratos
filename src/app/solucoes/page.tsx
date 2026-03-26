'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Users, ShoppingCart, LogOut, Package, ArrowRight, CheckCircle, MessageCircle, BarChart2, Cpu, Shield } from 'lucide-react'
import styles from './solucoes.module.css'

export default function SolucoesPage() {
  return (
    <div className={styles.container} style={{ minHeight: '100vh', background: '#0A0C0F', paddingTop: '45px' }}>
      <main className="flex-1 flex flex-col items-center justify-center">
        
        <Link href="/diagnostico" style={{ color: '#8A8F99', textDecoration: 'none', marginBottom: '16px', fontSize: '0.85rem' }}>
          ← Voltar para Resultados
        </Link>

        <div className={styles.titleArea} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className={styles.title} style={{ fontSize: '2rem', color: '#F4F2ED', fontWeight: 800 }}>Explore o Ecossistema ARKOS</h1>
          <p className={styles.subtitle} style={{ color: '#8A8F99', fontSize: '1rem', maxWidth: '600px', margin: '8px auto' }}>
            Nossas soluções foram desenvolvidas para atuar como a espinha dorsal da sua maturidade corporativa.
          </p>
        </div>

        <div className={styles.grid}>
          {[
            { tag: 'MI', id: 'marketing', titulo: 'Marketing Intelligence', desc: 'O marketing atua como gerador supremo de dados decisórios. Operamos desde o digital analítico até a inteligência profunda.', link: '#', externo: false, icon: <BarChart2 size={22} />, color: '#FF4D4D', hasAccess: false, foto: '/arkos_marketing_intelligence_hero_v1_1774542591336.png' },
            { tag: 'GDB', id: 'data', titulo: 'Governança de Dados e BI', desc: 'Data warehouse, pipelines conectadas e dashboards preditivos de alta performance.', link: '#', externo: false, icon: <Cpu size={22} />, color: '#EC4899', hasAccess: false, foto: '/arkos_data_stream_1774143375030.png' },
            { tag: 'CRM', id: 'crm', titulo: 'Gestão Comercial (CRM)', desc: 'Otimize o funil de vendas, propostas comerciais e conversões estratégicas em tempo real.', link: 'https://comercial.cidadeviva.education', externo: true, icon: <ShoppingCart size={22} />, color: '#3B82F6', hasAccess: false, foto: '/arkos_real_executive_dashboard_1774143584596.png' },
            { tag: 'CLM', id: 'clm', titulo: 'Gestão de Contratos (CLM)', desc: 'Centraliza a espinha dorsal financeira e física do negócio: faturamento, fardamento e contratos.', link: '/dashboard/documentos', externo: false, icon: <FileText size={22} />, color: '#C8F542', hasAccess: true, foto: '/arkos_dashboard_decision_1774133572097.png' },
            { tag: 'ATI', id: 'recrutamento', titulo: 'Arkos Talent Intelligence', desc: 'Redesenho organizacional via NLP e Otimização Matemática. Estruturação de cargos e processos.', link: 'https://recrutamento.cidadeviva.education/', externo: true, icon: <Users size={22} />, color: '#8B5CF6', hasAccess: false, foto: '/arkos_executive_dashboard_1774143501248.png' },
            { tag: 'AIA', id: 'ai', titulo: 'Agentes de IA e Automação', desc: 'Agentes autônomos treinados com as regras do seu negócio para resolver chamados e fluxos.', link: '#', externo: false, icon: <Cpu size={22} />, color: '#F472B6', hasAccess: false, foto: '/arkos_data_brain_1774143436679.png' },
            { tag: 'CCI', id: 'commerce', titulo: 'Central de Comércio Inteligente', desc: 'Motor financeiro robusto B2B integrado à gestão para e-commerce e recorrência.', link: '#', externo: false, icon: <ShoppingCart size={22} />, color: '#F43F5E', hasAccess: false, foto: '/arkos_laptop_mockup_1774143172389.png' },
            { tag: 'ACG', id: 'growth', titulo: 'Aceleração de Crescimento (Growth)', desc: 'Squads avançados operando tráfego pago escalável, ROI preditivo e SEO técnico.', link: '#', externo: false, icon: <BarChart2 size={22} />, color: '#2DD4BF', hasAccess: false, foto: '/arkos_growth_acceleration_hero_v1_1774542610685.png' },
            { tag: 'PEC', id: 'strategy', titulo: 'Planejamento Estratégico e Cenários', desc: 'Formulação completa e acompanhamento de planos estratégicos dinâmicos e operação tática.', link: '#', externo: false, icon: <Shield size={22} />, color: '#F59E0B', hasAccess: false, foto: '/arkos_business_strategy_1774143055983.png' },
            { tag: 'EDT', id: 'academy', titulo: 'Edtech Academy', desc: 'Plataforma LMS completa para letramento digital da equipe e capacitação preditiva.', link: '#', externo: false, icon: <Users size={22} />, color: '#EF4444', hasAccess: false, foto: '/edtech_academy_watching_class_v1_1774549826855.png' },
            { tag: 'GTC', id: 'infra', titulo: 'Gestão de Tecnologia e Cyber', desc: 'Monitoramento de infraestrutura, segurança de servidores e otimização de redes.', link: '#', externo: false, icon: <Shield size={22} />, color: '#14B8A6', hasAccess: false, foto: '/arkos_corporate_presenting_1774143639165.png' },
            { tag: 'GSD', id: 'pedidos', titulo: 'Governança de Service Desk e Demandas', desc: 'Controle centralizado de chamados e fluxos de atendimento escaláveis com foco em eficiência.', link: 'https://appgestaocontratos.vercel.app/', externo: true, icon: <Package size={22} />, color: '#06B6D4', hasAccess: false, foto: '/arkos_data_dashboard_holo_1774143471858.png' },
          ].map((modulo) => (
            <div key={modulo.id} style={{ display: 'flex' }}>
              <Link 
                href={`/solucoes/${modulo.id}`} 
                style={{ textDecoration: 'none', display: 'flex', width: '100%' }}
              >
                <div 
                  className={styles.card} 
                  style={{ 
                    padding: 0, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <div style={{ height: '140px', width: '100%', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={modulo.foto} alt={modulo.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper} style={{ color: modulo.color }}>
                        {modulo.icon}
                      </div>
                      <span className={styles.accentTag} style={{ color: modulo.color }}>
                        {modulo.tag}
                      </span>
                    </div>
                    
                    <h2 className={styles.cardTitle}>{modulo.titulo}</h2>
                    <p className={styles.cardDesc} style={{ margin: 0, flexGrow: 1, fontSize: '0.783rem' }}>{modulo.desc}</p>
                    
                    <div className={styles.cardFooter} style={{ marginTop: '16px' }}>
                      <button style={{ 
                        width: '100%', 
                        background: '#1F2937', 
                        color: '#C8F542', 
                        border: '1px solid rgba(200,245,66,0.3)', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        fontSize: '0.75rem', 
                        fontWeight: 800, 
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Saiba Mais Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}