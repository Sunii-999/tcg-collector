// types/pokemontcg.ts

/** * Defines the structure for the individual card. 
 * This is the object found under response.data. 
 */
export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesTo?: string[];
  rules?: string[];
  
  attacks?: Attack[];
  weaknesses?: Weakness[];
  retreatCost?: string[];
  convertedRetreatCost?: number;

  set: Set; // Nested Set object
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers?: number[];
  
  legalities: Legalities;
  images: CardImages;
  tcgplayer?: TCGPlayerPrices; // Optional as pricing data might not always be present
}

// --- Nested Types ---

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface Legalities {
  unlimited: 'Legal' | 'Illegal';
  expanded: 'Legal' | 'Illegal';
  // Add other formats if needed
}

export interface CardImages {
  small: string;
  large: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string; // "YYYY/MM/DD"
  updatedAt: string; // "YYYY/MM/DD HH:MM:SS"
  images: SetImages;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface TCGPlayerPrices {
    url: string;
    updatedAt: string;
    prices: {
        holofoil?: PriceDetail;
        reverseHolofoil?: PriceDetail;
        // Add other price types like "normal" if needed
    };
}

export interface PriceDetail {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow?: number;
}


/** * Defines the structure for an API response when fetching a LIST of cards (GET /v2/cards). 
 */
export interface PokemonTcgApiResponse {
  data: Card[]; // Array of Card objects
  count: number;
  pageSize: number;
  totalCount: number;
  page: number;
}

/** * Defines the structure for an API response when fetching a SINGLE card (GET /v2/cards/:id). 
 */
export interface PokemonTcgSingleCardResponse {
  data: Card; // Single Card object
}