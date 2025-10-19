import { getCardById } from '@/lib/pokemon-api'
import { getCardUUIDByApiId, getCardPrices, getOtherCardsInSet } from '@/lib/supabaseCards'
import PriceChart from '@/components/cards/PriceChart'
import CardList from '@/components/cards/CardList'
import Link from 'next/link'

type CardPageProps = { params: { id: string } }

export default async function CardPage({ params }: CardPageProps) {
  const resolvedParams = await params
  const apiId = resolvedParams.id

  // 1️⃣ Fetch card details from Pokémon API
  const card = await getCardById(apiId)
  if (!card) return <p>Card not found</p>

  // 2️⃣ Map Pokémon API ID -> Supabase card UUID
  const cardRecord = await getCardUUIDByApiId(apiId)
  const cardUUID = cardRecord?.card_id
  const setId = cardRecord?.set_id

  // 3️⃣ Fetch price history if we have UUID
  const prices = cardUUID ? await getCardPrices(cardUUID) : []

  // 4️⃣ Fetch other cards in this set
  const otherCards = setId ? await getOtherCardsInSet(setId, cardUUID) : []

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      <Link href="/cards" className="text-blue-500 hover:underline">← Back to cards</Link>

      {/* Card Details */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img src={card.images.large} alt={card.name} className="w-80 rounded-xl shadow-lg" />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{card.name}</h1>
          <p>{card.flavorText || 'No description available.'}</p>
          <p><strong>HP:</strong> {card.hp}</p>
          <p><strong>Type:</strong> {card.types?.join(', ')}</p>
          <p><strong>Rarity:</strong> {card.rarity}</p>
          <p><strong>Set:</strong> {card.set.name}</p>
        </div>
      </div>

      {/* Price Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Price History</h2>
        {prices.length > 0 ? <PriceChart prices={prices} /> : <p>No price data available.</p>}
      </div>

      {/* Other cards in this set */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Other cards in this set</h2>
        {otherCards.length > 0 ? <CardList cards={otherCards.map(c => ({
          id: c.api_id,
          name: c.name,
          images: { small: c.image_url, large: c.image_url },
          set: { name: card.set.name }
        }))} /> : <p>No other cards.</p>}
      </div>
    </div>
  )
}
