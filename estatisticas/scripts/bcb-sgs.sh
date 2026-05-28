#!/usr/bin/env bash
# =====================================================================
# BCB SGS — dump local das séries selecionadas
# API: https://api.bcb.gov.br/dados/serie/bcdata.sgs.{COD}/dados?formato=json
# Sem auth, JSON [{data: 'DD/MM/YYYY', valor: 'X.XX'}]
# Saída: estatisticas/bcb/sgs/{codigo}_{slug}.json
# =====================================================================

set -uo pipefail
DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/bcb/sgs"
mkdir -p "$DIR_OUT"

# Catálogo de séries-alvo: codigo|slug|descrição
SERIES=(
  "1|usd_venda_comercial|Dólar venda comercial (diária)"
  "21619|eur_venda_comercial|Euro venda comercial (diária)"
  "21620|libra_venda|Libra esterlina venda (diária)"
  "21621|yen_venda|Iene venda (diária)"
  "11|selic_diaria|Selic diária (overnight)"
  "12|cdi_diario|CDI diário"
  "432|meta_selic|Meta Selic anual (% a.a.)"
  "4189|selic_acumulada_12m|Selic acumulada 12 meses (% a.a.)"
  "433|ipca_mensal|IPCA variação mensal (%)"
  "13522|ipca_15_mensal|IPCA-15 variação mensal (%)"
  "189|igpm_mensal|IGP-M variação mensal (%)"
  "188|igpdi_mensal|IGP-DI variação mensal (%)"
  "7478|ipca_15_var|IPCA-15 var % mensal"
  "4503|ipa_metalurgicos|IPA-DI - Metalúrgicos"
  "21380|ici_industria_fgv|ICI - Indústria FGV"
  "21859|nuci_industria|NUCI Indústria"
  "28503|pim_pf_12m|PIM-PF Indústria geral acumulada 12m"
  "24364|saldo_credito_industria|Saldo crédito Indústria (R$ bi)"
  "7341|confianca_industrial|Confiança industrial (trimestral)"
  "433|ipca_var_mensal|IPCA variação mensal duplicado"
)

echo "════════════════════════════════════════════════════════════"
echo " BCB SGS — dump histórico completo"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

OK=0; ERR=0
for s in "${SERIES[@]}"; do
  IFS='|' read -r cod slug desc <<< "$s"
  dst="$DIR_OUT/${cod}_${slug}.json"
  url="https://api.bcb.gov.br/dados/serie/bcdata.sgs.${cod}/dados?formato=json"

  printf "▸ SGS %s — %s\n" "$cod" "$desc"
  if curl -sL --max-time 60 -o "$dst.tmp" "$url" && [ -s "$dst.tmp" ]; then
    # valida que é JSON array começando com [
    if head -c 1 "$dst.tmp" | grep -q '\['; then
      mv "$dst.tmp" "$dst"
      sz=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      pts=$(grep -oE '"data":"[^"]+"' "$dst" | wc -l)
      printf "   ✓ %s (%s, %s pontos)\n" "$slug" "$(numfmt --to=iec --suffix=B "$sz" 2>/dev/null || echo "${sz}B")" "$pts"
      OK=$((OK+1))
    else
      rm -f "$dst.tmp"
      ERR=$((ERR+1))
      echo "   ✗ resposta não-JSON (série inexistente?)"
    fi
  else
    rm -f "$dst.tmp"
    ERR=$((ERR+1))
    echo "   ✗ erro de download"
  fi
done

echo
echo "════════════════════════════════════════════════════════════"
echo " Ok: $OK · Erros: $ERR · Acervo: $(du -sh "$DIR_OUT" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
