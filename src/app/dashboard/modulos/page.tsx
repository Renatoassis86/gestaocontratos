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
          {/* Módulo 1: Gestão de Contratos */}
          <Link href="/dashboard/documentos" className="flex">
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <FileText size={22} />
                </div>
                <span className={styles.accentTag}>CLM</span>
              </div>
              <h2 className={styles.cardTitle}>Gestão de Contratos</h2>
              <p className={styles.cardDesc}>
                Controle de emissão, histórico acadêmico, certificados e fluxos CLM corporativos.
              </p>
              <div className={styles.cardFooter}>
                <span>Acessar</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Módulo 2: Gestão Comercial */}
          <a href="https://comercial.cidadeviva.education" target="_blank" rel="noopener noreferrer" className="flex">
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
                  <ShoppingCart size={22} />
                </div>
                <span className={styles.accentTag} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>CRM</span>
              </div>
              <h2 className={styles.cardTitle}>Gestão Comercial</h2>
              <p className={styles.cardDesc}>
                Otimize funil de vendas, propostas comerciais e conversões em tempo real.
              </p>
              <div className={styles.cardFooter} style={{ color: '#3B82F6' }}>
                <span>Acessar</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </a>

          {/* Módulo 3: Recrutamento */}
          <a href="https://recrutamento.cidadeviva.education/" target="_blank" rel="noopener noreferrer" className="flex">
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>
                  <Users size={22} />
                </div>
                <span className={styles.accentTag} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>HRMS</span>
              </div>
              <h2 className={styles.cardTitle}>Recrutamento</h2>
              <p className={styles.cardDesc}>
                Triagem inteligente de candidatos e Onboarding digital sem burocracia.
              </p>
              <div className={styles.cardFooter} style={{ color: '#8B5CF6' }}>
                <span>Acessar</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </a>

          {/* Módulo 4: Pedidos */}
          <a href="https://appgestaocontratos.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex">
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06B6D4' }}>
                  <Package size={22} />
                </div>
                <span className={styles.accentTag} style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06B6D4' }}>ERP</span>
              </div>
              <h2 className={styles.cardTitle}>Pedidos e Demandas</h2>
              <p className={styles.cardDesc}>
                Controle de requisições, chamados internos e fluxos de atendimento.
              </p>
              <div className={styles.cardFooter} style={{ color: '#06B6D4' }}>
                <span>Acessar</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  )
}

