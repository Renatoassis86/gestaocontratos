# Gestão de Contratos SaaS (CLM)

## Visão Geral
Plataforma SaaS voltada para a gestão completa do ciclo de vida de contratos (Contract Lifecycle Management - CLM), do rascunho à auditoria e renovação.

## 🛠 Stack Tecnológico
- **Frontend/Backend**: Next.js 15+ (App Router, Server Components)
- **Database / Backend-as-a-Service**: Supabase
  - **Relational DB**: Postgres
  - **Auth**: Supabase Auth
  - **Storage**: Supabase Storage
- **Linguagem**: TypeScript
- **Estilização**: Vanilla CSS / CSS Modules (Sem TailwindCSS)

---

## 🏗 Arquitetura
O projeto adota uma **Arquitetura Limpa (Clean Architecture)** e Modular.

### Camadas:
1. **Domínio (`src/domain`)**:
   - Contém as Regras de Negócio Puras e Entidades (`entities/`)
   - Interfaces e Contratos de Repositórios (`repositories/`)
   - Isolada de qualquer framework ou dependência externa.

2. **Aplicação (`src/application`)**:
   - Contém os Casos de Uso (`use-cases/`) e Serviços do sistema.
   - Orquestra o fluxo de dados de e para o domínio.

3. **Infraestrutura (`src/infrastructure`)**:
   - Adaptadores externos e Gateways de comunicação.
   - Implementação dos Repositórios via Supabase (`repositories/`).
   - Configurações do SDK do Supabase (`supabase/client.ts`, `server.ts`).

4. **Interface / UI (`src/app` & `src/components`)**:
   - Telas do Next.js App Router.
   - Layouts e Componentes React puros usando CSS Modules.

---

## 🚀 Setup Inicial

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18 ou superior.
- Uma conta no [Supabase](https://supabase.com/).

### Passo a Passo

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar Variáveis de Ambiente**:
   Copie o arquivo `.env.example` para `.env.local` e preencha as credenciais do seu projeto Supabase:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://sua-url.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-anon-key"
   ```

3. **Executar Migrations de Banco de Dados**:
   - Vá para o Dashboard do seu projeto no Supabase.
   - Vá na aba **SQL Editor**.
   - Copie o conteúdo do arquivo localizado em `supabase/migrations/202x0x0x0000_initial_schema.sql`.
   - Execute o script para criar a estrutura de tabelas.

4. **Iniciar Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.
