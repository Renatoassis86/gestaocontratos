"use client"
import { GraduationCap, Code2, Briefcase, Users, Star, MapPin, BookOpen, Target } from 'lucide-react'

export default function ConhecaEquipe() {

  const expertise = [
    'Análise de Mercado',
    'Análises Socioeconômicas',
    'Mercado de Trabalho',
    'Gestão Estratégica',
    'Ciência de Dados para Negócios',
    'Manipulação de Bases de Dados Complexas',
    'Negociação Corporativa',
    'Contabilidade Pública',
    'Pesquisa Demográfica',
    'Planejamento Estratégico',
    'Gestão por Processos',
    'Gestão Financeira',
    'Perícia Contábil',
    'Consultoria Organizacional',
    'Visualização de Dados',
  ]

  const stack = [
    'Python', 'R', 'SQL', 'Stata', 'SPSS',
    'Pandas', 'Power BI', 'Data Warehouse',
    'IA Generativa', 'POO', 'Bancos Relacionais',
    'ETL / Data Pipeline', 'Machine Learning',
  ]

  const experiencias = [
    {
      periodo: '2008 – 2024',
      cargo: 'Supervisor Técnico – PB & RN',
      empresa: 'DIEESE (Departamento Intersindical de Estatística e Estudos Socioeconômicos)',
      desc: 'Por 16 anos ininterruptos, liderou a operação técnica do DIEESE nos estados da Paraíba e Rio Grande do Norte. Coordenou pesquisas de conjuntura econômica, análises do mercado de trabalho, estudos setoriais e negociações coletivas de alto impacto. Referência regional em levantamentos quantitativos e qualitativos com alta exigência metodológica.',
    },
    {
      periodo: 'Nacional',
      cargo: 'Técnico de Projetos',
      empresa: 'DIEESE – Escritório Nacional',
      desc: 'Atuou diretamente no escritório nacional em projetos de abrangência nacional, colaborando com equipes interdisciplinares na produção de análises estratégicas, relatórios técnicos e modelos de pesquisa socioeconômica com dados de escala nacional.',
    },
    {
      periodo: 'Fundador',
      cargo: 'CEO & Consultor Estratégico',
      empresa: 'Econsult – Consultoria Empresarial',
      desc: 'Fundou e dirigiu a Econsult, empresa de consultoria organizacional especializada em planejamento estratégico, gestão financeira, perícia contábil, treinamentos em softwares estatísticos (SPSS, Stata, R) e pesquisas quantitativas e qualitativas sob medida para empresas e instituições públicas.',
    },
    {
      periodo: 'Atual',
      cargo: 'Gerente do Sistema',
      empresa: 'Cidade Viva Education',
      desc: 'Consultor contratado pelo Cidade Viva Education, exercendo a função de Gerente do Sistema — responsável pela governança operacional, estruturação de processos internos, sustentação institucional e gestão estratégica da maior rede de educação cristã do Nordeste.',
    },
    {
      periodo: 'Atual',
      cargo: 'Professor de Pós-Graduação',
      empresa: 'FICV – Faculdade Internacional Cidade Viva',
      desc: 'Docente no Programa de Pós-Graduação em Gestão Escolar, ministrando as disciplinas de Gestão Financeira e Gestão por Processos. Forma líderes educacionais com rigor técnico, visão analítica e aplicação prática de ferramentas de gestão.',
    },
    {
      periodo: 'Idealizador',
      cargo: 'Founder & Arquiteto de Produto',
      empresa: 'Arkos Intelligence',
      desc: 'Concebeu e lidera a construção da Arkos Intelligence — infraestrutura analítica corporativa que une economia avançada, ciência de dados, IA generativa e gestão estratégica em um único ecossistema operacional. Responsável pela visão de produto, arquitetura conceitual e estratégia de expansão do ecossistema.',
    },
  ]

  const formacoes = [
    {
      grau: 'Bacharelado',
      curso: 'Ciências Econômicas',
      inst: 'Universidade Federal da Paraíba – UFPB',
      desc: 'Base sólida em teoria econômica, econometria, microeconomia aplicada e análise de conjuntura. Formação que ancora toda a visão analítica de negócios.',
    },
    {
      grau: 'Mestrado',
      curso: 'Economia Regional',
      inst: 'Universidade Federal do Rio Grande do Norte – UFRN',
      desc: 'Pós-graduação stricto sensu com foco em análise regional, modelos econométricos e pesquisa aplicada em mercado de trabalho e desenvolvimento territorial.',
    },
    {
      grau: 'Bacharelado',
      curso: 'Ciências de Dados para Negócios',
      inst: 'Universidade Federal da Paraíba – UFPB',
      desc: 'Formação técnica em ciência de dados aplicada ao ambiente corporativo: machine learning, modelagem preditiva, visualização e inteligência de negócios.',
    },
    {
      grau: 'Pós-Graduação (em curso)',
      curso: 'Educação Cristã Clássica',
      inst: 'Faculdade Internacional Cidade Viva – FICV',
      desc: 'Formação em liderança educacional e gestão de instituições de ensino, com ênfase em pedagogia clássica e administração escolar.',
    },
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
            <span style={{ fontFamily: 'monospace', fontSize: '0.625rem', color: '#C8F542', letterSpacing: '0.12em', fontWeight: 800 }}>IDEALIZADOR & FOUNDER</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#F4F2ED', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            A mente por trás da Arkos.
          </h1>
          <p style={{ color: '#8A8F99', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
            Economista. Mestre em Economia Regional. Cientista de Dados. Consultor, pesquisador e professor — com mais de 16 anos construindo análises que movem decisões estratégicas.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 120px' }}>

        {/* ── FOTO + BIO PRINCIPAL ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'start', marginBottom: '80px' }}>

          {/* Foto */}
          <div>
            <div style={{ borderRadius: '24px 24px 160px 160px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#090a0c', boxShadow: '0 32px 80px -20px rgba(0,0,0,0.8), 0 0 60px rgba(200,245,66,0.06)', aspectRatio: '1 / 1.25', position: 'relative' }}>
              <img src="/renato_assis_co.jpg" alt="Renato Silva de Assis" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(9,10,12,0.8), transparent)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
              <MapPin size={14} color="#C8F542" />
              <span style={{ color: '#8A8F99', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.08em' }}>João Pessoa, PB — Brasil</span>
            </div>
          </div>

          {/* Bio */}
          <div style={{ paddingTop: '8px' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#F4F2ED', lineHeight: 1.1, marginBottom: '6px' }}>
              Renato Silva<br /><span style={{ color: '#C8F542' }}>de Assis</span>
            </h2>
            <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#5A5F6A', letterSpacing: '0.12em', marginBottom: '28px', textTransform: 'uppercase' }}>
              Economista · Mestre · Cientista de Dados · Founder
            </div>

            <p style={{ color: '#8A8F99', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '18px' }}>
              Renato Silva de Assis é economista formado pela UFPB, Mestre em Economia Regional pela UFRN e bacharel em Ciências de Dados para Negócios. Natural de João Pessoa (PB), construiu ao longo de mais de 16 anos uma carreira sólida na interseção entre <strong style={{ color: '#F4F2ED' }}>ciência econômica, pesquisa aplicada e gestão estratégica de dados</strong>.
            </p>
            <p style={{ color: '#8A8F99', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '18px' }}>
              Como supervisor técnico do DIEESE nos estados da Paraíba e Rio Grande do Norte (2008–2024), coordenou dezenas de pesquisas sobre mercado de trabalho, conjuntura econômica e estudos setoriais — acumulando uma bagagem metodológica rara no país. Atuou também no escritório nacional do DIEESE em projetos de abrangência federal.
            </p>
            <p style={{ color: '#8A8F99', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '28px' }}>
              Fundador da <strong style={{ color: '#F4F2ED' }}>Econsult</strong>, empresa de consultoria organizacional especializada em planejamento estratégico, gestão financeira, perícia contábil e pesquisas quantitativas, Renato acumula experi\u00AAncia tanto no setor público quanto no privado. Hoje, além de atuar como gerente do sistema no Cidade Viva Education e professor de pós-graduação na FICV, é o idealizador e founder da <strong style={{ color: '#C8F542' }}>Arkos Intelligence</strong> — infraestrutura analítica que traduz décadas de expertise em tecnologia de gestão de alto impacto.
            </p>

            {/* Quote */}
            <div style={{ padding: '20px 24px', background: 'rgba(200,245,66,0.03)', borderRadius: '12px', borderLeft: '3px solid #C8F542' }}>
              <p style={{ color: '#F4F2ED', fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                "A prioridade sempre foi construir processos <strong style={{ color: '#C8F542' }}>com pessoas e para pessoas</strong>. Não acredito em trabalhos isolados — o impacto coletivo é sempre maior. A tecnologia pela tecnologia não se sustenta: ela precisa gerar bem-estar real e valor de escala."
              </p>
            </div>
          </div>
        </div>

        {/* ── FORMAÇÃO ACADÊMICA ── */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(200,245,66,0.08)', border: '1px solid rgba(200,245,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} color="#C8F542" />
            </div>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Trajetória Acadêmica</div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>Formação Acadêmica</h3>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {formacoes.map((f, i) => (
              <div key={i} style={{ padding: '24px', background: '#111318', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{f.grau}</div>
                <div style={{ color: '#F4F2ED', fontWeight: 700, fontSize: '1rem', marginBottom: '6px', lineHeight: 1.3 }}>{f.curso}</div>
                <div style={{ color: '#5A5F6A', fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: '12px' }}>{f.inst}</div>
                <div style={{ color: '#8A8F99', fontSize: '0.8rem', lineHeight: 1.65 }}>{f.desc}</div>
                <div style={{ position: 'absolute', bottom: '-12px', right: '-8px', fontSize: '72px', fontWeight: 900, color: 'rgba(200,245,66,0.04)', lineHeight: 1 }}>{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPERIÊNCIA ── */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(200,245,66,0.08)', border: '1px solid rgba(200,245,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} color="#C8F542" />
            </div>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Carreira</div>
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>Experiência Profissional</h3>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '19px', width: '2px', background: 'linear-gradient(180deg, rgba(200,245,66,0.6) 0%, rgba(200,245,66,0.05) 100%)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {experiencias.map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0A0C0F', border: '2px solid rgba(200,245,66,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8F542' }} />
                  </div>
                  <div style={{ flex: 1, padding: '20px 24px', background: '#111318', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ color: '#F4F2ED', fontWeight: 700, fontSize: '1rem', marginBottom: '3px' }}>{exp.cargo}</div>
                        <div style={{ color: '#C8F542', fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.06em' }}>{exp.empresa}</div>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#5A5F6A', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '20px' }}>{exp.periodo}</div>
                    </div>
                    <p style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EXPERTISE + STACK ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '80px' }}>

          <div style={{ padding: '32px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Star size={18} color="#C8F542" />
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1rem', margin: 0 }}>Áreas de Expertise</h3>
            </div>
            <p style={{ color: '#5A5F6A', fontSize: '0.75rem', marginBottom: '20px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>DOMÍNIOS TÉCNICOS E ESTRATÉGICOS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {expertise.map((e, i) => (
                <span key={i} style={{ padding: '5px 12px', background: 'rgba(200,245,66,0.06)', border: '1px solid rgba(200,245,66,0.15)', borderRadius: '6px', fontSize: '0.73rem', color: '#C8F542', fontWeight: 500 }}>{e}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: '32px', background: '#111318', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Code2 size={18} color="#C8F542" />
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1rem', margin: 0 }}>Stack Tecnológica</h3>
            </div>
            <p style={{ color: '#5A5F6A', fontSize: '0.75rem', marginBottom: '20px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>FERRAMENTAS & TECNOLOGIAS DOMINADAS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {stack.map((s, i) => (
                <span key={i} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', fontSize: '0.73rem', color: '#F4F2ED', fontFamily: 'monospace' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── O QUE ME MOVE + COMO TRABALHO ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '80px' }}>
          <div style={{ padding: '36px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(200,245,66,0.04) 0%, rgba(200,245,66,0.01) 100%)', border: '1px solid rgba(200,245,66,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Target size={18} color="#C8F542" />
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1rem', margin: 0 }}>O que me move na Arkos</h3>
            </div>
            <p style={{ color: '#8A8F99', fontSize: '0.88rem', lineHeight: 1.85, margin: 0 }}>
              Criar funcionalidades que tragam <strong style={{ color: '#F4F2ED' }}>melhorias significativas</strong> para usuários em seus negócios. Desenvolver tecnologia escalável que gere impacto real no mercado, garanta alto valor agregado ao grupo e torne a gestão corporativa mais inteligente, auditável e humana. Estou disponível todos os dias — sem exceção —, porque acredito que consistência é o maior diferencial de qualquer construção.
            </p>
          </div>

          <div style={{ padding: '36px', borderRadius: '16px', background: '#111318', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Users size={18} color="#C8F542" />
              <h3 style={{ color: '#F4F2ED', fontWeight: 800, fontSize: '1rem', margin: 0 }}>Como trabalho em equipe</h3>
            </div>
            <p style={{ color: '#8A8F99', fontSize: '0.88rem', lineHeight: 1.85, margin: 0 }}>
              Dou prioridade ao trabalho colaborativo, construindo processos <strong style={{ color: '#F4F2ED' }}>com pessoas e para pessoas</strong>. Prezo pelo bem-estar dos membros da equipe, estimulando cada um a atingir seus melhores resultados. Não acredito em trabalhos isolados — a sinergia entre diferentes expertises é o que multiplica resultados. Sou focado, comprometido e aproveito cada oportunidade que surge.
            </p>
          </div>
        </div>

        {/* ── FOOTER BIO ── */}
        <div style={{ textAlign: 'center', padding: '48px 40px', background: '#111318', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '150px', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(200,245,66,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: '#C8F542', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            <BookOpen size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Sobre o Projeto
          </div>
          <p style={{ color: '#8A8F99', fontSize: '0.92rem', lineHeight: 1.85, maxWidth: '700px', margin: '0 auto 0 auto' }}>
            A <strong style={{ color: '#C8F542' }}>Arkos Intelligence</strong> nasce da convergência de uma trajetória singular: mais de uma década analisando mercados e trabalhadores pelo DIEESE, anos construindo soluções de consultoria pela Econsult, e a formação contínua em ciência de dados e tecnologia. É a síntese de tudo que Renato aprendeu no campo — transformado em infraestrutura tecnológica que qualquer empresa pode usar para tomar decisões melhores, mais rápidas e mais fundamentadas.
          </p>
        </div>

      </div>
    </div>
  )
}
