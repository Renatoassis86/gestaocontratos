#!/usr/bin/env bash
# =====================================================================
# ComexStat MDIC — Dump CSV de exportações/importações brasileiras
# Servidor: https://balanca.economia.gov.br/balanca/bd/
#
# Arquivos pesados (~36 MB cada ano de EXP/IMP por NCM 8-dígitos)
# Por isso baixamos só anos recentes + tabelas auxiliares.
# =====================================================================

set -uo pipefail
DIR_OUT="$(cd "$(dirname "$0")/.."; pwd)/comexstat"
mkdir -p "$DIR_OUT/anos" "$DIR_OUT/tabelas"

BASE="https://balanca.economia.gov.br/balanca/bd"
ANOS=(2022 2023 2024 2025 2026)
TIPOS=(EXP IMP)

echo "════════════════════════════════════════════════════════════"
echo " ComexStat — Dump CSV"
echo " Anos: ${ANOS[*]} · Tipos: ${TIPOS[*]}"
echo " Destino: $DIR_OUT"
echo " $(date)"
echo "════════════════════════════════════════════════════════════"

OK=0; SKIP=0; ERR=0

echo
echo "▸ CSVs anuais (NCM 8-dígitos)"
for ano in "${ANOS[@]}"; do
  for tipo in "${TIPOS[@]}"; do
    url="$BASE/comexstat-bd/ncm/${tipo}_${ano}.csv"
    dst="$DIR_OUT/anos/${tipo}_${ano}.csv"

    if [ -f "$dst" ] && [ -s "$dst" ]; then
      SKIP=$((SKIP+1)); continue
    fi

    printf "  → %s_%s.csv " "$tipo" "$ano"
    if curl -sL --max-time 300 --retry 2 -o "$dst.tmp" "$url" && [ -s "$dst.tmp" ]; then
      # Valida que é CSV (primeira linha tem `;`)
      if head -1 "$dst.tmp" | grep -q ';'; then
        mv "$dst.tmp" "$dst"
        sz=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
        printf "✓ %s\n" "$(numfmt --to=iec --suffix=B "$sz" 2>/dev/null || echo "${sz}B")"
        OK=$((OK+1))
      else
        rm -f "$dst.tmp"
        printf "✗ não-CSV\n"
        ERR=$((ERR+1))
      fi
    else
      rm -f "$dst.tmp"
      printf "✗ erro\n"
      ERR=$((ERR+1))
    fi
  done
done

echo
echo "▸ Tabelas auxiliares (dicionários NCM, países, UFs, vias)"
TABELAS=(NCM NCM_SH PAIS UF VIA URF NCM_CGCE NCM_ISIC)
for t in "${TABELAS[@]}"; do
  url="$BASE/tabelas/${t}.csv"
  dst="$DIR_OUT/tabelas/${t}.csv"

  if [ -f "$dst" ] && [ -s "$dst" ]; then SKIP=$((SKIP+1)); continue; fi

  printf "  → %s.csv " "$t"
  if curl -sL --max-time 60 -o "$dst.tmp" "$url" && [ -s "$dst.tmp" ] && head -1 "$dst.tmp" | grep -q ';'; then
    mv "$dst.tmp" "$dst"
    sz=$(stat -c '%s' "$dst" 2>/dev/null || stat -f '%z' "$dst")
    printf "✓ %s\n" "$(numfmt --to=iec --suffix=B "$sz" 2>/dev/null || echo "${sz}B")"
    OK=$((OK+1))
  else
    rm -f "$dst.tmp"
    printf "✗\n"
    ERR=$((ERR+1))
  fi
done

echo
echo "════════════════════════════════════════════════════════════"
echo " Ok: $OK · Já tinha: $SKIP · Erros: $ERR · Acervo: $(du -sh "$DIR_OUT" | cut -f1)"
echo "════════════════════════════════════════════════════════════"
