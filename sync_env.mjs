import { spawn } from 'child_process';

const envVars = [
  { name: 'NEXT_PUBLIC_SUPABASE_URL', value: 'https://opicfwdrbzyqwgxhrnsv.supabase.co' },
  { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waWNmd2RyYnp5cXdneGhybnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3Nzg5OTAsImV4cCI6MjA4OTM1NDk5MH0.dTOMlghaLd9saMjCjimg5vfpmW9tLqECKroMuP7fNSA' }
];

async function sync() {
  for (const item of envVars) {
    console.log(`Adding ${item.name}...`);
    // npx vercel env add NAME VALUE
    const child = spawn('npx', ['vercel', 'env', 'add', item.name, 'production', item.value], {
      shell: true,
      stdio: ['pipe', 'inherit', 'inherit']
    });

    child.stdin.write('N\n');
    child.stdin.end();

    await new Promise(resolve => child.on('exit', resolve));
  }
}

sync();
