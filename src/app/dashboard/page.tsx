'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, BarChart2, Users, Shield, ArrowRight, CornerUpLeft } from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'suite' | 'maintenance'>('suite')
  const [maintenanceItem, setMaintenanceItem] = useState('')

  const apps = [
    { 
      id: 'clm', 
      title: 'Ópera CLM', 
      status: 'Disponível', 
      desc: 'Gestão Inteligente de Ciclo de Vida de Contratos e Documentos Corporativos.', 
      icon: <FileText size={32} />, 
      color: '#C8F542', 
      link: '/dashboard/clm' 
    },
    { 
      id: 'analytics', 
      title: 'Enterprise Analytics', 
      status: 'Em Desenvolvimento', 
      desc: 'Cruzamento de dados BI em tempo real e Dashboards Executivos de alta performance.', 
      icon: <BarChart2 size={32} />, 
      color: '#A855F7', 
      link: '#' 
    },
    { 
      id: 'talent', 
      title: 'Talent Management', 
      status: 'Em Desenvolvimento', 
      desc: 'Onboarding digital, triagem e gestão operacional de recursos humanos.', 
      icon: <Users size={32} />, 
      color: '#06B6D4', 
      link: '#' 
    },
    { 
      id: 'cyber', 
      title: 'SecOps & LGPD', 
      status: 'Em Desenvolvimento', 
      desc: 'Auditoria de segurança de dados e centro de conformidade LGPD centralizado.', 
      icon: <Shield size={32} />, 
      color: '#F43F5E', 
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {apps.map((app) => (
          <div 
            key={app.id} 
            style={{ 
              background: '#111318', 
              border: '1px solid #1F242D', 
              borderRadius: '16px', 
              padding: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              gap: '1.5rem', 
              position: 'relative', 
              overflow: 'hidden' 
            }}
          >
            {/* Glossy top bar decoration */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: app.color }}></div>

            <div>
              <div style={{ color: app.color, background: 'rgba(255,255,255,0.03)', width: 'fit-content', padding: '0.75rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.02)' }}>
                {app.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#F4F2ED', marginBottom: '0.25rem' }}>{app.title}</h3>
              <span style={{ fontSize: '0.688rem', color: app.status === 'Disponível' ? app.color : '#8A8F99', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                {app.status}
              </span>
              <p style={{ color: '#8A8F99', fontSize: '0.813rem', marginTop: '0.75rem', lineHeight: '1.5' }}>{app.desc}</p>
            </div>

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
                  boxShadow: `0 0 16px rgba(200, 245, 66, 0.1)` 
                }}
              >
                Acessar Módulo <ArrowRight size={16} />
              </Link>
            ) : (
              <button 
                onClick={() => { setMaintenanceItem(app.title); setActiveTab('maintenance'); }} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '6px', 
                  background: 'transparent', 
                  color: '#F4F2ED', 
                  padding: '0.75rem', 
                  borderRadius: '10px', 
                  fontWeight: 800, 
                  fontSize: '0.813rem', 
                  border: '1px solid #1F242D', 
                  cursor: 'pointer' 
                }}
              >
                Iniciar Módulo
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
