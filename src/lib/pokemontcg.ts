import { PokemonTcgApiResponse, Card as PokemonCardType } from '../types/pokemontcg';

const API_BASE_URL = 'https://api.pokemontcg.io/v2/cards';

export async function fetchPokemonCards(
    query: string = '', 
    page: number = 1, 
    pageSize: number = 25
): Promise<PokemonTcgApiResponse> {
    // Ensure sensible page and pageSize
    page = Math.max(1, page);
    pageSize = Math.min(Math.max(1, pageSize), 250); // API limit

    const API_KEY = process.env.NEXT_PUBLIC_POKEMONTCG_API_KEY;

    if (!API_KEY) {
        const keyName = 'NEXT_PUBLIC_POKEMONTCG_API_KEY';
        if (typeof window === 'undefined') {
            console.error(`SERVER ERROR: ${keyName} is missing from environment variables.`);
        }
        throw new Error(`${keyName} is not set in environment variables.`);
    }

    const params = new URLSearchParams();
    if (query && query !== 'random') params.append('q', query);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    const url = `${API_BASE_URL}?${params.toString()}`;

    try {
        const fetchOptions: RequestInit = {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY,
                'Content-Type': 'application/json',
            },
        };

        if (typeof window === 'undefined') {
            fetchOptions.next = { revalidate: 60 * 60 * 24 }; // SSR caching
        } else {
            fetchOptions.cache = 'no-store'; // CSR always hits network
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Pokémon TCG API Request Failed (Status: ${response.status}). URL: ${url}. Response: ${errorText}`);
            throw new Error(
                `Failed to fetch cards. Status: ${response.status} (${response.statusText}). ` +
                `Details: ${errorText.substring(0, 100)}`
            );
        }

        const data = (await response.json()) as PokemonTcgApiResponse;

       data.data = data.data.map((card: PokemonCardType) => ({
    id: card.id,
    name: card.name,
    images: card.images,
    supertype: card.supertype,
    subtypes: card.subtypes,
    hp: card.hp,
    types: card.types,
    set: card.set, // keep the object
    number: card.number,
    rarity: card.rarity,
    artist: card.artist,
    nationalPokedexNumbers: card.nationalPokedexNumbers,
}));

        return data;
    } catch (error) {
        console.error('Network or unknown error during fetchPokemonCards:', error);
        throw new Error(`An unexpected error occurred during the API request: ${error instanceof Error ? error.message : 'Unknown Error'}`);
    }
}
