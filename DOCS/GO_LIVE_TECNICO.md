# 🚀 Go-Live Técnico (Checklist Rápido)

Este roteiro documenta as etapas exatas para provisionar e ativar a infraestrutura da plataforma em um ambiente de **Nuvem/Produção** (ex: Supabase + Vercel).

---

## 🛠️ 1. Provisionando o Supabase (Banco)

Como você já possui um projeto criado (`opicfwdrbzyqwgxhrnsv`), o primeiro passo obrigatório é **disparar as tabelas**:

1. **Rodar Migrations Hidratação de Schema**:
   Copie e cole o conteúdo dos arquivos `/supabase/migrations/` em ordem cronológica no **SQL Editor** do Supabase:
   - `20260317000001_initial_schema.sql`
   - `20260317000003_add_contrato_fields.sql`
   - `20260317000004_add_signatarios.sql`
   - `20260317000005_add_aditivo_tenant.sql`
   - `20260317000006_add_alertas_lgpd.sql`

2. **Ativar RLS**:
   Por padrão, as tabelas subiram sem tranca. Rode o arquivo `/supabase/rls/politicas_piloto.sql` para isolar os Tenants por empresa com segurança redundante.

---

## 📁 2. Storage Buckets

A criação do bucket não ocorre por migration em alguns servidores.
1. Vá para o menu **Storage** do Supabase.
2. Crie um Bucket chamado: **`contratos_arquivos`**.
3. **Desmarque** o campo *"Make bucket public"*. Ele deve ser privado para exigir Signed URLs.

---

## ⚙️ 3. Variáveis de Ambiente (`.env`)

No seu servidor de hospedagem (Vercel, Netlify, DigitalOcean), configure as Envs:

| Variável | Descrição | Valor / Padrão |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint da sua instância | `https://opicfwdrbzyqwgxhrnsv.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave Anon | (Chave pública fornecida no painel) |
| `CRON_SECRET` | Senha para Varredura de Alertas | `<Defina uma senha forte>` |
| `NEXT_PUBLIC_APP_URL` | URL de Produção | `https://seu-dominio.com` |

---

## 🔗 4. Webhooks (Disparando Testes)

Certifique-se de cadastrar nos Provedores (Clicksign, ZapSign) a seguinte URL:
`https://seu-dominio.com/api/webhooks/signature/[provedor]`

- Para homologar se o webhook de escuta está vivo de madrugada, envie um payload simulação (cURL):
```bash
curl -X POST "https://seu-dominio.com/api/webhooks/signature/clicksign" \
  -H "Content-Type: application/json" \
  -d '{ "external_id": "teste-id", "event_type": "signed" }'
```

---

## 🚨 5. Alertas e Crons Automatizados

A varredura de vencimentos precisa de um gatilho.
1. Vá na **Vercel** -> **Settings** -> **Cron-Jobs**
2. Crie um Job apontando para: `/api/jobs/alertas`
3. Defina a periodicidade (ex: `0 3 * * *` - todos os dias às 3h).
4. Insira o segredo `CRON_SECRET` no cabeçalho de disparo `Authorization`.

---

## 🛡️ 6. Teste de Stress / Sanidade (Smoke Tests)

- [ ] Acesse `/api/health`. Relatório DEVE vir `UP`.
- [ ] Cadastre 1 Empresa e 1 Pessoa na interface.
- [ ] Crie 1 Contrato e verifique se ele visualiza o Preview no detalhe.
- [ ] Verifique se o download da minuta em HTML abre em nova aba normal.
- [ ] Se sim, o **Storage + Auth** estão operando e o piloto pode ser anunciado à equipe beta.
