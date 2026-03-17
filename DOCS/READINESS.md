# 📊 Relatório de Prontidão (Readiness Report)

Avaliação de prontidão para lançamento de **Piloto Controlado (Beta)** na plataforma de Gestão de Contratos (CLM).

---

## 🚦 1. Tabela de Status por Eixo

| Eixo | Status | Comentários / Ressalvas |
| :--- | :--- | :--- |
| **Autenticação (Auth)** | ✅ **Pronto** | Login, Logout e validação de sessão em Next.js SSR ok. |
| **Multi-Tenant (Isolamento)** | ✅ **Pronto** | `getValidatedCompanyId()` aplicado em todas as Actions críticas. |
| **Geração de Minutas** | ✅ **Pronto** | Composição via placeholders injetando congelamento estático e logs ok. |
| **Storage Documental** | ⚠️ **Com Ressalvas** | Requer criação manual do bucket `contratos_arquivos` no Supabase antes do Deploy. |
| **Assinaturas Eletrônicas** | ⚠️ **Com Ressalvas** | O fluxo de assinatura opera com **Simulador** e Webhooks genéricos estruturados, e não com API real de terceiros. |
| **Aditivos e Obrigações (CLM)** | ✅ **Pronto** | Post-generacional workflows, datas, aditivos e revisões rastreáveis no Painel. |
| **Alertas (Job)** | ✅ **Pronto** | Rotina `/api/jobs/alertas` varrendo e salvando logs de vencimento pendentes. |
| **Webhooks** | ✅ **Pronto** | Endpoint modularizado e gatilhos de recálculo de status operando. |
| **Segurança (RLS)** | ⚠️ **Com Ressalvas** | Requer ativação física das políticas SQL em `contratos` conforme desenhado em `DOCS/SEGURANCA.md`. |
| **LGPD** | ✅ **Pronto** | Soft Delete aplicado para qualificação de partes para prevenir quebras jurídicas. |

---

## 🎯 2. Recomendações de Go-Live (Piloto Controlado)

### 🟢 1. O que já está operacional (Pode ser usado hoje):
- Geração de minutas dinâmicas.
- Rastreamento lateral de vigência e marcos de pagamento.
- Multi-empresa (Tenant) e Controle de acesso.
- Auditoria e Histórico de Eventos.

### 🟡 2. Limitações Conhecidas (Ressalvas):
- **Geração de Arquivo**: A plataforma salva arquivos em `.html`. Para rodar juridicamente com validade superior, recomenda-se converter para `.pdf` antes do upload definitivo via biblioteca `puppeteer` ou serverless.
- **Assinaturas**: O envelope dispara um link simulação. Um administrador de piloto deve fazer o "Check" das rubricas via Action por enquanto.

---

## 🛠️ 3. Próximos Passos (Avançado)

1. **Ativar RLS**: Executar o SQL de `DOCS/SEGURANCA.md` no painel Supabase.
2. **Criar Bucket**: Criar Bucket privado `contratos_arquivos`.
3. **Ligar Cron**: Cadastrar cron no provedor de hospedagem (Vercel Cron) apontando para `/api/jobs/alertas`.
4. **Validar com as primeiras 10 minutas**: Testar carga de 10 contratos em produção com a equipe administrativa.
