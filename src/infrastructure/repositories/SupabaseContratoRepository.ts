import { createClient } from '../supabase/server'
import { Contrato, ContratoParte } from '../../domain/entities/Contrato'
import { IContratoRepository } from '../../domain/repositories/IContratoRepository'

export class SupabaseContratoRepository implements IContratoRepository {
  private async getClient() {
    return await createClient()
  }

  async findById(id: string): Promise<Contrato | null> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('contratos')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return this.mapToDomain(data)
  }

  async findAllByEmpresa(empresaId: string): Promise<Contrato[]> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('contratos')
      .select('*')
      .eq('empresa_id', empresaId)

    if (error || !data) return []
    return data.map(this.mapToDomain)
  }

  async create(contrato: Omit<Contrato, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contrato> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('contratos')
      .insert({
        empresa_id: contrato.empresaId,
        tipo_contrato_id: contrato.tipoContratoId,
        template_id: contrato.templateId,
        titulo: contrato.titulo,
        corpo_atual: contrato.corpoAtual,
        status: contrato.status,
        dados_preenchimento: contrato.dadosPreenchimento,
        created_by: contrato.createdBy
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return this.mapToDomain(data)
  }

  async updateStatus(id: string, status: Contrato['status']): Promise<void> {
    const supabase = await this.getClient()
    const { error } = await supabase
      .from('contratos')
      .update({ status, updated_at: new Date() })
      .eq('id', id)

    if (error) throw new Error(error.message)
  }

  async addParte(parte: Omit<ContratoParte, 'id' | 'createdAt'>): Promise<ContratoParte> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('contrato_partes')
      .insert({
        contrato_id: parte.contratoId,
        pessoa_id: parte.pessoaId,
        papel: parte.papel,
        dados_snapshot: parte.dadosSnapshot
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return {
      id: data.id,
      contratoId: data.contrato_id,
      pessoaId: data.pessoa_id,
      papel: data.papel,
      dadosSnapshot: data.dados_snapshot,
      createdAt: new Date(data.created_at)
    }
  }

  async listarPartes(contratoId: string): Promise<ContratoParte[]> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('contrato_partes')
      .select('*')
      .eq('contrato_id', contratoId)

    if (error || !data) return []
    return data.map((d: any) => ({
      id: d.id,
      contratoId: d.contrato_id,
      pessoaId: d.pessoa_id,
      papel: d.papel,
      dadosSnapshot: d.dados_snapshot,
      createdAt: new Date(d.created_at)
    }))
  }

  async saveArquivo(arquivo: { contrato_id: string; nome_arquivo: string; snippet_path: string; tamanho_bytes: number; mime_type: string; bucket: string; criado_por: string }): Promise<void> {
    const supabase = await this.getClient()
    
    const { error } = await supabase
      .from('arquivos_contrato')
      .insert({
        contrato_id: arquivo.contrato_id,
        nome_arquivo: arquivo.nome_arquivo,
        snippet_path: arquivo.snippet_path,
        tamanho_bytes: arquivo.tamanho_bytes,
        mime_type: arquivo.mime_type,
        bucket: arquivo.bucket,
        created_by: arquivo.criado_por
      })

    if (error) throw new Error(error.message)
  }

  private mapToDomain(data: any): Contrato {
    return {
      id: data.id,
      empresaId: data.empresa_id,
      tipoContratoId: data.tipo_contrato_id,
      templateId: data.template_id,
      titulo: data.titulo,
      descricao: data.descricao,
      corpoAtual: data.corpo_atual,
      status: data.status,
      dadosPreenchimento: data.dados_preenchimento,
      valorTotal: data.valor_total ? Number(data.valor_total) : undefined,
      dataInicio: data.data_inicio ? new Date(data.data_inicio) : undefined,
      dataFim: data.data_fim ? new Date(data.data_fim) : undefined,
      renovacaoAutomatica: data.renovacao_automatica || false,
      createdAt: new Date(data.created_at),
      createdBy: data.created_by,
      updatedAt: new Date(data.updated_at)
    }
  }
}
  
