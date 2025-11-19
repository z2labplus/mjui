
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TileData } from '../types';
import { getTileImageUrl } from '../utils/mahjongUtils';

interface MahjongTileProps {
  tile: TileData;
  scale?: number;
  isFaceUp?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  rotateX?: number;
  zIndex?: number;
  isSelected?: boolean;
}

export const MahjongTile: React.FC<MahjongTileProps> = ({
  tile,
  scale = 1,
  isFaceUp = true,
  className = '',
  onClick,
  disabled = false,
  rotateX,
  zIndex,
  isSelected = false
}) => {
  const imageUrl = getTileImageUrl(tile);
  const [imgError, setImgError] = useState(false);

  // Neo Brutalism Dimensions - REFINED
  const baseW = 44; 
  const baseH = 60;
  // Thinner depth as requested (was 24)
  const baseD = 12; 

  const w = baseW * scale;
  const h = baseH * scale;
  const d = baseD * scale;

  // Neo Colors
  const cBorder = '#000000';
  
  // Using inset box-shadow for borders avoids 3D seams issues
  const borderSize = 2; // Slightly thinner border for thinner tiles
  const borderStyle = `inset 0 0 0 ${borderSize}px ${cBorder}`;
  const sideBorderStyle = `inset 0 0 0 ${borderSize}px ${cBorder}`;

  const hoverY = disabled ? 0 : -10; // Subtle lift
  const selectedY = -20;

  return (
    <motion.div
      layout
      initial={false}
      animate={{ y: isSelected ? selectedY : 0 }}
      whileHover={!disabled ? { y: isSelected ? selectedY : hoverY, zIndex: 100 } : {}}
      whileTap={!disabled ? { y: (isSelected ? selectedY : hoverY) + 5, scale: 0.95 } : {}}
      onClick={onClick}
      className={`relative preserve-3d select-none ${className} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
      style={{
        width: w,
        height: h,
        zIndex: isSelected ? 100 : zIndex,
        transformStyle: 'preserve-3d',
        transform: rotateX !== undefined ? `rotateX(${rotateX}deg)` : undefined,
      }}
    >
      {/* THE 3D BLOCK */}
      <div 
        className="relative preserve-3d w-full h-full"
        style={{ 
            transformOrigin: 'center center',
            transform: isFaceUp ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
      >
        
        {/* === FRONT FACE (Icon) === */}
        <div 
            className="absolute flex items-center justify-center backface-hidden bg-neo-white"
            style={{
                width: w,
                height: h,
                transform: `translateZ(${d / 2}px)`,
                boxShadow: borderStyle,
            }}
        >
            {!imgError ? (
                <img 
                    src={imageUrl} 
                    alt="tile" 
                    // Full bleed image
                    className="w-full h-full object-contain p-[1px]"
                    style={{ imageRendering: 'auto', filter: 'contrast(1.1)' }} 
                    onError={() => setImgError(true)}
                    draggable={false}
                />
            ) : (
                <span className="text-xl font-black text-black font-mono">{tile.value}</span>
            )}
        </div>

        {/* === BACK FACE (Blue) === */}
        <div 
            className="absolute backface-hidden bg-neo-blue flex items-center justify-center"
            style={{
                width: w,
                height: h,
                transform: `rotateY(180deg) translateZ(${d / 2}px)`,
                boxShadow: borderStyle,
            }}
        >
            {/* Geometric Pattern */}
            <div className="w-full h-full opacity-20" 
                style={{ 
                    backgroundImage: 'radial-gradient(#000 20%, transparent 20%)',
                    backgroundSize: '6px 6px'
                }} 
            />
            <div className="absolute inset-0 border-[4px] border-white/20 m-1.5"></div>
        </div>

        {/* === RIGHT FACE === */}
        <div 
            className="absolute backface-hidden bg-black"
            style={{
                width: d,
                height: h,
                left: (w - d) / 2, 
                transform: `rotateY(90deg) translateZ(${w / 2}px)`,
                boxShadow: sideBorderStyle,
            }}
        />

        {/* === LEFT FACE === */}
        <div 
            className="absolute backface-hidden bg-black"
            style={{
                width: d,
                height: h,
                left: (w - d) / 2,
                transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
                boxShadow: sideBorderStyle,
            }}
        />

        {/* === TOP FACE === */}
        <div 
            className="absolute backface-hidden bg-white"
            style={{
                width: w,
                height: d,
                top: (h - d) / 2,
                transform: `rotateX(90deg) translateZ(${h / 2}px)`,
                boxShadow: sideBorderStyle,
            }}
        />

        {/* === BOTTOM FACE === */}
        <div 
            className="absolute backface-hidden bg-black"
            style={{
                width: w,
                height: d,
                top: (h - d) / 2,
                transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
                boxShadow: sideBorderStyle,
            }}
        />

      </div>
    </motion.div>
  );
};
