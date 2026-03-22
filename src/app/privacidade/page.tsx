"use client"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import styles from '../page.module.css'

export default function Privacidade() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 24px', color: '#F4F2ED', lineHeight: '1.8' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8A8F99', textDecoration: 'none', marginBottom: '40px', fontSize: '0.9rem', transition: 'color 0.2s' }}>
        <ArrowLeft size={16} /> Voltar para o início
      </Link>
      
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '40px', color: '#FFF' }}>Privacidade e Termos de Uso</h1>
      
      <div style={{ color: '#8A8F99', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <p>A sua privacidade é importante para nós. É política da <strong>Arkos Intelligence</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar em nosso site e outros sistemas que possuímos e operamos.</p>

        <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemos por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>

        <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

        <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei ou para a execução direta da infraestrutura de inteligência contratada pelas empresas clientes sob rigoroso NDA.</p>

        <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>

        <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços web ou demonstrativos desejados.</p>

        <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se tiver alguma dúvida sobre como lidamos com dados do usuário e de corporações clientes, entre em contato com nosso conselho administrativo.</p>
        
        <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
          Termos elaborados e atualizados pela equipe Arkos Intelligence. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
