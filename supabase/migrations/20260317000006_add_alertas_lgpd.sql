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
