'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShieldCheck, Trophy, Sparkles, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { saveDiagnostico } from '@/app/actions/save-diagnostico'
import styles from '@/components/DiagnosticoHub.module.css'

export default function DiagnosticoPage() {
  const [step, setStep] = useState<'lead' | 'mural' | 'quiz' | 'loading' | 'result'>('lead')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [lead, setLead] = useState({ nome: '', empresa: '', email: '', whatsapp: '' })
  const [scoreData, setScoreData] = useState<any>(null)

  const blocosMotivacionais: Record<number, string> = {
    0: "Para um diagnóstico preciso, responda com o cenário real da sua empresa. Vamos começar?",
    4: "Bloco concluído! Lembre-se: não há respostas certas ou erradas, apenas o retrato atual do seu negócio.",
    8: "Chegamos à metade do formulário! Suas respostas sinceras nos ajudam a mapear os reais gargalos da operação.",
    12: "Falta pouco! Continue avançando para que possamos gerar sua rota de competitividade analítica.",
    16: "Última etapa! Você está a poucos cliques de descobrir o diagnóstico e o estágio do seu negócio."
  }

  const perguntas = [
    { id: 1, block: 'LIDERANÇA', text: 'Em grandes decisões estratégicas, qual é a atitude do CEO ou Diretoria?', options: [
      { id: 'A', text: 'Decidem puramente baseados em instinto e experiência passada.', pts: 1 },
      { id: 'B', text: 'Pedem relatórios, mas cada diretor defende os números do seu próprio silo.', pts: 2 },
      { id: 'C', text: 'Exigem dados corporativos consistentes, mas a TI demora a entregá-los.', pts: 3 },
      { id: 'D', text: 'Agem como "farejadores de dados", usando dashboards para decisões rápidas e preditivas.', pts: 4 }
    ]},
    { id: 2, block: 'LIDERANÇA', text: 'Quando um dado analítico contraria a opinião de um gerente experiente, o que ocorre?', options: [
      { id: 'A', text: 'O dado é ignorado e a intuição vence.', pts: 1 },
      { id: 'B', text: 'Há ceticismo e o dado é "torturado" até confessar o que o gerente quer.', pts: 2 },
      { id: 'C', text: 'O dado é aceito, mas a mudança real na operação é muito lenta.', pts: 3 },
      { id: 'D', text: 'A empresa tem uma cultura ágil de "teste e aprendizado" e muda a rota na hora.', pts: 4 }
    ]},
    { id: 3, block: 'LIDERANÇA', text: 'Qual a visão da empresa sobre investimentos em Inteligência e Dados?', options: [
      { id: 'A', text: 'Um custo que deve ser mantido ao mínimo.', pts: 1 },
      { id: 'B', text: 'Um projeto da TI que o negócio não entende muito bem.', pts: 2 },
      { id: 'C', text: 'Uma necessidade, mas ainda sofre para provar seu ROI.', pts: 3 },
      { id: 'D', text: 'O pilar da vantagem competitiva, com patrocínio apaixonado do alto escalão.', pts: 4 }
    ]},
    { id: 4, block: 'LIDERANÇA', text: 'Os líderes da sua empresa promovem uma cultura meritocrática baseada em números?', options: [
      { id: 'A', text: 'Não, avaliações são subjetivas e políticas.', pts: 1 },
      { id: 'B', text: 'Apenas em áreas óbvias, como metas de vendas isoladas.', pts: 2 },
      { id: 'C', text: 'Sim, mas faltam indicadores claros que unam a empresa toda.', pts: 3 },
      { id: 'D', text: 'Sim, métricas guiam bônus, promoções e a gestão implacável da operação.', pts: 4 }
    ]},
    { id: 5, block: 'EMPREENDIMENTO', text: 'Como os dados fluem pela empresa (Finanças, Vendas, RH, Logística)?', options: [
      { id: 'A', text: 'Temos "ilhas de dados". Os departamentos não se falam.', pts: 1 },
      { id: 'B', text: 'Planilhas (geralmente com erros) são trocadas por e-mail.', pts: 2 },
      { id: 'C', text: 'Temos sistemas robustos, mas os dados ainda precisam de conciliação manual.', pts: 3 },
      { id: 'D', text: 'Possuímos uma única versão da verdade, gerida com uma perspectiva empresarial total.', pts: 4 }
    ]},
    { id: 6, block: 'EMPREENDIMENTO', text: 'Quando há um problema complexo (ex: margem de um produto caindo), como ele é investigado?', options: [
      { id: 'A', text: 'No escuro. Descobrimos tarde demais.', pts: 1 },
      { id: 'B', text: 'Cada departamento apresenta sua versão e a culpa é transferida.', pts: 2 },
      { id: 'C', text: 'Um comitê se reúne para tentar cruzar dados de diferentes bases.', pts: 3 },
      { id: 'D', text: 'Plataformas visuais mostram a raiz do problema quase em tempo real.', pts: 4 }
    ]},
    { id: 7, block: 'EMPREENDIMENTO', text: 'O financiamento de tecnologia na sua empresa é feito como?', options: [
      { id: 'A', text: 'Quando quebra, a gente compra.', pts: 1 },
      { id: 'B', text: 'Cada área compra seus softwares, gerando fragmentação.', pts: 2 },
      { id: 'C', text: 'Centralizado na TI, mas sem grande alinhamento com a estratégia do negócio.', pts: 3 },
      { id: 'D', text: 'TI e Negócios operam lado a lado, investindo no que traz vantagem competitiva.', pts: 4 }
    ]},
    { id: 8, block: 'EMPREENDIMENTO', text: 'Qual o nível de automação das decisões táticas diárias?', options: [
      { id: 'A', text: 'Zero. Tudo depende de aprovação humana manual.', pts: 1 },
      { id: 'B', text: 'Apenas em aprovações financeiras básicas de sistema.', pts: 2 },
      { id: 'C', text: 'Algumas regras de negócio alertam gestores sobre exceções.', pts: 3 },
      { id: 'D', text: 'Algoritmos tomam decisões automatizadas e integradas.', pts: 4 }
    ]},
    { id: 9, block: 'DADOS', text: 'Qual a qualidade atual da base de dados da empresa?', options: [
      { id: 'A', text: 'Inconsistente, cheia de duplicidades e falta de padrão.', pts: 1 },
      { id: 'B', text: 'Requer semanas de limpeza manual.', pts: 2 },
      { id: 'C', text: 'Organizada, mas presa dentro dos sistemas de origem (ERP/CRM).', pts: 3 },
      { id: 'D', text: 'Dados integrados, precisos e disponíveis em repositórios corporativos.', pts: 4 }
    ]},
    { id: 10, block: 'DADOS', text: 'O que vocês fazem com o gigantesco volume de dados gerado todos os dias?', options: [
      { id: 'A', text: 'Não armazenamos, ou só guardamos por obrigação fiscal.', pts: 1 },
      { id: 'B', text: 'Criamos relatórios para ver "o que aconteceu" (Análise Descritiva).', pts: 2 },
      { id: 'C', text: 'Tentamos responder "por que aconteceu" com cruzamento de dados.', pts: 3 },
      { id: 'D', text: 'Usamos algoritmos para saber "o que vai acontecer" (Preditiva e Prescritiva).', pts: 4 }
    ]},
    { id: 11, block: 'DADOS', text: 'Como vocês utilizam informações externas (mercado, concorrência, clima)?', options: [
      { id: 'A', text: 'Nunca usamos.', pts: 1 },
      { id: 'B', text: 'De forma pontual, lendo notícias ou relatórios esporádicos.', pts: 2 },
      { id: 'C', text: 'Compramos dados de terceiros, mas não integramos aos nossos.', pts: 3 },
      { id: 'D', text: 'Vasculhamos o mercado e cruzamos variáveis externas aos nossos algoritmos.', pts: 4 }
    ]},
    { id: 12, block: 'DADOS', text: 'Quem na empresa tem facilidade de acessar insights nos dados?', options: [
      { id: 'A', text: 'Ninguém confia nos dados atuais.', pts: 1 },
      { id: 'B', text: 'Apenas especialistas de TI que extraem os relatórios.', pts: 2 },
      { id: 'C', text: 'Gerentes que recebem dashboards padronizados.', pts: 3 },
      { id: 'D', text: 'Gestores possuem "análise de autoatendimento" e painéis em tempo real.', pts: 4 }
    ]},
    { id: 13, block: 'ALVOS', text: 'Ao traçar a estratégia, onde a empresa aplica seus maiores esforços de análise?', options: [
      { id: 'A', text: 'Atiramos para todos os lados sem alvo definido.', pts: 1 },
      { id: 'B', text: 'Tentamos melhorar atividades funcionais desconexas.', pts: 2 },
      { id: 'C', text: 'Escolhemos métricas-chave, mas reagimos em vez de antecipar.', pts: 3 },
      { id: 'D', text: 'Focamos pesadamente na nossa competência distintiva para dominar o mercado.', pts: 4 }
    ]},
    { id: 14, block: 'ALVOS', text: 'Na hora de gerir clientes, qual é o nível de precisão?', options: [
      { id: 'A', text: 'Tratamos todos os clientes exatamente da mesma forma.', pts: 1 },
      { id: 'B', text: 'Dividimos em blocos demográficos amplos.', pts: 2 },
      { id: 'C', text: 'Identificamos os mais rentáveis e focamos neles.', pts: 3 },
      { id: 'D', text: 'Calculamos a propensão de compra para ofertas hiperpersonalizadas em tempo real.', pts: 4 }
    ]},
    { id: 15, block: 'ALVOS', text: 'Como vocês precificam produtos ou serviços?', options: [
      { id: 'A', text: 'Baseado no custo mais uma margem, ou copiando o concorrente.', pts: 1 },
      { id: 'B', text: 'Fazemos descontos quando as vendas caem.', pts: 2 },
      { id: 'C', text: 'Usamos planilhas que sugerem faixas de preços sazonais.', pts: 3 },
      { id: 'D', text: 'Precificação dinâmica ajustada à curva de demanda e elasticidade.', pts: 4 }
    ]},
    { id: 16, block: 'ALVOS', text: 'Na hora de inovar ou lançar um produto, qual é a base da decisão?', options: [
      { id: 'A', text: 'Palpite do dono ou cópia do mercado.', pts: 1 },
      { id: 'B', text: 'Pesquisas tradicionais e longas reuniões de comitê.', pts: 2 },
      { id: 'C', text: 'Observamos o histórico do que deu certo antes.', pts: 3 },
      { id: 'D', text: 'Simulações profundas, modelagem preditiva e testes experimentais rigorosos.', pts: 4 }
    ]},
    { id: 17, block: 'ANALISTAS', text: 'Quem é o responsável por gerar inteligência competitiva hoje?', options: [
      { id: 'A', text: 'Não temos essa função.', pts: 1 },
      { id: 'B', text: 'Funcionários usando Excel que perdem 80% do tempo arrumando planilhas.', pts: 2 },
      { id: 'C', text: 'Analistas que estão ilhados em departamentos específicos.', pts: 3 },
      { id: 'D', text: 'Um CDAO e uma equipe centralizada de cientistas de dados.', pts: 4 }
    ]},
    { id: 18, block: 'ANALISTAS', text: 'Como é o treinamento para letramento em dados (data literacy) da sua equipe?', options: [
      { id: 'A', text: 'Inexistente.', pts: 1 },
      { id: 'B', text: 'Restrito a ensinar a equipe a operar o sistema de gestão.', pts: 2 },
      { id: 'C', text: 'Gestores são treinados para ler indicadores de performance.', pts: 3 },
      { id: 'D', text: 'Constante. Exigimos habilidades numéricas desde o recrutamento.', pts: 4 }
    ]},
    { id: 19, block: 'ANALISTAS', text: 'Quais ferramentas a equipe de estratégia utiliza no dia a dia?', options: [
      { id: 'A', text: 'Calculadoras, cadernos e instinto.', pts: 1 },
      { id: 'B', text: 'Excel e funções matemáticas.', pts: 2 },
      { id: 'C', text: 'Ferramentas de Business Intelligence (BI) para relatórios visuais.', pts: 3 },
      { id: 'D', text: 'Softwares preditivos, Machine Learning, R ou Python.', pts: 4 }
    ]},
    { id: 20, block: 'ANALISTAS', text: 'O que acontece quando os dados apresentam um cenário contraintuitivo?', options: [
      { id: 'A', text: 'Geram desconfiança e são rapidamente engavetados.', pts: 1 },
      { id: 'B', text: 'Acham interessante, mas a empresa não sabe como executar.', pts: 2 },
      { id: 'C', text: 'O RH ou a TI são culpados pelos números "estranhos".', pts: 3 },
      { id: 'D', text: 'A liderança confia no modelo, ajusta a estratégia e cria testes experimentais.', pts: 4 }
    ]}
  ]

  const totalQuestions = perguntas.length
  const currentProgress = totalQuestions > 0 ? ((currentQuestion) / totalQuestions) * 100 : 0

  const handleStartQuiz = () => {
    // Passo 0: Captura de Lead
    if (!lead.nome || !lead.empresa || !lead.email || !lead.whatsapp) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }
    setStep('mural')
  }

  const handleAnswerSelect = (optId: string) => {
    setAnswers(prev => ({ ...prev, [perguntas[currentQuestion].id]: optId }))
    
    setTimeout(() => {
      const nextQ = currentQuestion + 1;
      if (nextQ < totalQuestions) {
        if (blocosMotivacionais[nextQ]) {
          // If next question lands on a block transition index
          setCurrentQuestion(nextQ)
          setStep('mural')
        } else {
          setCurrentQuestion(nextQ)
        }
      } else {
        handleSubmit()
      }
    }, 200)
  }

  const handleSubmit = async () => {
    setStep('loading')
    // Calculate average score
    let totalScore = 0;
    let counts: Record<string, number> = { 'LIDERANÇA': 0, 'EMPREENDIMENTO': 0, 'DADOS': 0, 'ALVOS': 0, 'ANALISTAS': 0 };
    let aggregates: Record<string, number> = { 'LIDERANÇA': 0, 'EMPREENDIMENTO': 0, 'DADOS': 0, 'ALVOS': 0, 'ANALISTAS': 0 };

    perguntas.forEach(q => {
      const ansId = answers[q.id];
      const opt = q.options.find(o => o.id === ansId);
      if (opt) {
          totalScore += opt.pts;
          aggregates[q.block] += opt.pts;
          counts[q.block] += 1;
      }
    });

    const averageScore = totalScore / 20;
    
    // Find bottleneck (mínima nota média)
    let minAvg = 4.0;
    let gargalo = 'DADOS';
    Object.keys(aggregates).forEach(b => {
      const avg = aggregates[b] / counts[b];
      if (avg < minAvg) {
        minAvg = avg;
        gargalo = b;
      }
    });

    const result = await saveDiagnostico(lead, answers); // Already updates score inline
    if (result.success) {
      setScoreData({ score: averageScore, gargalo: gargalo });
      setStep('result');
    } else {
      alert('Erro ao processar. Prosseguindo simulado.');
      setScoreData({ score: averageScore, gargalo: gargalo });
      setStep('result');
    }
  }

  const getEstagioNome = (score: number) => {
    if (score >= 3.9) return { nome: 'Estágio 5: Competidores Analíticos', img: '/arkos_diagnostico_e5_1774345637269.png' }
    if (score >= 3.5) return { nome: 'Estágio 4: Empresas Analíticas', img: '/arkos_diagnostico_e4_1774345618307.png' }
    if (score >= 2.7) return { nome: 'Estágio 3: Aspirantes Analíticos', img: '/arkos_diagnostico_e3_1774345596147.png' }
    if (score >= 1.9) return { nome: 'Estágio 2: Análise Localizada', img: '/arkos_diagnostico_e2_1774345580705.png' }
    return { nome: 'Estágio 1: Deficientes Analíticos', img: '/arkos_diagnostico_e1_1774345563597.png' }
  }

  return (
    <div className={styles.container} style={{ minHeight: '100vh', background: '#0A0C0F', color: '#F4F2ED', paddingTop: '40px' }}>
      
      {/* Barra de Progresso Superior */}
      {(step === 'mural' || step === 'quiz') && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', background: '#111318', zIndex: 1000 }}>
          <div style={{ height: '100%', background: '#C8F542', width: `${currentProgress}%`, transition: 'width 0.3s ease' }} />
        </div>
      )}

      {/* Persistent Logo Header for perfect alignment */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', zIndex: 10 }}>
        <div style={{ maxWidth: '500px', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Back Button */}
          <Link href="/" style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: '#8A8F99', textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Voltar
          </Link>
          
          <Link href="/">
            <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: '32px', opacity: 1, cursor: 'pointer' }} />
          </Link>
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {step === 'lead' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            className={styles.quizSection} 
            style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className={styles.quizContainer} style={{ background: '#111318', border: '1px solid #1F242D', maxWidth: '500px', width: '100%', margin: '0' }}>
              <h3 className={styles.title} style={{ fontSize: '1.75rem', textAlign: 'center', color: '#C8F542' }}>Descubra a Maturidade Analítica da sua Empresa</h3>
              <p className={styles.description} style={{ color: '#8A8F99', textAlign: 'center' }}>Preencha os dados obrigatórios para iniciar o questionário.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                <input className={styles.input} placeholder="Nome Completo" value={lead.nome} onChange={e => setLead(p => ({ ...p, nome: e.target.value }))} />
                <input className={styles.input} placeholder="Nome da Empresa" value={lead.empresa} onChange={e => setLead(p => ({ ...p, empresa: e.target.value }))} />
                <input className={styles.input} placeholder="E-mail Corporativo" value={lead.email} onChange={e => setLead(p => ({ ...p, email: e.target.value }))} />
                <input className={styles.input} placeholder="WhatsApp" value={lead.whatsapp} onChange={e => setLead(p => ({ ...p, whatsapp: e.target.value }))} />
                
                <button className={styles.btnPrimary} style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }} onClick={handleStartQuiz}>
                  Iniciar Diagnóstico <ArrowRight size={20} color="#0A0C0F" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'mural' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className={styles.quizSection}>
            <div className={styles.quizContainer} style={{ textAlign: 'center', padding: '40px', background: 'transparent' }}>
              <Sparkles size={40} color="#C8F542" style={{ margin: '0 auto 20px auto' }} />
              <h2 style={{ fontSize: '1.8rem', color: '#C8F542', fontWeight: 800, marginBottom: '20px' }}>
                {perguntas[currentQuestion]?.block}
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#F4F2ED', maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: 1.6 }}>
                "{blocosMotivacionais[currentQuestion]}"
              </p>
              <button className={styles.btnPrimary} style={{ margin: '0 auto' }} onClick={() => setStep('quiz')}>
                Continuar <ArrowRight size={20} color="#0A0C0F" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && perguntas[currentQuestion] && (
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className={styles.quizSection}>
            <div className={styles.quizContainer} style={{ background: '#111318', border: '1px solid #1F242D', maxWidth: '700px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#C8F542', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                <span>{perguntas[currentQuestion].block}</span>
                <span>{currentQuestion + 1} / {totalQuestions}</span>
              </div>
              <h4 style={{ fontSize: '1.35rem', color: '#F4F2ED', fontWeight: 700, marginBottom: '24px', lineHeight: 1.4 }}>
                {perguntas[currentQuestion].text}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {perguntas[currentQuestion].options.map((opt) => (
                  <button key={opt.id} className={`${styles.optionCard} ${answers[perguntas[currentQuestion].id] === opt.id ? styles.optionCardActive : ''}`} onClick={() => handleAnswerSelect(opt.id)}>
                    <span style={{ color: '#C8F542', fontWeight: 800, marginRight: '8px' }}>{opt.id})</span> {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div className={styles.quizSection} style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className={styles.pulseMeter}>...</div>
            <p style={{ color: '#C8F542' }}>Processando Inteligência de Dados...</p>
          </motion.div>
        )}

        {step === 'result' && scoreData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.quizSection} style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', background: '#111318', border: '1px solid #1F242D', padding: '40px', borderRadius: '16px', textAlign: 'left' }}>
              
              {/* Left Side: Results */}
              <div style={{ flex: 1 }}>
                <Trophy size={48} color="#C8F542" style={{ marginBottom: '16px' }} />
                <h2 style={{ fontSize: '1.4rem', color: '#F4F2ED', marginBottom: '8px' }}>Resultado do Diagnóstico</h2>
                
                <div className={styles.pulseMeter} style={{ color: '#C8F542', borderColor: '#C8F542', margin: '0 0 16px 0', width: '60px', height: '60px', fontSize: '1.5rem', lineHeight: '60px' }}>
                  {scoreData.score.toFixed(1)}
                </div>

                <h3 style={{ fontSize: '1.5rem', color: '#C8F542', fontWeight: 800, marginBottom: '24px' }}>
                  {getEstagioNome(scoreData.score).nome}
                </h3>

                <div style={{ background: '#1F242D', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                  <p style={{ color: '#8A8F99', fontSize: '0.85rem', marginBottom: '4px' }}>Maior gargalo estratégico:</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F4F2ED', fontWeight: 700 }}>
                    <AlertTriangle size={20} color="#C8F542" /> {scoreData.gargalo}
                  </div>
                </div>

                <div style={{ background: '#1F242D', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(200,245,66,0.1)' }}>
                  <p style={{ color: '#C8F542', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '1px' }}>RECOMENDAÇÃO:</p>
                  <p style={{ color: '#F4F2ED', fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                    {scoreData.gargalo === 'DADOS' && '🚀 Arkos Hub e Governança de Dados'}
                    {(scoreData.gargalo === 'LIDERANÇA' || scoreData.gargalo === 'ANALISTAS') && '🎓 Arkos EdTech e Planejamento Estratégico'}
                    {(scoreData.gargalo === 'EMPREENDIMENTO' || scoreData.gargalo === 'ALVOS') && '💼 Arkos Suite e Inteligência de Mercado'}
                  </p>
                  <p style={{ color: '#8A8F99', fontSize: '0.8rem', lineHeight: '1.5' }}>
                    Esta solução foi selecionada para atuar na raiz do seu gargalo e acelerar sua jornada rumo ao Estágio 5.
                  </p>
                </div>

                <Link href="/solucoes" className={styles.btnPrimary} style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                  Conheça as Soluções no Hub Arkos
                </Link>

                {/* Botão de Voltar para Home */}
                <Link href="/" style={{ display: 'block', marginTop: '16px', color: '#8A8F99', textDecoration: 'none', fontSize: '0.85rem', textAlign: 'center' }}>
                  ← Voltar para a tela principal
                </Link>
              </div>

              {/* Right Side: Round Image representing the Stage */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={getEstagioNome(scoreData.score).img} 
                  alt={getEstagioNome(scoreData.score).nome} 
                  style={{ width: '100%', maxWidth: '420px', height: 'auto', borderRadius: '24px', objectFit: 'cover', aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.05)' }} 
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
