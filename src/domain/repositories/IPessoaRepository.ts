import { Pessoa } from '../entities/Pessoa'

export interface IPessoaRepository {
  findById(id: string): Promise<Pessoa | null>
  findAllByEmpresa(empresaId: string): Promise<Pessoa[]>
  create(pessoa: Omit<Pessoa, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pessoa>
  update(id: string, pessoa: Partial<Pessoa>): Promise<Pessoa>
  delete(id: string): Promise<void>
}
