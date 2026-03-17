# 🚀 Checklist de Deploy & Produção

Este documento detalha os passos necessários para configurar o ambiente do Supabase e o Next.js para rodar em **Produção/Piloto Controlado**.

---

## 📅 1. Configuração do Supabase (Banco e Auth)

1. **Rodar Migrations**:
   Disparar todas as migrations (`/supabase/migrations/`) na ordem correta para garantir que tabelas como `alertas_contrato`, `aditivos_contrato`, e `contrato_signatarios` estejam lá.
   
2. **Ativar Row Level Security (RLS)**:
   *Por padrão, o RLS deve ser ativado em TODAS as tabelas críticas.*
   *(Veja o arquivo `DOCS/RLS_RECOMENDADO.md` para as políticas sugeridas).*

3. **Criação de Usuários e Organizações**:
   O primeiro usuário a se cadastrar deve ser vinculado a uma `empresa_id` em `membros_empresa` com papel `admin`.

---

## 📁 2. Configurações de Storage (Buckets)

A plataforma utiliza o Supabase Storage para salvar os arquivos de contrato.
1. Criar o bucket com nome: **`contratos_arquivos`**.
2. Definir as permissões do bucket:
   - **Ler**: Permitido apenas para usuários autenticados da mesma `empresa_id`.
   - **Escrever**: Permitido apenas para administradores/gestores autenticados.

---

## ⚙️ 3. Variáveis de Ambiente (`.env`)

Configure as seguintes Envs no seu servidor Node/Vercel:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint da sua instância Supabase | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave Anon do Projeto | `eyJhbGciOiJIUzI1...` |
| `NEXT_PUBLIC_APP_URL` | URL de Produção do Software | `https://contratos.suaempresa.com` |
| `CRON_SECRET` | Chave de segurança para rodar os Jobs | `secret_super_seguro_shhh` |

---

## ⏰ 4. Configuração de Schedulers (Cron-Jobs)

O sistema de **Alertas** roda via API Endpoint manual ou automática:
- **Endpoint**: `GET /api/jobs/alertas`
- **Autenticação**: Requer cabeçalho `Authorization: Bearer <CRON_SECRET>`

### 🛠️ Configuração na Vercel (`vercel.json`):
```json
{
  "crons": [
    {
      "path": "/api/jobs/alertas",
      "schedule": "0 2 * * *" 
    }
  ]
}
```
*Disparar uma vez ao dia (ex: 2h da manhã) é o recomendado.*

---

## 🔗 5. Subindo Webhooks Reais

Para ligar um provedor real (ex: Clicksign/ZapSign):
1. Cadastre a URL de Webhook no painel do provedor:
   `https://contratos.suaempresa.com/api/webhooks/signature/[provedor]`
2. Valide nos endpoints de Webhook o **Secret** retornado pelo cabeçalho do provedor, para evitar payloads forjados (Veja `DOCS/SEGURANCA.md`).

---

## 🛡️ 6. Checklist de Go-Live (Dia do Lançamento)

- [ ] Variáveis de ambiente checadas e trancadas.
- [ ] Bucket `contratos_arquivos` criado no Supabase.
- [ ] RLS aplicado para `contratos` e `membros_empresa`.
- [ ] Teste de login e alternância de empresas OK.
- [ ] Simulação de geração de contrato gerando arquivo HTML OK.
- [ ] Simulação de disparo de Workflow OK.
- [ ] Varredura de Alertas disparada via painel API com `CRON_SECRET` OK.
