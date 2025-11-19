
import { TileData, Suit } from '../types';

// Helper to generate unique IDs
const uuid = () => Math.random().toString(36).substring(2, 15);

const SUITS: Suit[] = ['man', 'pin', 'sou'];
const WINDS = ['east', 'south', 'west', 'north'];
const DRAGONS = ['red', 'green', 'white'];

export const generateDeck = (): TileData[] => {
  const deck: TileData[] = [];

  // Number suits (1-9, 4 copies each)
  SUITS.forEach((suit) => {
    for (let val = 1; val <= 9; val++) {
      for (let i = 0; i < 4; i++) {
        deck.push({
          id: `${suit}-${val}-${i}-${uuid()}`,
          suit,
          value: val,
        });
      }
    }
  });

  // Winds (1-4, 4 copies)
  for (let val = 1; val <= 4; val++) {
    for (let i = 0; i < 4; i++) {
      deck.push({
        id: `wind-${val}-${i}-${uuid()}`,
        suit: 'wind',
        value: val,
        label: WINDS[val - 1],
      });
    }
  }

  // Dragons (1-3, 4 copies)
  for (let val = 1; val <= 3; val++) {
    for (let i = 0; i < 4; i++) {
      deck.push({
        id: `dragon-${val}-${i}-${uuid()}`,
        suit: 'dragon',
        value: val,
        label: DRAGONS[val - 1],
      });
    }
  }

  return shuffle(deck);
};

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Sort priority for hand
const getSortValue = (tile: TileData): number => {
  let base = 0;
  switch (tile.suit) {
    case 'man': base = 0; break;
    case 'pin': base = 100; break;
    case 'sou': base = 200; break;
    case 'wind': base = 300; break;
    case 'dragon': base = 400; break;
  }
  return base + tile.value;
};

export const sortHand = (hand: TileData[]): TileData[] => {
  return [...hand].sort((a, b) => getSortValue(a) - getSortValue(b));
};

export const getTileImageUrl = (tile: TileData): string => {
  // Correctly encoded URL for the vectors
  const baseUrl = 'https://raw.githubusercontent.com/lietxia/mahjong_graphic/main/Vectors%20%E7%9F%A2%E9%87%8F%E5%9B%BE/SVG';
  
  let fileName = '';

  switch (tile.suit) {
    case 'man':
      fileName = `${tile.value}m.svg`;
      break;
    case 'pin':
      fileName = `${tile.value}p.svg`;
      break;
    case 'sou':
      fileName = `${tile.value}s.svg`;
      break;
    case 'wind':
      // 1=East(1z), 2=South(2z), 3=West(3z), 4=North(4z)
      fileName = `${tile.value}z.svg`;
      break;
    case 'dragon':
      // 5z=White(Space), 6z=Green(Fa), 7z=Red(Zhong)
      if (tile.value === 1) fileName = `7z.svg`; // Red
      if (tile.value === 2) fileName = `6z.svg`; // Green
      if (tile.value === 3) fileName = `5z.svg`; // White
      break;
  }

  return `${baseUrl}/${fileName}`;
};

export const generateRandomDiscards = (min: number, max: number): TileData[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const tempDeck = generateDeck();
  return tempDeck.slice(0, count);
};
