import { createClient } from '../supabase/server'
import { Empresa } from '../../domain/entities/Empresa'
import { IEmpresaRepository } from '../../domain/repositories/IEmpresaRepository'

export class SupabaseEmpresaRepository implements IEmpresaRepository {
  private async getClient() {
    return await createClient()
  }

  async findById(id: string): Promise<Empresa | null> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('empresas')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return this.mapToDomain(data)
  }

  async findAllByUsuario(perfilId: string): Promise<Empresa[]> {
    const supabase = await this.getClient()
    const { data, error } = await supabase
      .from('usuarios_empresas')
      .select('empresas (*)')
      .eq('perfil_id', perfilId)

    if (error || !data) return []
    return data.map((item: any) => this.mapToDomain(item.empresas))
  }

  async create(empresa: Omit<Empresa, 'id' | 'createdAt' | 'updatedAt' | 'status'>, perfilId: string): Promise<Empresa> {
    const supabase = await this.getClient()

    // 1. Criar Empresa
    const { data: empresaData, error: empresaError } = await supabase
      .from('empresas')
      .insert({
        razao_social: empresa.razaoSocial,
        nome_fantasia: empresa.nomeFantasia,
        cnpj: empresa.cnpj,
        email_contato: empresa.emailContato,
        telefone_contato: empresa.telefoneContato,
        endereco: empresa.endereco,
        created_by_user_id: perfilId
      })
      .select()
      .single()

    if (empresaError || !empresaData) throw new Error(empresaError?.message || "Erro ao criar empresa")

    // 2. Vincular Criador como 'dono' automaticamente
    const { error: vincError } = await supabase
      .from('usuarios_empresas')
      .insert({
        empresa_id: empresaData.id,
        perfil_id: perfilId,
        funcao: 'dono'
      })

    if (vincError) throw new Error(vincError.message)

    return this.mapToDomain(empresaData)
  }

  async update(id: string, empresa: Partial<Empresa>): Promise<Empresa> {
    const supabase = await this.getClient()
    const updateData: any = {}
    if (empresa.razaoSocial) updateData.razao_social = empresa.razaoSocial
    if (empresa.status) updateData.status = empresa.status

    const { data, error } = await supabase
      .from('empresas')
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
      .from('empresas')
      .update({ deleted_at: new Date().toISOString() }) // Soft delete
      .eq('id', id)

    if (error) throw new Error(error.message)
  }

  private mapToDomain(data: any): Empresa {
    return {
      id: data.id,
      razaoSocial: data.razao_social,
      nomeFantasia: data.nome_fantasia,
      cnpj: data.cnpj,
      inscricaoEstadual: data.inscricao_estadual,
      endereco: data.endereco,
      emailContato: data.email_contato,
      telefoneContato: data.telefone_contato,
      status: data.status,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      createdByUserId: data.created_by_user_id
    }
  }
}
