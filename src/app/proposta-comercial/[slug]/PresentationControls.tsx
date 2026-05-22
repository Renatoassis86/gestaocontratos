'use client'

import { Play, Maximize2 } from 'lucide-react'
import styles from './presentation-header.module.css'

interface Props {
  gammaUrl: string
}

export function PresentationControls({ gammaUrl }: Props) {
  const fullPresentUrl = gammaUrl.replace('/embed/', '/docs/') + '?mode=present'

  async function iniciarApresentacao() {
    const el = document.querySelector('[data-viewer-wrapper]') as HTMLElement | null
    if (!el) return
    try {
      await el.requestFullscreen()
    } catch (e) {
      window.open(fullPresentUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div style={{ display: 'inline-flex', gap: 8 }}>
      <button
        type="button"
        onClick={iniciarApresentacao}
        title="Tela cheia · use ← → para navegar"
        aria-label="Iniciar Apresentação em tela cheia"
        className={styles.btnPrimary}
      >
        <Play size={12} fill="#0A0C0F" />
        <span className={styles.label}>Iniciar Apresentação</span>
      </button>
      <a
        href={fullPresentUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir no Gamma em nova aba"
        aria-label="Abrir no Gamma em nova aba"
        className={styles.btnGhost}
      >
        <Maximize2 size={13} />
      </a>
    </div>
  )
}
