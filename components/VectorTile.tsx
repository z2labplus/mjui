
import React from 'react';
import { TileData } from '../types';
import { getTileImageUrl } from '../utils/mahjongUtils';

interface VectorTileProps {
  tile?: TileData; 
  width?: number;
  height?: number;
  depth?: number;
  className?: string;
  isFaceDown?: boolean; 
  onClick?: () => void;
}

export const VectorTile: React.FC<VectorTileProps> = ({
  tile,
  width = 44, 
  height = 60,
  depth = 8, 
  className = '',
  isFaceDown = false,
  onClick
}) => {
  const imageUrl = tile ? getTileImageUrl(tile) : '';

  // Neobrutalist Projection
  const offsetX = depth;
  const offsetY = -depth;
  
  // Neo Colors
  const strokeColor = "#000000";
  const strokeWidth = 3; // Thick border
  const faceColor = "#FFFFFF"; 
  const backColor = "#3b82f6"; // Neo Blue
  const sideColor = "#000000"; // Solid black sides for comic look
  const radius = 2; // Sharper corners

  const halfStroke = strokeWidth / 2;
  const minX = -halfStroke;
  const minY = offsetY - halfStroke;
  
  const totalW = width + offsetX + strokeWidth;
  const totalH = height + Math.abs(offsetY) + strokeWidth;

  return (
    <svg 
      width={totalW} 
      height={totalH} 
      viewBox={`${minX} ${minY} ${totalW} ${totalH}`}
      className={`overflow-visible block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ 
          touchAction: 'manipulation',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.2))' // Hard shadow for the whole tile
      }}
    >
      <g className="tile-group">
        
        {/* === SIDES (Depth) - Solid Black for Pop === */}
        
        {/* Right Side */}
        <path 
          d={`
            M ${width - radius} 0 
            L ${width} ${radius}
            L ${width} ${height - radius}
            L ${width - radius} ${height}
            L ${width - radius + offsetX} ${height + offsetY}
            L ${width + offsetX} ${height - radius + offsetY}
            L ${width + offsetX} ${radius + offsetY}
            L ${width - radius + offsetX} ${offsetY}
            Z
          `}
          fill={sideColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        
        {/* Top Side */}
        <path 
          d={`
            M 0 ${radius} 
            L ${radius} 0
            L ${width - radius} 0
            L ${width - radius + offsetX} ${offsetY}
            L ${radius + offsetX} ${offsetY}
            L ${offsetX} ${radius + offsetY}
            Z
          `}
          fill={sideColor} 
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* === MAIN FACE === */}
        
        {/* Face Background */}
        <rect 
          x="0" 
          y="0" 
          width={width} 
          height={height} 
          rx={radius}
          ry={radius}
          fill={isFaceDown ? backColor : faceColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />

        {/* Face Content */}
        {isFaceDown ? (
            /* Back Pattern (Simple geometric) */
            <g>
                 <rect x="6" y="6" width={width-12} height={height-12} rx="2" fill="none" stroke="white" strokeWidth="3"/>
            </g>
        ) : (
            /* Front Image */
            tile && (
                <image 
                href={imageUrl} 
                x="2" 
                y="2" 
                width={width - 4} 
                height={height - 4} 
                preserveAspectRatio="xMidYMid meet"
                />
            )
        )}
      </g>
    </svg>
  );
};
