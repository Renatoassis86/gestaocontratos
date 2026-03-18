import sys

path = r'd:\repositorio_geral\app_gestao_contratos\src\app\dashboard\templates\novo\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """            </div>

          </div>
        )}
 </button>
              </div>
            </div>

          </div>
        )}

      </div>"""

replacement = """            </div>

          </div>
        )}

      </div>"""

if target in content:
    content = content.replace(target, replacement)
elif """            </div>
 
           </div>
         )}
  </button>
               </div>
             </div>
 
           </div>
         )}
 
       </div>""" in content:
    content = content.replace("""            </div>
 
           </div>
         )}
  </button>
               </div>
             </div>
 
           </div>
         )}
 
       </div>""", """            </div>

          </div>
        )}

      </div>""")
else:
    print("Could not find exact string")
    sys.exit(1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
