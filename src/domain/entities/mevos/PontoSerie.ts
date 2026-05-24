export interface PontoSerie {
  data: string  // ISO YYYY-MM-DD
  valor: number
}

export interface SerieTemporal {
  id: string
  nome: string
  fonte: string
  unidade: string
  pontos: PontoSerie[]
  ultimaAtualizacao?: string
}

export interface Kpi {
  id: string
  label: string
  valor: number
  unidade: string
  delta?: number          // variação percentual vs ponto anterior
  deltaLabel?: string     // 'vs ontem' | 'vs mês anterior' etc
  fonte: string
  dataRef: string         // data do ponto exibido
  ultimaAtualizacao?: string
  destaque?: 'positivo' | 'negativo' | 'neutro'
}
