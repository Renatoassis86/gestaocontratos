-- ==========================================
-- ESTRUTURA INICIAL DO BANCO DE DADOS (CLM)
-- ==========================================

-- ------------------------------------------
-- 1. TABELA DE EMPRESAS (TENANTS)
-- ------------------------------------------
CREATE TABLE empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj VARCHAR(18) UNIQUE, -- Para PJ
    inscricao_estadual VARCHAR(50),
    endereco TEXT,
    email_contato VARCHAR(255),
    telefone_contato VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ativo', -- 'ativo', 'suspenso', 'cancelado'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by_user_id UUID,
    deleted_at TIMESTAMPTZ -- Para Soft Delete
);

-- ------------------------------------------
-- 2. TABELA DE PERFIS DE USUÁRIOS
-- ------------------------------------------
-- Complementar ao auth.users do Supabase
CREATE TABLE perfis (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    avatar_url TEXT,
    telefone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ativo', -- 'ativo', 'inativo'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------
-- 3. JUNTÃO DE USUÁRIOS E EMPRESAS (MEMBRESIA)
-- ------------------------------------------
CREATE TABLE usuarios_empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    perfil_id UUID REFERENCES perfis(id) ON DELETE CASCADE,
    funcao VARCHAR(100) DEFAULT 'membro', -- 'dono', 'administrador', 'membro', 'visualizador'
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(empresa_id, perfil_id)
);

-- ------------------------------------------
-- 4. TABELA DE PESSOAS (CONTRATADOS/CONTRATANTES)
-- ------------------------------------------
CREATE TABLE pessoas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE, -- Propriedade do inquilino
    tipo_pessoa VARCHAR(2) DEFAULT 'PJ', -- 'PF', 'PJ'
    nome_razao_social VARCHAR(255) NOT NULL,
    nome_fantasia_apelido VARCHAR(255),
    documento VARCHAR(20), -- CPF ou CNPJ
    email INT DEFAULT NULL, -- Placeholder, let's fix type
    email_contato VARCHAR(255),
    telefone_contato VARCHAR(50),
    endereco TEXT,
    dados_bancarios JSONB, -- Opcional para repasses
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 5. TIPOS DE CONTRATOS
-- ------------------------------------------
CREATE TABLE tipos_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    titulo VARCHAR(100) NOT NULL, -- Ex: 'Prestação de Serviço', 'Aluguel'
    descricao TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 6. TEMPLATES DE CONTRATOS
-- ------------------------------------------
CREATE TABLE templates_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    tipo_contrato_id UUID REFERENCES tipos_contrato(id),
    titulo VARCHAR(255) NOT NULL,
    corpo_template TEXT NOT NULL, -- Conteúdo com placeholders tipo {{nome_cliente}}
    versao VARCHAR(20) DEFAULT '1.0.0',
    status VARCHAR(50) DEFAULT 'rascunho', -- 'rascunho', 'ativo', 'arquivado'
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------
-- 7. CAMPOS DO TEMPLATE (METADADOS DOS PLACEHOLDERS)
-- ------------------------------------------
CREATE TABLE campos_template (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES templates_contrato(id) ON DELETE CASCADE,
    chave_tag VARCHAR(100) NOT NULL, -- Ex: 'nome_cliente'
    rotulo VARCHAR(100) NOT NULL, -- Ex: 'Nome do Cliente'
    tipo_dado VARCHAR(50) DEFAULT 'texto', -- 'texto', 'data', 'numero', 'monetario'
    obrigatorio BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------
-- 8. CONTRATOS
-- ------------------------------------------
CREATE TABLE contratos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    tipo_contrato_id UUID REFERENCES tipos_contrato(id),
    template_id UUID REFERENCES templates_contrato(id), -- Opcional, se foi gerado a partir de um
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    corpo_atual TEXT, -- Texto final preenchido
    status VARCHAR(50) DEFAULT 'rascunho', -- 'rascunho', 'aguardando_assinatura', 'assinado', 'vigente', 'rescindido', 'vencido'
    valor_total NUMERIC(15, 2),
    data_inicio DATE,
    data_fim DATE,
    renovacao_automatica BOOLEAN DEFAULT false,
    prazo_notificacao_rescisao INT, -- Dias para notificar aviso prévio
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id),
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 9. PARTES DO CONTRATO (JOIN TABLE CONTRATO <-> PESSOAL)
-- ------------------------------------------
CREATE TABLE contrato_partes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE RESTRICT,
    papel VARCHAR(100) NOT NULL, -- 'contratado', 'contratante', 'testemunha', 'co-gestor'
    dados_snapshot JSONB, -- Salva estado da pessoa no momento da criação para auditoria
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------
-- 10. VERSÕES DO CONTRATO
-- ------------------------------------------
CREATE TABLE versoes_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    corpo_texto TEXT NOT NULL,
    numero_versao VARCHAR(20) NOT NULL,
    nota_alteracao TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 11. ARQUIVOS E DOCUMENTOS (STORAGE BUCKET LINKS)
-- ------------------------------------------
CREATE TABLE arquivos_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    nome_arquivo VARCHAR(255) NOT NULL,
    snippet_path TEXT NOT NULL, -- Caminho no storage: empresas/{id}/contratos/{id}/doc.pdf
    tamanho_bytes BIGINT,
    mime_type VARCHAR(100),
    tipo_documento VARCHAR(100), -- 'original', 'aditivo', 'anexo_tecnico', 'comprovante'
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 12. ASSINATURAS DO CONTRATO
-- ------------------------------------------
CREATE TABLE assinaturas_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    provedor VARCHAR(100), -- 'Clicksign', 'ZapSign', 'DocuSign'
    provedor_envelope_id VARCHAR(120), -- ID retornado pelo provedor
    status_geral_assinatura VARCHAR(50) DEFAULT 'pendente', -- 'pendente', 'completo', 'rejeitado'
    url_visualizacao TEXT,
    metadata_provedor JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------
-- 13. ADITIVOS DO CONTRATO
-- ------------------------------------------
CREATE TABLE aditivos_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_pai_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    contrato_aditivo_id UUID REFERENCES contratos(id) DEFAULT NULL, -- Se o aditivo for modelado comum
    titulo VARCHAR(255) NOT NULL,
    descricao_alteracoes TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 14. OBRIGAÇÕES / MARCOS (MILESTONES / TASKS)
-- ------------------------------------------
CREATE TABLE obrigacoes_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_consolidado DATE, -- Prazo limite
    status VARCHAR(50) DEFAULT 'pendente', -- 'pendente', 'em_andamento', 'concluido', 'atrasado'
    tipo_obrigacao VARCHAR(50), -- 'recorrente', 'entrega_unica'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES perfis(id)
);

-- ------------------------------------------
-- 15. TRILHA DE EVENTOS (AUDIT TRAIL)
-- ------------------------------------------
CREATE TABLE eventos_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES perfis(id),
    tipo_evento VARCHAR(100) NOT NULL, -- 'criacao', 'edicao', 'assinatura_concluida', 'rescisao'
    descricao TEXT,
    metadata_snapshot JSONB, -- Logs diff se necessário
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- INDEXES PARA PERFORMANCE E QUERIES
-- ==========================================
CREATE INDEX idx_contratos_empresa ON contratos(empresa_id);
CREATE INDEX idx_contratos_status ON contratos(status);
CREATE INDEX idx_pessoas_empresa ON pessoas(empresa_id);
CREATE INDEX idx_usuarios_empresas_perfil ON usuarios_empresas(perfil_id);

-- ==========================================
-- RLS - ROW LEVEL SECURITY (PREPARAÇÃO)
-- ==========================================
-- Para serem ativados após configuração do Auth no Supabase
-- Ex: ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;
-- ==========================================
-- ATUALIZAÇÃO DO SCHEMA PARA ETAPA 3 (CLM)
-- ==========================================

-- 1. Ajustar tipos_contrato
ALTER TABLE tipos_contrato 
ADD COLUMN IF NOT EXISTS codigo VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS categoria VARCHAR(100), -- 'recorrente', 'unico', 'parceria'
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ativo';

-- 2. Ajustar templates_contrato
ALTER TABLE templates_contrato
ADD COLUMN IF NOT EXISTS codigo VARCHAR(50);

-- 3. Ajustar campos_template (Adicionar Metadados)
ALTER TABLE campos_template
ADD COLUMN IF NOT EXISTS valor_padrao TEXT,
ADD COLUMN IF NOT EXISTS descricao TEXT,
ADD COLUMN IF NOT EXISTS ordem INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS origem VARCHAR(50) DEFAULT 'manual'; -- 'manual', 'empresa', 'pessoa', 'contrato'

-- 4. Criar Tabela de Eventos se não estiver estruturada
-- (Já existia em migrations/0001, mas reforço de audit)

-- 5. Criar índices para acelerar renderizações
CREATE INDEX IF NOT EXISTS idx_campos_template_template ON campos_template(template_id);
CREATE INDEX IF NOT EXISTS idx_templates_tipo ON templates_contrato(tipo_contrato_id);
-- ==========================================
-- ATUALIZAÇÃO DO SCHEMA PARA ETAPA 4 (CLM GERADOR)
-- ==========================================

-- 1. Adicionar JSONB para salvar os valores dos placeholders
ALTER TABLE contratos 
ADD COLUMN IF NOT EXISTS dados_preenchimento JSONB DEFAULT '{}';

-- 2. Indexador para buscas dentro de JSONB se necessário
CREATE INDEX IF NOT EXISTS idx_contratos_dados_preenchimento ON contratos USING gin (dados_preenchimento);

-- 3. Ajuste em arquivos_contrato para suportar buckets melhor
ALTER TABLE arquivos_contrato
ADD COLUMN IF NOT EXISTS hash_sha256 VARCHAR(64),
ADD COLUMN IF NOT EXISTS bucket VARCHAR(100) DEFAULT 'contratos_arquivos';
-- ==========================================
-- ATUALIZAÇÃO DO SCHEMA PARA ETAPA 5 (ASSINATURA)
-- ==========================================

-- 1. Criar Tabela de Signatários Individuais
CREATE TABLE IF NOT EXISTS contrato_signatarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    pessoa_id UUID REFERENCES pessoas(id) ON DELETE CASCADE,
    papel_assinatura VARCHAR(100) NOT NULL, -- 'contratante', 'contratado', 'testemunha'
    ordem_assinatura INT DEFAULT 1,
    obrigatorio_assinar BOOLEAN DEFAULT true,
    status_assinatura VARCHAR(50) DEFAULT 'pendente_preparacao', -- 'pendente_preparacao', 'pronto_envio', 'enviado', 'visualizado', 'assinado', 'recusado'
    link_assinatura TEXT,
    external_id VARCHAR(150), -- ID do signatário no provedor externo
    enviado_em TIMESTAMPTZ,
    visualizado_em TIMESTAMPTZ,
    assinado_em TIMESTAMPTZ,
    recusado_em TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Criar índices para acelerar consultas de assinaturas
CREATE INDEX IF NOT EXISTS idx_signatarios_contrato ON contrato_signatarios(contrato_id);
CREATE INDEX IF NOT EXISTS idx_signatarios_status ON contrato_signatarios(status_assinatura);
-- ==========================================
-- ATUALIZAÇÃO DO SCHEMA PARA ETAPA 6 (GOVERNANÇA CLM)
-- ==========================================

-- 1. Adicionar empresa_id em aditivos_contrato para Multi-Tenant rápido
ALTER TABLE aditivos_contrato 
ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_aditivos_empresa ON aditivos_contrato(empresa_id);
CREATE INDEX IF NOT EXISTS idx_aditivos_pai ON aditivos_contrato(contrato_pai_id);

-- 2. Adicionar tipo de versão em versoes_contrato
ALTER TABLE versoes_contrato
ADD COLUMN IF NOT EXISTS tipo_versao VARCHAR(50) DEFAULT 'revisao_interna'; -- 'original', 'revisao_interna', 'aditivo'

-- 3. Adicionar prioridade em obrigacoes_contrato
ALTER TABLE obrigacoes_contrato
ADD COLUMN IF NOT EXISTS prioridade VARCHAR(20) DEFAULT 'media'; -- 'baixa', 'media', 'alta'
-- ==========================================
-- ATUALIZAÇÃO DO SCHEMA PARA ETAPA 7 (PRODUÇÃO)
-- ==========================================

-- 1. Criar Tabela de Alertas Operacionais
CREATE TABLE IF NOT EXISTS alertas_contrato (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contrato_id UUID REFERENCES contratos(id) ON DELETE CASCADE,
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    tipo_alerta VARCHAR(50) NOT NULL, -- 'proximo_vencimento', 'obrigacao_atrasada', 'assinatura_travada'
    descricao TEXT NOT NULL,
    status_alerta VARCHAR(20) DEFAULT 'pendente', -- 'pendente', 'resolvido', 'ignorado'
    criado_em TIMESTAMPTZ DEFAULT now(),
    resolvido_em TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_alertas_empresa ON alertas_contrato(empresa_id);
CREATE INDEX IF NOT EXISTS idx_alertas_status ON alertas_contrato(status_alerta);

-- 2. Suporte LGPD: Adicionar soft delete em tabelas faltantes
ALTER TABLE pessoas ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE contrato_partes ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 3. Adicionar coluna de Versão do Arquivo em arquivos_contrato
ALTER TABLE arquivos_contrato ADD COLUMN IF NOT EXISTS versao INT DEFAULT 1;
-- Adicionar coluna Label para exibição amigável no formulário dinâmico
ALTER TABLE campos_template ADD COLUMN IF NOT EXISTS label TEXT;
-- ------------------------------------------
-- 8. ADICIONAR RESPONSÁVEL LEGAL EM EMPRESAS
-- ------------------------------------------
ALTER TABLE empresas ADD COLUMN IF NOT EXISTS responsavel_legal VARCHAR(255);
