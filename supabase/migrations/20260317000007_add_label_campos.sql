-- Adicionar coluna Label para exibição amigável no formulário dinâmico
ALTER TABLE campos_template ADD COLUMN IF NOT EXISTS label TEXT;
