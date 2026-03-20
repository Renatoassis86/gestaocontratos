const fs = require('fs');

try {
    let currentTxt = fs.readFileSync('radiografia_moodle_api_ficv.txt', 'utf8');
    let functions = JSON.parse(fs.readFileSync('moodle_functions_available.json', 'utf8'));

    // Agrupar por prefixo
    const rawCategories = {};
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
        if (!rawCategories[category]) rawCategories[category] = [];
        rawCategories[category].push(f.name);
    });

    // Criar DICIONÁRIO SEMÂNTICO DE TODAS AS CATEGORIAS
    let catalogTxt = `\n\n================================================================================\n`;
    catalogTxt += `       DICIONÁRIO SEMÂNTICO E CAPACIDADES DE TODAS AS CATEGORIAS DE API             \n`;
    catalogTxt += `================================================================================\n\n`;
    catalogTxt += `Esta seção descreve a capacidade de informação de **todas as famílias de APIs** \n`;
    catalogTxt += `habilitadas no token da FICV, permitindo mapear o potencial de cada endpoint.\n\n`;

    const categoryDefinitions = {
        core_badges: "Retorna metadados de medalhas (badges) conquistadas por usuários. **Retorno**: id, name, description, imageurl, dateissued. **Valor**: Gamificação e certificados.",
        core_blog: "Lista postagens de blog internas do Moodle. **Retorno**: id, module, userid, subject, summary, format. **Valor**: Análise de posts.",
        core_calendar: "Eventos do calendário institucional e do curso. **Retorno**: id, name, description, timestart, timeduration, eventtype. **Valor**: Séries temporais de prazos.",
        core_comment: "Comentários em posts ou feedbacks. **Retorno**: id, content, format, timecreated, userid. **Valor**: NLP / Satisfação.",
        core_completion: "Status de conclusão de atividades (booleanos e datas). **Retorno**: courseid, userid, statuses (array de id, completionstate). **Valor**: Tracking progressivo.",
        core_course: "Metadados estruturais de Cursos e Áreas. **Retorno**: id, fullname, categoryid, visible, summary. **Valor**: Chaves relacionais.",
        core_enrol: "Lista vínculos de matrículas (Enrollments). **Retorno**: userid, courseid, roles, timestart, timeend. **Valor**: Contratos e Frequência.",
        core_files: "Gestão e links de arquivos anexados (PDFs, Docs). **Retorno**: fileid, filename, filepath, filesize, fileurl. **Valor**: Coleta de documentos.",
        core_group: "Lista de grupos e agrupamentos de alunos. **Retorno**: id, courseid, name, description, members_count. **Valor**: Segmentação de coortes.",
        core_message: "Conversas diretas e notificações de sistema. **Retorno**: id, useridfrom, subject, fullmessage, timecreated. **Valor**: NLP e Comunicação.",
        core_notes: "Notas administrativas (observações) sobre o aluno. **Retorno**: id, courseid, userid, content, format. **Valor**: Observações de Docente.",
        core_rating: "Avaliações dadas a posts ou feedbacks. **Retorno**: itemid, scaleid, rating, userid. **Valor**: Scoring de engajamento.",
        core_tag: "Tags de taxonomia aplicadas a cursos/disciplinas. **Retorno**: id, name, rawname, tagid. **Valor**: Agrupamento temático.",
        core_user: "Perfis completos de usuário incluindo CustomFields. **Retorno**: id, username, email, customfields (CPF, Nascimento). **Valor**: Cadastro Central.",
        core_competency: "Lista competências ligadas ao plano de aprendizagem. **Retorno**: id, shortname, description, idnumber. **Valor**: Trilha acadêmica.",
        core_webservice: "Metadados do próprio token. **Retorno**: siteid, username, functions. **Valor**: Diagnóstico.",
        core_block: "Blocos dispostos na interface (Dashboard). **Retorno**: id, blockname, region, weight. **Valor**: Estrutura visual.",
        core_filters: "Filtros aplicados ao conteúdo (LaTeX, etc). **Retorno**: filter, localstate, inheritedstate. **Valor**: Compatibilidade.",
        module_assign: "Tarefas e submissões com upload. **Retorno**: id, course(id), assignments (array com id, name, allowsubmissions). **Valor**: Certificação e notas.",
        module_book: "Livros e recursos de leitura. **Retorno**: id, name, summary, intro, introformat. **Valor**: Dados de conteúdo.",
        module_choice: "Enquetes de Escolha Simples. **Retorno**: id, name, intro, options (array de id, text). **Valor**: Feedback rápido.",
        module_data: "Bancos de dados internos (atividades). **Retorno**: id, name, comments, fields (array de id, name). **Valor**: ETL customizado.",
        module_feedback: "Formulários de feedback (Questionários). **Retorno**: id, name, intro, anonymous. **Valor**: NPS / Satisfação do Aluno.",
        module_folder: "Diretórios de arquivos agrupados. **Retorno**: id, name, readme, intro. **Valor**: Repositório.",
        module_forum: "Discussões e posts de fóruns. **Retorno**: id, name, type, intro, discussions (array de id, name, message). **Valor**: Mineração de texto (NLP).",
        module_glossary: "Dicionários de termos (Glossário). **Retorno**: id, name, intro, entries (id, concept, definition). **Valor**: Base de conhecimento.",
        module_lesson: "Trilhas de Lições estruturadas. **Retorno**: id, course, name, practice, usepassword. **Valor**: Trilha de aprendizagem.",
        module_lti: "Ferramentas externas (LTI - ex: Zoom). **Retorno**: id, course, name, toolurl, securetoolurl. **Valor**: Integração vídeo.",
        module_page: "Páginas de texto estático no curso. **Retorno**: id, name, intro, content, contentformat. **Valor**: Texto estruturado.",
        module_quiz: "Provas e Quizzes. **Retorno**: id, course, name, intro, timeopen, timeclose, attempts (int), sumgrades. **Valor**: Dashboard de nota final.",
        module_resource: "Arquivos e links simples. **Retorno**: id, name, intro, introformat, tobemoved. **Valor**: Conteúdo.",
        module_scorm: "Pacotes SCORM (Aulas interativas). **Retorno**: id, course, name, intro, version, maxgrade. **Valor**: Desempenho granular.",
        module_url: "Links externos (URLs). **Retorno**: id, course, name, intro, externalurl. **Valor**: Indexação.",
        module_wiki: "Wikis colaborativas de alunos. **Retorno**: id, course, name, intro, firstpagetitle. **Valor**: Texto colaborativo.",
        module_workshop: "Atividades de avaliação por pares. **Retorno**: id, course, name, intro, phase, useexamples. **Valor**: Ciclo de notas avançado.",
        enrol_guest: "Método de acesso visitante (sem login). **Retorno**: instance_info, password_needed. **Valor**: Segurança.",
        enrol_self: "Automátricula do aluno. **Retorno**: instance_info, enrolment_key_needed. **Valor**: Trilha de acesso.",
        message_airnotifier: "Configurações de notificações push (Apps). **Retorno**: userdevices (array de id, name, model). **Valor**: Log de dispositivos.",
        message_popup: "Alertas popup de tela. **Retorno**: notifications (id, subject, contexturl). **Valor**: Logs de atenção.",
        grades_report: "Visões e tabelas de notas do Gradebook. **Retorno**: usergrades (array de courseid, userid, gradeitems). **Valor**: BI de Notas consolidado.",
        tool_dataprivacy: "Pedidos de GDPR/LGPD. **Retorno**: requests (id, userid, type, status). **Valor**: Governança de Dados.",
        tool_lp: "Dados de Learning Plans. **Retorno**: id, name, description, status. **Valor**: Desenvolvimento de trilhas.",
        tool_mobile: "Configs para App Mobile. **Retorno**: plugins_config, autologin_key. **Valor**: Mobile Analytics.",
        module_bigbluebuttonbn: "Webconferências (BigBlueButton). **Retorno**: id, course, name, meetingid, recordings. **Valor**: Histórico de Assiduidade.",
        grades_core: "Gatos de painéis de graduação. **Retorno**: grade_items, user_grades. **Valor**: Desempenho granular.",
        core_h5p: "Arquivos H5P interativos. **Retorno**: id, pathname, filename. **Valor**: Interação rica.",
        core_table: "Tabelas dinâmicas renderizadas. **Retorno**: html, totalrows. **Valor**: Views pré-prontas.",
        core_xapi: "Geração de statements xAPI (TinCan). **Retorno**: success (boolean). **Valor**: Big Data / Learning Analytics.",
        module_h5pactivity: "Relatório de tentativas H5P. **Retorno**: attempts (id, h5pactivityid, userid, scaledscore). **Valor**: Nota de interações.",
        report_insights: "Disparos de predições de IA do Moodle. **Retorno**: insights (array). **Valor**: Preditor de churn nativo.",
        tool_moodlenet: "Compartilhamento com MoodleNet. **Retorno**: webfinger_info. **Valor**: Compartilhamento.",
        core_reportbuilder: "Construtor de relatórios customizados. **Retorno**: reports (id, name), report_content (rows). **Valor**: BI Próprio customizado.",
        core_my: "Visão da página 'Meu Moodle'. **Retorno**: blocks, items. **Valor**: Experiência do Aluno.",
        core_search: "Resultados de busca textual indexada. **Retorno**: results (id, title, content, url). **Valor**: Indexador documental.",
        core_ai: "Políticas de IA / Copilot interno. **Retorno**: status (boolean). **Valor**: Logs de IA.",
        aiplacement_courseassist: "Assistentes de texto (resumos). **Retorno**: text_summary (string). **Valor**: Sumarização de materiais.",
        aiplacement_editor: "Geração de imagens/texto por IA. **Retorno**: generated_url / generated_text. **Valor**: Assets dinâmicos.",
        tool_policy: "Status de Aceite de Termos de Uso. **Retorno**: acceptances (id, policyid, status). **Valor**: Jurídico / Contratos.",
        tiny_premium: "Ativação de Editores de Texto. **Retorno**: api_key. **Valor**: Licenciamento.",
        editor_tiny: "Configurações de editores de texto. **Retorno**: config_options. **Valor**: UI Config.",
        module_questionnaire: "Feedback em formato Checklist/Questionnaire. **Retorno**: responses (array). **Valor**: Pesquisas acadêmicas."
    };

    catalogTxt += `| Família de API | Descrição das Informações que Traz | Estrutura de Retorno (Campos Típicos) | Valor Analítico / Negócio |\n`;
    catalogTxt += `| :--- | :--- | :--- | :--- |\n`;

    // Loop pelas categorias que temos nos dados
    for (const [cat, funcs] of Object.entries(rawCategories)) {
         let def = categoryDefinitions[cat] || "Descrição genérica de module/core API. Retorna listagem de itens relativos ao módulo.";
         // Desfazer descrição para preencher a tabela
         const name = cat.toUpperCase();
         const returns = def.includes("**Retorno**:") ? def.split("**Retorno**:")[1].split("**Valor**:")[0].trim() : "Campos estruturais diversos";
         const desc = def.split("**Retorno**:")[0].trim();
         const valor = def.includes("**Valor**:") ? def.split("**Valor**:")[1].trim() : "Mapeamento genérico";

         catalogTxt += `| **${name}** (${funcs.length} func) | ${desc} | ${returns} | ${valor} |\n`;
    }

    catalogTxt += `\n*Nota: Conforme regido pela arquitetura do Moodle, o campo \`id\` sempre representa a chave primária da entidade, e campos terminados em \`date\`, \`time\` ou \`timestamp\` trazem contagem Unix.*`;

    fs.writeFileSync('radiografia_moodle_api_ficv.txt', currentTxt + catalogTxt);
    console.log("Catálogo de todas as categorias anexado com sucesso.");

} catch (e) {
    console.error("Erro:", e.message);
}
