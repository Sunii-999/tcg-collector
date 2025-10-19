// src/lib/prices.ts
import { supabase } from './supabase'

export async function getCardPrices(cardId: string) {
  const { data, error } = await supabase
    .from('card_prices')
    .select('*')
    .eq('card_id', cardId)
    .order('last_updated', { ascending: true })

  if (error) throw error
  return data
}

export async function getCardsInSet(setId: string, excludeCardId?: string) {
  let query = supabase
    .from('cards')
    .select('*')
    .eq('set_id', setId)

  if (excludeCardId) query = query.not('card_id', 'eq', excludeCardId)

  const { data, error } = await query
  if (error) throw error
  return data
}
