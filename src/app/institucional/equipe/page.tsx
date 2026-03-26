"use client"
import { Briefcase, GraduationCap, Code2 } from 'lucide-react'
import styles from '../../page.module.css'

export default function ConhecaEquipe() {
  const equipe = [
    {
      nome: 'Renato Assis',
      cargo: 'IDEALIZADOR E FOUNDER | CIENTISTA DE DADOS',
      foto: '/renato_assis_co.jpg',
      headline: 'A ciência econômica aplicada à produtividade diária.',
      bio: [
        'Idealizador e arquiteto do conceito que deu origem à ARKOS, Renato vislumbrou uma infraestrutura que unisse economia analítica, fluxos auditáveis e inteligência real para o C-Level. Hoje, lidera a visão de expansão tecnológica do ecossistema, orquestrando a inteligência estratégica ao lado de um time de co-fundadores especialistas.',
        'Com mais de uma década atuando como supervisor técnico do DIEESE, traz uma bagagem ímpar em análise de conjuntura, pesquisas setoriais e planos de negócio. Atuou também como gerente administrativo do Sistema Cidade Viva Education e fundou a Econsult, aplicando gestão financeira na prática de mercado.'
      ],
      tags: [
        {
          icon: <GraduationCap size={24} color="#C8F542" style={{ flexShrink: 0 }} />,
          title: 'Formação Acadêmica (UFPB / UFRN)',
          desc: 'Bacharel em C. Econômicas e Mestre em Economia Regional. Graduando em Ciência de Dados para Negócios e Pós em Educação Cristã Clássica pela FICV.'
        },
        {
          icon: <Code2 size={24} color="#C8F542" style={{ flexShrink: 0 }} />,
          title: 'Stack Tecnológica e Dados',
          desc: 'SPSS, Stata, R, SQL, Python, Pandas, Power BI, IA Generativa aplicada à Gestão e Modelagem de Data Warehouse (BI).'
        }
      ],
      motivacao: "A prioridade sempre foi construir processos com pessoas e para pessoas. A tecnologia pela tecnologia não se sustenta; ela precisa gerar impacto de escala, agregar o máximo de valor e melhorar o bem-estar dos times. Na Arkos, transformamos gestão fragmentada em poder de decisão perfeitamente orquestrado."
    },
    {
      nome: 'Emanuel Peixoto',
      cargo: 'CO-FOUNDER e PRODUTO e DESIGN',
      foto: '/arkos_team_emanuel.png',
      headline: 'Concepção visual para lucidez na tomada de decisão.',
      bio: [
        'Especialista na concepção visual, arquitetura de informação e user-experience de toda a infraestrutura analítica da Arkos.',
        'Aplica design e modelagem visual para resolver dores operacionais profundas, convertendo fluxos estáticos em jornadas visuais que dão velocidade à alta gerência.'
      ],
      tags: [
        {
          icon: <Code2 size={24} color="#C8F542" style={{ flexShrink: 0 }} />,
          title: 'Expertise e Stack',
          desc: 'UI/UX Architecture, Product Design, Figma, Interactive Prototyping, Design Systems, Interface Engineering.'
        }
      ],
      motivacao: "O design é a interface entre o caos e a clareza. Na Arkos, cada tela é desenhada para reduzir o stress cognitivo e acelerar a capacidade de visualização de quem lidera o negócio."
    },
    {
      nome: 'Gabriel Mamede',
      cargo: 'CO-FOUNDER e ARQUITETURA DE DADOS',
      foto: '/arkos_team_gabriel.png',
      headline: 'A espinha dorsal lógica da inteligência corporativa.',
      bio: [
        'Responsável por estruturar a arquitetura e governança da espinha dorsal lógica de todo o ecossistema de banco de dados da Arkos.',
        'Foca em garantia de absoluta escalabilidade, segurança e confiabilidade no processamento de informações sensíveis de alto nível.'
      ],
      tags: [
        {
          icon: <Code2 size={24} color="#C8F542" style={{ flexShrink: 0 }} />,
          title: 'Expertise e Stack',
          desc: 'Database Architecture, SQL, NoSQL, Data Governance, Backend Services, Microservices Engineering, System Scalability.'
        }
      ],
      motivacao: "Dados isolados são ruído. Dados estruturados com governança são poder. Minha obsessão é garantir que a estrutura analítica seja indestrutível e escalável."
    },
    {
      nome: 'Lucas Machado',
      cargo: 'CO-FOUNDER e INTELIGÊNCIA ARTIFICIAL',
      foto: '/arkos_team_lucas_ai.png',
      headline: 'Hiper-automação reduzindo cliques ao limite mínimo.',
      bio: [
        'Integra fluxos avançados de Inteligência Artificial generativa e processamento automatizado sob medida para as regras do ecossistema.',
        'Trabalha para reduzir o volume de cliques e fricção da equipe técnica ao limite mínimo absoluto, garantindo fluxos autônomos eficientes.'
      ],
      tags: [
        {
          icon: <Code2 size={24} color="#C8F542" style={{ flexShrink: 0 }} />,
          title: 'Expertise e Stack',
          desc: 'Artificial Intelligence, Machine Learning Algorithms, Python, workflow automation, Generative AI nodes and LLM fine-tuning.'
        }
      ],
      motivacao: "A Inteligência Artificial não substitui a liderança; ela a liberta de tarefas repetitivas para que gaste energia onde gera valor estratégico real."
    },
    {
      nome: 'Williams Calado',
      cargo: 'CO-FOUNDER e INTEGRAÇÕES e INFRA',
      foto: '/arkos_team_julio.png', // Usando Julio foto para Williams que faltava foto local
      headline: 'APIs integradas e infraestrutura corporativa robusta.',
      bio: [
        'Desenvolvedor especialista em Integrações e sustentação de infraestrutura distribuída de microsserviços.',
        'Garante a robustez das APIs expostas e a integridade de governança de todas as peças conectadas que alimentam os algoritmos analíticos.'
      ],
      tags: [
        {
          icon: <Code2 size={24} color="#C8F542" style={{ flexShrink: 0 }} />,
          title: 'Expertise & Stack',
          desc: 'API Integrations, Microservices Architecture, API Security Core, Cloud Architectures, Distributed Nodes, Edge Computations.'
        }
      ],
      motivacao: "A integridade dos fluxos de dados de entrada garante a certeza nas conclusões de saída. Integrações robustas são o que permite o ecossistema respirar como um só corpo."
    }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 24px' }}>
      <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.625rem', letterSpacing: '1px', marginBottom: '16px', textAlign: 'center' }}>CONHEÇA NOSSA EQUIPE</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '64px', lineHeight: '1.2', textAlign: 'center' }}>Mentes analíticas construindo o futuro da gestão.</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {equipe.map((membro, idx) => (
          <div className={styles.solucaoHero} key={idx} style={{ marginBottom: idx === equipe.length - 1 ? 0 : '0px' }}>
            {/* Foto com efeito */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#090a0c', height: '100%', minHeight: '520px' }}>
              <div style={{ background: `url("${membro.foto}")`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', opacity: 0.9 }}>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                <h2 style={{ color: '#FFF', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{membro.nome}</h2>
                <p style={{ color: '#C8F542', fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '1px', margin: '8px 0 0 0' }}>{membro.cargo}</p>
              </div>
            </div>

            {/* Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '16px' }}>{membro.headline}</h3>
                {membro.bio.map((p, i) => (
                  <p key={i} style={{ color: '#8A8F99', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: i === membro.bio.length - 1 ? 0 : '16px' }}>
                    {p}
                  </p>
                ))}
              </div>
              
              {/* Tags de Formação / Origem */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                {membro.tags.map((tag, i) => (
                  <div key={i} style={{ padding: '20px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {tag.icon}
                    <div>
                      <strong style={{ display: 'block', color: '#FFF', fontSize: '0.95rem', marginBottom: '6px' }}>{tag.title}</strong>
                      <span style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>{tag.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visão de Trabalho */}
              {membro.motivacao && (
                <div style={{ padding: '24px', background: 'rgba(200,245,66,0.02)', borderRadius: '12px', border: '1px solid rgba(200,245,66,0.1)' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#C8F542', marginBottom: '12px' }}>A Motivação Arkos</div>
                  <p style={{ color: '#F4F2ED', fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{membro.motivacao}"
                  </p>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
