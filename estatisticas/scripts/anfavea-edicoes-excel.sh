#!/usr/bin/env bash
# =====================================================================
# Scraper das Edições em Excel da ANFAVEA
# Página: https://anfavea.com.br/site/edicoes-em-excel/
# Saída: estatisticas/edicoes_excel/
# =====================================================================

set -uo pipefail

DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/edicoes_excel"
mkdir -p "$DIR_OUT"

INDICE="https://anfavea.com.br/site/edicoes-em-excel/"
TMP_LIST="$(mktemp)"

echo "════════════════════════════════════════════════════════════"
echo " ANFAVEA — Edições em Excel"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

echo
echo "▸ Buscando índice em $INDICE"
curl -s "$INDICE" \
  | grep -oiE 'https?://[^"]+\.(xlsx|xlsm|xls)' \
  | sed 's|^http://|https://|' \
  | sort -u \
  > "$TMP_LIST"

TOTAL=$(wc -l < "$TMP_LIST")
echo "  ✓ $TOTAL planilhas encontradas"

echo
echo "▸ Baixando…"
OK=0; SKIP=0; ERR=0
while read -r url; do
  base=$(basename "$url" | sed 's/%20/_/g; s/%C3%A7/c/g; s/%C3%A3/a/g; s/%C3%AD/i/g')
  dst="$DIR_OUT/$base"

  if curl -sL --max-time 90 --retry 2 --retry-delay 2 -z "$dst" -o "$dst.tmp" "$url" 2>/dev/null; then
    if [ -s "$dst.tmp" ]; then
      mv "$dst.tmp" "$dst"
      OK=$((OK+1))
      size=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      printf "  ✓ %s (%s)\n" "$base" "$(numfmt --to=iec --suffix=B "$size" 2>/dev/null || echo "${size}B")"
    else
      rm -f "$dst.tmp"
      if [ -f "$dst" ]; then
        SKIP=$((SKIP+1))
      else
        ERR=$((ERR+1))
        echo "  ✗ $base (vazio)"
      fi
    fi
  else
    rm -f "$dst.tmp"
    ERR=$((ERR+1))
    echo "  ✗ $base"
  fi
done < "$TMP_LIST"

rm -f "$TMP_LIST"

echo
echo "════════════════════════════════════════════════════════════"
echo " Total: $TOTAL · Baixados/atualizados: $OK · Sem mudança: $SKIP · Erros: $ERR"
echo " Espaço: $(du -sh "$DIR_OUT" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
