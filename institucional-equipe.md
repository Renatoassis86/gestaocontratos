# Plano: Ajuste Institucional & Equipe (Arkos)

## Visão Geral
Adicionar o ecossistema institucional à navegação e um módulo dedicado detalhando o time (Creators) com minicurrículos responsivos. Ajustar a imagem do Hero para melhor alinhamento executivo.

## Tipo de Projeto
WEB (`frontend-specialist`)

## Critérios de Sucesso
- Dropdown **Institucional** operacional com submenus.
- Módulo **Equipe** com visual atraente contendo os 6 nomes e descrições.
- Substituição da imagem do Laptop por `arkos_dashboard_decision_1774133572097.png` (Executiva).
- Totalmente responsivo no Mobile.

## Tarefas

### [P0] Preparar Estruturas
- [ ] Mapear currículos gerados para cada creator.
- [ ] Consolidar imagem de Hero preferida pelo usuário.

### [P1] Implementar Layout `page.tsx`
- [ ] Atualizar `<header>` com o dropdown **Institucional** contendo:
  - O que é a Arkos
  - Quem somos
  - Conheça nossa equipe
  - Nosso negócio
- [ ] Incluir Seção `#equipe` com os 6 Creators:
  - Mini CVs automáticos.
  - Cards com efeito hover adaptados às cores da marca.
- [ ] Alterar o Hero Laptop para o mockup de painel em vidro realista.

### [P2] Ajustar Estilos `page.module.css`
- [ ] `.institucionalDropdown`: Menu flutuante operacional.
- [ ] `.equipeGrid`: Grid adaptado com fotos responsivas.

### [Phase X] Verificação
- [ ] Testar carregamento de todas as imagens do time.
- [ ] Verificar legibilidade dos textos em mobile.
