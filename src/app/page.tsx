import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.badge}>Etapa 1: Concluída</div>
          
          <h1 className={styles.title}>
            Gestão de Contratos <span className={styles.glow}>SaaS</span>
          </h1>
          
          <p className={styles.description}>
            A fundação técnica do seu CLM foi criada com sucesso usando Next.js e Supabase. 
            Pronto para modelar, escalar e conectar seu backend para auditorias e assinaturas eletrônicas.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>📂 Estrutura Modular</h3>
              <p>Arquitetura limpa com separação de domínios, aplicação e infraestrutura pré-configurada.</p>
            </div>

            <div className={styles.card}>
              <h3>⚡ Conexão Supabase</h3>
              <p>Wrapper para SSR e Client já inclusos. Integração com Autenticação e Storage por cookies.</p>
            </div>

            <div className={styles.card}>
              <h3>🛠️ SQL Migrations</h3>
              <p>Acesse `supabase/migrations` para importar o modelo das 15 entidades core do CLM.</p>
            </div>
          </div>

          <div className={styles.ctas}>
            <a href="/DOCS/GERAL.md" className={styles.primary}>
              Ver Documentação
            </a>
            <a href="https://supabase.com/dashboard" target="_blank" className={styles.secondary}>
              Painel Supabase
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

