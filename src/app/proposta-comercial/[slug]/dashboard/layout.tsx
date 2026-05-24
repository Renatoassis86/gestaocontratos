import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { DashboardSidebar } from './_components/DashboardSidebar'
import styles from './_styles.module.css'

const COOKIE_NAME = 'proposta_session'
const SLUGS_AUTORIZADOS = new Set(['mevos'])

export const dynamic = 'force-dynamic'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function DashboardLayout({ children, params }: Props) {
  const { slug } = await params

  // Hardcoded para o MVP: dashboard só existe para Mevos.
  // Quando virar framework, validar via tabela dashboards_cliente.
  if (!SLUGS_AUTORIZADOS.has(slug)) {
    notFound()
  }

  // Gate: cookie de sessão precisa existir e bater com o slug da URL.
  const cookieStore = await cookies()
  const sessionSlug = cookieStore.get(COOKIE_NAME)?.value
  if (!sessionSlug || sessionSlug !== slug) {
    redirect('/proposta-comercial')
  }

  return (
    <div className={styles.shell}>
      <DashboardSidebar slug={slug} />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
