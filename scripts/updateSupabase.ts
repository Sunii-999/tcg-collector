import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Env variables
const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Supabase env variables not set')
}

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

type PokemonSetsResponse = { data: PokemonSet[] }

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

// ---------------- Script ----------------
async function main() {
  console.log('🚀 Starting Supabase update script...')

  // 1️⃣ Fetch all sets
  console.log('Fetching all sets from Pokémon TCG API...')
  const setsRes = await fetch(`${API_BASE}/sets`)
  const setsData: PokemonSetsResponse = await setsRes.json()
  const sets = setsData.data
  console.log(`Found ${sets.length} sets.`)

  let setCounter = 0
  for (const set of sets) {
    setCounter++
    console.log(`\n📦 Processing set ${setCounter}/${sets.length}: ${set.name} (${set.id})`)

    // 2️⃣ Insert series
    const { data: seriesData } = await supabase
      .from('series')
      .select('series_id')
      .eq('name', set.series)
      .maybeSingle()
    const seriesId = seriesData?.series_id ?? uuidv4()
    if (!seriesData) {
      console.log(`Inserting new series: ${set.series}`)
      await supabase.from('series').insert({
        series_id: seriesId,
        name: set.series,
        release_date: set.releaseDate
      })
    }

    // 3️⃣ Insert set
    const { data: setData } = await supabase
      .from('sets')
      .select('set_id')
      .eq('code', set.id)
      .maybeSingle()
    const setId = setData?.set_id ?? uuidv4()
    if (!setData) {
      console.log(`Inserting new set: ${set.name}`)
      await supabase.from('sets').insert({
        set_id: setId,
        series_id: seriesId,
        name: set.name,
        code: set.id,
        release_date: set.releaseDate,
        logo_url: set.images?.logo ?? null,
        total_cards: set.total
      })
    }

    // 4️⃣ Fetch cards in this set
    console.log(`Fetching cards for set "${set.name}"...`)
    const cardsRes = await fetch(`${API_BASE}/cards?q=set.id:${set.id}&pageSize=250`)
    const cardsData: { data: PokemonCard[] } = await cardsRes.json()
    const cards = cardsData.data
    console.log(`Found ${cards.length} cards in this set.`)

    let cardCounter = 0
    for (const card of cards) {
      cardCounter++
      const cardId = uuidv4()
      console.log(`\n🃏 Processing card ${cardCounter}/${cards.length}: ${card.name} (#${card.number})`)

      // 5️⃣ Insert card
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
            types: card.types?.join(',') ?? null,
            hp: card.hp ? parseInt(card.hp) : null,
            image_url: card.images.large,
            illustrator_id: card.artist ?? null,
            market_price: card.tcgplayer?.prices?.normal?.market ?? null,
            is_promo: false
          }
        ],
        { onConflict: 'card_id' }
      )
      console.log(`✅ Card upserted: ${card.name}`)

      // 6️⃣ Insert price data if available
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
        console.log('💰 Price data upserted.')
      } else {
        console.log('⚠️ No price data for this card.')
      }
    }

    console.log(`✅ Finished processing set ${setCounter}/${sets.length}: ${set.name}`)
  }

  console.log('\n🎉 Supabase database fully updated with all sets and cards.')
}

main().catch(err => {
  console.error('❌ Error running script:', err)
})
