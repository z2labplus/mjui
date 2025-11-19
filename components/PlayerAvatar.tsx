
import React from 'react';

interface PlayerAvatarProps {
  name: string;
  score: string;
  avatarUrl?: string;
  positionClass: string;
  isTurn?: boolean;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ 
  name, 
  score, 
  positionClass, 
  isTurn,
  avatarUrl 
}) => {
  return (
    <div className={`absolute ${positionClass} flex flex-col items-center z-50 pointer-events-auto`}>
      {/* Avatar Circle/Square */}
      <div className="relative">
        <div className={`w-14 h-14 rounded-xl overflow-hidden border-2 ${isTurn ? 'border-gold-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'border-white/20'} bg-gray-800 transition-all duration-300`}>
           {avatarUrl ? (
             <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-xl">
               {name.charAt(0)}
             </div>
           )}
        </div>
        {/* Ready/Turn Indicator */}
        {isTurn && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>
      
      {/* Score Tag */}
      <div className="mt-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full border border-gold-500/30">
        <span className="text-[10px] font-bold text-gold-400 tracking-wide">{score}</span>
      </div>
    </div>
  );
};
