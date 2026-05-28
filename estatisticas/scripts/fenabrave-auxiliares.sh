#!/usr/bin/env bash
# Scraper genérico de páginas FENABRAVE com PDFs linkados
# Páginas-alvo: SemiNovoseUsados, balancosemestral
set -uo pipefail

DIR_BASE="$(cd "$(dirname "$0")/.."; pwd)"

echo "════════════════════════════════════════════════════════════"
echo " FENABRAVE — Páginas auxiliares"
echo "════════════════════════════════════════════════════════════"

baixar_pagina() {
  local nome="$1"
  local url="https://www.fenabrave.org.br/portalv2/Conteudo/$nome"
  local dir="$DIR_BASE/fenabrave_${nome,,}"
  mkdir -p "$dir"

  echo
  echo "▸ $nome"
  echo "  url: $url"
  echo "  dir: $dir"

  curl -s "$url" -o /tmp/idx.html
  # Pega TODAS as URLs http(s) de PDF e força HTTPS — o servidor FENABRAVE
  # responde 404 em HTTP mas 200 em HTTPS para /portal/files/*
  local urls=$(grep -oiE 'https?://[^"]+\.pdf' /tmp/idx.html | sed 's|^http://|https://|' | sort -u)
  # também pega PDFs relativos
  local rel=$(grep -oiE 'href="[^"]*\.pdf"' /tmp/idx.html \
              | sed 's/href="//;s/"$//' \
              | grep -v '^http' \
              | sed 's|^|https://www.fenabrave.org.br|')

  printf "%s\n%s\n" "$urls" "$rel" | grep -v '^$' | sort -u > /tmp/idx.list
  local total=$(wc -l < /tmp/idx.list)
  echo "  ✓ $total PDFs"

  local ok=0
  while read -r u; do
    local b=$(basename "$u" | sed 's/%20/_/g')
    local d="$dir/$b"
    if curl -sL --max-time 60 -z "$d" -o "$d.tmp" "$u" 2>/dev/null && [ -s "$d.tmp" ]; then
      mv "$d.tmp" "$d"
      ok=$((ok+1))
      printf "    ✓ %s\n" "$b"
    else
      rm -f "$d.tmp"
    fi
  done < /tmp/idx.list
  echo "  → $ok baixados"
}

baixar_pagina "SemiNovoseUsados"
baixar_pagina "balancosemestral"

echo
echo "════════════════════════════════════════════════════════════"
du -sh "$DIR_BASE/fenabrave_seminovoseusados" "$DIR_BASE/fenabrave_balancosemestral" 2>/dev/null
