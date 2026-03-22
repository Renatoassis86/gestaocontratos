"use client"
import { Briefcase, Key } from 'lucide-react'
import styles from '../../page.module.css'

export default function ConhecaEquipe() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("https://images.unsplash.com/photo-1552664688-cf412ec27db2?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Especialistas em</span> performance <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px' }}>CONHEÇA NOSSA EQUIPE</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.2' }}>Mentes analíticas, coração em operações reais.</h1>
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>A ARKOS nasceu na interseção de engenheiros de machine learning, CFOs de mercado de capitais e diretores operacionais. Os construtores desse núcleo reúnem profunda teoria econométrica com o "chão de fábrica" das vendas e da produtividade.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px' }}>
              <Key size={24} color="#C8F542" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Conselho Multi-Disciplinar</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>Não terceirizamos a capacidade técnica. A arquitetura de inteligência é nossa arte principal.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
