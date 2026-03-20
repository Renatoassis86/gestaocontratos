const fs = require('fs');

try {
    const functions = JSON.parse(fs.readFileSync('moodle_functions_available.json', 'utf8'));
    console.log("=== SCAN PARA FUNÇÕES DE METADADOS / ESTRUTURA ===");
    
    functions.forEach(f => {
        const name = f.name.toLowerCase();
        if (name.includes('describe') || name.includes('schema') || name.includes('structure') || name.includes('definition') || name.includes('metadata') || name.includes('parameter') || name.includes('return')) {
            console.log(`- ${f.name}`);
        }
    });

} catch (e) {
    console.error("Erro:", e.message);
}
