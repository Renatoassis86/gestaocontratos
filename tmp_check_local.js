const { getMoodleCourses } = require('./src/app/actions');

async function check() {
  try {
    const res = await getMoodleCourses()
    console.log("✅ getMoodleCourses() Response:", JSON.stringify(res, null, 2))
  } catch (err) {
    console.error("❌ getMoodleCourses() Exception:", err.message)
  }
}

check()
