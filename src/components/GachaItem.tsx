import React from 'react';
import { GachaItem as GachaItemType } from '@/types';

interface Props {
  item: GachaItemType;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Added xl
  minimal?: boolean; // New prop to toggle background
}

export const GachaItem: React.FC<Props> = ({ item, className = '', size = 'md', minimal = false }) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-64 h-64', // Much larger for the main display
  };

  // If minimal is true, we render just the image, no text/badges/borders
  // This allows it to sit nicely on top of the pre-rendered background image (lotty.png)
  if (minimal) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
           <img src={item.image} alt={item.name} className="w-full h-full object-contain z-10 drop-shadow-md" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`relative rounded-full border-4 border-pink-300 bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg flex items-center justify-center p-2 ${sizeClasses[size]}`}>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
        <img src={item.image} alt={item.name} className="w-full h-full object-contain z-10" />
      </div>
      
      <div className="mt-2 text-center">
        <div className="text-gacha-brown font-bold text-sm md:text-base">{item.name}</div>
        {item.badge && (
          <div className="flex gap-1 justify-center mt-1">
            {item.badge.split('|').map((b, i) => (
              <span key={i} className="px-2 py-0.5 bg-gacha-brown text-amber-100 text-xs rounded-full shadow-sm border border-amber-200">
                {b.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
