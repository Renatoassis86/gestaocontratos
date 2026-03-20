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
    console.log("--- TESTE 2: Obter Informações do Site e Funções ---");
    const result = await moodleRequest("core_webservice_get_site_info");
    
    //console.log(JSON.stringify(result, null, 2));
    if (result && result.functions) {
        console.log("Funções disponíveis:");
        result.functions.forEach(f => console.log(`- ${f.name}`));
    } else {
        console.log("Não foi possível listar as funções ou resposta inesperada.");
        console.log(result);
    }
}

run();
