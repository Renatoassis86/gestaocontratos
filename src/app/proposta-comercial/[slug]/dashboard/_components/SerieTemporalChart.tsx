'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import styles from '../_styles.module.css'

interface PontoChart {
  data: string
  valor: number
}

interface Props {
  pontos: PontoChart[]
  cor?: string
  unidade?: string
  ariaLabel?: string
}

function formatMesAno(iso: string): string {
  const [y, m] = iso.split('-')
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
  return `${meses[Number(m) - 1]}/${y.slice(2)}`
}

function formatValorBr(v: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(v)
}

export function SerieTemporalChart({
  pontos,
  cor = '#C8F542',
  unidade = '',
  ariaLabel = 'Gráfico de série temporal',
}: Props) {
  const dados = pontos.map((p) => ({ x: formatMesAno(p.data), v: p.valor }))

  return (
    <div className={styles.chartArea} aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dados} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cor} stopOpacity={0.35} />
              <stop offset="100%" stopColor={cor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1F242D" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="x"
            tick={{ fill: '#8A8F99', fontSize: 11 }}
            axisLine={{ stroke: '#1F242D' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8A8F99', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={48}
            tickFormatter={(v) => formatValorBr(Number(v))}
          />
          <Tooltip
            contentStyle={{
              background: '#0D0E12',
              border: '1px solid #272D38',
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: '#8A8F99', fontWeight: 600 }}
            itemStyle={{ color: '#F4F2ED' }}
            formatter={(v) => [`${formatValorBr(Number(v))} ${unidade}`.trim(), '']}
            separator=""
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={cor}
            strokeWidth={2}
            fill="url(#fillArea)"
            dot={false}
            activeDot={{ r: 4, fill: cor }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
