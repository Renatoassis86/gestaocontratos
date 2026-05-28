#!/usr/bin/env bash
# =====================================================================
# Scraper do Boletim de Conjuntura DIEESE
# Padrão: dieese.org.br/boletimdeconjuntura/{ANO}/boletimconjuntura{N}.pdf
#
# Numeração é sequencial cross-year:
#   nº 27 ≈ mar/2021     nº 49 ≈ set/2025     nº 52 ≈ jan/2026
#
# Probe sistemático: cada N (1..90) × cada ano (2017..2026)
# Saída: estatisticas/dieese/conjuntura/
# =====================================================================

set -uo pipefail

DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/dieese/conjuntura"
mkdir -p "$DIR_OUT"

echo "════════════════════════════════════════════════════════════"
echo " DIEESE — Boletim de Conjuntura"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

ANO_INI=2017
ANO_FIM=2026
N_INI=1
N_FIM=90

TOTAL_CAND=$((($ANO_FIM - $ANO_INI + 1) * ($N_FIM - $N_INI + 1)))
echo "▸ Probing $TOTAL_CAND combinações…"
echo

OK=0; SKIP=0; NAO_EXISTE=0
for ano in $(seq $ANO_INI $ANO_FIM); do
  for n in $(seq $N_INI $N_FIM); do
    url="https://www.dieese.org.br/boletimdeconjuntura/${ano}/boletimconjuntura${n}.pdf"
    dst="$DIR_OUT/${ano}_boletimconjuntura${n}.pdf"

    if [ -f "$dst" ] && [ -s "$dst" ]; then
      SKIP=$((SKIP+1))
      continue
    fi

    http=$(curl -sL --max-time 20 -o "$dst.tmp" -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    if [ "$http" = "200" ] && [ -s "$dst.tmp" ] && head -c 4 "$dst.tmp" | grep -q "PDF"; then
      mv "$dst.tmp" "$dst"
      OK=$((OK+1))
      size=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      printf "  ✓ boletim %02d (%s) [%s]\n" "$n" "$ano" "$(numfmt --to=iec --suffix=B "$size" 2>/dev/null || echo "${size}B")"
    else
      rm -f "$dst.tmp"
      NAO_EXISTE=$((NAO_EXISTE+1))
    fi
  done
done

echo
echo "════════════════════════════════════════════════════════════"
echo " Probadas: $TOTAL_CAND · Novos: $OK · Já tinha: $SKIP · 404: $NAO_EXISTE"
echo " Acervo: $(ls "$DIR_OUT" 2>/dev/null | wc -l) PDFs · $(du -sh "$DIR_OUT" 2>/dev/null | cut -f1)"
echo "════════════════════════════════════════════════════════════"
