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
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.2' }}>Mais que software. O princípio gerador da sua empresa.</h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '24px' }}>
            A palavra <strong>ARKOS</strong> tem origem no conceito grego de <em>Arché</em> (ἀρχή), que para os filósofos socráticos significava "o princípio fundamental", a origem comandante, a força subjacente e imutável que estrutura todas as coisas no universo.
          </p>

          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px' }}>
            Trazendo isso para a nova economia, a ARKOS atua exatamente como esse princípio gerador para negócios de alta performance. Nós não somos apenas mais um painel de BI ou um sistema isolado. Nós nos tornamos a espinha dorsal analítica e operacional da sua operação, estruturando o caos de informações espalhadas (em ERPs, CRMs e planilhas) e transformando a raiz do seu fluxo de dados na fonte de decisões mais segura e assertiva que uma liderança pode ter.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Database size={24} color="#C8F542" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>O Único Ponto de Verdade (SSOT)</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>Conectamos tudo em um ecossistema unificado, destruindo os silos institucionais. Um sistema operando em nuvem com rigor econométrico, desenhado para que sua empresa ganhe imunidade aos achismos metodológicos e blinde seu futuro corporativo.</span>
              </div>
            </div>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Shield size={24} color="#C8F542" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Imunidade Analítica Corporativa</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>Deixamos o achismo no passado. Toda decisão – orçamentária, educacional ou mercadológica – passa a ser amparada pelo cruzamento estatístico da sua "Arché" de dados, transformando risco em governança previsível.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
