'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, LogOut, Play, Maximize2 } from 'lucide-react'
import { propostaSignOut } from '../actions'

interface Props {
  nomeEmpresa: string
  gammaUrl: string
}

export function PresentationHeader({ nomeEmpresa, gammaUrl }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const fullPresentUrl = gammaUrl.replace('/embed/', '/docs/') + '?mode=present'

  async function iniciarApresentacao() {
    const el = document.querySelector('[data-viewer-wrapper]') as HTMLElement | null
    if (!el) return
    try {
      await el.requestFullscreen()
    } catch {
      window.open(fullPresentUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Antes do mount, renderiza placeholder neutro para evitar hydration mismatch
  if (!mounted) {
    return (
      <header style={baseHeader}>
        <div style={{ flex: 1 }} />
      </header>
    )
  }

  if (isMobile) {
    return (
      <header style={baseHeader}>
        {/* Logo */}
        <img
          src="/logo-high-res.svg"
          alt="ARKOS"
          style={{ height: 20, flexShrink: 0 }}
        />

        {/* Nome empresa truncado, ocupando o espaço restante */}
        <div
          title={nomeEmpresa}
          style={{
            flex: '1 1 auto',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'rgba(244,242,237,0.85)',
            padding: '0 4px',
          }}
        >
          {nomeEmpresa}
        </div>

        {/* Play (ícone-só, 40x40) */}
        <button
          type="button"
          onClick={iniciarApresentacao}
          aria-label="Iniciar Apresentação"
          title="Iniciar Apresentação"
          style={iconBtnPrimary}
        >
          <Play size={16} fill="#0A0C0F" />
        </button>

        {/* Sair (ícone-só, 40x40) */}
        <form action={propostaSignOut} style={{ display: 'inline-flex', flexShrink: 0 }}>
          <button
            type="submit"
            aria-label="Sair"
            title="Sair"
            style={iconBtnDanger}
          >
            <LogOut size={15} />
          </button>
        </form>
      </header>
    )
  }

  // ── DESKTOP ──────────────────────────────────────────────
  return (
    <header style={{ ...baseHeader, padding: '0 20px', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            color: 'rgba(244,242,237,0.6)',
            textDecoration: 'none',
            fontSize: '0.78rem',
            whiteSpace: 'nowrap',
          }}
        >
          <ArrowLeft size={13} />
          <span>Site</span>
        </Link>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
        <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: 22, flexShrink: 0 }} />
        <div style={badgeDesktop}>Proposta · {nomeEmpresa}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
        <button
          type="button"
          onClick={iniciarApresentacao}
          title="Tela cheia · use ← → para navegar"
          style={btnPrimaryDesktop}
        >
          <Play size={12} fill="#0A0C0F" />
          <span>Iniciar Apresentação</span>
        </button>
        <a
          href={fullPresentUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir no Gamma em nova aba"
          style={btnGhostDesktop}
        >
          <Maximize2 size={13} />
        </a>
        <form action={propostaSignOut} style={{ display: 'inline' }}>
          <button type="submit" style={btnDangerDesktop}>
            <LogOut size={12} />
            <span>Sair</span>
          </button>
        </form>
      </div>
    </header>
  )
}

// ── styles ────────────────────────────────────────────────
const baseHeader: React.CSSProperties = {
  flex: '0 0 56px',
  height: 56,
  padding: '0 12px',
  background: 'rgba(10,12,15,0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  zIndex: 20,
}

const iconBtnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  flexShrink: 0,
  padding: 0,
}

const iconBtnPrimary: React.CSSProperties = {
  ...iconBtnBase,
  background: 'linear-gradient(135deg, #C8F542, #A8DB1F)',
  color: '#0A0C0F',
  boxShadow: '0 4px 12px rgba(200,245,66,0.25)',
}

const iconBtnDanger: React.CSSProperties = {
  ...iconBtnBase,
  background: 'rgba(239,68,68,0.12)',
  border: '1px solid rgba(239,68,68,0.28)',
  color: '#FCA5A5',
}

const badgeDesktop: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '3px 10px',
  background: 'rgba(200,245,66,0.08)',
  border: '1px solid rgba(200,245,66,0.25)',
  borderRadius: 99,
  fontSize: '0.58rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#C8F542',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  flexShrink: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const btnPrimaryDesktop: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
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
  whiteSpace: 'nowrap',
}

const btnGhostDesktop: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '7px 10px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  color: '#F4F2ED',
  textDecoration: 'none',
}

const btnDangerDesktop: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '7px 12px',
  background: 'rgba(239,68,68,0.1)',
  border: '1px solid rgba(239,68,68,0.25)',
  borderRadius: 8,
  color: '#FCA5A5',
  fontSize: '0.75rem',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}
