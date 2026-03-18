-- Pós-graduação em Ciência Política
INSERT INTO public.cursos (id, empresa_id, nome, modalidade) VALUES (gen_random_uuid(), 'e3b334ba-d67b-4a5e-aa71-44d7637cc8e4', 'Pós-graduação em Ciência Política', 'Pós-Graduação');
DO $$
DECLARE v_curso_id UUID;
BEGIN
  SELECT id INTO v_curso_id FROM public.cursos WHERE nome = 'Pós-graduação em Ciência Política' LIMIT 1;
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Cosmovisão Cristã e Política', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Ética Cristã', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'História do Pensamento Político', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Ideologias Políticas', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Teoria Política Reformacional', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Política e Ordem Jurídica', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Cidadania e Ação Cívica', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'O Cristão na Participação Cidadã', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'O Cristão na Prática Política', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'O Cristão e a Liberdade Religiosa', 40);
END $$;

-- Pós-graduação em Missiologia Urbana
INSERT INTO public.cursos (id, empresa_id, nome, modalidade) VALUES (gen_random_uuid(), 'e3b334ba-d67b-4a5e-aa71-44d7637cc8e4', 'Pós-graduação em Missiologia Urbana', 'Pós-Graduação');
DO $$
DECLARE v_curso_id UUID;
BEGIN
  SELECT id INTO v_curso_id FROM public.cursos WHERE nome = 'Pós-graduação em Missiologia Urbana' LIMIT 1;
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Teologia e Prática da Espiritualidade', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Teologia da Missão Urbana', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Contextualização do Evangelho e da Cultura', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Missão Integral', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Etnografia dos Grupos Urbanos', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Eclesiologia Missional', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Fé, Política e Cidadania', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Justiça, Pobreza e Transformação', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Igreja e Meio-Ambiente', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Liderança Missional Urbana', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Captação de Recursos para Projetos Sociais', 30);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'Elaboração de Projetos Missionais Urbanos', 30);
END $$;

-- Pós-graduação em Teologia do Novo Testamento
INSERT INTO public.cursos (id, empresa_id, nome, modalidade) VALUES (gen_random_uuid(), 'e3b334ba-d67b-4a5e-aa71-44d7637cc8e4', 'Pós-graduação em Teologia do Novo Testamento', 'Pós-Graduação');
DO $$
DECLARE v_curso_id UUID;
BEGIN
  SELECT id INTO v_curso_id FROM public.cursos WHERE nome = 'Pós-graduação em Teologia do Novo Testamento' LIMIT 1;
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DOS EVANGELHOS DE MATEUS E MARCOS', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'COSMOVISÃO JUDAICA, HELÊNICA E ROMANA DO PRIMEIRO SÉCULO', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'PERÍODO INTERBÍBLICO E A FORMAÇÃO DO CONTEXTO DO NOVO TESTAMENTO', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'ARQUEOLOGIA DO NOVO TESTAMENTO', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'FERRAMENTAS EXEGÉTICAS PARA INTERPRETAÇÃO DO NOVO TESTAMENTO', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEMAS CONTEMPORÂNEOS À LUZ DA TEOLOGIA DO NOVO TESTAMENTO', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DO EVANGELHO DE LUCAS E ATOS', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DA EPÍSTOLA AOS HEBREUS E EPÍSTOLAS GERAIS', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DOS ESCRITOS PAULINOS I', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DOS ESCRITOS PAULINOS II', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DO LIVRO DO APOCALIPSE', 40);
  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, 'TEOLOGIA BÍBLICA E EXEGÉTICA DO EVANGELHO DE JOÃO', 40);
END $$;
