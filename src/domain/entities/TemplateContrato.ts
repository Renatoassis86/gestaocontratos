import { CampoTemplate } from './CampoTemplate';

export interface TemplateContrato {
  id: string;
  empresaId: string;
  tipoContratoId: string;
  titulo: string;
  codigo?: string;
  corpoTemplate: string; // Ex: "Contrato de {{nome_cliente}}..."
  versao: string;
  status: 'rascunho' | 'ativo' | 'arquivado';
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  campos?: CampoTemplate[]; // Embedded para facilidade de carregamento agregados
}
export interface VersaoTemplate {
  id: string;
  templateId: string;
  corpoTemplate: string;
  versao: string;
  notaAlteracao?: string;
  createdAt: Date;
  createdBy: string;
}
  
