'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import styles from './hub.module.css'

export default function HubPage() {
  const hubs = [
    { name: 'Marketing Intelligence (MI)', path: '/dashboard/modulos/marketing' },
    { name: 'Governança de Dados e BI (GDB)', path: '/dashboard/modulos/data' },
    { name: 'Gestão Comercial (CRM)', path: '/dashboard/modulos/crm' },
    { name: 'Gestão de Contratos (CLM)', path: '/dashboard/contratos' },
    { name: 'Arkos Talent Intelligence (ATI)', path: '/dashboard/modulos/recrutamento' },
    { name: 'Agentes de IA e Automação (AIA)', path: '/dashboard/modulos/ai' },
    { name: 'Central de Comércio Inteligente (CCI)', path: '/dashboard/modulos/commerce' },
    { name: 'Aceleração de Crescimento (ACG)', path: '/dashboard/modulos/growth' },
    { name: 'Planejamento Estratégico e Cenários (PEC)', path: '/dashboard/modulos/strategy' },
    { name: 'Edtech Academy (EDT)', path: '/dashboard/modulos/academy' },
    { name: 'Gestão de Tecnologia e Cyber (GTC)', path: '/dashboard/modulos/infra' },
    { name: 'Governança de Service Desk e Demandas (GSD)', path: '/dashboard/modulos/pedidos' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.header}>ECOSSISTEMA HUB</h2>
        
        <nav className={styles.nav}>
          {hubs.map((hub, index) => (
            <Link key={index} href={hub.path} className={styles.link}>
              {hub.name}
              <ExternalLink size={14} className={styles.icon} />
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} />
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
