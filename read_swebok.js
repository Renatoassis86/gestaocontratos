const fs = require('fs');
let pdf = require('pdf-parse');

if (typeof pdf !== 'function' && pdf.default) {
    pdf = pdf.default;
}

const dataBuffer = fs.readFileSync('d:\\repositorio_geral\\app_gestao_contratos\\6 - IEEE_2024_SWEBOK_4.pdf');

pdf(dataBuffer).then(function(data) {
    // Write just the first 50,000 characters to see the index/intro
    fs.writeFileSync('d:\\repositorio_geral\\app_gestao_contratos\\swebok_intro.txt', data.text.substring(0, 50000));
    // Write whole file for reference
    fs.writeFileSync('d:\\repositorio_geral\\app_gestao_contratos\\swebok_full.txt', data.text);
    console.log('✅ SWEBOK PDF text extracted!');
}).catch(err => {
    console.error('Erro na extração do SWEBOK:', err);
});
