import type { PontoSerie } from '@/domain/entities/mevos/PontoSerie'

/**
 * Cliente da API SIDRA do IBGE (servicodados.ibge.gov.br/api/v3).
 * Sem auth, JSON. Usa view=flat para parse simples.
 *
 * Atenção: agregado 8158 (briefing antigo) foi descontinuado em dez/2022.
 * O sucessor ativo é o 8888 (PIM-PF base 2022=100).
 */
const BASE_URL = 'https://servicodados.ibge.gov.br/api/v3/agregados'

interface SidraPontoFlat {
  NC: string                                       // nível territorial código
  NN: string                                       // nível territorial nome
  MC: string                                       // unidade medida código
  MN: string                                       // unidade medida nome
  V: string                                        // valor (numeric string ou '-' para sigilo)
  D1C: string; D1N: string                         // localidade
  D2C: string; D2N: string                         // período (YYYYMM)
  D3C: string; D3N: string                         // variável
  [k: string]: string
}

function parseSidraPeriodo(yyyymm: string): string {
  // '202603' → '2026-03-01'
  const y = yyyymm.substring(0, 4)
  const m = yyyymm.substring(4, 6)
  return `${y}-${m}-01`
}

export class IBGEClient {
  /**
   * Busca uma série PIM-PF (ou outro agregado SIDRA) para um período.
   *
   * @param agregado  ID do agregado (ex: 8888)
   * @param variavel  ID da variável (ex: 12606 = número-índice)
   * @param classificacao  Filtro de classificação (ex: '544[129333]' = Metalurgia)
   * @param periodoInicio  YYYYMM (ex: '202504')
   * @param periodoFim     YYYYMM (ex: '202603')
   * @param nivel  'N1' (Brasil), 'N2' (região), 'N3' (UF). Default N1.
   */
  static async serie(opts: {
    agregado: number
    variavel: number
    classificacao: string
    periodoInicio: string
    periodoFim: string
    nivel?: 'N1' | 'N2' | 'N3'
  }): Promise<PontoSerie[]> {
    const nivel = opts.nivel ?? 'N1'
    const url =
      `${BASE_URL}/${opts.agregado}` +
      `/periodos/${opts.periodoInicio}-${opts.periodoFim}` +
      `/variaveis/${opts.variavel}` +
      `?localidades=${nivel}%5Ball%5D` +
      `&classificacao=${encodeURIComponent(opts.classificacao)}` +
      `&view=flat`

    const res = await fetch(url, { next: { revalidate: 86400 } }) // 24h cache

    if (!res.ok) {
      throw new Error(`IBGE SIDRA ${opts.agregado}/${opts.variavel}: HTTP ${res.status}`)
    }

    const raw = (await res.json()) as SidraPontoFlat[]
    // Primeiro elemento é o header de descrição — pular
    const dados = raw.slice(1).filter((p) => p.V !== '-' && p.V !== '...')

    return dados.map((p) => ({
      data: parseSidraPeriodo(p.D2C),
      valor: Number(p.V),
    }))
  }

  /**
   * Helpers de período: gera string YYYYMM relativa a hoje.
   * Útil para "últimos 12 meses".
   */
  static periodoMesesAtras(meses: number): string {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - meses)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    return `${y}${m}`
  }
}
