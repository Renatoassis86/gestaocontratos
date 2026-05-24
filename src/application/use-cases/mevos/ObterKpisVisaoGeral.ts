import { BCBClient } from '@/infrastructure/data-sources/BCBClient'
import type { Kpi } from '@/domain/entities/mevos/PontoSerie'

/**
 * Monta os 5 KPIs do topo da Visão Geral fazendo fetch direto no BCB.
 * Cada KPI é independente: se algum falhar, retorna placeholder.
 */
export async function obterKpisVisaoGeral(): Promise<Kpi[]> {
  const especificacoes: Array<{
    id: string
    codigoBcb: number
    label: string
    unidade: string
    fmt: (v: number) => number
    deltaLabel: string
  }> = [
    { id: 'usd',   codigoBcb: 1,     label: 'Dólar comercial',   unidade: 'R$',     fmt: (v) => Number(v.toFixed(4)), deltaLabel: 'vs dia anterior' },
    { id: 'eur',   codigoBcb: 21619, label: 'Euro',              unidade: 'R$',     fmt: (v) => Number(v.toFixed(4)), deltaLabel: 'vs dia anterior' },
    { id: 'selic', codigoBcb: 432,   label: 'Meta Selic',        unidade: '% a.a.', fmt: (v) => Number(v.toFixed(2)), deltaLabel: 'meta vigente' },
    { id: 'ipca',  codigoBcb: 433,   label: 'IPCA (mês)',        unidade: '%',      fmt: (v) => Number(v.toFixed(2)), deltaLabel: 'vs mês anterior' },
    { id: 'pim',   codigoBcb: 28503, label: 'PIM-PF Indústria 12m', unidade: 'índice', fmt: (v) => Number(v.toFixed(1)), deltaLabel: 'vs mês anterior' },
  ]

  const resultados = await Promise.allSettled(
    especificacoes.map(async (spec) => {
      const { atual, deltaPct } = await BCBClient.ultimoComDelta(spec.codigoBcb)
      const destaque: Kpi['destaque'] = deltaPct == null
        ? 'neutro'
        : deltaPct > 0
          ? 'positivo'
          : deltaPct < 0
            ? 'negativo'
            : 'neutro'

      return {
        id: spec.id,
        label: spec.label,
        valor: spec.fmt(atual.valor),
        unidade: spec.unidade,
        delta: deltaPct == null ? undefined : Number(deltaPct.toFixed(2)),
        deltaLabel: spec.deltaLabel,
        fonte: 'BCB',
        dataRef: atual.data,
        destaque,
      } satisfies Kpi
    })
  )

  return resultados.map((r, i): Kpi => {
    if (r.status === 'fulfilled') return r.value
    // fallback se a API falhar
    const spec = especificacoes[i]
    return {
      id: spec.id,
      label: spec.label,
      valor: 0,
      unidade: spec.unidade,
      fonte: 'BCB (indisponível)',
      dataRef: new Date().toISOString().slice(0, 10),
      destaque: 'neutro',
    }
  })
}
