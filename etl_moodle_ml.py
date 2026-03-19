import requests
import json

# =====================================================================
# CONFIGURAÇÕES DE INTEGRAÇÃO MOODLE
# =====================================================================
MOODLE_TOKEN = "71edd081c7e0c5bb83f872b60af80227"
MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"

# =====================================================================
# CONFIGURAÇÕES SUPABASE / BANCO DE DADOS ML
# Se for rodar isolado, insira as credenciais abaixo
# =====================================================================
SUPABASE_URL = "https://nqzrxqnddzxhdhdegimf.supabase.co" # Exemplo
SUPABASE_KEY = "SUA_CHAVE_SUPABASE"

def moodle_request(wsfunction, params={}):
    """Realiza requisição POST para a API REST do Moodle"""
    payload = {
        **params,
        "wstoken": MOODLE_TOKEN,
        "moodlewsrestformat": "json",
        "wsfunction": wsfunction
    }
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    try:
        response = requests.post(MOODLE_URL, data=payload, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Erro {response.status_code} na API Moodle: {response.text}")
            return None
    except Exception as e:
        print(f"Erro de conexão com Moodle: {e}")
        return None

def extract_courses():
    """Extrai categorias e nomes de cursos para Segmentação"""
    courses = moodle_request("core_course_get_courses")
    if courses:
        print(f"✅ {len(courses)} Cursos Extraídos do Moodle.")
        return courses
    return []

def extract_student_activities(course_id, user_id):
    """Extrai status de conclusão de atividades (Rastros Digitais)"""
    params = {
        "courseid": course_id,
        "userid": user_id
    }
    completion = moodle_request("core_completion_get_activities_completion_status", params)
    return completion

def extract_course_grades(course_id):
    """Extrai notas dos alunos do relatório do usuário no curso"""
    params = {
        "courseid": course_id
    }
    grades = moodle_request("gradereport_user_get_grade_items", params)
    # Tratar GradeItems para persistência
    return grades

def run_etl_pipeline():
    print("🚀 Iniciando Pipeline ETL Moodle -> ML Dataframe...")
    
    # 1. Extrair Cursos
    all_courses = extract_courses()
    
    for course in all_courses:
        course_id = course.get('id')
        if course_id == 1: continue # Pula o curso 'Site' padrão
        
        print(f"➡ Processando Curso: [ID {course_id}] {course.get('fullname')}")
        
        # 2. Buscar Notas das Avaliações (gradereport_user_get_grade_items)
        grades = extract_course_grades(course_id)
        if grades and 'usergrades' in grades:
            for student_grade in grades['usergrades']:
                user_id = student_grade.get('userid')
                user_fullname = student_grade.get('userfullname')
                
                # Tratar e salvar Notas
                for item in student_grade.get('gradeitems', []):
                    if item.get('itemtype') == 'mod':
                        print(f"   Aluno: {user_fullname} | Matéria: {item.get('itemname')} | Nota: {item.get('gradeformatted')}")
                        
                        # AQUI: Inserir logica para salvar no DataFrame ou Supabase
                        # Ex: INSERT INTO ml_notas_academicas (user_id, item_name, nota) ...

                # 3. Monitoramento e Evasão (Atrasos)
                # Chamada de status de conclusão para cada aluno
                status = extract_student_activities(course_id, user_id)
                # AQUI: Inserir lógicas para ler status['statuses'] e contar atrasadas

    print("🏁 Pipeline ETL finalizado.")

if __name__ == "__main__":
    run_etl_pipeline()
