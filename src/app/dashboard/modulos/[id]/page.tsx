'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react'

const moduleDetails: Record<string, { title: string, desc: string, benefits: string[], banner: string }> = {
  marketing: { 
    title: 'Marketing Intelligence', 
    desc: 'O marketing atua como gerador supremo de dados decisórios. Operamos desde o digital analítico até a inteligência profunda.', 
    benefits: [
      'Análise de sentimento baseada em NLP',
      'Trackeamento de ROI em tempo real',
      'Testes A/B para novos lançamentos',
      'Monitoramento de marca e concorrentes'
    ],
    banner: '/arkos_marketing_intelligence_hero_v1_1774542591336.png'
  },
  data: { 
    title: 'Governança de Dados e BI', 
    desc: 'Central de governança de dados estruturada para governar dados e sustentar C-Level.', 
    benefits: [
      'Data Warehouse e Pipelines escaláveis sem fricção',
      'Construção de APIs isoladas e endpoints de data lake',
      'Visualização de BI com Dashboards Holísticos',
      'Eliminação total de planilhas dispersas'
    ],
    banner: '/arkos_data_stream_1774143375030.png'
  },
  crm: { 
    title: 'Gestão Comercial (CRM)', 
    desc: 'Otimize funil de vendas, propostas comerciais e conversões em tempo real.', 
    benefits: [
      'Gestão de Leads em tempo real com score preditivo',
      'Dashboards visuais de funil e velocidade de fechamento',
      'Integração direta com o motor financeiro e CLM',
      'Previsão de receitas e otimização de caixa'
    ],
    banner: '/arkos_real_executive_dashboard_1774143584596.png'
  },
  clm: { 
    title: 'Gestão de Contratos (CLM)', 
    desc: 'Centraliza a espinha dorsal financeira e física do negócio: faturamento, fardamento e contratos.', 
    benefits: [
      'Geração automática de minutas e aditivos',
      'Assinatura digital integrada ao fluxo',
      'Controle rigoroso de prazos e vigências',
      'Auditoria nativa de documentos acadêmicos'
    ],
    banner: '/arkos_dashboard_decision_1774133572097.png'
  },
  recrutamento: { 
    title: 'Arkos Talent Intelligence', 
    desc: 'Redesenho organizacional via NLP e Otimização Matemática para estruturação de cargos e processos.',
    benefits: [
      'Rankeamento de currículos por IA',
      'Geração de Dossiê automatizado de candidatos',
      'Previsão de Turnover dinâmica',
      'Matrizes RACI baseadas em dados reais'
    ],
    banner: '/arkos_executive_dashboard_1774143501248.png'
  },
  ai: { 
    title: 'Agentes de IA e Automação', 
    desc: 'Copilots executivos que automatizam tarefas repetitivas e alertam anomalias preventivamente.', 
    benefits: [
      'Resolutores autônomos por chat (WhatsApp, Slack)',
      'Alarmes de Churn e anomalias de faturamento',
      'Acompanhamento de processos de auditoria inteligente',
      'Interações e resoluções baseadas em NLP'
    ],
    banner: '/arkos_data_brain_1774143436679.png'
  },
  commerce: { 
    title: 'Central de Comércio Inteligente', 
    desc: 'Motor financeiro robusto B2B integrado à gestão para e-commerce e recorrência.', 
    benefits: [
      'Faturamento agnóstico a gateways bancários',
      'Gestão de subscrições e planos recorrentes',
      'Split de pagamentos automático',
      'Dashboard de performance de vendas B2B'
    ],
    banner: '/arkos_laptop_mockup_1774143172389.png'
  },
  growth: { 
    title: 'Aceleração de Crescimento (Growth)', 
    desc: 'Squads avançados operando tráfego pago escalável e ROI preditivo.', 
    benefits: [
      'Gestão de performance em Google e Meta Ads',
      'SEO técnico para conversão orgânica',
      'Modelagem de custos de aquisição (CAC)',
      'Aumento sistemático do LTV dos clientes'
    ],
    banner: '/arkos_growth_acceleration_hero_v1_1774542610685.png'
  },
  strategy: { 
    title: 'Planejamento Estratégico e Cenários', 
    desc: 'Aproveite modelos matemáticos avançados para prever riscos e definir sua estratégia.', 
    benefits: [
      'Mapeamento de riscos e cruzamento de mercado',
      'Automação de planos estratégicos de 5 anos',
      'Vetorização de metas em cascata para equipes',
      'Acessível via Copilots de recomendação ARKOS'
    ],
    banner: '/arkos_business_strategy_1774143055983.png'
  },
  academy: { 
    title: 'Edtech Academy', 
    desc: 'Plataforma LMS completa para letramento digital da equipe e capacitação preditiva.', 
    benefits: [
      'Ambiente de Ensino Inteligente com rastreio de foco',
      'Geração de Alertas de Churn de alunos por engajamento',
      'Integração com módulos de faturamento e CRM',
      'Relatórios e certificados automatizados'
    ],
    banner: '/arkos_edtech_portal_hero_v1_1774542625280.png'
  },
  infra: { 
    title: 'Gestão de Tecnologia e Cyber', 
    desc: 'Monitoramento de infraestrutura, segurança de servidores e otimização de redes.', 
    benefits: [
      'Monitoramento de carga síncrono 24/7',
      'Segurança lógica e proteção contra invasões',
      'Backups determinísticos e auditáveis',
      'Otimização de custos de infraestrutura cloud'
    ],
    banner: '/arkos_corporate_presenting_1774143639165.png'
  },
  pedidos: { 
    title: 'Governança de Service Desk e Demandas', 
    desc: 'Controle centralizado de chamados e fluxos de atendimento escaláveis.', 
    benefits: [
      'Central de Requisições Unificada (Tickets)',
      'Acompanhamento de compras e faturamento',
      'Simulações e auditorias econométricas nativas',
      'Controle de SLA e eficiência operacional'
    ],
    banner: '/arkos_data_dashboard_holo_1774143471858.png'
  }
}

export default function ModuloDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const item = moduleDetails[id]

  if (!item) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#05060A', color: '#FFF' }}>
        <p style={{ color: '#F8FAFC', marginBottom: '16px' }}>Módulo não encontrado ou em desenvolvimento.</p>
        <button onClick={() => router.push('/dashboard/modulos')} style={{ background: '#C8F542', color: '#000', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 800 }}>
          Voltar para Suite
        </button>
      </div>
    )
  }

  return (
    <div style={{ background: '#05060A', minHeight: '100vh', color: '#F8FAFC', width: '100%' }}>
      {/* Botão Voltar */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px 20px 20px' }}>
        <button onClick={() => router.push('/dashboard/modulos')} style={{ background: 'transparent', border: 'none', color: '#C8F542', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
          <ArrowLeft size={18} /> Voltar para Suite
        </button>
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '32px', marginTop: '10px' }}>
          
          <div style={{ order: 1 }}>
            <span style={{ fontSize: '0.625rem', padding: '4px 8px', background: 'rgba(200,245,66,0.1)', color: '#C8F542', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Módulo Opcional
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '12px', marginBottom: '16px', background: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {item.title}
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              {item.desc}
            </p>

            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#E2E8F0', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Diferenciais da Metodologia Arkos:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {item.benefits.map((b, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.875rem' }}>
                  <CheckCircle size={16} style={{ color: '#C8F542', flexShrink: 0 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <a href="https://wa.me/5583981957737" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ background: '#C8F542', color: '#000', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: 800, fontSize: '0.813rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(200,245,66,0.2)' }}>
                <MessageCircle size={18} /> Requisitar Acesso para Minha Empresa
              </button>
            </a>
          </div>

          <div style={{ height: '300px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', order: 2 }}>
            <img src={item.banner} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

        </div>
      </main>
    </div>
  )
}
