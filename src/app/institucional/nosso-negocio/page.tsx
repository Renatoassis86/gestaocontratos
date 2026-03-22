"use client"
import { Landmark, TrendingUp } from 'lucide-react'
import styles from '../../page.module.css'

export default function NossoNegocio() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_corporate_perf_woman.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Evoluindo a sua</span> corporação <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px' }}>NOSSO NEGÓCIO</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.2' }}>Reengenharia de performance em larga escala.</h1>
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>Entregamos o ecossistema tecnológico completo atrelado aos Serviços Consultivos Nativos. Da ingestão passiva ao modelo preditivo que afeta a P&L: cobrimos redução da fricção em contratos via Smart Contracts, aumento do LTV através de Growth Modeling, e o hub formativo Arkos Academy para os seus funcionários.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px' }}>
              <TrendingUp size={24} color="#C8F542" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Modelo Fiduciário de Negócios</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>O nosso core-business é colocar a sua empresa nas rédeas do crescimento previsível e imune a choques brutos.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
