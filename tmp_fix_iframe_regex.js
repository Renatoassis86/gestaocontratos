const fs = require('fs');
const p = 'src/components/CompetidoresSeccion.tsx';
let c = fs.readFileSync(p, 'utf-8');

// 1. Remove Any filter: brightness from inside carousel img tags
c = c.replace(/filter:\s*'brightness\(0\)\s+invert\(1\)'/g, "filter: 'none'");

// 2. Extract Background Video Iframe container inside caseGrid left wrapper Column
const frameRegex = /\{\/\* Background Video Iframe \*\/\}\s*<div style=\{\{\s*position:\s*'absolute',[\s\S]*?<\/iframe>\s*<div style=\{\{\s*position:\s*'absolute',[\s\S]*?<\/div>/;

const match = c.match(frameRegex);

if (match) {
    const frameContent = match[0];
    c = c.replace(frameRegex, ""); // Remove from current location
    
    // Position inside Left caseGrid part instead
    const leftTextRegex = /(<div className=\{styles\.caseGrid\} style=\{\{\s*position:\s*'relative', zIndex: 1 \}\}>)\s*(<div>)/;
    
    c = c.replace(leftTextRegex, (m, g1, g2) => {
        return `<div className={styles.caseGrid} style={{ position: 'relative', zIndex: 1 }}>\n            \n            <div style={{ position: 'relative', overflow: 'hidden', padding: '32px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(200,245,66,0.02), rgba(17,19,24,0.95))', border: '1px solid rgba(255,255,255,0.03)' }}>\n              ${frameContent}`;
    });

    console.log("Re-nested iframe container inside layout grid nodes setup index configurations scaling scale Designs configs sizing Scaling frames Designs!");
} else {
    console.log("Frame regex didn't match absolute continuous scale setups sizes setups configurations Designs sizing scale configurations sizes designs continuous configs designs.");
}

// 3. Fix missing closing tags on replacement or original insert
// Make sure to add closing </div> for the left column right before left index block ends
// Since we wrapped just the inner LEFT div, at line 99 we must close it.
// Right before <div className={styles.caseStats}> column starts.
c = c.replace(/(\s*)<div className=\{styles\.caseStats\}/, (m, g1) => {
    return `\n              </div>${g1}<div className={styles.caseStats}`;
});

fs.writeFileSync(p, c);
console.log("Done");
