import styles from '../_styles.module.css'

export const dynamic = 'force-dynamic'

export default function MacroPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Macroeconômico</h1>
        <p className={styles.pageSubtitle}>
          Câmbio multidivisas, juros, inflação e indicadores de confiança.
          Séries históricas BCB SGS de longo prazo.
        </p>
      </header>

      <div className={styles.constructionCard}>
        <h2 className={styles.constructionTitle}>Em construção</h2>
        <p className={styles.constructionText}>
          Esta aba será preenchida na Onda 2 com: histórico USD/EUR (10 anos),
          Selic vs IPCA com hiato real, IGP-M, IBC-Br e ICEI de confiança CNI.
        </p>
      </div>
    </>
  )
}
