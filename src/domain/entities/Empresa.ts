export interface Empresa {
  id: string;
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  endereco?: string;
  emailContato?: string;
  telefoneContato?: string;
  status: 'ativo' | 'suspenso' | 'cancelado';
  createdAt: Date;
  updatedAt: Date;
  createdByUserId?: string;
}

export interface UsuarioEmpresa {
  id: string;
  empresaId: string;
  perfilId: string;
  funcao: 'dono' | 'administrador' | 'membro' | 'visualizador';
  createdAt: Date;
}
