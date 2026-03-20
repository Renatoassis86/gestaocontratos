async function audit3() {
  const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"
  const payload_courses = new URLSearchParams({ wstoken: "71edd081c7e0c5bb83f872b60af80227", moodlewsrestformat: 'json', wsfunction: 'core_course_get_courses' })

  const respCourses = await fetch(MOODLE_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload_courses.toString() })
  const courses = await respCourses.json()

  if (courses.length > 0) {
    console.log("=== EXEMPLO DE CURSO ===");
    console.log(JSON.stringify(courses[0], null, 2));
    console.log("\nCampos Disponíveis:", Object.keys(courses[0]));
  } else {
    console.log("Nenhum curso encontrado.");
  }
}
audit3()
