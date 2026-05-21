'use client'

import { Play, Maximize2 } from 'lucide-react'

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
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 14px',
          background: 'linear-gradient(135deg, #C8F542, #A8DB1F)',
          color: '#0A0C0F',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: '0.78rem',
          boxShadow: '0 4px 12px rgba(200,245,66,0.25)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <Play size={12} fill="#0A0C0F" />
        <span>Iniciar Apresentação</span>
      </button>
      <a
        href={fullPresentUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Abrir no Gamma em nova aba"
        style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '7px 10px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, color: '#F4F2ED', textDecoration: 'none',
        }}
      >
        <Maximize2 size={13} />
      </a>
    </div>
  )
}
