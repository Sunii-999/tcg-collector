// scripts/fillSupabase.ts
import fetch from 'node-fetch'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use service role key for server-side writes
)

const API_BASE = 'https://api.pokemontcg.io/v2'

async function main() {
  // 1️⃣ Fetch sets
  const setsRes = await fetch(`${API_BASE}/sets`)
  const setsData = await setsRes.json()
  const sets = setsData.data

  for (const set of sets) {
    // 2️⃣ Insert series
    const { data: seriesData } = await supabase
      .from('series')
      .upsert({ name: set.series, release_date: set.releaseDate }, { onConflict: 'name' })
      .select('series_id')
      .single()
    const seriesId = seriesData.series_id

    // 3️⃣ Insert set
    const { data: setData } = await supabase
      .from('sets')
      .upsert({
        code: set.id,
        name: set.name,
        series_id: seriesId,
        release_date: set.releaseDate,
        total_cards: set.total,
        logo_url: set.images?.logo || null
      }, { onConflict: 'code' })
      .select('set_id')
      .single()
    const setId = setData.set_id

    // 4️⃣ Fetch all cards in this set
    let page = 1
    let cards: any[] = []
    while (true) {
      const res = await fetch(`${API_BASE}/cards?q=set.id:${set.id}&page=${page}&pageSize=250`)
      const data = await res.json()
      if (!data.data || data.data.length === 0) break
      cards.push(...data.data)
      page++
    }

    for (const card of cards) {
      const cardId = uuidv4() // Generate UUID for this card
      const types = card.types || []
      const hp = card.hp ? parseInt(card.hp) : null
      const rarity = card.rarity || null

      // 5️⃣ Insert card
      await supabase.from('cards').upsert({
        card_id: cardId,
        set_id: setId,
        card_number: card.number,
        name: card.name,
        supertype: card.supertype,
        subtype: card.subtypes?.join(', ') || null,
        rarity,
        types,
        hp,
        image_url: card.images.large,
        illustrator_id: card.artist || null,
        api_id: card.id, // store Pokémon API id for mapping
        market_price: card.tcgplayer?.prices?.normal?.market || null
      })

      // 6️⃣ Insert prices
      const priceSources = ['tcgplayer', 'cardmarket'] as const
      for (const source of priceSources) {
        const priceData = card[source]?.prices
        if (!priceData) continue

        await supabase.from('card_prices').upsert({
          card_id: cardId,
          source,
          low_price: priceData.normal?.low || null,
          mid_price: priceData.normal?.mid || null,
          high_price: priceData.normal?.high || null,
          market_price: priceData.normal?.market || null,
          direct_low_price: priceData.normal?.directLow || null,
          currency: 'USD'
        })
      }
    }
  }

  console.log('Supabase database populated successfully!')
}

main().catch(console.error)
