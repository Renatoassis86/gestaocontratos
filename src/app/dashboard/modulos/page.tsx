import Link from 'next/link'
import { FileText, Users, ShoppingCart, LogOut, Package, ArrowRight } from 'lucide-react'
import styles from './modulos.module.css'

export default function ModulosSelector() {
  return (
    <div className={styles.container}>
      {/* Header Selector */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img src="/logo-green.png" alt="ARKOS" className={styles.logoImage} />
        </div>
        
        <Link href="/login">
          <button className="flex items-center space-x-1.5 text-sm stroke-slate-400 text-slate-400 hover:text-red-500 font-medium transition-all">
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </Link>
      </header>

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
              titulo: 'Recrutamento',
              tag: 'HRMS',
              desc: 'Triagem inteligente de candidatos e Onboarding digital sem burocracia.',
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
                className={styles.card} 
                style={{ 
                  padding: 0, 
                  height: 'auto', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: modulo.hasAccess ? '1px solid rgba(200,245,66,0.3)' : '1px solid rgba(255,255,255,0.04)',
                  boxShadow: modulo.hasAccess ? '0 0 24px rgba(200,245,66,0.06)' : 'none',
                  opacity: modulo.hasAccess ? 1 : 0.65,
                  cursor: modulo.hasAccess ? 'pointer' : 'default'
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
      </main>
    </div>
  )
}

