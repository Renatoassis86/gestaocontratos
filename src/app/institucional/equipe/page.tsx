"use client"
import { ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ConhecaEquipe() {
  return (
    <div style={{ background: '#0A0C0F', minHeight: '100vh', paddingTop: '100px', fontFamily: "'Inter', sans-serif", color: '#F4F2ED' }}>
      
      {/* ── NAVEGAÇÃO SUPERIOR ── */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 40px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8A8F99', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <ArrowLeft size={16} />
          Voltar para Home
        </Link>
      </div>

      {/* ── HERO ── */}
      <div style={{ textAlign: 'center', padding: '0 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(200,245,66,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,245,66,0.02) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.2)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8F542', display: 'inline-block' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: '#C8F542', letterSpacing: '0.12em', fontWeight: 800 }}>FUNDADOR & IDEALIZADOR</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: '#F4F2ED', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '24px' }}>
            A visão por trás da <span style={{ color: '#C8F542' }}>Arkos</span>.
          </h1>
          <p style={{ color: '#8A8F99', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
            Conheça o estrategista que une economia aplicada, ciência de dados e gestão executiva para transformar o C-Level.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 100px' }}>
        
        {/* ── CARD FUNDADOR ÚNICO ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ 
            background: '#111318', 
            borderRadius: '32px', 
            border: '1px solid rgba(255,255,255,0.05)', 
            overflow: 'hidden', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
          }}
        >
          {/* Foto com Efeito de Arco */}
          <div style={{ position: 'relative', background: '#090a0c', minHeight: '520px', overflow: 'hidden' }}>
            {/* Badge */}
            <div style={{ 
              position: 'absolute', top: '24px', left: '24px', background: '#2D63ED', color: '#FFF', 
              fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', padding: '10px 18px', 
              borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10,
              boxShadow: '0 4px 12px rgba(45, 99, 237, 0.4)'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Conheça-nos
            </div>

            <img 
              src="/renato_assis_co.jpg" 
              alt="Renato Silva de Assis" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                objectPosition: 'top center',
                borderRadius: '0 0 500px 500px', /* O efeito de arco solicitado */
                display: 'block'
              }} 
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(9,10,12,0.9), transparent)' }} />
          </div>

          {/* Bio Completa */}
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F4F2ED', lineHeight: 1.1, margin: '0 0 8px 0' }}>
                Renato Silva <span style={{ color: '#C8F542' }}>de Assis</span>
              </h2>
              <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#C8F542', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 800 }}>
                CEO · Founder · Strategist
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#8A8F99', fontSize: '0.95rem', lineHeight: 1.8 }}>
              <p>
                Economista (UFPB), Mestre em Economia Regional (UFRN) e bacharel em Ciências de Dados para Negócios. Com <strong style={{ color: '#F4F2ED' }}>mais de 16 anos como supervisor técnico do DIEESE</strong> (PB e RN), especializou-se em análise de mercado de trabalho, conjuntura econômica e pesquisa socioeconômica de alta complexidade.
              </p>
              <p>
                Fundador da Econsult — consultoria de planejamento estratégico, gestão financeira e perícia contábil. Atualmente gerente de sistema no Cidade Viva Education e professor de pós-graduação na FICV.
              </p>
              <p>
                Criou a Arkos Intelligence para transformar décadas de expertise analítica e visão sistêmica em infraestrutura tecnológica de alto impacto e governança de dados para o C-Level moderno.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '10px' }}>
              <a href="https://linkedin.com/in/renatoassis" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{ background: '#C8F542', color: '#0A0C0F', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  LinkedIn Profile <ExternalLink size={14} />
                </button>
              </a>
              <a href="https://wa.me/5583981957737" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{ background: 'transparent', color: '#FFF', padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <MessageCircle size={14} /> Falar com Renato
                </button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── CITATION ── */}
        <div style={{ marginTop: '120px', textAlign: 'center' }}>
          <p style={{ color: '#F4F2ED', fontSize: '1.6rem', fontWeight: 300, lineHeight: 1.6, fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
            "A tecnologia pela tecnologia não se sustenta: ela precisa gerar <strong style={{ color: '#C8F542' }}>bem-estar real</strong> e valor de escala. Cada linha de código deve servir a um propósito econômico e humano."
          </p>
        </div>

      </div>
    </div>
  )
}
