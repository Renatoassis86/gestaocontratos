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
            }
          ].map((modulo) => {
            const CardContent = (
              <div 
                className={styles.card} 
                style={!modulo.hasAccess ? { opacity: 0.45, cursor: 'not-allowed', userSelect: 'none', position: 'relative' } : { position: 'relative' }}
              >
                {!modulo.hasAccess && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#8A8F99' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                )}
                
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper} style={modulo.id !== 'clm' ? { background: `rgba(${modulo.id === 'crm' ? '59, 130, 246' : modulo.id === 'recrutamento' ? '139, 92, 246' : '6, 182, 212'}, 0.1)`, color: modulo.color } : {}}>
                    {modulo.icon}
                  </div>
                  <span className={styles.accentTag} style={modulo.id !== 'clm' ? { background: `rgba(${modulo.id === 'crm' ? '59, 130, 246' : modulo.id === 'recrutamento' ? '139, 92, 246' : '6, 182, 212'}, 0.1)`, color: modulo.color } : {}}>
                    {modulo.tag}
                  </span>
                </div>
                
                <h2 className={styles.cardTitle}>{modulo.titulo}</h2>
                <p className={styles.cardDesc}>{modulo.desc}</p>
                
                <div className={styles.cardFooter} style={modulo.id !== 'clm' ? { color: modulo.color } : {}}>
                  <span>{modulo.hasAccess ? 'Acessar' : 'Bloqueado'}</span>
                  <ArrowRight size={14} style={{ opacity: modulo.hasAccess ? 1 : 0.5 }} />
                </div>
              </div>
            );

            if (!modulo.hasAccess) {
              return <div key={modulo.id} className="flex">{CardContent}</div>;
            }

            return modulo.externo ? (
              <a href={modulo.link} target="_blank" rel="noopener noreferrer" className="flex" key={modulo.id}>{CardContent}</a>
            ) : (
              <Link href={modulo.link} className="flex" key={modulo.id}>{CardContent}</Link>
            );
          })}
        </div>
      </main>
    </div>
  )
}

