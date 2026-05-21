'use client'

import { useRef, useState, useEffect } from 'react'
import { Keyboard, ChevronLeft, ChevronRight } from 'lucide-react'

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

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={wrapperRef}
      data-viewer-wrapper
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0A0C0F',
        overflow: 'hidden',
      }}
    >
      <iframe
        ref={iframeRef}
        src={gammaUrl}
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

      {showHint && !isFullscreen && (
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
            padding: '8px 16px',
            background: 'rgba(20,23,28,0.92)',
            border: '1px solid rgba(200,245,66,0.25)',
            borderRadius: 99,
            color: '#F4F2ED',
            fontSize: '0.75rem',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
            zIndex: 10,
            animation: 'fadeInUp .4s ease-out',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <Keyboard size={13} color="#C8F542" />
          <span>
            <kbd style={kbd}><ChevronLeft size={9} /></kbd> <kbd style={kbd}><ChevronRight size={9} /></kbd> navegam slides
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        html, body { overflow: hidden !important; }
      `}</style>
    </div>
  )
}

const kbd: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 20,
  height: 20,
  padding: '0 5px',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 4,
  fontSize: '0.66rem',
  fontWeight: 700,
  fontFamily: 'ui-monospace, monospace',
  color: '#F4F2ED',
  margin: '0 2px',
}
