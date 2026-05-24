-- =====================================================================
-- Seed dos dados setoriais do dashboard Mevos
-- Capturados manualmente em mai/2026 a partir das publicações oficiais
-- de ANFAVEA, FENABRAVE, SindiPeças, CNI e DIEESE.
--
-- Próxima atualização: rodar parsers automáticos (Fase 2) ou re-rodar
-- este seed manualmente quando novas publicações sairem.
-- =====================================================================

-- ─── ANFAVEA — Produção mensal de veículos (jan-abr/2026) ────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('ANFAVEA', 'producao_total_veiculos', 'automotivo', '2026-01',
   '{"unidades": 159600, "yoy_pct": -12.0, "mom_pct": -13.5, "unit": "unidades"}'::jsonb,
   'https://anfavea.com.br/site/wp-content/uploads/2026/01/Release-Janeiro-2026-final.pdf'),
  ('ANFAVEA', 'producao_total_veiculos', 'automotivo', '2026-02',
   '{"unidades": 204300, "yoy_pct": -8.2,  "mom_pct": 24.9, "unit": "unidades"}'::jsonb,
   'https://anfavea.com.br/site/wp-content/uploads/2026/02/Release-Fevereiro-2026.pdf'),
  ('ANFAVEA', 'producao_total_veiculos', 'automotivo', '2026-03',
   '{"unidades": 264100, "yoy_pct": 35.6, "mom_pct": 27.6, "unit": "unidades", "destaque": "melhor março desde 2018"}'::jsonb,
   'https://anfavea.com.br/site/press-releases-3/'),
  ('ANFAVEA', 'producao_total_veiculos', 'automotivo', '2026-04',
   '{"unidades": 238498, "yoy_pct": 2.44, "mom_pct": -9.5, "unit": "unidades", "nota": "menor nº dias úteis"}'::jsonb,
   'https://anfavea.com.br/site/press-releases-3/');

-- ─── ANFAVEA — Resumo YTD 2026 ────────────────────────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('ANFAVEA', 'producao_ytd', 'automotivo', '2026',
   '{"acumulado_unidades": 872000, "vs_2025_pct": 4.9, "projecao_anual_pct": 3.7}'::jsonb,
   'https://anfavea.com.br/site/press-releases-3/');

-- ─── ANFAVEA — Licenciamento mensal ──────────────────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('ANFAVEA', 'licenciamento_veiculos', 'automotivo', '2026-03',
   '{"unidades": 269500, "yoy_pct": 37.8, "destaque": "maior março desde 2013"}'::jsonb,
   'https://anfavea.com.br/site/press-releases-3/'),
  ('ANFAVEA', 'licenciamento_veiculos', 'automotivo', '2026-04',
   '{"unidades": 248300, "yoy_pct": 19.0, "media_diaria": 12400, "share_eletrificados_pct": 18.3, "destaque": "melhor abril em 12 anos"}'::jsonb,
   'https://anfavea.com.br/site/press-releases-3/');

-- ─── ANFAVEA — Comércio exterior de veículos ─────────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('ANFAVEA', 'comercio_exterior_veiculos', 'automotivo', '2026-03',
   '{"exportacao_unidades": 40400, "importacao_unidades": 47300, "export_yoy_pct": 1.1, "import_yoy_pct": 25.7, "export_mom_pct": 21.1, "import_mom_pct": 40.0}'::jsonb,
   'https://anfavea.com.br/site/press-releases-3/');

-- ─── FENABRAVE — Emplacamentos mensais ───────────────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('FENABRAVE', 'emplacamentos_total', 'automotivo', '2026-03',
   '{"unidades": 513099, "autos_comerciais_leves": 258233, "autos_leves_yoy_pct": 40.23}'::jsonb,
   'https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos'),
  ('FENABRAVE', 'emplacamentos_total', 'automotivo', '2026-04',
   '{"unidades": 479600}'::jsonb,
   'https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos'),
  ('FENABRAVE', 'emplacamentos_ytd', 'automotivo', '2026-Q1',
   '{"acumulado_unidades": 1254696}'::jsonb,
   'https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos');

-- ─── FENABRAVE — Top 10 modelos abril/2026 ───────────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('FENABRAVE', 'top_modelos', 'automotivo', '2026-04',
   '{"ranking": [
     {"pos": 1, "modelo": "Fiat Strada",        "unidades": 14905},
     {"pos": 2, "modelo": "Volkswagen Polo",    "unidades": 8367},
     {"pos": 3, "modelo": "Fiat Argo",          "unidades": 7991},
     {"pos": 4, "modelo": "Chevrolet Onix",     "unidades": 7847},
     {"pos": 5, "modelo": "Volkswagen T-Cross", "unidades": null},
     {"pos": 6, "modelo": "Hyundai Creta",      "unidades": 4415},
     {"pos": 7, "modelo": "Hyundai HB20",       "unidades": 4161},
     {"pos": 8, "modelo": "Volkswagen Saveiro", "unidades": null},
     {"pos": 9, "modelo": "Fiat Toro",          "unidades": null},
     {"pos": 10,"modelo": "Toyota Hilux",       "unidades": null}
   ], "destaque_byd": ["Dolphin Mini","Song","Dolphin"]}'::jsonb,
   'https://www.fenabrave.org.br/portalv2/Conteudo/emplacamentos');

-- ─── SindiPeças — Setor autopeças (anual + projeções) ────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('SINDIPECAS', 'setor_autopecas_brasil', 'automotivo', '2025',
   '{"faturamento_R_bi": 275.8, "investimentos_R_bi": 6.6, "mix_canal_pct": {"montadoras": 63.2, "reposicao": 21.6, "exportacao": 12.8, "outros": 2.4}}'::jsonb,
   'https://www.virapagina.com.br/sindipecas2025/'),
  ('SINDIPECAS', 'setor_autopecas_brasil', 'automotivo', '2026',
   '{"faturamento_proj_R_bi": 286.8, "crescimento_proj_pct": 4.0, "investimentos_proj_R_bi": 6.6, "balanca_comercial_proj_US_bi": {"deficit": -16.8, "var_vs_2025_pct": 11.2, "exportacao_var_pct": -6.1, "importacao_var_pct": 5.0}}'::jsonb,
   'https://www.virapagina.com.br/sindipecas2025/');

-- ─── CNI — Indicadores indústria de transformação ────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('CNI', 'indicadores_industria_transformacao', 'producao', '2026-03',
   '{"uci_pct": 77.8, "uci_var_mom_pp": 0.3, "faturamento_industria_mom_pct": 3.8, "setores_destaque": ["petróleo","químicos","metalurgia","máquinas"]}'::jsonb,
   'https://www.portaldaindustria.com.br/estatisticas/indicadores-industriais/'),
  ('CNI', 'icei', 'macro', '2026-05',
   '{"valor_pts": 47.2, "var_mom_pts": 2.0, "interpretacao": "abaixo de 50 indica falta de confiança"}'::jsonb,
   'https://www.portaldaindustria.com.br/estatisticas/icei-indice-de-confianca-do-empresario-industrial/');

-- ─── DIEESE — Convenção Metalúrgicos SP/Mogi 2025 ────────────────────
INSERT INTO public.mevos_dados_setoriais (fonte, metrica, categoria, periodo, payload, url_origem) VALUES
  ('DIEESE', 'convencao_metalurgicos_sp', 'custos', '2025-11',
   '{"reajuste_total_pct": 5.74, "inpc_12m_componente_pct": 4.54, "aumento_real_pct": 1.20, "piso_ate_250_empregados_R": 1980.00, "piso_acima_250_empregados_R": 2669.00, "abono_pct": 13.50, "vigencia_inicio": "2025-11-01", "inpc_acumulado_set25_fev26_pct": 1.75}'::jsonb,
   'https://www.dieese.org.br/boletimnegociacao/');
