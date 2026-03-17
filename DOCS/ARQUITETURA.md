# 🏛️ Arquitetura do Sistema - Gestão de Contratos

## 1. Visão Geral
A plataforma foi construída utilizando os princípios da **Clean Architecture** e **SaaS Multi-Tenant**, garantindo isolamento de dados, escalabilidade e manutenibilidade.

### 🛠️ Tech Stack:
- **Framework**: Next.js 15+ (App Router, Server Actions, API Routes)
- **Backend / DB**: Supabase (PostgreSQL, Auth, Storage)
- **Estilização**: CSS Variables / Vanilla / Módulos Isolados
- **Icons**: Lucide React

---

## 2. Camadas do Sistema (`/src`)

### 📂 `domain` (Núcleo)
Contém as entidades de negócio e interfaces que não dependem de frameworks externos.
- **Entidades**: `TipoContrato`, `TemplateContrato`, `CampoTemplate`.
- **Interfaces**: Definições de entidades que flutuam no sistema.

### 📂 `application` (Casos de Uso)
Regras de aplicação que orquestram a lógica do negócio.
- **Serviços**: `TenantService` (Isolamento de Inquilino).
- **Casos de Uso**:
  - `ContratoGenerator`: Converte templates e placeholders em minutas.
  - `AssinaturaWorkflow`: Prepara filas de signatários e dispara envios.
  - `JobAlertas`: Varre deadlines e insere registros em `alertas_contrato`.

### 📂 `infrastructure` (Adaptadores de Externa)
Onde vivem os acoplamentos com o mundo exterior.
- **Supabase**: wrappers `client.ts` e `server.ts` para Cookies/SSR.
- **Serviços**: `SimuladoSignatureProvider` (Abstração de APIs de assinaturas).

### 📂 `app` (Entrega)
Páginas, API endpoints e Server Actions que o usuário consome.

---

## 3. Estrutura de Multi-Tenant
O isolamento de dados é garantido pela coluna `empresa_id` em praticamente todas as tabelas (Contratos, Pessoa, Aditivos, Alertas).
- Toda requisição no painel valida o `active_company_id` do usuário logado via `getValidatedCompanyId()`.
- Prepara a base para o uso de **RLS (Row Level Security)** do Supabase, que adiciona uma camada de segurança direto no Banco de Dados.

---

## 4. Ciclo de Vida do Contrato (CLM)
O motor operacional segue a esteira:
1. **Rascunho**: Criação de dados cadastrais.
2. **Gerado**: Preenchimento de minuta automática via Template/Placeholder.
3. **Pronto para Assinatura**: Fila de Signatários estruturada.
4. **Em Assinatura**: Disparado para interface (Simulada ou API Externa).
5. **Vigente**: Conclusão da coleta com data_inicio/data_fim travados.
6. **Finalizado**: Arquivamento pós-auditoria.
