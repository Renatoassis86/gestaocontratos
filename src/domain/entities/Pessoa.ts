export interface Pessoa {
  id: string;
  empresaId: string;
  tipoPessoa: 'PF' | 'PJ';
  nomeRazaoSocial: string;
  nomeFantasiaApelido?: string;
  documento?: string; // CPF ou CNPJ
  emailContato?: string;
  telefoneContato?: string;
  endereco?: string;
  dadosBancarios?: any;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}
