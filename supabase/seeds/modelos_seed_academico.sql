-- ==========================================
-- SEED DE 3 CURSOS ACADÊMICOS (CIDADE VIVA)
-- ==========================================

-- 1. Curso: Ciência Política e Atuação Pública
INSERT INTO templates_contrato (id, tipo_id, empresa_id, titulo, corpo_html, versao)
VALUES
(
  'c1111111-1111-1111-1111-111111111111', 
  'd2222222-2222-2222-2222-222222222222', 
  '00000000-0000-0000-0000-000000000000', 
  'Histórico - Ciência Política e Atuação Pública', 
  '<h1>DESEMPENHO ACADÊMICO</h1>
   <p><strong>Nome do aluno:</strong> {{NOME_ALUNO}}</p>
   <p><strong>Curso:</strong> Pós-Graduação em Ciência Política e Atuação Pública</p>
   <p><strong>Carga horária:</strong> 400 horas</p>
   <p><strong>C.R.A:</strong> {{CRA}}</p>
   <table border="1" style="width:100%; border-collapse: collapse;">
     <tr><th>Disciplina</th><th>Docente</th><th>C.H</th><th>Média Final</th></tr>
     <tr><td>Cosmovisão Cristã e Política</td><td>Dr. Bruno Nascimento</td><td>40h</td><td>{{NOTA_1}}</td></tr>
     <tr><td>Ética Cristã</td><td>Esp. Edmilson Almeida</td><td>40h</td><td>{{NOTA_2}}</td></tr>
     <tr><td>História do Pensamento Político</td><td>Me. Carlos Kleber</td><td>40h</td><td>{{NOTA_3}}</td></tr>
     <tr><td>Ideologias Políticas</td><td>Dr. David Koyzis</td><td>40h</td><td>{{NOTA_4}}</td></tr>
     <tr><td>Teoria Política Reformacional</td><td>Dr. Anderson Paz</td><td>40h</td><td>{{NOTA_5}}</td></tr>
     <tr><td>Política e Ordem Jurídica</td><td>Me. Hertz Pires</td><td>40h</td><td>{{NOTA_6}}</td></tr>
     <tr><td>Cidadania e Ação Cívica</td><td>Me. Pedro Nascimento</td><td>40h</td><td>{{NOTA_7}}</td></tr>
     <tr><td>O Cristão na Participação Cidadã</td><td>Dr. Sérgio Queiroz</td><td>40h</td><td>{{NOTA_8}}</td></tr>
     <tr><td>O Cristão na Prática Política</td><td>Me. Deltan Dallagnol</td><td>40h</td><td>{{NOTA_9}}</td></tr>
     <tr><td>O Cristão e a Liberdade Religiosa</td><td>Esp. Rafael Durand</td><td>40h</td><td>{{NOTA_10}}</td></tr>
   </table>', 
  '1.0'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO campos_template (id, template_id, nome_campo, tipo_input, obrigatorio, label) VALUES
('c1111111-1111-1111-1111-211111111111', 'c1111111-1111-1111-1111-111111111111', 'NOME_ALUNO', 'texto', true, 'Nome do Aluno'),
('c1111111-1111-1111-1111-211111111112', 'c1111111-1111-1111-1111-111111111111', 'CRA', 'numero', true, 'Coeficiente de Rendimento (C.R.A)'),
('c1111111-1111-1111-1111-211111111113', 'c1111111-1111-1111-1111-111111111111', 'NOTA_1', 'numero', true, 'Nota: Cosmovisão Cristã e Política'),
('c1111111-1111-1111-1111-211111111114', 'c1111111-1111-1111-1111-111111111111', 'NOTA_2', 'numero', true, 'Nota: Ética Cristã'),
('c1111111-1111-1111-1111-211111111115', 'c1111111-1111-1111-1111-111111111111', 'NOTA_3', 'numero', true, 'Nota: História do Pensamento Político'),
('c1111111-1111-1111-1111-211111111116', 'c1111111-1111-1111-1111-111111111111', 'NOTA_4', 'numero', true, 'Nota: Ideologias Políticas'),
('c1111111-1111-1111-1111-211111111117', 'c1111111-1111-1111-1111-111111111111', 'NOTA_5', 'numero', true, 'Nota: Teoria Política Reformacional'),
('c1111111-1111-1111-1111-211111111118', 'c1111111-1111-1111-1111-111111111111', 'NOTA_6', 'numero', true, 'Nota: Política e Ordem Jurídica'),
('c1111111-1111-1111-1111-211111111119', 'c1111111-1111-1111-1111-111111111111', 'NOTA_7', 'numero', true, 'Nota: Cidadania e Ação Cívica'),
('c1111111-1111-1111-1111-211111111120', 'c1111111-1111-1111-1111-111111111111', 'NOTA_8', 'numero', true, 'Nota: O Cristão na Participação Cidadã'),
('c1111111-1111-1111-1111-211111111121', 'c1111111-1111-1111-1111-111111111111', 'NOTA_9', 'numero', true, 'Nota: O Cristão na Prática Política'),
('c1111111-1111-1111-1111-211111111122', 'c1111111-1111-1111-1111-111111111111', 'NOTA_10', 'numero', true, 'Nota: O Cristão e a Liberdade Religiosa')
ON CONFLICT (id) DO NOTHING;

-- 2. Curso: Missiologia Urbana
INSERT INTO templates_contrato (id, tipo_id, empresa_id, titulo, corpo_html, versao)
VALUES
(
  'c2222222-2222-2222-2222-222222222222', 
  'd2222222-2222-2222-2222-222222222222', 
  '00000000-0000-0000-0000-000000000000', 
  'Histórico - Missiologia Urbana', 
  '<h1>DESEMPENHO ACADÊMICO</h1>
   <p><strong>Nome do aluno:</strong> {{NOME_ALUNO}}</p>
   <p><strong>Curso:</strong> Pós-Graduação em Missiologia Urbana</p>
   <p><strong>Carga horária:</strong> 360 horas</p>
   <p><strong>C.R.A:</strong> {{CRA}}</p>
   <table border="1" style="width:100%; border-collapse: collapse;">
     <tr><th>Disciplina</th><th>Docente</th><th>C.H</th><th>Média Final</th></tr>
     <tr><td>Teologia e Prática da Espiritualidade</td><td>Dr. Valdir Steuernagel</td><td>30h</td><td>{{NOTA_1}}</td></tr>
     <tr><td>Teologia da Missão Urbana</td><td>Dr. Sérgio Lyra/Dr. Mac Pier</td><td>30h</td><td>{{NOTA_2}}</td></tr>
     <tr><td>Contextualização do Evangelho e da Cultura</td><td>Esp. Pedro Lione</td><td>30h</td><td>{{NOTA_3}}</td></tr>
     <tr><td>Missão Integral</td><td>Dr. Chris Wright</td><td>30h</td><td>{{NOTA_4}}</td></tr>
   </table>', 
  '1.0'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO campos_template (id, template_id, nome_campo, tipo_input, obrigatorio, label) VALUES
('c2222222-2222-2222-2222-322222222221', 'c2222222-2222-2222-2222-222222222222', 'NOME_ALUNO', 'texto', true, 'Nome do Aluno'),
('c2222222-2222-2222-2222-322222222222', 'c2222222-2222-2222-2222-222222222222', 'CRA', 'numero', true, 'Coeficiente de Rendimento (C.R.A)'),
('c2222222-2222-2222-2222-322222222223', 'c2222222-2222-2222-2222-222222222222', 'NOTA_1', 'numero', true, 'Nota: Teologia e Prática da Espiritualidade'),
('c2222222-2222-2222-2222-322222222224', 'c2222222-2222-2222-2222-222222222222', 'NOTA_2', 'numero', true, 'Nota: Teologia da Missão Urbana'),
('c2222222-2222-2222-2222-322222222225', 'c2222222-2222-2222-2222-222222222222', 'NOTA_3', 'numero', true, 'Nota: Contextualização do Evangelho e da Cultura'),
('c2222222-2222-2222-2222-322222222226', 'c2222222-2222-2222-2222-222222222222', 'NOTA_4', 'numero', true, 'Nota: Missão Integral')
ON CONFLICT (id) DO NOTHING;

-- 3. Curso: Teologia Bíblica e Exegética do Novo Testamento
INSERT INTO templates_contrato (id, tipo_id, empresa_id, titulo, corpo_html, versao)
VALUES
(
  'c3333333-3333-3333-3333-333333333333', 
  'd2222222-2222-2222-2222-222222222222', 
  '00000000-0000-0000-0000-000000000000', 
  'Histórico - Teologia Bíblica do NT', 
  '<h1>DESEMPENHO ACADÊMICO</h1>
   <p><strong>Nome do aluno:</strong> {{NOME_ALUNO}}</p>
   <p><strong>Curso:</strong> Pós-Graduação em Teologia Bíblica e Exegética do Novo Testamento</p>
   <p><strong>Carga horária:</strong> 400 horas</p>
   <p><strong>C.R.A:</strong> {{CRA}}</p>
   <table border="1" style="width:100%; border-collapse: collapse;">
     <tr><th>Disciplina</th><th>Docente</th><th>C.H</th><th>Média Final</th></tr>
     <tr><td>Teologia Bíblica e Exegética dos Evangelhos</td><td>Esp. Ricardo Fernandes</td><td>40h</td><td>{{NOTA_1}}</td></tr>
     <tr><td>Cosmovisão Judaica e Helenica</td><td>Me. Elton Roney</td><td>40h</td><td>{{NOTA_2}}</td></tr>
     <tr><td>Período Interbíblico</td><td>Me. Rodrigo de Galiza</td><td>40h</td><td>{{NOTA_3}}</td></tr>
   </table>', 
  '1.0'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO campos_template (id, template_id, nome_campo, tipo_input, obrigatorio, label) VALUES
('c3333333-3333-3333-3333-433333333331', 'c3333333-3333-3333-3333-333333333333', 'NOME_ALUNO', 'texto', true, 'Nome do Aluno'),
('c3333333-3333-3333-3333-433333333332', 'c3333333-3333-3333-3333-333333333333', 'CRA', 'numero', true, 'Coeficiente de Rendimento (C.R.A)'),
('c3333333-3333-3333-3333-433333333333', 'c3333333-3333-3333-3333-333333333333', 'NOTA_1', 'numero', true, 'Nota: Teologia Bíblica e Exegética dos Evangelhos'),
('c3333333-3333-3333-3333-433333333334', 'c3333333-3333-3333-3333-333333333333', 'NOTA_2', 'numero', true, 'Nota: Cosmovisão Judaica e Helenica'),
('c3333333-3333-3333-3333-433333333335', 'c3333333-3333-3333-3333-333333333333', 'NOTA_3', 'numero', true, 'Nota: Período Interbíblico')
ON CONFLICT (id) DO NOTHING;


