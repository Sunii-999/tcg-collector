'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonCards } from '@/lib/pokemontcg'; 
import { Card as PokemonCardType } from '@/types/pokemontcg';
import CardComponent from './CardComponent.tsx';
import { Button } from '@/components/ui/button';

interface ClientCardListProps {
    initialCards: PokemonCardType[];
    initialPage: number;
    pageSize: number;
    totalCount: number;
}

export default function ClientCardList({ initialCards, initialPage, pageSize, totalCount: initialTotalCount }: ClientCardListProps) {
    const [cards, setCards] = useState<PokemonCardType[]>(initialCards);
    const [page, setPage] = useState(initialPage);
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalPages = Math.ceil(totalCount / pageSize);

    const loadCards = useCallback(async (currentPage: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchPokemonCards(
                'supertype:pokemon', 
                currentPage,
                pageSize
            );
            
            setCards(response.data);
            setTotalCount(response.totalCount);

        } catch (e) {
            console.error('Error loading cards during pagination:', e);
            setError('Failed to load next page. Check the API proxy setup.');
        } finally {
            setIsLoading(false);
        }
    }, [pageSize]);

    useEffect(() => {
        if (page === initialPage && cards.length > 0) {
            setIsLoading(false);
            return;
        }
        loadCards(page);
    }, [page, loadCards, initialPage, cards.length]);
    if (error) {
        return <div className="text-center p-10 text-red-600 font-bold">{error}</div>;
    }
    
    // --- Render Component ---
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Pokémon TCG Card Browser</h1>            
            {isLoading && (
                <div className="text-center p-4 text-gray-500">Loading page {page}...</div>
            )}
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 ${isLoading ? 'opacity-50' : ''}`}>
                {cards.map((card) => (
                    <CardComponent key={card.id} card={card} />
                ))}
            </div>

            {/* Pagination Controls */}
                <Button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1 || isLoading}
                    variant="outline"
                >
                    Previous
                </Button>
                
                <span className="text-lg">
                    {"    " + page}  of  {totalPages + "   "}
                </span>
                
                <Button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || isLoading}
                    variant="outline"
                >
                    Next
                </Button>
            
            <div className="text-center text-sm text-gray-500 mt-4">
                Total cards found: {totalCount.toLocaleString()}
            </div>
        </div>
    );
}