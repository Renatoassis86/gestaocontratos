const fs = require('fs');

try {
    const functions = JSON.parse(fs.readFileSync('moodle_functions_available.json', 'utf8'));
    const categories = {};

    functions.forEach(f => {
        // Extrair prefixo (ex: core_user, mod_assign, etc.)
        const parts = f.name.split('_');
        let category = parts.slice(0, 2).join('_'); // core_user, mod_assign
        if (parts[0] === 'mod') {
             category = `module_${parts[1]}`; // module_assign, module_quiz
        } else if (parts[0] === 'gradereport') {
             category = `grades_report`;
        } else if (parts[0] === 'core' && parts[1] === 'grades') {
             category = `grades_core`;
        }
        
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(f.name);
    });

    console.log("=== CATEGORIAS DE FUNÇÕES ENCONTRADAS ===");
    for (const [cat, funcs] of Object.entries(categories)) {
        console.log(`\nCategory: ${cat} (${funcs.length} funções)`);
        // Imprimir as primeiras 5 funções de cada categoria para ter uma ideia
        funcs.slice(0, 5).forEach(f => console.log(`  - ${f}`));
        if (funcs.length > 5) console.log(`  - ... e mais ${funcs.length - 5}`);
    }

} catch (e) {
    console.error("Erro ao ler ou processar o JSON:", e.message);
}
