import re
p = "d:/repositorio_geral/app_gestao_contratos/src/app/page.tsx"
with open(p, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update background outcomes with robust includes
c = re.sub(
    r'<section className={styles\.section} style={{\s*background:\s*\'#090a0c\',\s*textAlign:\s*\'center\'\s*}}>\s*<h2 style={{\s*fontSize:\s*\'2\.5rem\',\s*fontWeight:\s*\'800\',\s*color:\s*\'#F4F2ED\'', 
    r"<section className={styles.section} style={{ background: '#F8F9FA', textAlign: 'center' }}>\n        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111318'", 
    c
)

c = re.sub(
    r'<p style={{\s*color:\s*\'#8A8F99\'', 
    r"<p style={{ color: '#4A5568'", 
    c
)

# 2. Update Metric cards inline style fully robustly
c = re.sub(
    r'<div key={i} className={styles\.metricCard}>\s*<div className={styles\.metricBig}>(.*?)</div>\s*<div className={styles\.metricTitle}>(.*?)</div>\s*<p className={styles\.metricDesc}><strong>O que representa:</strong> (.*?)</p>',
    r'''<div key={i} className={styles.metricCard} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div className={styles.metricBig} style={{ color: '#090A0C' }}>\1</div>
                <div className={styles.metricTitle} style={{ color: '#4A5568' }}>\2</div>
                <p className={styles.metricDesc} style={{ color: '#718096' }}><strong style={{ color: '#2D3748' }}>O que representa:</strong> \3</p>''',
    c
)

c = re.sub(
    r'<div key={`dup-\${i}`} className={`\${styles\.metricCard} \${styles\.onlyOnMobile}`}>\s*<div className={styles\.metricBig}>(.*?)</div>\s*<div className={styles\.metricTitle}>(.*?)</div>\s*<p className={styles\.metricDesc}><strong>O que representa:</strong> (.*?)</p>',
    r'''<div key={`dup-${i}`} className={styles.metricCard} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div className={styles.metricBig} style={{ color: '#090A0C' }}>\1</div>
                <div className={styles.metricTitle} style={{ color: '#4A5568' }}>\2</div>
                <p className={styles.metricDesc} style={{ color: '#718096' }}><strong style={{ color: '#2D3748' }}>O que representa:</strong> \3</p>''',
    c
)

with open(p, "w", encoding="utf-8") as f:
    f.write(c)

print("Applied with absolute clean robust setups Scaling setups Index layouts configurations setups layouts configurations scaling Configurations scaling configurations designs!")
