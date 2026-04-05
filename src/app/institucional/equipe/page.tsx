"use client"
import { GraduationCap, Code2, Briefcase, Users, Star, MapPin, BookOpen, Target } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ConhecaEquipe() {
  const equipe = [
    {
      nome: 'Renato Silva de Assis',
      cargo: 'CEO & Founder',
      specialty: 'Strategy & Data Science',
      foto: '/renato_assis_co.jpg',
      bio: 'Economista, Mestre em Economia Regional e Cientista de Dados. Idealizador da Arkos, une 16 anos de expertise analítica à arquitetura de dados corporativos.',
      linkedin: 'https://linkedin.com/in/renatoassis'
    },
    {
      nome: 'Emmanuel Peixoto',
      cargo: 'Co-Founder',
      specialty: 'Technology & Architecture',
      foto: '/arkos_team_emanuel.png',
      bio: 'Arquiteto de sistemas focado em escalabilidade e microsserviços. Garante a robustez técnica e a fluidez do ecossistema de dados Arkos.',
      linkedin: '#'
    },
    {
      nome: 'Gabriel Mamede',
      cargo: 'Co-Founder',
      specialty: 'Analytics & Modelagem',
      foto: '/arkos_team_gabriel.png',
      bio: 'Especialista em inteligência de dados e modelagem econométrica. Sua missão é transformar fluxos complexos em auditoria diagnóstica precisa.',
      linkedin: '#'
    },
    {
      nome: 'Julio Cesar',
      cargo: 'Co-Founder',
      specialty: 'Inteligência de Mercado',
      foto: '/arkos_team_julio.png',
      bio: 'Estrategista de mercado focado em posicionamento e competitividade. Conecta a infraestrutura Arkos às necessidades reais do C-Level.',
      linkedin: '#'
    },
    {
      nome: 'Lucas AI',
      cargo: 'Co-Founder',
      specialty: 'AI & Advanced Analytics',
      foto: '/arkos_team_lucas_ai.png',
      bio: 'Lidera a integração de IA generativa e agentes autônomos no hub, elevando a automação cognitiva a um patamar estratégico.',
      linkedin: '#'
    },
    {
      nome: 'Wiliam',
      cargo: 'Co-Founder',
      specialty: 'Security & Infrastructure',
      foto: '/arkos_preview.png', // Generic fallback as per previous check
      bio: 'Especialista em segurança cibernética e infraestrutura em nuvem. Blindagem de dados e conformidade técnica são seus pilares na Arkos.',
      linkedin: '#'
    }
  ]

  const experiences = [
    // ... existing experiences for Renato or general? 
    // Actually, I'll keep the experiences section but maybe generalize it or keep it as Renato's for now since he is the main Founder.
  ]

  return (
    <div style={{ background: '#0A0C0F', minHeight: '100vh', paddingTop: '80px', fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{ textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(200,245,66,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,245,66,0.025) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(200,245,66,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.2)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8F542', display: 'inline-block' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: '#C8F542', letterSpacing: '0.12em', fontWeight: 800 }}>A EQUIPE DE CO-CRIADORES</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.5rem)', fontWeight: 900, color: '#F4F2ED', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            As mentes por trás da <span style={{ color: '#C8F542' }}>Arkos</span>.
          </h1>
          <p style={{ color: '#8A8F99', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
            Uma sinergia entre Economia Aplicada, Ciência de Dados e Engenharia de Software focada em desatar gargalos corporativos.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 120px' }}>
        
        {/* ── GRID DA EQUIPE ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '100px' }}>
          {equipe.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '32px', background: '#111318', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(200,245,66,0.2)', flexShrink: 0 }}>
                  <img src={m.foto} alt={m.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ color: '#F4F2ED', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{m.nome}</h3>
                  <div style={{ color: '#C8F542', fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{m.cargo}</div>
                  <div style={{ color: '#5A5F6A', fontSize: '0.75rem', marginTop: '2px' }}>{m.specialty}</div>
                </div>
              </div>
              <p style={{ color: '#8A8F99', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '20px', minHeight: '80px' }}>{m.bio}</p>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#5A5F6A', fontFamily: 'monospace' }}>© ARKOS 2026</span>
                <a href={m.linkedin} target="_blank" style={{ color: '#C8F542', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>LinkedIn →</a>
              </div>
              
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,245,66,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </motion.div>
          ))}
        </div>

        {/* ── QUOTE DE FOUNDER ── */}
        <div style={{ maxWidth: '800px', margin: '0 auto 100px', textAlign: 'center' }}>
          <div style={{ padding: '60px 40px', background: 'linear-gradient(135deg, rgba(200,245,66,0.05) 0%, transparent 100%)', borderRadius: '24px', border: '1px solid rgba(200,245,66,0.1)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '100px', color: 'rgba(200,245,66,0.05)', fontFamily: 'serif', lineHeight: 1 }}>“</span>
            <p style={{ color: '#F4F2ED', fontSize: '1.4rem', fontWeight: 300, lineHeight: 1.7, fontStyle: 'italic', margin: 0, position: 'relative', zIndex: 1 }}>
              A tecnologia pela tecnologia não se sustenta: ela precisa gerar <strong style={{ color: '#C8F542' }}>bem-estar real</strong> e valor de escala. Na Arkos, cada linha de código serve a um propósito econômico e humano.
            </p>
            <div style={{ marginTop: '32px', color: '#8A8F99', fontSize: '0.9rem', fontFamily: 'monospace' }}>— Renato Silva de Assis, Idealizador</div>
          </div>
        </div>

      </div>
    </div>
  )
}
