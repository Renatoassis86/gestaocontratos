async function audit() {
  const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"
  const payload_cat = new URLSearchParams({
    wstoken: "71edd081c7e0c5bb83f872b60af80227",
    moodlewsrestformat: 'json',
    wsfunction: 'core_course_get_categories'
  })
  const payload_courses = new URLSearchParams({
    wstoken: "71edd081c7e0c5bb83f872b60af80227",
    moodlewsrestformat: 'json',
    wsfunction: 'core_course_get_courses'
  })

  try {
    const respCat = await fetch(MOODLE_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload_cat.toString() })
    const categories = await respCat.json()

    const respCourses = await fetch(MOODLE_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload_courses.toString() })
    const courses = await respCourses.json()

    console.log("=== DIAGNÓSTICO DE ESTRUTURA MOODLE ===");
    console.log(`Total Categorias: ${categories.length}`);
    console.log(`Total Cursos: ${courses.length}`);

    // Encontrar Educação Cristã Clássica
    const targetCat = categories.find(c => c.name.toLowerCase().includes("educação cristã clássica"));
    if (!targetCat) {
      console.log("\n❌ Categoria 'Educação Cristã Clássica' não encontrada por nome literal!");
    } else {
      console.log(`\n✅ Categoria Alvo: [ID ${targetCat.id}] ${targetCat.name}`);
      console.log(`Pai da Categoria: ${targetCat.parent || "Nenhum (Raiz)"}`);

      // Subcategorias
      const subs = categories.filter(c => c.parent === targetCat.id);
      console.log(`Subcategorias Diretas (${subs.length}):`);
      subs.forEach(s => console.log(` - [ID ${s.id}] ${s.name}`));

      // Cursos na categoria pai
      const coursesInCat = courses.filter(c => c.category === targetCat.id);
      console.log(`Cursos DIREITOS na Categoria Pai: ${coursesInCat.length}`);

      // Cursos nas subcategorias
      let subCoursesCount = 0;
      subs.forEach(s => {
         const cnt = courses.filter(c => c.category === s.id).length;
         subCoursesCount += cnt;
         if (cnt > 0) console.log(`    -> Subcat [${s.id}] tem ${cnt} cursos.`);
      });
      console.log(`Total Cursos nas Subcategorias: ${subCoursesCount}`);
    }

  } catch (e) {
    console.error(e);
  }
}
audit()
