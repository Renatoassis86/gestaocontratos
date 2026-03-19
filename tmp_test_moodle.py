import requests

MOODLE_TOKEN = "71edd081c7e0c5bb83f872b60af80227"
MOODLE_URL = "https://ead.cidadeviva.org/webservice/rest/server.php"

def moodle_request(wsfunction, params={}):
    payload = {
        **params,
        "wstoken": MOODLE_TOKEN,
        "moodlewsrestformat": "json",
        "wsfunction": wsfunction
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post(MOODLE_URL, data=payload, headers=headers)
    return response.json()

# 1. Listar Cursos
print("--- CURSOS ---")
courses = moodle_request("core_course_get_courses")
print(courses)
