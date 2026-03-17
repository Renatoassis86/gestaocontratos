-- ==========================================
-- SEED DE TEMPLATE DE CERTIFICADO (CIDADE VIVA)
-- ==========================================

INSERT INTO templates_contrato (id, tipo_id, empresa_id, titulo, corpo_html, versao)
VALUES
(
  'c4444444-4444-4444-4444-444444444444', 
  'd3333333-3333-3333-3333-333333333333', 
  '00000000-0000-0000-0000-000000000000', 
  'Certificado de Conclusão Oficial', 
  'O Diretor da Faculdade Internacional Cidade Viva, no uso de suas atribuições e nos termos da Lei de Diretrizes e Bases da Educação Nacional - Lei nº 9.394/96, certifica que {{NOME_ALUNO}}, portador(a) do documento de nº {{CPF}}, nascido(a) em {{DATA_NASCIMENTO}}, concluiu o curso de Pós Graduação Lato Sensu, ao nível de Especialização, intitulado {{NOME_CURSO}}, com carga horária de {{CARGA_HORARIA}} horas, iniciado em {{DATA_INICIO}} e concluído em {{DATA_FIM}}, nesta Instituição de Ensino Superior credenciada pelo Ministério da Educação (MEC), segundo a Portaria nº 35 de 18 de janeiro de 2018, DOU de 19/01/2018. João Pessoa/PB, {{DATA_ASSINATURA}}', 
  '1.0'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO campos_template (id, template_id, nome_campo, tipo_input, obrigatorio, label) VALUES
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'NOME_ALUNO', 'texto', true, 'Nome do Aluno'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'CPF', 'texto', true, 'CPF do Aluno'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'DATA_NASCIMENTO', 'texto', true, 'Data de Nascimento'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'NOME_CURSO', 'texto', true, 'Nome do Curso'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'CARGA_HORARIA', 'numero', true, 'Carga Horária (horas)'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'DATA_INICIO', 'texto', true, 'Data de Início'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'DATA_FIM', 'texto', true, 'Data de Término'),
(gen_random_uuid(), 'c4444444-4444-4444-4444-444444444444', 'DATA_ASSINATURA', 'texto', true, 'Data de Assinatura (Bloqueável/Editável)')
ON CONFLICT (id) DO NOTHING;
