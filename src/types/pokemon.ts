export interface IAbility {
  name: string;
  text: string;
  type: string;
}

export interface IAttack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface IWeakness {
  type: string;
  value: string;
}

export interface IResistance {
  type: string;
  value: string;
}

export interface ISetImage {
  symbol: string;
  logo: string;
}

export interface ILegalities {
  unlimited?: string;
  standard?: string;
  expanded?: string;
}

export interface ISet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: ILegalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: ISetImage;
}

export interface ICardImage {
  small: string;
  large: string;
}

export interface IPrice {
  low?: number;
  mid?: number;
  high?: number;
  market?: number;
  directLow?: number;
}

export interface ITCGPlayerPrices {
  normal?: IPrice;
  reverseHolofoil?: IPrice;
  holofoil?: IPrice;
}

export interface ITCGPlayer {
  url: string;
  updatedAt: string;
  prices: ITCGPlayerPrices;
}

export interface ICardmarketPrices {
  averageSellPrice?: number;
  lowPrice?: number;
  trendPrice?: number;
  germanProLow?: number | null;
  suggestedPrice?: number | null;
  reverseHoloSell?: number | null;
  reverseHoloLow?: number | null;
  reverseHoloTrend?: number | null;
  lowPriceExPlus?: number | null;
  avg1?: number | null;
  avg7?: number | null;
  avg30?: number | null;
  reverseHoloAvg1?: number | null;
  reverseHoloAvg7?: number | null;
  reverseHoloAvg30?: number | null;
}

export interface ICardmarket {
  url: string;
  updatedAt: string;
  prices: ICardmarketPrices;
}

export interface ICard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IWeakness[];
  resistances?: IResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: ISet;
  number: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegalities;
  images: ICardImage;
  tcgplayer?: ITCGPlayer;
  cardmarket?: ICardmarket;
}
