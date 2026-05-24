import { Database } from 'lucide-react'
import styles from '../_styles.module.css'

interface Props {
  fonte: string
  atualizadoEm?: string  // ISO YYYY-MM-DD
}

function formatDataBr(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function BadgeFonte({ fonte, atualizadoEm }: Props) {
  return (
    <span className={styles.badgeFonte}>
      <Database size={10} />
      <span>{fonte}</span>
      {atualizadoEm && <span>· {formatDataBr(atualizadoEm)}</span>}
    </span>
  )
}
