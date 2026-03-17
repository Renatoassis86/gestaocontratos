import { createClient } from '../supabase/server'
import { Pessoa } from '../../domain/entities/Pessoa'
import { IPessoaRepository } from '../../domain/repositories/IPessoaRepository'

export class SupabasePessoaRepository implements IPessoaRepository {
  private async getClient() {
    return await createClient()
  }

  async findById(id: string): Promise<Pessoa | null> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('pessoas')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return this.mapToDomain(data)
  }

  async findAllByEmpresa(empresaId: string): Promise<Pessoa[]> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('pessoas')
      .select('*')
      .eq('empresa_id', empresaId)

    if (error || !data) return []
    return data.map(this.mapToDomain)
  }

  async create(pessoa: Omit<Pessoa, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pessoa> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('pessoas')
      .insert({
        empresa_id: pessoa.empresaId,
        tipo_pessoa: pessoa.tipoPessoa,
        nome_razao_social: pessoa.nomeRazaoSocial,
        nome_fantasia_apelido: pessoa.nomeFantasiaApelido,
        documento: pessoa.documento,
        email_contato: pessoa.emailContato,
        telefone_contato: pessoa.telefoneContato,
        endereco: pessoa.endereco,
        dados_bancarios: pessoa.dadosBancarios,
        created_by: pessoa.createdBy
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return this.mapToDomain(data)
  }

  async update(id: string, pessoa: Partial<Pessoa>): Promise<Pessoa> {
    const supabase = await this.getClient()
    const updateData: any = {}
    if (pessoa.nomeRazaoSocial) updateData.nome_razao_social = pessoa.nomeRazaoSocial
    if (pessoa.emailContato) updateData.email_contato = pessoa.emailContato
    if (pessoa.telefoneContato) updateData.telefone_contato = pessoa.telefoneContato

    const { data, error } = await supabase
      .from('pessoas')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return this.mapToDomain(data)
  }

  async delete(id: string): Promise<void> {
    const supabase = await this.getClient()
    const { error } = await supabase
      .from('pessoas')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)
  }

  private mapToDomain(data: any): Pessoa {
    return {
      id: data.id,
      empresaId: data.empresa_id,
      tipoPessoa: data.tipo_pessoa,
      nomeRazaoSocial: data.nome_razao_social,
      nomeFantasiaApelido: data.nome_fantasia_apelido,
      documento: data.documento,
      emailContato: data.email_contato,
      telefoneContato: data.telefone_contato,
      endereco: data.endereco,
      dadosBancarios: data.dados_bancarios,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      createdBy: data.created_by
    }
  }
}
