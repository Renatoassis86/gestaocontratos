"use client"
import { Users, Target, CheckCircle2, Award, Briefcase, Glasses } from 'lucide-react'
import styles from '../../page.module.css'

export default function QuemSomos() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div className={styles.solucaoHero}>
        <div className={styles.videoArchWrapper}>
          <div className={styles.videoArchContainer} style={{ background: 'url("/arkos_decision_engineers_1775140677941.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div className={styles.videoBtmBadge}>
             <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>Especialistas em</span> performance <span style={{ color: '#C8F542' }}>&rarr;</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '2px', marginBottom: '16px', fontWeight: 800 }}>ENGINEERS · ANALYSTS · DECISION</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: '#F4F2ED', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Quem Somos: <br/>Engenheiros da Decisão Executiva.
          </h1>
          
          <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.9', marginBottom: '32px' }}>
            Nascemos da convergência entre o rigor acadêmico da ciência econômica e a precisão tecnológica da análise de dados de alta escala. Fundada por <strong style={{ color: '#F4F2ED' }}>Renato Assis</strong>, a Arkos Intelligence não é uma empresa de TI convencional, mas um núcleo de inteligência focado em orquestrar a excelência corporativa. Nossa equipe respira o compromisso de traduzir a complexidade de milhões de dados em caminhos límpidos de rentabilidade e governança.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Target size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>Nossa Cultura</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Temos uma cultura obcecada por eliminar o "achismo" gerencial. Acreditamos que uma empresa só é verdadeiramente livre quando suas decisões são amparadas por evidências indiscutíveis e processos auditáveis.
              </p>
            </div>

            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>O Time Arkos</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                A Arkos é o resultado da colaboração entre especialistas multidisciplinares em economia analítica, engenharia de software e ciência de dados. Um coletivo dedicado a construir ferramentas que empoderam seres humanos, não que os substituem.
              </p>
            </div>
            
            <div style={{ padding: '24px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(200,245,66,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={22} color="#C8F542" />
              </div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.125rem', marginBottom: '12px' }}>O Compromisso</h3>
              <p style={{ color: '#8A8F99', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Nosso compromisso é com a verdade dos dados e a fluidez dos processos. Entregamos clareza onde outros entregarão ruído, transformando a gestão de contratos e a performance em ativos estratégicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
