import { Empresa, UsuarioEmpresa } from '../entities/Empresa'

export interface IEmpresaRepository {
  findById(id: string): Promise<Empresa | null>
  findAllByUsuario(perfilId: string): Promise<Empresa[]>
  create(empresa: Omit<Empresa, 'id' | 'createdAt' | 'updatedAt' | 'status'>, perfilId: string): Promise<Empresa>
  update(id: string, empresa: Partial<Empresa>): Promise<Empresa>
  delete(id: string): Promise<void>
}
