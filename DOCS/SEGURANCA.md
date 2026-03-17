# 🛡️ Diretrizes de Segurança e RLS (Row Level Security)

Este guia documenta o endurecimento de segurança por **Tenant** utilizando as políticas RLS do **Supabase/PostgreSQL**.

---

## 🔒 1. Princípios Básicos
- **Todas as Tabelas** devem ter o RLS **ATIVADO**.
- O acesso aos dados deve ser filtrado com base no `empresa_id`.
- Um usuário só visualiza linhas onde `empresa_id` conste na tabela `membros_empresa` para o `auth.uid()` dele.

---

## 📋 2. Políticas Recomendadas (SQL)

### 🏬 Tabela: `empresas`
> **Descrição**: Visualizar apenas se for membro.
```sql
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Membros visualizam própria empresa"
ON empresas FOR SELECT
USING (
  id IN (
    SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid()
  )
);
```

### 📄 Tabela: `contratos`
> **Descrição**: Visualizar apenas se pertencer ao mesmo tenant.
```sql
ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Membros visualizam contratos da empresa"
ON contratos FOR SELECT
USING (
  empresa_id IN (
    SELECT empresa_id FROM membros_empresa WHERE perfil_id = auth.uid()
  )
);

CREATE POLICY "Gestores criam contratos"
ON contratos FOR INSERT
WITH CHECK (
  empresa_id IN (
    SELECT empresa_id FROM membros_empresa 
    WHERE perfil_id = auth.uid() AND papel IN ('admin', 'gestor')
  )
);
```

---

## 🪪 3. LGPD e Ciclo de Vida dos Dados

### 🗑️ Soft Delete (Exclusão Lógica)
A plataforma utiliza a coluna `deleted_at` em `pessoas`, `empresas` e `contrato_partes`.
- **Por que?**: Evita deleção física (hard-delete) que quebraria integridade de assinaturas eletrônicas e governança jurídica.
- **Regra**: Todo `SELECT` no front-end deve filtrar `deleted_at IS NULL`.

### ⚖️ Minimização de Dados
A plataforma só retém as informações necessárias para qualificação de partes baseada em templates dinâmicos.
- Recomenda-se não salvar dados bancários ou senhas na base de dados (Pessoas). Use integradores se necessário.

---

## 🛡️ 4. Segurança de Webhooks (Práticas Recomendadas)

Embora o sistema já possua endpoints estruturados em `/api/webhooks/signature/[provedor]`, para produção é mandatório adicionar a **Validação de Token (Auth Gate)**:

1. **Assinatura de Cabeçalho (HMAC)**:
   - Provedores como **Clicksign** ou **ZapSign** enviam um hash `HMAC-SHA256` no header (ex: `X-Body-Signature`).
   - O Next.js deve recalcular o hash usando o `BODY` bruto da requisição e uma `WEBHOOK_SECRET_KEY` cadastrada no painel.
   - Rejeitar com `403 Forbidden` caso os hashes não combinem.

---

## 📁 5. Proteção de Arquivos (Storage)

Buckets de arquivos **NÃO** devem ser marcados como públicos (`public: false`).
- Para visualizar uma minuta, o Next.js deve gerar uma **URL assinada (Signed URL)** com expiração de tempo curta (ex: 5 minutos).
- Isso garante que o link não seja indexado por motores de busca e só possa ser visto por quem está logado.
```typescript
const { data } = await supabase.storage
  .from('contratos_arquivos')
  .createSignedUrl('caminho/do/contrato.html', 300) // 300 segundos
```
