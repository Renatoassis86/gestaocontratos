import os
import docx

folder_path = r"d:\repositorio_geral\app_gestao_contratos\tipos_doc_emp\ficv\historicos_pos"
empresa_id = "e3b334ba-d67b-4a5e-aa71-44d7637cc8e4"

files_mapping = {
    "Modelo Históricos CP FICV.docx": "Pós-graduação em Ciência Política",
    "Modelo Históricos MIS FICV.docx": "Pós-graduação em Missiologia Urbana",
    "Modelo Históricos TNT.docx": "Pós-graduação em Teologia do Novo Testamento"
}

def extract_tables():
    sql_lines = []
    
    for filename, curso_nome in files_mapping.items():
        path = os.path.join(folder_path, filename)
        if not os.path.exists(path):
            continue
            
        # 1. Inserir o Curso
        curso_var = curso_nome.lower().replace(" ", "_").replace("-", "_").replace("á", "a").replace("ó", "o").replace("ã", "a")
        sql_lines.append(f"-- {curso_nome}")
        sql_lines.append(f"INSERT INTO public.cursos (id, empresa_id, nome, modalidade) VALUES (gen_random_uuid(), '{empresa_id}', '{curso_nome}', 'Pós-Graduação');")
        sql_lines.append(f"DO $$")
        sql_lines.append(f"DECLARE v_curso_id UUID;")
        sql_lines.append(f"BEGIN")
        sql_lines.append(f"  SELECT id INTO v_curso_id FROM public.cursos WHERE nome = '{curso_nome}' LIMIT 1;")
        
        doc = docx.Document(path)
        disciplinas_inseridas = set()
        
        for table in doc.tables:
            for r_idx, row in enumerate(table.rows):
                if r_idx == 0: # Header
                    continue
                cells = [cell.text.strip().replace('\n', ' ') for cell in row.cells]
                
                if len(cells) >= 4:
                    disciplina = cells[0].replace("'", "''")
                    ch_text = cells[3].replace("h", "").replace("H", "").strip()
                    ch = int(ch_text) if ch_text.isdigit() else 40
                    
                    if disciplina and disciplina != "Disciplina" and disciplina not in disciplinas_inseridas:
                        sql_lines.append(f"  INSERT INTO public.disciplinas (curso_id, nome, carga_horaria) VALUES (v_curso_id, '{disciplina}', {ch});")
                        disciplinas_inseridas.add(disciplina)

                        
        sql_lines.append(f"END $$;")
        sql_lines.append("")

    with open("academic_fixtures.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))

if __name__ == "__main__":
    extract_tables()


