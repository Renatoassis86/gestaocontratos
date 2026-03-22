'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import styles from './CompetidoresSeccion.module.css'

export default function CompetidoresSeccion() {
  const empresas = [
    { name: 'Netflix', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg' },
    { name: 'Amazon', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg' },
    { name: 'Capital One', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/capitalone.svg' },
    { name: 'Google', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg' },
    { name: 'UPS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ups.svg' },
    { name: 'LinkedIn', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg' },
    { name: 'Patriots', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg' } // Accenture ou Similares analiticos
  ]

  return (
    <section id="competidores" className={styles.section}>
      <div className={styles.container}>
        
        {/* --- HEADER --- */}
        <div className={styles.header}>
          <div style={{ fontFamily: 'monospace', color: '#C8F542', fontSize: '0.688rem', letterSpacing: '2px', marginBottom: '12px' }}>O BENCHMARK MÁXIMO</div>
          <h2 className={styles.title}>A Elite dos Competidores Analíticos</h2>
          <p className={styles.description}>
            Empresas no Nível 5 utilizam a ciência de dados de forma ampla, sistemática e como sua principal vantagem sustentável. É esse patamar que a ARKOS ajuda você a pavimentar.
          </p>
        </div>

        {/* --- CAROUSEL MONOCRO --- */}
        <div className={styles.carouselWrapper}>
          <motion.div 
            animate={{ x: [0, -1200] }} 
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} 
            style={{ display: 'flex', gap: '80px', width: 'max-content' }}
          >
            {[...empresas, ...empresas].map((e, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={e.logo} 
                  alt={e.name} 
                  style={{ 
                    height: '35px', 
                    maxWidth: '120px', 
                    objectFit: 'contain', 
                    filter: 'brightness(0) invert(1)', 
                    opacity: 0.8 
                  }} 
                />
                <span style={{ color: '#F4F2ED', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {e.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- O CASO NETFLIX --- */}
        <div className={styles.caseWrapper}>
          <div className={styles.caseGrid}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} alt="N" />
                <h3 style={{ color: '#F4F2ED', fontSize: '2.25rem', fontWeight: 800, fontFamily: 'Sora, sans-serif' }}>O Caso Netflix</h3>
              </div>
              
              <p style={{ color: '#8A8F99', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                A Netflix, como uma empresa no Estágio 5 de maturidade (Competidor Analítico), diferencia-se por medir, testar e analisar o comportamento de seus usuários em um nível de granularidade extremo.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { t: 'Métricas de Recomendação e Preferência (Cinematch)', d: 'O algoritmo da empresa avalia milhares de classificações por segundo para personalizar a página de cada cliente com base em mais de um bilhão de opiniões e feedbacks.' },
                  { t: 'Análise de Atributos de Conteúdo', d: 'Para prever o sucesso de produções originais (como House of Cards), a empresa analisou 70 mil atributos de filmes, popularidade do diretor (David Fincher) e ator principal (Kevin Spacey) antes de fechar o contrato.' },
                  { t: 'Métricas Rigorosas de Testes A/B', d: 'Cultura de experimentação contínua com 1.000 ensaios anuais. Mensuram o tempo exato assistindo trailers, taxas de resposta em pesquisas e quantidade de filmes adicionados à lista.' },
                  { t: 'Métricas de Volume e Engajamento', d: 'Capacidade de gerenciar e analisar dados em altíssima escala, monitorando fluxos massivos como a transmissão de 69.444 horas de vídeo por minuto.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#C8F542" style={{ marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <div style={{ color: '#F4F2ED', fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>{item.t}</div>
                      <div style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.4' }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.caseStats} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>1 Bi</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>feedbacks e opiniões avaliados</div>
                </div>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>70k</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>atributos analiticos do usuário</div>
                </div>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>1.000</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>experimentos A/B anuais</div>
                </div>
                <div className={styles.statCard}>
                  <div style={{ color: '#C8F542', fontSize: '1.8rem', fontWeight: 800 }}>69.4k h</div>
                  <div style={{ color: '#8A8F99', fontSize: '0.75rem' }}>de vídeos medidos por minuto</div>
                </div>
              </div>

              {/* CARD DESTAQUE: O QUE ESSA ESTRATÉGIA RENDEU */}
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(200,245,66,0.05), rgba(17,19,24,0.9))', 
                  border: '1px solid rgba(200,245,66,0.15)', 
                  padding: '24px', 
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ color: '#C8F542', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>O IMPACTO NOS NEGÓCIOS</div>
                <h4 style={{ color: '#F4F2ED', fontSize: '1.25rem', fontWeight: 800 }}>O que a Estratégia Rendeu?</h4>
                <p style={{ color: '#8A8F99', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  A produção de <em>House of Cards</em> sem episódios pilotos reduziu drasticamente os custos de falhas. Em apenas 3 meses de lançamento, a precisão analítica gerou um incremento de <strong>3 milhões de novos assinantes globais</strong>, adicionando mais de <strong>US$ 72 milhões de faturamento imediato</strong> para a companhia e amortizando o investimento inicial rapidamente.
                </p>
                <p style={{ color: '#C8F542', fontSize: '0.85rem', fontWeight: 700 }}>
                   Substituição do instinto por decisões quantitativas absolutas.
                </p>
              </div>
            </div>
          </div>

          {/* --- OUTROS CASES GRID --- */}
          <div style={{ marginTop: '80px' }}>
            <h4 style={{ color: '#F4F2ED', fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>Outras Organizações que Competem Analiticamente</h4>
            <div style={{ width: '40px', height: '3px', background: '#C8F542', margin: '0 auto 16px auto' }}></div>
            <p style={{ color: '#8A8F99', fontSize: '0.9rem', textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>Benchmarks globais que comprovam como a ciência de dados reconfigura indústrias inteiras.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Amazon', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg', text: 'Utiliza técnicas avançadas de otimização em tempo real e aprendizado de máquina em toda a sua cadeia de suprimentos para gerenciar estoques com base na incerteza da demanda.' },
                { name: 'Capital One', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/capitalone.svg', text: 'Pioneira em "estratégias baseadas em informações", conduz cerca de 8.000 testes de marketing por ano para atrair clientes lucrativos com precisão.' },
                { name: 'Google', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg', text: 'Aplica o rigor analítico a algoritmos de busca e ao "People Operations", utilizando ciência de dados para formar melhores líderes e estratégias de retenção.' },
                { name: 'Walmart', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/walmart.svg', text: 'Referência em supply-chain, compartilha dados em tempo real com 60 mil fornecedores via Retail Link, prevendo demandas sazonais ou atípicas (como furacões).' },
                { name: 'UPS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ups.svg', text: 'Investiu no sistema ORION, que otimiza rotas de 55 mil motoristas diariamente, gerando economia de centenas de milhões de dólares ao ano em combustível.' },
                { name: 'Caesars Entertainment', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microstrategy.svg', text: 'Revolucionou o setor de cassinos fidelizando clientes por meio de análise de dados no ponto de venda para ofertas personalizadas em tempo real.' },
                { name: 'Progressive', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/progressive.svg', text: 'Destaca-se pelo programa Snapshot, precificando seguros dinamicamente ao coletar dados reais sobre como o cliente dirige (velocidade, freadas).' },
                { name: 'Times Esportivos (Patriots)', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nfl.svg', text: 'Patriots e Oakland A\'s utilizam estatística avançada para montar equipes e definir jogadas, avaliando a psicologia e força mental dos atletas.' }
              ].map((c) => (
                 <div key={c.name} style={{ background: '#111318', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <img src={c.logo} style={{ height: '24px', width: 'fit-content', filter: 'brightness(0) invert(1)', opacity: 0.5 }} alt={c.name} />
                    <div>
                      <div style={{ color: '#F4F2ED', fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>{c.name}</div>
                      <p style={{ color: '#8A8F99', fontSize: '0.8rem', lineHeight: '1.5' }}>{c.text}</p>
                    </div>
                 </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
