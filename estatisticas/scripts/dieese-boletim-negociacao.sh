#!/usr/bin/env bash
# Boletim de Negociação DIEESE — HTML
# Padrão: dieese.org.br/boletimnegociacao/{ANO}/boletimnegociacao{N}.html
set -uo pipefail
DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/dieese/negociacao"
mkdir -p "$DIR_OUT"
echo "▸ DIEESE — Boletim de Negociação · Destino: $DIR_OUT"
OK=0; NAO=0
for ano in $(seq 2017 2026); do
  for n in $(seq 1 90); do
    url="https://www.dieese.org.br/boletimnegociacao/${ano}/boletimnegociacao${n}.html"
    dst="$DIR_OUT/${ano}_boletimnegociacao${n}.html"
    [ -f "$dst" ] && [ -s "$dst" ] && continue
    http=$(curl -sL --max-time 15 -o "$dst.tmp" -w "%{http_code}" "$url" 2>/dev/null || echo 0)
    if [ "$http" = "200" ] && [ -s "$dst.tmp" ] && head -c 200 "$dst.tmp" | grep -qi "html\|boletim"; then
      mv "$dst.tmp" "$dst"; OK=$((OK+1))
      echo "  ✓ negociacao ${n} (${ano})"
    else
      rm -f "$dst.tmp"; NAO=$((NAO+1))
    fi
  done
done
echo "▸ Novos: $OK · 404: $NAO · Acervo: $(ls "$DIR_OUT" 2>/dev/null | wc -l) HTMLs"
