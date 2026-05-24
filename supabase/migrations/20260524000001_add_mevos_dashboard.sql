-- =====================================================================
-- Dashboard premium do Grupo Mevos (cliente do ramo metalúrgico)
-- Tabelas + RPCs que alimentam /proposta-comercial/mevos/dashboard
--
-- Padrão de acesso: gate de cookie 'proposta_session' fica no Next.js
-- (Server Component). RPCs são SECURITY DEFINER, abertas a anon, mas
-- assumem que o slug 'mevos' já foi validado upstream.
-- =====================================================================

-- ─────────────────────────────────────────────────────────────────────
-- 1. Catálogo de séries temporais (BCB / IBGE / IPEA)
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mevos_series_catalogo (
  id            text PRIMARY KEY,           -- ex: 'bcb-sgs-1', 'ibge-8888-12606-129333'
  fonte         text NOT NULL,              -- 'BCB' | 'IBGE' | 'IPEA' | 'COMEXSTAT'
  fonte_ref     text NOT NULL,              -- código original na fonte
  nome          text NOT NULL,              -- 'USD venda comercial'
  unidade       text NOT NULL,              -- 'R$', '%', 'índice 2022=100', 'unidades'
  categoria     text NOT NULL,              -- 'macro' | 'producao' | 'automotivo' | 'custos'
  periodicidade text NOT NULL,              -- 'diaria' | 'mensal' | 'trimestral' | 'anual'
  descricao     text,
  ativa         boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mevos_catalogo_categoria
  ON public.mevos_series_catalogo (categoria) WHERE ativa = true;

-- ─────────────────────────────────────────────────────────────────────
-- 2. Pontos das séries (TODA série temporal vai pra cá)
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mevos_series_pontos (
  serie_id   text NOT NULL REFERENCES public.mevos_series_catalogo(id) ON DELETE CASCADE,
  data_ref   date NOT NULL,
  valor      numeric NOT NULL,
  PRIMARY KEY (serie_id, data_ref)
);

CREATE INDEX IF NOT EXISTS idx_mevos_pontos_serie_data
  ON public.mevos_series_pontos (serie_id, data_ref DESC);

-- ─────────────────────────────────────────────────────────────────────
-- 3. Dados setoriais estruturados (ANFAVEA, FENABRAVE, SindiPeças, CNI…)
--    Cada linha = 1 snapshot publicado por uma associação
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mevos_dados_setoriais (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fonte       text NOT NULL,            -- 'ANFAVEA' | 'FENABRAVE' | 'SINDIPECAS' | 'CNI' | 'DIEESE'
  metrica     text NOT NULL,            -- 'producao_total_veiculos', 'emplacamentos', etc
  categoria   text NOT NULL,            -- 'automotivo' | 'producao' | 'custos'
  periodo     text,                     -- '2026-04' (mensal) | '2026' (anual) | '2026-Q1'
  payload     jsonb NOT NULL,           -- estrutura livre da publicação
  url_origem  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mevos_setoriais_metrica_periodo
  ON public.mevos_dados_setoriais (metrica, periodo DESC);

CREATE INDEX IF NOT EXISTS idx_mevos_setoriais_categoria
  ON public.mevos_dados_setoriais (categoria);

-- ─────────────────────────────────────────────────────────────────────
-- 4. Log de execuções do ETL (auditoria + diagnóstico)
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mevos_etl_log (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serie_id            text REFERENCES public.mevos_series_catalogo(id),
  executado_em        timestamptz NOT NULL DEFAULT now(),
  registros_inseridos integer DEFAULT 0,
  status              text NOT NULL,    -- 'sucesso' | 'erro' | 'parcial'
  erro_msg            text,
  duracao_ms          integer
);

CREATE INDEX IF NOT EXISTS idx_mevos_etl_log_serie_exec
  ON public.mevos_etl_log (serie_id, executado_em DESC);

-- ─────────────────────────────────────────────────────────────────────
-- RLS — tudo bloqueado por padrão; acesso só via RPC
-- ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.mevos_series_catalogo  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mevos_series_pontos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mevos_dados_setoriais  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mevos_etl_log          ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────────
-- RPC: obter_serie_mevos
--   Retorna pontos de uma série, opcionalmente limitados a um período.
--   Gate de autenticação fica no Server Component (cookie proposta_session).
-- ─────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.obter_serie_mevos(
  p_serie_id     text,
  p_data_inicio  date DEFAULT NULL,
  p_data_fim     date DEFAULT NULL,
  p_limit        integer DEFAULT 120
)
RETURNS TABLE (
  data_ref date,
  valor    numeric
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT data_ref, valor
  FROM public.mevos_series_pontos
  WHERE serie_id = p_serie_id
    AND (p_data_inicio IS NULL OR data_ref >= p_data_inicio)
    AND (p_data_fim    IS NULL OR data_ref <= p_data_fim)
  ORDER BY data_ref DESC
  LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.obter_serie_mevos(text, date, date, integer)
  TO anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────
-- RPC: listar_series_catalogo
--   Lista séries disponíveis (opcionalmente filtradas por categoria)
-- ─────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.listar_series_catalogo(
  p_categoria text DEFAULT NULL
)
RETURNS TABLE (
  id            text,
  fonte         text,
  nome          text,
  unidade       text,
  categoria     text,
  periodicidade text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, fonte, nome, unidade, categoria, periodicidade
  FROM public.mevos_series_catalogo
  WHERE ativa = true
    AND (p_categoria IS NULL OR categoria = p_categoria)
  ORDER BY categoria, nome;
$$;

GRANT EXECUTE ON FUNCTION public.listar_series_catalogo(text)
  TO anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────
-- RPC: obter_dados_setoriais
--   Retorna últimos snapshots de uma métrica setorial (ANFAVEA etc)
-- ─────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.obter_dados_setoriais(
  p_metrica   text DEFAULT NULL,
  p_categoria text DEFAULT NULL,
  p_limit     integer DEFAULT 24
)
RETURNS TABLE (
  fonte      text,
  metrica    text,
  categoria  text,
  periodo    text,
  payload    jsonb,
  url_origem text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT fonte, metrica, categoria, periodo, payload, url_origem
  FROM public.mevos_dados_setoriais
  WHERE (p_metrica   IS NULL OR metrica   = p_metrica)
    AND (p_categoria IS NULL OR categoria = p_categoria)
  ORDER BY periodo DESC NULLS LAST, created_at DESC
  LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.obter_dados_setoriais(text, text, integer)
  TO anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────
-- Seed inicial do catálogo (séries que vamos rastrear)
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO public.mevos_series_catalogo (id, fonte, fonte_ref, nome, unidade, categoria, periodicidade, descricao) VALUES
  -- BCB — usadas direto on-demand, catalogadas aqui para histórico
  ('bcb-sgs-1',     'BCB',  '1',     'USD venda comercial',         'R$',    'macro',     'diaria',  'Cotação de venda do dólar comercial'),
  ('bcb-sgs-21619', 'BCB',  '21619', 'EUR venda comercial',         'R$',    'macro',     'diaria',  'Cotação de venda do euro'),
  ('bcb-sgs-432',   'BCB',  '432',   'Meta Selic',                  '% a.a.','macro',     'diaria',  'Meta para a taxa Selic'),
  ('bcb-sgs-4189',  'BCB',  '4189',  'Selic acumulada 12 meses',    '% a.a.','macro',     'mensal',  'Selic acumulada nos últimos 12 meses'),
  ('bcb-sgs-433',   'BCB',  '433',   'IPCA variação mensal',        '%',     'macro',     'mensal',  'Índice Nacional de Preços ao Consumidor Amplo'),
  ('bcb-sgs-13522', 'BCB',  '13522', 'IPCA-15 variação mensal',     '%',     'macro',     'mensal',  'IPCA-15 (prévia mensal)'),
  ('bcb-sgs-189',   'BCB',  '189',   'IGP-M variação mensal',       '%',     'macro',     'mensal',  'Índice Geral de Preços do Mercado FGV'),
  ('bcb-sgs-28503', 'BCB',  '28503', 'PIM-PF Indústria geral 12m',  'índice','producao',  'mensal',  'Produção industrial acumulada 12 meses'),
  ('bcb-sgs-24364', 'BCB',  '24364', 'Saldo crédito à Indústria',   'R$ bi', 'macro',     'mensal',  'Estoque de crédito à indústria de transformação'),
  -- IBGE — séries que vão para o ETL
  ('ibge-8888-12606-129333', 'IBGE', '8888|12606|544[129333]', 'PIM-PF Metalurgia (CNAE 24)',             'índice 2022=100', 'producao',  'mensal', 'Produção física da metalurgia'),
  ('ibge-8888-12606-129334', 'IBGE', '8888|12606|544[129334]', 'PIM-PF Produtos de metal (CNAE 25)',      'índice 2022=100', 'producao',  'mensal', 'Produção física de produtos de metal'),
  ('ibge-8888-12606-129338', 'IBGE', '8888|12606|544[129338]', 'PIM-PF Veículos automotores (CNAE 29)',   'índice 2022=100', 'automotivo','mensal', 'Produção física de veículos'),
  ('ibge-8888-12606-129314', 'IBGE', '8888|12606|544[129314]', 'PIM-PF Indústria geral',                  'índice 2022=100', 'producao',  'mensal', 'Produção física da indústria geral')
ON CONFLICT (id) DO NOTHING;
