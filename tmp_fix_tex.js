const fs = require('fs');
const path = "d:\\repositorio_geral\\app_gestao_contratos\\DOCS\\relatorio_institucional\\capitulos\\swebok.tex";

let content = fs.readFileSync(path, 'utf8');
// Replace double backslashes with support single backslash
let fixed = content.replace(/\\\\/g, '\\');
fs.writeFileSync(path, fixed, 'utf8');
console.log("Fixed successfully via Node");
