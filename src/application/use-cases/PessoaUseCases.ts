import { IPessoaRepository } from '../../domain/repositories/IPessoaRepository'
import { Pessoa } from '../../domain/entities/Pessoa'

export class PessoaUseCases {
  constructor(private personRepo: IPessoaRepository) {}

  async listarPorEmpresa(empresaId: string): Promise<Pessoa[]> {
    if (!empresaId) throw new Error("ID da empresa é obrigatório.")
    return await this.personRepo.findAllByEmpresa(empresaId)
  }

  async cadastrar(pessoa: Omit<Pessoa, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pessoa> {
    if (!pessoa.nomeRazaoSocial?.trim()) {
      throw new Error("Nome ou Razão Social é obrigatório.")
    }
    return await this.personRepo.create(pessoa)
  }
}
