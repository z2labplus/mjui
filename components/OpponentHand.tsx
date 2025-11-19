
import React, { useMemo } from 'react';
import { Seat, TileData } from '../types';
import { MahjongTile } from './MahjongTile';

interface OpponentHandProps {
  seat: Seat;
  tileCount: number;
  isActive?: boolean;
  melds?: TileData[][];
}

export const OpponentHand: React.FC<OpponentHandProps> = ({ seat, tileCount, isActive, melds = [] }) => {
  
  const handTiles = useMemo(() => {
      return Array.from({ length: tileCount }).map((_, i) => ({
        id: `opp-${seat}-${i}`,
        suit: 'man', 
        value: 1
     } as TileData));
  }, [tileCount, seat]);

  // Adjusted for 1334x750 Resolution
  const getSeatStyles = () => {
    switch (seat) {
      case 'top':
        return {
          container: 'top-16 left-1/2 -translate-x-1/2',
          flexDir: 'flex-row',
          // Rotate 180 for position
          rotate: 'rotate-180',
          wallRotate: 'rotateX(0deg)',
        };
      case 'left':
        return {
          container: 'left-20 top-1/2 -translate-y-1/2',
          flexDir: 'flex-row',
          rotate: 'rotate-90',
          wallRotate: 'rotateX(0deg)',
        };
      case 'right':
        return {
          container: 'right-20 top-1/2 -translate-y-1/2',
          flexDir: 'flex-row',
          rotate: '-rotate-90',
          wallRotate: 'rotateX(0deg)',
        };
      default:
        return { container: '', flexDir: '', rotate: '', wallRotate: '' };
    }
  };

  const styles = getSeatStyles();

  return (
    <div className={`absolute ${styles.container} ${styles.rotate} z-20 preserve-3d transition-all duration-500`}>
       
       <div className={`flex ${styles.flexDir} items-end gap-4`}>
          {/* Melds */}
          {melds.length > 0 && (
            <div className={`flex ${styles.flexDir} gap-1 opacity-90`}>
               {melds.map((meld, mIdx) => (
                 <div key={mIdx} className="flex items-end -space-x-[1px]">
                    {meld.map((tile, tIdx) => (
                      <MahjongTile 
                        key={`meld-${mIdx}-${tIdx}`} 
                        tile={tile} 
                        scale={0.8}
                        isFaceUp={true} 
                        disabled
                      />
                    ))}
                 </div>
               ))}
            </div>
          )}

          {/* Hand (Lying Flat) */}
          <div 
            className="flex items-end -space-x-[1px] preserve-3d"
            style={{ transform: styles.wallRotate }}
          >
              {handTiles.map((tile) => (
                  <div key={tile.id} className="relative">
                     <MahjongTile 
                        tile={tile}
                        isFaceUp={false}
                        scale={0.85}
                        disabled
                     />
                  </div>
              ))}
          </div>

       </div>
    </div>
  );
};
