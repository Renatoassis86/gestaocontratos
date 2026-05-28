#!/usr/bin/env bash
# =====================================================================
# IBGE SIDRA — dump das séries PIM-PF relevantes para metalurgia
# API v3: https://servicodados.ibge.gov.br/api/v3/agregados
# Sem auth, JSON. Usa view=flat.
#
# Atenção: agregado 8158 (briefing) → descontinuado. Atual = 8888.
# =====================================================================

set -uo pipefail
DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/ibge/sidra"
mkdir -p "$DIR_OUT"

echo "════════════════════════════════════════════════════════════"
echo " IBGE SIDRA — PIM-PF metalurgia + correlatos"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

# Calcular janela: últimos 60 meses (5 anos)
mes_atual=$(date +%Y%m)
mes_60=$(date -d "60 months ago" +%Y%m 2>/dev/null || date -v -60m +%Y%m 2>/dev/null || echo "202101")

echo "Janela: $mes_60 → $mes_atual"
echo

# Catálogo: agregado|variavel|classificacao|nivel|slug|descricao
CONSULTAS=(
  "8888|12606|544[129314]|N1|pim_industria_geral_brasil|PIM Indústria geral Brasil"
  "8888|12606|544[129316]|N1|pim_industria_transformacao_brasil|PIM Indústria de transformação"
  "8888|12606|544[129333]|N1|pim_metalurgia_brasil|PIM Metalurgia (CNAE 24) Brasil"
  "8888|12606|544[129333]|N3|pim_metalurgia_por_uf|PIM Metalurgia por UF"
  "8888|12606|544[129334]|N1|pim_produtos_metal_brasil|PIM Produtos de metal (CNAE 25) Brasil"
  "8888|12606|544[129334]|N3|pim_produtos_metal_por_uf|PIM Produtos de metal por UF"
  "8888|12606|544[129338]|N1|pim_veiculos_brasil|PIM Veículos automotores (CNAE 29) Brasil"
  "8888|12606|544[129338]|N3|pim_veiculos_por_uf|PIM Veículos por UF"
  "8888|11602|544[129333]|N1|pim_metalurgia_var_anual_brasil|PIM Metalurgia var % anual"
  "8888|11604|544[129333]|N1|pim_metalurgia_acum_12m_brasil|PIM Metalurgia acumulado 12m %"
  "8887|12606|543[129278]|N1|pim_bens_capital_brasil|PIM Bens de Capital"
  "8887|12606|543[129299]|N1|pim_pecas_transporte|PIM Peças e acessórios p/ transporte"
  "8886|12606||N1|pim_insumos_construcao|PIM Insumos da Construção Civil"
)

OK=0; ERR=0
for c in "${CONSULTAS[@]}"; do
  IFS='|' read -r agr var class niv slug desc <<< "$c"

  dst="$DIR_OUT/${slug}.json"
  # URL-encode brackets/pipes
  class_enc=$(echo "$class" | sed 's/\[/%5B/g;s/\]/%5D/g;s/|/%7C/g')

  url="https://servicodados.ibge.gov.br/api/v3/agregados/${agr}/periodos/${mes_60}-${mes_atual}/variaveis/${var}?localidades=${niv}%5Ball%5D&classificacao=${class_enc}&view=flat"

  printf "▸ %s\n" "$desc"
  if curl -sL --max-time 60 -o "$dst.tmp" "$url" && [ -s "$dst.tmp" ]; then
    if head -c 1 "$dst.tmp" | grep -q '\['; then
      mv "$dst.tmp" "$dst"
      sz=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      pts=$(grep -oE '"V":"[^"]+"' "$dst" | wc -l)
      printf "   ✓ %s (%s, %s pontos)\n" "$slug" "$(numfmt --to=iec --suffix=B "$sz" 2>/dev/null || echo "${sz}B")" "$pts"
      OK=$((OK+1))
    else
      rm -f "$dst.tmp"
      echo "   ✗ resposta não-JSON"
      ERR=$((ERR+1))
    fi
  else
    rm -f "$dst.tmp"
    echo "   ✗ erro de download"
    ERR=$((ERR+1))
  fi
done

echo
echo "════════════════════════════════════════════════════════════"
echo " Ok: $OK · Erros: $ERR · Acervo: $(du -sh "$DIR_OUT" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
