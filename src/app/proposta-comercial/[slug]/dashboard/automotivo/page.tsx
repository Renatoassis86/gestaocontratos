import styles from '../_styles.module.css'

export const dynamic = 'force-dynamic'

export default function AutomotivoPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Mercado Automotivo</h1>
        <p className={styles.pageSubtitle}>
          Produção e licenciamento de veículos ANFAVEA, ranking FENABRAVE
          e balança comercial de autopeças SindiPeças.
        </p>
      </header>

      <div className={styles.constructionCard}>
        <h2 className={styles.constructionTitle}>Em construção</h2>
        <p className={styles.constructionText}>
          Esta aba será preenchida na Onda 2 com: produção mensal ANFAVEA,
          top 10 modelos FENABRAVE, exportações/importações NCM 87 (ComexStat)
          e mix de canal SindiPeças.
        </p>
      </div>
    </>
  )
}
