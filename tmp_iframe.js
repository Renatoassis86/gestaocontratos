import fs from 'fs';
const p = 'src/components/CompetidoresSeccion.tsx';
let c = fs.readFileSync(p, 'utf-8');

const t1 = `<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1, overflow: 'hidden' }}>`;
const idx = c.indexOf(t1);

if (idx !== -1) {
    const endIdx = c.indexOf('</div>', c.indexOf('</iframe>') + 10) + 6;
    const frameContent = c.substring(idx, endIdx);

    const newFrame = `<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.4, overflow: 'hidden', borderRadius: '16px' }}>
            <iframe 
              src="https://www.youtube.com/embed/GV3HUDMQ-F8?autoplay=1&mute=1&controls=0&loop=1&playlist=GV3HUDMQ-F8&modestbranding=1&rel=0" 
              style={{ width: '100%', height: '100%', transform: 'scale(1.35)', border: 'none', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
              allow="autoplay; encrypted-media"
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(17,19,24,0.95))' }}></div>
          </div>`;

    let c2 = c.replace(frameContent, '');
    
    const gridS = `<div className={styles.caseGrid} style={{ position: 'relative', zIndex: 1 }}>\n            \n            <div>`;
    
    const gridR = `<div className={styles.caseGrid} style={{ position: 'relative', zIndex: 1 }}>
            
            <div style={{ position: 'relative', overflow: 'hidden', padding: '32px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(200,245,66,0.03), rgba(17,19,24,0.92))', border: '1px solid rgba(255,255,255,0.03)' }}>
              ${newFrame}`;

    c2 = c2.replace(gridS, gridR);
    
    c2 = c2.replace(/(\s*)<div className=\{styles\.caseStats\}/, (match, g1) => {
        return `\n              </div>${g1}<div className={styles.caseStats}`;
    });

    fs.writeFileSync(p, c2);
    console.log('Restructured');
} else {
    console.log('Iframe div not found');
}
创新
