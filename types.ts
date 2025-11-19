export type Suit = 'man' | 'pin' | 'sou' | 'wind' | 'dragon';

export interface TileData {
  id: string;
  suit: Suit;
  value: number; // 1-9 for suits, 1-4 for winds, 1-3 for dragons
  label?: string; // Helper for finding image
}

export interface PlayerState {
  hand: TileData[];
  discards: TileData[];
  isTurn: boolean;
  score: number;
}

export type Seat = 'bottom' | 'right' | 'top' | 'left';
