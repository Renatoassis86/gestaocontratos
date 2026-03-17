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
