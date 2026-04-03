import os
import re

def fix_tex_files(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".tex"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Fix **bold** to \textbf{bold}
                new_content = re.sub(r'\*\*(.*?)\*\*', r'\\textbf{\1}', content)
                
                # Fix \textbF typo
                new_content = new_content.replace('\\textbF', '\\textbf')
                
                if new_content != content:
                    print(f"Fixing {path}")
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

if __name__ == "__main__":
    fix_tex_files("d:/repositorio_geral/app_gestao_contratos/DOCS")
