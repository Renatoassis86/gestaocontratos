const MOODLE_TOKEN = "71edd081c7e0c5bb83f872b60af80227";
const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php";

async function moodleRequest(wsfunction, params = {}) {
    const payload = new URLSearchParams({
        ...params,
        wstoken: MOODLE_TOKEN,
        moodlewsrestformat: 'json',
        wsfunction: wsfunction
    });
    const response = await fetch(MOODLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString()
    });
    return await response.json();
}

async function run() {
    console.log("=== INSPEÇÃO DE ESTRUTURA: CURSOS ===");
    const courses = await moodleRequest("core_course_get_courses");
    if (courses && courses.length > 0) {
        console.log(JSON.stringify(courses[0], null, 2)); // Imprimir apenas o primeiro para ver a estrutura
    } else {
        console.log("Nenhum curso retornado ou erro.", courses);
    }
}

run();
