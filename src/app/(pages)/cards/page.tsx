// src/app/(pages)/cards/page.tsx
import { getAllCards } from '@/lib/pokemon-api'
import CardList from '@/components/cards/CardList'

interface CardsPageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function CardsPage({ searchParams }: CardsPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const name = params.name || ''

  const cards = await getAllCards(page, 20, name ? { name } : {})

  return (
    <main className="p-8">
      <form className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Search by name..."
          defaultValue={name}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {cards.length === 0 ? (
  <p>No cards found.</p>
) : (
  <CardList cards={cards} />
)}


      <div className="flex gap-4 mt-8">
        {page > 1 && (
          <a
            href={`/cards?page=${page - 1}${name ? `&name=${name}` : ''}`}
            className="text-blue-500"
          >
            Previous
          </a>
        )}
        {cards.length === 20 && (
          <a
            href={`/cards?page=${page + 1}${name ? `&name=${name}` : ''}`}
            className="text-blue-500"
          >
            Next
          </a>
        )}
      </div>
    </main>
  )
}
