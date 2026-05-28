# Base Estatística — Dashboard Mevos

Acervo de fontes públicas brasileiras que alimentam o dashboard premium do Grupo Mevos em `/proposta-comercial/mevos/dashboard`.

Pasta híbrida: parte é **acervo manual histórico** já curado pelo Renato (Anuários ANFAVEA 2003-2025, séries temporais XLSM, RENAVE 2024), parte é **alimentada automaticamente** por scripts em `scripts/`.

> ⚠️ **Toda a pasta é gitignored** (potencial > 1 GB). Os scripts em `scripts/` ficam versionados como receita reproduzível.

## Como usar

```bash
# Tudo de uma vez (vai demorar ~30-60 min na primeira execução)
for s in estatisticas/scripts/*.sh; do bash "$s"; done

# Ou cada fonte separadamente
bash estatisticas/scripts/bcb-sgs.sh
bash estatisticas/scripts/ibge-sidra.sh
bash estatisticas/scripts/comexstat.sh
bash estatisticas/scripts/dados-gov-transportes.sh
bash estatisticas/scripts/anfavea-cartas-mensais.sh
bash estatisticas/scripts/anfavea-edicoes-excel.sh
bash estatisticas/scripts/anfavea-estudos.sh
bash estatisticas/scripts/fenabrave-emplacamentos.sh
bash estatisticas/scripts/fenabrave-auxiliares.sh
bash estatisticas/scripts/dieese-boletim-conjuntura.sh
bash estatisticas/scripts/dieese-boletim-negociacao.sh
```

Scripts são **idempotentes** — re-rodar não duplica nem corrompe arquivos baixados.

## Inventário (acervo + downloads)

### Anuários e séries temporais — acervo manual (já existia)
- `Anuarios/` — 26 PDFs ANFAVEA (2003-2025) [acervo histórico, insubstituível]
- `Dados/{2012-2026}/` — Excels ANFAVEA por ano (siteautoveiculos, máquinas, séries)
- `estoque/` — RENAVE 2024 + CSVs novos/usados entrada/saída
- `serie temporais/` — SeriesTemporais_Autoveiculos/Emprego/Exportações + estoquesite2026

### ANFAVEA — alimentado por scripts/
- `cartas_mensais/` (~205 PDFs · 59 MB) — Press releases 2014→presente. Script: `scripts/anfavea-cartas-mensais.sh`
- `edicoes_excel/` (~54 XLSX · 3.6 MB) — Todos os Excels da página `edicoes-em-excel/`. Script: `scripts/anfavea-edicoes-excel.sh`
- `estudos_apresentacoes/` (~30 PDFs · 84 MB) — Pesquisas, descarbonização, BCG, BNDES, etc. Script: `scripts/anfavea-estudos.sh`

### FENABRAVE
- `emplacamentos/` (~101 PDFs · 360 MB) — Informativos mensais 2019-2026. Script: `scripts/fenabrave-emplacamentos.sh` (probe + scrape)
- `fenabrave_seminovoseusados/` (6 PDFs · 6.7 MB) — Mensais 2025. Script: `scripts/fenabrave-auxiliares.sh`
- `fenabrave_balancosemestral/` (19 PDFs · 96 MB) — Balanços 2005-2024. Mesmo script

### DIEESE
- `dieese/conjuntura/` (~28 PDFs · 15 MB) — Boletim Conjuntura nº 1-54. Script: `scripts/dieese-boletim-conjuntura.sh`
- `dieese/negociacao/` (~25 HTMLs) — Boletim Negociação nº 44-68. Script: `scripts/dieese-boletim-negociacao.sh`

### APIs estruturadas
- `bcb/sgs/` (~13 JSONs · 212 KB) — Séries BCB SGS: USD, EUR, Selic, IPCA, IGP-M, IPA Metalúrgicos, NUCI, etc. Script: `scripts/bcb-sgs.sh`
- `ibge/sidra/` (~13 JSONs · 1 MB) — PIM-PF metalurgia/produtos de metal/veículos × Brasil/UF. Script: `scripts/ibge-sidra.sh`
- `comexstat/anos/` (~10 CSV · ~360 MB) — Exportações/importações por NCM 2022-2026. Script: `scripts/comexstat.sh`
- `comexstat/tabelas/` — Dicionários NCM, países, UFs, vias
- `transportes/` (~86 arquivos · 94 MB) — CKAN dados.transportes.gov.br (Recall, Restrição, Fabricantes PIV, Estoque RENAVE). Script: `scripts/dados-gov-transportes.sh`

### Pendentes (decisão de volume)
- **RENAVAM** (registro-nacional-de-veiculos-automotores-renavam) — 153 ZIPs (~10-15 GB estimados). Frota nacional por UF/município/marca/modelo. Para baixar: `DATASETS="registro-nacional-de-veiculos-automotores-renavam" bash scripts/dados-gov-transportes.sh`
- **RENAEST** (estatísticas de acidentes) — 52 ZIPs (~2-5 GB estimados). Para baixar: `DATASETS="renaest" bash scripts/dados-gov-transportes.sh`

## Convenções

- Scripts **idempotentes**: re-rodar pula o que já existe (usa `curl -z` ou check de existência)
- Logs **padronizados**: `→ destino` + `✓ tamanho` ou `✗ erro`
- URLs ficam **dentro do script** como constantes — uma única fonte de verdade
- Cada script lida com seu padrão de URL (probing, HTTPS-force, etc)

## Próximos passos (Onda 2 do dashboard)

1. **Parser PDF dos Anuários** → extrair tabelas de produção histórica e popular `mevos_series_pontos`
2. **Parser dos Cartas Mensais** → extrair KPIs do mês para `mevos_dados_setoriais`
3. **Parser dos Emplacamentos FENABRAVE** → série mensal por categoria/UF
4. **ETL CSV ComexStat** → agregar NCM 72/73/87 em séries mensais R$/kg
5. **ETL CKAN Recall** → contagem mensal de recalls automotivos
