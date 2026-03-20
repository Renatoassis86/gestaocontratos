import { createClient } from './src/infrastructure/supabase/client.js'

async function main() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dados_moodle_cursos')
    .insert([
      {
        curso: 'Teste Geral',
        disciplina: 'Teoria da Conexão',
        professor: 'Dr. Teste',
        titulacao_professor: 'Doutor',
        carga_horaria: '40h',
        creditos: 2,
        nota: 9.5
      }
    ])
    .select()

  if (error) {
    console.error("Erro ao inserir:", error)
  } else {
    console.log("Inserção concluída com sucesso:", data)
    
    // Deletar após o teste
    await supabase.from('dados_moodle_cursos').delete().eq('id', data[0].id)
    console.log("Linha de teste removida.")
  }
}

main().catch(console.error);
