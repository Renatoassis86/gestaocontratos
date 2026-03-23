import sys
p = "d:/repositorio_geral/app_gestao_contratos/src/components/CompetidoresSeccion.tsx"
f = open(p, "r", encoding="utf-8")
c = f.read()
f.close()

# 1. Update Top companies list
top_search = """  const empresas = [
    { name: 'Netflix', logo: '/netflix_logo_final_1774226938106.png' },
    { name: 'Amazon', logo: '/amazon_logo_1774226927016.png' },
    { name: 'Capital One', logo: '/capital_one_logo_1774226915516.png' },
    { name: 'Google', logo: '/google_logo_1774223514822.png' },
    { name: 'Walmart', logo: '/walmart_logo_wm_1774224400966.png' },
    { name: 'UPS', logo: '/ups_logo_1774225354790.png' },
    { name: 'LinkedIn', logo: '/linkedin_logo_1774226742798.png' },
    { name: 'Progressive', logo: '/progressive_logo_1774226810879.png' },
    { name: 'Caesars', logo: '/caesars.png' },
    { name: 'Patriots', logo: '/patriots.png' }
  ]"""

top_replace = """  const empresas = [
    { name: 'Netflix', logo: '/logos/netflix.png' },
    { name: 'Amazon', logo: '/logos/amazon.png' },
    { name: 'Capital One', logo: '/logos/capital_one.png' },
    { name: 'Google', logo: '/logos/google.png' },
    { name: 'Walmart', logo: '/logos/walmart.png' },
    { name: 'UPS', logo: '/logos/ups.png' },
    { name: 'Progressive', logo: '/logos/progressive.png' },
    { name: 'Caesars', logo: '/logos/caesars.png' },
    { name: 'Patriots', logo: '/logos/patriots.png' }
  ]"""

if top_search in c:
    c = c.replace(top_search, top_replace)
    print("Top list replaced")
else:
    print("Top search not found exactly")

# 2. Update Netflix Opacity
net_search = """          {/* Background Video Iframe */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1, overflow: 'hidden' }}>"""

net_replace = """          {/* Background Video Iframe */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.45, overflow: 'hidden' }}>"""

if net_search in c:
    c = c.replace(net_search, net_replace)
    print("Netflix opacity replaced")
else:
    print("Netflix search not found")

# 3. Update Lower Grid array and layout nodes sizing setups Index layout
grid_search = """              {[
                { name: 'Amazon', logo: '/amazon_logo_1774226927016.png', text: 'Utiliza técnicas avançadas de otimização em tempo real e aprendizado de máquina em toda a sua cadeia de suprimentos para gerenciar estoques com base na incerteza da demanda.' },
                { name: 'Capital One', logo: '/capital_one_logo_1774226915516.png', text: 'Pioneira em "estratégias baseadas em informações", conduz cerca de 8.000 testes de marketing por ano para atrair clientes lucrativos com precisão.' },
                { name: 'Google', logo: '/google_logo_1774223514822.png', text: 'Aplica o rigor analítico a algoritmos de busca e ao "People Operations", utilizando ciência de dados para formar melhores líderes e estratégias de retenção.' },
                { name: 'Walmart', logo: '/walmart_logo_wm_1774224400966.png', text: 'Referência em supply-chain, compartilha dados em tempo real com 60 mil fornecedores via Retail Link, prevendo demandas sazonais ou atípicas (como furacões).' },
                { name: 'UPS', logo: '/ups_logo_1774225354790.png', text: 'Investiu no sistema ORION, que otimiza rotas de 55 mil motoristas diariamente, gerando economia de centenas de milhões de dólares ao ano em combustível.' },
                { name: 'Caesars Entertainment', logo: '/caesars_logo_1774222462389.png', text: 'Revolucionou o setor de cassinos fidelizando clientes por meio de análise de dados no ponto de venda para ofertas personalizadas em tempo real.' },
                { name: 'Progressive', logo: '/progressive_logo_1774226810879.png', text: 'Destaca-se pelo program Snapshot, precificando seguros dinamicamente ao coletar dados reais sobre como o cliente dirige (velocidade, freadas).' },
                { name: 'Times Esportivos (Patriots)', logo: '/patriots_logo_final_1774222536717.png', text: 'Patriots e Oakland A\'s utilizam estatística avançada para montar equipes e definir jogadas, avaliando a psicologia e força mental dos atletas.' }
              ].map((c) => (
                 <div key={c.name} style={{ background: '#111318', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <img src={c.logo} style={{ height: '32px', width: 'fit-content', filter: 'brightness(0) invert(1)', opacity: 0.8, objectFit: 'contain' }} alt={c.name} />"""

grid_replace = """              {[
                { name: 'Amazon', logo: '/logos/amazon.png', text: 'Utiliza técnicas avançadas de otimização em tempo real e aprendizado de máquina em toda a sua cadeia de suprimentos para gerenciar estoques com base na incerteza da demanda.' },
                { name: 'Capital One', logo: '/logos/capital_one.png', text: 'Pioneira em "estratégias baseadas em informações", conduz cerca de 8.000 testes de marketing por ano para atrair clientes lucrativos com precisão.' },
                { name: 'Google', logo: '/logos/google.png', text: 'Aplica o rigor analítico a algoritmos de busca e ao "People Operations", utilizando ciência de dados para formar melhores líderes e estratégias de retenção.' },
                { name: 'Walmart', logo: '/logos/walmart.png', text: 'Referência em supply-chain, compartilha dados em tempo real com 60 mil fornecedores via Retail Link, prevendo demandas sazonais ou atípicas (como furacões).' },
                { name: 'UPS', logo: '/logos/ups.png', text: 'Investiu no sistema ORION, que otimiza rotas de 55 mil motoristas diariamente, gerando economia de centenas de milhões de dólares ao ano em combustível.' },
                { name: 'Caesars Entertainment', logo: '/logos/caesars.png', text: 'Revolucionou o setor de cassinos fidelizando clientes por meio de análise de dados no ponto de venda para ofertas personalizadas em tempo real.' },
                { name: 'Progressive', logo: '/logos/progressive.png', text: 'Destaca-se pelo program Snapshot, precificando seguros dinamicamente ao coletar dados reais sobre como o cliente dirige (velocidade, freadas).' },
                { name: 'Times Esportivos (Patriots)', logo: '/logos/patriots.png', text: 'Patriots e Oakland A\'s utilizam estatística avançada para montar equipes e definir jogadas, avaliando a psicologia e força mental dos atletas.' }
              ].map((c) => (
                 <div key={c.name} style={{ background: '#111318', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <img src={c.logo} style={{ height: '32px', width: 'fit-content', opacity: 0.8, objectFit: 'contain' }} alt={c.name} />"""

if grid_search in c:
    c = c.replace(grid_search, grid_replace)
    print("Grid replaced")
else:
    print("Grid search not found")

f = open(p, "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
