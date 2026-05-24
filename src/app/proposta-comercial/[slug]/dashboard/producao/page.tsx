import styles from '../_styles.module.css'

export const dynamic = 'force-dynamic'

export default function ProducaoPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Produção Setorial</h1>
        <p className={styles.pageSubtitle}>
          PIM-PF metalurgia e produtos de metal por UF, capacidade utilizada
          da indústria e emprego formal.
        </p>
      </header>

      <div className={styles.constructionCard}>
        <h2 className={styles.constructionTitle}>Em construção</h2>
        <p className={styles.constructionText}>
          Esta aba será preenchida na Onda 2 do MVP com: produção física por
          CNAE 24 e CNAE 25 (IBGE), mapa interativo Brasil por UF, e correlação
          com utilização de capacidade da CNI.
        </p>
      </div>
    </>
  )
}
