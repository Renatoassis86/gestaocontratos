"use client"
import { Briefcase, Key, GraduationCap, MapPin, Code2 } from 'lucide-react'
import styles from '../../page.module.css'

export default function ConhecaEquipe() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px', textAlign: 'center' }}>CONHEÇA NOSSA EQUIPE</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '64px', lineHeight: '1.2', textAlign: 'center' }}>Mentes analíticas construindo o futuro da gestão.</h1>

      <div className={styles.solucaoHero}>
        {/* Foto de Renato com efeito */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#090a0c', height: '100%', minHeight: '600px' }}>
          {/* Instrução: salve a foto enviada na raiz da pasta public/  com o nome "renato-assis.jpg" */}
          <div style={{ background: 'url("/renato-assis.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', opacity: 0.9 }}>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
            <h2 style={{ color: '#FFF', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Renato Assis</h2>
            <p style={{ color: '#C8F542', fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '1px', margin: '8px 0 0 0' }}>FOUNDER & CIENTISTA DE DADOS</p>
          </div>
        </div>

        {/* Bio Renato */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '16px' }}>A ciência econômica aplicada à produtividade diária.</h3>
            <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8', marginBottom: '16px' }}>
              Com mais de uma década e meia atuando como supervisor técnico do DIEESE (PB e RN), Renato traz para a ARKOS uma bagagem ímpar de pesquisa em demografia, mercado de trabalho e análises socioeconômicas complexas. 
            </p>
            <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: '1.8' }}>
              Economista por formação e apaixonado pelo rigor analítico, fundou também a Econsult, aplicando planejamento estratégico, gestão financeira e desenvolvimento organizacional na prática do mercado privado. Hoje, lidera a visão de arquitetura de dados e de expansão tecnológica da ARKOS Ecosystems.
            </p>
          </div>
          
          {/* Tags de Formação / Origem */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
             <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <GraduationCap size={24} color="#C8F542" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Formação Acadêmica (UFPB / UFRN)</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>Bacharel em C. Econômicas e Mestre em Economia Regional. Graduando em Ciência de Dados para Negócios e Pós em Educação Cristã Clássica pela FICV.</span>
              </div>
            </div>
            <div style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Code2 size={24} color="#C8F542" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>Stack Tecnológica & Dados</strong>
                <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>SPSS, Stata, R, SQL, Python, Pandas, Power BI, IA Generativa aplicada à Gestão e Modelagem de Data Warehouse (BI).</span>
              </div>
            </div>
          </div>

          {/* Visão de Trabalho */}
          <div style={{ padding: '24px', background: 'rgba(200,245,66,0.02)', borderRadius: '12px', border: '1px solid rgba(200,245,66,0.1)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#C8F542', marginBottom: '12px' }}>A Motivação Arkos</div>
            <p style={{ color: '#F4F2ED', fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic' }}>
              "A prioridade sempre foi construir processos com pessoas e para pessoas. A tecnologia pela tecnologia não se sustenta; ela precisa gerar impacto de escala, agregar o máximo de valor e melhorar o bem-estar dos times. Na Arkos, transformamos gestão fragmentada em poder de decisão perfeitamente orquestrado."
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
