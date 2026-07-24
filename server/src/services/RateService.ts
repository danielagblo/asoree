const API_URL = 'https://open.er-api.com/v6/latest/USD'
const CACHE_TTL = 5 * 60 * 1000

let cached: { rate: number; timestamp: number } | null = null

export async function getUsdToGhsRate(): Promise<number> {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.rate
  }

  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch exchange rate')

  const data = (await res.json()) as { rates: Record<string, number> }
  const rate = data.rates?.GHS
  if (!rate) throw new Error('GHS rate not found in response')

  cached = { rate, timestamp: Date.now() }
  return rate
}
