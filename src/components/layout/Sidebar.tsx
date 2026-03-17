import Link from 'next/link'
import styles from './sidebar.module.css'
import { LayoutDashboard, Building2, Users, FileText, LifeBuoy, Settings, LogOut, FileCheck } from 'lucide-react'

interface SidebarProps {
  currentPath: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const menus = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'CLM Ópera', path: '/dashboard/clm', icon: <FileCheck size={20} /> },
    { name: 'Contratos', path: '/dashboard/contratos', icon: <FileText size={20} /> },
    { name: 'Documentos', path: '/dashboard/documentos', icon: <FileText size={20} /> },
    { name: 'Alunos', path: '/dashboard/documentos/alunos', icon: <Users size={20} /> },
    { name: 'Assinaturas', path: '/dashboard/assinaturas', icon: <FileText size={20} /> },


    { name: 'Templates', path: '/dashboard/templates', icon: <FileText size={20} /> },
    { name: 'Tipos', path: '/dashboard/tipos-contrato', icon: <Settings size={20} /> },


    { name: 'Empresas', path: '/dashboard/empresas', icon: <Building2 size={20} /> },
    { name: 'Pessoas', path: '/dashboard/pessoas', icon: <Users size={20} /> },

  ]

  const BottomMenus = [
    { name: 'Configurações', path: '/dashboard/settings', icon: <Settings size={20} /> },
    { name: 'Ajuda', path: '/dashboard/help', icon: <LifeBuoy size={20} /> },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.logoText}>Contratos<span className={styles.accent}>SaaS</span></span>
      </div>

      <nav className={styles.nav}>
        <ul>
          {menus.map((menu) => {
            const isActive = currentPath === menu.path;
            return (
              <li key={menu.path}>
                <Link href={menu.path} className={isActive ? styles.active : ''}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <ul>
          {BottomMenus.map((menu) => {
            const isActive = currentPath === menu.path;
            return (
              <li key={menu.path}>
                <Link href={menu.path} className={isActive ? styles.active : ''}>
                  {menu.icon}
                  <span>{menu.name}</span>
                </Link>
              </li>
            )
          })}
          <li>
            <form action="/login" method="GET">
              <button type="submit" className={styles.logoutBtn}>
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </form>
          </li>
        </ul>
      </div>
    </aside>
  )
}
