#!/usr/bin/env bash
# =====================================================================
# Scraper de Estudos e Apresentações da ANFAVEA
# Página: https://anfavea.com.br/site/estudos-e-apresentacoes/
# Saída: estatisticas/estudos_apresentacoes/
# =====================================================================

set -uo pipefail

DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/estudos_apresentacoes"
mkdir -p "$DIR_OUT"

INDICE="https://anfavea.com.br/site/estudos-e-apresentacoes/"
TMP_LIST="$(mktemp)"

echo "════════════════════════════════════════════════════════════"
echo " ANFAVEA — Estudos e Apresentações"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

echo
echo "▸ Buscando índice…"
curl -s "$INDICE" \
  | grep -oiE 'https?://[^"]+\.(pdf|xlsx|xlsm)' \
  | sed 's|^http://|https://|' \
  | sort -u \
  > "$TMP_LIST"
TOTAL=$(wc -l < "$TMP_LIST")
echo "  ✓ $TOTAL arquivos encontrados"

OK=0; SKIP=0; ERR=0
while read -r url; do
  base=$(basename "$url" | sed 's/%20/_/g; s/%C3%A7/c/g; s/%C3%A3/a/g; s/%C3%AD/i/g; s/%C3%A1/a/g; s/%c3%87/C/g; s/%c3%83/A/g')
  dst="$DIR_OUT/$base"

  if curl -sL --max-time 90 --retry 2 -z "$dst" -o "$dst.tmp" "$url" 2>/dev/null && [ -s "$dst.tmp" ]; then
    mv "$dst.tmp" "$dst"
    OK=$((OK+1))
    size=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
    printf "  ✓ %s (%s)\n" "$base" "$(numfmt --to=iec --suffix=B "$size" 2>/dev/null || echo "${size}B")"
  else
    rm -f "$dst.tmp"
    if [ -f "$dst" ]; then SKIP=$((SKIP+1)); else ERR=$((ERR+1)); echo "  ✗ $base"; fi
  fi
done < "$TMP_LIST"

rm -f "$TMP_LIST"
echo
echo " Total: $TOTAL · Novos/atualizados: $OK · Skip: $SKIP · Erro: $ERR"
echo " Espaço: $(du -sh "$DIR_OUT" | cut -f1)"
