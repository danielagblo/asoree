const API_URL = 'https://open.er-api.com/v6/latest/USD'
const CACHE_TTL = 5 * 60 * 1000
const FALLBACK_RATE = 15.5

let cached: { rate: number; timestamp: number } | null = null

export async function getUsdToGhsRate(): Promise<number> {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.rate
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(API_URL, { signal: controller.signal })
    clearTimeout(timeout)

    if (!res.ok) return FALLBACK_RATE

    const data = (await res.json()) as { rates: Record<string, number> }
    const rate = data.rates?.GHS
    if (!rate) return FALLBACK_RATE

    cached = { rate, timestamp: Date.now() }
    return rate
  } catch {
    return FALLBACK_RATE
  }
}
