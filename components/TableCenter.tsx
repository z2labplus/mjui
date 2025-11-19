
import React from 'react';
import { Seat, TileData } from '../types';
import { MahjongTile } from './MahjongTile';

interface TableCenterProps {
  discards: Record<Seat, TileData[]>;
  tilesLeft: number;
  activeSeat: Seat;
}

// Tighter Grid for Discards
const DiscardGrid = ({ tiles, activeSeat, seat }: { tiles: TileData[], activeSeat: Seat, seat: string }) => {
  const scale = 0.65; 
  const opacityClass = activeSeat === seat ? 'opacity-100' : 'opacity-80';

  return (
    <div 
      className={`flex flex-wrap content-start gap-[2px] transition-opacity duration-300 ${opacityClass}`}
      style={{ 
        width: '170px', 
        height: '90px'
      }} 
    >
      {tiles.map((tile, i) => (
        <div key={`${tile.id}-discard`} className="relative" style={{ zIndex: i }}>
           <MahjongTile 
              tile={tile} 
              scale={scale} 
              isFaceUp={true} 
              disabled
              // Discards are flat on table
              rotateX={0}
              className="shadow-sm"
           />
        </div>
      ))}
    </div>
  );
};

export const TableCenter: React.FC<TableCenterProps> = ({ discards, tilesLeft, activeSeat }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] preserve-3d flex items-center justify-center pointer-events-none">
      
      {/* Center Device: Dark Glassy Box with Cyan Accents (Screenshot Match) */}
      <div className="relative w-40 h-40 preserve-3d z-20 mb-2 rounded-3xl bg-gradient-to-br from-table-950 via-black to-table-900 border border-table-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center overflow-hidden">
          
          {/* Inner Gloss */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

          {/* Direction Arrows (Glow effects) */}
          <div className={`absolute bottom-2 w-20 h-1 bg-gold-400 rounded-full shadow-[0_0_10px_#fbbf24] transition-opacity duration-300 ${activeSeat === 'bottom' ? 'opacity-100' : 'opacity-10'}`}></div>
          <div className={`absolute top-2 w-20 h-1 bg-gold-400 rounded-full shadow-[0_0_10px_#fbbf24] transition-opacity duration-300 ${activeSeat === 'top' ? 'opacity-100' : 'opacity-10'}`}></div>
          <div className={`absolute right-2 h-20 w-1 bg-gold-400 rounded-full shadow-[0_0_10px_#fbbf24] transition-opacity duration-300 ${activeSeat === 'right' ? 'opacity-100' : 'opacity-10'}`}></div>
          <div className={`absolute left-2 h-20 w-1 bg-gold-400 rounded-full shadow-[0_0_10px_#fbbf24] transition-opacity duration-300 ${activeSeat === 'left' ? 'opacity-100' : 'opacity-10'}`}></div>

          {/* Digital Timer */}
          <div className="relative z-10 flex flex-col items-center">
             <div className="font-mono text-5xl font-bold text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] tracking-wider">
                05
             </div>
             {/* Progress Bar */}
             <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 w-[60%]"></div>
             </div>
          </div>

          <div className="mt-2 text-[10px] text-table-400 font-serif opacity-60">
             Tiles: {tilesLeft}
          </div>
      </div>

      {/* Discard Zones - Positioned tightly around center */}
      
      {/* Bottom (Player) Discard */}
      <div className="absolute z-10" style={{ top: 'calc(50% + 85px)', left: '50%', transform: 'translateX(-50%)' }}>
        <DiscardGrid tiles={discards.bottom} activeSeat={activeSeat} seat="bottom" />
      </div>

      {/* Right Discard */}
      <div className="absolute z-10" style={{ top: '50%', right: 'calc(50% - 180px)', transform: 'translateY(-50%) rotate(-90deg)' }}>
         <DiscardGrid tiles={discards.right} activeSeat={activeSeat} seat="right" />
      </div>

      {/* Top Discard */}
      <div className="absolute z-10" style={{ bottom: 'calc(50% + 85px)', left: '50%', transform: 'translateX(-50%) rotate(180deg)' }}>
         <DiscardGrid tiles={discards.top} activeSeat={activeSeat} seat="top" />
      </div>

      {/* Left Discard */}
      <div className="absolute z-10" style={{ top: '50%', left: 'calc(50% - 180px)', transform: 'translateY(-50%) rotate(90deg)' }}>
         <DiscardGrid tiles={discards.left} activeSeat={activeSeat} seat="left" />
      </div>

    </div>
  );
};
