import { createClient } from '../supabase/server'
import { TemplateContrato, VersaoTemplate } from '../../domain/entities/TemplateContrato'
import { CampoTemplate } from '../../domain/entities/CampoTemplate'
import { ITemplateRepository } from '../../domain/repositories/ITemplateRepository'

export class SupabaseTemplateRepository implements ITemplateRepository {
  private async getClient() {
    return await createClient()
  }

  async findByIdWithCampos(id: string): Promise<TemplateContrato | null> {
    const supabase = await this.getClient()
    
    // JOIN com campos_template estruturado
    const { data, error } = await supabase
      .from('templates_contrato')
      .select('*, campos_template(*)')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return this.mapToDomain(data)
  }

  async findAllByEmpresa(empresaId: string): Promise<TemplateContrato[]> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('templates_contrato')
      .select('*')
      .eq('empresa_id', empresaId)

    if (error || !data) return []
    return data.map(this.mapToDomain)
  }

  async create(template: Omit<TemplateContrato, 'id' | 'createdAt' | 'updatedAt' | 'versao'>): Promise<TemplateContrato> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('templates_contrato')
      .insert({
        empresa_id: template.empresaId,
        tipo_contrato_id: template.tipoContratoId,
        titulo: template.titulo,
        codigo: template.codigo,
        corpo_template: template.corpoTemplate,
        status: template.status,
        created_by: template.createdBy
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return this.mapToDomain(data)
  }

  async addCampo(templateId: string, campo: Omit<CampoTemplate, 'id' | 'createdAt'>): Promise<CampoTemplate> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('campos_template')
      .insert({
        template_id: templateId,
        chave_tag: campo.chaveTag,
        rotulo: campo.rotulo,
        tipo_dado: campo.tipoDado,
        obrigatorio: campo.obrigatorio,
        valor_padrao: campo.valorPadrao,
        descricao: campo.descricao,
        ordem: campo.ordem,
        origem: campo.origem
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return this.mapCampoToDomain(data)
  }

  async saveVersao(versao: Omit<VersaoTemplate, 'id' | 'createdAt'>): Promise<void> {
    const supabase = await this.getClient()
    
    const { error } = await supabase
      .from('versoes_contrato') // Aproveitando a tabela de versões para audit
      .insert({
        contrato_id: versao.templateId, // salvando ID do template temporário ou criar tabela própria
        corpo_texto: versao.corpoTemplate,
        numero_versao: versao.versao,
        nota_alteracao: versao.notaAlteracao,
        created_by: versao.createdBy
      })

    if (error) throw new Error(error.message)
  }

  private mapToDomain(data: any): TemplateContrato {
    return {
      id: data.id,
      empresaId: data.empresa_id,
      tipoContratoId: data.tipo_contrato_id,
      titulo: data.titulo,
      codigo: data.codigo,
      corpoTemplate: data.corpo_template,
      versao: data.versao || '1.0.0',
      status: data.status,
      createdAt: new Date(data.created_at),
      createdBy: data.created_by,
      updatedAt: new Date(data.updated_at),
      campos: data.campos_template ? data.campos_template.map(this.mapCampoToDomain) : []
    }
  }

  private mapCampoToDomain(data: any): CampoTemplate {
    return {
      id: data.id,
      templateId: data.template_id,
      chaveTag: data.chave_tag,
      rotulo: data.rotulo,
      tipoDado: data.tipo_dado,
      obrigatorio: data.obrigatorio,
      valorPadrao: data.valor_padrao,
      descricao: data.descricao,
      ordem: data.ordem,
      origem: data.origem,
      createdAt: new Date(data.created_at)
    }
  }
}
  
