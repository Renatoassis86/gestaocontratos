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
    const courseId = 2; // Introdução à Cosmovisão
    const users = await moodleRequest('core_enrol_get_enrolled_users', { courseid: courseId });
    
    if (!Array.isArray(users)) {
         console.log("Falha ao puxar matriculados.");
         return;
    }

    console.log(`Total de Alunos no curso 2: ${users.length}`);

    for (const user of users) {
        const gradeItems = await moodleRequest('gradereport_user_get_grade_items', { courseid: courseId, userid: user.id });
        if (gradeItems && gradeItems.usergrades) {
             const grades = gradeItems.usergrades[0].gradeitems;
             const nonNull = grades.filter(g => g.graderaw !== null);
             if (nonNull.length > 0) {
                  console.log(`[SUCESSO] Usuário ${user.fullname} (ID: ${user.id}) tem notas de verdade!`);
                  nonNull.forEach(n => console.log(` - ${n.itemname}: ${n.graderaw}`));
             } else {
                  console.log(`Usuário ${user.fullname} (ID: ${user.id}) tem apenas grades vazias/null.`);
             }
        }
    }
}

run();
