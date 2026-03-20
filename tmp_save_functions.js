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
        console.error("Erro na requisição:", e.message);
        return null;
    }
}

async function run() {
    const result = await moodleRequest("core_webservice_get_site_info");
    const fs = require('fs');
    if (result && result.functions) {
        fs.writeFileSync('moodle_functions_available.json', JSON.stringify(result.functions, null, 2));
        console.log(`Salvas ${result.functions.length} funções em moodle_functions_available.json`);
    } else {
        console.log("Falha ao obter funções.");
        console.log(result);
    }
}

run();
