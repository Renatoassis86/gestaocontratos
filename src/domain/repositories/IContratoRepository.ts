import { Contrato, ContratoParte } from '../entities/Contrato'

export interface IContratoRepository {
  findById(id: string): Promise<Contrato | null>
  findAllByEmpresa(empresaId: string): Promise<Contrato[]>
  create(contrato: Omit<Contrato, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contrato>
  updateStatus(id: string, status: Contrato['status']): Promise<void>
  addParte(parte: Omit<ContratoParte, 'id' | 'createdAt'>): Promise<ContratoParte>
  listarPartes(contratoId: string): Promise<ContratoParte[]>
  saveArquivo(arquivo: { contrato_id: string; nome_arquivo: string; snippet_path: string; tamanho_bytes: number; mime_type: string; bucket: string; criado_por: string }): Promise<void>
}
  
