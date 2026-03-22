path = r"d:\repositorio_geral\app_gestao_contratos\DOCS\relatorio_institucional\capitulos\swebok.tex"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's count how many literal '\' characters there are or what combination
count_double = content.count('\\\\')
count_single = content.count('\\')

print(f"Count of '\\\\': {count_double}")
print(f"Total size: {len(content)}")

# Replace
fixed = content.replace('\\\\', '\\')

with open(path, 'w', encoding='utf-8') as f:
    f.write(fixed)

print("Replacement complete. Fixed successfully")
