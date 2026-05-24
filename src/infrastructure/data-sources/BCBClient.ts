import type { PontoSerie } from '@/domain/entities/mevos/PontoSerie'

/**
 * Cliente da API SGS (Sistema Gerenciador de Séries Temporais) do Banco Central.
 * Sem auth, JSON simples no formato [{data: 'DD/MM/YYYY', valor: 'X.XX'}].
 */
const BASE_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs'

interface BcbPontoRaw {
  data: string   // 'DD/MM/YYYY'
  valor: string  // numeric string
}

function parseBcbData(ddmmyyyy: string): string {
  const [d, m, y] = ddmmyyyy.split('/')
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}

export class BCBClient {
  /**
   * Busca os últimos N pontos de uma série SGS.
   * Cache padrão do Next.js de 5 min (revalidate).
   */
  static async ultimos(codigo: number, n: number = 30): Promise<PontoSerie[]> {
    const url = `${BASE_URL}.${codigo}/dados/ultimos/${n}?formato=json`
    const res = await fetch(url, { next: { revalidate: 300 } })

    if (!res.ok) {
      throw new Error(`BCB SGS ${codigo}: HTTP ${res.status}`)
    }

    const raw = (await res.json()) as BcbPontoRaw[]
    return raw.map((p) => ({
      data: parseBcbData(p.data),
      valor: Number(p.valor),
    }))
  }

  /**
   * Busca o ÚLTIMO ponto da série + o anterior, para calcular delta.
   */
  static async ultimoComDelta(codigo: number): Promise<{
    atual: PontoSerie
    anterior: PontoSerie | null
    deltaPct: number | null
  }> {
    const pontos = await this.ultimos(codigo, 2)
    if (pontos.length === 0) {
      throw new Error(`BCB SGS ${codigo}: sem dados`)
    }
    const atual = pontos[pontos.length - 1]
    const anterior = pontos.length > 1 ? pontos[pontos.length - 2] : null
    const deltaPct =
      anterior && anterior.valor !== 0
        ? ((atual.valor - anterior.valor) / anterior.valor) * 100
        : null
    return { atual, anterior, deltaPct }
  }
}
