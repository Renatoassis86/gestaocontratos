'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Users, ShoppingCart, LogOut, Package, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react'
import styles from './modulos.module.css'

export default function ModulosSelector() {
  const [mounted, setMounted] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Começar a esmaecer após 3.5 segundos (tempo para o vídeo impactar)
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true)
    }, 3500)

    // Remover totalmente após o fade completar (4.5 segundos)
    const removeTimeout = setTimeout(() => {
      setIsPlayingVideo(false)
    }, 4500)

    return () => {
      clearTimeout(fadeTimeout)
      clearTimeout(removeTimeout)
    }
  }, [])

  return (
    <div className={styles.container}>
      {/* Video Transition Overlay */}
      {mounted && isPlayingVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          backgroundColor: '#070A0F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 1.2s ease-in-out',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <video 
            src="/Futuristic_Corporate_Analytics_Video_Generated.mp4" 
            autoPlay 
            muted 
            playsInline 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          <div style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#10B981',
            fontSize: '1.25rem',
            fontWeight: 700,
            background: 'rgba(7, 10, 15, 0.75)',
            padding: '14px 28px',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(16, 185, 129, 0.05)',
            animation: 'pulse 2s infinite'
          }}>
            <CheckCircle size={24} style={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
            <span>Validação Aprovada</span>
          </div>
        </div>
      )}



      {/* Main Container Grid */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Arkos Suite</h1>
          <p className={styles.subtitle}>
            Selecione o módulo de inteligência empresarial que deseja operar agora.
          </p>
        </div>

        <div className={styles.grid}>
          {[
            {
              id: 'clm',
              titulo: 'Gestão de Contratos',
              tag: 'CLM',
              desc: 'Controle de emissão, histórico acadêmico, certificados e fluxos CLM corporativos.',
              link: '/dashboard/documentos',
              externo: false,
              icon: <FileText size={22} />,
              color: '#C8F542',
              hasAccess: true,
              foto: '/arkos_dashboard_decision_1774133572097.png'
            },
            {
              id: 'crm',
              titulo: 'Gestão Comercial',
              tag: 'CRM',
              desc: 'Otimize funil de vendas, propostas comerciais e conversões em tempo real.',
              link: 'https://comercial.cidadeviva.education',
              externo: true,
              icon: <ShoppingCart size={22} />,
              color: '#3B82F6',
              hasAccess: false,
              foto: '/arkos_real_executive_dashboard_1774143584596.png'
            },
            {
              id: 'recrutamento',
              titulo: 'Gestão de Talentos (HR)',
              tag: 'HRMS',
              desc: 'Recrutamento automatizado por IA com rankeamento de currículos, dossiê de candidatos, gestão de folha de pagamento e KPIs de RH integrados.',
              link: 'https://recrutamento.cidadeviva.education/',
              externo: true,
              icon: <Users size={22} />,
              color: '#8B5CF6',
              hasAccess: false,
              foto: '/arkos_executive_dashboard_1774143501248.png'
            },
            {
              id: 'pedidos',
              titulo: 'Pedidos e Demandas',
              tag: 'ERP',
              desc: 'Controle de requisições, chamados internos e fluxos de atendimento.',
              link: 'https://appgestaocontratos.vercel.app/',
              externo: true,
              icon: <Package size={22} />,
              color: '#06B6D4',
              hasAccess: false,
              foto: '/arkos_data_dashboard_holo_1774143471858.png'
            }
          ].map((modulo) => {
            const CardContent = (
              <div 
                className={`${styles.card} ${modulo.hasAccess ? styles.cardActive : styles.cardInactive}`} 
                style={{ 
                  padding: 0, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                }}
              >
                {/* Imagem de Capa */}
                <div style={{ height: '150px', width: '100%', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <img src={modulo.foto} alt={modulo.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {!modulo.hasAccess && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#D97706', color: '#FFF', fontSize: '9px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Em desenvolvimento
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper} style={modulo.id !== 'clm' ? { background: `rgba(${modulo.id === 'crm' ? '59, 130, 246' : modulo.id === 'recrutamento' ? '139, 92, 246' : '6, 182, 212'}, 0.1)`, color: modulo.color } : {}}>
                      {modulo.icon}
                    </div>
                    <span className={styles.accentTag} style={modulo.id !== 'clm' ? { background: `rgba(${modulo.id === 'crm' ? '59, 130, 246' : modulo.id === 'recrutamento' ? '139, 92, 246' : '6, 182, 212'}, 0.1)`, color: modulo.color } : {}}>
                      {modulo.tag}
                    </span>
                  </div>
                  
                  <h2 className={styles.cardTitle}>{modulo.titulo}</h2>
                  <p className={styles.cardDesc} style={{ margin: 0, flexGrow: 1 }}>{modulo.desc}</p>
                  
                  <div className={styles.cardFooter} style={{ marginTop: '20px', color: modulo.hasAccess ? '#C8F542' : '#94A3B8' }}>
                    <span>{modulo.hasAccess ? 'Acessar módulo' : 'Aguardando liberação'}</span>
                    <ArrowRight size={14} style={{ opacity: modulo.hasAccess ? 1 : 0.5 }} />
                  </div>
                </div>
              </div>
            );

            if (!modulo.hasAccess) {
              return <div key={modulo.id} className="flex">{CardContent}</div>;
            }

            return modulo.externo ? (
              <a href={modulo.link} target="_blank" rel="noopener noreferrer" className="flex" key={modulo.id} style={{ textDecoration: 'none' }}>{CardContent}</a>
            ) : (
              <Link href={modulo.link} className="flex" key={modulo.id} style={{ textDecoration: 'none' }}>{CardContent}</Link>
            );
          })}
        </div>

        {/* Footer Cta section */}
        <div style={{
          marginTop: '60px',
          padding: '24px 32px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <p style={{ color: '#8A8F99', fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>
            Precisa de um módulo exclusivo ou suporte dedicado?
          </p>
          <a href="https://wa.me/5583981957737" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#C8F542',
              color: '#000',
              fontWeight: '800',
              fontSize: '0.75rem',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.2s'
            }}>
              <MessageCircle size={16} style={{ strokeWidth: 3 }} />
              <span>Falar com Consultor</span>
            </button>
          </a>
        </div>
      </main>
    </div>
  )
}

