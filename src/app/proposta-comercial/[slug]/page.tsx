import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/infrastructure/supabase/server'
import { PresentationViewer } from './PresentationViewer'
import { PresentationHeader } from './PresentationHeader'

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
      height: '100dvh',
      maxHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: '#0A0C0F',
      color: '#F4F2ED',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }}>
      <PresentationHeader
        nomeEmpresa={proposta.nome_empresa}
        gammaUrl={proposta.gamma_url}
      />

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
