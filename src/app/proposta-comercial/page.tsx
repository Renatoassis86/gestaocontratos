import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ArrowLeft, Briefcase } from 'lucide-react'
import { LoginForm } from './LoginForm'

const COOKIE_NAME = 'proposta_session'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function PropostaComercialLogin({ searchParams }: Props) {
  const params = await searchParams
  const errorMsg = params.error ?? ''

  // Se já tem sessão ativa, vai direto para a proposta
  const cookieStore = await cookies()
  const slug = cookieStore.get(COOKIE_NAME)?.value
  if (slug) redirect(`/proposta-comercial/${slug}`)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0C0F 0%, #14171C 100%)',
      display: 'flex',
      flexDirection: 'column',
      color: '#F4F2ED',
      fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    }}>
      {/* Glow decorativo */}
      <div style={{
        position: 'fixed', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(200,245,66,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: -100, right: -100,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Header */}
      <header style={{
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'rgba(244,242,237,0.7)', textDecoration: 'none',
          fontSize: '0.85rem', fontWeight: 500,
          transition: 'color 0.2s',
        }}>
          <ArrowLeft size={16} />
          <span>Voltar ao site</span>
        </Link>
        <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: 32 }} />
      </header>

      {/* Main */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          width: '100%', maxWidth: 460,
          background: 'rgba(20, 23, 28, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: '40px 36px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Badge */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 12px',
              background: 'rgba(200,245,66,0.08)',
              border: '1px solid rgba(200,245,66,0.25)',
              borderRadius: 99,
              fontSize: '0.688rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#C8F542', marginBottom: 20,
              fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
            }}>
              <Briefcase size={11} />
              <span>Acesso do Cliente</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              fontSize: '2rem',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: 12,
              color: '#F4F2ED',
            }}>
              Proposta de Trabalho<br />
              <span style={{ color: '#C8F542', fontStyle: 'italic', fontWeight: 800 }}>Customizada</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              color: 'rgba(244,242,237,0.6)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 400,
            }}>
              Acesse sua proposta exclusiva preparada pela ARKOS.
            </p>
          </div>

          <LoginForm initialError={errorMsg} />
        </div>
      </main>
    </div>
  )
}
