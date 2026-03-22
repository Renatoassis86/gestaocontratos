'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import styles from './dashboardLayoutClient.module.css'

export function DashboardLayoutClient({ children, activeCompany, isAdmin, perfilName, perfilAvatar }: any) {
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
                <img src="/arkos_logo.png" alt="Arkos" style={{ height: '28px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
            )}
            {!isHub && <CompanySwitcherWrapper activeCompany={activeCompany} />}
          </div>

          {isHub && (
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: '#8A8F99' }}>Workspace Workspace configurável</span>
                <input type="color" defaultValue="#C8F542" style={{ width: '24px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }} />
             </div>
          )}

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {isHub && <Link href="/" style={{ color: '#8A8F99', fontSize: '0.813rem', textDecoration: 'none' }}>Sair da Suite</Link>}
            
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

function CompanySwitcherWrapper({ activeCompany }: any) {
    return (
        <div className={styles.companySwitcher}>
           <span>{activeCompany?.nomeFantasia || activeCompany?.razaoSocial}</span>
        </div>
    )
}
