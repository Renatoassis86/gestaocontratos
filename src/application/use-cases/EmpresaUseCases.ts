import { IEmpresaRepository } from '../../domain/repositories/IEmpresaRepository'
import { Empresa } from '../../domain/entities/Empresa'

export class EmpresaUseCases {
  constructor(private empresaRepo: IEmpresaRepository) {}

  async listarPorUsuario(perfilId: string): Promise<Empresa[]> {
    if (!perfilId) throw new Error("ID do usuário é obrigatório.")
    return await this.empresaRepo.findAllByUsuario(perfilId)
  }

  async cadastrar(empresa: Omit<Empresa, 'id' | 'createdAt' | 'updatedAt' | 'status'>, perfilId: string): Promise<Empresa> {
    if (!empresa.razaoSocial?.trim()) {
      throw new Error("Razão Social é obrigatória.")
    }
    return await this.empresaRepo.create(empresa, perfilId)
  }
}
