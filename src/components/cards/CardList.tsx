import Link from 'next/link'
import { ICard } from '@/types/pokemon'

interface CardListProps {
  cards: ICard[]
}

export default function CardList({ cards }: CardListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const tcgPrice =
          card.tcgplayer?.prices?.normal?.market ??
          card.tcgplayer?.prices?.holofoil?.market ??
          card.tcgplayer?.prices?.reverseHolofoil?.market ??
          card.cardmarket?.prices?.averageSellPrice

        const formattedPrice = tcgPrice ? `$${tcgPrice.toFixed(2)}` : 'N/A'

        return (
          <Link href={`/card/${card.id}`} key={card.id}>
            <div className="rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-gray-800">
              <img
                src={card.images.small}
                alt={card.name}
                width={200}
                height={280}
                className="w-full h-auto"
              />

              <div className="p-2 text-white">
                <p className="font-semibold text-sm truncate">{card.name}</p>

                <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                  <span>{card.set?.name}</span>
                  <span className="text-green-400 font-medium">
                    {formattedPrice}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
