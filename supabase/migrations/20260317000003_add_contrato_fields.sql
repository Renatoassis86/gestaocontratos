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
