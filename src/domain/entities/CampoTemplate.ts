export interface CampoTemplate {
  id: string;
  templateId: string;
  chaveTag: string; // Ex: "nome_cliente" (usado no template como {{nome_cliente}})
  rotulo: string; // Ex: "Nome do Cliente"
  tipoDado: 'texto' | 'data' | 'numero' | 'monetario' | 'booleano';
  obrigatorio: boolean;
  valorPadrao?: string;
  descricao?: string;
  ordem?: number;
  origem: 'manual' | 'empresa' | 'pessoa' | 'contrato'; // De onde esse dado deve vir
  createdAt: Date;
}
