import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { propostaSignOut } from '../actions'
import { ArrowLeft, LogOut, ExternalLink } from 'lucide-react'

const COOKIE_NAME = 'proposta_session'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PropostaDoCliente({ params }: Props) {
  const { slug } = await params

  // Verifica cookie de sessão e que bate com o slug da URL
  const cookieStore = await cookies()
  const sessionSlug = cookieStore.get(COOKIE_NAME)?.value

  if (!sessionSlug || sessionSlug !== slug) {
    redirect('/proposta-comercial')
  }

  // Carrega dados da proposta (via RPC com SECURITY DEFINER)
  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('obter_proposta_por_slug', { p_slug: slug })

  if (error || !data || data.length === 0) {
    redirect('/proposta-comercial?error=' + encodeURIComponent('Proposta não encontrada ou inativa.'))
  }

  const proposta = data[0] as { slug: string; nome_empresa: string; gamma_url: string }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0C0F',
      color: '#F4F2ED',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header compacto */}
      <header style={{
        padding: '14px 24px',
        background: 'rgba(20,23,28,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(244,242,237,0.6)', textDecoration: 'none', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} />
            <span>Site</span>
          </Link>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />
          <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: 26 }} />
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px',
            background: 'rgba(200,245,66,0.08)',
            border: '1px solid rgba(200,245,66,0.25)',
            borderRadius: 99,
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#C8F542',
            fontFamily: 'monospace',
          }}>
            Proposta · {proposta.nome_empresa}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <a href={proposta.gamma_url} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 14px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, color: '#F4F2ED', textDecoration: 'none',
            fontSize: '0.78rem', fontWeight: 600,
          }}>
            <ExternalLink size={13} />
            <span>Abrir em tela cheia</span>
          </a>
          <form action={propostaSignOut}>
            <button type="submit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 14px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 8, color: '#FCA5A5',
              fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            }}>
              <LogOut size={13} />
              <span>Sair</span>
            </button>
          </form>
        </div>
      </header>

      {/* Embed Gamma */}
      <main style={{ flex: 1, position: 'relative', minHeight: 'calc(100vh - 60px)' }}>
        <iframe
          src={proposta.gamma_url}
          title={`Proposta ARKOS — ${proposta.nome_empresa}`}
          allow="fullscreen"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            border: 'none',
          }}
        />
      </main>
    </div>
  )
}
