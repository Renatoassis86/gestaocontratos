'use server'

import { createClient } from '@/infrastructure/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) throw new Error('Email e Senha são obrigatórios')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  const cookieStore = await cookies()
  cookieStore.delete('active_company_id') // Clear active tenant

  redirect('/login')
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password || !name) throw new Error('Todos os campos são obrigatórios')

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nome: name } // Meta-data mapped to perfil name inside webhook or manual insert
    }
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // Criar Perfil manualmente se RPC triggers não estiverem ativos no Supabase
  if (data.user) {
    await supabase.from('perfis').insert({
      id: data.user.id,
      nome: name,
    })
  }

  redirect('/dashboard')
}

export async function selectCompany(companyId: string) {
  const cookieStore = await cookies()
  cookieStore.set('active_company_id', companyId, { secure: true, httpOnly: true })
}

import { ContratoGenerator } from '@/application/use-cases/ContratoGenerator'
import { SupabaseContratoRepository } from '@/infrastructure/repositories/SupabaseContratoRepository'
import { getValidatedCompanyId } from '@/application/services/TenantService'

export async function salvarContrato(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const activeCompanyId = await getValidatedCompanyId()
  if (!activeCompanyId) throw new Error('Empresa ativa não selecionada.')

  const templateId = formData.get('template_id') as string;
  const tituloContrato = formData.get('titulo_contrato') as string;

  if (!templateId || !tituloContrato) {
    throw new Error('Template e Título são obrigatórios.')
  }

  // 1. Obter template para extrair o corpo mestre
  const { data: template } = await supabase
    .from('templates_contrato')
    .select('*')
    .eq('id', templateId)
    .single()

  if (!template) throw new Error('Template não encontrado.')

  // 2. Extrair dados dinâmicos do formData (campos começando com tag_)
  const dadosPreenchidos: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('tag_')) {
      const tagKey = key.replace('tag_', '')
      dadosPreenchidos[tagKey] = value as string
    }
  }

  // 3. Renderizar Contrato
  const corpoRenderizado = ContratoGenerator.renderizar(template.corpo_template, dadosPreenchidos)

  // 4. Salvar usando o Repositório
  const repo = new SupabaseContratoRepository()
  const contratoCriado = await repo.create({
    empresaId: activeCompanyId,
    tipoContratoId: template.tipo_contrato_id,
    templateId: templateId,
    titulo: tituloContrato,
    corpoAtual: corpoRenderizado,
    dadosPreenchimento: dadosPreenchidos, // JSONB
    status: 'gerado',
    renovacaoAutomatica: false,
    createdBy: user.id
  })

  // 4.1 SIMULAR GERAÇÃO DE ARQUIVO (SALVAR NO STORAGE como HTML)
  try {
    const bucketName = 'contratos_arquivos'
    const filePath = `${activeCompanyId}/${contratoCriado.id}/minuta.html`

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, Buffer.from(corpoRenderizado), {
        contentType: 'text/html',
        upsert: true
      })

    if (!uploadError) {
      await repo.saveArquivo({
        contrato_id: contratoCriado.id,
        nome_arquivo: 'minuta.html',
        snippet_path: filePath,
        tamanho_bytes: Buffer.byteLength(corpoRenderizado),
        mime_type: 'text/html',
        bucket: bucketName,
        criado_por: user.id
      })
    }
  } catch (err) {
    console.error('Erro ao salvar no storage:', err)
  }

  // 5. Auditar evento
  await supabase
    .from('eventos_contrato')
    .insert({
      contrato_id: contratoCriado.id,
      actor_id: user.id,
      tipo_evento: 'criacao',
      descricao: `Contrato '${tituloContrato}' gerado a partir do template '${template.titulo}' e salvo no storage.`,
      metadata_snapshot: { dadosPreenchidos }
    })


  // 6. Redirecionar para o detalhe do contrato gerado
  redirect(`/dashboard/contratos/${contratoCriado.id}`)
}

import { AssinaturaWorkflow } from '@/application/use-cases/AssinaturaWorkflow'

export async function prepararAssinatura(formData: FormData) {
  const contratoId = formData.get('contrato_id') as string

  if (!contratoId) throw new Error('Contrato ID é obrigatório.')

  const workflow = new AssinaturaWorkflow()
  await workflow.prepararSignatarios(contratoId)

  redirect(`/dashboard/contratos/${contratoId}?prepared=true`)
}

export async function enviarAAssinatura(formData: FormData) {
  const contratoId = formData.get('contrato_id') as string

  if (!contratoId) throw new Error('Contrato ID é obrigatório.')

  const workflow = new AssinaturaWorkflow()
  await workflow.enviarParaAssinatura(contratoId)

  redirect(`/dashboard/contratos/${contratoId}?sent=true`)
}

export async function criarRevisao(formData: FormData) {
  const supabase = await createClient()
  const contratoId = formData.get('contrato_id') as string;
  const corpoTexto = formData.get('corpo_texto') as string;
  const notaAlteracao = formData.get('nota_alteracao') as string;

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !contratoId || !corpoTexto) throw new Error('Dados inválidos.')

  const { data: ultima } = await supabase
    .from('versoes_contrato')
    .select('numero_versao')
    .eq('contrato_id', contratoId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const proximaVersao = ultima ? (parseFloat(ultima.numero_versao) + 0.1).toFixed(1) : '1.1'

  await supabase.from('versoes_contrato').insert({
    contrato_id: contratoId,
    corpo_texto: corpoTexto,
    numero_versao: proximaVersao,
    nota_alteracao: notaAlteracao,
    tipo_versao: 'revisao_interna',
    created_by: user.id
  })

  await supabase
    .from('contratos')
    .update({ corpo_atual: corpoTexto, status: 'em_revisao' })
    .eq('id', contratoId)

  redirect(`/dashboard/contratos/${contratoId}?rev=true`)
}

export async function criarAditivo(formData: FormData) {
  const supabase = await createClient()
  const contratoPaiId = formData.get('contrato_pai_id') as string;
  const titulo = formData.get('titulo') as string;
  const descricaoAlt = formData.get('descricao_alteracoes') as string;

  const { data: { user } } = await supabase.auth.getUser()
  const activeCompanyId = await getValidatedCompanyId()

  if (!user || !contratoPaiId || !titulo) throw new Error('Dados inválidos.')

  await supabase.from('aditivos_contrato').insert({
    contrato_pai_id: contratoPaiId,
    titulo: titulo,
    descricao_alteracoes: descricaoAlt,
    empresa_id: activeCompanyId,
    created_by: user.id
  })

  await supabase.from('eventos_contrato').insert({
    contrato_id: contratoPaiId,
    tipo_evento: 'criacao_aditivo',
    descricao: `Aditivo '${titulo}' criado vinculado ao contrato original.`
  })

  redirect(`/dashboard/contratos/${contratoPaiId}?aditivo=true`)
}

export async function criarObrigacao(formData: FormData) {
  const supabase = await createClient()
  const contratoId = formData.get('contrato_id') as string;
  const titulo = formData.get('titulo') as string;
  const dataPrevista = formData.get('data_prevista') as string;
  const prioridade = formData.get('prioridade') as string;

  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !contratoId || !titulo) throw new Error('Dados inválidos.')

  await supabase.from('obrigacoes_contrato').insert({
    contrato_id: contratoId,
    titulo: titulo,
    data_consolidado: dataPrevista ? new Date(dataPrevista) : null,
    prioridade: prioridade || 'media',
    status: 'pendente',
    created_by: user.id
  })

  redirect(`/dashboard/contratos/${contratoId}?obrigacao=true`)
}



