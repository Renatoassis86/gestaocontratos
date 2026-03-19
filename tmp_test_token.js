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
    console.log("--- TESTE 1: Validar se o Token está Ativo ---");
    // core_user_get_users_by_field (lê dados de usuário por campo, como username)
    // Vamos tentar ler os próprios dados do 'integracaoarkos' para provar que o token funciona
    const result = await moodleRequest("core_user_get_users_by_field", {
        field: "username",
        "values[0]": "integracaoarkos"
    });
    
    console.log(JSON.stringify(result, null, 2));
}

run();
