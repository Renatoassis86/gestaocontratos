const fs = require('fs');
const p = 'src/app/page.tsx';
let c = fs.readFileSync(p, 'utf-8');

const t1 = `      <section className={styles.section} style={{ background: '#090a0c', textAlign: 'center' }}>\n        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F4F2ED', marginBottom: '16px' }}>Impacto Projetado na Operação</h2>\n        <p style={{ color: '#8A8F99', fontSize: '1rem', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px auto' }}>Métricas médias de rentabilidade e eficiência entregues na jornada das empresas que adotam a infraestrutura ARKOS.</p>`;
const r1 = `      <section className={styles.section} style={{ background: '#F8F9FA', textAlign: 'center' }}>\n        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111318', marginBottom: '16px' }}>Impacto Projetado na Operação</h2>\n        <p style={{ color: '#4A5568', fontSize: '1rem', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px auto' }}>Métricas médias de rentabilidade e eficiência entregues na jornada das empresas que adotam a infraestrutura ARKOS.</p>`;

if (c.includes(t1)) {
    c = c.replace(t1, r1);
    console.log('S1 ok');
} else {
    console.log('S1 fail');
}

const t2 = `              <div key={i} className={styles.metricCard}>
                <div className={styles.metricBig}>{m.b}</div>
                <div className={styles.metricTitle}>{m.t}</div>
                <p className={styles.metricDesc}><strong>O que representa:</strong> {m.d}</p>
              </div>`;

const r2 = `              <div key={i} className={styles.metricCard} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div className={styles.metricBig} style={{ color: '#090A0C' }}>{m.b}</div>
                <div className={styles.metricTitle} style={{ color: '#4A5568' }}>{m.t}</div>
                <p className={styles.metricDesc} style={{ color: '#718096' }}><strong style={{ color: '#2D3748' }}>O que representa:</strong> {m.d}</p>
              </div>`;

if (c.includes(t2)) {
    c = c.replace(t2, r2);
    console.log('S2 ok');
} else {
    // Try with exact text from viewer showing single line if there's no newlines originally
    console.log('S2 fail, attempting regex');
}

// Safer exact match for everything on lists:
c = c.replace(/<div key={i} className={styles\.metricCard}>[\s\S]*?<p className={styles\.metricDesc}><strong>O que representa:<\/strong> {m\.d}<\/p>[\s\S]*?<\/div>/g, (match) => {
    return `<div key={i} className={styles.metricCard} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div className={styles.metricBig} style={{ color: '#090A0C' }}>{match.match(/metricBig}>(.*?)<\/div>/)[1]}</div>
                <div className={styles.metricTitle} style={{ color: '#4A5568' }}>{match.match(/metricTitle}>(.*?)<\/div>/)[1]}</div>
                <p className={styles.metricDesc} style={{ color: '#718096' }}><strong style={{ color: '#2D3748' }}>O que representa:</strong> {match.match(/O que representa:<\/strong> (.*?)<\/p>/)[1]}</p>
              </div>`;
});

// Since regex is very robust, let's just do that for FIRST block, and then duplicate same style list triggers!
// Wait, regex might fail on dynamic templates syntax. 
// Let's create an exact script without fancy regex, just literal match with proper newlines.
fs.writeFileSync(p, c);
console.log('Finished everything.');
