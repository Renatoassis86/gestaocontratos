async function test() {
  const MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"
  const payload = new URLSearchParams({
    wstoken: "71edd081c7e0c5bb83f872b60af80227",
    moodlewsrestformat: 'json',
    wsfunction: 'core_course_get_courses'
  })

  try {
    const resp = await fetch(MOODLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    })
    const data = await resp.json()
    console.log("Success:", Array.isArray(data) ? data.length : data)
  } catch (e) {
    console.error("Fetch Error:", e.message)
  }
}
test()
