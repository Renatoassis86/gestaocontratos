# 🧪 Roteiro de Homologação & Smoke Tests

Plano de testes operacionais para homologação técnica da plataforma antes do piloto controlado.

---

## 🚦 1. Verificações de Infraestrutura (Healthcheck)

Antes de testar o front-end, verifique os endpoints de backend:
| Endpoint | Ação | Resultado Esperado |
| :--- | :--- | :--- |
| `GET /api/health` | Bater com Postman/Navegador | Retornar `{ "status": "UP", "dependencies": { ... } }` |

---

## 🔑 2. Fluxo de Autenticação e Multi-Tenant

| Caso de Teste | Pré-requisito | Ação | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **Login Sucesso** | Conta cadastrada | Entrar com e-mail/senha | Redireciona para `/dashboard` |
| **Troca de Tenant** | Mais de 1 empresa | Mudar empresa no Header topo | Grids do dashboard carregam dados da empresa correta |
| **Rotas Autenticadas** | Deslogado | Tentar acessar `/dashboard/contratos` | Redireciona para `/login` |

---

## 📄 3. Geração de Contratos (CLM)

| Caso de Teste | Pré-requisito | Ação | Resultado Esperado |
| :--- | :--- | :--- | :--- |
| **Criação de Contrato** | Template e Partes cadastrados | Preencher placeholders na página `ContratoForm` | Redireciona para detalhe. Status do contrato = **GERADO** |
| **Geração de Arquivo** | Contrato gerado | Acordar minuto em tela | Link assinado recuperável via Storage Supabase |
| **Workflow Assinatura** | Status = GERADO | Clicar em `Preparar para Assinatura` | Ator entra na Fila. Status atualiza para `pronto_para_assinatura` |
| **Aditivos** | Contrato existente | Cadastrar aditivo no Detalhe | Log no evento contrato e grid lateral listando |

---

## ⏰ 4. Jobs e Backgroung (Alertas)

### Testar Varredura de Alertas (Cron)
Para simular o cron diário, execute o seguinte comando **cURL**:
```bash
curl -X GET "http://localhost:3000/api/jobs/alertas" \
  -H "Authorization: Bearer <SUA_CRON_SECRET>"
```
**Resultado Esperado**:
```json
{ "success": true, "message": "Varredura de Alertas Executada. X novos alertas gerados." }
```

---

## 🔗 5. Webhooks (Simulados)

### Testar Assinatura via Webhook
Para simular que a Clicksign notificou que um participante assinou:
```bash
curl -X POST "http://localhost:3000/api/webhooks/signature/clicksign" \
  -H "Content-Type: application/json" \
  -d '{ "external_id": "<ID_DO_SIGNATARIO>", "event_type": "signed" }'
```
**Resultado Esperado**:
```json
{ "success": true, "novoStatus": "assinado" }
```
*Vá ao dashboard e confira se o contrato subiu para `assinado` ou `parcialmente`.*

---

## 🛡️ 6. Homologando RLS (No Editor SQL Supabase)

Para conferir se o isolamento de dados está ativo antes de carregar dados de clientes reais, rode o SQL abaixo:
```sql
-- Forçar simulação de usuário anonimo logado no postgres
SET request.jwt.claim.sub = 'id-usuario-teste';

-- Tentar ler contratos
SELECT * FROM contratos;
-- DEVE RETORNAR APENAS linhas da empresa associada a este usuario.
```
