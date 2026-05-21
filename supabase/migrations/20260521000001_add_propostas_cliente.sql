-- =====================================================================
-- Tabela: propostas_cliente
-- Acesso de clientes para visualizar propostas comerciais
-- hospedadas como apresentações Gamma (gamma.app) via iframe.
--
-- Login = slug (texto), Senha = texto puro (acesso soft-gate,
-- não usa Supabase Auth — validação feita por server action).
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.propostas_cliente (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text NOT NULL UNIQUE,           -- login (ex: 'acme-corp')
  senha         text NOT NULL,                  -- ex: 'acme-corp123'
  nome_empresa  text NOT NULL,                  -- exibido na apresentação
  gamma_url     text NOT NULL,                  -- URL pública/embed do Gamma
  ativa         boolean NOT NULL DEFAULT true,
  observacoes   text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_propostas_cliente_slug
  ON public.propostas_cliente (slug)
  WHERE ativa = true;

-- RLS: bloqueia acesso direto via API anon.
-- A validação de login passa pela service role no server action.
ALTER TABLE public.propostas_cliente ENABLE ROW LEVEL SECURITY;

-- Sem políticas permissivas → leitura/escrita só via service role
-- (chave usada do lado do servidor).

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at_propostas_cliente()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_propostas_cliente_updated_at ON public.propostas_cliente;
CREATE TRIGGER trg_propostas_cliente_updated_at
  BEFORE UPDATE ON public.propostas_cliente
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_propostas_cliente();

-- =====================================================================
-- RPC: validar_login_proposta
-- Permite que o cliente anônimo valide o login (slug + senha) sem
-- precisar de leitura direta da tabela. Retorna o registro se válido.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.validar_login_proposta(
  p_slug  text,
  p_senha text
)
RETURNS TABLE (
  slug          text,
  nome_empresa  text,
  gamma_url     text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT slug, nome_empresa, gamma_url
  FROM public.propostas_cliente
  WHERE slug = p_slug
    AND senha = p_senha
    AND ativa = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.validar_login_proposta(text, text) TO anon, authenticated;

-- =====================================================================
-- RPC: obter_proposta_por_slug
-- Usada após o login (com base no cookie do servidor) para reidratar
-- os dados da apresentação. Retorna apenas dados não-sensíveis.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.obter_proposta_por_slug(p_slug text)
RETURNS TABLE (
  slug          text,
  nome_empresa  text,
  gamma_url     text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT slug, nome_empresa, gamma_url
  FROM public.propostas_cliente
  WHERE slug = p_slug
    AND ativa = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.obter_proposta_por_slug(text) TO anon, authenticated;

-- Seed exemplo (remova ou edite):
-- INSERT INTO public.propostas_cliente (slug, senha, nome_empresa, gamma_url)
-- VALUES ('cliente-demo', 'cliente-demo123', 'Cliente Demo Ltda',
--         'https://gamma.app/embed/abc123');
