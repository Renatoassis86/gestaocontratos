import { testMoodleConnection } from './src/app/actions.js';

async function main() {
  const courseId = "6";
  const res = await testMoodleConnection(courseId, 'historico');
  console.log(JSON.stringify(res.variables, null, 2));
}

main().catch(console.error);
