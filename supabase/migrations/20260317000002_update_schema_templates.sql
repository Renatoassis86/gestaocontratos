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
