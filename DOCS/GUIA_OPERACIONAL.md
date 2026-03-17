# 📖 Guia Operacional do Usuário (Administrativos / Jurídicos)

Guia de apoio para os operadores diários da plataforma de Gestão de Contratos (CLM).

---

## 🏗️ 1. O Fluxo de Vida Principal (Dashboard)

Centralize toda a sua operação nos menus laterais.
- **`Dashboard`**: Quantitativo geral e atalhos rápidos.
- **`CLM Ópera`**: Vigência e próximas obrigações.
- **`Contratos`**: Sua listagem de minutas geradas ou em negociação.
- **`Assinaturas`**: Esteira de assinaturas para resgatar envelopes parados.

---

## 📄 2. Gerando um Contrato do Zero

1. Vá para **`Contratos`** e clique em **`+ Novo Contrato`**.
2. **Identificação**: Coloque o título do agrupador (ex: *"Locação de Galpão - Ltda"*).
3. **Tipo e Template**: Escolha a categoria (Prestação de Serviços, Locação, etc.) e o Modelo base.
4. **Vigência**: Se souber, insira a data_inicio e data_fim para alertas automáticos posteriormente.
5. **Partes**: Defina quem são os atores (Contratante, Testemunha).
6. **Preenchimento**: Responda aos campos dinâmicos (placeholders) que o Template requisitar.
7. **Salvar**: A plataforma irá processar e gerar o HTML estático congelado.

---

## ✍️ 3. Iniciando a Coleta de Assinaturas

1. Dentro do **Detalhe do Contrato**, verifique o status igual a **`GERADO`**.
2. No painel de Ações à direita, clique em **`Preparar para Assinatura`**.
   *Isso cria a fila oficial de signatários.*
3. Verifique as fotos na **Fila de Assinaturas**.
4. Clique em **`Enviar para Assinatura`**.
   *O sistema gera links-falsos ou dispara para API real dependendo do Provedor de Assinatura.*
5. Acompanhe se o participante visualizou ou assinou na barra lateral direita.

---

## 🖇️ 4. Gestão Pós-Assinatura (Aditivos e Obrigações)

Quando o contrato entra em vigor, ou muda de prazos:
- **Criar Obrigações**: No detalhe do contrato, agende marcos (ex: *"Primeiro Pagamento"*, data: `20/03/2026`).
- **Criar Aditivos**: Crie registros vinculados ao contrato pai para registrar emendas sem precisar destruir o artefato original.

---

## 🚨 5. Alertas e Vigência

1. Acesse o **`Painel CLM`** diariamente.
2. Contratos próximos do vencimento ficam listados em **Vencendo (30 dias)**.
3. Obrigações que venceram e não sofreram check no formulário ficam vermelhas notificando atraso real.
4. Utilize os alertas para cobranças reativas.
