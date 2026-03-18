import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import dotenv from 'dotenv'

// Carregar variáveis do .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'))

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase variables in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  const { data, error } = await supabase.auth.signUp({
    email: 'renato086@gmail.com',
    password: 'admin123',
    options: {
      data: {
         nome: 'Renato Administrador'
      }
    }
  })

  if (error) {
    console.error('Erro ao cadastrar:', error.message)
  } else {
    console.log('✅ Cadastro realizado com sucesso!', data.user?.id)
    console.log('Verifique se a confirmação por email está desativada no seu Supabase para logar instantaneamente.')
  }
}

run()
