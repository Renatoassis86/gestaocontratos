#!/usr/bin/env bash
# =====================================================================
# Scraper dos Informativos de Emplacamentos FENABRAVE
# Página: https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos
# Padrão estável: portal/files/{YYYY}_{MM}_02.pdf
#
# Combina scrape da página com PROBING sistemático para descobrir
# meses históricos não listados na página atual.
#
# Saída: estatisticas/emplacamentos/ (mesma pasta que o usuário já usa)
# =====================================================================

set -uo pipefail

DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/emplacamentos"
mkdir -p "$DIR_OUT"

INDICE="https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos"
TMP_LIST="$(mktemp)"

echo "════════════════════════════════════════════════════════════"
echo " FENABRAVE — Emplacamentos mensais"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

# 1) URLs visíveis na página
echo
echo "▸ Scrape da página índice…"
curl -s "$INDICE" \
  | grep -oiE 'https?://[^"]+/files/[0-9]{4}_[0-9]{2}_[0-9]{2}\.pdf' \
  | sort -u \
  > "$TMP_LIST"
echo "  • $(wc -l < "$TMP_LIST") URLs encontradas na página"

# 2) PROBING sistemático: todos os meses 2018-01 a 2026-12, sufixos comuns
echo "▸ Probing sistemático 2018-2026…"
ANO_INI=2018
ANO_FIM=2026
SUFFIXES=("02" "01" "03" "2" "1" "3")   # FENABRAVE alternou padrão entre anos

for ano in $(seq $ANO_INI $ANO_FIM); do
  for mes in 01 02 03 04 05 06 07 08 09 10 11 12; do
    for suf in "${SUFFIXES[@]}"; do
      url="https://www.fenabrave.org.br/portal/files/${ano}_${mes}_${suf}.pdf"
      echo "$url" >> "$TMP_LIST"
    done
  done
done

# dedupe
sort -u "$TMP_LIST" -o "$TMP_LIST"
TOTAL=$(wc -l < "$TMP_LIST")
echo "  • $TOTAL URLs candidatas após dedupe"

# 3) baixar (apenas os que existem)
echo
echo "▸ Baixando os que existirem…"
OK=0; SKIP=0; NAO_EXISTE=0
while read -r url; do
  base=$(basename "$url")
  dst="$DIR_OUT/$base"

  # se já tem localmente, pula
  if [ -f "$dst" ] && [ -s "$dst" ]; then
    SKIP=$((SKIP+1))
    continue
  fi

  # tenta baixar — se 404, pula silenciosamente
  http=$(curl -sL --max-time 30 -o "$dst.tmp" -w "%{http_code}" "$url" 2>/dev/null || echo "000")
  if [ "$http" = "200" ] && [ -s "$dst.tmp" ]; then
    # verifica se é PDF de verdade
    if head -c 4 "$dst.tmp" | grep -q "PDF"; then
      mv "$dst.tmp" "$dst"
      OK=$((OK+1))
      size=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      printf "  ✓ %s (%s)\n" "$base" "$(numfmt --to=iec --suffix=B "$size" 2>/dev/null || echo "${size}B")"
    else
      rm -f "$dst.tmp"
      NAO_EXISTE=$((NAO_EXISTE+1))
    fi
  else
    rm -f "$dst.tmp"
    NAO_EXISTE=$((NAO_EXISTE+1))
  fi
done < "$TMP_LIST"

rm -f "$TMP_LIST"

echo
echo "════════════════════════════════════════════════════════════"
echo " Candidatas: $TOTAL · Novos: $OK · Já tinha: $SKIP · Não existe (404): $NAO_EXISTE"
echo " Acervo total: $(ls "$DIR_OUT" | wc -l) PDFs · $(du -sh "$DIR_OUT" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
