const MOODLE_TOKEN = "71edd081c7e0c5bb83f872b60af80227"
const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"

async function moodleRequest(wsfunction, params = {}) {
  const payload = new URLSearchParams({
    ...params,
    wstoken: MOODLE_TOKEN,
    moodlewsrestformat: 'json',
    wsfunction: wsfunction
  })

  const resp = await fetch(MOODLE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload.toString()
  })
  return await resp.json()
}

async function main() {
  console.log("Buscando TODAS as funções habilitadas na API do Moodle...");
  const functions = await moodleRequest('core_system_get_functions')
  
  if (functions.exception || functions.error) {
    console.log("Erro:", functions.message || functions);
  } else {
    // Listar apenas os nomes e uma breve descrição
    const names = functions.map(f => `${f.name} - ${f.description.split('\n')[0]}`);
    console.log(JSON.stringify(names, null, 2));
  }
}

main().catch(console.error);
