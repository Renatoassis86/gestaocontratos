const fs = require('fs');
const p = 'src/app/page.tsx';
let c = fs.readFileSync(p, 'utf-8');

c = c.replace(/<section className={styles\.section} style={{\s*background:\s*'#090a0c',\s*textAlign:\s*'center'\s*}}>\s*<h2 style={{\s*fontSize:\s*'2\.5rem',\s*fontWeight:\s*'800',\s*color:\s*'#F4F2ED'/, 
`<section className={styles.section} style={{ background: '#F8F9FA', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111318'`);

c = c.replace(/<p style={{\s*color:\s*'#8A8F99'/, `<p style={{ color: '#4A5568'`);

// Metric Cards with dark coloring
c = c.replace(/<div key={i} className={styles\.metricCard}>\s*<div className={styles\.metricBig}>(.*?)<\/div>\s*<div className={styles\.metricTitle}>(.*?)<\/div>\s*<p className={styles\.metricDesc}><strong>O que representa:<\/strong>\s*(.*?)<\/p>/g, 
`<div key={i} className={styles.metricCard} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div className={styles.metricBig} style={{ color: '#090A0C' }}>$1</div>
                <div className={styles.metricTitle} style={{ color: '#4A5568' }}>$2</div>
                <p className={styles.metricDesc} style={{ color: '#718096' }}><strong style={{ color: '#2D3748' }}>O que representa:</strong> $3</p>`);

c = c.replace(/<div key={`dup-\${i}`} className={`\${styles\.metricCard}\s+\${styles\.onlyOnMobile}`}>\s*<div className={styles\.metricBig}>(.*?)<\/div>\s*<div className={styles\.metricTitle}>(.*?)<\/div>\s*<p className={styles\.metricDesc}><strong>O que representa:<\/strong>\s*(.*?)<\/p>/g,
`<div key={\`dup-\${i}\`} className={styles.metricCard} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div className={styles.metricBig} style={{ color: '#090A0C' }}>$1</div>
                <div className={styles.metricTitle} style={{ color: '#4A5568' }}>$2</div>
                <p className={styles.metricDesc} style={{ color: '#718096' }}><strong style={{ color: '#2D3748' }}>O que representa:</strong> $3</p>`);

fs.writeFileSync(p, c);
console.log('Fixed Outcomes Background and Styling');
创新
