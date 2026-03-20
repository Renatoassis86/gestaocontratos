'use client'

import React from 'react'
import { FileText, Database, Layers, RefreshCw } from 'lucide-react'

export default function ManualMoodlePage() {
  return (
    <div className="p-6 space-y-6 text-white" style={{ fontFamily: 'var(--sans)' }}>
      <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="text-brand-green w-6 h-6" /> Manual e Radiografia da API do Moodle
          </h1>
          <p className="text-zinc-400 text-sm">Diagnóstico definitivo dos dados estruturados, séries temporais e ETL do Moodle para suporte à decisão.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Painel 1: Dados Estruturados */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-bold text-brand-green flex items-center gap-2 border-b border-zinc-800/40 pb-2">
            <Database className="w-5 h-5" /> 1. Dados Estruturados (Disponíveis Agora)
          </h2>
          <p className="text-sm text-zinc-400">Estas variáveis são lidas em tempo real nas consultas aos cursos. Podem ir direto para o banco de dados Supabase.</p>
          
          <table className="w-full border-collapse text-left text-xs text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="p-2 font-semibold">Campo</th>
                <th className="p-2 font-semibold">Tipo</th>
                <th className="p-2 font-semibold">Fonte Moodle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-900/50">
                <td className="p-2 font-semibold text-white">fullname</td>
                <td className="p-2">String</td>
                <td className="p-2">Core (Tabela Users)</td>
              </tr>
              <tr className="border-b border-zinc-900/50">
                <td className="p-2 font-semibold text-white">email</td>
                <td className="p-2">String (Email)</td>
                <td className="p-2">Core (Tabela Users)</td>
              </tr>
              <tr className="border-b border-zinc-900/50">
                <td className="p-2 font-semibold text-white">cpf</td>
                <td className="p-2">String (Nacional)</td>
                <td className="p-2">CustomProfileField (EAD)</td>
              </tr>
              <tr className="border-b border-zinc-900/50">
                <td className="p-2 font-semibold text-white">semestre</td>
                <td className="p-2">String (Ex: 2024.1)</td>
                <td className="p-2">CustomProfileField (EAD)</td>
              </tr>
              <tr className="border-b border-zinc-900/50">
                <td className="p-2 font-semibold text-white">media_geral</td>
                <td className="p-2">Float (Nota)</td>
                <td className="p-2">Calculado do Gradebook</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Painel 2: Dados Não Estruturados e ETL */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-bold text-amber-500 flex items-center gap-2 border-b border-zinc-800/40 pb-2">
            <Layers className="w-5 h-5" /> 2. Processo de ETL e Não Estruturados
          </h2>
          <p className="text-sm text-zinc-400">Variáveis que exigem tratamento (Parsing) antes de análise preditiva. Principalmente notas abertas.</p>
          
          <div className="space-y-3">
            <div className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
              <span className="text-xs font-bold text-white block mb-1">Notas por Disciplinas (`notas_disciplinas`)</span>
              <p className="text-xs text-zinc-400">**Format**: `String` mista. (Ex: "A1: 8.5 | A2: 9.0")</p>
              <p className="text-xs text-amber-400 mt-1">**ETL Requerido**: Fazer split | e extrair valor numérico com regex para popular séries temporais por ciclo.</p>
            </div>

            <div className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
              <span className="text-xs font-bold text-white block mb-1">Diferenciação Professor vs Aluno</span>
              <p className="text-xs text-zinc-400">**Format**: Na lista de inscritos, cargos vêm agrupados.</p>
              <p className="text-xs text-amber-400 mt-1">**ETL Requerido**: Filtro via Back-end pela matriz de permissões (roleid ou shortname 'editingteacher').</p>
            </div>
          </div>
        </div>

        {/* Painel 3: Série Temporal e Decisão */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl space-y-4 md:col-span-2">
          <h2 className="text-lg font-bold text-sky-400 flex items-center gap-2 border-b border-zinc-800/40 pb-2">
            <RefreshCw className="w-5 h-5" /> 3. Período e Geração de Séries Temporais para Decisão
          </h2>
          <p className="text-sm text-zinc-400">Como converter esses dados em matrizes de inteligência de gestão acadêmica.</p>
          
          <ul className="list-disc list-inside text-xs text-zinc-300 space-y-2">
            <li><strong className="text-white">Janela de Tempo</strong>: O Moodle não restringe chamadas. O histórico cobre desde os primeiros semestres de lançamento da FICV, permitindo agrupar taxas de aprovação por bimestre.</li>
            <li><strong className="text-white">Indicadores de Evasão (Churn)</strong>: Cruzando dados de alunos "Em Curso" sem logs de notas (`media_geral: -`) por mais de 30 dias permite antever trancamento.</li>
            <li><strong className="text-white">Análise de Performance de Docentes</strong>: Ao isolar as notas das disciplinas via ETL e cruzar com o responsável do Curso, cria-se a correlação da média da disciplina x professor.</li>
          </ul>
        </div>

      </div>

      <div className="flex gap-4 mt-6">
        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl flex-1 text-center">
            <span className="text-sm text-zinc-200 block">Dossiê Completo Gerado em</span>
            <span className="text-xs font-bold text-brand-green">`/DOCS/RADIOGRAFIA_MOODLE.txt`</span>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl flex-1 text-center">
            <span className="text-sm text-zinc-200 block">Dossiê Científico em LaTeX</span>
            <span className="text-xs font-bold text-purple-400">`/DOCS/RADIOGRAFIA_MOODLE.tex`</span>
        </div>
      </div>
    </div>
  )
}
