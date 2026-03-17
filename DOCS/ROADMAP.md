# Roadmap Sugerido - Próximas Etapas

Esta é a fundação para a criação de um Contract Lifecycle Management (CLM) completo. Abaixo está a sugestão das próximas fases de desenvolvimento do projeto:

## Phase 1: Core Dashboard & Tenant Management (Próxima)
- [ ] **Autenticação e Registro**: Telas de Login, Cadastro, Recuperação de Senha via Supabase Auth.
- [ ] **Cadastro de Empresa (Tenant)**: Fluxo para cadastrar a Empresa (Razão Social, CNPJ).
- [ ] **Integração de Cadastro**: Listas de Usuários vinculados ao Tenant (Usuarios_Empresas).
- [ ] **Setup de Dashboard Base**: Layout com barra lateral, cabeçalho e indicadores Vazios para preenchimento posterior.

## Phase 2: Cadastros Base & Templates de Contrato
- [ ] **Pessoas (Partes)**: Tela de listagem e Cadastro de Clientes / Fornecedores / Autores.
- [ ] **Tipos de Contrato**: Gestão administrativa de tipos de contrato.
- [ ] **Templates (Modelos)**: Editor de texto rico para preenchimento de HTML com Placeholders (`{{tag}}`).
- [ ] **Campos Dinâmicos**: Definição de quais tags o template aceita.

## Phase 3: Criação de Contrato e Versionamento
- [ ] **Preenchimento de Contrato**: Escolha de template -> formulário gerado dinamicamente -> visualização prévia.
- [ ] **Save Draft**: Cadastro do cabeçalho do contrato e corpo preenchido.
- [ ] **Geração de PDF**: Integração de backend (Next.js API route) para renderizar HTML em PDF via Puppeteer/jsPDF e salvar no Supabase Storage.
- [ ] **Logs de Alterações**: Alimentação da tabela `eventos_contratos` e `versoes_contratos` para trilha de auditoria e versionamento.

## Phase 4: Assinaturas Digitais e Aditivos
- [ ] **Integração com Provedores**: Clicksign, ZapSign ou DocuSign via Webhooks e Endpoint Next.js para controle do Status do Envelope.
- [ ] **Fluxo de Devolutiva**: Quando assinado por todos, atualizar contrato para `Vigente`.
- [ ] **Aditivos (Amendments)**: Fluxo para apensar aditivos gerados a partir do contrato original.

---

## 🔒 Auditoria e Governança
- Ativação de **RLS (Row Level Security)** em produção para garantir que um inquilino (`empresa_id`) NUNCA acesse dados de outro.
- Configuração de backups e criptografias em repouso padrão do Supabase.
