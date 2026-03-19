'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './sidebar.module.css'
import { LayoutDashboard, Building2, Users, FileText, LifeBuoy, Settings, LogOut, FileCheck } from 'lucide-react'

interface SidebarProps {
  currentPath?: string; // Mantido por compatibilidade
  activeCompany?: {
    id: string;
    razaoSocial: string;
    nomeFantasia: string;
  };
  isAdmin?: boolean;
}

export function Sidebar({ activeCompany, isAdmin }: SidebarProps) {
  const pathname = usePathname()
  const isFICV = activeCompany?.nomeFantasia?.toLowerCase().includes('ficv') || 
                 activeCompany?.razaoSocial?.toLowerCase().includes('ficv')

  const menus = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
  ]




  // Menus Acadêmicos
  menus.push(
    { name: 'Alunos e Certificados', path: '/dashboard/documentos/alunos', icon: <Users size={20} /> },
    { name: 'Emitir Histórico em Lote', path: '/dashboard/documentos/alunos/emitir', icon: <FileText size={20} /> },
    { name: 'Integração Moodle', path: '/dashboard/documentos/alunos/relatorios', icon: <FileText size={20} /> }
  )





  // Menus Operacionais e Contratos (Sempre visíveis para todos, inclusive FICV)
  menus.push(
    { name: 'CLM Ópera', path: '/dashboard/clm', icon: <FileCheck size={20} /> },
    { name: 'Contratos', path: '/dashboard/contratos', icon: <FileText size={20} /> },
    { name: 'Documentos', path: '/dashboard/documentos', icon: <FileText size={20} /> },
    { name: 'Assinaturas', path: '/dashboard/assinaturas', icon: <FileText size={20} /> },
    { name: 'Planos & Templates', path: '/dashboard/templates', icon: <FileCheck size={20} /> }
  )

  // Ajustar nome do menu para o Usuário
  const indexPlanos = menus.findIndex(m => m.path === '/dashboard/templates');
  if (indexPlanos !== -1) menus[indexPlanos].name = 'Documentos e Templates';


  // Menus Administrativos Finais
  if (isAdmin) {
    menus.push({ name: 'Empresas', path: '/dashboard/empresas', icon: <Building2 size={20} /> })
  }
  
  menus.push({ name: 'Pessoas', path: '/dashboard/pessoas', icon: <Users size={20} /> })


  const BottomMenus = [
    { name: 'Configurações', path: '/dashboard/settings', icon: <Settings size={20} /> },
    { name: 'Ajuda', path: '/dashboard/help', icon: <LifeBuoy size={20} /> },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1.5rem' }}>
        <img src="/logo-green.svg" alt="Arkos" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#FFFFFF', letterSpacing: '0.5px', fontFamily: 'var(--sans)' }}>ARKOS</span>
      </div>


      <nav className={styles.nav}>
        <ul>
          {menus.map((menu) => {
            const isActive = pathname === menu.path;
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
            const isActive = pathname === menu.path;
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
