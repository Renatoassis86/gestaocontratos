'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import styles from './CompetidoresSeccion.module.css'

export default function CompetidoresSeccion() {
  const empresas = [
    { name: 'Netflix', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg', tag: 'Cinematch' },
    { name: 'Amazon', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg', tag: 'Anticipatory Shipping' },
    { name: 'Capital One', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/capitalone.svg', tag: 'Information Strategy' },
    { name: 'Google', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', tag: 'People Operations' },
    { name: 'Walmart', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/walmart.svg', tag: 'Retail Link' },
    { name: 'UPS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ups.svg', tag: 'ORION' },
    { name: 'Progressive', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/progressive.svg', tag: 'Snapshot' },
    { name: 'Patriots', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nfl.svg', tag: 'Sport Analytics' }
  ]

  return (
    <section id="competidores" className={styles.section}>
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>O BENCHMARK MÁXIMO</div>
          <h2 className={styles.title}>A Elite dos Competidores Analíticos</h2>
          <p className={styles.description}>
            Empresas no Nível 5 utilizam a ciência de dados de forma ampla, sistemática e como sua principal vantagem sustentável. É esse patamar que a ARKOS ajuda você a pavimentar.
          </p>
        </div>

        {/* --- CAROUSEL MONOCRO --- */}
        <div className={styles.carouselWrapper}>
          <motion.div 
            animate={{ x: [0, -1200] }} 
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} 
            style={{ display: 'flex', gap: '60px', width: 'max-content' }}
          >
            {[...empresas, ...empresas].map((e, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={e.logo} 
                  alt={e.name} 
                  style={{ 
                    height: '40px', 
                    maxWidth: '160px', 
                    objectFit: 'contain', 
                    filter: 'brightness(0) invert(1)', 
                    opacity: 0.7 
                  }} 
                />
                <span style={{ color: '#C8F542', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {e.tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- O CASO NETFLIX --- */}
        <div className={styles.caseWrapper}>
          <div className={styles.caseGrid}>
            
            <div>
              <div style={{ color: '#C8F542', fontWeight: 800, fontSize: '0.8rem', marginBottom: '8px' }}>MISTÉRIO & DESEMPENHO</div>
              <h3 style={{ color: '#F4F2ED', fontSize: '2rem', fontWeight: 800, marginBottom: '16px', fontFamily: 'Sora, sans-serif' }}>O Caso Netflix</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Como um Competidor Analítico de Estágio 5, a Netflix substitui o instinto tradicional do entretenimento por decisões puramente baseadas em dados e testes quantitativos granulares.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Cinematch: Algoritmo que avalia milhares de classificações por segundo para personalizar a tela.',
                  'Atributos de Conteúdo: Antes de House of Cards, analisou 70 mil atributos de filmes para prever o sucesso.',
                  'Testes A/B em Massa: Realizam 1.000 testes anuais sobre o tempo exato de visualização de trailers.',
                  'Escala Massiva: Decisões dirigidas pela mensuração de 69.444 horas de vídeos transmitidos por minuto.'
                ].map((txt, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#C8F542" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#F4F2ED', fontSize: '0.9rem' }}>{txt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.caseStats}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.02)', position: 'absolute', top: -10, left: 40, userSelect: 'none' }}>DATA</div>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>1 Bi</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>feedbacks e opiniões avaliados</div>
                </div>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>70k</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>atributos analiticos do usuário</div>
                </div>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>1.000</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>experimentos A/B anuais</div>
                </div>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>69.4k h</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>de vídeos medidos por minuto</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
