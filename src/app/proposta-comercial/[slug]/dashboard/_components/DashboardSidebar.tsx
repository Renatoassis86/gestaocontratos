'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Factory, Car, LineChart, DollarSign, ArrowLeft } from 'lucide-react'
import styles from '../_styles.module.css'

interface Props {
  slug: string
}

const tabs = [
  { href: '',           label: 'Visão Geral',     icon: LayoutDashboard },
  { href: '/producao',  label: 'Produção Setorial', icon: Factory },
  { href: '/automotivo', label: 'Mercado Automotivo', icon: Car },
  { href: '/macro',     label: 'Macroeconômico',  icon: LineChart },
  { href: '/custos',    label: 'Custos & Insumos', icon: DollarSign },
] as const

export function DashboardSidebar({ slug }: Props) {
  const pathname = usePathname()
  const base = `/proposta-comercial/${slug}/dashboard`

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandRow}>
        <img src="/logo-high-res.svg" alt="ARKOS" />
        <span className={styles.brandRowLabel}>Dashboard</span>
      </div>

      {tabs.map((tab) => {
        const href = `${base}${tab.href}`
        const isActive = pathname === href || (tab.href === '' && pathname === base)
        const Icon = tab.icon
        return (
          <Link
            key={tab.href}
            href={href}
            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            <Icon size={16} strokeWidth={isActive ? 2.2 : 1.7} />
            <span>{tab.label}</span>
          </Link>
        )
      })}

      <div className={styles.navFooter}>
        <Link href={`/proposta-comercial/${slug}`} className={styles.backLink}>
          <ArrowLeft size={14} />
          <span>Voltar à apresentação</span>
        </Link>
      </div>
    </aside>
  )
}
