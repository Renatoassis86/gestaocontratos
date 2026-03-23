const fs = require('fs');
const p = 'src/app/page.tsx';
let c = fs.readFileSync(p, 'utf-8');

const t1 = `            Atuamos como a inteligência que unifica seus sistemas, automatiza a coleta e aplica modelos preditivos sobre a sua realidade. Nós não apenas apontamos o caminho: **construímos a estrada tecnológica** que permite à sua empresa escalar com controle absoluto das suas margens e custos operacionais.`;
const r1 = `            Atuamos como a inteligência que unifica seus sistemas, automatiza a coleta e aplica modelos preditivos sobre a sua realidade. Nós não apenas apontamos o caminho: <strong style={{color: '#C8F542'}}>construímos a estrada tecnológica</strong> que permite à sua empresa escalar com controle absoluto das suas margens e custos operacionais.`;

if (c.includes(t1)) {
    c = c.replace(t1, r1);
    console.log("Success A");
} else {
    console.log("Failed A");
}

fs.writeFileSync(p, c);
console.log("Updated");
// 创新
