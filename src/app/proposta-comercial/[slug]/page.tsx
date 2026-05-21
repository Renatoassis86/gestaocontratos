import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { propostaSignOut } from '../actions'
import { ArrowLeft, LogOut } from 'lucide-react'
import { PresentationViewer } from './PresentationViewer'
import { PresentationControls } from './PresentationControls'

const COOKIE_NAME = 'proposta_session'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PropostaDoCliente({ params }: Props) {
  const { slug } = await params

  const cookieStore = await cookies()
  const sessionSlug = cookieStore.get(COOKIE_NAME)?.value

  if (!sessionSlug || sessionSlug !== slug) {
    redirect('/proposta-comercial')
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('obter_proposta_por_slug', { p_slug: slug })

  if (error || !data || data.length === 0) {
    redirect('/proposta-comercial?error=' + encodeURIComponent('Proposta não encontrada ou inativa.'))
  }

  const proposta = data[0] as { slug: string; nome_empresa: string; gamma_url: string }

  const HEADER_HEIGHT = 56

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      // 100dvh evita "buracos pretos" em mobile/desktop quando a barra de URL recolhe
      // e fallback para 100vh em browsers antigos
      height: '100dvh',
      maxHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0A0C0F',
      color: '#F4F2ED',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }}>
      {/* Header fixo no topo (item flex de altura fixa) */}
      <header style={{
        flex: `0 0 ${HEADER_HEIGHT}px`,
        height: HEADER_HEIGHT,
        padding: '0 20px',
        background: 'rgba(10,12,15,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
        zIndex: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'rgba(244,242,237,0.6)', textDecoration: 'none', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
            <ArrowLeft size={13} />
            <span>Site</span>
          </Link>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
          <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: 22, flexShrink: 0 }} />
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px',
            background: 'rgba(200,245,66,0.08)',
            border: '1px solid rgba(200,245,66,0.25)',
            borderRadius: 99,
            fontSize: '0.58rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#C8F542',
            fontFamily: 'monospace',
            flexShrink: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            Proposta · {proposta.nome_empresa}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <PresentationControls gammaUrl={proposta.gamma_url} />
          <form action={propostaSignOut} style={{ display: 'inline' }}>
            <button type="submit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '7px 12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 8, color: '#FCA5A5',
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
            }}>
              <LogOut size={12} />
              <span>Sair</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main — ocupa todo o espaço restante; minHeight:0 é crucial para
          que o filho com height:100% calcule a altura corretamente em flexbox */}
      <main style={{
        flex: '1 1 auto',
        minHeight: 0,
        display: 'flex',
        position: 'relative',
      }}>
        <PresentationViewer
          gammaUrl={proposta.gamma_url}
          nomeEmpresa={proposta.nome_empresa}
        />
      </main>
    </div>
  )
}
