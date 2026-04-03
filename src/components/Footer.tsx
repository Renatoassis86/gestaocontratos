"use client"
import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footerMega}>
      <div className={styles.footerGrid}>
        
        {/* Coluna Logo */}
        <div className={styles.footerCol}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <img src="/logo-high-res.svg" alt="ARKOS" style={{ height: '24px' }} />
          </div>
          <p style={{ lineHeight: '1.6', maxWidth: '240px' }}>
            A infraestrutura de inteligência da nova economia. Data · Intelligence · Decision.
          </p>
        </div>

        {/* Coluna Navegação (Espelhando Topo) */}
        <div className={styles.footerCol}>
          <h4>Navegação</h4>
          <Link href="/institucional/o-que-e">O que é a Arkos</Link>
          <Link href="/institucional/quem-somos">Quem somos</Link>
          <Link href="/institucional/equipe">Nossa equipe</Link>
          <Link href="/institucional/nosso-negocio">Nosso negócio</Link>
          <Link href="/institucional/o-problema">O Problema</Link>
          <Link href="/institucional/a-solucao">Solução</Link>
          <Link href="/institucional/o-ecossistema">Ecossistema</Link>
          <Link href="/institucional/o-hub-arkos">Hub Arkos</Link>
          <Link href="/diagnostico" target="_blank">Diagnóstico</Link>
          <Link href="/institucional/diferencial">Diferencial</Link>
          <Link href="/login" style={{ color: '#C8F542', fontWeight: 600 }}>Acesso restrito</Link>
        </div>

        {/* Coluna Ecossistema Hub */}
        <div className={styles.footerCol}>
          <h4>Ecossistema Hub</h4>
          <Link href="#modulos">Marketing Intelligence (MI)</Link>
          <Link href="#modulos">Governança de Dados e BI (GDB)</Link>
          <Link href="#modulos">Gestão Comercial (CRM)</Link>
          <Link href="#modulos">Gestão de Contratos (CLM)</Link>
          <Link href="#modulos">Arkos Talent Intelligence (ATI)</Link>
          <Link href="#modulos">Agentes de IA e Automação (AIA)</Link>
          <Link href="#modulos">Central de Comércio Inteligente (CCI)</Link>
          <Link href="#modulos">Aceleração de Crescimento (ACG)</Link>
          <Link href="#modulos">Planejamento Estratégico e Cenários (PEC)</Link>
          <Link href="#modulos">Edtech Academy (EDT)</Link>
          <Link href="#modulos">Gestão de Tecnologia e Cyber (GTC)</Link>
          <Link href="#modulos">Governança de Service Desk e Demandas (GSD)</Link>
        </div>

        {/* Coluna Contato */}
        <div className={styles.footerCol}>
          <h4>Fale Conosco</h4>
          <p>renato@arkosintelligence.com</p>
          <p>+55 (83) 98195-7737</p>
          <Link href="https://wa.me/5583981957737" target="_blank" style={{ color: '#C8F542', fontWeight: 600, borderBottom: '1px solid currentColor' }}>
            Falar com Consultor
          </Link>
        </div>

        {/* Coluna Localização */}
        <div className={styles.footerCol}>
          <h4>Localização</h4>
          <p style={{ lineHeight: '1.5' }}>
            Avenida João Machado, 849, Sala 801<br />
            Centro, João Pessoa - PB<br />
            CEP: 58013-522
          </p>
        </div>

      </div>
      
      <div className={styles.footerBottomBar}>
        {/* Esquerda: Privacidade */}
        <div style={{ textAlign: 'left' }}>
          <Link href="/privacidade" style={{ color: '#C8F542', textDecoration: 'none', fontWeight: 600 }}>Privacidade E Termos</Link>
        </div>

        {/* Centro: Direitos Autorais */}
        <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          © 2026 Arkos Intelligence. Todos os direitos reservados.
        </div>

        {/* Direita: Placeholder/Social ou outros */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: '#5A5F6A' }}>PB, Brasil · Global</span>
        </div>
      </div>
    </footer>
  )
}
