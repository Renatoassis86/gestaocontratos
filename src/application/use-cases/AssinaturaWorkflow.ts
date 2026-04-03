import { createClient } from '../../infrastructure/supabase/server'
import { SimuladoSignatureProvider } from '../../infrastructure/services/SimuladoSignatureProvider'
import { ISignatureProvider } from '../services/ISignatureProvider'

export class AssinaturaWorkflow {
  private provider: ISignatureProvider;

  constructor(provider: ISignatureProvider = new SimuladoSignatureProvider()) {
    this.provider = provider;
  }

  /**
   * 1. Preparar Signatários
   * Copia as partes de contrato_partes para contrato_signatarios se não existirem.
   */
  async prepararSignatarios(contratoId: string): Promise<void> {
    const supabase = await createClient()

    // Buscar partes
    const { data: partes } = await supabase
      .from('contrato_partes')
      .select('*, pessoas(email_contato)')
      .eq('contrato_id', contratoId)

    if (!partes) return

    for (const p of partes) {
      // Verificar se já existe como signatário
      const { data: existe } = await supabase
        .from('contrato_signatarios')
        .select('id')
        .eq('contrato_id', contratoId)
        .eq('pessoa_id', p.pessoa_id)
        .single()

      if (!existe) {
        await supabase
          .from('contrato_signatarios')
          .insert({
            contrato_id: contratoId,
            pessoa_id: p.pessoa_id,
            papel_assinatura: p.papel,
            status_assinatura: 'pronto_envio'
          })
      }
    }

    // Atualizar status do contrato para pronto_para_assinatura
    await supabase
      .from('contratos')
      .update({ status: 'pronto_para_assinatura' })
      .eq('id', contratoId)

    // Auditar evento
    await supabase.from('eventos_contrato').insert({
      contrato_id: contratoId,
      tipo_evento: 'preparacao_assinatura',
      descricao: 'Contrato preparado para assinatura. Signatários consolidados.'
    })
  }

  /**
   * 2. Enviar para Assinatura (Simulado)
   */
  async enviarParaAssinatura(contratoId: string): Promise<void> {
    const supabase = await createClient()

    // 1. Carregar Contrato e Arquivos vinculados
    const { data: contrato } = await supabase
      .from('contratos')
      .select('*, arquivos_contrato(*)')
      .eq('id', contratoId)
      .single()

    if (!contrato) throw new Error('Contrato não encontrado.')

    // 2. Carregar Signatários
    const { data: signatarios } = await supabase
      .from('contrato_signatarios')
      .select('*, pessoas(nome_razao_social, email_contato)')
      .eq('contrato_id', contratoId)

    if (!signatarios || signatarios.length === 0) {
      throw new Error('Nenhum signatário listado no contrato.')
    }

    // 3. Chamar Signature Provider
    const mappedSigners = signatarios.map((s: any) => ({
      email: s.pessoas?.email_contato || 'renato@arkosintelligence.com',
      nome: s.pessoas?.nome_razao_social || 'Sem Nome',
      papel: s.papel_assinatura
    }))

    const envelope = await this.provider.enviarEnvelope(Buffer.from(contrato.corpo_atual), mappedSigners)

    // 4. Salvar Envelope Geral na Tabela Antiga para Compatibilidade
    const { data: resEnvelope } = await supabase
      .from('assinaturas_contrato')
      .insert({
        contrato_id: contratoId,
        provedor: this.provider.name,
        provedor_envelope_id: envelope.envelopeId,
        status_geral_assinatura: 'pendente',
        url_visualizacao: envelope.urlPainel
      })
      .select()
      .single()

    // 5. Atualizar Links Individuais em contrato_signatarios
    for (const rSign of envelope.signatarios) {
      const dbSignatario = signatarios.find((s: any) => (s.pessoas?.email_contato || 'renato@arkosintelligence.com') === rSign.email)
      
      if (dbSignatario) {
        await supabase
          .from('contrato_signatarios')
          .update({
            status_assinatura: 'enviado',
            link_assinatura: rSign.link,
            external_id: rSign.externalId,
            enviado_em: new Date(),
            updated_at: new Date()
          })
          .eq('id', dbSignatario.id)
      }
    }

    // 6. Atualizar Contrato
    await supabase
      .from('contratos')
      .update({ status: 'em_assinatura' })
      .eq('id', contratoId)

    // Auditar evento
    await supabase.from('eventos_contrato').insert({
      contrato_id: contratoId,
      tipo_evento: 'envio_assinatura',
      descricao: `Contrato enviado para assinatura via ${this.provider.name}.`
    })
  }

  /**

   * 3. Atualizar Status do Signatário via Webhook ou Poll
   */
  async atualizarStatusSignatario(externalId: string, novoStatus: string): Promise<void> {
    const supabase = await createClient()

    // 1. Buscar signatário pelo ID externo
    const { data: signatario } = await supabase
      .from('contrato_signatarios')
      .select('*')
      .eq('external_id', externalId)
      .single()

    if (!signatario) throw new Error('Signatário não encontrado para este externalId.')

    // 2. Atualizar status individual
    const updateData: any = { 
      status_assinatura: novoStatus,
      updated_at: new Date()
    }
    
    if (novoStatus === 'visualizado') updateData.visualizado_em = new Date()
    if (novoStatus === 'assinado') updateData.assinado_em = new Date()

    await supabase
      .from('contrato_signatarios')
      .update(updateData)
      .eq('id', signatario.id)

    // 3. Recalcular Status Geral do Contrato
    const { data: todos } = await supabase
      .from('contrato_signatarios')
      .select('status_assinatura, obrigatorio_assinar')
      .eq('contrato_id', signatario.contrato_id)

    if (todos) {
      const obrigatorios = todos.filter((s: any) => s.obrigatorio_assinar);
      const todosAssinaram = obrigatorios.every((s: any) => s.status_assinatura === 'assinado');
      const algumAssinou = todos.some((s: any) => s.status_assinatura === 'assinado');

      let novoStatusContrato = 'em_assinatura'
      if (todosAssinaram) {
        novoStatusContrato = 'assinado' // Pode transitar para vigente se houver data
      } else if (algumAssinou) {
        novoStatusContrato = 'assinado_parcialmente'
      }

      await supabase
        .from('contratos')
        .update({ status: novoStatusContrato })
        .eq('id', signatario.contrato_id)
    }

    // Auditar evento
    await supabase.from('eventos_contrato').insert({
      contrato_id: signatario.contrato_id,
      tipo_evento: 'webhook_comunicado',
      descricao: `Signatário atualizado para '${novoStatus}'. Recalculo de status geral processado.`
    })
  }
}

  
