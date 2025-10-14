import { PokemonTcgApiResponse } from '../types/pokemontcg';

const API_BASE_URL = 'https://api.pokemontcg.io/v2/cards';

export async function fetchPokemonCards(
  query: string = '', 
  page: number = 1, 
  pageSize: number = 25 
): Promise<PokemonTcgApiResponse> {
  const API_KEY = process.env.POKEMONTCG_API_KEY;

  if (!API_KEY) {
    if (typeof window === 'undefined') {
      console.error('SERVER ERROR: POKEMONTCG_API_KEY is missing from environment variables.');
      throw new Error('POKEMONTCG_API_KEY is not set in environment variables.');
    }

  }

  const params = new URLSearchParams();
  
  if (query && query !== 'random') {
    params.append('q', query);
  }
  
  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());

  const url = `${API_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY || '', 
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pokémon TCG API Request Failed (Status: ${response.status}). URL: ${url}. Response Body: ${errorText}`);

      throw new Error(
        `Failed to fetch cards. Status: ${response.status} (${response.statusText}). ` + 
        `Details: ${errorText.substring(0, 100)}`
      );
    }

    const data = (await response.json()) as PokemonTcgApiResponse;
    return data;
  } catch (error) {
    console.error('Network or unknown error during fetchPokemonCards:', error);
    throw new Error(`An unexpected error occurred during the API request: ${error instanceof Error ? error.message : 'Unknown Error'}`);
  }
}