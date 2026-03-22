'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, BarChart2, Users, Shield, ArrowRight, CornerUpLeft } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'suite' | 'maintenance'>('suite')
  const [maintenanceItem, setMaintenanceItem] = useState('')

  const apps = [
    { 
      id: 'marketing', 
      title: 'Marketing Intelligence', 
      status: 'Em Desenvolvimento', 
      desc: 'Funil comercial, satisfação e mercado. O módulo de entrada para ROI rápido.', 
      image: '/arkos_executive_dashboard_1774143501248.png', 
      color: '#38BDF8', 
      link: '#' 
    },
    { 
      id: 'data', 
      title: 'Arkos Data', 
      status: 'Em Desenvolvimento', 
      desc: 'Data warehouse, pipelines e governança de dados estruturada.', 
      image: '/arkos_data_stream_1774143375030.png', 
      color: '#A855F7', 
      link: '#' 
    },
    { 
      id: 'clm', 
      title: 'Sistema CLM (Contratos e Documentos)', 
      status: 'Disponível', 
      desc: 'Gestão Inteligente de Ciclo de Vida de Contratos e Documentos Corporativos.', 
      image: '/arkos_dashboard_decision_1774133572097.png', 
      color: '#C8F542', 
      link: '/dashboard/clm' 
    },
    { 
      id: 'ai', 
      title: 'Arkos AI', 
      status: 'Em Desenvolvimento', 
      desc: 'Copilots executivos, previsões de churn e notificações de anomalia.', 
      image: '/arkos_data_brain_1774143436679.png', 
      color: '#F472B6', 
      link: '#' 
    },
    { 
      id: 'strategy', 
      title: 'Arkos Strategy', 
      status: 'Em Desenvolvimento', 
      desc: 'Planejamento estratégico estruturado e cruzamento de cenários econômicos.', 
      image: '/arkos_business_strategy_1774143055983.png', 
      color: '#34D399', 
      link: '#' 
    },
    { 
      id: 'academy', 
      title: 'Arkos Academy', 
      status: 'Em Desenvolvimento', 
      desc: 'Capacitação corporativa e EdTech white-label para faculdades. Gestão preditiva baseada nos dados e métricas de interação dos alunos.', 
      image: '/arkos_corporate_boardroom_1774143669395.png', 
      color: '#FBBF24', 
      link: '#' 
    }
  ]

  if (activeTab === 'maintenance') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <div style={{ background: '#111318', border: '1px solid #1F242D', borderRadius: '16px', padding: '3rem', maxWidth: '450px' }}>
          <div style={{ color: '#F59E0B', marginBottom: '1.25rem', fontSize: '3rem' }}>🚧</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F4F2ED', marginBottom: '0.5rem' }}>{maintenanceItem}</h2>
          <p style={{ color: '#8A8F99', fontSize: '0.875rem', marginBottom: '2rem' }}>Este módulo está em manutenção ou em fase de desenvolvimento para a sua infraestrutura.</p>
          <button 
            onClick={() => setActiveTab('suite')} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1F242D', color: '#F4F2ED', padding: '0.625rem 1.25rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.813rem', border: '1px solid #272D38', cursor: 'pointer', margin: '0 auto' }}
          >
            <CornerUpLeft size={16} /> Voltar para Suite
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. CABEÇALHO DA SUITE */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F4F2ED', letterSpacing: '-0.025em' }}>Ecossistema de Inteligência Arkos</h1>
        <p style={{ color: '#8A8F99', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '500px', margin: '0.4rem auto 0' }}>Conecte sua empresa a arquiteturas operacionais de alta performance em dados e gestão.</p>
      </div>

      {/* 2. GRID DE APLICATIVOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {apps.map((app) => (
          <div 
            key={app.id} 
            style={{ 
              background: '#0D0E12', 
              border: '1px solid #1F242D', 
              borderRadius: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end', 
              position: 'relative', 
              overflow: 'hidden',
              minHeight: '340px',
              opacity: app.status === 'Disponível' ? 1 : 0.65,
              transition: 'all 0.3s ease',
              boxShadow: app.status === 'Disponível' ? `0 20px 40px rgba(200, 245, 66, 0.05)` : 'none'
            }}
          >
            {/* Imagem de Fundo por IA */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
              <img src={app.image} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'luminosity', opacity: 0.25 }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(13,14,18,0.4) 0%, rgba(13,14,18,0.95) 100%)' }}></div>
            </div>

            {/* Glossy top bar decoration */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: app.color, zIndex: 1 }}></div>

            <div style={{ padding: '1.5rem', zIndex: 2, width: '100%' }}>
              <span style={{ fontSize: '0.625rem', padding: '4px 8px', background: app.status === 'Disponível' ? 'rgba(200,245,66,0.1)' : '#1F242D', color: app.status === 'Disponível' ? '#C8F542' : '#8A8F99', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {app.status === 'Disponível' ? 'Módulo Ativo' : 'Em Desenvolvimento'}
              </span>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F4F2ED', marginTop: '0.75rem', marginBottom: '0.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{app.title}</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.813rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{app.desc}</p>

              {app.id === 'clm' ? (
                <Link 
                  href={app.link} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '6px', 
                    background: app.color, 
                    color: '#0A0C0F', 
                    padding: '0.75rem', 
                    borderRadius: '10px', 
                    fontWeight: 800, 
                    fontSize: '0.813rem', 
                    textDecoration: 'none', 
                    boxShadow: `0 0 16px rgba(200, 245, 66, 0.15)`,
                    transition: 'transform 0.2s'
                  }}
                >
                  Acessar Ferramenta <ArrowRight size={16} />
                </Link>
              ) : (
                <button 
                  disabled
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '6px', 
                    background: 'rgba(255,255,255,0.03)', 
                    color: '#5A5F6A', 
                    padding: '0.75rem', 
                    borderRadius: '10px', 
                    fontWeight: 800, 
                    fontSize: '0.813rem', 
                    border: '1px solid #1F242D', 
                    cursor: 'not-allowed',
                    width: '100%'
                  }}
                >
                  Em Breve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. TERMO DE INTEGRAÇÃO METODOLÓGICA CTA */}
      <div style={{ background: 'linear-gradient(135deg, rgba(200,245,66,0.05) 0%, rgba(13,14,18,0.4) 100%)', border: '1px solid rgba(200,245,66,0.15)', padding: '2rem', borderRadius: '20px', display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ background: '#C8F542', padding: '14px', borderRadius: '14px', color: '#0A0C0F' }}>
            <Shield size={24} />
          </div>
          <div>
            <h4 style={{ color: '#F4F2ED', fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Letramento e Organização Plena</h4>
            <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.6', maxWidth: '650px' }}>
              Cada empresa pode contratar funcionalidades avulsas, porém, a metodologia de análise e previsibilidade 
              <strong style={{ color: '#C8F542' }}> ARKOS se dá de forma plena apenas quando todos os módulos operam integrados</strong>.
            </p>
          </div>
        </div>

        <Link href="https://wa.me/5583981957737" target="_blank" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#C8F542', color: '#0A0C0F', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 800, fontSize: '0.813rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(200,245,66,0.2)' }}>
            Expandir Funcionalidades <ArrowRight size={16} />
          </button>
        </Link>
      </div>

    </div>
  )
}
