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
