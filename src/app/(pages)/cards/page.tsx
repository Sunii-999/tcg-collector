import { fetchPokemonCards } from '@/lib/pokemontcg';
import { Card as PokemonCardType } from '@/types/pokemontcg';
import ClientCardList from './ClientCardList'; // New Client component for state/pagination

export default async function CardsPage() {
    const initialPage = 1;
    const pageSize = 24;

    try {
        const response = await fetchPokemonCards('supertype:pokemon', initialPage, pageSize);
        const initialCards: PokemonCardType[] = response.data;
        const totalCount: number = response.totalCount;

        return (
            <ClientCardList 
                initialCards={initialCards} 
                initialPage={initialPage}
                pageSize={pageSize}
                totalCount={totalCount}
            />
        );
    } catch (e) {
        console.error('Server failed to fetch initial cards:', e);
        return <div className="text-center p-10 text-red-600 font-bold">Failed to load card data.</div>;
    }
}