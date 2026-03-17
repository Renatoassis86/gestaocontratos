export interface Contrato {
  id: string;
  empresaId: string;
  tipoContratoId?: string;
  templateId?: string;
  titulo: string;
  descricao?: string;
  corpoAtual: string; // Conteúdo renderizado congelado
  dadosPreenchimento?: Record<string, string>; // Validações JSONB de tags submetidas
  status: 'rascunho' | 'gerado' | 'em_revisao' | 'pronto_para_assinatura' | 'assinado_parcialmente' | 'assinado' | 'vigente' | 'encerrado' | 'cancelado';
  valorTotal?: number;
  dataInicio?: Date;
  dataFim?: Date;
  renovacaoAutomatica: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}
export interface ContratoParte {
  id: string;
  contratoId: string;
  pessoaId: string;
  papel: string; // 'contratado', 'contratante', 'testemunha'
  dadosSnapshot?: any;
  createdAt: Date;
}
  
