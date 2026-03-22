"use client"
import { Shield, Database, Cpu } from 'lucide-react'
import styles from '../../page.module.css'

export default function OQueEArkos() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>O verdadeiro</span> Software Corporation <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px' }}>O QUE É A ARKOS</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.2' }}>A infraestrutura de inteligência da nova economia.</h1>
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>A ARKOS não é apenas um dashboard ou um sistema solto. É a espinha dorsal analítica e operacional do seu negócio. Nós reestruturamos ativamente a forma como as corporações lidam com o grande volume de dados dispersos (em ERPs, CRMs, planilhas), aplicando regras de negócios para limpar, processar e devolver insights automáticos e assertivos.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px' }}>
              <Database size={24} color="#C8F542" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Unificação de Datasets</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>Conectamos tudo em um Datalake central, destruindo os silos institucionais.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
