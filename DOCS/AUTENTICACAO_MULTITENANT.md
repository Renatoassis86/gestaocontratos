# 🔐 Autenticação e Multi-Tenacidade (Multi-Tenant)

Esta documentação descreve o funcionamento do módulo de autenticação e controle de escopo multiempresa implementado na **Etapa 2**.

---

## 1. Fluxo de Autenticação
O sistema utiliza o **Supabase Auth** como provedor de identidade integrado via cookies seguros (`@supabase/ssr`).

### Componentes:
- **Middleware (`src/middleware.ts`)**: Inspeciona todas as requisições para `/dashboard`. Se o token não for válido ou expirar, redireciona automaticamente para `/login`.
- **Server Actions (`src/app/actions.ts`)**: Centraliza as chamadas de `.auth.signInWithPassword` e `.auth.signUp`.
- **Layout Seguro (`src/app/dashboard/layout.tsx`)**: Revalida no servidor o usuário ativo e monta o ambiente dinâmico com base nos dados reais do perfil logado.

---

## 2. Estrutura Multi-Tenant
Diferente de sistemas single-company, os contratos e entidades (como Pessoas) devem SEMPRE pertencer ao escopo de uma Empresa específica.

### Tabelas Envolvidas:
- `empresas`: O Tenant organizacional.
- `usuarios_empresas`: Junction table que vincula um perfil (`perfil_id`) a uma empresa (`empresa_id`) definindo sua `funcao` (Papel).

### Como funciona a Empresa Ativa?
Para evitar passar o `empresa_id` em todas as URLs e queries de formulário, o sistema usa uma estratégia híbrida:

1. **Cookie** de Empresa Ativa (`active_company_id`):
   - Quando o usuário faz login, o Dashboard Layout tenta ler este cookie.
   - Se não existir, ele seleciona a **primeira empresa** que o usuário tem acesso e carrega como default.
2. **Consultas no Servidor**:
   - Páginas que listam dados (como `Listar Pessoas`) extraem o `active_company_id` do Cookie para filtrar `.eq('empresa_id', activeCompanyId)`.
   - Isso garante o isolamento dos dados mesmo antes de habilitar RLS definitivo na base.

---

## 3. Autorização (Perfis e Funções Inicial)
A autorização nesta etapa é baseada na coluna `funcao` da tabela `usuarios_empresas`:

- **`dono`**: Acesso irrestrito a configurações da empresa, usuários e contratos. Criador da empresa é `dono` automaticamente.
- **`administrador`**: Gestão geral de dados operacionais (empresas e pessoas).
- **`membro`**: Visão e edição de dados sem privilégios administrativos.
- **`visualizador`**: Apenas leitura.

### Integração com RLS (Segurança de Banco)
Os Repositórios foram modelados para apoiar as consultas filtradas. No futuro, você poderá ativar o RLS no console do Supabase vinculando a policy ao `user_id` e `empresa_id` logado para evitar acessos diretos via API que burlariam as validações do código Next.js.
```sql
-- Exemplo de Policy futura para contratos
CREATE POLICY "usuários lêem contratos da sua empresa" 
ON contratos 
FOR SELECT 
USING (empresa_id IN (SELECT empresa_id FROM usuarios_empresas WHERE perfil_id = auth.uid()));
```
