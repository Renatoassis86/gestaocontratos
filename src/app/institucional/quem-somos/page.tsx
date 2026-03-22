"use client"
import { Users, Target } from 'lucide-react'
import styles from '../../page.module.css'

export default function QuemSomos() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_success_woman.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Especialistas em</span> performance <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px' }}>QUEM SOMOS</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.2' }}>Engenheiros da decisão executiva.</h1>
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>Somos uma equipe obcecada por eficiência. Nasce da frustração com os antiquados serviços de consultoria e ferramentas limitadas (como BIs isolados) que entregam apenas reflexos do passado. Nossa cultura é erguer pontes automáticas para o futuro corporativo operando dados em tempo real com matemática rigorosa.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px' }}>
              <Target size={24} color="#C8F542" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Nosso Norte</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>Acabar com o "achismo" gerencial e democratizar o Letramento Analítico nas diretorias.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
