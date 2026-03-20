const fs = require('fs');

try {
    let currentTxt = fs.readFileSync('radiografia_moodle_api_ficv.txt', 'utf8');

    // Extrair os Apêndices que criamos antes (Dicionário, Arquitetura e Catálogo)
    let appendiceDict = "";
    let appendiceArch = "";
    let appendiceCat = "";

    const dictIndex = currentTxt.indexOf("================================================================================\n          DICIONÁRIO DE DADOS DAS APIS PRINCIPAIS");
    const archIndex = currentTxt.indexOf("================================================================================\n          MELHOR ARQUITETURA DE INTEGRAÇÃO INDICADA");
    const catIndex = currentTxt.indexOf("================================================================================\n       DICIONÁRIO SEMÂNTICO E CAPACIDADES DE TODAS AS CATEGORIAS DE API");

    if (dictIndex !== -1) {
        const nextSec = archIndex !== -1 ? archIndex : currentTxt.length;
        appendiceDict = currentTxt.substring(dictIndex, nextSec);
    }
    
    if (archIndex !== -1) {
        const nextSec = catIndex !== -1 ? catIndex : currentTxt.length;
        appendiceArch = currentTxt.substring(archIndex, nextSec);
    }

    if (catIndex !== -1) {
        appendiceCat = currentTxt.substring(catIndex);
    }

    // Texto definitivo fornecido pelo usuário
    let definitiveTxt = `================================================================================\n`;
    definitiveTxt += `      RADIOGRAFIA ANALÍTICA DE DADOS – MOODLE API (FICV)                     \n`;
    definitiveTxt += `      VERSÃO APRIMORADA COM BASE NA DOCUMENTAÇÃO INTERNA DA API              \n`;
    definitiveTxt += `================================================================================\n\n`;

    definitiveTxt += `1. RESUMO EXECUTIVO APRIMORADO\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n`;
    definitiveTxt += `O ambiente Moodle da FICV não oferece apenas dados cadastrais e acadêmicos básicos. A documentação interna mostra que o token atual expõe uma camada ampla de dados em pelo menos seis níveis:\n\n`;
    definitiveTxt += `1. Dados mestres estruturados: usuários, cursos, categorias, matrículas, grupos, papéis, badges, eventos, notas, conclusão, calendários, blocos e arquivos.\n`;
    definitiveTxt += `2. Dados semiestruturados: customfields, preferences, roles, groups, enrolledcourses, courseformatoptions, warnings, advancedfeatures, plugins, fileareas, editorfields, contents, dates, completiondata.\n`;
    definitiveTxt += `3. Dados textuais não estruturados: descrições HTML de curso, textos de fóruns, blogs, tarefas discursivas, feedbacks docentes, conteúdo de workshops, campos de editor e mensagens.\n`;
    definitiveTxt += `4. Dados de arquivos e documentos: anexos, URLs de download, mimetype, tamanho, data de modificação, arquivos externos e áreas de arquivos.\n`;
    definitiveTxt += `5. Dados de engajamento e jornada: lastaccess, timeaccess, progress, hasprogress, isfavourite, overdue, completiondata, actionable, itens recentemente acessados.\n`;
    definitiveTxt += `6. Dados de governança técnica do próprio serviço: lista de funções habilitadas, capacidade de upload/download, quota, tamanho máximo de upload, sessões concorrentes, política aceita, homepage do usuário e chave privada de acesso a arquivos.\n\n`;
    definitiveTxt += `Conclusão executiva: o Moodle da FICV já está em um patamar em que a integração com seu sistema pode ir muito além de “cadastro + nota”. Dá para modelar uma base analítica institucional com dimensões de aluno, curso, professor, atividade, calendário, documentos, interações textuais, trilhas, badges, risco acadêmico e evidências documentais.\n\n`;

    definitiveTxt += `2. CORREÇÕES E APRIMORAMENTOS DO RELATÓRIO ORIGINAL\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `2.1. O item “dados estruturados” estava subestimado\n\n`;
    definitiveTxt += `O relatório inicial focou em id, fullname, email, cpf, semestre e media_geral. Isso é válido, mas a documentação mostra muito mais campos estruturados úteis.\n\n`;
    definitiveTxt += `USUÁRIOS\n`;
    definitiveTxt += `Além de id, username, firstname, lastname, fullname e email, a API também pode retornar:\n`;
    definitiveTxt += `- address\n- phone1, phone2\n- department\n- institution\n- idnumber\n- interests\n- firstaccess\n- lastaccess\n- auth\n- suspended\n- confirmed\n- lang\n- calendartype\n- theme\n- timezone\n- mailformat\n- trackforums\n- description\n- descriptionformat\n- city\n- country\n- profileimageurlsmall\n- profileimageurl\n\n`;
    definitiveTxt += `CURSOS E CALENDÁRIO\n`;
    definitiveTxt += `O ecossistema de cursos e eventos também traz:\n`;
    definitiveTxt += `- startdate, enddate\n- visible\n- showactivitydates\n- showcompletionconditions\n- pdfexportfont\n- fullnamedisplay\n- viewurl\n- courseimage\n- progress\n- hasprogress\n- isfavourite\n- hidden\n- timeaccess\n- showshortname\n- coursecategory\n- overdue\n- formattedtime\n- formattedlocation\n- normalisedeventtype\n- normalisedeventtypetext\n- purpose\n- branded\n\n`;

    definitiveTxt += `3. NOVAS CLASSES DE DADOS QUE O RELATÓRIO DEVE INCORPORAR\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `3.1. Metadados do próprio token e do ambiente\n\n`;
    definitiveTxt += `A função core_webservice_get_site_info é mais estratégica do que parecia. Ela não só lista funções; ela informa:\n`;
    definitiveTxt += `- sitename, username, userid, siteurl, functions\n- downloadfiles, uploadfiles, release, version\n- mobilecssurl, advancedfeatures, usercanmanageownfiles\n- userquota, usermaxuploadfilesize, userhomepage, userhomepageurl\n- userprivateaccesskey, siteid, sitecalendartype, usercalendartype\n- userissiteadmin, theme, limitconcurrentlogins\n- usersessionscount, policyagreed\n\n`;
    definitiveTxt += `IMPLICAÇÃO PARA INTEGRAÇÃO: Diagnóstico completo do robô, ETL e automação documental.\n\n`;

    definitiveTxt += `3.2. Dados semiestruturados de perfil são mais ricos do que CPF\n\n`;
    definitiveTxt += `A documentação confirma que customfields não é um único campo, mas lista objetos de definição e valor. Permite criar ETL genérico que captura qualquer novo campo criado no Moodle FICV.\n\n`;

    definitiveTxt += `3.3. Tarefas discursivas com mais variáveis\n\n`;
    definitiveTxt += `Submissões trazem status de correção, anexos, estrutura por plugin, indicadores de atraso e bloqueio (` + "`editorfields`" + ` de `.replace(' ', '') + "`text`" + ` e ` + "`format`" + `). Excelente para Auditoria e Modelos de Risco.\n\n`;

    definitiveTxt += `3.4. Eventos e calendário trazem sinais analíticos prontos\n\n`;
    definitiveTxt += ` Flags como overdue, isactionevent, formattedtime. Permite criar Painel de Prazos e Monitor de Atrasos.\n\n`;

    definitiveTxt += `3.5. Conteúdo do curso tem estrutura de completion e datas\n\n`;
    definitiveTxt += `Dados de status (` + "`completiondata`" + `), datas de check e motivos de conclusão. Modelagem de trilha acadêmica progressiva.\n\n`;

    definitiveTxt += `3.6. blogs, fóruns e blocos ampliam a parte não estruturada\n\n`;
    definitiveTxt += `Blogs, config JSON de blocos, taxonomias e tags ampliando a mineração de texto.\n\n`;

    definitiveTxt += `4. NOVA TAXONOMIA RECOMENDADA PARA O RELATÓRIO\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `A. Estruturado puro: IDs, nomes, datas, flags, números, status.\n`;
    definitiveTxt += `B. Estruturado relacional enriquecido: Papéis, grupos, matrículas, badges, calendários.\n`;
    definitiveTxt += `C. Semiestruturado aninhado: customfields, preferences, plugins, configs.\n`;
    definitiveTxt += `D. Não estruturado textual: summary, content, editorfields.text, posts, mensagens.\n`;
    definitiveTxt += `E. Não estruturado documental/binário: Arquivos, anexos, imagens, links de download.\n\n`;

    definitiveTxt += `5. RECOMENDAÇÕES DE ETL MAIS FORTES\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `5.1. Arquitetura em 4 camadas:\n`;
    definitiveTxt += `- CAMADA 1: RAW INGESTION (JSON Bruto)\n`;
    definitiveTxt += `- CAMADA 2: STAGING NORMALIZADA (Explosão de Arrays e Semiestruturados)\n`;
    definitiveTxt += `- CAMADA 3: CORE RELACIONAL (users, courses, enrolments, calendar, files)\n`;
    definitiveTxt += `- CAMADA 4: ANALYTICS / MARTS (fact_engagement, fact_grade, fact_calendar, dim_user, dim_course)\n\n`;
    definitiveTxt += `5.2. Preservar HTML e Criar Texto Limpo: Armazenar ` + "`*_raw`" + ` e ` + "`*_plain_text`" + `.\n`;
    definitiveTxt += `5.3. Estratégia Formal para Arquivos: Catálogo com hash/assinatura, mimetype, política de download.\n\n`;

    definitiveTxt += `6. RECOMENDAÇÕES NOVAS DE CIÊNCIA DE DADOS\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `6.1. Modelos preditivos: Risco de Inadimplência acadêmica (Atas de submissão + ausências), Score de Engajamento Multimodal e Learning Analytics nativo.\n`;
    definitiveTxt += `6.2. NLP: Aplicar em posts, fóruns, respostas discursivas e feedback docente para análise de sentimento e clustering semântico.\n\n`;

    definitiveTxt += `7. GAPS QUE PRECISAM ENTRAR NO RELATÓRIO\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `- Capacidade Massiva: Moodle 425 funções tem chamadas voltadas para UI, exigindo cuidado no bulk download.\n`;
    definitiveTxt += `- LGPD: Cuidado com dados sensíveis em feedbacks docentes e redações.\n`;
    definitiveTxt += `- Custo Computacional: Equilibrar Snapshots e Sync Reativo por Evento.\n\n`;

    definitiveTxt += `8. CONCLUSÃO APRIMORADA\n`;
    definitiveTxt += `--------------------------------------------------------------------------------\n\n`;
    definitiveTxt += `A documentação interna da API do Moodle da FICV demonstra que o ambiente expõe mais do que dados cadastrais tradicionais. A integração deve ser concebida em arquitetura multicamadas, contemplando tratamento de semiestruturas e governança documental. O ecossistema já oferece insumos suficientes para dashboards acadêmicos e analíticos avançados.\n\n`;

    definitiveTxt += `\n\n================================================================================\n`;
    definitiveTxt += `       APÊNDICES TÉCNICOS (MAPEAMENTO COMPLETO DE VARIÁVEIS)                 \n`;
    definitiveTxt += `================================================================================\n\n`;

    definitiveTxt += appendiceDict ? appendiceDict + "\n\n" : "";
    definitiveTxt += appendiceArch ? appendiceArch + "\n\n" : "";
    definitiveTxt += appendiceCat ? appendiceCat : "";

    fs.writeFileSync('radiografia_moodle_api_ficv.txt', definitiveTxt);
    console.log("Relatório Master definitivo criado com sucesso.");

} catch (e) {
    console.error("Erro:", e.message);
}
