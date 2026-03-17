import { createClient } from '../../infrastructure/supabase/server'

export class JobAlertas {
  /**
   * Varre os contratos e obrigações gerando alertas na tabela alertas_contrato.
   */
  async executarVarredura(): Promise<{ gerados: number }> {
    const supabase = await createClient()
    let alertasGerados = 0;

    // 1. Alerta: Obrigações Atrasadas (data < hoje e status = pendente)
    const hoje = new Date().toISOString().split('T')[0]
    
    const { data: obrigações } = await supabase
      .from('obrigacoes_contrato')
      .select('*, contratos(empresa_id)')
      .eq('status', 'pendente')
      .lt('data_consolidado', hoje)

    if (obrigações) {
      for (const o of obrigações) {
        // Verificar se já existe alerta pendente para essa obrigação
        const { data: existe } = await supabase
          .from('alertas_contrato')
          .select('id')
          .eq('contrato_id', o.contrato_id)
          .eq('tipo_alerta', 'obrigacao_atrasada')
          .eq('status_alerta', 'pendente')
          .single()

        if (!existe) {
          await supabase.from('alertas_contrato').insert({
            contrato_id: o.contrato_id,
            empresa_id: o.contratos?.empresa_id,
            tipo_alerta: 'obrigacao_atrasada',
            descricao: `Obrigação atrasada: '${o.titulo}'. Prazo era ${new Date(o.data_consolidado).toLocaleDateString('pt-BR')}`,
            status_alerta: 'pendente'
          })
          alertasGerados++
        }
      }
    }

    // 2. Alerta: Contratos Próximos do Vencimento (Filtro por expirando nos proximos 30 dias)
    const trintaDias = new Date()
    trintaDias.setDate(trintaDias.getDate() + 30)
    const dataLimite = trintaDias.toISOString().split('T')[0]

    const { data: contratos } = await supabase
      .from('contratos')
      .select('*')
      .eq('status', 'vigente')
      .lt('data_fim', dataLimite)
      .gt('data_fim', hoje)

    if (contratos) {
      for (const c of contratos) {
        const { data: existe } = await supabase
          .from('alertas_contrato')
          .select('id')
          .eq('contrato_id', c.id)
          .eq('tipo_alerta', 'proximo_vencimento')
          .eq('status_alerta', 'pendente')
          .single()

        if (!existe) {
          await supabase.from('alertas_contrato').insert({
            contrato_id: c.id,
            empresa_id: c.empresa_id,
            tipo_alerta: 'proximo_vencimento',
            descricao: `Contrato expirando em breve. Fim da vigência: ${new Date(c.data_fim).toLocaleDateString('pt-BR')}`,
            status_alerta: 'pendente'
          })
          alertasGerados++
        }
      }
    }

    return { gerados: alertasGerados }
  }
}
  
