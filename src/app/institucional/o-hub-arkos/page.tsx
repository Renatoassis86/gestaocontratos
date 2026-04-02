"use client"
import { Grid, MousePointer2, Smartphone, Terminal, Package, Laptop } from 'lucide-react'
import styles from '../../page.module.css'

export default function OHubArkos() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_hub_dashboard_interface_1775141882974.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Elegância na sua</span> operação <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>HUB · INTERFACE · CONTROL</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Hub Arkos: <br/>O Seu Posto de Comando Digital.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            O Hub Arkos é a materialização da <strong style={{ color: '#F4F2ED' }}>Inteligência Centralizada</strong>. Uma interface de alto padrão desenhada para ser intuitiva para executivos e poderosa para analistas. A partir de um único login, você acessa todos os seus ativos digitais, de dashboards de BI a ferramentas de colaboração em tempo real, garantindo que toda a empresa esteja operando em uníssono.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Laptop size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Unified Dashboard</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Uma visão panorâmica de todos os indicadores de performance (KPIs) vitais da corporação, atualizados a cada segundo.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Smartphone size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Acesso Ubíquo</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Toda a sua infraestrutura analítica no seu bolso, com interfaces otimizadas para experiências móveis de alto luxo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
