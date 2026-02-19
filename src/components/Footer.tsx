import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-auto bg-[#2d1b12] border-t-2 border-[#e6c9a0]/30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-4 text-center">
        <p className="text-[#ffe4b5] font-medium mb-3 text-lg drop-shadow-sm tracking-wide">
          Made with <span className="text-red-500 animate-pulse inline-block mx-1">❤️</span> for gacha addict
        </p>
        <p className="text-[#e6c9a0]/60 text-sm font-light tracking-widest">
          © 2026 Nezha Gacha Project
        </p>
      </div>
    </footer>
  );
};
