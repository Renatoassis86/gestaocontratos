import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'

export default function InstitucionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#FFF' }}>
      <header style={{ padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: '#8A8F99', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s' }}>
          <ArrowLeft size={16} /> Voltar ao Início
        </Link>
        <Link href="/">
          <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: '32px' }} />
        </Link>
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
