-- ==========================================
-- SEED DE MODELOS BASE (CONTRATOS, ACADÊMICO)
-- ==========================================

-- 1. Tipos de Contrato / Documento
INSERT INTO tipos_contrato (id, empresa_id, titulo, descricao_regra) 
VALUES 
('d1111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'Prestação de Serviços', 'Regras gerais de escopo e pagamento.'),
('d2222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'Histórico Acadêmico', 'Registro de notas e disciplinas cursadas.'),
('d3333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'Certificado', 'Emissão de certificados de conclusão de curso.')
ON CONFLICT (id) DO NOTHING;

-- 2. Templates de Documento
INSERT INTO templates_contrato (id, tipo_id, empresa_id, titulo, corpo_html, versao)
VALUES
(
  'e1111111-1111-1111-1111-111111111111', 
  'd1111111-1111-1111-1111-111111111111', 
  '00000000-0000-0000-0000-000000000000', 
  'Contrato de Consultoria TI', 
  '<h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1><p>Contratante: {{NOME_CONTRATANTE}}.</p><p>Contratado: {{NOME_CONTRATADO}}.</p><p>Valor: R$ {{VALOR_MENSAL}}/mês.</p>', 
  '1.0'
),
(
  'e2222222-2222-2222-2222-222222222222', 
  'd2222222-2222-2222-2222-222222222222', 
  '00000000-0000-0000-0000-000000000000', 
  'Histórico Acadêmico Padrão', 
  '<h1>HISTÓRICO ACADÊMICO</h1><p>Aluno: {{NOME_ALUNO}}</p><p>Curso: {{NOME_CURSO}}</p><p><strong>Grade de Disciplinas:</strong></p>{{GRADE_DISCIPLINAS}}', 
  '1.0'
),
(
  'e3333333-3333-3333-3333-333333333333', 
  'd3333333-3333-3333-3333-333333333333', 
  '00000000-0000-0000-0000-000000000000', 
  'Certificado de Conclusão', 
  '<div style="text-align:center;"><h1>CERTIFICADO</h1><p>Certificamos que <strong>{{NOME_ALUNO}}</strong> concluiu o curso de {{NOME_CURSO}}.</p></div>', 
  '1.0'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Campos Dinâmicos (Placeholders)
INSERT INTO campos_template (id, template_id, nome_campo, tipo_input, obrigatorio)
VALUES
(gen_random_uuid(), 'e1111111-1111-1111-1111-111111111111', 'NOME_CONTRATANTE', 'texto', true),
(gen_random_uuid(), 'e1111111-1111-1111-1111-111111111111', 'NOME_CONTRATADO', 'texto', true),
(gen_random_uuid(), 'e1111111-1111-1111-1111-111111111111', 'VALOR_MENSAL', 'numero', true),

(gen_random_uuid(), 'e2222222-2222-2222-2222-222222222222', 'NOME_ALUNO', 'texto', true),
(gen_random_uuid(), 'e2222222-2222-2222-2222-222222222222', 'NOME_CURSO', 'texto', true),

(gen_random_uuid(), 'e3333333-3333-3333-3333-333333333333', 'NOME_ALUNO', 'texto', true),
(gen_random_uuid(), 'e3333333-3333-3333-3333-333333333333', 'NOME_CURSO', 'texto', true)
ON CONFLICT (id) DO NOTHING;
