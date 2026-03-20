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
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// Pequena técnica de NLP para remover tags HTML
function cleanText(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
}

async function run() {
    console.log("Iniciando varredura piloto...");

    // 1. Puxar Cursos
    const courses = await moodleRequest('core_course_get_courses');
    if (courses.error || !Array.isArray(courses)) {
        console.error("Erro ao puxar cursos.", courses);
        return;
    }

    // Filtrar os 3 primeiros cursos visíveis (excluindo id=1 que costuma ser o site)
    const activeCourses = courses.filter(c => c.id > 1 && c.visible === 1).slice(0, 3);
    console.log(`Cursos encontrados: ${activeCourses.length}`);

    const resultData = [];

    for (const course of activeCourses) {
        console.log(`Processando Curso: ${course.fullname} (ID: ${course.id})...`);

        // NLP básico na ementa do curso
        const ementaLimpa = cleanText(course.summary);

        // 2. Puxar Alunos matriculados no curso
        const enrolledUsers = await moodleRequest('core_enrol_get_enrolled_users', { courseid: course.id });

        if (!Array.isArray(enrolledUsers)) {
             console.log(`Não foi possível listar matriculados no curso ${course.id}`);
             continue;
        }

        console.log(`- Alunos matriculados: ${enrolledUsers.length}`);

        // Iterar nos primeiros 5 alunos do curso para o piloto
        for (const user of enrolledUsers.slice(0, 5)) {
             // 3. Puxar Notas
             let grades = [];
             try {
                 const gradeItems = await moodleRequest('gradereport_user_get_grade_items', { 
                     courseid: course.id, 
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
             } catch (e) {
                 // Nota pode falhar para managers/professores
             }

             // Encontrar a média final (course total)
             const finalGradeItem = grades.find(g => g.is_course_total);
             const mediaFinal = finalGradeItem ? (finalGradeItem.graderaw != null ? finalGradeItem.graderaw : "N/D") : "N/D";

             // Extrair CPF do CustomFields
             let cpf = "N/D";
             if (user.customfields) {
                 const cpfField = user.customfields.find(f => f.shortname === 'cpf' || f.name.toLowerCase().includes('cpf'));
                 if (cpfField) cpf = cpfField.value;
             }

             resultData.push({
                 course_id: course.id,
                 course_name: course.fullname,
                 course_summary_plain: ementaLimpa.substring(0, 100) + "...",
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

    // Salvar JSON com os dados reais
    fs.writeFileSync('integracao_view.json', JSON.stringify(resultData, null, 2));
    console.log("Dados salvos em integracao_view.json");

    // 4. Gerar Dashboard de Preview HTML
    const htmlString = `
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
            select:focus, input:focus { border-color: var(--accent); }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
            .card { background: var(--card); border-radius: 12px; padding: 20px; border: 1px solid #334155; transition: transform 0.2s; }
            .card:hover { transform: translateY(-4px); border-color: var(--accent); }
            .card-header { border-bottom: 1px solid #334155; padding-bottom: 12px; margin-bottom: 15px; }
            .course-name { font-size: 0.75rem; color: var(--accent); font-weight: 600; text-transform: uppercase; }
            .user-name { font-size: 1.15rem; font-weight: 600; margin-top: 4px; }
            .email { font-size: 0.8rem; color: #94a3b8; }
            .grade-box { display: flex; align-items: center; justify-content: space-between; margin-top: 15px; padding: 10px; background: #0f172a; border-radius: 8px; }
            .grade-label { font-size: 0.85rem; color: #94a3b8; }
            .grade-value { font-size: 1.5rem; font-weight: 800; }
            .grade-aprovado { color: var(--sucesso); }
            .grade-critico { color: var(--critico); }
            .details { font-size: 0.75rem; color: #94a3b8; margin-top: 10px; line-height: 1.4; }
        </style>
    </head>
    <body>
        <h1>DIAGNÓSTICO DO ALUNO (PILOTO)</h1>
        <div class="subtitle">Simulação de Dashboard com dados estruturados e NLP básico na ementa.</div>

        <div class="filters">
            <input type="text" id="search" placeholder="Buscar aluno ou curso..." onkeyup="render()">
            <select id="courseFilter" onchange="render()">
                <option value="all">Todos os Cursos</option>
            </select>
            <select id="gradeFilter" onchange="render()">
                <option value="all">Todas as Notas</option>
                <option value="aprovado">Aprovados (>= 7.0)</option>
                <option value="reprovado">Abaixo da média (< 7.0)</option>
            </select>
        </div>

        <div class="grid" id="dashboard"></div>

        <script>
            const data = ${JSON.stringify(resultData)};
            
            // Popula filtro de cursos
            const coursesMap = {};
            data.forEach(d => { coursesMap[d.course_id] = d.course_name; });
            const selectCourse = document.getElementById("courseFilter");
            for (const [id, name] of Object.entries(coursesMap)) {
                const opt = document.createElement("option");
                opt.value = id;
                opt.innerText = name;
                selectCourse.appendChild(opt);
            }

            function render() {
                const search = document.getElementById("search").value.toLowerCase();
                const courseId = document.getElementById("courseFilter").value;
                const gradeFilter = document.getElementById("gradeFilter").value;
                const grid = document.getElementById("dashboard");
                grid.innerHTML = "";

                data.forEach(item => {
                    const matchSearch = item.fullname.toLowerCase().includes(search) || item.course_name.toLowerCase().includes(search);
                    const matchCourse = courseId === "all" || item.course_id == courseId;

                    let matchGrade = true;
                    if (gradeFilter === "aprovado") {
                         matchGrade = item.media_final !== "N/D" && parseFloat(item.media_final) >= 7.0;
                    } else if (gradeFilter === "reprovado") {
                         matchGrade = item.media_final !== "N/D" && parseFloat(item.media_final) < 7.0;
                    }

                    if (matchSearch && matchCourse && matchGrade) {
                        const isNumeric = item.media_final !== "N/D";
                        const gradeClass = isNumeric ? (parseFloat(item.media_final) >= 7.0 ? "grade-aprovado" : "grade-critico") : "";
                        
                        grid.innerHTML += \`
                            <div class="card">
                                <div class="card-header">
                                    <div class="course-name">\${item.course_name}</div>
                                    <div class="user-name">\${item.fullname}</div>
                                    <div class="email">\${item.email}</div>
                                </div>
                                <div class="details">CPF: \${item.cpf}</div>
                                <div class="details"><b>Ementa (NLP)</b>: \${item.course_summary_plain}</div>
                                <div class="grade-box">
                                    <div class="grade-label">Média Final em Disciplina</div>
                                    <div class="grade-value \${gradeClass}">\${item.media_final}</div>
                                </div>
                            </div>
                        \`;
                    }
                });
            }
            render();
        </script>
    </body>
    </html>
    `;

    fs.writeFileSync('dashboard_moodle_preview.html', htmlString);
    console.log("Dashboard demonstrativo gerado em: dashboard_moodle_preview.html");
}

run();
