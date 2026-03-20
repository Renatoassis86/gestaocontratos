const MOODLE_TOKEN = "71edd081c7e0c5bb83f872b60af80227"
const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"

async function moodleRequest(wsfunction, params = {}) {
  const payload = new URLSearchParams({
    ...params,
    wstoken: MOODLE_TOKEN,
    moodlewsrestformat: 'json',
    wsfunction: wsfunction
  })

  const resp = await fetch(MOODLE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload.toString()
  })
  return await resp.json()
}

async function run() {
  const courses = await moodleRequest('core_course_get_courses')
  console.log("Courses type:", typeof courses, Array.isArray(courses) ? "Array" : "Object")
  
  if (courses.exception) {
    console.error("Moodle Exception:", courses.message)
    return
  }

  // Se for array, vamos iterar. Se for objeto, vamos ver as chaves.
  const coursesList = Array.isArray(courses) ? courses : (courses.courses || [])
  console.log("Total courses length:", coursesList.length)
  
  const filter = coursesList.find(c => c.fullname.includes('Metodologia') && c.fullname.includes('2021'))
  if (filter) {
    console.log(`Found: ${filter.fullname} (ID: ${filter.id})`)
    const users = await moodleRequest('core_enrol_get_enrolled_users', { courseid: String(filter.id) })
    console.log("Enrolled users response:", Array.isArray(users) ? users.length : users.message)
  } else {
    console.log("Course not found in list")
  }
}

run()
