-- ==========================================
-- ESTRATÉGIA DE SEGURANÇA RLS (GO-LIVE PILOTO)
-- ==========================================

-- PASSO 1: Ativar RLS nas tabelas principais
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE membros_empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contrato_partes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contrato_signatarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE arquivos_contrato ENABLE ROW LEVEL SECURITY;
ALTER TABLE obrigacoes_contrato ENABLE ROW LEVEL SECURITY;
ALTER TABLE aditivos_contrato ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas_contrato ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos_contrato ENABLE ROW LEVEL SECURITY;
ALTER TABLE pessoas ENABLE ROW LEVEL SECURITY;

-- PASSO 2: Criar Políticas de Isolamento por Empresa (Multi-Tenant)

-- Empresas: Membros só leem se estiverem em membros_empresa para aquela empresa
CREATE POLICY "Membros leem sua empresa" ON empresas
FOR SELECT USING (
  id IN (SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid())
);

-- Membros: Só visualizam perfis vinculados ao mesmo Tenant
CREATE POLICY "Membros leem membros da empresa" ON membros_empresa
FOR SELECT USING (
  empresa_id IN (SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid())
);

-- Contratos: Isolamento Total
CREATE POLICY "Leitura de Contratos por Empresa" ON contratos
FOR SELECT USING (
  empresa_id IN (SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid())
);

CREATE POLICY "Escrita de Contratos por Gestores" ON contratos
FOR INSERT WITH CHECK (
  empresa_id IN (
    SELECT empresa_id FROM membros_empresa 
    WHERE perfil_id = auth.uid() AND papel IN ('admin', 'gestor')
  )
);

CREATE POLICY "Atualizacao de Contratos por Gestores" ON contratos
FOR UPDATE USING (
  empresa_id IN (
    SELECT empresa_id FROM membros_empresa 
    WHERE perfil_id = auth.uid() AND papel IN ('admin', 'gestor')
  )
);

-- Pessoas: Isolamento de Cadastro
CREATE POLICY "Leitura de Pessoas por Empresa" ON pessoas
FOR SELECT USING (
  empresa_id IN (SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid())
);

-- Aditivos, Obrigações, Signatários seguem a cascata do Contrato Pai via subqueries
CREATE POLICY "Filtro sub-itens contratos" ON contrato_signatarios FOR SELECT USING (
  contrato_id IN (SELECT id FROM contratos WHERE empresa_id IN (SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid()))
);

-- PASSO 3: ROLLBACK (Caso precise desligar RLS em emergência)
-- ALTER TABLE contratos DISABLE ROW LEVEL SECURITY;
-- DROP POLICY "Leitura de Contratos por Empresa" ON contratos;
