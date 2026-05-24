import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { Kpi } from '@/domain/entities/mevos/PontoSerie'
import styles from '../_styles.module.css'

function formatDataBr(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y.slice(2)}`
}

function formatValor(v: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(v)
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const deltaClass =
    kpi.destaque === 'positivo' ? styles.kpiDeltaUp
    : kpi.destaque === 'negativo' ? styles.kpiDeltaDown
    : styles.kpiDeltaFlat

  const Icon =
    kpi.destaque === 'positivo' ? ArrowUpRight
    : kpi.destaque === 'negativo' ? ArrowDownRight
    : Minus

  return (
    <div className={styles.kpi}>
      <span className={styles.kpiLabel}>{kpi.label}</span>

      <div className={styles.kpiValueRow}>
        <span className={styles.kpiValue}>
          {kpi.unidade === 'R$' ? 'R$ ' : ''}
          {formatValor(kpi.valor)}
        </span>
        {kpi.unidade !== 'R$' && (
          <span className={styles.kpiUnit}>{kpi.unidade}</span>
        )}
      </div>

      {kpi.delta != null && (
        <span className={`${styles.kpiDelta} ${deltaClass}`}>
          <Icon size={12} />
          {kpi.delta > 0 ? '+' : ''}
          {kpi.delta.toFixed(2)}% {kpi.deltaLabel}
        </span>
      )}

      <span className={styles.kpiFootnote}>
        {kpi.fonte} · {formatDataBr(kpi.dataRef)}
      </span>
    </div>
  )
}
