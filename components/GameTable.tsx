
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VectorTile } from './VectorTile';
import { TileData, Seat } from '../types';
import { generateDeck, generateRandomDiscards } from '../utils/mahjongUtils';

// --- Neobrutalist Helper Components ---

const Avatar = ({ seat, isActive }: { seat: Seat, isActive?: boolean }) => {
    const getPosition = () => {
        switch(seat) {
            case 'bottom': return 'bottom-6 left-6';
            case 'right': return 'right-6 top-1/2 -translate-y-1/2 flex-col';
            case 'top': return 'top-6 right-20 flex-row-reverse';
            case 'left': return 'left-6 top-1/2 -translate-y-1/2 flex-col';
        }
    };

    return (
        <div className={`absolute ${getPosition()} flex gap-3 items-center z-30`}>
            {/* Avatar Box */}
            <div className={`w-14 h-14 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center transition-transform ${isActive ? 'translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000]' : ''}`}>
                <span className="text-2xl font-black text-black uppercase">{seat[0]}</span>
            </div>
            
            {/* Score Tag */}
            <div className="bg-neo-yellow px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <span className="text-black text-xs font-mono font-bold">25K</span>
            </div>
        </div>
    );
};

// --- Main Table Component ---

export const GameTable: React.FC = () => {
  // Mock State
  const [myHand] = useState<TileData[]>(() => {
     const deck = generateDeck();
     return deck.slice(0, 13).sort((a, b) => a.value - b.value);
  });
  const [drawnTile] = useState<TileData | null>({ id: 'draw', suit: 'man', value: 1 });
  
  const discards = {
      bottom: generateRandomDiscards(6, 12),
      right: generateRandomDiscards(6, 12),
      top: generateRandomDiscards(6, 12),
      left: generateRandomDiscards(6, 12),
  };

  // Larger, bolder tiles for the style
  const TILE_W = 42;
  const TILE_H = 58;
  const TILE_D = 10;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#A2D2FF]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" 
             style={{ 
                 backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
                 backgroundSize: '32px 32px'
             }}
        />
        
        {/* Game Perspective Container */}
        <div className="absolute inset-0 flex items-center justify-center perspective-game">
            
            {/* Center Hub - Neobrutalist Card */}
            <div className="absolute z-0 w-48 h-48 bg-white border-4 border-black shadow-[10px_10px_0px_0px_#000] flex flex-col items-center justify-center">
                {/* Timer */}
                <div className="text-black font-display text-6xl font-black tracking-tighter">
                    08
                </div>
                
                {/* Info Label */}
                <div className="mt-2 bg-black text-white px-2 py-0.5 text-xs font-mono uppercase transform -rotate-2">
                    Tiles Left: 54
                </div>

                {/* Turn Indicator Bar */}
                <div className="absolute bottom-4 w-full px-4">
                    <div className="w-full h-3 bg-gray-200 border-2 border-black">
                        <div className="h-full bg-[#FF5D8F] w-2/3 border-r-2 border-black"></div>
                    </div>
                </div>
            </div>

            {/* ================= DISCARDS ================= */}
            
            {/* Bottom (Self) */}
            <div className="absolute flex flex-wrap w-56 content-start gap-1 pt-4 justify-center" style={{ transform: 'translateY(110px)' }}>
                {discards.bottom.map((t, i) => (
                    <VectorTile key={i} tile={t} width={28} height={38} depth={6} />
                ))}
            </div>

            {/* Top (Opponent) */}
            <div className="absolute flex flex-wrap w-56 content-start gap-1 pt-4 justify-center" style={{ transform: 'translateY(-110px) rotate(180deg)' }}>
                {discards.top.map((t, i) => (
                    <VectorTile key={i} tile={t} width={28} height={38} depth={6} />
                ))}
            </div>

             {/* Left */}
             <div className="absolute flex flex-wrap w-56 content-start gap-1 pt-4 justify-center" style={{ transform: 'translateX(-130px) rotate(90deg)' }}>
                {discards.left.map((t, i) => (
                    <VectorTile key={i} tile={t} width={28} height={38} depth={6} />
                ))}
            </div>

             {/* Right */}
             <div className="absolute flex flex-wrap w-56 content-start gap-1 pt-4 justify-center" style={{ transform: 'translateX(130px) rotate(-90deg)' }}>
                {discards.right.map((t, i) => (
                    <VectorTile key={i} tile={t} width={28} height={38} depth={6} />
                ))}
            </div>

            {/* ================= HANDS ================= */}

            {/* Top Hand (Simplified Wall) */}
            <div className="absolute top-0 flex gap-1" style={{ transform: 'translateY(20%) scale(0.8)' }}>
                 {Array.from({length: 13}).map((_, i) => (
                    <VectorTile key={i} isFaceDown width={TILE_W} height={TILE_H} depth={TILE_D} />
                 ))}
            </div>

            {/* Left Hand */}
            <div className="absolute left-0 flex gap-1" style={{ transform: 'translateX(20%) rotate(90deg) scale(0.8)', transformOrigin: 'left center' }}>
                {Array.from({length: 13}).map((_, i) => (
                    <VectorTile key={i} isFaceDown width={TILE_W} height={TILE_H} depth={TILE_D} />
                 ))}
            </div>

             {/* Right Hand */}
             <div className="absolute right-0 flex gap-1" style={{ transform: 'translateX(-20%) rotate(-90deg) scale(0.8)', transformOrigin: 'right center' }}>
                {Array.from({length: 13}).map((_, i) => (
                    <VectorTile key={i} isFaceDown width={TILE_W} height={TILE_H} depth={TILE_D} />
                 ))}
            </div>


            {/* ================= PLAYER INTERACTIVE AREA ================= */}
            <div className="absolute bottom-8 w-full flex flex-col items-center z-20 pointer-events-none">
                
                <div className="flex items-end gap-10 pointer-events-auto">
                     {/* Melds */}
                    <div className="flex items-end gap-0 opacity-100">
                        <VectorTile tile={{id:'m1', suit:'pin', value:5}} width={TILE_W} height={TILE_H} depth={TILE_D} />
                        <VectorTile tile={{id:'m2', suit:'pin', value:5}} width={TILE_W} height={TILE_H} depth={TILE_D} />
                        <VectorTile tile={{id:'m3', suit:'pin', value:5}} width={TILE_W} height={TILE_H} depth={TILE_D} />
                    </div>

                    {/* Active Hand */}
                    <motion.div 
                        className="flex items-end gap-[2px]"
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                    >
                        {myHand.map((tile, i) => (
                            <motion.div
                                key={tile.id}
                                whileHover={{ y: -20, rotate: Math.random() * 4 - 2 }}
                                whileTap={{ scale: 0.9, y: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                style={{ zIndex: i }}
                                className="cursor-pointer"
                            >
                                <VectorTile 
                                    tile={tile} 
                                    width={52} 
                                    height={72} 
                                    depth={12} // Exaggerated depth for player
                                />
                            </motion.div>
                        ))}

                        {/* Drawn Tile */}
                        {drawnTile && (
                             <motion.div
                                className="ml-6"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                whileHover={{ y: -20, rotate: 5 }}
                                transition={{ delay: 0.2 }}
                            >
                                <VectorTile 
                                    tile={drawnTile} 
                                    width={52} 
                                    height={72} 
                                    depth={12} 
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Avatars */}
            <Avatar seat="bottom" isActive />
            <Avatar seat="right" />
            <Avatar seat="top" />
            <Avatar seat="left" />

        </div>
    </div>
  );
};
