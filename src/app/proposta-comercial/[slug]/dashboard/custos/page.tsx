import styles from '../_styles.module.css'

export const dynamic = 'force-dynamic'

export default function CustosPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Custos & Insumos</h1>
        <p className={styles.pageSubtitle}>
          Preços internacionais de aço, custos de energia e diesel, e dissídios
          coletivos do setor metalúrgico (DIEESE).
        </p>
      </header>

      <div className={styles.constructionCard}>
        <h2 className={styles.constructionTitle}>Em construção</h2>
        <p className={styles.constructionText}>
          Esta aba será preenchida na Onda 2 com: US$/kg de aço (ComexStat
          NCM 72), preço diesel ANP, IPA metalúrgicos BCB e convenção
          coletiva DIEESE Metalúrgicos SP.
        </p>
      </div>
    </>
  )
}
