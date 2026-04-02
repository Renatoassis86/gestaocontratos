"use client"
import { Award, Star, Zap, Diamond, Trophy, Briefcase } from 'lucide-react'
import styles from '../../page.module.css'

export default function Diferencial() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_arche_differentiation_1775141910767.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>O Princípio da</span> Excelência <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>DIFFERENTIAL · VALUE · ARCHÉ</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Diferencial: <br/>O DNA da Nova Economia Analítica.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            O que separa a Arkos Intelligence de qualquer outra solução de software é o nosso <strong style={{ color: '#F4F2ED' }}>Compromisso com o Princípio (Arché)</strong>. Não entregamos apenas código; entregamos clareza e poder de comando. Operamos na intersecção entre a ciência econômica rigorosa e a engenharia de precisão, garantindo uma proteção institucional que outras ferramentas simplesmente não alcançam.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Diamond size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Exclusividade Técnica</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Desenvolvemos algoritmos próprios e proprietários que analisam integridade econométrica de forma única no mercado.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Zap size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Velocidade de Execução</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Reduzimos semanas de análise manual em milissegundos de processamento automatizado de alta fidelidade.
              </p>
            </div>
            
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Briefcase size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Foco no Fundador</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Nossa ferramenta é projetada pensando na paz de espírito e liberdade decisória do dono do negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
