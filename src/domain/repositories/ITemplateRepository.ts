import { TemplateContrato, VersaoTemplate } from '../entities/TemplateContrato'
import { CampoTemplate } from '../entities/CampoTemplate'

export interface ITemplateRepository {
  findByIdWithCampos(id: string): Promise<TemplateContrato | null>
  findAllByEmpresa(empresaId: string): Promise<TemplateContrato[]>
  create(template: Omit<TemplateContrato, 'id' | 'createdAt' | 'updatedAt' | 'versao'>): Promise<TemplateContrato>
  addCampo(templateId: string, campo: Omit<CampoTemplate, 'id' | 'createdAt'>): Promise<CampoTemplate>
  saveVersao(versao: Omit<VersaoTemplate, 'id' | 'createdAt'>): Promise<void>
}
