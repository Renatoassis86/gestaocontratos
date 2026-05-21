'use client'

import { useRef, useState, useEffect } from 'react'
import { Play, Maximize2, Keyboard, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  gammaUrl: string
  nomeEmpresa: string
}

export function PresentationViewer({ gammaUrl, nomeEmpresa }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Esconde a dica após 6s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(t)
  }, [])

  async function iniciarApresentacao() {
    const target = wrapperRef.current
    if (!target) return
    try {
      await target.requestFullscreen()
      // Foca o iframe para receber inputs de teclado (setas) dentro do Gamma
      setTimeout(() => iframeRef.current?.focus(), 200)
    } catch (e) {
      console.warn('Fullscreen falhou, abrindo em nova aba', e)
      window.open(gammaUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Adiciona parâmetros sugestivos de modo apresentação ao URL (Gamma usa ?mode=present para apresentação)
  const presentationUrl = (() => {
    try {
      const u = new URL(gammaUrl)
      // Não força mode=present (depende do owner ter publicado em modo present),
      // mas se tiver suporte ?embed=true&hideControls=false, melhora UX
      u.searchParams.set('embed', 'true')
      return u.toString()
    } catch {
      return gammaUrl
    }
  })()

  // URL para abrir em nova aba diretamente no modo apresentação do Gamma
  const fullPresentUrl = gammaUrl.replace('/embed/', '/docs/') + '?mode=present'

  return (
    <div ref={wrapperRef} style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#0A0C0F',
    }}>
      <iframe
        ref={iframeRef}
        src={presentationUrl}
        title={`Proposta ARKOS — ${nomeEmpresa}`}
        allow="fullscreen; autoplay"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
      />

      {/* Botão flutuante "Iniciar Apresentação" */}
      {!isFullscreen && (
        <div style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          gap: 8,
          zIndex: 10,
        }}>
          <button
            onClick={iniciarApresentacao}
            title="Modo apresentação em tela cheia (use ← → para navegar)"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 18px',
              background: 'linear-gradient(135deg, #C8F542, #A8DB1F)',
              color: '#0A0C0F',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.82rem',
              boxShadow: '0 6px 20px rgba(200,245,66,0.35)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <Play size={14} fill="#0A0C0F" />
            <span>Iniciar Apresentação</span>
          </button>

          <a
            href={fullPresentUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir no Gamma em nova aba (modo present completo)"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '10px 12px',
              background: 'rgba(20,23,28,0.85)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#F4F2ED',
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Maximize2 size={14} />
          </a>
        </div>
      )}

      {/* Dica de navegação por teclado (aparece por alguns segundos) */}
      {showHint && (
        <div
          onClick={() => setShowHint(false)}
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 18px',
            background: 'rgba(20,23,28,0.92)',
            border: '1px solid rgba(200,245,66,0.25)',
            borderRadius: 99,
            color: '#F4F2ED',
            fontSize: '0.78rem',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            zIndex: 10,
            animation: 'fadeInUp .4s ease-out',
          }}
        >
          <Keyboard size={14} color="#C8F542" />
          <span>
            Use <kbd style={kbd}><ChevronLeft size={10} /></kbd> <kbd style={kbd}><ChevronRight size={10} /></kbd> para navegar entre slides · <kbd style={kbd}>ESC</kbd> sai do fullscreen
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  )
}

const kbd: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 22,
  height: 22,
  padding: '0 6px',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 5,
  fontSize: '0.7rem',
  fontWeight: 700,
  fontFamily: 'ui-monospace, monospace',
  color: '#F4F2ED',
  margin: '0 2px',
}
