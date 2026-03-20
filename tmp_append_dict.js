const fs = require('fs');

try {
    // 1. Ler o conteúdo atual do TXT para não perder nada
    let currentTxt = fs.readFileSync('radiografia_moodle_api_ficv.txt', 'utf8');

    // 2. Montar STRING do Dicionário
    let dictTxt = `\n\n================================================================================\n`;
    dictTxt += `          DICIONÁRIO DE DADOS DAS APIS PRINCIPAIS (DATA DICTIONARY)               \n`;
    dictTxt += `================================================================================\n\n`;

    dictTxt += `Abaixo está o mapeamento de variáveis de retorno para os endpoints fundamentais.\n`;
    dictTxt += `Como o Moodle não expõe um schema dinâmico via REST para todas as 425 funções, \n`;
    dictTxt += `este dicionário foca nas 4 Pilares de Ingestão (Usuários, Cursos, Notas, Matrículas).\n\n`;

    // --- PILAR 1: USUÁRIOS ---
    dictTxt += `📘 PILAR 1: GESTÃO DE USUÁRIOS (User APIs)\n`;
    dictTxt += `--------------------------------------------------------------------------------\n`;
    dictTxt += `Endpoint Sugerido: \`core_user_get_users_by_field\` ou \`core_user_get_users\`\n\n`;
    dictTxt += `| Campo (Key) | Tipo | Descrição | Processo ETL / Tratamento |\n`;
    dictTxt += `| :--- | :--- | :--- | :--- |\n`;
    dictTxt += `| \`id\` | Int | ID sequencial único do usuário no Moodle FICV. | Converter para \`moodle_id\` (Chave Estrangeira no Supabase) |\n`;
    dictTxt += `| \`username\` | String | ID de Login (ex: CPF, Matrícula Institucional). | Sanitizar para lowercase para garantir unicidade. |\n`;
    dictTxt += `| \`firstname\` | String | Primeiro nome registrado. | Concatenar com lastname se o sistema destino usar Nome Completo. |\n`;
    dictTxt += `| \`lastname\` | String | Sobrenome registrado. | - |\n`;
    dictTxt += `| \`email\` | String | E-mail institucional ou pessoal. | Lowercase + Validação de Regex de e-mail p/ evitar falhas de webhook. |\n`;
    dictTxt += `| \`idnumber\` | String | Campo livre para matrícula externa. | Pode estar vazio. Usar CPF como backup alternativo. |\n`;
    dictTxt += `| \`department\` | String | Departamento ou ciclo. | Atributo categórico. |\n`;
    dictTxt += `| \`customfields\` | Array | **[SEMIESTRUTURADO]** Lista de campos personalizados. | **EXIGE LOOP**: Filtrar por shortname=\`cpf\` para extrair CPF limpo. |\n`;
    dictTxt += `| \`preferences\` | Array | Preferências do perfil do usuário. | Geralmente irrelevante para CRM, mas útil para logs de UI. |\n\n`;

    // --- PILAR 2: CURSOS ---
    dictTxt += `📘 PILAR 2: GESTÃO DE CURSOS E CATEGORIAS (Course APIs)\n`;
    dictTxt += `--------------------------------------------------------------------------------\n`;
    dictTxt += `Endpoint Sugerido: \`core_course_get_courses\` ou \`core_course_get_categories\`\n\n`;
    dictTxt += `| Campo (Key) | Tipo | Descrição | Processo ETL / Tratamento |\n`;
    dictTxt += `| :--- | :--- | :--- | :--- |\n`;
    dictTxt += `| \`id\` | Int | ID sequencial único da disciplina/curso. | Chave primária de Curso no Supabase. |\n`;
    dictTxt += `| \`fullname\` | String | Nome completo da disciplina (ex: Ética Cristã). | Manter String original. |\n`;
    dictTxt += `| \`shortname\` | String | Nome curto (Cód. de Turma ou disciplina). | Útil para chaves de agrupamento (Tags). |\n`;
    dictTxt += `| \`categoryid\` | Int | FK da Categoria (ex: Graduação, Pós, etc). | Usar para fazer Join com \`get_categories\` no dashboard. |\n`;
    dictTxt += `| \`summary\` | HTML | Ementa ou descrição aberta do curso. | **NÃO ESTRUTURADO**: Fazer strip_tags() se quiser texto puro. |\n`;
    dictTxt += `| \`startdate\` | Unix | Timestamp de início. | **CASTING**: \`new Date(val * 1000)\` para ISO String. |\n`;
    dictTxt += `| \`enddate\` | Unix | Timestamp de fim. | **CASTING**: \`new Date(val * 1000)\` para ISO String. |\n`;
    dictTxt += `| \`visible\` | Int (0/1) | Status de publicação (Ativo/Oculto). | Map para boolean (true/false). |\n\n`;

    // --- PILAR 3: NOTAS E DESEMPENHO ---
    dictTxt += `📘 PILAR 3: DESEMPENHO ACADÊMICO (Gradebook APIs)\n`;
    dictTxt += `--------------------------------------------------------------------------------\n`;
    dictTxt += `Endpoint Sugerido: \`gradereport_user_get_grade_items\`\n\n`;
    dictTxt += `| Campo (Key) | Tipo | Descrição | Processo ETL / Tratamento |\n`;
    dictTxt += `| :--- | :--- | :--- | :--- |\n`;
    dictTxt += `| \`userid\` | Int | ID do aluno. | Linkar com tabela central de alunos. |\n`;
    dictTxt += `| \`courseid\` | Int | ID do curso associado à nota. | - |\n`;
    dictTxt += `| \`itemname\` | String | Nome da atividade (ex: Quiz 1, Prova Final). | Filtrar p/ excluir 'Category Total' se quiser médias brutas. |\n`;
    dictTxt += `| \`itemtype\` | String | 'course', 'category' ou 'mod' (Atividade). | Se for 'course', é a média final da disciplina. |\n`;
    dictTxt += `| \`graderaw\` | Float | Avaliação numérica bruta. | Calcular \`(graderaw / grademax) * 10\` se quiser normalizar escala 0-10. |\n`;
    dictTxt += `| \`grademax\` | Float | Teto de pontuação do item. | Geralmente 100.0 ou 10.0. |\n`;
    dictTxt += `| \`percentage\`| String | Nota em formato percentual (ex: "85.00 %"). | Converter para float (substituir '%' por vazio). |\n\n`;

    // --- PILAR 4: INSCRIÇÕES ---
    dictTxt += `📘 PILAR 4: MATRÍCULAS E GRUPOS (Enrolment APIs)\n`;
    dictTxt += `--------------------------------------------------------------------------------\n`;
    dictTxt += `Endpoint Sugerido: \`core_enrol_get_enrolled_users\` ou \`core_enrol_get_users_courses\`\n\n`;
    dictTxt += `| Campo (Key) | Tipo | Descrição | Processo ETL / Tratamento |\n`;
    dictTxt += `| :--- | :--- | :--- | :--- |\n`;
    dictTxt += `| \`id\` | Int | ID do usuário. | FK com central de alunos. |\n`;
    dictTxt += `| \`roles\` | Array | Lista de cargos (Student, Teacher, Manager). | **DIAGNÓSTICO**: Fundamental para identificar o "Professor". |\n`;
    dictTxt += `| \`roles.shortname\` | String | Cód do cargo (ex: 'student', 'editingteacher').| Filtrar 'editingteacher' para extrair Docente Atribuído. |\n\n`;

    dictTxt += `================================================================================\n`;
    dictTxt += `          MELHOR ARQUITETURA DE INTEGRAÇÃO INDICADA                             \n`;
    dictTxt += `================================================================================\n\n`;
    
    dictTxt += `Com base nas orientações de WebServices do Moodle, a melhor arquitetura para o seu sistema é:\n\n`;
    dictTxt += `**🏆 ARQUITETURA HÍBRIDA (Pull-based via REST + Push-Events)**\n\n`;

    dictTxt += `1. **Sincronização Periódica Incremental (REST API - Pull)**\n`;
    dictTxt += `   - **Indicação**: Coleta de dados volumosos (Notas de turmas inteiras, Atualização cadastral).\n`;
    dictTxt += `   - **Como funciona**: Loops de lotes (Pagination) usando \`core_enrol_get_enrolled_users\` \n`;
    dictTxt += `     puxando novos dados a cada 1 hora para inserir com trigger UPSERT no Supabase.\n`;
    dictTxt += `   - **Vantagem**: Menos acoplado, tolerante a falhas rápidas na conexão, fácil de debugar.\n\n`;

    dictTxt += `2. **Gatilhos Reativos (Event Monitoring / Webhooks - Push)**\n`;
    dictTxt += `   - **Indicação**: Disparos instantâneos (ex: Aluno concluiu o Curso -> Gerar Contrato/Certificado).\n`;
    dictTxt += `   - **Como funciona**: Configurar o Moodle FICV para disparar requisição POST p/ webhook \`/api/moodle/completed\` \n`;
    dictTxt += `     do seu sistema destino no evento \`course_completed\`.\n`;
    dictTxt += `   - **Vantagem**: Reduz o tráfego de pooling de APIs e entrega tempo-real em operações críticas.\n\n`;

    dictTxt += `### Resumo do Próximo Passo do Desenvolvedor:\n`;
    dictTxt += `Construir o CronJob para rodar a Server Action \`syncAllMoodleData\` (já mapeada nas configs de backend) \n`;
    dictTxt += `usando Paginação via loops de ID de curso para evitar estouro de memória e rate-limit.\n\n`;

    fs.writeFileSync('radiografia_moodle_api_ficv.txt', currentTxt + dictTxt);
    console.log("Dicionário e Melhor Arquitetura anexados ao radiografia_moodle_api_ficv.txt");

} catch (e) {
    console.error("Erro ao expandir arquivo:", e.message);
}
