'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import styles from './dashboardLayoutClient.module.css'
import { ArrowRight } from 'lucide-react'

export function DashboardLayoutClient({ children, activeCompany, empresas, isAdmin, perfilName, perfilAvatar }: any) {
  const pathname = usePathname()
  const isHub = pathname === '/dashboard'

  return (
    <div className={`${styles.layout} ${isHub ? styles.layoutHub : ''}`}>
      {!isHub && <Sidebar currentPath={pathname} activeCompany={activeCompany} isAdmin={isAdmin} />}

      <div className={`${styles.content} ${isHub ? styles.contentHub : ''}`}>
        <header className={styles.header}>
          <div className={styles.leftHeader} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isHub && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/arkos_logo.png" alt="Arkos" style={{ height: '24px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
            )}
            {!isHub && <CompanySwitcher empresas={empresas} activeCompany={activeCompany} />}
          </div>

          {isHub && (
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: '#8A8F99' }}>Espaço Customizável</span>
                <input type="color" defaultValue="#C8F542" style={{ width: '22px', height: '22px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }} />
             </div>
          )}

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8A8F99', fontSize: '0.813rem', textDecoration: 'none', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}>
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Voltar para o Site
            </Link>
            
            <div className={styles.userMenu}>
              <div className={styles.perfilIcon}>
                {perfilAvatar || perfilName?.charAt(0).toUpperCase()}
              </div>
              <span>{perfilName}</span>
            </div>
          </div>
        </header>

        <main className={`${styles.main} ${isHub ? styles.mainHub : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

import { CompanySwitcher } from '@/components/layout/CompanySwitcher'
import Link from 'next/link'
