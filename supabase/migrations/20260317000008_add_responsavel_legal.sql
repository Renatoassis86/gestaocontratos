-- ------------------------------------------
-- 8. ADICIONAR RESPONSÁVEL LEGAL EM EMPRESAS
-- ------------------------------------------
ALTER TABLE empresas ADD COLUMN IF NOT EXISTS responsavel_legal VARCHAR(255);
