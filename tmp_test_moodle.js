const MOODLE_TOKEN = "71edd081c7e0c5bb83f872b60af80227";
const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php";

async function moodleRequest(wsfunction, params = {}) {
    const payload = new URLSearchParams({
        ...params,
        wstoken: MOODLE_TOKEN,
        moodlewsrestformat: 'json',
        wsfunction: wsfunction
    });
    
    try {
        const response = await fetch(MOODLE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload.toString()
        });
        return await response.json();
    } catch (e) {
        console.error("Error connecting to Moodle:", e.message);
        return null;
    }
}

async function run() {
    console.log("--- CURSOS ---");
    const courses = await moodleRequest("core_course_get_courses");
    console.log(JSON.stringify(courses, null, 2));
}

run();
