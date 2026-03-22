const fs = require('fs');
const paths = [
  "d:\\repositorio_geral\\app_gestao_contratos\\DOCS\\relatorio_institucional_completo.tex",
  "d:\\repositorio_geral\\app_gestao_contratos\\DOCS\\apresentacao_moodle_arkos.tex",
  "d:\\repositorio_geral\\app_gestao_contratos\\DOCS\\relatorio_institucional\\main.tex"
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Regex for finding two consecutive backslashes followed by a lowercase word (commands like \chapter, \section)
    // Wait, let's just make it replace any double backslash to single backslash.
    // Wait! In LaTeX, \\ inside a paragraph means "break line"! If we replace all \\ to \ we might BREAK intentional line breaks!
    // But in swebok.tex, ALL was doubled, including \\begin, \\item.
    // Let's create a Regex that ONLY matches \\ + letter! e.g., \\(\w+)
    let fixed = content.replace(/\\\\([A-Za-z]+)/g, '\\$1');
    fs.writeFileSync(p, fixed, 'utf8');
    console.log("Checked and Fixed: " + p);
  }
});
