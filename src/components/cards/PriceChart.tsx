// src/components/PriceChart.tsx
'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceChartProps {
  prices: { last_updated: string; market_price: number }[]
}

export default function PriceChart({ prices }: PriceChartProps) {
  const data = prices.map((p) => ({
    date: new Date(p.last_updated).toLocaleDateString(),
    price: p.market_price,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Line type="monotone" dataKey="price" stroke="#34d399" />
      </LineChart>
    </ResponsiveContainer>
  )
}
