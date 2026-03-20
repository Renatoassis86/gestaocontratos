const fs = require('fs');

const url = "NEXT_PUBLIC_SUPABASE_URL=https://opicfwdrbzyqwgxhrnsv.supabase.co";
const key = "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waWNmd2RyYnp5cXdneGhybnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3Nzg5OTAsImV4cCI6MjA4OTM1NDk5MH0.dTOMlghaLd9saMjCjimg5vfpmW9tLqECKroMuP7fNSA";

const content = `${url}\n${key}\n`;

fs.writeFileSync('.env.local', content, 'utf-8');
fs.writeFileSync('.env', content, 'utf-8');

console.log("✅ Arquivos .env e .env.local re-escritos limpamente em UTF-8 sem BOM.");
