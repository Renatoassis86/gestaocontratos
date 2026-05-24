import { obterKpisVisaoGeral } from '@/application/use-cases/mevos/ObterKpisVisaoGeral'
import { IBGEClient } from '@/infrastructure/data-sources/IBGEClient'
import { KpiCard } from './_components/KpiCard'
import { SerieTemporalChart } from './_components/SerieTemporalChart'
import { BadgeFonte } from './_components/BadgeFonte'
import styles from './_styles.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // 5 min

export default async function VisaoGeralPage() {
  // Em paralelo: KPIs do BCB + PIM-PF Metalurgia dos últimos 12 meses
  const [kpis, pimMetalurgia] = await Promise.all([
    obterKpisVisaoGeral(),
    IBGEClient.serie({
      agregado: 8888,
      variavel: 12606,                 // Número-índice (2022=100)
      classificacao: '544[129333]',    // 3.24 Metalurgia
      periodoInicio: IBGEClient.periodoMesesAtras(13),
      periodoFim: IBGEClient.periodoMesesAtras(1),
      nivel: 'N1',
    }).catch(() => []),
  ])

  // Ordenar ascendente para o gráfico (do mais antigo para o mais recente)
  const pimOrdenado = [...pimMetalurgia].sort((a, b) => a.data.localeCompare(b.data))
  const ultimoPonto = pimOrdenado[pimOrdenado.length - 1]

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Visão Geral · Grupo Mevos</h1>
        <p className={styles.pageSubtitle}>
          Indicadores macroeconômicos e de produção industrial em tempo real,
          alimentados pelas APIs públicas do Banco Central do Brasil e IBGE.
        </p>
      </header>

      {/* ─── KPIs do topo ─── */}
      <section className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      {/* ─── PIM-PF Metalurgia ─── */}
      <section className={styles.chartCard}>
        <div className={styles.chartCardHeader}>
          <div>
            <h2 className={styles.chartTitle}>
              Produção Física da Metalurgia (CNAE 24)
            </h2>
            <p className={styles.chartSubtitle}>
              Número-índice base 2022=100 · últimos 12 meses · Brasil
            </p>
          </div>
          <BadgeFonte
            fonte="IBGE PIM-PF"
            atualizadoEm={ultimoPonto?.data}
          />
        </div>
        {pimOrdenado.length > 0 ? (
          <SerieTemporalChart
            pontos={pimOrdenado}
            cor="#C8F542"
            unidade="(2022=100)"
            ariaLabel="Produção física da metalurgia brasileira nos últimos 12 meses"
          />
        ) : (
          <div className={styles.constructionCard}>
            <p className={styles.constructionText}>
              Série temporariamente indisponível na API do IBGE. Tente novamente em alguns minutos.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
