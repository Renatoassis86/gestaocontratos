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
