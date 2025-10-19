import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// ---------------- Env ----------------
const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!
const POKEMONTCG_API_KEY = process.env.POKEMONTCG_API_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) throw new Error('Supabase env variables not set')
if (!POKEMONTCG_API_KEY) throw new Error('POKEMONTCG_API_KEY env variable not set')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
const API_BASE = 'https://api.pokemontcg.io/v2'

// ---------------- Types ----------------
type PokemonSet = {
  id: string
  name: string
  series: string
  releaseDate: string
  total: number
  images?: { logo?: string }
}

type PokemonCard = {
  id: string
  name: string
  supertype: string
  subtypes?: string[]
  hp?: string
  types?: string[]
  number: string
  rarity?: string
  artist?: string
  images: { large: string; small?: string }
  tcgplayer?: {
    prices?: {
      normal?: {
        low?: number
        mid?: number
        high?: number
        market?: number
        directLow?: number
      }
    }
  }
}

// ---------------- Helpers ----------------
async function fetchJSON(url: string) {


async function fetchCardsForSet(setId: string): Promise<PokemonCard[]> {
  const url = `${API_BASE}/cards?q=${encodeURIComponent(`{"set.id":"${setId}"}`)}&pageSize=250`
  const data = await fetchJSON(url)
  return data?.data ?? []
}

// ---------------- Main ----------------
async function main() {
  console.log('📦 Fetching all sets...')
  const setsData = await fetchJSON(`${API_BASE}/sets`)
  if (!setsData || !setsData.data) return console.error('❌ Failed to fetch sets')

  const sets: PokemonSet[] = setsData.data

  for (const set of sets) {
    console.log(`\n📦 Processing set: ${set.name} (${set.id})`)

    // 1️⃣ Series
    console.log(`🔹 Checking if series "${set.series}" exists...`)
    const { data: seriesData } = await supabase
      .from('series')
      .select('series_id')
      .eq('name', set.series)
      .maybeSingle()

    const seriesId = seriesData?.series_id ?? uuidv4()
    if (!seriesData) {
      console.log(`🆕 Creating series "${set.series}"`)
      await supabase.from('series').insert({
        series_id: seriesId,
        name: set.series,
        release_date: set.releaseDate
      })
    } else {
      console.log(`✅ Series exists: ${set.series} (${seriesId})`)
    }

    // 2️⃣ Set
    console.log(`🔹 Checking if set "${set.name}" exists...`)
    const { data: setData } = await supabase
      .from('sets')
      .select('set_id')
      .eq('code', set.id)
      .maybeSingle()

    const setId = setData?.set_id ?? uuidv4()
    if (!setData) {
      console.log(`🆕 Creating set "${set.name}"`)
      await supabase.from('sets').insert({
        set_id: setId,
        series_id: seriesId,
        name: set.name,
        code: set.id,
        release_date: set.releaseDate,
        logo_url: set.images?.logo ?? null,
        total_cards: set.total
      })
    } else {
      console.log(`✅ Set exists: ${set.name} (${setId})`)
    }

    // 3️⃣ Cards
    console.log(`🔹 Fetching cards for set "${set.name}"...`)
    const cards = await fetchCardsForSet(set.id)
    if (!cards.length) {
      console.log(`⚠️ No cards found for set "${set.name}"`)
      continue
    }

    for (const card of cards) {
      const cardId = uuidv4()
      console.log(`   🃏 Upserting card: ${card.name} (#${card.number})`)

      try {
        // Upsert card
        await supabase.from('cards').upsert(
          [
            {
              card_id: cardId,
              set_id: setId,
              card_number: card.number,
              name: card.name,
              supertype: card.supertype,
              subtype: card.subtypes?.join(',') ?? null,
              rarity: card.rarity ?? null,
              types: card.types ?? [],
              hp: card.hp ? parseInt(card.hp) : null,
              image_url: card.images.large,
              illustrator_id: card.artist ?? null,
              market_price: card.tcgplayer?.prices?.normal?.market ?? null,
              is_promo: false
            }
          ],
          { onConflict: 'card_id' }
        )

        // Upsert price
        const priceData = card.tcgplayer?.prices?.normal
        if (priceData) {
          await supabase.from('card_prices').upsert(
            [
              {
                card_id: cardId,
                source: 'tcgplayer',
                low_price: priceData.low ?? null,
                mid_price: priceData.mid ?? null,
                high_price: priceData.high ?? null,
                market_price: priceData.market ?? null,
                direct_low_price: priceData.directLow ?? null,
                currency: 'USD'
              }
            ],
            { onConflict: 'card_id' }
          )
        }
      } catch (err) {
        console.error(`❌ Failed to upsert card ${card.name}:`, err)
      }
    }
  }

  console.log('\n✅ Supabase database updated with all sets and cards')
}

main().catch(err => console.error('❌ Script error:', err))
