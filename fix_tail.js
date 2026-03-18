const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'templates', 'novo', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const target1 = `            </div>

          </div>
        )}
 </button>
              </div>
            </div>

          </div>
        )}`;

const target2 = `            </div>
 
           </div>
         )}
  </button>
               </div>
             </div>
 
           </div>
         )}`;

const replacement = `            </div>

          </div>
        )}`;

if (content.includes(target1)) {
    content = content.replace(target1, replacement);
    console.log("Replaced target1");
} else if (content.includes(target2)) {
    content = content.replace(target2, replacement);
    console.log("Replaced target2");
} else {
    console.log("Target not found exactly. Trying smaller tail cut.");
    // Let's just crop to where it ends or fix it manually with node
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Done");
