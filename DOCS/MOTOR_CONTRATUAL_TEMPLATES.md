# 📑 Motor Contratual (Templates e Geração)

Esta documentação descreve o funcionamento do módulo de **Tipos de Contrato, Templates e Placeholders** concebido na **Etapa 3**.

---

## 1. Convenção de Placeholders (Tags)
Os templates salvam o conteúdo_base com tags dinâmicas que serão substituídas no momento da geração do contrato final.

### Regra de Sintaxe:
- **Formato**: `{{nome_do_campo}}`
- **Exemplo**:
  > "Este contrato regula a prestação de serviços entre **{{contratante_nome}}**, portador do CNPJ **{{contratante_cnpj}}**, e o prestador **{{contratado_nome}}**."

---

## 2. Tipos de Dados Suportados (Campos)
Cada template pode se vincular a N campos (Tabela `campos_template`), que mapeiam e descrevem os placeholders:

| TipoDado  | Sintaxe Visual | Descrição |
| :--- | :--- | :--- |
| `texto` | `{{tag}}` | Input simples de texto curto ou longo |
| `data` | `{{tag}}` | Inputs de Calendários |
| `numero` | `{{tag}}` | Validar apenas dígitos inteiros/fluat |
| `monetario` | `{{tag}}` | Formatação de Moeda (Ex: `R$ 10.000,00`) |
| `booleano` | `{{tag}}` | Sim / Não |

---

## 3. Fluxo de Geração de Contrato
Para gerar o Contrato final, o motor de substituição utiliza o Use Case estático `ContratoGenerator`:

1. **Recupera o Template**: `TemplateContrato` e os `CamposTemplate` associados.
2. **Preenchimento de Inputs**: Dashboard renderiza formulário dinâmico com base nos campos (Lables e Types).
3. **Substituição**: O `ContratoGenerator.renderizar(corpo, dados)` executa um `.replace(/\{\{...\}\}/g)` para trocar as tags pelo valor digitado.
4. **Persistência**: O resultado vira uma linha na tabela `contratos` (`corpo_atual`), congelando o texto final contra alterações futuras no Template.

---

## 🔒 Segurança de Inquilinos (Multi-Tenant Atualizado)
Para assegurar que nenhum usuário manipule o `active_company_id` nos cookies para visualizar templates e tipos de outras empresas, o sistema foi centralizado em:
- **`TenantService.ts`**: Que faz o `getUser` e `usuarios_empresas` no servidor antes de aplicar filtros, garantindo **segurança de leitura 100% à prova de alteração de cookies**.
```typescript
import { getValidatedCompanyId } from '@/application/services/TenantService'

const activeCompanyId = await getValidatedCompanyId();
// Se nulo ou inválido, redirecionar ou barrar
```
  
