import sys

try:
    import PyPDF2
    print("PyPDF2 is installed!")
    reader = PyPDF2.PdfReader('6 - IEEE_2024_SWEBOK_4.pdf')
    text = ""
    for i in range(min(50, len(reader.pages))):
        text += reader.pages[i].extract_text() + "\n"
    with open('swebok_intro.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("✅ SWEBOK PDF text extracted (PyPDF2)!")
except Exception as e:
    print(f"PyPDF2 error: {e}")
    try:
        import pdfplumber
        print("pdfplumber is installed!")
        with pdfplumber.open('6 - IEEE_2024_SWEBOK_4.pdf') as pdf:
            text = ""
            for i in range(min(50, len(pdf.pages))):
                text += pdf.pages[i].extract_text() + "\n"
        with open('swebok_intro.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print("✅ SWEBOK PDF text extracted (pdfplumber)!")
    except Exception as e2:
        print(f"pdfplumber error: {e2}")
