export interface TipoContrato {
  id: string;
  empresaId: string;
  titulo: string;
  codigo?: string;
  descricao?: string;
  categoria?: string;
  status: 'ativo' | 'inativo';
  createdAt: Date;
  createdBy: string;
}
