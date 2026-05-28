#!/usr/bin/env bash
# =====================================================================
# Scraper CKAN — Ministério dos Transportes (dados.transportes.gov.br)
#
# CKAN API:
#   /api/3/action/package_show?id={dataset}
#   → cada dataset tem resources[] com URL direta para CSV/JSON/XLSX/ZIP
#
# Uso:
#   bash dados-gov-transportes.sh            (baixa DATASETS_PADRAO)
#   DATASETS="renavam renaest" bash ...      (baixa só esses)
#   MAX_MB=50 bash ...                       (pula arquivos > 50 MB)
# =====================================================================

set -uo pipefail

DIR_BASE="$(cd "$(dirname "$0")/.."; pwd)/transportes"
mkdir -p "$DIR_BASE"

# Datasets padrão (excluindo RENAVAM e RENAEST pelo volume)
DATASETS_PADRAO=(
  "recall"
  "restricao-de-veiculos"
  "lista-de-fabricantes-de-piv"
  "registro-nacional-de-veiculos-em-estoque"
)

# Permite override por env var
read -r -a DATASETS <<< "${DATASETS:-${DATASETS_PADRAO[*]}}"
MAX_MB="${MAX_MB:-0}"   # 0 = sem limite

echo "════════════════════════════════════════════════════════════"
echo " CKAN MINISTÉRIO DOS TRANSPORTES"
echo " Datasets: ${DATASETS[*]}"
echo " Limite por arquivo: ${MAX_MB} MB (0 = sem limite)"
echo " Destino: $DIR_BASE"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

TOTAL_OK=0; TOTAL_SKIP=0; TOTAL_ERR=0; TOTAL_SKIP_SIZE=0

for ds in "${DATASETS[@]}"; do
  echo
  echo "▸ $ds"
  dir="$DIR_BASE/$ds"
  mkdir -p "$dir"

  # Pega URLs de download
  meta=$(curl -s --max-time 30 "https://dados.transportes.gov.br/api/3/action/package_show?id=$ds")
  if [ -z "$meta" ]; then
    echo "  ✗ não conseguiu buscar metadados"
    continue
  fi

  urls=$(echo "$meta" | grep -oE '"url":\s*"https://[^"]+\.(json|csv|xlsx|xls|zip|rar)"' \
         | sed 's/"url":\s*"//;s/"$//' | sort -u)
  total=$(echo "$urls" | grep -c '^https' || echo 0)
  echo "  $total resources"

  ok=0; skip=0; err=0; skip_size=0
  while read -r url; do
    [ -z "$url" ] && continue
    base=$(basename "$url" | sed 's/%20/_/g')
    dst="$dir/$base"

    # Verifica tamanho antes de baixar (se MAX_MB > 0)
    if [ "$MAX_MB" -gt 0 ]; then
      sz=$(curl -sIL --max-time 15 -o /dev/null -w "%{size_download}\n%{header_size}" "$url" 2>/dev/null | head -1)
      sz_hdr=$(curl -sIL --max-time 15 "$url" 2>/dev/null | grep -i "^Content-Length:" | tail -1 | tr -d ' \r' | cut -d: -f2)
      if [ -n "$sz_hdr" ] && [ "$sz_hdr" -gt $(($MAX_MB * 1024 * 1024)) ]; then
        skip_size=$((skip_size+1))
        printf "    ⊘ %s (%.1f MB, pulado)\n" "$base" "$(echo "scale=1; $sz_hdr/1048576" | bc 2>/dev/null || echo "?")"
        continue
      fi
    fi

    # Baixar (idempotente)
    if [ -f "$dst" ] && [ -s "$dst" ]; then
      skip=$((skip+1))
      continue
    fi

    if curl -sL --max-time 300 --retry 2 --retry-delay 3 -o "$dst.tmp" "$url" 2>/dev/null && [ -s "$dst.tmp" ]; then
      mv "$dst.tmp" "$dst"
      ok=$((ok+1))
      sz=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
      printf "    ✓ %s (%s)\n" "$base" "$(numfmt --to=iec --suffix=B "$sz" 2>/dev/null || echo "${sz}B")"
    else
      rm -f "$dst.tmp"
      err=$((err+1))
      echo "    ✗ $base"
    fi
  done <<< "$urls"

  echo "  → ok=$ok · já tinha=$skip · pulado tamanho=$skip_size · erro=$err"
  TOTAL_OK=$((TOTAL_OK + ok))
  TOTAL_SKIP=$((TOTAL_SKIP + skip))
  TOTAL_ERR=$((TOTAL_ERR + err))
  TOTAL_SKIP_SIZE=$((TOTAL_SKIP_SIZE + skip_size))
done

echo
echo "════════════════════════════════════════════════════════════"
echo " RESUMO: ok=$TOTAL_OK · já existia=$TOTAL_SKIP · pulado tamanho=$TOTAL_SKIP_SIZE · erros=$TOTAL_ERR"
echo " Total no acervo: $(du -sh "$DIR_BASE" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
