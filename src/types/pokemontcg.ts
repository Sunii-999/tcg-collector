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

  set: Set;
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers?: number[];
  legalities: Legalities;
  images: CardImages;
  tcgplayer?: TCGPlayerPrices;
}

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
  ptcgoCode?: string;
  releaseDate: string;
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
    };
}
 
export interface PriceDetail {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow?: number;
}

export interface PokemonTcgApiResponse {
  data: Card[];
  count: number;
  pageSize: number;
  totalCount: number;
  page: number;
}
export interface PokemonTcgSingleCardResponse {
  data: Card;
}