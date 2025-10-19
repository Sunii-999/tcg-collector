export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string | string[]; // safer if API ever returns multiple
  evolvesTo?: string[];
  abilities?: Ability[];
  rules?: string[];
  flavorText?: string;

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
  cardmarket?: CardmarketPrices;

  
}

export interface Ability {
  name: string;
  text: string;
  type: string;
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
  standard?: 'Legal' | 'Illegal';
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
    normal?: PriceDetail;
    holofoil?: PriceDetail;
    reverseHolofoil?: PriceDetail;
  };
}

export interface CardmarketPrices {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice?: number;
    lowPrice?: number;
    trendPrice?: number;
    germanProLow?: number | null;
    suggestedPrice?: number | null;
    reverseHoloSell?: number | null;
    reverseHoloLow?: number | null;
    reverseHoloTrend?: number | null;
    lowPriceExPlus?: number;
    avg1?: number;
    avg7?: number;
    avg30?: number;
    reverseHoloAvg1?: number | null;
    reverseHoloAvg7?: number | null;
    reverseHoloAvg30?: number | null;
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
