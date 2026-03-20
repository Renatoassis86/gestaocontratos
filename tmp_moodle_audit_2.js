async function audit2() {
  const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"
  const payload_cat = new URLSearchParams({ wstoken: "71edd081c7e0c5bb83f872b60af80227", moodlewsrestformat: 'json', wsfunction: 'core_course_get_categories' })
  const payload_courses = new URLSearchParams({ wstoken: "71edd081c7e0c5bb83f872b60af80227", moodlewsrestformat: 'json', wsfunction: 'core_course_get_courses' })

  const respCat = await fetch(MOODLE_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload_cat.toString() })
  const categories = await respCat.json()

  const respCourses = await fetch(MOODLE_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload_courses.toString() })
  const courses = await respCourses.json()

  console.log("=== DIAGNÓSTICO DE FILTRAGENS ===");
  const targetId = 28; // Educação Cristã Clássica
  const parentId = 23; 
  
  const parentCat = categories.find(c => c.id === parentId);
  console.log(`\nPai [ID 23]: ${parentCat ? parentCat.name : "Não Encontrado"}`);

  // Cursos que contenham "Educação Cristã" ou "Clássica"
  const matchCourses = courses.filter(c => c.fullname.toLowerCase().includes("cristã") || c.fullname.toLowerCase().includes("clássica"));
  console.log(`\nCursos com 'Cristã' ou 'Clássica' no nome (${matchCourses.length}):`);
  
  matchCourses.forEach(c => {
    const cat = categories.find(cat => cat.id === c.category);
    console.log(` - ${c.fullname} -> Categoria [ID ${c.category}] : ${cat ? cat.name : "Desconhecida"}`);
  });

  // Mostrar onde estão os 1535 cursos de forma agregada
  const catCount = {};
  courses.forEach(c => {
    catCount[c.category] = (catCount[c.category] || 0) + 1;
  });

  console.log("\nDistribução de Cursos por Categoria:");
  for (const catId in catCount) {
     const cat = categories.find(c => String(c.id) === String(catId));
     console.log(` - Categoria [ID ${catId}] ${cat ? cat.name : "???"} : ${catCount[catId]} cursos`);
  }
}
audit2()
