const fs = require('fs');
const paths = [
  'src/app/page.tsx', 
  'src/app/dashboard/modulos/page.tsx', 
  'src/app/dashboard/modulos/[id]/page.tsx', 
  'DOCS/relatorio_institucional/capitulos/modulos.tex', 
  'DOCS/relatorio_institucional_completo.tex'
];

const renames = [
  ['Arkos IT & Infra', 'Arkos Tech Management'],
  ['Arkos IT \\\\& Infra', 'Arkos Tech Management'],
  ['Arkos Commerce & SaaS', 'Arkos Commerce Suite'],
  ['Arkos Commerce \\\\& SaaS', 'Arkos Commerce Suite'],
  ['Arkos HRMS (Recursos Humanos)', 'Arkos Talent Intelligence'],
  ['Arkos CRM Matrix', 'Arkos Client Matrix'],
  ['Arkos ERP Matrix', 'Arkos Operation Matrix'],
  ['Arkos Strategy Planner', 'Arkos Strategy Master'],
  ['GESTÃO DE RELACIONAMENTO & VENDAS', 'GESTÃO DE RELACIONAMENTO E VENDAS'],
  ['GESTAO OPERACIONAL & FINANCEIRA', 'GESTAO OPERACIONAL E FINANCEIRA'],
  ['GESTÃO DE TALENTOS & PERFORMANCE', 'GESTÃO DE TALENTOS E PERFORMANCE']
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    renames.forEach(r => {
      // Escape special characters for RegExp
      const searchStr = r[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(searchStr, 'g');
      c = c.replace(regex, r[1]);
    });
    // Final generic scrub of remaining literal " & " or " & " for safety 
    c = c.replace(/ & /g, ' E ');
    c = c.replace(/ \\\\& /g, ' E ');
    fs.writeFileSync(p, c);
  }
});

console.log('Renames applied successfully');
