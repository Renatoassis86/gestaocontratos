const fs = require('fs');

const MOODLE_URL = "https://ead.cidadeviva.org/";
const TOKEN = "71edd081c7e0c5bb83f872b60af80227";

async function moodleRequest(wsfunction, params = {}) {
    const url = `${MOODLE_URL}/webservice/rest/server.php`;
    const payload = new URLSearchParams({
        wstoken: TOKEN,
        moodlewsrestformat: 'json',
        wsfunction: wsfunction,
        ...params
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload
        });
        return await response.json();
    } catch (error) { return { error: true }; }
}

async function run() {
    console.log("Iniciando varredura profunda para encontrar notas reias...");
    const courses = await moodleRequest('core_course_get_courses');
    
    if (!Array.isArray(courses)) {
         console.log("Erro ao carregar cursos.");
         return;
    }

    console.log(`Analisando ${courses.length} cursos...`);
    const coursesWithEnrollment = [];

    // Limitar para varrer até 30 cursos dos visíveis para não estourar tempo
    const activeCourses = courses.filter(c => c.id > 1 && c.visible === 1).slice(0, 30);

    for (const c of activeCourses) {
        const users = await moodleRequest('core_enrol_get_enrolled_users', { courseid: c.id });
        if (Array.isArray(users) && users.length > 0) {
            coursesWithEnrollment.push({
                 id: c.id,
                 name: c.fullname,
                 summary: c.summary,
                 users: users
            });
            console.log(`- Curso ${c.fullname} (ID: ${c.id}) tem ${users.length} alunos.`);
        }
    }

    // Ordenar por cursos que têm usuários
    coursesWithEnrollment.sort((a, b) => b.users.length - a.users.length);

    if (coursesWithEnrollment.length === 0) {
        console.log("Nenhum curso tem alunos matriculados.");
        return;
    }

    // Pegar o top 3 com mais alunos
    const bestCourses = coursesWithEnrollment.slice(0, 3);
    const resultData = [];

    function cleanText(html) {
        if (!html) return "";
        return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    }

    console.log("\nProcessando notas para os cursos mais cheios:");
    for (const c of bestCourses) {
        console.log(`\n -> Varrendo grades do curso: ${c.name} (ID: ${c.id})`);
        const summaryClean = cleanText(c.summary).substring(0, 100) + "...";

        // Varrer até 10 alunos por curso do top 3
        for (const user of c.users.slice(0, 10)) {
            let grades = [];
            try {
                const gradeItems = await moodleRequest('gradereport_user_get_grade_items', { 
                    courseid: c.id, 
                    userid: user.id 
                });

                if (gradeItems && gradeItems.usergrades) {
                     const ug = gradeItems.usergrades[0];
                     if (ug && ug.gradeitems) {
                          grades = ug.gradeitems.map(item => ({
                               itemname: item.itemname || "Nota Geral",
                               itemtype: item.itemtype,
                               graderaw: item.graderaw,
                               grademax: item.grademax,
                               percentage: item.percentageformatted,
                               is_course_total: item.itemtype === 'course'
                          }));
                     }
                }
            } catch (e) {}

            const finalGradeItem = grades.find(g => g.is_course_total);
            const mediaFinal = finalGradeItem ? (finalGradeItem.graderaw != null ? finalGradeItem.graderaw : "N/D") : "N/D";

            if (mediaFinal !== "N/D") {
                console.log(`    [UAU] Aluno ${user.fullname} no curso ${c.id} tem nota ${mediaFinal}!`);
            }

            let cpf = "N/D";
            if (user.customfields) {
                const cpfField = user.customfields.find(f => f.name.toLowerCase().includes('cpf') || f.shortname === 'cpf');
                if (cpfField) cpf = cpfField.value;
            }

            resultData.push({
                course_id: c.id,
                course_name: c.name,
                course_summary_plain: summaryClean,
                user_id: user.id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                cpf: cpf,
                media_final: mediaFinal,
                all_grades: grades
            });
        }
    }

    // Salvar JSON atualizado
    fs.writeFileSync('integracao_view.json', JSON.stringify(resultData, null, 2));

    // Recriar o HTML dashboard-preview com os NOVOS dados e com fallback de notas mockadas SE tudo vier vazio
    if (resultData.every(r => r.media_final === "N/D")) {
         console.log("\nAviso: Todas as notas vieram N/D novamente. Vou injetar notas simuladas baseadas em percentuais válidos para você ver a interface funcionando com dashboards vivos em modo DEMO.");
         resultData.forEach(r => {
              r.media_final = (Math.random() * (10 - 4) + 4).toFixed(1); // Simular 4.0 a 10.0
         });
         fs.writeFileSync('integracao_view.json', JSON.stringify(resultData, null, 2));
    }

    // Copiar o código de Renderização HTML anterior e salvar de novo
    // (O script em tmp_integracao_pilot.js já faz isso bem, vamos só repopular o htmlString)
    console.log("Re-gerando dashboard_moodle_preview.html...");
    const htmlString = currentDashboardHtml(resultData);
    fs.writeFileSync('dashboard_moodle_preview.html', htmlString);
    console.log("Processo Finalizado.");
}

function currentDashboardHtml(data) {
     return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Preview Painel Integração Moodle</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0f172a; --card: #1e293b; --accent: #38bdf8; --text: #f1f5f9; --critico: #ef4444; --sucesso: #22c55e; }
        body { font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
        h1 { font-weight: 800; text-align: center; margin-bottom: 5px; background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .subtitle { text-align: center; color: #94a3b8; font-size: 0.95rem; margin-bottom: 30px; }
        .filters { display: flex; gap: 15px; justify-content: center; margin-bottom: 25px; flex-wrap: wrap; }
        select, input { background: var(--card); border: 1px solid #334155; color: var(--text); padding: 10px 15px; border-radius: 8px; font-family: inherit; font-size: 0.9rem; outline: none; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
        .card { background: var(--card); border-radius: 12px; padding: 20px; border: 1px solid #334155; }
        .card-header { border-bottom: 1px solid #334155; padding-bottom: 12px; margin-bottom: 15px; }
        .course-name { font-size: 0.75rem; color: var(--accent); font-weight: 600; }
        .user-name { font-size: 1.15rem; font-weight: 600; }
        .details { font-size: 0.75rem; color: #94a3b8; margin-top: 5px; }
        .grade-box { display: flex; align-items: center; justify-content: space-between; margin-top: 15px; padding: 10px; background: #0f172a; border-radius: 8px; }
        .grade-value { font-size: 1.5rem; font-weight: 800; }
        .grade-aprovado { color: var(--sucesso); }
        .grade-critico { color: var(--critico); }
    </style>
</head>
<body>
    <h1>DIAGNÓSTICO DO ALUNO (WORKFLOW INTEGRADO)</h1>
    <div class="subtitle">Visão de integração. ${data.every(r => r.media_final && r.media_final !== "N/D") ? "<b>[Modo DEMO]</b> Exibindo dados de design para aprovação de layout." : ""}</div>
    <div class="filters">
        <input type="text" id="search" placeholder="Buscar aluno ou curso..." onkeyup="render()">
        <select id="courseFilter" onchange="render()"><option value="all">Todos os Cursos</option></select>
        <select id="gradeFilter" onchange="render()">
             <option value="all">Todas as Notas</option>
             <option value="aprovado">Aprovados (>= 7.0)</option>
             <option value="reprovado">Abaixo da média (< 7.0)</option>
        </select>
    </div>
    <div class="grid" id="dashboard"></div>
    <script>
        const data = ${JSON.stringify(data)};
        const selectCourse = document.getElementById("courseFilter");
        const map = {}; data.forEach(d => { map[d.course_id] = d.course_name; });
        for (const [id, name] of Object.entries(map)) {
            const opt = document.createElement("option"); opt.value = id; opt.innerText = name; selectCourse.appendChild(opt);
        }
        function render() {
            const search = document.getElementById("search").value.toLowerCase();
            const courseId = document.getElementById("courseFilter").value;
            const gradeFilter = document.getElementById("gradeFilter").value;
            const grid = document.getElementById("dashboard"); grid.innerHTML = "";
            data.forEach(item => {
                if ((item.fullname.toLowerCase().includes(search) || item.course_name.toLowerCase().includes(search)) && (courseId === "all" || item.course_id == courseId)) {
                    let matchGrade = true;
                    const media = parseFloat(item.media_final);
                    if (gradeFilter === "aprovado") matchGrade = !isNaN(media) && media >= 7.0;
                    else if (gradeFilter === "reprovado") matchGrade = !isNaN(media) && media < 7.0;
                    
                    if (matchGrade) {
                        const style = !isNaN(media) ? (media >= 7.0 ? "grade-aprovado" : "grade-critico") : "";
                        grid.innerHTML += \`
                            <div class="card">
                                <div class="card-header">
                                    <div class="course-name">\${item.course_name}</div>
                                    <div class="user-name">\${item.fullname}</div>
                                </div>
                                <div class="details">CPF: \${item.cpf}</div>
                                <div class="details"><b>Ementa (NLP)</b>: \${item.course_summary_plain}</div>
                                <div class="grade-box">
                                    <div class="grade-label">Média Final</div>
                                    <div class="grade-value \${style}">\${item.media_final}</div>
                                </div>
                            </div>\`;
                    }
                }
            });
        } render();
    </script>
</body>
</html>`;
}

run();
