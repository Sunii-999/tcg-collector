import { ICard } from '@/types/pokemon'

const BASE_URL = 'https://api.pokemontcg.io/v2'

export async function getAllCards(
  page: number = 1,
  pageSize: number = 20,
  filters: Record<string, string | number> = {}
): Promise<ICard[]> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  // Add filters (like name)
  for (const [key, value] of Object.entries(filters)) {
    params.append(key, String(value))
  }

  const res = await fetch(`${BASE_URL}/cards?${params}`, {
    next: { revalidate: 3600 },
  })

  // ✅ If 404, return empty list instead of error
  if (res.status === 404) {
    console.warn('No cards found for query:', params.toString())
    return []
  }

  if (!res.ok) {
    const errText = await res.text()
    console.error('Pokémon API Error:', res.status, errText)
    throw new Error('Failed to fetch cards')
  }

  const data = await res.json()
  return data.data as ICard[]
}

export async function getCardById(id: string): Promise<ICard> {
  const res = await fetch(`${BASE_URL}/cards/${id}`, {
    headers: { 'X-Api-Key': process.env.POKEMON_API_KEY ?? '' },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Card not found')

  const data = await res.json()
  return data.data as ICard
}

export async function getFeaturedCards(limit: number = 3): Promise<ICard[]> {
  const res = await fetch(`${BASE_URL}/cards?page=1&pageSize=50`, {
    headers: { 'X-Api-Key': process.env.POKEMON_API_KEY ?? '' },
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error('Failed to fetch featured cards')

  const data = await res.json()
  const cards = data.data as ICard[]
  return cards.slice(0, limit)
}
