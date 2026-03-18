const fs = require('fs');
let pdf = require('pdf-parse');

if (typeof pdf !== 'function' && pdf.default) {
    pdf = pdf.default;
}

const dataBuffer = fs.readFileSync('d:\\repositorio_geral\\app_gestao_contratos\\arkospitchdeckpptx.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('d:\\repositorio_geral\\app_gestao_contratos\\arkospitchdeckpptx.txt', data.text);
    console.log('✅ PDF Extracted to txt!');
}).catch(err => {
    console.error('Erro na extração:', err);
});
