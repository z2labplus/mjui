
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TileData } from '../types';
import { MahjongTile } from './MahjongTile';

interface PlayerHandProps {
  hand: TileData[];
  selectedTileId: string | null;
  onSelectTile: (id: string) => void;
  onDiscard: (id: string) => void;
  isTurn: boolean;
  melds?: TileData[][];
}

export const PlayerHand: React.FC<PlayerHandProps> = ({
  hand,
  selectedTileId,
  onSelectTile,
  onDiscard,
  isTurn,
  melds = []
}) => {
  const handCount = hand.length;
  const isThinking = handCount % 3 === 2;
  
  const mainHand = isThinking ? hand.slice(0, -1) : hand;
  const drawnTile = isThinking ? hand[hand.length - 1] : null;

  const handleTileClick = (id: string) => {
    if (!isTurn) return;
    if (selectedTileId === id) {
      onDiscard(id); 
    } else {
      onSelectTile(id);
    }
  };

  // Slightly smaller scale than the "Standing" version, but still readable
  const TILE_SCALE = 1.4; 

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl flex items-end justify-center z-40 pointer-events-none">
        
        {/* 
            Reverted Rotation:
            Table is ~40deg. 
            Hand is -15deg relative to table (total ~25deg from flat).
            This gives the "lying down but visible" look.
        */}
        <div 
          className="flex items-end gap-8 pointer-events-auto preserve-3d perspective-game pl-2 pb-6"
          style={{ transform: 'rotateX(-15deg) translateY(10px)' }}
        >
            {/* Melds */}
            <div className="flex items-end gap-2 mr-8">
                {melds.map((meld, mIdx) => (
                    <div key={mIdx} className="flex items-end gap-[1px]">
                        {meld.map((tile, tIdx) => (
                        <MahjongTile 
                            key={`p-meld-${mIdx}-${tIdx}`} 
                            tile={tile} 
                            scale={1.1}
                            isFaceUp={true} 
                            disabled
                            className="brightness-90"
                            rotateX={0} 
                        />
                        ))}
                    </div>
                ))}
            </div>

            {/* Active Hand */}
            <div className="flex items-end -space-x-[2px]">
              <AnimatePresence mode='popLayout'>
                  {mainHand.map((tile, index) => (
                  <motion.div 
                      key={tile.id}
                      layout
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50, scale: 0.8 }}
                      transition={{ duration: 0.25, delay: index * 0.02 }}
                      className="relative"
                  >
                      <MahjongTile
                          tile={tile}
                          isSelected={selectedTileId === tile.id}
                          onClick={() => handleTileClick(tile.id)}
                          disabled={!isTurn}
                          scale={TILE_SCALE}
                      />
                  </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Drawn Tile */}
            {drawnTile && (
                <motion.div 
                    key={drawnTile.id}
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pl-6"
                >
                    <MahjongTile
                        tile={drawnTile}
                        isSelected={selectedTileId === drawnTile.id}
                        onClick={() => handleTileClick(drawnTile.id)}
                        disabled={!isTurn}
                        scale={TILE_SCALE}
                    />
                </motion.div>
            )}
      </div>
    </div>
  );
};
