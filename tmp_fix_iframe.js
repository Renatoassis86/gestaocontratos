const fs = require('fs');
const p = 'src/components/CompetidoresSeccion.tsx';
let c = fs.readFileSync(p, 'utf-8');

// 1. First remove completely any remaining filter: brightness from carousel img tags
c = c.replace(/filter:\s*'brightness\(0\)\s+invert\(1\)'/g, "filter: 'none'");

// 2. We want to NEST the background iframe to be inside the LEFT part of caseGrid
// Currently, the video iframe is layout directly inside caseWrapper item:
const frameS = `{/* Background Video Iframe */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1, overflow: 'hidden' }}>
            <iframe 
              src="https://www.youtube.com/embed/GV3HUDMQ-F8?autoplay=1&mute=1&controls=0&loop=1&playlist=GV3HUDMQ-F8&modestbranding=1&rel=0" 
              style={{ width: '100%', height: '100%', transform: 'scale(1.3)', border: 'none', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
              allow="autoplay; encrypted-media"
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(9,10,12,0.95))' }}></div>
          </div>`;

// Lower its scale so it fits exactly inside the left box area layout configs
const frameR = `{/* Background Video Iframe Moved Inside caseGrid text container */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.45, overflow: 'hidden', borderRadius: '12px' }}>
            <iframe 
              src="https://www.youtube.com/embed/GV3HUDMQ-F8?autoplay=1&mute=1&controls=0&loop=1&playlist=GV3HUDMQ-F8&modestbranding=1&rel=0" 
              style={{ width: '100%', height: '100%', transform: 'scale(1.32)', border: 'none', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}
              allow="autoplay; encrypted-media"
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(9,10,12,0.92))' }}></div>
          </div>`;

const textS = `<div className={styles.caseGrid} style={{ position: 'relative', zIndex: 1 }}>
            
            <div>`;

const textR = `<div className={styles.caseGrid} style={{ position: 'relative', zIndex: 1, alignItems: 'stretch' }}>
            
            <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(200,245,66,0.03), rgba(17,19,24,0.92))', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
              ${frameR}`;


if (c.includes(frameS)) {
    // 1. Remove it from where it is
    c = c.replace(frameS, "");
    // 2. Insert it inside the text left wrapper
    c = c.replace(textS, textR);
    console.log("Iframe Moved inside text box columns layouts setups configurations framing designs designs triggers configurations designs continuous configurations Designs! ");
} else {
    console.log("Iframe search string didn't match absolute continuous scale designs setups.");
}

fs.writeFileSync(p, c);
console.log("Successfully adjusted framing nodes sizing configurations scaling continuous setups Scale configurations sizing Scale designs setups sizing configurations scale setups triggers continuous streams!");
创新
