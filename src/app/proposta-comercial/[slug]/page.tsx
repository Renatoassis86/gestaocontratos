import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { propostaSignOut } from '../actions'
import { ArrowLeft, LogOut } from 'lucide-react'
import { PresentationViewer } from './PresentationViewer'
import { PresentationControls } from './PresentationControls'
import styles from './presentation-header.module.css'

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
      {/* Header fixo no topo — layout responsivo via CSS module */}
      <header className={styles.header}>
        <div className={styles.left}>
          <Link href="/" className={styles.backLink} aria-label="Voltar ao site">
            <ArrowLeft size={13} />
            <span>Site</span>
          </Link>
          <div className={styles.divider} />
          <img src="/logo-high-res.svg" alt="ARKOS" className={styles.logo} />
          <div className={styles.empresaBadge} title={`Proposta · ${proposta.nome_empresa}`}>
            <span className={styles.empresaPrefix}>Proposta · </span>
            <span className={styles.empresaNome}>{proposta.nome_empresa}</span>
          </div>
        </div>

        <div className={styles.right}>
          <PresentationControls gammaUrl={proposta.gamma_url} />
          <form action={propostaSignOut} style={{ display: 'inline' }}>
            <button type="submit" className={styles.btnDanger} aria-label="Sair">
              <LogOut size={12} />
              <span className={styles.label}>Sair</span>
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
