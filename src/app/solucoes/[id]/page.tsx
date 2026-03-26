'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../solucoes.module.css'
import { ArrowLeft, CheckCircle2, ShoppingCart, Users, FileText, Package, BarChart2, Cpu, Shield } from 'lucide-react'

const catalog: Record<string, any> = {
  marketing: { title: 'Marketing Intelligence', desc: 'O marketing atua como gerador supremo de dados decisórios. Operamos desde o digital analítico até a inteligência profunda.', image: '/arkos_marketing_intelligence_hero_v1_1774542591336.png' },
  data: { title: 'Governança de Dados e BI', desc: 'Data warehouse, pipelines conectadas e dashboards preditivos de alta performance.', image: '/arkos_data_stream_1774143375030.png' },
  crm: { title: 'Gestão Comercial (CRM)', desc: 'Otimize o funil de vendas, propostas comerciais e conversões estratégicas em tempo real.', image: '/arkos_real_executive_dashboard_1774143584596.png' },
  clm: { title: 'Gestão de Contratos (CLM)', desc: 'Centraliza a espinha dorsal financeira e física do negócio: faturamento, fardamento e contratos.', image: '/arkos_dashboard_decision_1774133572097.png' },
  recrutamento: { title: 'Arkos Talent Intelligence', desc: 'Redesenho organizacional via NLP e Otimização Matemática. Estruturação de cargos e processos.', image: '/arkos_executive_dashboard_1774143501248.png' },
  ai: { title: 'Agentes de IA e Automação', desc: 'Agentes autônomos treinados com as regras do seu negócio para resolver chamados e fluxos.', image: '/arkos_data_brain_1774143436679.png' },
  commerce: { title: 'Central de Comércio Inteligente', desc: 'Motor financeiro robusto B2B integrado à gestão para e-commerce e recorrência.', image: '/arkos_laptop_mockup_1774143172389.png' },
  growth: { title: 'Aceleração de Crescimento (Growth)', desc: 'Squads avançados operando tráfego pago escalável, ROI preditivo e SEO técnico.', image: '/arkos_growth_acceleration_hero_v1_1774542610685.png' },
  strategy: { title: 'Planejamento Estratégico e Cenários', desc: 'Formulação completa e acompanhamento de planos estratégicos dinâmicos e operação tática.', image: '/arkos_business_strategy_1774143055983.png' },
  academy: { title: 'Edtech Academy', desc: 'Plataforma LMS completa para letramento digital da equipe e capacitação preditiva.', image: '/arkos_edtech_portal_hero_v1_1774542625280.png' },
  infra: { title: 'Gestão de Tecnologia e Cyber', desc: 'Monitoramento de infraestrutura, segurança de servidores e otimização de redes.', image: '/arkos_corporate_presenting_1774143639165.png' },
  pedidos: { title: 'Governança de Service Desk e Demandas', desc: 'Controle centralizado de chamados e fluxos de atendimento escaláveis com foco em eficiência.', image: '/arkos_data_dashboard_holo_1774143471858.png' }
};

export default function SolucoesDetails() {
  const params = useParams();
  const id = params.id as string;
  const item = catalog[id] || { title: 'Módulo Arkos', desc: 'Descrição detalhada em desenvolvimento.' };

  return (
    <div className={styles.container} style={{ minHeight: '100vh', background: '#0A0C0F', paddingTop: '60px' }}>
      <main className="flex-1 flex flex-col items-center justify-center" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        
        <Link href="/solucoes" style={{ color: '#8A8F99', textDecoration: 'none', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Voltar para o Ecossistema
        </Link>

        {/* Side-by-side Details layout */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', background: '#111318', border: '1px solid #1F242D', padding: '40px', borderRadius: '16px', width: '100%', textAlign: 'left' }}>
          
          <div style={{ flex: 1.2 }}>
            <h1 style={{ fontSize: '1.8rem', color: '#C8F542', fontWeight: 800, marginBottom: '12px' }}>{item.title}</h1>
            <p style={{ color: '#F4F2ED', fontSize: '1.1rem', marginBottom: '24px', lineHeight: '1.6' }}>{item.desc}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8A8F99' }}><CheckCircle2 size={18} color="#C8F542" /> Totalmente integrado ao Ecossistema Arkos</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8A8F99' }}><CheckCircle2 size={18} color="#C8F542" /> Prescrição de Inteligência de Dados Dinâmica</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8A8F99' }}><CheckCircle2 size={18} color="#C8F542" /> Painéis de Report Automático para C-Level</div>
            </div>

            <button style={{ background: '#C8F542', color: '#000', fontWeight: '800', fontSize: '0.875rem', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }} onClick={() => window.open('https://wa.me/5583981957737', '_blank')}>
              Quero Conversar sobre esta Solução
            </button>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img 
              src={item.image || '/arkos_corporate_presenting_1774143639165.png'} 
              alt={item.title} 
              style={{ width: '100%', borderRadius: '24px', objectFit: 'cover', aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.05)' }} 
            />
          </div>

        </div>

      </main>
    </div>
  )
}