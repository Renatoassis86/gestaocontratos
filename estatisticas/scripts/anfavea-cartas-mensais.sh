#!/usr/bin/env bash
# =====================================================================
# Scraper das Cartas / Press Releases ANFAVEA
# Página oficial: https://anfavea.com.br/site/press-releases-3/
# Saída: estatisticas/cartas_mensais/
#
# Estratégia: faz scrape dinâmico da página, extrai TODOS os URLs
# de PDF e baixa cada um preservando o nome original. Idempotente
# (curl -z só baixa se o arquivo mudou).
# =====================================================================

set -uo pipefail

DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/cartas_mensais"
mkdir -p "$DIR_OUT"

INDICE="https://anfavea.com.br/site/press-releases-3/"
TMP_LIST="$(mktemp)"

echo "════════════════════════════════════════════════════════════"
echo " ANFAVEA — Cartas Mensais / Press Releases"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

# 1) baixar página índice e extrair URLs únicos de PDF
echo
echo "▸ Buscando índice em $INDICE"
curl -s "$INDICE" \
  | grep -oiE 'https?://[^"]+\.pdf' \
  | sed 's|^http://|https://|' \
  | sort -u \
  > "$TMP_LIST"

TOTAL=$(wc -l < "$TMP_LIST")
echo "  ✓ $TOTAL PDFs únicos encontrados"

# 2) baixar cada um — nome local = última parte da URL
echo
echo "▸ Baixando…"
OK=0
SKIP=0
ERR=0
while read -r url; do
  base=$(basename "$url" | sed 's/%20/_/g; s/%C3%A7/c/g; s/%C3%A3/a/g')
  dst="$DIR_OUT/$base"

  if [ -f "$dst" ]; then
    # arquivo existe — usa -z para conditional GET
    res=$(curl -sL --max-time 60 -z "$dst" -o "$dst.tmp" -w "%{http_code}" "$url" 2>/dev/null || echo "ERR")
    if [ "$res" = "200" ] && [ -s "$dst.tmp" ]; then
      mv "$dst.tmp" "$dst"
      OK=$((OK+1))
      echo "  ↻ $base (atualizado)"
    else
      rm -f "$dst.tmp"
      SKIP=$((SKIP+1))
    fi
  else
    if curl -sL --max-time 60 --retry 2 --retry-delay 2 -o "$dst" "$url" 2>/dev/null && [ -s "$dst" ]; then
      OK=$((OK+1))
      size=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      printf "  ✓ %s (%s)\n" "$base" "$(numfmt --to=iec --suffix=B "$size" 2>/dev/null || echo "${size}B")"
    else
      rm -f "$dst"
      ERR=$((ERR+1))
      echo "  ✗ $base"
    fi
  fi
done < "$TMP_LIST"

rm -f "$TMP_LIST"

echo
echo "════════════════════════════════════════════════════════════"
echo " Total: $TOTAL · Baixados/atualizados: $OK · Sem mudança: $SKIP · Erros: $ERR"
echo " Espaço: $(du -sh "$DIR_OUT" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
