'use server'

import { createClient } from '@/infrastructure/supabase/client'

interface LeadData {
  nome: string
  empresa: string
  email: string
  whatsapp: string
}

export async function saveDiagnostico(lead: LeadData, respostas: Record<number, string>) {
  try {
    const supabase = createClient()

    // 1. Calcular Score Médio
    let sum = 0
    let count = 0
    const scores: Record<string, number> = { L: 0, E: 0, D: 0, T: 0, A: 0 }
    const counts: Record<string, number> = { L: 0, E: 0, D: 0, T: 0, A: 0 }

    Object.entries(respostas).forEach(([key, value]) => {
      const qIndex = parseInt(key)
      const valueMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 }
      const numericValue = valueMap[value] || 0
      sum += numericValue
      count++

      // Identificar bloco
      let bloco = ''
      if (qIndex >= 1 && qIndex <= 4) bloco = 'L'
      else if (qIndex >= 5 && qIndex <= 8) bloco = 'E'
      else if (qIndex >= 9 && qIndex <= 12) bloco = 'D'
      else if (qIndex >= 13 && qIndex <= 16) bloco = 'T'
      else if (qIndex >= 17 && qIndex <= 20) bloco = 'A'

      if (bloco) {
        scores[bloco] += numericValue
        counts[bloco]++
      }
    })

    const scoreMedio = count > 0 ? sum / count : 1.0

    // 2. Determinar Estágio (Maturidade)
    let estagio = 1
    if (scoreMedio >= 3.9) estagio = 5
    else if (scoreMedio >= 3.5) estagio = 4
    else if (scoreMedio >= 2.7) estagio = 3
    else if (scoreMedio >= 1.9) estagio = 2

    // 3. Identificar Pior Nota (Área de Dor)
    let piorBloco = 'D'
    let menorMedia = 4.0
    const blocosMap: Record<string, string> = { D: 'DADOS', E: 'EMPREENDIMENTO', L: 'LIDERANÇA', T: 'ALVOS', A: 'ANALISTAS' }

    Object.entries(scores).forEach(([bloco, total]) => {
      const media = counts[bloco] > 0 ? total / counts[bloco] : 4.0
      if (media < menorMedia) {
        menorMedia = media
        piorBloco = bloco
      }
    })

    // 4. Salvar no Supabase
    const { data, error } = await supabase
      .from('arkos_diagnosticos')
      .insert({
        nome: lead.nome,
        empresa: lead.empresa,
        email: lead.email,
        whatsapp: lead.whatsapp,
        respostas: respostas,
        score: parseFloat(scoreMedio.toFixed(2)),
        estagio: estagio,
        area_dor: blocosMap[piorBloco] || 'DADOS'
      })
      .select()

    if (error) throw error

    return { success: true, data: data[0] }

  } catch (error: any) {
    console.error('Erro ao salvar diagnóstico:', error)
    return { success: false, error: error.message }
  }
}
