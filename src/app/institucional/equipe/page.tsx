"use client"
import { GraduationCap, Code2, Briefcase, Users, Star, MapPin, BookOpen, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ConhecaEquipe() {
  const team = [
    {
      id: 'renato',
      name: 'Renato Silva de Assis',
      role: 'Founder · Strategy & Data Science',
      image: '/renato_assis_co.jpg',
      location: 'João Pessoa, PB — Brasil',
      bio: 'Economista (UFPB) e Mestre em Economia Regional (UFRN), com bacharelado em Ciência de Dados para Negócios. Mais de 16 anos de experiência técnica no DIEESE e consultoria estratégica, unindo teoria econômica e analytics avançado.',
      expertise: ['Economia Aplicada', 'Ciência de Dados', 'Planejamento Estratégico', 'Gestão por Processos'],
      stack: ['Python', 'R', 'SQL', 'Stata', 'Power BI'],
      experience: '16+ anos coordenando pesquisas de conjuntura e negociações coletivas de alta complexidade.'
    },
    {
      id: 'emmanuel',
      name: 'Emmanuel Peixoto',
      role: 'Co-Founder · Technology & Architecture',
      image: '/arkos_team_emanuel.png',
      location: 'João Pessoa, PB — Brasil',
      bio: 'Arquiteto de software com vasta experiência em sistemas distribuídos e infraestrutura de alta escala. Responsável por garantir que a Arkos opere com resiliência extrema e performance de nível enterprise.',
      expertise: ['Arquitetura de Software', 'Cloud Computing', 'Sistemas Distribuídos', 'Segurança da Informação'],
      stack: ['Next.js', 'Go', 'Kubernetes', 'PostgreSQL', 'AWS'],
      experience: 'Liderou o desenvolvimento de plataformas críticas para setores de logística e fintech.'
    },
    {
      id: 'gabriel',
      name: 'Gabriel Mamede',
      role: 'Co-Founder · Analytics & Modelagem',
      image: '/arkos_team_gabriel.png',
      location: 'Brasil',
      bio: 'Especialista em analytics tático e modelagem econométrica. Sua atuação foca na transformação de fluxos operacionais em evidências quantitativas para suporte imediato à decisão da diretoria.',
      expertise: ['Analytics Prescritivo', 'Modelagem Estatística', 'Business Intelligence', 'Otimização Financeira'],
      stack: ['Python', 'SQL', 'Tableau', 'Excel Expert', 'Google Cloud'],
      experience: 'Especialista em inteligência de dados aplicada ao varejo de alta escala e serviços financeiros.'
    },
    {
      id: 'juliocesar',
      name: 'Julio Cesar',
      role: 'Co-Founder · Market Intelligence',
      image: '/arkos_team_julio_cesar.png',
      location: 'Brasil',
      bio: 'Líder de inteligência de mercado focado no mapeamento de ecossistemas competitivos. Traduz tendências globais da nova economia em diferenciais competitivos para os módulos da Arkos.',
      expertise: ['Inteligência de Mercado', 'Análise Competitiva', 'Estratégia de Produto', 'Mapeamento de Ecossistemas'],
      stack: ['Market Analytics', 'CRM Systems', 'Trend Research', 'Product-Led Growth'],
      experience: 'Consultor sênior em expansão de negócios digitais e análise de market share.'
    },
    {
      id: 'lucas',
      name: 'Lucas Silveira',
      role: 'Co-Founder · AI Intelligence',
      image: '/arkos_team_lucas_ai.png',
      location: 'Brasil',
      bio: 'Especialista em inteligência artificial e orquestração de redes neurais. Arquiteta os agentes de IA da Arkos que automatizam a complexidade e realizam o analytics prescritivo da plataforma.',
      expertise: ['Machine Learning', 'IA Generativa', 'NLP', 'Automação Inteligente'],
      stack: ['PyTorch', 'TensorFlow', 'LLMs', 'OpenAI API', 'FastAPI'],
      experience: 'Desenvolvedor de soluções de visão computacional e agentes inteligentes para setores industriais.'
    },
    {
      id: 'wiliam',
      name: 'Wiliam Silva',
      role: 'Co-Founder · Operations & Growth',
      image: '/arkos_team_julio.png',
      location: 'Brasil',
      bio: 'Estrategista de operações focado em escala sustentável. Garante que o ecossistema Arkos cresça com processos robustos e governança impecável, sustentando a promessa de valor aos clientes.',
      expertise: ['Gestão de Operações', 'Growth Hacking', 'Customer Success', 'Escalabilidade de Processos'],
      stack: ['Agile', 'Jira', 'HubSpot', 'Linear', 'Process Mining'],
      experience: 'Gestor de crescimento em startups hyper-growth com foco em eficiência operacional.'
    }
  ]

  return (
    <div style={{ background: '#0A0C0F', minHeight: '100vh', paddingTop: '80px', fontFamily: "'Inter', sans-serif", color: '#F4F2ED' }}>
      
      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', padding: '100px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(200,245,66,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,245,66,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.2)' }}>
            <Users size={14} color="#C8F542" />
            <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: '#C8F542', letterSpacing: '0.12em', fontWeight: 800 }}>THE CREATORS</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '20px' }}>
            Os arquitetos por trás<br /><span style={{ color: '#C8F542', fontStyle: 'italic' }}>da inteligência</span>.
          </h1>
          <p style={{ color: '#8A8F99', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
            Uma união estratégica de economistas, arquitetos de software, cientistas de dados e especialistas em IA comprometidos em construir a infraestrutura do futuro corporativo.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 120px' }}>
        
        {/* ── TEAM GRID ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {team.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: index % 2 === 0 ? '1fr 1.5fr' : '1.5fr 1fr', 
                gap: '80px', 
                alignItems: 'center' 
              }}
            >
              {/* Image Side */}
              <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                <div style={{ 
                  position: 'relative', 
                  borderRadius: index % 2 === 0 ? '24px 24px 160px 160px' : '160px 160px 24px 24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: '#090a0c',
                  aspectRatio: '1 / 1.1',
                  boxShadow: '0 32px 80px -20px rgba(0,0,0,0.8)'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)', transition: 'filter 0.5s' }} 
                    onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%) contrast(1)'}
                    onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)'}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(9,10,12,0.9), transparent)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
                  <MapPin size={14} color="#C8F542" />
                  <span style={{ color: '#5A5F6A', fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.08em' }}>{member.location}</span>
                </div>
              </div>

              {/* Info Side */}
              <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#C8F542', letterSpacing: '0.15em', marginBottom: '12px', fontWeight: 800 }}>{member.role}</div>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em' }}>{member.name}</h2>
                
                <p style={{ color: '#8A8F99', fontSize: '1rem', lineHeight: 1.8, marginBottom: '32px' }}>{member.bio}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.65rem', color: '#F4F2ED', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Star size={12} color="#C8F542" /> Expertise
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {member.expertise.map(exp => (
                        <span key={exp} style={{ padding: '6px 12px', background: 'rgba(200,245,66,0.06)', borderRadius: '6px', fontSize: '0.7rem', color: '#C8F542', border: '1px solid rgba(200,245,66,0.1)' }}>{exp}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.65rem', color: '#F4F2ED', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Code2 size={12} color="#C8F542" /> Core Stack
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {member.stack.map(s => (
                        <span key={s} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', fontSize: '0.7rem', color: '#8A8F99', border: '1px solid rgba(255,255,255,0.08)' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px', background: 'rgba(200,245,66,0.02)', borderRadius: '16px', borderLeft: '4px solid #C8F542' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Briefcase size={14} color="#C8F542" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F4F2ED', letterSpacing: '0.05em' }}>HIGHLIGHT</span>
                  </div>
                  <p style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{member.experience}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── FOOTER CALL TO ACTION ── */}
        <div style={{ marginTop: '160px', textAlign: 'center', padding: '80px 40px', background: 'linear-gradient(to bottom, #111318, #0A0C0F)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(200,245,66,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '24px' }}>Pronto para escalar seu diferencial competitivo?</h2>
          <p style={{ color: '#8A8F99', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.8 }}>Nossa equipe de especialistas está pronta para auditar sua operação e desenhar sua infraestrutura de inteligência customizada.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/diagnostico" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#C8F542', color: '#0A0C0F', border: 'none', padding: '16px 40px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                INICIAR DIAGNÓSTICO <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'transparent', color: '#F4F2ED', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 40px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                VOLTAR AO HUB
              </button>
            </Link>
          </div>
        </div>

      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          div[style*="order: 2"], div[style*="order: 1"] {
            order: unset !important;
          }
          h2 { font-size: 2rem !important; }
          .sideImage { border-radius: 24px 24px 100px 100px !important; }
        }
      `}</style>
    </div>
  )
}
