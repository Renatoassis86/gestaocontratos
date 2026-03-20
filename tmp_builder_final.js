const fs = require('fs');

async function run() {
    let functions = [];
    try {
        functions = JSON.parse(fs.readFileSync('moodle_functions_available.json', 'utf8'));
    } catch (e) {
        console.error("Falha ao ler moodle_functions_available.json");
        return;
    }

    const categories = {};
    functions.forEach(f => {
        const parts = f.name.split('_');
        let category = parts.slice(0, 2).join('_');
        if (parts[0] === 'mod') {
             category = `module_${parts[1]}`;
        } else if (parts[0] === 'gradereport') {
             category = `grades_report`;
        } else if (parts[0] === 'core' && parts[1] === 'grades') {
             category = `grades_core`;
        }
        if (!categories[category]) categories[category] = [];
        categories[category].push(f.name);
    });

    // --- 1. GERAR JSON ---
    const jsonOutput = {
        meta: {
            title: "Radiografia Moodle API FICV",
            functions_count: functions.length,
            categories_count: Object.keys(categories).length
        },
        entidades: [
            { nome: "Usuário", tipo: "Estruturado", descricao: "Dados demográficos, login, e-mail e campos personalizados (CPF).", apis: ["core_user"] },
            { nome: "Curso", tipo: "Estruturado", descricao: "Nível, nome, categorias, datas de início/fim.", apis: ["core_course"] },
            { nome: "Matrícula/Inscrição", tipo: "Estruturado", descricao: "Vínculo de alunos e professores em cursos.", apis: ["core_enrol"] },
            { nome: "Notas (Gradebook)", tipo: "Estruturado / Semi", descricao: "Notas de avaliações, médias finais.", apis: ["grades_core", "grades_report"] },
            { nome: "Atividades (Quiz, Assign)", tipo: "Semi/Não Estruturado", descricao: "Interações, submissões de tarefas e tentativas de provas.", apis: ["module_quiz", "module_assign"] },
            { nome: "Fóruns (Discussões)", tipo: "Não Estruturado", descricao: "Posts e respostas em texto aberto.", apis: ["module_forum"] }
        ],
        categorias: categories
    };
    fs.writeFileSync('radiografia_moodle_api_ficv.json', JSON.stringify(jsonOutput, null, 2));

    // --- 2. GERAR TXT PRINCIPAL ---
    let txt = `================================================================================\n`;
    txt += `          RADIOGRAFIA ANALÍTICA DE DADOS - MOODLE API (FICV)                     \n`;
    txt += `================================================================================\n\n`;

    // 1. RESUMO EXECUTIVO
    txt += `1. RESUMO EXECUTIVO\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `O ambiente Moodle da FICV possui um Web Service robusto com ${functions.length} funções habilitadas para o Token atual. \n`;
    txt += `- Potencial: Alto para ingestão de Dados Cadastrais, Desempenho (Notas) e Metadados de Curso.\n`;
    txt += `- Complexidade: Mão-de-Obra de ETL para transformar timestamps Unix e fazer joins de endpoints.\n`;
    txt += `- Riscos de Integração: Taxas de requisição concorrente (não documentadas) e dependência de joins compostos.\n`;
    txt += `- Oportunidades: Predição de Evasão (Churn) através de logs e scoring de engajamento.\n\n`;

    // 2. INVENTÁRIO DE ENTIDADES
    txt += `2. INVENTÁRIO DE ENTIDADES\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `| Entidade | Descrição Funcional | Estrutura | API Relacionada | Observação |\n`;
    txt += `| :--- | :--- | :--- | :--- | :--- |\n`;
    txt += `| Usuário | Perfis de alunos/professores | Estruturado | core_user_* | Contém CustomFields (CPF) |\n`;
    txt += `| Curso | Nome do curso e categoria | Estruturado | core_course_* | Base para o relacional |\n`;
    txt += `| Nota item | Nota avulsa em tarefa/prova | Estruturado | gradereport_user_* | Exige loops por usuário |\n`;
    txt += `| Tarefa | Submissões de arquivos/textos | Semi-estruturado | module_assign_* | Textos discursivos. |\n`;
    txt += `| Prova | Respostas de quizes | Estruturado | module_quiz_* | Contagem de acertos/erros |\n`;
    txt += `| Post Fórum | Comentários e discussões | Não Estruturado | module_forum_* | Exige processamento NLP |\n\n`;

    // 3. INVENTÁRIO DE CAMPOS ESTRUTURADOS
    txt += `3. INVENTÁRIO DE CAMPOS ESTRUTURADOS\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `| Entidade | Campo | Tipo | Descrição | API/Endpoint | Chave | Extração Direta? |\n`;
    txt += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    txt += `| Usuário | id | Int | ID Único do Moodle | core_user_get_users* | PK | Sim |\n`;
    txt += `| Usuário | email | String | Email de contato | core_user_get_users* | Atributo | Sim |\n`;
    txt += `| Usuário | cpf | String | Armazenado em customfields | core_user_get_users* | Atributo | Composição |\n`;
    txt += `| Curso | id | Int | ID Único do Curso | core_course_get_courses | PK | Sim |\n`;
    txt += `| Curso | fullname | String | Nome Completo | core_course_get_courses | Atributo | Sim |\n`;
    txt += `| Grade | graderaw | Float | Nota Bruta | gradereport_user_get_grades* | Métrica | Sim |\n\n`;

    // 4. INVENTÁRIO DE DADOS SEMIESTRUTURADOS
    txt += `4. INVENTÁRIO DE DADOS SEMIESTRUTURADOS\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `- **CustomFields (Usuário)**: Dicionário interno de campos do Moodle (CPF, Nascimento). Exige parsing simples de array com condicionais de shortname.\n`;
    txt += `- **Lists de Curso (Metadados)**: courseformatoptions retornam Arrays de Key/Value para formatar visualizações.\n`;
    txt += `- **Logs de Tentativas (Quiz)**: Arrays aninhados contendo o histórico de passos do envio da resposta.\n\n`;

    // 5. INVENTÁRIO DE DADOS NÃO ESTRUTURADOS
    txt += `5. INVENTÁRIO DE DADOS NÃO ESTRUTURADOS\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `- **Descrições de Cursos (Summary)**: HTML contendo o ementário em texto formatado.\n`;
    txt += `- **Posts em Fóruns**: Textos abertos com dúvidas e interações (Propriedade para NLP / Análise de Sentimento).\n`;
    txt += `- **Tarefas Discursivas**: Textos de submissão de Redações ou Pesquisas (Propriedade para embeddings/sumarização).\n\n`;

    // 6. MAPA DE APIS E FUNÇÕES (Resumo por Categoria)
    txt += `6. MAPA DE APIS E FUNÇÕES (AGRUPADO)\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    for (const [cat, funcs] of Object.entries(categories)) {
         txt += `📌 Categoria: ${cat.toUpperCase()} (${funcs.length} funções)\n`;
         txt += `Exemplos:\n`;
         funcs.slice(0, 3).forEach(f => txt += `  - ${f}\n`);
         if (funcs.length > 3) txt += `  - ... e mais ${funcs.length - 3} funções disponíveis.\n`;
         txt += `\n`;
    }

    // 7. MATRIZ DE EXTRAIBILIDADE
    txt += `7. MATRIZ DE EXTRAIBILIDADE\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `- **EXTRAÇÃO DIRETA**: Usuários, Metadados de curso, Inscrições e Categorias.\n`;
    txt += `- **EXTRAÇÃO POR COMPOSIÇÃO DE CHAMADAS**: Notas individuais e submissões (exige loops de course_id + user_id).\n`;
    txt += `- **EXTRAÇÃO CONDICIONADA A PERMISSÃO**: Listagem de Logs Globais (não expostos na lista de funções básicas).\n\n`;

    // 8. RECOMENDAÇÕES DE ETL
    txt += `8. RECOMENDAÇÕES DE ETL\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `1. **Normalização de Unix Timestamp**: Converter todos os campos de data Unix (ex: timecreated) para ISO 8601 (Date).\n`;
    txt += `2. **Sanitização de CPF**: Remover pontuações e traços vindo de CustomFields para manter integridade com o Supabase.\n`;
    txt += `3. **Upsert Incremental**: Como o Moodle é atualizado constantemente, o processo de ETL (Load) no Supabase deve usar Upsert para atualizar notas e status sem duplicatas.\n`;
    txt += `4. **Joins Compostos**: Nota de aluno exige linkar core_enrol_get_users_courses com gradereport_user_get_grade_items.\n\n`;

    // 9. RECOMENDAÇÕES DE CIÊNCIA DE DADOS
    txt += `9. RECOMENDAÇÕES DE CIÊNCIA DE DADOS\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `1. **Preditor de Evasão (Churn)**: Cruzar 'lastaccess' (último acesso) com 'graderaw' para identificar alunos ociosos e com baixo desempenho.\n`;
    txt += `2. **Análise de Sentimento (Fóruns)**: Modelos de NLP sintonizados para português podem detectar frustrações antes de cancelamentos.\n`;
    txt += `3. **Clusterização de Perfis**: Agrupar alunos por velocidade de entrega de tarefas para montar perfis de dedicação.\n\n`;

    // 10. GAPS, RISCOS E INCERTEZAS
    txt += `10. GAPS, RISCOS E INCERTEZAS\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `- **Professor**: Identificar de forma limpa o "Professor" de uma disciplina exige rastrear roles (Papéis) dentro da matrícula. Não há um campo simples 'teacher_name' no retorno do curso.\n`;
    txt += `- **Frequência de Atualização**: Limites de rate-limit não mapeados podem derrubar loops de loops longos.\n\n`;

    // 11. CONCLUSÃO FINAL
    txt += `11. CONCLUSÃO FINAL\n`;
    txt += `--------------------------------------------------------------------------------\n`;
    txt += `O token provido na FICV é extremamente potente (425 funções). A integração de dados básicos (Cadastro, Matrícula, Cursos) é Trivial. A integração de desempenho profundo (Logs e Tentativas) exigirá uma rotina de loops compostos e staging area no Supabase para evitar sobrecarga. Os próximos passos são homologar o CronJob de sinc incremental das médias finais.\n`;

    fs.writeFileSync('radiografia_moodle_api_ficv.txt', txt);
    console.log("Arquivos txt e json criados com sucesso.");

    // --- 3. GERAR MAPA INTEGRACAO ---
    let mapTxt = `================================================================================\n`;
    mapTxt += `        MAPA DE ARQUITETURA DE INTEGRAÇÃO MOODLE E SISTEMA LOCAL                   \n`;
    mapTxt += `================================================================================\n\n`;
    mapTxt += `### A. Estratégia de Ingestão\n`;
    mapTxt += `- **Tipo**: Coleta incremental puxada (Pull-based via Cron Action).\n`;
    mapTxt += `- **Frequência**: 1x por hora para Notas; 1x por dia para Cadastros de Usuário.\n\n`;
    mapTxt += `### B. Proposta de Staging Area (Supabase)\n`;
    mapTxt += `- Tabela \`dados_moodle_cursos\` (Atual já instalada).\n`;
    mapTxt += `- Idealizar tabela \`log_interacoes\` para capturar 'lastaccess' dos Quizzes para dar tração aos dashboards de tempo-real.\n\n`;
    mapTxt += `### C. Modelagem Relacional e Analítica (Star Schema)\n`;
    mapTxt += `- **Tabela Fato**: \`fato_desempenho\` (id_aluno, id_curso, nota, data_coleta).\n`;
    mapTxt += `- **Dimensões**: \`dim_aluno\` (id_moodle, nome, cpf, semestre), \`dim_curso\` (id, nome, categoria).\n\n`;
    
    fs.writeFileSync('mapa_integracao_moodle_ficv.txt', mapTxt);

}

run();
